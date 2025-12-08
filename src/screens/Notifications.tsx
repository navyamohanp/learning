import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  SectionListRenderItem,
  Image,
  ImageSourcePropType,
} from 'react-native';

type NotificationType =
  | 'time_to_water'
  | 'new_friend_request'
  | 'new_reply'
  | 'new_affirmation'
  | 'milestone_unlocked'
  | 'tree_wilting';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  subtitle: string;
  time: string;
  isNew: boolean;
}

interface NotificationSection {
  title: string;
  showMarkAll: boolean;
  data: Notification[];
}

const NOTIFICATION_CONFIG: Record<
  NotificationType,
  {icon: ImageSourcePropType;}
> = {
  time_to_water: {
    icon: require('../assets/notification/timetowater.png'),

  },
  new_friend_request: {
    icon: require('../assets/notification/newfriend.png'),
 
  },
  new_reply: {
    icon: require('../assets/notification/newreply.png'),

  },
  new_affirmation: {
    icon: require('../assets/notification/newaffirmation.png'),

  },
  milestone_unlocked: {
    icon: require('../assets/notification/milestone.png'),

  },
  tree_wilting: {
    icon: require('../assets/notification/treewilting.png'),
 
  },
};
const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'time_to_water',
    title: "Time to water Arlene's tree!",
    subtitle: 'Your friendship needs some love',
    time: '20m ago',
    isNew: true,
  },
  {
    id: '2',
    type: 'new_friend_request',
    title: 'New friend request',
    subtitle: 'Alex wants to connect with you',
    time: '4hr ago',
    isNew: true,
  },
  {
    id: '3',
    type: 'new_reply',
    title: 'New Reply',
    subtitle: 'Bessie replied to you',
    time: '7hr ago',
    isNew: true,
  },
  {
    id: '4',
    type: 'new_affirmation',
    title: 'New affirmation',
    subtitle: 'Marie sent you an affirmation',
    time: '20m ago',
    isNew: false,
  },
  {
    id: '5',
    type: 'new_reply',
    title: 'New Reply',
    subtitle: 'Bessie replied to you',
    time: '1d ago',
    isNew: false,
  },
  {
    id: '6',
    type: 'milestone_unlocked',
    title: 'Milestone unlocked!',
    subtitle: 'Your tree with Emma reached level 5',
    time: '1d ago',
    isNew: false,
  },
  {
    id: '7',
    type: 'tree_wilting',
    title: "Sarah's tree is wilting",
    subtitle: 'Your friendship needs attention',
    time: '1d ago',
    isNew: false,
  },
];
// const DUMMY_NOTIFICATIONS: Notification[] = [];

const Notifications = () => {
  const newNotifications = DUMMY_NOTIFICATIONS.filter(n => n.isNew);
  const oldNotifications = DUMMY_NOTIFICATIONS.filter(n => !n.isNew);

  const sections: NotificationSection[] = [
    {
      title: `${newNotifications.length} new notifications`,
      showMarkAll: true,
      data: newNotifications,
    },
    {
      title: 'Old notifications',
      showMarkAll: false,
      data: oldNotifications,
    },
  ].filter(section => section.data.length > 0);

  const renderItem: SectionListRenderItem<Notification, NotificationSection> = ({
    item,
  }) => <NotificationItem notification={item} />;

  const renderSectionHeader = ({
    section,
  }: {
    section: NotificationSection;
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.showMarkAll && (
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all as read</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      {DUMMY_NOTIFICATIONS.length === 0 ? (
        <EmptyNotifications />
      ) : (
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      )}
    </SafeAreaView>
  );
};

const EmptyNotifications = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image 
        source={require('../assets/notification/empty.png')} 
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>No Notifications Yet</Text>
      <Text style={styles.emptySubtitle}>
        Nothing new here yet. Connect with friends,{'\n'}complete trees, and your notifications will{'\n'}bloom!
      </Text>
    </View>
  );
};

const NotificationItem = ({notification}: {notification: Notification}) => {
  const config = NOTIFICATION_CONFIG[notification.type];
  
  return (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={[styles.iconContainer]}>
        <Image source={config.icon} style={styles.iconImage} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <View style={styles.subtitleRow}>
          <Text style={styles.notificationSubtitle}>{notification.subtitle}</Text><View style={styles.graydot}/>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
      </View>
      {notification.isNew && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#333',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#464B49',
  },
  placeholder: {
    width: 40,
  },
  listContent: {
    paddingBottom: 100,
  },
  separator: {
    height: 1,
    backgroundColor: '#EDF1F7',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#464B49',
  },
  markAllRead: {
    fontSize: 14,
    color: '#4C7865',
    fontWeight: '500',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f7',
    paddingHorizontal: 16,
    paddingVertical: 14,

  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#464B49',
    marginBottom: 2,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationSubtitle: {
    fontSize: 13,
    color: '#8E8E8E',
  },
  notificationTime: {
    fontSize: 13,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4C7865',
    marginLeft: 8,
  },
  graydot:{marginHorizontal:8,width:5, height:5, borderRadius:2.5, backgroundColor:'gray'},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,

  },
  emptyIcon: {
    width: 120,
    height: 120,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#464B49',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8E8E8E',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Notifications;
