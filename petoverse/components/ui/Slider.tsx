"use client"

import SliderComponent from "@react-native-community/slider"
import type React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../../constants/Colors"
import { FontSizes, Spacing } from "../layout/Spacing"

interface SliderProps {
  label: string
  value: number
  minimumValue: number
  maximumValue: number
  onValueChange: (value: number) => void
  step?: number
  showValue?: boolean
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  minimumValue,
  maximumValue,
  onValueChange,
  step = 1,
  showValue = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {showValue && <Text style={styles.value}>{Math.round(value)}</Text>}
      </View>
      <SliderComponent
        style={styles.slider}
        value={value}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        onValueChange={onValueChange}
        step={step}
        minimumTrackTintColor={Colors.orange.primary}
        maximumTrackTintColor={Colors.background.tertiary}
        thumbTintColor={Colors.orange.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    fontWeight: "600",
  },
  value: {
    fontSize: FontSizes.md,
    color: Colors.orange.primary,
    fontWeight: "700",
  },
  slider: {
    height: 40,
  },
})
