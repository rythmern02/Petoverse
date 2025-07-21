import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import type React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants/Colors"
import { Spacing } from "../layout/Spacing"

interface ColorOption {
  id: string
  name: string
  colors: string[]
}

interface ColorPickerProps {
  colors: ColorOption[]
  selectedColor: string
  onColorSelect: (colorId: string) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedColor, onColorSelect }) => {
  return (
    <View style={styles.container}>
      {colors.map((color) => (
        <TouchableOpacity
          key={color.id}
          style={[styles.colorOption, selectedColor === color.id && styles.selectedOption]}
          onPress={() => onColorSelect(color.id)}
          activeOpacity={0.8}
        >
          <LinearGradient colors={color.colors} style={styles.colorGradient} />
          {selectedColor === color.id && (
            <View style={styles.selectedIndicator}>
              <Ionicons name="checkmark" size={16} color={Colors.text.primary} />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  colorOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative",
  },
  selectedOption: {
    borderColor: Colors.orange.primary,
  },
  colorGradient: {
    flex: 1,
  },
  selectedIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
})
