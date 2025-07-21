"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Header } from "@/components/layout/Header"
import { BorderRadius, FontSizes, Spacing } from "@/components/layout/Spacing"
import { StatsBar } from "@/components/pet/StatsBar"
import { Card } from "@/components/ui/Card"
import { Modal } from "@/components/ui/Modal"
import { Colors } from "@/constants/Colors"

interface Reward {
  id: number
  type: string
  title: string
  description: string
  value: number
  rarity: string
  claimed: boolean
  icon: string
  colors: string[]
}

export default function RewardScreen() {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [showClaimModal, setShowClaimModal] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const glowAnim = useRef(new Animated.Value(0)).current
  const floatAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()

    // Glow animation for rewards
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // Float animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  const rewards: Reward[] = [
    {
      id: 1,
      type: "xp",
      title: "Daily XP Boost",
      description: "500 XP points for your pet",
      value: 500,
      rarity: "common",
      claimed: false,
      icon: "star",
      colors: [Colors.status.success, "#28A745"],
    },
    {
      id: 2,
      type: "gems",
      title: "Cosmic Gems",
      description: "Rare gems from distant galaxies",
      value: 50,
      rarity: "rare",
      claimed: false,
      icon: "diamond",
      colors: ["#AF52DE", "#8E44AD"],
    },
    {
      id: 3,
      type: "accessory",
      title: "Stellar Crown",
      description: "Legendary crown accessory",
      value: 1,
      rarity: "legendary",
      claimed: true,
      icon: "trophy",
      colors: [Colors.orange.primary, Colors.orange.dark],
    },
    {
      id: 4,
      type: "energy",
      title: "Energy Crystals",
      description: "Restore your pet's energy",
      value: 100,
      rarity: "uncommon",
      claimed: false,
      icon: "flash",
      colors: [Colors.status.info, "#0056CC"],
    },
    {
      id: 5,
      type: "special",
      title: "Mystery Box",
      description: "Contains unknown treasures",
      value: 1,
      rarity: "mythic",
      claimed: false,
      icon: "gift",
      colors: [Colors.status.error, "#CC0000"],
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return Colors.status.success
      case "uncommon":
        return Colors.status.info
      case "rare":
        return "#AF52DE"
      case "legendary":
        return Colors.orange.primary
      case "mythic":
        return Colors.status.error
      default:
        return Colors.text.primary
    }
  }

  const handleClaimReward = (reward: Reward) => {
    if (!reward.claimed) {
      setSelectedReward(reward)
      setShowClaimModal(true)
      // Simulate claiming
      setTimeout(() => {
        setShowClaimModal(false)
        setSelectedReward(null)
      }, 2000)
    }
  }

  const statsData = [
    {
      icon: "star" as const,
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
      label: "Rewards",
      value: "47",
      color: Colors.status.warning,
    },
  ]

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Header title="Cosmic Rewards" subtitle="Claim your treasures" showBack onBackPress={() => router.back()} />
        </Animated.View>

        {/* Stats Bar */}
        <Animated.View style={[styles.statsContainer, { opacity: fadeAnim }]}>
          <StatsBar stats={statsData} />
        </Animated.View>

        {/* Rewards Grid */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[
              styles.rewardsGrid,
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
            {rewards.map((reward, index) => {
              const animatedStyle = {
                transform: [
                  {
                    translateY: floatAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -5 - index],
                    }),
                  },
                ],
              }

              return (
                <Animated.View key={reward.id} style={[styles.rewardCard, animatedStyle]}>
                  <Card
                    variant={reward.claimed ? "default" : "gradient"}
                    style={{
                      ...styles.rewardCardInner,
                      ...(reward.claimed ? styles.claimedCard : {})
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleClaimReward(reward)}
                      disabled={reward.claimed}
                      style={styles.rewardButton}
                      activeOpacity={0.8}
                    >
                      {/* Glow effect for unclaimed rewards */}
                      {!reward.claimed && (
                        <Animated.View
                          style={[
                            styles.glowEffect,
                            {
                              opacity: glowAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.3, 0.8],
                              }),
                            },
                          ]}
                        />
                      )}

                      {/* Rarity border */}
                      <View
                        style={[
                          styles.rarityBorder,
                          {
                            borderColor: getRarityColor(reward.rarity),
                            opacity: reward.claimed ? 0.3 : 1,
                          },
                        ]}
                      />

                      <View style={styles.rewardIcon}>
                        <Ionicons
                          name={reward.icon as any}
                          size={32}
                          color={reward.claimed ? Colors.text.secondary : Colors.text.primary}
                        />
                      </View>

                      <Text style={[styles.rewardTitle, reward.claimed && styles.claimedText]}>{reward.title}</Text>

                      <Text style={[styles.rewardDescription, reward.claimed && styles.claimedText]}>
                        {reward.description}
                      </Text>

                      <View style={styles.rewardFooter}>
                        <Text
                          style={[
                            styles.rarityText,
                            { color: getRarityColor(reward.rarity) },
                            reward.claimed && styles.claimedText,
                          ]}
                        >
                          {reward.rarity.toUpperCase()}
                        </Text>

                        {reward.claimed ? (
                          <View style={styles.claimedBadge}>
                            <Ionicons name="checkmark-circle" size={16} color={Colors.status.success} />
                            <Text style={styles.claimedBadgeText}>CLAIMED</Text>
                          </View>
                        ) : (
                          <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>
                              {reward.type === "xp" && `${reward.value} XP`}
                              {reward.type === "gems" && `${reward.value} Gems`}
                              {reward.type === "energy" && `${reward.value}%`}
                              {(reward.type === "accessory" || reward.type === "special") && "UNIQUE"}
                            </Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </Card>
                </Animated.View>
              )
            })}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>

      {/* Claim Animation Modal */}
      {selectedReward && (
        <Modal
          visible={showClaimModal}
          onClose={() => setShowClaimModal(false)}
          title="Reward Claimed!"
          showCloseButton={false}
        >
          <View style={styles.claimModalContent}>
            <Animated.View
              style={[
                styles.claimAnimation,
                {
                  transform: [
                    {
                      scale: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            >
              <LinearGradient colors={selectedReward.colors} style={styles.claimIcon}>
                <Ionicons name={selectedReward.icon as any} size={48} color={Colors.text.primary} />
              </LinearGradient>
              <Text style={styles.claimTitle}>{selectedReward.title}</Text>
              <Text style={styles.claimSubtitle}>Successfully claimed!</Text>

              {/* Particle effects */}
              <View style={styles.particles}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.particle,
                      {
                        transform: [
                          {
                            rotate: `${i * 45}deg`,
                          },
                          {
                            translateY: glowAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -50],
                            }),
                          },
                        ],
                        opacity: glowAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [1, 0.5, 0],
                        }),
                      },
                    ]}
                  >
                    <Text style={styles.particleText}>✨</Text>
                  </Animated.View>
                ))}
              </View>
            </Animated.View>
          </View>
        </Modal>
      )}
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
    marginBottom: Spacing.xl,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
  },
  rewardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  rewardCard: {
    width: "47%",
  },
  rewardCardInner: {
    minHeight: 200,
    position: "relative",
  },
  claimedCard: {
    opacity: 0.6,
  },
  rewardButton: {
    flex: 1,
    padding: Spacing.lg,
    alignItems: "center",
  },
  glowEffect: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: BorderRadius.lg + 2,
    backgroundColor: "rgba(255,149,0,0.2)",
  },
  rarityBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
  },
  rewardIcon: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  rewardTitle: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  rewardDescription: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: Spacing.lg,
    lineHeight: 16,
  },
  rewardFooter: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  rarityText: {
    fontSize: FontSizes.xs,
    fontWeight: "700",
    letterSpacing: 1,
  },
  claimedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  claimedBadgeText: {
    fontSize: FontSizes.xs,
    color: Colors.status.success,
    fontWeight: "700",
  },
  valueContainer: {
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  valueText: {
    fontSize: FontSizes.xs,
    color: Colors.text.primary,
    fontWeight: "700",
  },
  claimedText: {
    opacity: 0.5,
  },
  claimModalContent: {
    alignItems: "center",
    padding: Spacing.xl,
  },
  claimAnimation: {
    alignItems: "center",
    position: "relative",
  },
  claimIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  claimTitle: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  claimSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
  },
  particles: {
    position: "absolute",
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
  },
  particle: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  particleText: {
    fontSize: 20,
  },
})
