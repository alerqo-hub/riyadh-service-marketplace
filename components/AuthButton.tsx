import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface AuthButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function AuthButton({
  label,
  onPress,
  loading = false,
  variant = 'primary',
  disabled = false,
}: AuthButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        (loading || disabled) && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          isPrimary ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {loading ? 'جاري...' : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: '#1D4ED8',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#1D4ED8',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
