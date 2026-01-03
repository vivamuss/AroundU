// AppIconAnimationPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Svg, { Circle, Path, G, Defs, RadialGradient, Stop, Rect, ClipPath, Text as SvgText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const AppIconAnimationPage = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  // State for rewards system
  const [points, setPoints] = useState(150);
  const [badges, setBadges] = useState(['Deal Hunter', 'Event Explorer']);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [reward, setReward] = useState('');
  const [coupons, setCoupons] = useState(['10% OFF', 'Free Coffee', '2x Points']);

  // Scratch card animation
  const scratchAnim = useRef(new Animated.Value(0)).current;
  const wheelSpinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequential launch animation
    Animated.sequence([
      // Scale up
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      // Rotate and bounce
      Animated.parallel([
        Animated.loop(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceAnim, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ),
      ]),
    ]).start();

    // Fade in background elements
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const bounceInterpolate = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  // Spin Wheel Functions
  const spinWheel = () => {
    wheelSpinAnim.setValue(0);
    Animated.timing(wheelSpinAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const rewards = ['50 Points', '20% OFF', 'Free Item', '100 Points', 'Try Again', '2x Multiplier'];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setReward(randomReward);
      
      if (randomReward.includes('Points')) {
        const pointsWon = parseInt(randomReward);
        setPoints(prev => prev + pointsWon);
      }
    });
  };

  const wheelRotation = wheelSpinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1800deg'], // 5 full rotations
  });

  // Scratch Card Functions
  const revealScratchCard = () => {
    Animated.timing(scratchAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setScratchRevealed(true);
      setPoints(prev => prev + 25); // Reward points for scratching
    });
  };

  const scratchOpacity = scratchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // Earn Points Functions
  const earnPoints = (activity: string, pointsEarned: number) => {
    setPoints(prev => prev + pointsEarned);
    // Check for badge achievements
    if (points >= 100 && !badges.includes('Points Master')) {
      setBadges(prev => [...prev, 'Points Master']);
    }
  };

  // Modern app icon shape (abstract diamond/hexagon)
  const AppIcon = ({ size = 120, animatedStyle = {} }) => (
    <Animated.View style={[{ width: size, height: size }, animatedStyle]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor="#9E72C3" stopOpacity="1" />
            <Stop offset="100%" stopColor="#7338A0" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <G>
          {/* Main Diamond Shape */}
          <Path
            d="M50 15 L80 50 L50 85 L20 50 Z"
            fill="url(#grad)"
            stroke="#4A2574"
            strokeWidth="2"
          />
          {/* Inner decorative elements */}
          <Circle cx="50" cy="50" r="15" fill="#924DBF" opacity="0.8" />
          <Path
            d="M50 35 L60 50 L50 65 L40 50 Z"
            fill="#FFFFFF"
            opacity="0.3"
          />
        </G>
      </Svg>
    </Animated.View>
  );

  // Spin Wheel Component
  const SpinWheel = () => {
    const segments = [
      { color: '#9E72C3', text: '50 Points' },
      { color: '#924DBF', text: '20% OFF' },
      { color: '#7338A0', text: 'Free Item' },
      { color: '#4A2574', text: '100 Points' },
      { color: '#9E72C3', text: 'Try Again' },
      { color: '#924DBF', text: '2x Multiplier' },
    ];

    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>🎡 Spin to Win!</Text>
          
          <View style={styles.wheelContainer}>
            <Animated.View style={{ transform: [{ rotate: wheelRotation }] }}>
              <Svg width={200} height={200} viewBox="0 0 200 200">
                {segments.map((segment, index) => {
                  const angle = (360 / segments.length) * index;
                  return (
                    <G key={index} transform={`rotate(${angle}, 100, 100)`}>
                      <Path
                        d="M100,100 L100,20 A80,80 0 0,1 180,100 Z"
                        fill={segment.color}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <SvgText
                        x="140"
                        y="70"
                        transform={`rotate(30, 140, 70)`}
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {segment.text}
                      </SvgText>
                    </G>
                  );
                })}
                <Circle cx="100" cy="100" r="15" fill="#0F0529" />
              </Svg>
            </Animated.View>
          </View>

          {reward && (
            <Animated.View style={[styles.rewardContainer, { opacity: fadeAnim }]}>
              <Text style={styles.rewardText}>🎉 You won: {reward}!</Text>
            </Animated.View>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.spinButton} onPress={spinWheel}>
              <Text style={styles.buttonText}>SPIN (10 Points)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowSpinWheel(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Scratch Card Component
  const ScratchCard = () => (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>🎴 Scratch & Win!</Text>
        
        <TouchableOpacity style={styles.scratchCard} onPress={revealScratchCard}>
          <View style={styles.scratchCardContent}>
            <Text style={styles.couponText}>25 POINTS!</Text>
            <Text style={styles.couponSubtext}>Tap to reveal</Text>
          </View>
          {!scratchRevealed && (
            <Animated.View style={[styles.scratchLayer, { opacity: scratchOpacity }]}>
              <Text style={styles.scratchText}>🎁</Text>
            </Animated.View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={() => {
          setShowScratchCard(false);
          setScratchRevealed(false);
        }}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Animated App Icon */}
      <View style={styles.iconContainer}>
        <Animated.View
          style={[
            styles.iconWrapper,
            {
              transform: [
                { scale: scaleAnim },
                { rotate: rotateInterpolate },
                { translateY: bounceInterpolate },
              ],
            },
          ]}
        >
          <AppIcon />
        </Animated.View>
        
        {/* Glow Effect */}
        <Animated.View
          style={[
            styles.glowEffect,
            {
              opacity: glowOpacity,
              backgroundColor: '#9E72C3',
            },
          ]}
        />
      </View>

      {/* App Name */}
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={styles.appName}>Rewards App</Text>
        <Text style={styles.appTagline}>Earn • Spin • Win</Text>
      </Animated.View>

      {/* Points Display */}
      <Animated.View style={[styles.pointsContainer, { opacity: fadeAnim }]}>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Your Points</Text>
          <Text style={styles.pointsValue}>{points} 🪙</Text>
        </View>
      </Animated.View>

      {/* Quick Actions */}
      <Animated.View style={[styles.actionsContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setShowSpinWheel(true)}>
          <Text style={styles.actionButtonText}>🎡 Spin Wheel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => setShowScratchCard(true)}>
          <Text style={styles.actionButtonText}>🎴 Scratch Card</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => earnPoints('checkin', 10)}>
          <Text style={styles.actionButtonText}>📍 Check In</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Badges Section */}
      <Animated.View style={[styles.badgesContainer, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>Your Badges</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesScroll}>
          {badges.map((badge, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>🏆 {badge}</Text>
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Coupons Section */}
      <Animated.View style={[styles.couponsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>Your Coupons</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.couponsScroll}>
          {coupons.map((coupon, index) => (
            <View key={index} style={styles.coupon}>
              <Text style={styles.couponText}>{coupon}</Text>
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Loading Progress */}
      <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
        <View style={styles.loadingBar}>
          <Animated.View 
            style={[
              styles.loadingProgress,
              {
                width: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: '#924DBF',
              }
            ]} 
          />
        </View>
        <Text style={styles.loadingText}>Loading amazing rewards...</Text>
      </Animated.View>

      {/* Modals */}
      <Modal visible={showSpinWheel} animationType="slide" transparent>
        <SpinWheel />
      </Modal>

      <Modal visible={showScratchCard} animationType="slide" transparent>
        <ScratchCard />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0529',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  glowEffect: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: '#9E72C3',
    opacity: 0.8,
  },
  pointsContainer: {
    marginBottom: 20,
  },
  pointsCard: {
    backgroundColor: '#4A2574',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 150,
  },
  pointsLabel: {
    color: '#9E72C3',
    fontSize: 14,
    marginBottom: 5,
  },
  pointsValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#7338A0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  badgesContainer: {
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  badgesScroll: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: '#924DBF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  couponsContainer: {
    marginBottom: 20,
    width: '100%',
  },
  couponsScroll: {
    flexDirection: 'row',
  },
  coupon: {
    backgroundColor: '#9E72C3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed',
  },
  couponText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#4A2574',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  loadingProgress: {
    height: '100%',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: '#9E72C3',
    opacity: 0.7,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(15, 5, 41, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a0a3a',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
    borderWidth: 2,
    borderColor: '#9E72C3',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  wheelContainer: {
    marginVertical: 30,
  },
  spinButton: {
    backgroundColor: '#7338A0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#4A2574',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rewardContainer: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#9E72C3',
    borderRadius: 10,
  },
  rewardText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  // Scratch Card Styles
  scratchCard: {
    width: 200,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 20,
  },
  scratchCardContent: {
    flex: 1,
    backgroundColor: '#924DBF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scratchLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#9E72C3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scratchText: {
    fontSize: 24,
  },
  couponSubtext: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
    opacity: 0.8,
  },
  particlesContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitingParticle: {
    position: 'absolute',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  particle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default AppIconAnimationPage;