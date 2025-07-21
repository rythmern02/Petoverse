import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import type React from "react"
import { StyleSheet, Text, TouchableOpacity, type TextStyle, type ViewStyle } from "react-native"
import { Colors, Gradients } from "../../constants/Colors"
import { BorderRadius, FontSizes, Spacing } from "../layout/Spacing"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "small" | "medium" | "large"
  icon?: keyof typeof Ionicons.glyphMap
  iconPosition?: "left" | "right"
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle: any = [styles.button, styles[size]]

    if (variant === "secondary") {
      baseStyle.push(styles.secondary)
    } else if (variant === "ghost") {
      baseStyle.push(styles.ghost)
    }

    if (disabled) {
      baseStyle.push(styles.disabled)
    }

    return baseStyle
  }

  const getTextStyle = () => {
    const baseStyle: any = [styles.text, styles[`${size}Text`]]

    if (variant === "secondary" || variant === "ghost") {
      baseStyle.push(styles.secondaryText)
    }

    return baseStyle
  }

  const renderContent = () => (
    <>
      {icon && iconPosition === "left" && (
        <Ionicons
          name={icon}
          size={size === "small" ? 16 : size === "large" ? 24 : 20}
          color={variant === "primary" ? Colors.text.primary : Colors.text.primary}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      {icon && iconPosition === "right" && (
        <Ionicons
          name={icon}
          size={size === "small" ? 16 : size === "large" ? 24 : 20}
          color={variant === "primary" ? Colors.text.primary : Colors.text.primary}
        />
      )}
    </>
  )

  if (variant === "primary") {
    return (
      <TouchableOpacity style={[getButtonStyle(), style]} onPress={onPress} disabled={disabled} activeOpacity={0.8}>
        <LinearGradient colors={Gradients.orange} style={styles.gradient}>
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={[getButtonStyle(), style]} onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      {renderContent()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
  },
  secondary: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
  },
  ghost: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
  },
  small: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  medium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  large: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
    color: Colors.text.primary,
  },
  secondaryText: {
    color: Colors.text.primary,
  },
  smallText: {
    fontSize: FontSizes.sm,
  },
  mediumText: {
    fontSize: FontSizes.lg,
  },
  largeText: {
    fontSize: FontSizes.xl,
  },
})
