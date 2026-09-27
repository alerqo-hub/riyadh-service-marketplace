import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DocumentUploadButtonProps {
  label: string;
  onPress: () => void;
  fileName?: string;
  isUploading?: boolean;
}

export function DocumentUploadButton({
  label,
  onPress,
  fileName,
  isUploading = false,
}: DocumentUploadButtonProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        onPress={onPress}
        disabled={isUploading}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isUploading && styles.buttonDisabled,
        ]}
      >
        <Ionicons
          name={fileName ? 'checkmark-circle' : 'cloud-upload-outline'}
          size={24}
          color={fileName ? '#10B981' : '#1D4ED8'}
        />
        <Text style={styles.buttonText}>
          {isUploading ? 'جاري الرفع...' : fileName ? 'تم الرفع' : 'رفع المستند'}
        </Text>
        {fileName && <Text style={styles.fileName}>{fileName}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'right',
  },
  button: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4FF',
    borderWidth: 2,
    borderColor: '#DBEAFE',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 10,
  },
  buttonPressed: {
    backgroundColor: '#E0F2FE',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  fileName: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});
