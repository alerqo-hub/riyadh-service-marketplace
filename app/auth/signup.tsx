import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { AuthButton } from '../../components/AuthButton';
import { TextInput } from '../../components/TextInput';
import { SignupFormData } from '../../types/auth';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = 'الاسم مطلوب';
    } else if (formData.name.length < 3) {
      newErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^[0-9]{9,}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name, formData.phone);
      router.replace('/auth/role-select');
    } catch (error: any) {
      Alert.alert('خطأ', error.message || 'فشل إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>إنشاء حساب جديد</Text>
          <Text style={styles.subtitle}>انضم إلينا الآن واستمتع بخدماتنا</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="الاسم الكامل"
            placeholder="أدخل اسمك الكامل"
            value={formData.name}
            onChangeText={(name) => setFormData({ ...formData, name })}
            error={errors.name}
          />

          <TextInput
            label="البريد الإلكتروني"
            placeholder="أدخل بريدك الإلكتروني"
            value={formData.email}
            onChangeText={(email) => setFormData({ ...formData, email })}
            keyboardType="email-address"
            error={errors.email}
          />

          <TextInput
            label="رقم الهاتف"
            placeholder="أدخل رقم هاتفك"
            value={formData.phone}
            onChangeText={(phone) => setFormData({ ...formData, phone })}
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <TextInput
            label="كلمة المرور"
            placeholder="أدخل كلمة المرور (6 أحرف على الأقل)"
            value={formData.password}
            onChangeText={(password) => setFormData({ ...formData, password })}
            secureTextEntry
            error={errors.password}
          />

          <TextInput
            label="تأكيد كلمة المرور"
            placeholder="أعد إدخال كلمة المرور"
            value={formData.confirmPassword}
            onChangeText={(confirmPassword) => setFormData({ ...formData, confirmPassword })}
            secureTextEntry
            error={errors.confirmPassword}
          />
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            بالتسجيل، أوافق على <Text style={styles.termsLink}>الشروط والأحكام</Text> و
            <Text style={styles.termsLink}>سياسة الخصوصية</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonSection}>
        <AuthButton
          label="إنشاء حساب"
          onPress={handleSignup}
          loading={loading}
          variant="primary"
        />
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>هل لديك حساب بالفعل؟ </Text>
          <Text
            style={styles.loginLink}
            onPress={() => router.push('/auth/login')}
          >
            تسجيل الدخول
          </Text>
        </View>
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
  termsSection: {
    marginTop: 12,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '600',
  },
});
