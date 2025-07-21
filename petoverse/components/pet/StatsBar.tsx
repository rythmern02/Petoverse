
import { FontSizes, Spacing } from "@/components/layout/Spacing"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../../constants/Colors"
import { Card } from "../ui/Card"

interface StatItem {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  value: string | number
  color: string
}

interface StatsBarProps {
  stats: StatItem[]
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <Card style={styles.container}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <View style={styles.statItem}>
            <Ionicons name={stat.icon} size={16} color={stat.color} />
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
          {index < stats.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: Spacing.lg,
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.border.primary,
    marginHorizontal: Spacing.lg,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    fontWeight: "500",
  },
  statValue: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    fontWeight: "600",
  },
})
