"use client"

import { LinearGradient } from "expo-linear-gradient"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useRef } from "react"
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Header } from "@/components/layout/Header"
import { BorderRadius, FontSizes, Spacing } from "@/components/layout/Spacing"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ProgressBar } from "@/components/ui/ProgressBar"
import { Colors } from "@/constants/Colors"

export default function PetTokenScreen() {
  const { petName, petType, petConfig } = useLocalSearchParams()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()

    // Continuous rotation for the token
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }),
    ).start()
  }, [])

  const mockStats = {
    level: 1,
    experience: 0,
    maxExperience: 100,
    intelligence: 25,
    creativity: 30,
    loyalty: 40,
    energy: 100,
    happiness: 85,
    rarity: "Legendary",
    birthDate: new Date().toLocaleDateString(),
    uniqueTraits: ["Cosmic Vision", "Stellar Communication", "Dimensional Travel"],
  }

  const mockLearningLog = [
    { date: "2024-01-15", activity: "First words learned", progress: "Learned basic greetings" },
    { date: "2024-01-15", activity: "Personality development", progress: "Showing playful tendencies" },
    { date: "2024-01-15", activity: "Skill discovery", progress: "Discovered love for music" },
  ]

  const getPetEmoji = () => {
    switch (petType) {
      case "cosmic-cat":
        return "🐱"
      case "fire-dragon":
        return "🐲"
      case "crystal-fox":
        return "🦊"
      case "shadow-wolf":
        return "🐺"
      default:
        return "🐱"
    }
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Header
            title="Pet Token"
            showBack
            onBackPress={() => router.push("/")}
            rightComponent={
              <Button
                title=""
                onPress={() => {}}
                variant="secondary"
                size="small"
                icon="share"
                style={styles.shareButton}
              />
            }
          />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* NFT Token Display */}
          <Animated.View
            style={[
              styles.tokenContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.tokenFrame,
                {
                  transform: [{ rotate: spin }],
                },
              ]}
            >
              <LinearGradient
                colors={[Colors.orange.primary, Colors.orange.light, Colors.orange.dark]}
                style={styles.tokenBorder}
              >
                <Card style={styles.tokenInner}>
                  <View style={styles.petDisplay}>
                    <Text style={styles.tokenPetEmoji}>{getPetEmoji()}</Text>
                  </View>
                  <Text style={styles.tokenPetName}>{petName}</Text>
                  <Text style={styles.tokenRarity}>{mockStats.rarity}</Text>
                </Card>
              </LinearGradient>
            </Animated.View>
          </Animated.View>

          {/* Pet Information */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Pet Information</Text>
            <Card variant="bordered" style={styles.infoCard}>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Level</Text>
                  <Text style={styles.infoValue}>{mockStats.level}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Birth Date</Text>
                  <Text style={styles.infoValue}>{mockStats.birthDate}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Energy</Text>
                  <Text style={styles.infoValue}>{mockStats.energy}%</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Happiness</Text>
                  <Text style={styles.infoValue}>{mockStats.happiness}%</Text>
                </View>
              </View>
            </Card>
          </Animated.View>

          {/* Stats Section */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>AI Development Stats</Text>
            <Card variant="bordered" style={styles.statsCard}>
              <ProgressBar label="Intelligence" value={mockStats.intelligence} color={Colors.status.info} />
              <ProgressBar label="Creativity" value={mockStats.creativity} color={Colors.orange.primary} />
              <ProgressBar label="Loyalty" value={mockStats.loyalty} color={Colors.status.success} />
            </Card>
          </Animated.View>

          {/* Unique Traits */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Unique Traits</Text>
            <Card variant="bordered" style={styles.traitsCard}>
              <View style={styles.traitsContainer}>
                {mockStats.uniqueTraits.map((trait, index) => (
                  <View key={index} style={styles.traitTag}>
                    <Text style={styles.traitText}>{trait}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </Animated.View>

          {/* Learning Log */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>AI Learning Log</Text>
            <Card variant="bordered" style={styles.logCard}>
              {mockLearningLog.map((log, index) => (
                <View key={index} style={styles.logItem}>
                  <View style={styles.logDate}>
                    <Text style={styles.logDateText}>{log.date}</Text>
                  </View>
                  <View style={styles.logContent}>
                    <Text style={styles.logActivity}>{log.activity}</Text>
                    <Text style={styles.logProgress}>{log.progress}</Text>
                  </View>
                </View>
              ))}
            </Card>
          </Animated.View>
        </ScrollView>

        {/* Action Buttons */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <Button
            title="Interact"
            onPress={() => router.push("/PetPlayground")}
            variant="primary"
            icon="play"
            style={styles.actionButton}
          />
          <Button
            title="Customize"
            onPress={() =>
              router.push({
                pathname: "/PetStyling",
                params: { petName, petType, petConfig },
              })
            }
            variant="secondary"
            icon="brush"
            style={styles.actionButton}
          />
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
  shareButton: {
    width: 44,
    height: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
  },
  tokenContainer: {
    alignItems: "center",
    marginBottom: Spacing.xxxl,
  },
  tokenFrame: {
    width: 200,
    height: 200,
  },
  tokenBorder: {
    flex: 1,
    borderRadius: 100,
    padding: 4,
  },
  tokenInner: {
    flex: 1,
    borderRadius: 96,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  petDisplay: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.background.tertiary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  tokenPetEmoji: {
    fontSize: 50,
  },
  tokenPetName: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  tokenRarity: {
    fontSize: FontSizes.sm,
    color: Colors.orange.primary,
    fontWeight: "600",
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "700",
    marginBottom: Spacing.lg,
  },
  infoCard: {
    padding: Spacing.xl,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.lg,
  },
  infoItem: {
    width: "45%",
    alignItems: "center",
    padding: Spacing.md,
    backgroundColor: Colors.background.tertiary,
    borderRadius: BorderRadius.md,
  },
  infoLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  infoValue: {
    fontSize: FontSizes.lg,
    color: Colors.text.primary,
    fontWeight: "700",
  },
  statsCard: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  traitsCard: {
    padding: Spacing.xl,
  },
  traitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  traitTag: {
    backgroundColor: Colors.orange.ultraLight,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.orange.primary,
  },
  traitText: {
    fontSize: FontSizes.sm,
    color: Colors.orange.primary,
    fontWeight: "600",
  },
  logCard: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  logItem: {
    flexDirection: "row",
    gap: Spacing.lg,
  },
  logDate: {
    backgroundColor: Colors.background.tertiary,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    minWidth: 80,
    alignItems: "center",
  },
  logDateText: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
  },
  logContent: {
    flex: 1,
  },
  logActivity: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  logProgress: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
  },
  footer: {
    flexDirection: "row",
    padding: Spacing.xxl,
    gap: Spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
})
