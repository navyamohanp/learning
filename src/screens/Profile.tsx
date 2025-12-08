import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import CustomModal from '../components/CustomModal';
import {useUserStore} from '../zustand/userStore';
import {userStore} from '../mobX/UserStoree';

export const Profile = () => {
  const [isAccountSettingsExpanded, setIsAccountSettingsExpanded] =
    useState(true);
  const [isFriendLimitModalVisible, setIsFriendLimitModalVisible] =
    useState(false);
  const [isTreeCompleteModalVisible, setIsTreeCompleteModalVisible] =
    useState(false);

  const firstName = useUserStore(state => state.firstName);
  const lastName = useUserStore(state => state.lastName);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header Background */}
      <View style={styles.headerBackground}>
        {/* Pattern placeholder - using a simple color for now */}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
              style={styles.avatar}
            />
            <View style={styles.editIconContainer}>
              <Text style={styles.editIcon}>✎</Text>
            </View>
          </View>

          <Text style={styles.name}>
            {userStore.fullName ? userStore.fullName : firstName + lastName}
          </Text>
          <Text style={styles.joinedDate}>Joined on Jan 2024</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBadge}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statText}>8/20 Friends</Text>
            </View>
            <View style={[styles.statBadge, styles.coinBadge]}>
              <Text style={styles.statIcon}>🪙</Text>
              <Text style={styles.statText}>532</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="🪙"
            iconColor="#FFD700"
            iconBg="#FFF8E1"
            title="Buy Coins"
            subtitle="Top up your balance to unlock fruits, pets & more."
          />
          <MenuItem
            icon="🌳"
            iconColor="#4CAF50"
            iconBg="#E8F5E9"
            title="Friendship Forest"
            subtitle="View all completed friendship trees in one place."
          />
          <MenuItem
            icon="🔔"
            iconColor="#5C6BC0"
            iconBg="#E8EAF6"
            title="Notifications Settings"
            subtitle="Manage your alerts"
            hasArrow={false}
            rightElement={<Text style={styles.chevron}>⌄</Text>}
          />

          {/* Account Settings */}
          <View style={styles.accordionContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                setIsAccountSettingsExpanded(!isAccountSettingsExpanded)
              }>
              <View
                style={[styles.iconContainer, {backgroundColor: '#F1F8E9'}]}>
                <Text style={{fontSize: 20, color: '#4CAF50'}}>🆔</Text>
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Account Settings</Text>
                <Text style={styles.menuSubtitle}>Profile and security</Text>
              </View>
              <Text
                style={[
                  styles.chevron,
                  isAccountSettingsExpanded && styles.chevronRotated,
                ]}>
                ^
              </Text>
            </TouchableOpacity>

            {isAccountSettingsExpanded && (
              <View style={styles.subMenuContainer}>
                <TouchableOpacity style={styles.subMenuItem}>
                  <Text style={styles.subMenuText}>Edit Profile</Text>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subMenuItem}>
                  <Text style={styles.subMenuText}>Change Password</Text>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <MenuItem
            icon="🚫"
            iconColor="#EF5350"
            iconBg="#FFEBEE"
            title="Blocked List"
            subtitle="Manage blocked users"
          />
          <MenuItem
            icon="❓"
            iconColor="#AB47BC"
            iconBg="#F3E5F5"
            title="Help & Support"
            subtitle="Get assistance"
            hasArrow={false}
            rightElement={<Text style={styles.chevron}>⌄</Text>}
          />

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          {/* Demo Buttons for Modals */}
          <TouchableOpacity
            style={[styles.logoutButton, {backgroundColor: '#4A7C59'}]}
            onPress={() => setIsFriendLimitModalVisible(true)}>
            <Text style={[styles.logoutText, {color: '#FFF'}]}>
              Show Friend Limit Modal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.logoutButton, {backgroundColor: '#4A7C59'}]}
            onPress={() => setIsTreeCompleteModalVisible(true)}>
            <Text style={[styles.logoutText, {color: '#FFF'}]}>
              Show Tree Complete Modal
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 100}} />
      </ScrollView>

      {/* Modals */}
      <CustomModal
        isVisible={isFriendLimitModalVisible}
        onClose={() => setIsFriendLimitModalVisible(false)}
        title="Friend Limit Reached"
        description="You've reached your maximum of 30 active friends. To add more, you'll need to remove an existing friend."
        icon="⚠️"
        primaryButtonText="Manage Friends"
        onPrimaryButtonPress={() => {
          setIsFriendLimitModalVisible(false);
          // Navigate to manage friends screen
        }}
      />

      <CustomModal
        isVisible={isTreeCompleteModalVisible}
        onClose={() => setIsTreeCompleteModalVisible(false)}
        title="Tree Complete!"
        description="Your friendship tree has reached 75 leaves. You earned 30 Coins!"
        primaryButtonText="Collect Reward"
        onPrimaryButtonPress={() => {
          setIsTreeCompleteModalVisible(false);
          // Handle reward collection
        }}
        secondaryButtonText="View Friendship Forest"
        onSecondaryButtonPress={() => {
          setIsTreeCompleteModalVisible(false);
          // Navigate to friendship forest
        }}
      />
    </View>
  );
};

const MenuItem = ({
  icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  hasArrow = true,
  rightElement,
}: any) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={[styles.iconContainer, {backgroundColor: iconBg}]}>
      <Text style={{fontSize: 20, color: iconColor}}>{icon}</Text>
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    {rightElement
      ? rightElement
      : hasArrow && <Text style={styles.chevron}>›</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerBackground: {
    height: 150,
    backgroundColor: '#4A7C59',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100, // Keep padding for bottom nav
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A7C59',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editIcon: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  joinedDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  coinBadge: {
    backgroundColor: '#FFF8E1',
  },
  statIcon: {
    fontSize: 16,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  menuContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  chevron: {
    fontSize: 24,
    color: '#CCC',
    fontWeight: '300',
  },
  chevronRotated: {
    transform: [{rotate: '180deg'}],
  },
  accordionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subMenuContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  subMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F1EB', // Beige color
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  subMenuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  deleteButton: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  deleteText: {
    color: '#FF5252',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    alignItems: 'center',
    padding: 20,
  },
  logoutText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
