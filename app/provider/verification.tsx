import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, I18nManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { AuthButton } from '../../components/AuthButton';
import { TextInput } from '../../components/TextInput';
import { DocumentUploadButton } from '../../components/DocumentUploadButton';
import { VerificationStatus } from '../../components/VerificationStatus';

// Set RTL
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

interface VerificationFormData {
  identityNumber: string;
  idDocumentName?: string;
}

interface FormErrors {
  identityNumber?: string;
}

export default function VerificationScreen() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState<VerificationFormData>({
    identityNumber: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);

  const verificationStatus = user?.verificationStatus || {
    status: 'pending',
    identityNumber: '',
    documents: [],
    submittedAt: null,
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.identityNumber) {
      newErrors.identityNumber = 'رقم الهوية مطلوب';
    } else if (!/^[0-9]{10}$/.test(formData.identityNumber.replace(/[^0-9]/g, ''))) {
      newErrors.identityNumber = 'رقم الهوية يجب أن يكون 10 أرقام';
    }

    if (!formData.idDocumentName) {
      newErrors.identityNumber = (newErrors.identityNumber || '') + ' يجب رفع صورة الهوية';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadDocument = async () => {
    setUploadingId(true);
    try {
      // Simulate document upload
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFormData({ ...formData, idDocumentName: 'صورة_الهوية.jpg' });
      Alert.alert('نجاح', 'تم رفع المستند بنجاح');
    } catch (error) {
      Alert.alert('خطأ', 'فشل في رفع المستند');
    } finally {
      setUploadingId(false);
    }
  };

  const handleSubmitVerification = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await updateUser({
        verificationStatus: {
          status: 'under_review',
          identityNumber: formData.identityNumber,
          documents: [
            {
              id: Date.now().toString(),
              type: 'id',
              uri: 'file://mock',
              fileName: formData.idDocumentName || '',
              uploadedAt: new Date().toISOString(),
            },
          ],
          submittedAt: new Date().toISOString(),
        },
      });

      Alert.alert('نجاح', 'تم إرسال طلب التحقق بنجاح. سيتم مراجعة مستنداتك قريباً');
    } catch (error: any) {
      Alert.alert('خطأ', error.message || 'فشل في إرسال طلب التحقق');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>تحقق من حسابك</Text>
          <Text style={styles.subtitle}>
            أكمل عملية التحقق من هويتك للبدء في استقبال الطلبات
          </Text>
        </View>

        <View style={styles.statusSection}>
          <VerificationStatus status={verificationStatus.status} />
        </View>

        {verificationStatus.status === 'pending' || verificationStatus.status === 'rejected' ? (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>بيانات التحقق</Text>

            <TextInput
              label="رقم الهوية"
              placeholder="أدخل رقم هويتك الوطنية (10 أرقام)"
              value={formData.identityNumber}
              onChangeText={(identityNumber) =>
                setFormData({ ...formData, identityNumber })
              }
              keyboardType="numeric"
              error={errors.identityNumber}
            />

            <DocumentUploadButton
              label="صورة الهوية"
              onPress={handleUploadDocument}
              fileName={formData.idDocumentName}
              isUploading={uploadingId}
            />

            <View style={styles.requirementsBox}>
              <Text style={styles.requirementsTitle}>متطلبات الصورة:</Text>
              <View style={styles.requirement}>
                <Text style={styles.requirementIcon}>✓</Text>
                <Text style={styles.requirementText}>صورة واضحة وجيدة الإضاءة</Text>
              </View>
              <View style={styles.requirement}>
                <Text style={styles.requirementIcon}>✓</Text>
                <Text style={styles.requirementText}>تظهر جميع البيانات بوضوح</Text>
              </View>
              <View style={styles.requirement}>
                <Text style={styles.requirementIcon}>✓</Text>
                <Text style={styles.requirementText}>صيغة الملف: JPG أو PNG</Text>
              </View>
            </View>

            <AuthButton
              label="إرسال للتحقق"
              onPress={handleSubmitVerification}
              loading={loading}
              variant="primary"
            />
          </View>
        ) : (
          <View style={styles.reviewingSection}>
            <Text style={styles.reviewingTitle}>شكراً لك!</Text>
            <Text style={styles.reviewingText}>
              تم استقبال طلب التحقق الخاص بك. فريقنا يقوم بمراجعة مستنداتك الآن.
            </Text>
            <View style={styles.timelineBox}>
              <Text style={styles.timelineTitle}>متوسط وقت المراجعة: 24-48 ساعة</Text>
              <Text style={styles.timelineSubtitle}>
                سيتم إخطارك بالبريد الإلكتروني عند انتهاء المراجعة
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
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
    paddingBottom: 32,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'right',
    lineHeight: 22,
  },
  statusSection: {
    marginBottom: 28,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'right',
  },
  requirementsBox: {
    backgroundColor: '#F0F4FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#1D4ED8',
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 12,
    textAlign: 'right',
  },
  requirement: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  requirementIcon: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requirementText: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
    textAlign: 'right',
  },
  reviewingSection: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  reviewingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 12,
    textAlign: 'center',
  },
  reviewingText: {
    fontSize: 15,
    color: '#047857',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  timelineBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    width: '100%',
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 6,
    textAlign: 'center',
  },
  timelineSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
