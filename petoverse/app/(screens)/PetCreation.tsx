"use client"

import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Header } from "@/components/layout/Header"
import { BorderRadius, FontSizes, Spacing } from "@/components/layout/Spacing"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Colors } from "@/constants/Colors"
export default function PetCreationScreen() {
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [petName, setPetName] = useState("")
  const [step, setStep] = useState(1)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const petTypes = [
    {
      id: "cosmic-cat",
      name: "Cosmic Cat",
      emoji: "🐱",
      description: "Playful and curious, loves to explore",
      rarity: "Common",
      stats: { health: 85, energy: 90, intelligence: 75 },
    },
    {
      id: "fire-dragon",
      name: "Fire Dragon",
      emoji: "🐲",
      description: "Powerful and loyal, breathes cosmic fire",
      rarity: "Rare",
      stats: { health: 95, energy: 80, intelligence: 85 },
    },
    {
      id: "crystal-fox",
      name: "Crystal Fox",
      emoji: "🦊",
      description: "Elegant and wise, channels crystal energy",
      rarity: "Epic",
      stats: { health: 80, energy: 85, intelligence: 95 },
    },
    {
      id: "shadow-wolf",
      name: "Shadow Wolf",
      emoji: "🐺",
      description: "Mysterious and strong, master of shadows",
      rarity: "Legendary",
      stats: { health: 90, energy: 88, intelligence: 80 },
    },
  ]

  const selectedPetData = petTypes.find((pet) => pet.id === selectedPet)

  const handleNext = () => {
    if (step === 1 && selectedPet) {
      setStep(2)
    } else if (step === 2 && petName.trim()) {
      setStep(3)
    }
  }

  const handleCreate = () => {
    router.push({
      pathname: "/", // Only if app/pet-styling.tsx exists
      params: { petType: selectedPet, petName },
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return Colors.text.secondary
      case "Rare":
        return Colors.orange.primary
      case "Epic":
        return Colors.status.info
      case "Legendary":
        return Colors.status.warning
      default:
        return Colors.text.secondary
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Header title="Create Pet" subtitle={`Step ${step} of 3`} showBack onBackPress={() => router.back()} />
        </Animated.View>

        {/* Progress Bar */}
        <Animated.View style={[styles.progressContainer, { opacity: fadeAnim }]}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {step === 1 && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Choose Your Pet Type</Text>
              <Text style={styles.stepDescription}>Select the type of companion you'd like to create</Text>

              <ScrollView style={styles.petTypesContainer} showsVerticalScrollIndicator={false}>
                {petTypes.map((pet) => (
                  <Card
                    key={pet.id}
                    variant={selectedPet === pet.id ? "gradient" : "bordered"}
                    style={{
                      ...styles.petTypeCard,
                      ...(selectedPet === pet.id ? styles.selectedCard : {})
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setSelectedPet(pet.id)}
                      style={styles.petTypeButton}
                    >
                      <View style={styles.petTypeContent}>
                        <View style={styles.petTypeLeft}>
                          <View style={styles.petTypeEmoji}>
                            <Text style={styles.petEmojiText}>{pet.emoji}</Text>
                          </View>
                          <View style={styles.petTypeInfo}>
                            <Text style={styles.petTypeName}>{pet.name}</Text>
                            <Text style={styles.petTypeDescription}>{pet.description}</Text>
                            <Text style={[styles.rarityText, { color: getRarityColor(pet.rarity) }]}>{pet.rarity}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Card>
                ))}
              </ScrollView>
            </View>
          )}

          {step === 2 && selectedPetData && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Name Your Pet</Text>
              <Text style={styles.stepDescription}>Give your {selectedPetData.name} a unique name</Text>

              <Card style={styles.selectedPetPreview}>
                <Text style={styles.previewEmoji}>{selectedPetData.emoji}</Text>
                <Text style={styles.previewName}>{selectedPetData.name}</Text>
              </Card>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Pet Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter pet name..."
                  placeholderTextColor={Colors.text.secondary}
                  value={petName}
                  onChangeText={setPetName}
                  maxLength={20}
                  autoFocus
                />
                <Text style={styles.inputHelper}>{petName.length}/20 characters</Text>
              </View>
            </View>
          )}

          {step === 3 && selectedPetData && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Confirm Creation</Text>
              <Text style={styles.stepDescription}>Review your pet before creating</Text>

              <Card variant="bordered" style={styles.confirmationCard}>
                <View style={styles.confirmationHeader}>
                  <Text style={styles.confirmationEmoji}>{selectedPetData.emoji}</Text>
                  <View style={styles.confirmationInfo}>
                    <Text style={styles.confirmationName}>{petName}</Text>
                    <Text style={styles.confirmationType}>{selectedPetData.name}</Text>
                    <Text style={[styles.rarityText, { color: getRarityColor(selectedPetData.rarity) }]}>
                      {selectedPetData.rarity}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          )}
        </Animated.View>

        {/* Footer */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          {step < 3 ? (
            <Button
              title="Next"
              onPress={handleNext}
              variant="primary"
              icon="arrow-forward"
              iconPosition="right"
              disabled={!selectedPet || (step === 2 && !petName.trim())}
            />
          ) : (
            <Button title="Create Pet" onPress={handleCreate} variant="primary" icon="checkmark" />
          )}
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
  progressContainer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.orange.primary,
    borderRadius: BorderRadius.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FontSizes.xxxl,
    color: Colors.text.primary,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  stepDescription: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
    fontWeight: "500",
    marginBottom: Spacing.xxxl,
    lineHeight: 22,
  },
  petTypesContainer: {
    flex: 1,
  },
  petTypeCard: {
    marginBottom: Spacing.lg,
  },
  selectedCard: {
    borderColor: Colors.orange.primary,
  },
  petTypeButton: {
    padding: 0,
  },
  petTypeContent: {
    width: "100%",
  },
  petTypeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  petTypeEmoji: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.background.tertiary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.lg,
  },
  petEmojiText: {
    fontSize: 32,
  },
  petTypeInfo: {
    flex: 1,
  },
  petTypeName: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  petTypeDescription: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
    fontWeight: "500",
    marginBottom: Spacing.sm,
    lineHeight: 18,
  },
  rarityText: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  selectedPetPreview: {
    alignItems: "center",
    padding: Spacing.xxxl,
    marginBottom: Spacing.xxxl,
  },
  previewEmoji: {
    fontSize: 80,
    marginBottom: Spacing.lg,
  },
  previewName: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "600",
  },
  inputContainer: {
    gap: Spacing.sm,
  },
  inputLabel: {
    fontSize: FontSizes.lg,
    color: Colors.text.primary,
    fontWeight: "600",
  },
  textInput: {
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    fontSize: FontSizes.lg,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  inputHelper: {
    fontSize: FontSizes.sm,
    color: Colors.text.secondary,
    textAlign: "right",
  },
  confirmationCard: {
    padding: Spacing.xxl,
  },
  confirmationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  confirmationEmoji: {
    fontSize: 60,
    marginRight: Spacing.xl,
  },
  confirmationInfo: {
    flex: 1,
  },
  confirmationName: {
    fontSize: FontSizes.xxxl,
    color: Colors.text.primary,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  confirmationType: {
    fontSize: FontSizes.lg,
    color: Colors.text.secondary,
    fontWeight: "500",
    marginBottom: Spacing.sm,
  },
  footer: {
    padding: Spacing.xxl,
  },
})
