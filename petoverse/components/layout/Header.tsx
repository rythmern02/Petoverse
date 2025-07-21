import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import type React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants/Colors"
import { FontSizes, Spacing } from "./Spacing"

interface HeaderProps {
  title?: string
  subtitle?: string
  showBack?: boolean
  onBackPress?: () => void
  rightComponent?: React.ReactNode
  showProfile?: boolean
  onProfilePress?: () => void
  showNotifications?: boolean
  onNotificationPress?: () => void
  hasNotificationDot?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightComponent,
  showProfile = false,
  onProfilePress,
  showNotifications = false,
  onNotificationPress,
  hasNotificationDot = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.titleContainer}>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            {title && <Text style={styles.title}>{title}</Text>}
          </View>
        )}
      </View>

      <View style={styles.center}>
        {showBack && title && (
          <View style={styles.centerTitle}>
            <Text style={styles.centerTitleText}>{title}</Text>
            {subtitle && <Text style={styles.centerSubtitle}>{subtitle}</Text>}
          </View>
        )}
      </View>

      <View style={styles.right}>
        {rightComponent}

        {showNotifications && (
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <Ionicons name="notifications-outline" size={24} color={Colors.text.primary} />
            {hasNotificationDot && <View style={styles.notificationDot} />}
          </TouchableOpacity>
        )}

        {showProfile && (
          <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
            <LinearGradient colors={[Colors.orange.primary, Colors.orange.dark]} style={styles.profileGradient}>
              <Text style={styles.profileInitial}>A</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg,
    minHeight: 60,
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
  },
  center: {
    flex: 2,
    alignItems: "center",
  },
  right: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: Spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: FontSizes.xxxl,
    color: Colors.text.primary,
    fontWeight: "700",
    marginTop: 2,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    fontWeight: "500",
  },
  centerTitle: {
    alignItems: "center",
  },
  centerTitleText: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "600",
  },
  centerSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    fontWeight: "500",
    marginTop: 2,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.status.error,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  profileGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "600",
  },
})
