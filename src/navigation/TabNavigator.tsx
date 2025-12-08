import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Shop from '../screens/Shop';
import Premium from '../screens/Premium';

const Tab = createBottomTabNavigator();

const {width} = Dimensions.get('window');
const TAB_HEIGHT = 90;
const TAB_COUNT = 4;
const TAB_WIDTH = width / TAB_COUNT;

const TabShape = ({activeTabIndex}: {activeTabIndex: number}) => {
  const curveWidth = 140;
  const curveDepth = 70;
  const curveCenter = activeTabIndex * TAB_WIDTH + TAB_WIDTH / 2;
  const curveStart = curveCenter - curveWidth / 2;
  const curveEnd = curveCenter + curveWidth / 2;

  const d = `
    M 0 ${TAB_HEIGHT}
    L 0 30
    Q 0 0 30 0
    L ${curveStart} 0
    C ${curveStart + 45} 0 ${curveCenter - 40} ${curveDepth} ${curveCenter} ${curveDepth}
    C ${curveCenter + 40} ${curveDepth} ${curveEnd - 45} 0 ${curveEnd} 0
    L ${width - 30} 0
    Q ${width} 0 ${width} 30
    L ${width} ${TAB_HEIGHT}
    Z
  `;

  return (
    <View style={styles.svgContainer}>
      <Svg width={width} height={TAB_HEIGHT}>
        <Path d={d} fill="#FFF8F6" />
      </Svg>
    </View>
  );
};

const CustomTabBar = ({state, descriptors, navigation}: any) => {
  const activeTabIndex = state.index;

  return (
    <View style={styles.bottomNavContainer}>
      <TabShape activeTabIndex={activeTabIndex} />
      <View style={styles.bottomNavContent}>
        {state.routes.map((route: any, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let icon = '';
          if (route.name === 'Home') icon = '🏠';
          else if (route.name === 'Shop') icon = '🏪';
          else if (route.name === 'Premium') icon = '👑';
          else if (route.name === 'Profile') icon = '👤';

          // If focused, render empty view to hold space (floating button handles it)
          if (isFocused) {
             return (
              <View key={index} style={{width: TAB_WIDTH}} /> 
            );
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[styles.navItem, {width: TAB_WIDTH}]}>
              <View
                style={[
                  styles.navIconContainer,
                  // isFocused && styles.navIconActive, // Handled by floating button
                ]}>
                <Text
                  style={[
                    styles.navIcon,
                    // isFocused && styles.navIconTextActive,
                  ]}>
                  {icon}
                </Text>
              </View>
              <Text
                style={[
                  styles.navLabel,
                  // isFocused && styles.navLabelActive,
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Floating Active Icon */}
      {state.routes.map((route: any, index: any) => {
        const isFocused = state.index === index;
        if (!isFocused) return null;

        const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
        };
        
        // Dynamic position for floating button
        const leftPosition = index * TAB_WIDTH + (TAB_WIDTH - 60) / 2;

        let icon = '';
        if (route.name === 'Home') icon = '🏠';
        else if (route.name === 'Shop') icon = '🏪';
        else if (route.name === 'Premium') icon = '👑';
        else if (route.name === 'Profile') icon = '👤';
        
        const label = route.name;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.activeIconWrapper, {left: leftPosition}]}
            onPress={onPress}
            activeOpacity={1} // Prevent flicker
            >
            <View
              style={[
                styles.activeIconContainer,
                {backgroundColor: '#FF6B6B'},
              ]}>
              <Text style={[styles.activeIcon]}>{icon}</Text>
            </View>
            <Text style={[styles.activeLabel]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Profile">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Premium" component={Premium} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_HEIGHT,
    backgroundColor: 'transparent',
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_HEIGHT,
    zIndex: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomNavContent: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 30,
    // paddingHorizontal: 24, // Removed padding to use calculated widths
    justifyContent: 'flex-start', // Align start for calculated widths
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_HEIGHT,
    alignItems: 'flex-start',
    zIndex: 1,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    // width set dynamically
  },
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: '#FCE4EC',
  },
  navIconActive: {
    backgroundColor: '#FF8A80',
  },
  navIcon: {
    fontSize: 20,
    color: '#333',
  },
  navIconTextActive: {
    color: '#FFFFFF',
  },
  navLabel: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#333',
    fontWeight: '700',
  },
  activeIconWrapper: {
    position: 'absolute',
    bottom: 5, // Moved down from 30 to place text on white background
    // right removed, left set dynamically
    alignItems: 'center',
    width: 60,
    zIndex: 2,
  },
  activeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: '#FF6B6B',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  activeIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  activeLabel: {
    fontSize: 12,
    color: '#000',
    fontWeight: '700',
  },
});

export default TabNavigator;
