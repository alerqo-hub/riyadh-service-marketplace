import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AuthButton } from '../../components/AuthButton';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>🏪</Text>
          </View>
          <Text style={styles.appName}>Riyadh Services</Text>
          <Text style={styles.tagline}>اطلب الخدمات بسهولة وسرعة</Text>
        </View>

        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>لماذا نختار Riyadh Services؟</Text>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>خدمات موثوقة من محترفين معتمدين</Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>حجز سريع وسهل في أي وقت</Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>أسعار عادلة وشفافة</Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>ضمان الرضا على جميع الخدمات</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonSection}>
        <AuthButton
          label="تسجيل الدخول"
          onPress={() => router.push('/auth/login')}
          variant="primary"
        />
        <AuthButton
          label="إنشاء حساب جديد"
          onPress={() => router.push('/auth/signup')}
          variant="secondary"
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 48,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  featureSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
    color: '#10B981',
    marginRight: 12,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
});
