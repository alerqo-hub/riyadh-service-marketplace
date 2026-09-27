import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Switch,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ServiceRequest {
  id: string;
  title: string;
  customerName: string;
  customerLocation: string;
  distance: string;
  time: string;
  date: string;
  tag: string;
  status: 'new' | 'accepted' | 'rejected';
  price: string;
  description: string;
}

const initialRequests: ServiceRequest[] = [
  {
    id: '1',
    title: 'إصلاح مكيف',
    customerName: 'عبدالله الحربي',
    customerLocation: 'حي النخيل',
    distance: '2.4 كم',
    time: 'الآن',
    date: 'اليوم • 18:30',
    tag: 'مستعجل',
    status: 'new',
    price: 'SAR 280',
    description: 'تحتاج إلى فحص مكيف مركزي في المنزل، ويجب زيارة سريعة خلال 30 دقيقة.',
  },
  {
    id: '2',
    title: 'تنظيف المنزل',
    customerName: 'سارة الزهراني',
    customerLocation: 'حي العزيزية',
    distance: '4.1 كم',
    time: 'خلال 1 ساعة',
    date: 'اليوم • 19:00',
    tag: 'شائع',
    status: 'new',
    price: 'SAR 180',
    description: 'تنظيف شقة من غرفتين مع مطبخ ومرحاض، مع تجهيز مستلزمات التنظيف.',
  },
  {
    id: '3',
    title: 'سباكة طارئة',
    customerName: 'محمد السعد',
    customerLocation: 'حي الملك فهد',
    distance: '6.8 كم',
    time: 'خلال 2 ساعة',
    date: 'غداً • 09:00',
    tag: 'طارئ',
    status: 'new',
    price: 'SAR 320',
    description: 'عطل في أنبوب ماء في المطبخ، يلزم فحص فوري وإصلاح سريع.',
  },
];

export default function ProviderHomeScreen() {
  const router = useRouter();
  const [available, setAvailable] = useState(true);
  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const stats = useMemo(() => {
    return {
      active: requests.filter((request) => request.status === 'new').length,
      accepted: requests.filter((request) => request.status === 'accepted').length,
      rejected: requests.filter((request) => request.status === 'rejected').length,
    };
  }, [requests]);

  const handleAccept = (id: string) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status: 'accepted' } : request
      )
    );
    setSelectedRequest(null);
  };

  const handleReject = (id: string) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status: 'rejected' } : request
      )
    );
    setSelectedRequest(null);
  };

  const visibleRequests = requests.filter((request) => request.status === 'new');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>مرحباً</Text>
            <Text style={styles.name}>أحمد المجد</Text>
          </View>
          <Pressable
            onPress={() => router.push('/provider/profile')}
            style={styles.avatar}
          >
            <Ionicons name="person" size={22} color="#1F2937" />
          </Pressable>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusTextWrap}>
            <Text style={styles.statusTitle}>حالة مقدم الخدمة</Text>
            <Text style={styles.statusValue}>{available ? 'متاح الآن' : 'غير متاح'}</Text>
          </View>
          <Switch
            value={available}
            onValueChange={setAvailable}
            thumbColor="#fff"
            trackColor={{ false: '#CBD5E1', true: '#22C55E' }}
          />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>طلبات جديدة</Text>
            <Text style={styles.statValue}>{stats.active}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>مقبولة</Text>
            <Text style={styles.statValue}>{stats.accepted}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>مرفوضة</Text>
            <Text style={styles.statValue}>{stats.rejected}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>الطلبات القريبة</Text>
          <Text style={styles.sectionMeta}>{visibleRequests.length} طلب جديد</Text>
        </View>

        {visibleRequests.map((request) => (
          <Pressable
            key={request.id}
            onPress={() => setSelectedRequest(request)}
            style={styles.requestCard}
          >
            <View style={styles.requestTopRow}>
              <View>
                <Text style={styles.requestTitle}>{request.title}</Text>
                <Text style={styles.customerName}>{request.customerName}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{request.tag}</Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={15} color="#6B7280" />
              <Text style={styles.metaText}>{request.customerLocation}</Text>
              <Ionicons name="navigate-outline" size={15} color="#6B7280" />
              <Text style={styles.metaText}>{request.distance}</Text>
            </View>

            <Text style={styles.timeText}>{request.date}</Text>

            <View style={styles.actionRow}>
              <Pressable
                style={[styles.smallButton, styles.acceptButton]}
                onPress={() => handleAccept(request.id)}
              >
                <Text style={styles.acceptText}>قبول</Text>
              </Pressable>
              <Pressable
                style={[styles.smallButton, styles.rejectButton]}
                onPress={() => handleReject(request.id)}
              >
                <Text style={styles.rejectText}>رفض</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        visible={!!selectedRequest}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedRequest(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedRequest?.title}</Text>
              <Pressable onPress={() => setSelectedRequest(null)}>
                <Ionicons name="close" size={24} color="#111827" />
              </Pressable>
            </View>

            <Text style={styles.modalLabel}>العميل</Text>
            <Text style={styles.modalText}>{selectedRequest?.customerName}</Text>

            <Text style={styles.modalLabel}>الموقع</Text>
            <Text style={styles.modalText}>{selectedRequest?.customerLocation}</Text>

            <Text style={styles.modalLabel}>المسافة</Text>
            <Text style={styles.modalText}>{selectedRequest?.distance}</Text>

            <Text style={styles.modalLabel}>الوصف</Text>
            <Text style={styles.modalText}>{selectedRequest?.description}</Text>

            <View style={styles.modalMetaRow}>
              <Text style={styles.modalMeta}>التاريخ: {selectedRequest?.date}</Text>
              <Text style={styles.modalMeta}>السعر: {selectedRequest?.price}</Text>
            </View>

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.acceptButton]}
                onPress={() => selectedRequest && handleAccept(selectedRequest.id)}
              >
                <Text style={styles.acceptText}>قبول الطلب</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.rejectButton]}
                onPress={() => selectedRequest && handleReject(selectedRequest.id)}
              >
                <Text style={styles.rejectText}>رفض الطلب</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'right',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  statusTextWrap: {
    alignItems: 'flex-end',
  },
  statusTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  statsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 22,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  sectionMeta: {
    fontSize: 12,
    color: '#6B7280',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  requestTopRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  requestTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'right',
  },
  customerName: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#DBEAFE',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  metaRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 13,
    color: '#374151',
  },
  timeText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'right',
    marginBottom: 14,
  },
  actionRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    gap: 10,
  },
  smallButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#DCFCE7',
  },
  rejectButton: {
    backgroundColor: '#FEE2E2',
  },
  acceptText: {
    color: '#166534',
    fontWeight: '700',
    fontSize: 14,
  },
  rejectText: {
    color: '#B91C1C',
    fontWeight: '700',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(17,24,39,0.35)',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },
  modalHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'right',
  },
  modalLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
    textAlign: 'right',
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'right',
    lineHeight: 24,
  },
  modalMetaRow: {
    marginTop: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalMeta: {
    fontSize: 13,
    color: '#374151',
    textAlign: 'right',
  },
  modalActions: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
});
