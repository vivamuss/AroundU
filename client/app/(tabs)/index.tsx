import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();

  // Sample deals data
  const deals = [
    { id: 1, title: "50% Off Pizza", description: "Local pizzeria offering half-price large pizzas", distance: "0.5mi", category: "Food" },
    { id: 2, title: "Free Coffee", description: "Buy one get one free on all espresso drinks", distance: "0.8mi", category: "Beverages" },
    { id: 3, title: "Fitness Membership", description: "30% off annual gym membership", distance: "1.2mi", category: "Fitness" },
    { id: 4, title: "Haircut Special", description: "$15 haircuts this week only", distance: "0.3mi", category: "Beauty" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.location}>
              <Ionicons name="location" size={16} color="#FF3B30" /> New York, NY
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={32} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTitle}>Exclusive Deals Await!</Text>
          <Text style={styles.heroSubtitle}>Discover limited-time offers near you</Text>
          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: "#FF9F43" }]}>
              <Ionicons name="fast-food" size={24} color="white" />
            </View>
            <Text style={styles.categoryText}>Food</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: "#6C63FF" }]}>
              <Ionicons name="shirt" size={24} color="white" />
            </View>
            <Text style={styles.categoryText}>Shopping</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: "#FF3B30" }]}>
              <Ionicons name="fitness" size={24} color="white" />
            </View>
            <Text style={styles.categoryText}>Fitness</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: "#34C759" }]}>
              <Ionicons name="cut" size={24} color="white" />
            </View>
            <Text style={styles.categoryText}>Beauty</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: "#007AFF" }]}>
              <Ionicons name="car-sport" size={24} color="white" />
            </View>
            <Text style={styles.categoryText}>Services</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Hot Deals */}
        <View style={styles.dealsHeader}>
          <Text style={styles.sectionTitle}>🔥 Hot Deals Nearby</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {deals.map((deal) => (
          <TouchableOpacity key={deal.id} style={styles.dealCard}>
            <View style={styles.dealImagePlaceholder}>
              <FontAwesome5 name="store" size={24} color="#6C63FF" />
            </View>
            <View style={styles.dealContent}>
              <Text style={styles.dealTitle}>{deal.title}</Text>
              <Text style={styles.dealDescription}>{deal.description}</Text>
              <View style={styles.dealMeta}>
                <Text style={styles.dealDistance}>{deal.distance}</Text>
                <Text style={styles.dealCategory}>{deal.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Auth Buttons */}
        <View style={styles.authContainer}>
          <Text style={styles.authPrompt}>Sign in to save deals and get personalized recommendations</Text>
          <TouchableOpacity 
            style={[styles.authButton, styles.loginButton]}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.authButton, styles.signupButton]}
            onPress={() => router.push("/auth/signup")}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  heroBanner: {
    backgroundColor: "#6C63FF",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    width: 140,
  },
  heroButtonText: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  dealsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    color: "#6C63FF",
    fontWeight: "600",
  },
  dealCard: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dealImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  dealContent: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  dealDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dealMeta: {
    flexDirection: "row",
  },
  dealDistance: {
    fontSize: 12,
    color: "#6C63FF",
    marginRight: 16,
    fontWeight: "500",
  },
  dealCategory: {
    fontSize: 12,
    color: "#888",
  },
  authContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  authPrompt: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  authButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: "#6C63FF",
  },
  signupButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#6C63FF",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  signupButtonText: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: 16,
  },
});