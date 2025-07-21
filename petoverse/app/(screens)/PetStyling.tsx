"use client"

import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Header } from "@/components/layout/Header"
import { FontSizes, Spacing } from "@/components/layout/Spacing"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ColorPicker } from "@/components/ui/ColorPicker"
import { Slider } from "@/components/ui/Slider"
import { Colors } from "@/constants/Colors"

export default function PetStylingScreen() {
  const { petType, petName } = useLocalSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("colors")
  const [petConfig, setPetConfig] = useState({
    primaryColor: "orange",
    secondaryColor: "orange-light",
    size: 1,
    accessories: [] as string[],
  })

  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const colorPalettes = [
    { id: "orange", name: "Orange", colors: [Colors.orange.primary, Colors.orange.dark] },
    { id: "orange-light", name: "Light Orange", colors: [Colors.orange.light, Colors.orange.primary] },
    { id: "success", name: "Green", colors: [Colors.status.success, "#28A745"] },
    { id: "info", name: "Blue", colors: [Colors.status.info, "#0056CC"] },
    { id: "purple", name: "Purple", colors: ["#AF52DE", "#8E44AD"] },
    { id: "red", name: "Red", colors: [Colors.status.error, "#CC0000"] },
  ]

  const accessories = [
    { id: "crown", name: "Crown", emoji: "👑" },
    { id: "glasses", name: "Glasses", emoji: "🕶️" },
    { id: "bow", name: "Bow", emoji: "🎀" },
    { id: "necklace", name: "Necklace", emoji: "📿" },
  ]

  const categories = [
    { id: "colors", name: "Colors", icon: "color-palette" },
    { id: "size", name: "Size", icon: "resize" },
    { id: "accessories", name: "Accessories", icon: "diamond" },
  ]

  const handleSave = () => {
    router.push({
      pathname: "/PetToken",
      params: { petName, petType, petConfig: JSON.stringify(petConfig) },
    })
  }

  const toggleAccessory = (accessoryId: string) => {
    setPetConfig((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(accessoryId)
        ? prev.accessories.filter((id) => id !== accessoryId)
        : [...prev.accessories, accessoryId],
    }))
  }

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

  const selectedColorPalette = colorPalettes.find((c) => c.id === petConfig.primaryColor)

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Header title={`Style ${petName}`} showBack onBackPress={() => router.back()} />
        </Animated.View>

        {/* Pet Preview */}
        <Animated.View
          style={[
            styles.previewContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Card variant="bordered" style={styles.previewCard}>
            <View
              style={[
                styles.petPreview,
                {
                  transform: [{ scale: petConfig.size }],
                },
              ]}
            >
              <Text style={styles.petEmoji}>{getPetEmoji()}</Text>
              {petConfig.accessories.map((accessoryId, index) => {
                const accessory = accessories.find((a) => a.id === accessoryId)
                return (
                  <Text key={accessoryId} style={[styles.accessory, { top: index * 20 }]}>
                    {accessory?.emoji}
                  </Text>
                )
              })}
            </View>
            <Text style={styles.petName}>{petName}</Text>
          </Card>
        </Animated.View>

        {/* Category Tabs */}
        <Animated.View style={[styles.categoriesContainer, { opacity: fadeAnim }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {categories.map((category) => (
              <Button
                key={category.id}
                title={category.name}
                onPress={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "primary" : "secondary"}
                size="small"
                style={styles.categoryButton}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Options Content */}
        <Animated.View style={[styles.optionsContainer, { opacity: fadeAnim }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedCategory === "colors" && (
              <View style={styles.optionSection}>
                <Text style={styles.optionTitle}>Color Palettes</Text>
                <ColorPicker
                  colors={colorPalettes}
                  selectedColor={petConfig.primaryColor}
                  onColorSelect={(colorId: any) =>
                    setPetConfig((prev) => ({
                      ...prev,
                      primaryColor: colorId,
                    }))
                  }
                />
              </View>
            )}

            {selectedCategory === "size" && (
              <View style={styles.optionSection}>
                <Text style={styles.optionTitle}>Pet Size</Text>
                <Slider
                  label="Size"
                  value={petConfig.size}
                  minimumValue={0.5}
                  maximumValue={1.5}
                  step={0.1}
                  onValueChange={(value: any) =>
                    setPetConfig((prev) => ({
                      ...prev,
                      size: value,
                    }))
                  }
                />
              </View>
            )}

            {selectedCategory === "accessories" && (
              <View style={styles.optionSection}>
                <Text style={styles.optionTitle}>Accessories</Text>
                <View style={styles.accessoriesGrid}>
                  {accessories.map((accessory) => {
                    const isSelected = petConfig.accessories.includes(accessory.id)
                    return (
                      <Card
                        key={accessory.id}
                        variant={isSelected ? "gradient" : "bordered"}
                        style={styles.accessoryCard}
                      >
                        <Button
                          title=""
                          onPress={() => toggleAccessory(accessory.id)}
                          variant="ghost"
                          style={styles.accessoryButton}
                        >
                          <Text style={styles.accessoryEmoji}>{accessory.emoji}</Text>
                          <Text style={styles.accessoryName}>{accessory.name}</Text>
                        </Button>
                      </Card>
                    )
                  })}
                </View>
              </View>
            )}
          </ScrollView>
        </Animated.View>

        {/* Footer */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <Button title="Complete Styling" onPress={handleSave} variant="primary" icon="checkmark-circle" />
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
  previewContainer: {
    paddingHorizontal: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  previewCard: {
    alignItems: "center",
    padding: Spacing.xxxl,
  },
  petPreview: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: Spacing.lg,
  },
  petEmoji: {
    fontSize: 80,
  },
  accessory: {
    position: "absolute",
    fontSize: 30,
    right: -10,
  },
  petName: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "600",
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  categoriesScroll: {
    gap: Spacing.md,
  },
  categoryButton: {
    minWidth: 100,
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
  },
  optionSection: {
    marginBottom: Spacing.xxxl,
  },
  optionTitle: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "700",
    marginBottom: Spacing.lg,
  },
  accessoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.lg,
  },
  accessoryCard: {
    width: "45%",
    minHeight: 100,
  },
  accessoryButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
  },
  accessoryEmoji: {
    fontSize: 32,
  },
  accessoryName: {
    fontSize: FontSizes.sm,
    color: Colors.text.primary,
    fontWeight: "500",
    textAlign: "center",
  },
  footer: {
    padding: Spacing.xxl,
  },
})
