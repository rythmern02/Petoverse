import { BorderRadius, FontSizes, Spacing } from "@/components/layout/Spacing"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import type React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants/Colors"
import { Card } from "../ui/Card"

interface Pet {
  id: number
  name: string
  type: string
  level: number
  health: number
  energy: number
  mood: string
  emoji: string
}

interface PetCardProps {
  pet: Pet
  onPress?: () => void
  onInteract?: () => void
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onPress, onInteract }) => {
  return (
    <Card variant="bordered" style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {/* Pet Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.emoji}>{pet.emoji}</Text>
          </View>

          {/* Status Indicator */}
          <View style={styles.statusIndicator}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>

        {/* Pet Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.type}>{pet.type}</Text>
          <Text style={styles.level}>Level {pet.level}</Text>
        </View>

        {/* Pet Stats */}
        <View style={styles.stats}>


          <View style={styles.moodContainer}>
            <Ionicons name="happy-outline" size={16} color={Colors.orange.primary} />
            <Text style={styles.moodText}>Mood: {pet.mood}</Text>
          </View>
        </View>

        {/* Interact Button */}
        {onInteract && (
          <TouchableOpacity style={styles.interactButton} onPress={onInteract}>
            <LinearGradient colors={[Colors.orange.primary, Colors.orange.dark]} style={styles.interactGradient}>
              <Ionicons name="play" size={20} color={Colors.text.primary} />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xxxl,
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.background.tertiary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: Colors.orange.primary,
  },
  emoji: {
    fontSize: 60,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.status.success,
  },
  statusText: {
    fontSize: FontSizes.sm,
    color: Colors.status.success,
    fontWeight: "500",
  },
  info: {
    alignItems: "center",
    marginBottom: Spacing.xxxl,
  },
  name: {
    fontSize: FontSizes.huge,
    color: Colors.text.primary,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  type: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
    fontWeight: "500",
    marginBottom: Spacing.sm,
  },
  level: {
    fontSize: FontSizes.md,
    color: Colors.orange.primary,
    fontWeight: "600",
    backgroundColor: Colors.orange.ultraLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  stats: {
    width: "100%",
    gap: Spacing.lg,
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  moodText: {
    fontSize: FontSizes.md,
    color: Colors.orange.primary,
    fontWeight: "500",
  },
  interactButton: {
    position: "absolute",
    top: Spacing.lg,
    right: Spacing.lg,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  interactGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
