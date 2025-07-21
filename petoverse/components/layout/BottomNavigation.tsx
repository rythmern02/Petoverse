import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants/Colors"
import { FontSizes, Spacing } from "./Spacing"

interface NavItem {
  id: string
  label: string
  icon: keyof typeof Ionicons.glyphMap
  onPress: () => void
}

interface BottomNavigationProps {
  items: NavItem[]
  activeItem: string
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ items, activeItem }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.id === activeItem

        return (
          <TouchableOpacity key={item.id} style={styles.navItem} onPress={item.onPress} activeOpacity={0.7}>
            <Ionicons name={item.icon} size={24} color={isActive ? Colors.orange.primary : Colors.text.secondary} />
            <Text style={[styles.navText, { color: isActive ? Colors.orange.primary : Colors.text.secondary }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.primary,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.xxl,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  navText: {
    fontSize: FontSizes.xs,
    fontWeight: "500",
  },
})
