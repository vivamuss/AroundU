import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* 🏠 Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* ✈️ Explore */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      {/* 🎯 Nearby Offers */}
      <Tabs.Screen
        name="nearbyoffers"
        options={{
          title: 'Nearby Offers',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />

      {/* 📦 My Orders */}
      <Tabs.Screen
        name="myorders"
        options={{
          title: 'My Orders',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cart.fill" color={color} />
          ),
        }}
      />
      
      {/* Rewards */}
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="reward.fill" color={color} />
          ),
        }}
      />

      {/* Offer Posting */}
      <Tabs.Screen
        name="offerposting"
        options={{
          title:"Offer Posting",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="offerposting.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
