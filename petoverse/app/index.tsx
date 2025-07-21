"use client"

import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { BottomNavigation } from "@/components/layout/BottomNavigation"
import { Spacing } from "@/components/layout/Spacing"
import { Colors } from "@/constants/Colors"
import { Header } from "../components/layout/Header"
import { PetCard } from "../components/pet/PetCard"
import { StatsBar } from "../components/pet/StatsBar"
import { Button } from "../components/ui/Button"



export default function HomeScreen() {
  const [selectedPet, setSelectedPet] = useState(0)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const petScaleAnim = useRef(new Animated.Value(0.9)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(petScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const pets = [
    {
      id: 1,
      name: "Hedwig",
      type: "Cosmic Cat",
      level: 24,
      health: 95,
      energy: 87,
      mood: "Happy",
      emoji: "🦉",
    },
    {
      id: 2,
      name: "Blaze",
      type: "Fire Dragon",
      level: 31,
      health: 88,
      energy: 92,
      mood: "Energetic",
      emoji: "🐲",
    },
  ]

  const currentPet = pets[selectedPet]

  const statsData = [
    {
      icon: "flash" as const,
      label: "XP",
      value: "12,847",
      color: Colors.status.success,
    },
    {
      icon: "diamond" as const,
      label: "Gems",
      value: "2,156",
      color: Colors.orange.primary,
    },
    {
      icon: "trophy" as const,
      label: "Rank",
      value: "#247",
      color: Colors.status.warning,
    },
  ]

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: "home" as const,
      onPress: () => router.push("/"),
    },
    {
      id: "explore",
      label: "Explore",
      icon: "planet-outline" as const,
      onPress: () => router.push("/PetMultiverse"),
    },
    {
      id: "customize",
      label: "Customize",
      icon: "brush-outline" as const,
      onPress: () => router.push("/PetStyling"),
    },
    {
      id: "profile",
      label: "Profile",
      icon: "person-outline" as const,
      onPress: () => router.push("/PetToken"),
    },
  ]

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Header
            subtitle="Good Evening"
            title="Alex"
            showNotifications
            hasNotificationDot
            showProfile
            onNotificationPress={() => {}}
            onProfilePress={() => {}}
          />
        </Animated.View>

        {/* Stats Bar */}
        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <StatsBar stats={statsData} />
        </Animated.View>

        {/* Main Pet Display */}
        <Animated.View
          style={[
            styles.petContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: petScaleAnim }],
            },
          ]}
        >
          <PetCard
            pet={currentPet}
            onPress={() => router.push("/")}
            onInteract={() => router.push("/")}
          />

          {/* Pet Selector */}
          {pets.length > 1 && (
            <View style={styles.petSelector}>
              {pets.map((pet, index) => (
                <Button
                  key={pet.id}
                  title={pet.emoji}
                  onPress={() => setSelectedPet(index)}
                  variant={selectedPet === index ? "primary" : "secondary"}
                  size="small"
                  style={{
                    ...styles.petSelectorItem,
                    ...(selectedPet === index ? styles.petSelectorItemSelected : {})
                  }}
                  textStyle={styles.petSelectorEmoji}
                />
              ))}
            </View>
          )}
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.actionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Button
            title="Play"
            onPress={() => router.push("/PetPlayground")}
            variant="primary"
            icon="play"
            style={styles.primaryAction}
            textStyle={styles.actionButtonText}
          />

          <Button
            title="Create"
            onPress={() => router.push("/PetCreation")}
            variant="secondary"
            icon="add"
            style={styles.secondaryAction}
            textStyle={styles.actionButtonText}
          />

          <Button
            title="Rewards"
            onPress={() => router.push("/Rewards")}
            variant="secondary"
            icon="gift-outline"
            style={styles.secondaryAction}
            textStyle={styles.actionButtonText}
          />
        </Animated.View>

        {/* Bottom Navigation */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <BottomNavigation items={navItems} activeItem="home" />
        </Animated.View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  statsContainer: {
    paddingHorizontal: Spacing.xxl,
    marginBottom: Spacing.xxl,
  },
  petContainer: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    justifyContent: "center",
  },
  petSelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  petSelectorItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.border.primary,
    backgroundColor: Colors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 2,
  },
  petSelectorItemSelected: {
    backgroundColor: Colors.orange.primary,
    borderColor: Colors.orange.primary,
    shadowOpacity: 0.18,
    elevation: 4,
  },
  petSelectorEmoji: {
    fontSize: 28,
    textAlign: "center",
    color: Colors.text.primary,
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryAction: {
    flex: 1,
    backgroundColor: Colors.orange.primary,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    marginHorizontal: 4,
    paddingVertical: 12,
    paddingHorizontal: 0,
    minWidth: 90,
    maxWidth: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    paddingHorizontal: 0,
    minWidth: 90,
    maxWidth: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text.primary,
    letterSpacing: 0.5,
    textAlign: "center",
  },
})
