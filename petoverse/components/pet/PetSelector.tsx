import type React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants/Colors"
import { Spacing } from "../layout/Spacing"

interface Pet {
  id: number
  name: string
  emoji: string
}

interface PetSelectorProps {
  pets: Pet[]
  selectedPet: number
  onPetSelect: (index: number) => void
}

export const PetSelector: React.FC<PetSelectorProps> = ({ pets, selectedPet, onPetSelect }) => {
  if (pets.length <= 1) return null

  return (
    <View style={styles.container}>
      {pets.map((pet, index) => (
        <TouchableOpacity
          key={pet.id}
          style={[styles.petItem, selectedPet === index && styles.selectedPet]}
          onPress={() => onPetSelect(index)}
          activeOpacity={0.8}
        >
          <Text style={styles.petEmoji}>{pet.emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  petItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background.tertiary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedPet: {
    borderColor: Colors.orange.primary,
    backgroundColor: Colors.orange.ultraLight,
  },
  petEmoji: {
    fontSize: 24,
  },
})
