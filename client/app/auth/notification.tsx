// app/notifications.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  primary: '#2E8B57',
  primaryLight: '#3CB371',
  primaryDark: '#228B22',
  secondary: '#FF6B35',
  accent: '#4169E1',
  background: '#F8F9FA',
  text: '#1A1A1A',
  textLight: '#666',
  white: '#FFFFFF',
  card: '#FFFFFF',
  notification: '#FF4444',
  success: '#34C759',
  warning: '#FF9500',
};

const NOTIFICATION_TYPES = {
  DEAL_ALERT: 'deal_alert',
  NEARBY_OFFER: 'nearby_offer',
  ORDER_UPDATE: 'order_update',
  SYSTEM: 'system',
  PROMOTIONAL: 'promotional',
};

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: any;
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'deals', 'orders'

  // Mock data - replace with actual API calls
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: NOTIFICATION_TYPES.DEAL_ALERT,
      title: 'Flash Sale! ⚡',
      message: '60% off all fitness memberships at Flex Gym. Limited time offer!',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      data: { dealId: '3', venue: 'Flex Gym' }
    },
    {
      id: '2',
      type: NOTIFICATION_TYPES.ORDER_UPDATE,
      title: 'Order Confirmed ✅',
      message: 'Your coffee order #12345 has been confirmed and is being prepared.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      data: { orderId: '12345', status: 'confirmed' }
    },
    {
      id: '3',
      type: NOTIFICATION_TYPES.NEARBY_OFFER,
      title: 'Special Offer Nearby 📍',
      message: 'Free dessert with any meal purchase at The Green Cafe. Just 0.3mi away!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      data: { offerId: '456', distance: '0.3mi' }
    },
    {
      id: '4',
      type: NOTIFICATION_TYPES.PROMOTIONAL,
      title: 'Weekend Special 🎉',
      message: 'Enjoy 25% off all spa services this weekend at Serenity Spa.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      data: { promoCode: 'WEEKEND25' }
    },
    {
      id: '5',
      type: NOTIFICATION_TYPES.ORDER_UPDATE,
      title: 'Order Ready for Pickup 🎯',
      message: 'Your order #12346 is ready for pickup at Downtown Coffee.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true,
      data: { orderId: '12346', status: 'ready' }
    },
    {
      id: '6',
      type: NOTIFICATION_TYPES.SYSTEM,
      title: 'App Update Available 🔄',
      message: 'A new version of the app is available with exciting new features!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      data: { version: '2.1.0' }
    },
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // Simulate API call
    setNotifications(mockNotifications.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      loadNotifications();
      setRefreshing(false);
    }, 1500);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    Alert.alert(
      'Mark All as Read',
      'Are you sure you want to mark all notifications as read?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Mark All',
          style: 'default',
          onPress: () => {
            setNotifications(prev =>
              prev.map(notification => ({ ...notification, read: true }))
            );
          },
        },
      ]
    );
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Clear All Notifications',
      'This action cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read when pressed
    if (!notification.read) {
      markAsRead(notification.id);
    }

    // Navigate based on notification type
    switch (notification.type) {
      case NOTIFICATION_TYPES.DEAL_ALERT:
        router.push(`/offers/fitness`);
        break;
      case NOTIFICATION_TYPES.ORDER_UPDATE:
        router.push('/(tabs)/myorders');
        break;
      case NOTIFICATION_TYPES.NEARBY_OFFER:
        router.push('/(tabs)/nearbyoffers');
        break;
      case NOTIFICATION_TYPES.PROMOTIONAL:
        router.push('/(tabs)/offers/explore');
        break;
      default:
        // Default action or stay on notifications page
        break;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case NOTIFICATION_TYPES.DEAL_ALERT:
        return { name: 'pricetag', color: COLORS.primary };
      case NOTIFICATION_TYPES.ORDER_UPDATE:
        return { name: 'receipt', color: COLORS.success };
      case NOTIFICATION_TYPES.NEARBY_OFFER:
        return { name: 'location', color: COLORS.accent };
      case NOTIFICATION_TYPES.PROMOTIONAL:
        return { name: 'megaphone', color: COLORS.warning };
      case NOTIFICATION_TYPES.SYSTEM:
        return { name: 'settings', color: COLORS.textLight };
      default:
        return { name: 'notifications', color: COLORS.textLight };
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case NOTIFICATION_TYPES.DEAL_ALERT:
        return COLORS.primary;
      case NOTIFICATION_TYPES.ORDER_UPDATE:
        return COLORS.success;
      case NOTIFICATION_TYPES.NEARBY_OFFER:
        return COLORS.accent;
      case NOTIFICATION_TYPES.PROMOTIONAL:
        return COLORS.warning;
      case NOTIFICATION_TYPES.SYSTEM:
        return COLORS.textLight;
      default:
        return COLORS.textLight;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'deals':
        return notification.type === NOTIFICATION_TYPES.DEAL_ALERT || 
               notification.type === NOTIFICATION_TYPES.PROMOTIONAL;
      case 'orders':
        return notification.type === NOTIFICATION_TYPES.ORDER_UPDATE;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => {
    const icon = getNotificationIcon(notification.type);
    const fadeAnim = new Animated.Value(notification.read ? 1 : 0.6);

    useEffect(() => {
      if (!notification.read) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    }, [notification.read]);

    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          !notification.read && styles.unreadNotification,
        ]}
        onPress={() => handleNotificationPress(notification)}
      >
        <Animated.View style={[styles.notificationContent, { opacity: fadeAnim }]}>
          <View style={[styles.notificationIcon, { backgroundColor: `${icon.color}15` }]}>
            <Ionicons name={icon.name} size={20} color={icon.color} />
          </View>
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle} numberOfLines={1}>
              {notification.title}
            </Text>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {notification.message}
            </Text>
            <Text style={styles.notificationTime}>
              {getTimeAgo(notification.timestamp)}
            </Text>
          </View>
          {!notification.read && (
            <View style={[styles.unreadDot, { backgroundColor: icon.color }]} />
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const FilterButton = ({ title, value, isActive }: { title: string; value: string; isActive: boolean }) => (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <TouchableOpacity style={styles.actionButton} onPress={markAllAsRead}>
              <Ionicons name="checkmark-done" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.actionButton} onPress={clearAllNotifications}>
            <Ionicons name="trash-outline" size={20} color={COLORS.notification} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          style={styles.statsCard}
        >
          <Text style={styles.statsNumber}>{unreadCount}</Text>
          <Text style={styles.statsLabel}>Unread</Text>
        </LinearGradient>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>{notifications.length}</Text>
          <Text style={styles.statsLabel}>Total</Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <FilterButton title="All" value="all" isActive={filter === 'all'} />
        <FilterButton title="Unread" value="unread" isActive={filter === 'unread'} />
        <FilterButton title="Deals" value="deals" isActive={filter === 'deals'} />
        <FilterButton title="Orders" value="orders" isActive={filter === 'orders'} />
      </ScrollView>

      {/* Notifications List */}
      <ScrollView
        style={styles.notificationsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        contentContainerStyle={[
          styles.notificationsContent,
          filteredNotifications.length === 0 && styles.emptyContent,
        ]}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyMessage}>
              {filter === 'all' 
                ? "You're all caught up!"
                : `No ${filter} notifications found`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContent: {
    padding: 20,
    gap: 12,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.textLight,
    opacity: 0.7,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});