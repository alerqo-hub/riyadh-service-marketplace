import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ServiceCardProps = {
  title: string;
  subtitle: string;
  price: string;
  rating: string;
  tag: string;
  accent: string;
};

export function ServiceCard({ title, subtitle, price, rating, tag, accent }: ServiceCardProps) {
  return (
    <Pressable style={[styles.card, { backgroundColor: accent }]}>
      <View style={styles.topRow}>
        <Text style={styles.tag}>{tag}</Text>
        <Text style={styles.rating}>★ {rating}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.price}>{price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 11,
    fontWeight: '700',
    color: '#111827',
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  title: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#374151',
  },
  price: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
});
