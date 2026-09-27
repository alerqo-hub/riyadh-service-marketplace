import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { AuthButton } from '../../components/AuthButton';
import { SelectButton } from '../../components/SelectButton';

export default function RoleSelectScreen() {
  const router = useRouter();
  const { selectRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectRole = async () => {
    if (!selectedRole) {
      Alert.alert('خطأ', 'الرجاء اختيار نوع الحساب');
      return;
    }

    setLoading(true);
    try {
      await selectRole(selectedRole);

      if (selectedRole === 'provider') {
        router.replace('/auth/provider-setup');
      } else {
        router.replace('/(tabs)/home');
      }
    } catch (error: any) {
      Alert.alert('خطأ', error.message || 'فشل في اختيار نوع الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>اختر نوع حسابك</Text>
          <Text style={styles.subtitle}>
            اختر ما إذا كنت تريد الاستفادة من الخدمات أم تقديمها
          </Text>
        </View>

        <View style={styles.rolesSection}>
          <SelectButton
            title="عميل"
            description="أبحث عن خدمات محترفة في الرياض"
            icon="person-circle-outline"
            selected={selectedRole === 'customer'}
            onPress={() => setSelectedRole('customer')}
          />

          <SelectButton
            title="مقدم خدمة"
            description="أريد تقديم خدماتي والحصول على عملاء"
            icon="briefcase-outline"
            selected={selectedRole === 'provider'}
            onPress={() => setSelectedRole('provider')}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>معلومات مهمة</Text>
          <Text style={styles.infoText}>
            {selectedRole === 'provider'
              ? 'كمقدم خدمة، ستحتاج إلى تقديم معلومات التحقق والبيانات الأساسية لنشاطك.'
              : 'كعميل، يمكنك البحث والحجز من الخدمات المتاحة في الرياض.'}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonSection}>
        <AuthButton
          label="المتابعة"
          onPress={handleSelectRole}
          loading={loading}
          variant="primary"
          disabled={!selectedRole}
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
  rolesSection: {
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1D4ED8',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
