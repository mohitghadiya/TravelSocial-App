

// import React, { useState, useRef } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Dimensions,
//   FlatList,
//   Animated,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const { width, height } = Dimensions.get('window');
// const isSmallScreen = width < 375;
// const isTablet = width > 768;

// const ProfileScreen = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isFollowing, setIsFollowing] = useState(false);
//   const scrollY = useRef(new Animated.Value(0)).current;

//   // Colors from your screenshots
//   const colors = {
//     primary: '#000000', // Black text
//     secondary: '#666666', // Gray text
//     lightGray: '#F5F5F5', // Light background
//     white: '#FFFFFF',
//     border: '#E5E5E5',
//     badgeActive: '#000000', // Black for active badge
//     badgeInactive: '#CCCCCC', // Light gray for inactive
//     sectionTitle: '#333333',
//     statValue: '#000000',
//     statLabel: '#888888',
//     tabActive: '#000000',
//     tabInactive: '#999999',
//     chartBar: '#4A90E2', // Blue from chart
//     countryBg: '#F8F8F8',
//     travelCardBg: '#FAFAFA',
//     achievementBg: '#F0F8FF', // Light blue for achievements
//   };

//   // Mock data
//   const userStats = {
//     followers: '12.4K',
//     following: '892',
//     distance: '28.5K km',
//     streak: '42 days',
//   };

//   const profileStats = [
//     { id: '1', value: '42', label: 'Cities Visited' },
//     { id: '2', value: '12', label: 'Countries Visited' },
//     { id: '3', value: '318', label: 'Photos Uploaded' },
//   ];

//   const badges = [
//     { id: '1', name: 'Explorer', isActive: false },
//     { id: '2', name: 'Treater', isActive: true },
//     { id: '3', name: 'Frequent', isActive: false },
//     { id: '4', name: 'Streak', isActive: false },
//   ];

//   const countries = [
//     { id: '1', name: 'USA', code: 'US' },
//     { id: '2', name: 'France', code: 'FR' },
//     { id: '3', name: 'Japan', code: 'JP' },
//     { id: '4', name: 'Australia', code: 'AU' },
//     { id: '5', name: 'Thailand', code: 'TH' },
//     { id: '6', name: 'Greece', code: 'GR' },
//     { id: '7', name: '+6 more', code: '🌍' },
//   ];

//   const travelPlans = [
//     { id: '1', city: 'Barcelona', country: 'Spain', date: 'Jan 2026', type: 'planned' },
//     { id: '2', city: 'Iceland', country: 'Iceland', date: 'Mar 2026', type: 'planned' },
//     { id: '3', city: 'New Zealand', country: 'NZ', date: 'Wishlist', type: 'wishlist' },
//   ];

//   const achievements = [
//     { id: '1', title: '1,000 km', subtitle: 'Milestone', description: 'Traveled 1,000 km' },
//     { id: '2', title: '10 Cities', subtitle: 'Visited', description: 'Explored 10 cities' },
//     { id: '3', title: '5 Countries', subtitle: 'Unlocked', description: 'Visited 5 countries' },
//   ];

//   const recentActivities = [
//     { id: '1', type: 'checkin', text: 'Checked in at Goa, India', time: '2 hours ago' },
//     { id: '2', type: 'live', text: 'Went Live in Santorini, Greece', time: '1 day ago' },
//     { id: '3', type: 'photos', text: 'Added 3 photos in Paris, France', time: '3 days ago' },
//     { id: '4', type: 'checkin', text: 'Checked in at Dubai, UAE', time: '5 days ago' },
//   ];

//   const weeklyActivity = [
//     { day: 'Mon', km: 20 },
//     { day: 'Tue', km: 50 },
//     { day: 'Wed', km: 80 },
//     { day: 'Thu', km: 120 },
//     { day: 'Fri', km: 150 },
//     { day: 'Sat', km: 200 },
//     { day: 'Sun', km: 180 },
//   ];

//   const photos = Array.from({ length: 6 }, (_, i) => ({
//     id: String(i + 1),
//     uri: `https://picsum.photos/400/400?random=${i + 1}`,
//   }));

//   const headerHeight = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [60, 50],
//     extrapolate: 'clamp',
//   });

//   const renderHeader = () => (
//     <Animated.View style={[styles.header, { height: headerHeight }]}>
//       <TouchableOpacity 
//         onPress={() => navigation.goBack()} 
//         style={styles.backButton}
//         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//       >
//         <Icon name="chevron-back" size={24} color={colors.primary} />
//       </TouchableOpacity>
//       <Text style={styles.headerTitle}>Profile</Text>
//       <TouchableOpacity 
//         onPress={() => navigation.navigate('Settings')} 
//         style={styles.settingsButton}
//         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//       >
//         <Icon name="ellipsis-horizontal" size={24} color={colors.primary} />
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   const renderProfileInfo = () => (
//     <View style={styles.profileInfoContainer}>
//       <View style={styles.profileImageSection}>
//         <Image
//           source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
//           style={styles.profileImage}
//         />
//         <TouchableOpacity style={styles.editPhotoButton}>
//           <Icon name="camera" size={16} color={colors.white} />
//         </TouchableOpacity>
//       </View>
      
//       <Text style={styles.userName}>Emma Rivers</Text>
      
//       {/* Badges */}
//       <View style={styles.badgesContainer}>
//         {badges.map((badge) => (
//           <View key={badge.id} style={styles.badgeItem}>
//             <View style={[
//               styles.badgeCheckbox,
//               badge.isActive && styles.badgeCheckboxActive
//             ]}>
//               {badge.isActive && <Icon name="checkmark" size={12} color={colors.white} />}
//             </View>
//             <Text style={[
//               styles.badgeText,
//               badge.isActive && styles.badgeTextActive
//             ]}>
//               {badge.name}
//             </Text>
//           </View>
//         ))}
//       </View>
      
//       <Text style={styles.userTagline}>Digital nomad & adventure seeker</Text>
//       <Text style={styles.userBio}>Documenting my journey one city at a time</Text>
//     </View>
//   );

//   const renderActionButtons = () => (
//     <View style={styles.actionButtons}>
//       <TouchableOpacity 
//         style={styles.editButton}
//         onPress={() => navigation.navigate('EditProfile')}
//       >
//         <Text style={styles.editButtonText}>Edit Profile</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.messageButton}>
//         <Text style={styles.messageButtonText}>Message</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity 
//         style={[styles.followButton, isFollowing && styles.followingButton]}
//         onPress={() => setIsFollowing(!isFollowing)}
//       >
//         <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
//           {isFollowing ? 'Following' : 'Follow'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderStats = () => (
//     <View style={styles.statsContainer}>
//       <View style={styles.statItem}>
//         <Text style={styles.statNumber}>{userStats.followers}</Text>
//         <Text style={styles.statLabel}>Followers</Text>
//       </View>
//       <View style={styles.statDivider} />
//       <View style={styles.statItem}>
//         <Text style={styles.statNumber}>{userStats.following}</Text>
//         <Text style={styles.statLabel}>Following</Text>
//       </View>
//       <View style={styles.statDivider} />
//       <View style={styles.statItem}>
//         <Text style={styles.statNumber}>{userStats.distance}</Text>
//         <Text style={styles.statLabel}>Distance</Text>
//       </View>
//       <View style={styles.statDivider} />
//       <View style={styles.statItem}>
//         <Text style={styles.statNumber}>{userStats.streak}</Text>
//         <Text style={styles.statLabel}>Streak</Text>
//       </View>
//     </View>
//   );

//   const renderProfileStats = () => (
//     <View style={styles.profileStatsContainer}>
//       {profileStats.map((stat) => (
//         <View key={stat.id} style={styles.profileStatCard}>
//           <Text style={styles.profileStatNumber}>{stat.value}</Text>
//           <Text style={styles.profileStatLabel}>{stat.label}</Text>
//         </View>
//       ))}
//     </View>
//   );

//   const renderWeeklyActivity = () => (
//     <View style={styles.section}>
//       <Text style={styles.sectionTitle}>Daily Travel Activity</Text>
      
//       {/* Y-axis labels */}
//       <View style={styles.chartYAxis}>
//         <Text style={styles.chartYLabel}>200</Text>
//         <Text style={styles.chartYLabel}>150</Text>
//         <Text style={styles.chartYLabel}>100</Text>
//         <Text style={styles.chartYLabel}>50</Text>
//         <Text style={styles.chartYLabel}>0</Text>
//       </View>
      
//       {/* Chart bars */}
//       <View style={styles.chartContainer}>
//         {weeklyActivity.map((day, index) => (
//           <View key={index} style={styles.chartColumn}>
//             <View style={[styles.chartBar, { height: `${(day.km / 200) * 80}%` }]} />
//             <Text style={styles.chartDay}>{day.day}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );

//   const renderCountries = () => (
//     <View style={styles.section}>
//       <View style={styles.sectionHeaderRow}>
//         <Text style={styles.sectionTitle}>Visited Countries</Text>
//         <Text style={styles.sectionSubtitle}>12 countries</Text>
//       </View>
      
//       <FlatList
//         data={countries}
//         numColumns={isTablet ? 4 : 3}
//         scrollEnabled={false}
//         columnWrapperStyle={isTablet ? styles.countriesRowTablet : styles.countriesRow}
//         renderItem={({ item }) => (
//           <View style={styles.countryItem}>
//             <View style={styles.countryFlag}>
//               <Text style={styles.countryCode}>{item.code}</Text>
//             </View>
//             <Text style={styles.countryName}>{item.name}</Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );

//   const renderTravelPlans = () => (
//     <View style={styles.section}>
//       <View style={styles.sectionHeaderRow}>
//         <View>
//           <Text style={styles.sectionTitle}>Upcoming Travel Plans</Text>
//         </View>
//         <TouchableOpacity style={styles.editPlanButton}>
//           <Text style={styles.editPlanText}>Edit Plan</Text>
//         </TouchableOpacity>
//       </View>
      
//       {travelPlans.map((plan) => (
//         <View key={plan.id} style={styles.travelPlanCard}>
//           <View style={styles.planLeft}>
//             <View style={styles.planIcon}>
//               <Icon name="airplane" size={20} color={colors.primary} />
//             </View>
//             <View style={styles.planInfo}>
//               <Text style={styles.planCity}>{plan.city}</Text>
//               <Text style={styles.planCountry}>{plan.country}</Text>
//             </View>
//           </View>
//           <View style={[
//             styles.planDate,
//             plan.type === 'wishlist' && styles.wishlistDate
//           ]}>
//             <Text style={[
//               styles.planDateText,
//               plan.type === 'wishlist' && styles.wishlistDateText
//             ]}>
//               {plan.date}
//             </Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );

//   const renderAchievements = () => (
//     <View style={styles.section}>
//       <Text style={styles.sectionTitle}>Achievements & Badges</Text>
      
//       {achievements.map((achievement) => (
//         <View key={achievement.id} style={styles.achievementCard}>
//           <View style={styles.achievementBadge}>
//             <Text style={styles.achievementBadgeText}>{achievement.title}</Text>
//           </View>
//           <View style={styles.achievementContent}>
//             <Text style={styles.achievementTitle}>{achievement.subtitle}</Text>
//             <Text style={styles.achievementDescription}>{achievement.description}</Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );

//   const renderRecentActivity = () => (
//     <View style={styles.section}>
//       <Text style={styles.sectionTitle}>Recent Activity</Text>
      
//       {recentActivities.map((activity) => (
//         <View key={activity.id} style={styles.activityItem}>
//           <View style={styles.activityDot} />
//           <View style={styles.activityContent}>
//             <Text style={styles.activityText}>
//               {activity.text}
//             </Text>
//             <Text style={styles.activityTime}>• {activity.time}</Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );

//   const renderPhotos = () => (
//     <View style={styles.photosSection}>
//       <View style={styles.sectionHeaderRow}>
//         <Text style={styles.sectionTitle}>Travel Photos</Text>
//         <TouchableOpacity>
//           <Text style={styles.viewAllText}>View All</Text>
//         </TouchableOpacity>
//       </View>
      
//       <View style={styles.photosGrid}>
//         {photos.map((photo) => (
//           <TouchableOpacity key={photo.id} style={styles.photoItem}>
//             <Image source={{ uri: photo.uri }} style={styles.photo} />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
//       {renderHeader()}
      
//       <Animated.ScrollView
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {renderProfileInfo()}
//         {renderActionButtons()}
//         {renderStats()}
        
//         {/* Tabs */}
//         <View style={styles.tabsContainer}>
//           {['Profile', 'Travels', 'Achievements', 'Photos'].map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[
//                 styles.tab,
//                 activeTab === tab.toLowerCase() && styles.activeTab
//               ]}
//               onPress={() => setActiveTab(tab.toLowerCase())}
//             >
//               <Text style={[
//                 styles.tabText,
//                 activeTab === tab.toLowerCase() && styles.activeTabText
//               ]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
        
//         {/* Content based on active tab */}
//         <View style={styles.contentContainer}>
//           {activeTab === 'profile' && (
//             <>
//               {renderProfileStats()}
//               {renderWeeklyActivity()}
//               {renderCountries()}
//               {renderTravelPlans()}
//             </>
//           )}
          
//           {activeTab === 'achievements' && (
//             <>
//               {renderAchievements()}
//               {renderRecentActivity()}
//             </>
//           )}
          
//           {activeTab === 'photos' && renderPhotos()}
          
//           {activeTab === 'travels' && (
//             <View style={styles.comingSoonContainer}>
//               <Icon name="airplane-outline" size={60} color={colors.border} />
//               <Text style={styles.comingSoonText}>Travels content coming soon</Text>
//             </View>
//           )}
//         </View>
        
//         <View style={styles.bottomSpacing} />
//       </Animated.ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: isSmallScreen ? 12 : 16,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: isSmallScreen ? 16 : 18,
//     fontWeight: '600',
//     color: '#000000',
//   },
//   settingsButton: {
//     padding: 8,
//   },
//   scrollContent: {
//     paddingBottom: isSmallScreen ? 20 : 30,
//   },
//   profileInfoContainer: {
//     alignItems: 'center',
//     paddingVertical: isSmallScreen ? 20 : 24,
//     paddingHorizontal: isSmallScreen ? 16 : 20,
//   },
//   profileImageSection: {
//     position: 'relative',
//     marginBottom: isSmallScreen ? 12 : 16,
//   },
//   profileImage: {
//     width: isSmallScreen ? 80 : 100,
//     height: isSmallScreen ? 80 : 100,
//     borderRadius: isSmallScreen ? 40 : 50,
//     borderWidth: 3,
//     borderColor: '#FFFFFF',
//     backgroundColor: '#F5F5F5',
//   },
//   editPhotoButton: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#000000',
//     width: isSmallScreen ? 28 : 32,
//     height: isSmallScreen ? 28 : 32,
//     borderRadius: isSmallScreen ? 14 : 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
//   userName: {
//     fontSize: isSmallScreen ? 22 : 26,
//     fontWeight: '700',
//     color: '#000000',
//     marginBottom: isSmallScreen ? 12 : 16,
//     textAlign: 'center',
//   },
//   badgesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginBottom: isSmallScreen ? 12 : 16,
//     gap: isSmallScreen ? 12 : 16,
//   },
//   badgeItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   badgeCheckbox: {
//     width: isSmallScreen ? 16 : 18,
//     height: isSmallScreen ? 16 : 18,
//     borderRadius: 4,
//     borderWidth: 1.5,
//     borderColor: '#CCCCCC',
//     marginRight: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeCheckboxActive: {
//     backgroundColor: '#000000',
//     borderColor: '#000000',
//   },
//   badgeText: {
//     fontSize: isSmallScreen ? 12 : 13,
//     color: '#666666',
//     fontWeight: '500',
//   },
//   badgeTextActive: {
//     color: '#000000',
//     fontWeight: '600',
//   },
//   userTagline: {
//     fontSize: isSmallScreen ? 14 : 16,
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   userBio: {
//     fontSize: isSmallScreen ? 12 : 14,
//     color: '#666666',
//     textAlign: 'center',
//     lineHeight: isSmallScreen ? 18 : 20,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     paddingHorizontal: isSmallScreen ? 16 : 20,
//     paddingVertical: isSmallScreen ? 12 : 16,
//     gap: isSmallScreen ? 8 : 10,
//   },
//   editButton: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     paddingVertical: isSmallScreen ? 10 : 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   editButtonText: {
//     fontSize: isSmallScreen ? 13 : 14,
//     fontWeight: '600',
//     color: '#000000',
//   },
//   messageButton: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingVertical: isSmallScreen ? 10 : 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   messageButtonText: {
//     fontSize: isSmallScreen ? 13 : 14,
//     fontWeight: '600',
//     color: '#000000',
//   },
//   followButton: {
//     flex: 1,
//     backgroundColor: '#000000',
//     paddingVertical: isSmallScreen ? 10 : 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   followingButton: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   followButtonText: {
//     fontSize: isSmallScreen ? 13 : 14,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   followingButtonText: {
//     color: '#000000',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: isSmallScreen ? 16 : 20,
//     paddingVertical: isSmallScreen ? 16 : 20,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#E5E5E5',
//     backgroundColor: '#FAFAFA',
//   },
//   statItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: isSmallScreen ? 15 : 17,
//     fontWeight: '700',
//     color: '#000000',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: isSmallScreen ? 11 : 12,
//     color: '#888888',
//     textAlign: 'center',
//   },
//   statDivider: {
//     width: 1,
//     height: '70%',
//     backgroundColor: '#E5E5E5',
//     alignSelf: 'center',
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: isSmallScreen ? 16 : 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: isSmallScreen ? 14 : 16,
//     alignItems: 'center',
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#000000',
//   },
//   tabText: {
//     fontSize: isSmallScreen ? 13 : 14,
//     fontWeight: '500',
//     color: '#999999',
//   },
//   activeTabText: {
//     color: '#000000',
//     fontWeight: '600',
//   },
//   contentContainer: {
//     paddingBottom: isSmallScreen ? 20 : 30,
//   },
//   section: {
//     paddingHorizontal: isSmallScreen ? 16 : 20,
//     paddingVertical: isSmallScreen ? 20 : 24,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   sectionHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: isSmallScreen ? 16 : 20,
//   },
//   sectionTitle: {
//     fontSize: isSmallScreen ? 18 : 20,
//     fontWeight: '700',
//     color: '#000000',
//     marginBottom: 4,
//   },
//   sectionSubtitle: {
//     fontSize: isSmallScreen ? 13 : 14,
//     color: '#666666',
//   },
//   profileStatsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: isSmallScreen ? 16 : 20,
//     paddingVertical: isSmallScreen ? 20 : 24,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   profileStatCard: {
//     alignItems: 'center',
//   },
//   profileStatNumber: {
//     fontSize: isSmallScreen ? 28 : 32,
//     fontWeight: '700',
//     color: '#000000',
//     marginBottom: 4,
//   },
//   profileStatLabel: {
//     fontSize: isSmallScreen ? 12 : 13,
//     color: '#666666',
//     textAlign: 'center',
//   },
//   chartYAxis: {
//     position: 'absolute',
//     left: 0,
//     top: 40,
//     height: 150,
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//   },
//   chartYLabel: {
//     fontSize: isSmallScreen ? 10 : 11,
//     color: '#999999',
//     height: 20,
//     textAlign: 'right',
//     width: 30,
//   },
//   chartContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     height: 160,
//     marginLeft: 40,
//     paddingBottom: 30,
//   },
//   chartColumn: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   chartBar: {
//     width: isSmallScreen ? 10 : 12,
//     backgroundColor: '#4A90E2',
//     borderRadius: 6,
//     marginBottom: 8,
//     minHeight: 2,
//   },
//   chartDay: {
//     fontSize: isSmallScreen ? 11 : 12,
//     color: '#666666',
//     marginTop: 4,
//   },
//   countriesRow: {
//     justifyContent: 'space-between',
//     marginBottom: isSmallScreen ? 12 : 16,
//   },
//   countriesRowTablet: {
//     justifyContent: 'flex-start',
//     gap: 20,
//     marginBottom: isSmallScreen ? 12 : 16,
//   },
//   countryItem: {
//     alignItems: 'center',
//     width: isTablet ? (width - 100) / 4 : (width - 48) / 3,
//     marginBottom: isSmallScreen ? 16 : 20,
//   },
//   countryFlag: {
//     width: isSmallScreen ? 60 : 70,
//     height: isSmallScreen ? 60 : 70,
//     borderRadius: isSmallScreen ? 30 : 35,
//     backgroundColor: '#F8F8F8',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   countryCode: {
//     fontSize: isSmallScreen ? 20 : 24,
//   },
//   countryName: {
//     fontSize: isSmallScreen ? 12 : 13,
//     color: '#000000',
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   editPlanButton: {
//     backgroundColor: '#F5F5F5',
//     paddingHorizontal: isSmallScreen ? 14 : 16,
//     paddingVertical: isSmallScreen ? 6 : 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   editPlanText: {
//     fontSize: isSmallScreen ? 12 : 13,
//     color: '#000000',
//     fontWeight: '500',
//   },
//   travelPlanCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#FAFAFA',
//     padding: isSmallScreen ? 14 : 16,
//     borderRadius: 12,
//     marginBottom: isSmallScreen ? 10 : 12,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   planLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   planIcon: {
//     width: isSmallScreen ? 36 : 40,
//     height: isSmallScreen ? 36 : 40,
//     borderRadius: isSmallScreen ? 18 : 20,
//     backgroundColor: '#F0F0F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: isSmallScreen ? 12 : 16,
//   },
//   planInfo: {
//     flex: 1,
//   },
//   planCity: {
//     fontSize: isSmallScreen ? 15 : 16,
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: 2,
//   },
//   planCountry: {
//     fontSize: isSmallScreen ? 13 : 14,
//     color: '#666666',
//   },
//   planDate: {
//     backgroundColor: '#E8F5E8',
//     paddingHorizontal: isSmallScreen ? 10 : 12,
//     paddingVertical: isSmallScreen ? 4 : 6,
//     borderRadius: 12,
//   },
//   wishlistDate: {
//     backgroundColor: '#FFF8E1',
//   },
//   planDateText: {
//     fontSize: isSmallScreen ? 11 : 12,
//     color: '#2E7D32',
//     fontWeight: '500',
//   },
//   wishlistDateText: {
//     color: '#F57C00',
//   },
//   achievementCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0F8FF',
//     padding: isSmallScreen ? 14 : 16,
//     borderRadius: 12,
//     marginBottom: isSmallScreen ? 10 : 12,
//     borderWidth: 1,
//     borderColor: '#E3F2FD',
//   },
//   achievementBadge: {
//     width: isSmallScreen ? 70 : 80,
//     height: isSmallScreen ? 70 : 80,
//     borderRadius: isSmallScreen ? 35 : 40,
//     backgroundColor: '#4A90E2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: isSmallScreen ? 12 : 16,
//   },
//   achievementBadgeText: {
//     fontSize: isSmallScreen ? 14 : 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     textAlign: 'center',
//   },
//   achievementContent: {
//     flex: 1,
//   },
//   achievementTitle: {
//     fontSize: isSmallScreen ? 14 : 16,
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: 4,
//   },
//   achievementDescription: {
//     fontSize: isSmallScreen ? 12 : 13,
//     color: '#666666',
//     lineHeight: isSmallScreen ? 16 : 18,
//   },
//   activityItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingVertical: isSmallScreen ? 10 : 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F5F5F5',
//   },
//   activityDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#4A90E2',
//     marginTop: isSmallScreen ? 6 : 7,
//     marginRight: isSmallScreen ? 10 : 12,
//   },
//   activityContent: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
//   activityText: {
//     fontSize: isSmallScreen ? 13 : 14,
//     color: '#000000',
//     marginRight: 6,
//   },
//   activityTime: {
//     fontSize: isSmallScreen ? 12 : 13,
//     color: '#999999',
//   },
//   photosSection: {
//     paddingHorizontal: isSmallScreen ? 16 : 20,
//     paddingVertical: isSmallScreen ? 20 : 24,
//   },
//   viewAllText: {
//     fontSize: isSmallScreen ? 13 : 14,
//     color: '#000000',
//     fontWeight: '500',
//   },
//   photosGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   photoItem: {
//     width: (width - (isSmallScreen ? 48 : 60)) / 3,
//     height: (width - (isSmallScreen ? 48 : 60)) / 3,
//     marginBottom: isSmallScreen ? 8 : 10,
//   },
//   photo: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//     backgroundColor: '#F5F5F5',
//   },
//   comingSoonContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: isSmallScreen ? 40 : 60,
//   },
//   comingSoonText: {
//     fontSize: isSmallScreen ? 16 : 18,
//     fontWeight: '600',
//     color: '#999999',
//     marginTop: isSmallScreen ? 16 : 20,
//     textAlign: 'center',
//   },
//   bottomSpacing: {
//     height: isSmallScreen ? 20 : 30,
//   },
// });

// export default ProfileScreen;



// src/screens/ProfileScreen.js
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isTablet = width > 768;

// Your theme colors
const colors = {
  dark: {
    900: '#080811', // Main bg
    800: '#131323', // Card bg
    700: '#1F1F35', // Button bg
  },
  brand: {
    primary: '#4C2EFF', // Edit Profile button
    blue: '#3D5AFE',    // Map markers/dots
    pink: '#F50057',    // Streak icon
  },
  text: {
    main: '#FFFFFF',
    muted: '#A3A3B3',
    faint: '#6E6E85',
  }
};

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isFollowing, setIsFollowing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Mock data
  const userStats = {
    followers: '12.4K',
    following: '892',
    distance: '28.5K km',
    streak: '42 days',
  };

  const profileStats = [
    { id: '1', value: '42', label: 'Cities Visited' },
    { id: '2', value: '12', label: 'Countries Visited' },
    { id: '3', value: '318', label: 'Photos Uploaded' },
  ];

  const badges = [
    { id: '1', name: 'Explorer', isActive: false },
    { id: '2', name: 'Treater', isActive: true },
    { id: '3', name: 'Frequent', isActive: false },
    { id: '4', name: 'Streak', isActive: false },
  ];

  const countries = [
    { id: '1', name: 'USA', code: 'US', color: '#3D5AFE' },
    { id: '2', name: 'France', code: 'FR', color: '#4C2EFF' },
    { id: '3', name: 'Japan', code: 'JP', color: '#F50057' },
    { id: '4', name: 'Australia', code: 'AU', color: '#3D5AFE' },
    { id: '5', name: 'Thailand', code: 'TH', color: '#4C2EFF' },
    { id: '6', name: 'Greece', code: 'GR', color: '#F50057' },
    { id: '7', name: '+6 more', code: '🌍', color: colors.text.faint },
  ];

  const travelPlans = [
    { id: '1', city: 'Barcelona', country: 'Spain', date: 'Jan 2026', type: 'planned' },
    { id: '2', city: 'Iceland', country: 'Iceland', date: 'Mar 2026', type: 'planned' },
    { id: '3', city: 'New Zealand', country: 'NZ', date: 'Wishlist', type: 'wishlist' },
  ];

  const achievements = [
    { id: '1', title: '1,000 km', subtitle: 'Milestone', description: 'Traveled 1,000 km' },
    { id: '2', title: '10 Cities', subtitle: 'Visited', description: 'Explored 10 cities' },
    { id: '3', title: '5 Countries', subtitle: 'Unlocked', description: 'Visited 5 countries' },
  ];

  const recentActivities = [
    { id: '1', type: 'checkin', text: 'Checked in at Goa, India', time: '2 hours ago' },
    { id: '2', type: 'live', text: 'Went Live in Santorini, Greece', time: '1 day ago' },
    { id: '3', type: 'photos', text: 'Added 3 photos in Paris, France', time: '3 days ago' },
    { id: '4', type: 'checkin', text: 'Checked in at Dubai, UAE', time: '5 days ago' },
  ];

  const weeklyActivity = [
    { day: 'Mon', km: 20 },
    { day: 'Tue', km: 50 },
    { day: 'Wed', km: 80 },
    { day: 'Thu', km: 120 },
    { day: 'Fri', km: 150 },
    { day: 'Sat', km: 200 },
    { day: 'Sun', km: 180 },
  ];

  const photos = Array.from({ length: 6 }, (_, i) => ({
    id: String(i + 1),
    uri: `https://picsum.photos/400/400?random=${i + 1}`,
  }));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [60, 50],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderHeader = () => (
    <Animated.View style={[styles.header, { 
      height: headerHeight,
      backgroundColor: colors.dark[900],
      borderBottomColor: colors.dark[700],
    }]}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="chevron-back" size={24} color={colors.text.main} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Profile</Text>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Settings')} 
        style={styles.settingsButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="ellipsis-horizontal" size={24} color={colors.text.main} />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderProfileInfo = () => (
    <View style={[styles.profileInfoContainer, { backgroundColor: colors.dark[800] }]}>
      <View style={styles.profileImageSection}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
          style={[styles.profileImage, { borderColor: colors.dark[900] }]}
        />
        <TouchableOpacity style={[styles.editPhotoButton, { backgroundColor: colors.brand.primary }]}>
          <Icon name="camera" size={16} color={colors.text.main} />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.userName, { color: colors.text.main }]}>Emma Rivers</Text>
      
      {/* Badges */}
      <View style={styles.badgesContainer}>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badgeItem}>
            <View style={[
              styles.badgeCheckbox,
              { borderColor: badge.isActive ? colors.brand.primary : colors.text.faint },
              badge.isActive && { backgroundColor: colors.brand.primary }
            ]}>
              {badge.isActive && <Icon name="checkmark" size={12} color={colors.text.main} />}
            </View>
            <Text style={[
              styles.badgeText,
              { color: badge.isActive ? colors.text.main : colors.text.muted }
            ]}>
              {badge.name}
            </Text>
          </View>
        ))}
      </View>
      
      <Text style={[styles.userTagline, { color: colors.text.main }]}>Digital nomad & adventure seeker</Text>
      <Text style={[styles.userBio, { color: colors.text.muted }]}>Documenting my journey one city at a time</Text>
    </View>
  );

  const renderActionButtons = () => (
    <View style={[styles.actionButtons, { backgroundColor: colors.dark[800] }]}>
      <TouchableOpacity 
        style={[styles.editButton, { backgroundColor: colors.brand.primary }]}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={[styles.editButtonText, { color: colors.text.main }]}>Edit Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.messageButton, { 
        backgroundColor: colors.dark[700],
        borderColor: colors.dark[600] 
      }]}>
        <Text style={[styles.messageButtonText, { color: colors.text.main }]}>Message</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.followButton, 
          { backgroundColor: colors.brand.primary },
          isFollowing && { backgroundColor: colors.dark[700], borderColor: colors.dark[600] }
        ]}
        onPress={() => setIsFollowing(!isFollowing)}
      >
        <Text style={[
          styles.followButtonText, 
          { color: colors.text.main },
          isFollowing && { color: colors.text.main }
        ]}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => (
    <View style={[styles.statsContainer, { 
      backgroundColor: colors.dark[800],
      borderColor: colors.dark[700] 
    }]}>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: colors.text.main }]}>{userStats.followers}</Text>
        <Text style={[styles.statLabel, { color: colors.text.muted }]}>Followers</Text>
      </View>
      <View style={[styles.statDivider, { backgroundColor: colors.dark[700] }]} />
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: colors.text.main }]}>{userStats.following}</Text>
        <Text style={[styles.statLabel, { color: colors.text.muted }]}>Following</Text>
      </View>
      <View style={[styles.statDivider, { backgroundColor: colors.dark[700] }]} />
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: colors.text.main }]}>{userStats.distance}</Text>
        <Text style={[styles.statLabel, { color: colors.text.muted }]}>Distance</Text>
      </View>
      <View style={[styles.statDivider, { backgroundColor: colors.dark[700] }]} />
      <View style={styles.statItem}>
        <View style={styles.streakContainer}>
          <Text style={[styles.statNumber, { color: colors.text.main }]}>{userStats.streak}</Text>
          <Icon name="flame" size={14} color={colors.brand.pink} style={styles.streakIcon} />
        </View>
        <Text style={[styles.statLabel, { color: colors.text.muted }]}>Streak</Text>
      </View>
    </View>
  );

  const renderProfileStats = () => (
    <View style={[styles.profileStatsContainer, { 
      backgroundColor: colors.dark[800],
      borderColor: colors.dark[700] 
    }]}>
      {profileStats.map((stat) => (
        <View key={stat.id} style={styles.profileStatCard}>
          <Text style={[styles.profileStatNumber, { color: colors.text.main }]}>{stat.value}</Text>
          <Text style={[styles.profileStatLabel, { color: colors.text.muted }]}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderWeeklyActivity = () => (
    <View style={[styles.section, { 
      backgroundColor: colors.dark[800],
      borderColor: colors.dark[700] 
    }]}>
      <Text style={[styles.sectionTitle, { color: colors.text.main }]}>Daily Travel Activity</Text>
      
      {/* Y-axis labels */}
      <View style={styles.chartYAxis}>
        <Text style={[styles.chartYLabel, { color: colors.text.muted }]}>200</Text>
        <Text style={[styles.chartYLabel, { color: colors.text.muted }]}>150</Text>
        <Text style={[styles.chartYLabel, { color: colors.text.muted }]}>100</Text>
        <Text style={[styles.chartYLabel, { color: colors.text.muted }]}>50</Text>
        <Text style={[styles.chartYLabel, { color: colors.text.muted }]}>0</Text>
      </View>
      
      {/* Chart bars */}
      <View style={styles.chartContainer}>
        {weeklyActivity.map((day, index) => (
          <View key={index} style={styles.chartColumn}>
            <View style={[
              styles.chartBar, 
              { 
                backgroundColor: colors.brand.blue,
                height: `${(day.km / 200) * 80}%` 
              }
            ]} />
            <Text style={[styles.chartDay, { color: colors.text.muted }]}>{day.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCountries = () => (
    <View style={[styles.section, { 
      backgroundColor: colors.dark[800],
      borderColor: colors.dark[700] 
    }]}>
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: colors.text.main }]}>Visited Countries</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.text.muted }]}>12 countries</Text>
      </View>
      
      <FlatList
        data={countries}
        numColumns={isTablet ? 4 : 3}
        scrollEnabled={false}
        columnWrapperStyle={isTablet ? styles.countriesRowTablet : styles.countriesRow}
        renderItem={({ item }) => (
          <View style={styles.countryItem}>
            <View style={[
              styles.countryFlag, 
              { 
                backgroundColor: colors.dark[700],
                borderColor: colors.dark[600]
              }
            ]}>
              <Text style={styles.countryCode}>{item.code}</Text>
            </View>
            <Text style={[styles.countryName, { color: colors.text.main }]}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  const renderTravelPlans = () => (
    <View style={[styles.section, { 
      backgroundColor: colors.dark[800],
      borderColor: colors.dark[700] 
    }]}>
      <View style={styles.sectionHeaderRow}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text.main }]}>Upcoming Travel Plans</Text>
        </View>
        <TouchableOpacity style={[
          styles.editPlanButton, 
          { backgroundColor: colors.dark[700], borderColor: colors.dark[600] }
        ]}>
          <Text style={[styles.editPlanText, { color: colors.text.main }]}>Edit Plan</Text>
        </TouchableOpacity>
      </View>
      
      {travelPlans.map((plan) => (
        <View key={plan.id} style={[
          styles.travelPlanCard, 
          { 
            backgroundColor: colors.dark[700],
            borderColor: colors.dark[600]
          }
        ]}>
          <View style={styles.planLeft}>
            <View style={[styles.planIcon, { backgroundColor: colors.dark[600] }]}>
              <Icon name="airplane" size={20} color={colors.text.main} />
            </View>
            <View style={styles.planInfo}>
              <Text style={[styles.planCity, { color: colors.text.main }]}>{plan.city}</Text>
              <Text style={[styles.planCountry, { color: colors.text.muted }]}>{plan.country}</Text>
            </View>
          </View>
          <View style={[
            styles.planDate,
            { backgroundColor: plan.type === 'wishlist' ? '#1F1F35' : '#0F1F1F' },
            plan.type === 'wishlist' && styles.wishlistDate
          ]}>
            <Text style={[
              styles.planDateText,
              { color: plan.type === 'wishlist' ? colors.brand.pink : colors.brand.blue }
            ]}>
              {plan.date}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAchievements = () => (
    <View style={[styles.section, { 
      backgroundColor: colors.dark[800],
      borderColor: colors.dark[700] 
    }]}>
      <Text style={[styles.sectionTitle, { color: colors.text.main }]}>Achievements & Badges</Text>
      
      {achievements.map((achievement) => (
        <View key={achievement.id} style={[
          styles.achievementCard, 
          { 
            backgroundColor: colors.dark[700],
            borderColor: colors.dark[600]
          }
        ]}>
          <View style={[styles.achievementBadge, { backgroundColor: colors.brand.blue }]}>
            <Text style={[styles.achievementBadgeText, { color: colors.text.main }]}>
              {achievement.title}
            </Text>
          </View>
          <View style={styles.achievementContent}>
            <Text style={[styles.achievementTitle, { color: colors.text.main }]}>
              {achievement.subtitle}
            </Text>
            <Text style={[styles.achievementDescription, { color: colors.text.muted }]}>
              {achievement.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderRecentActivity = () => (
    <View style={[styles.section, { 
      backgroundColor: colors.dark[800],
      borderColor: colors.dark[700] 
    }]}>
      <Text style={[styles.sectionTitle, { color: colors.text.main }]}>Recent Activity</Text>
      
      {recentActivities.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <View style={[styles.activityDot, { backgroundColor: colors.brand.blue }]} />
          <View style={styles.activityContent}>
            <Text style={[styles.activityText, { color: colors.text.main }]}>
              {activity.text}
            </Text>
            <Text style={[styles.activityTime, { color: colors.text.muted }]}>• {activity.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPhotos = () => (
    <View style={[styles.photosSection, { backgroundColor: colors.dark[800] }]}>
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: colors.text.main }]}>Travel Photos</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: colors.text.main }]}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.photosGrid}>
        {photos.map((photo) => (
          <TouchableOpacity key={photo.id} style={styles.photoItem}>
            <Image source={{ uri: photo.uri }} style={styles.photo} />
            <View style={styles.photoOverlay} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.dark[900] }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark[900]} />
      
      {renderHeader()}
      
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {renderProfileInfo()}
        {renderActionButtons()}
        {renderStats()}
        
        {/* Tabs */}
        <View style={[styles.tabsContainer, { 
          backgroundColor: colors.dark[800],
          borderColor: colors.dark[700] 
        }]}>
          {['Profile', 'Travels', 'Achievements', 'Photos'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab.toLowerCase() && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.toLowerCase())}
            >
              <Text style={[
                styles.tabText,
                { color: colors.text.muted },
                activeTab === tab.toLowerCase() && [
                  styles.activeTabText,
                  { color: colors.text.main }
                ]
              ]}>
                {tab}
              </Text>
              {activeTab === tab.toLowerCase() && (
                <View style={[styles.tabIndicator, { backgroundColor: colors.brand.primary }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Content based on active tab */}
        <View style={styles.contentContainer}>
          {activeTab === 'profile' && (
            <>
              {renderProfileStats()}
              {renderWeeklyActivity()}
              {renderCountries()}
              {renderTravelPlans()}
            </>
          )}
          
          {activeTab === 'achievements' && (
            <>
              {renderAchievements()}
              {renderRecentActivity()}
            </>
          )}
          
          {activeTab === 'photos' && renderPhotos()}
          
          {activeTab === 'travels' && (
            <View style={[styles.comingSoonContainer, { backgroundColor: colors.dark[800] }]}>
              <Icon name="airplane-outline" size={60} color={colors.text.muted} />
              <Text style={[styles.comingSoonText, { color: colors.text.muted }]}>
                Travels content coming soon
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isSmallScreen ? 12 : 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: isSmallScreen ? 20 : 30,
  },
  profileInfoContainer: {
    alignItems: 'center',
    paddingVertical: isSmallScreen ? 20 : 24,
    paddingHorizontal: isSmallScreen ? 16 : 20,
  },
  profileImageSection: {
    position: 'relative',
    marginBottom: isSmallScreen ? 12 : 16,
  },
  profileImage: {
    width: isSmallScreen ? 80 : 100,
    height: isSmallScreen ? 80 : 100,
    borderRadius: isSmallScreen ? 40 : 50,
    borderWidth: 3,
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: isSmallScreen ? 28 : 32,
    height: isSmallScreen ? 28 : 32,
    borderRadius: isSmallScreen ? 14 : 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  userName: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: '700',
    marginBottom: isSmallScreen ? 12 : 16,
    textAlign: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: isSmallScreen ? 12 : 16,
    gap: isSmallScreen ? 12 : 16,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeCheckbox: {
    width: isSmallScreen ? 16 : 18,
    height: isSmallScreen ? 16 : 18,
    borderRadius: 4,
    borderWidth: 1.5,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: isSmallScreen ? 12 : 13,
    fontWeight: '500',
  },
  userTagline: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  userBio: {
    fontSize: isSmallScreen ? 12 : 14,
    textAlign: 'center',
    lineHeight: isSmallScreen ? 18 : 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: isSmallScreen ? 12 : 16,
    gap: isSmallScreen ? 8 : 10,
  },
  editButton: {
    flex: 1,
    paddingVertical: isSmallScreen ? 10 : 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '600',
  },
  messageButton: {
    flex: 1,
    paddingVertical: isSmallScreen ? 10 : 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  messageButtonText: {
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '600',
  },
  followButton: {
    flex: 1,
    paddingVertical: isSmallScreen ? 10 : 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  followButtonText: {
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: isSmallScreen ? 16 : 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    marginLeft: 4,
  },
  statNumber: {
    fontSize: isSmallScreen ? 15 : 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: isSmallScreen ? 11 : 12,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: '70%',
    alignSelf: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: isSmallScreen ? 16 : 20,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: isSmallScreen ? 14 : 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // Indicator will show
  },
  tabText: {
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '60%',
    borderRadius: 1,
  },
  contentContainer: {
    paddingBottom: isSmallScreen ? 20 : 30,
  },
  section: {
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: isSmallScreen ? 20 : 24,
    borderBottomWidth: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isSmallScreen ? 16 : 20,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: isSmallScreen ? 13 : 14,
  },
  profileStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: isSmallScreen ? 20 : 24,
    borderBottomWidth: 1,
  },
  profileStatCard: {
    alignItems: 'center',
  },
  profileStatNumber: {
    fontSize: isSmallScreen ? 28 : 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileStatLabel: {
    fontSize: isSmallScreen ? 12 : 13,
    textAlign: 'center',
  },
  chartYAxis: {
    position: 'absolute',
    left: 0,
    top: 40,
    height: 150,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  chartYLabel: {
    fontSize: isSmallScreen ? 10 : 11,
    height: 20,
    textAlign: 'right',
    width: 30,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    marginLeft: 40,
    paddingBottom: 30,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: isSmallScreen ? 10 : 12,
    borderRadius: 6,
    marginBottom: 8,
    minHeight: 2,
  },
  chartDay: {
    fontSize: isSmallScreen ? 11 : 12,
    marginTop: 4,
  },
  countriesRow: {
    justifyContent: 'space-between',
    marginBottom: isSmallScreen ? 12 : 16,
  },
  countriesRowTablet: {
    justifyContent: 'flex-start',
    gap: 20,
    marginBottom: isSmallScreen ? 12 : 16,
  },
  countryItem: {
    alignItems: 'center',
    width: isTablet ? (width - 100) / 4 : (width - 48) / 3,
    marginBottom: isSmallScreen ? 16 : 20,
  },
  countryFlag: {
    width: isSmallScreen ? 60 : 70,
    height: isSmallScreen ? 60 : 70,
    borderRadius: isSmallScreen ? 30 : 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
  },
  countryCode: {
    fontSize: isSmallScreen ? 20 : 24,
  },
  countryName: {
    fontSize: isSmallScreen ? 12 : 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  editPlanButton: {
    paddingHorizontal: isSmallScreen ? 14 : 16,
    paddingVertical: isSmallScreen ? 6 : 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  editPlanText: {
    fontSize: isSmallScreen ? 12 : 13,
    fontWeight: '500',
  },
  travelPlanCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isSmallScreen ? 14 : 16,
    borderRadius: 12,
    marginBottom: isSmallScreen ? 10 : 12,
    borderWidth: 1,
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  planIcon: {
    width: isSmallScreen ? 36 : 40,
    height: isSmallScreen ? 36 : 40,
    borderRadius: isSmallScreen ? 18 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isSmallScreen ? 12 : 16,
  },
  planInfo: {
    flex: 1,
  },
  planCity: {
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  planCountry: {
    fontSize: isSmallScreen ? 13 : 14,
  },
  planDate: {
    paddingHorizontal: isSmallScreen ? 10 : 12,
    paddingVertical: isSmallScreen ? 4 : 6,
    borderRadius: 12,
  },
  wishlistDate: {
    // Specific styles for wishlist
  },
  planDateText: {
    fontSize: isSmallScreen ? 11 : 12,
    fontWeight: '500',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isSmallScreen ? 14 : 16,
    borderRadius: 12,
    marginBottom: isSmallScreen ? 10 : 12,
    borderWidth: 1,
  },
  achievementBadge: {
    width: isSmallScreen ? 70 : 80,
    height: isSmallScreen ? 70 : 80,
    borderRadius: isSmallScreen ? 35 : 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isSmallScreen ? 12 : 16,
  },
  achievementBadgeText: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: isSmallScreen ? 12 : 13,
    lineHeight: isSmallScreen ? 16 : 18,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: isSmallScreen ? 10 : 12,
    borderBottomWidth: 1,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: isSmallScreen ? 6 : 7,
    marginRight: isSmallScreen ? 10 : 12,
  },
  activityContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  activityText: {
    fontSize: isSmallScreen ? 13 : 14,
    marginRight: 6,
  },
  activityTime: {
    fontSize: isSmallScreen ? 12 : 13,
  },
  photosSection: {
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: isSmallScreen ? 20 : 24,
  },
  viewAllText: {
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '500',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoItem: {
    width: (width - (isSmallScreen ? 48 : 60)) / 3,
    height: (width - (isSmallScreen ? 48 : 60)) / 3,
    marginBottom: isSmallScreen ? 8 : 10,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
  },
  comingSoonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: isSmallScreen ? 40 : 60,
    borderRadius: 12,
    margin: isSmallScreen ? 16 : 20,
  },
  comingSoonText: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    marginTop: isSmallScreen ? 16 : 20,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: isSmallScreen ? 20 : 30,
  },
  dark600: {
    // Helper color for borders
    borderColor: '#1A1A2E',
  },
});

export default ProfileScreen;