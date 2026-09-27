import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SelectButtonProps {
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}

export function SelectButton({
  title,
  description,
  icon,
  selected,
  onPress,
}: SelectButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        selected && styles.selected,
      ]}
    >
      <View style={[styles.iconBox, selected && styles.iconBoxSelected]}>
        <Ionicons name={icon as any} size={32} color={selected ? '#1D4ED8' : '#6B7280'} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {selected && (
        <View style={styles.checkmark}>
          <Ionicons name="checkmark-circle" size={24} color="#1D4ED8" />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selected: {
    borderColor: '#1D4ED8',
    backgroundColor: '#F0F4FF',
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBoxSelected: {
    backgroundColor: '#DBEAFE',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  checkmark: {
    marginLeft: 12,
  },
});
