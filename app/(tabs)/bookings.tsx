import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const bookings = [
  { service: 'Kitchen repair', date: 'Today • 5:30 PM', status: 'Confirmed' },
  { service: 'AC inspection', date: 'Tomorrow • 9:00 AM', status: 'Pending' },
  { service: 'House cleaning', date: 'Thu • 12:30 PM', status: 'Completed' },
];

export default function BookingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My bookings</Text>

        {bookings.map((booking) => (
          <View key={booking.service} style={styles.card}>
            <Text style={styles.service}>{booking.service}</Text>
            <Text style={styles.date}>{booking.date}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{booking.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
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
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  service: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  date: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    marginTop: 14,
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
});
