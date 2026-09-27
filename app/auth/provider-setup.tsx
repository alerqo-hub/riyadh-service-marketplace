import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { AuthButton } from '../../components/AuthButton';
import { TextInput } from '../../components/TextInput';
import { ProviderProfileData } from '../../types/auth';

interface FormErrors {
  serviceCategory?: string;
  licenseNumber?: string;
  yearsExperience?: string;
  bio?: string;
  bankAccount?: string;
}

const SERVICE_CATEGORIES = [
  'السباكة',
  'التنظيف',
  'الكهرباء',
  'تصليح المكيفات',
  'الدهان',
  'النقل',
  'الحدادة',
  'النجارة',
];

export default function ProviderSetupScreen() {
  const router = useRouter();
  const { completeProviderProfile } = useAuth();
  const [formData, setFormData] = useState<ProviderProfileData>({
    serviceCategory: '',
    licenseNumber: '',
    yearsExperience: 0,
    bio: '',
    bankAccount: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.serviceCategory) {
      newErrors.serviceCategory = 'نوع الخدمة مطلوب';
    }

    if (!formData.licenseNumber) {
      newErrors.licenseNumber = 'رقم الرخصة مطلوب';
    } else if (formData.licenseNumber.length < 5) {
      newErrors.licenseNumber = 'رقم الرخصة غير صحيح';
    }

    if (!formData.yearsExperience || formData.yearsExperience < 1) {
      newErrors.yearsExperience = 'سنوات الخبرة مطلوبة (على الأقل سنة واحدة)';
    }

    if (!formData.bio) {
      newErrors.bio = 'الوصف مطلوب';
    } else if (formData.bio.length < 20) {
      newErrors.bio = 'الوصف يجب أن يكون 20 حرف على الأقل';
    }

    if (!formData.bankAccount) {
      newErrors.bankAccount = 'حساب البنك مطلوب';
    } else if (!/^[0-9]{10,}$/.test(formData.bankAccount.replace(/[^0-9]/g, ''))) {
      newErrors.bankAccount = 'رقم الحساب البنكي غير صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompleteProfile = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await completeProviderProfile({
        ...formData,
        yearsExperience: Number(formData.yearsExperience),
      });
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('خطأ', error.message || 'فشل إكمال الملف الشخصي');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>إكمال ملفك الشخصي</Text>
          <Text style={styles.subtitle}>أخبرنا عن خدماتك والتحقق من بيانات حسابك</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>نوع الخدمة</Text>
            <View style={styles.categoryGrid}>
              {SERVICE_CATEGORIES.map((category) => (
                <View
                  key={category}
                  style={[
                    styles.categoryButton,
                    formData.serviceCategory === category && styles.categoryButtonSelected,
                  ]}
                >
                  <Text
                    onPress={() => setFormData({ ...formData, serviceCategory: category })}
                    style={[
                      styles.categoryButtonText,
                      formData.serviceCategory === category && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </View>
              ))}
            </View>
            {errors.serviceCategory && (
              <Text style={styles.errorText}>{errors.serviceCategory}</Text>
            )}
          </View>

          <TextInput
            label="رقم الرخصة"
            placeholder="أدخل رقم الرخصة أو الترخيص"
            value={formData.licenseNumber}
            onChangeText={(licenseNumber) =>
              setFormData({ ...formData, licenseNumber })
            }
            error={errors.licenseNumber}
          />

          <TextInput
            label="سنوات الخبرة"
            placeholder="عدد سنوات خبرتك"
            value={formData.yearsExperience.toString()}
            onChangeText={(yearsExperience) =>
              setFormData({ ...formData, yearsExperience: Number(yearsExperience) })
            }
            keyboardType="numeric"
            error={errors.yearsExperience}
          />

          <TextInput
            label="الوصف الشخصي"
            placeholder="اكتب نبذة عن خدماتك والمزايا التي تقدمها"
            value={formData.bio}
            onChangeText={(bio) => setFormData({ ...formData, bio })}
            error={errors.bio}
          />

          <TextInput
            label="حساب البنك (IBAN)"
            placeholder="أدخل رقم الحساب البنكي"
            value={formData.bankAccount}
            onChangeText={(bankAccount) => setFormData({ ...formData, bankAccount })}
            error={errors.bankAccount}
          />
        </View>

        <View style={styles.verificationBox}>
          <Text style={styles.verificationTitle}>✓ التحقق</Text>
          <Text style={styles.verificationText}>
            سيتم مراجعة بيانات حسابك والتحقق من الرخصة وسيتم إخطارك بالموافقة في غضون 24-48 ساعة.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonSection}>
        <AuthButton
          label="إكمال التسجيل"
          onPress={handleCompleteProfile}
          loading={loading}
          variant="primary"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  form: {
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    minWidth: '45%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#DBEAFE',
    borderColor: '#1D4ED8',
  },
  categoryButtonText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryButtonTextSelected: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 8,
  },
  verificationBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
    marginTop: 12,
  },
  verificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 8,
  },
  verificationText: {
    fontSize: 13,
    color: '#047857',
    lineHeight: 20,
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
