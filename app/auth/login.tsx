import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { AuthButton } from '../../components/AuthButton';
import { TextInput } from '../../components/TextInput';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('خطأ', error.message || 'فشل تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>تسجيل الدخول</Text>
          <Text style={styles.subtitle}>أدخل بيانات حسابك للمتابعة</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="البريد الإلكتروني"
            placeholder="أدخل بريدك الإلكتروني"
            value={formData.email}
            onChangeText={(email) => setFormData({ ...formData, email })}
            keyboardType="email-address"
            error={errors.email}
          />

          <TextInput
            label="كلمة المرور"
            placeholder="أدخل كلمة المرور"
            value={formData.password}
            onChangeText={(password) => setFormData({ ...formData, password })}
            secureTextEntry
            error={errors.password}
          />
        </View>

        <View style={styles.forgotSection}>
          <Text style={styles.forgotText}>هل نسيت كلمة المرور؟</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonSection}>
        <AuthButton
          label="تسجيل الدخول"
          onPress={handleLogin}
          loading={loading}
          variant="primary"
        />
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>ليس لديك حساب؟ </Text>
          <Text
            style={styles.signupLink}
            onPress={() => router.push('/auth/signup')}
          >
            إنشاء حساب
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
  forgotSection: {
    alignItems: 'center',
    marginTop: 12,
  },
  forgotText: {
    color: '#1D4ED8',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  signupText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signupLink: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '600',
  },
});
