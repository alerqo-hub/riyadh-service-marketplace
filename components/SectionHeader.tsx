import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type SectionHeaderProps = {
  title: string;
  action: string;
};

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.action}>{action}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  action: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
});
