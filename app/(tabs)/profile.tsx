import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.card}>
          <Text style={styles.name}>Mohammed Alsaad</Text>
          <Text style={styles.email}>mohammed@example.com</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Favorite city</Text>
          <Text style={styles.value}>Riyadh</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Membership</Text>
          <Text style={styles.value}>Premium</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  email: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  label: {
    color: '#374151',
    fontSize: 14,
  },
  value: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 14,
  },
});
