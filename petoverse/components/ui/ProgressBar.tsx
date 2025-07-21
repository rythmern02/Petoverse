import { LinearGradient } from "expo-linear-gradient"
import type React from "react"
import { StyleSheet, View, type ViewStyle } from "react-native"
import { Colors } from "../../constants/Colors"
import { BorderRadius, Spacing } from "../layout/Spacing"

interface CardProps {
  children: React.ReactNode
  variant?: "default" | "gradient" | "bordered"
  padding?: keyof typeof Spacing
  style?: ViewStyle
}

export const ProgressBar: React.FC<CardProps> = ({ children, variant = "default", padding = "lg", style }) => {
  if (variant === "gradient") {
    return (
      <LinearGradient
        colors={["rgba(255, 149, 0, 0.1)", "rgba(255, 149, 0, 0.05)"]}
        style={[styles.card, { padding: Spacing[padding] }, style]}
      >
        {children}
      </LinearGradient>
    )
  }

  return (
    <View style={[styles.card, variant === "bordered" && styles.bordered, { padding: Spacing[padding] }, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
  },
  bordered: {
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
})
