import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface VerificationStatusProps {
  status: 'pending' | 'under_review' | 'verified' | 'rejected';
}

const statusConfig = {
  pending: {
    label: 'معلق',
    icon: 'time-outline',
    color: '#6B7280',
    bgColor: '#F3F4F6',
    description: 'سيتم بدء المراجعة قريباً',
  },
  under_review: {
    label: 'قيد المراجعة',
    icon: 'hourglass-outline',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    description: 'فريقنا يقوم بمراجعة مستنداتك الآن',
  },
  verified: {
    label: 'موثق',
    icon: 'checkmark-circle',
    color: '#10B981',
    bgColor: '#ECFDF5',
    description: 'تم التحقق من حسابك بنجاح',
  },
  rejected: {
    label: 'مرفوض',
    icon: 'close-circle',
    color: '#EF4444',
    bgColor: '#FEE2E2',
    description: 'تم رفض طلب التحقق. يرجى المحاولة مجدداً',
  },
};

export function VerificationStatus({ status }: VerificationStatusProps) {
  const config = statusConfig[status];

  return (
    <View style={[styles.container, { backgroundColor: config.bgColor }]}>
      <View style={styles.headerRow}>
        <Ionicons name={config.icon as any} size={24} color={config.color} />
        <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
      </View>
      <Text style={styles.description}>{config.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  headerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'right',
    lineHeight: 20,
  },
});
