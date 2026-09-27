import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServiceCard } from '../../components/ServiceCard';
import { SectionHeader } from '../../components/SectionHeader';

const categories = [
  { name: 'Plumbing', icon: 'water-outline', color: '#DBEAFE' },
  { name: 'Cleaning', icon: 'sparkles-outline', color: '#DCFCE7' },
  { name: 'Electrical', icon: 'flash-outline', color: '#FDE68A' },
  { name: 'AC Repair', icon: 'snow-outline', color: '#E0E7FF' },
];

const services = [
  { title: 'Express Plumbing', subtitle: 'Fix pipes & leaks', price: 'From SAR 120', rating: '4.9', tag: 'Popular', accent: '#DBEAFE' },
  { title: 'Home Deep Cleaning', subtitle: '2-bedroom package', price: 'From SAR 180', rating: '4.8', tag: 'Top rated', accent: '#DCFCE7' },
  { title: 'AC Maintenance', subtitle: 'Inspection + tune-up', price: 'From SAR 220', rating: '4.7', tag: 'Best value', accent: '#FDE68A' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.title}>Riyadh Service Marketplace</Text>
          </View>
          <View style={styles.avatarBox}>
            <Ionicons name="notifications-outline" size={22} color="#1F2937" />
          </View>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#6B7280" />
          <Text style={styles.searchText}>Search for services</Text>
        </View>

        <SectionHeader title="Popular categories" action="See all" />
        <View style={styles.categoryRow}>
          {categories.map((category) => (
            <View key={category.name} style={[styles.categoryCard, { backgroundColor: category.color }]}>
              <Ionicons name={category.icon as any} size={24} color="#111827" />
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Featured services" action="View all" />
        <View style={styles.serviceList}>
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              subtitle={service.subtitle}
              price={service.price}
              rating={service.rating}
              tag={service.tag}
              accent={service.accent}
            />
          ))}
        </View>
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
    paddingTop: 18,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  avatarBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 24,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchText: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  serviceList: {
    gap: 14,
  },
});
