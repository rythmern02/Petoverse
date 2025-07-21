import { BorderRadius, FontSizes, Spacing } from "@/components/layout/Spacing"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import type React from "react"
import { Dimensions, Modal as RNModal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants/Colors"

const { width } = Dimensions.get("window")

interface ModalProps {
  visible: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  showCloseButton?: boolean
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children, showCloseButton = true }) => {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient colors={[Colors.background.secondary, Colors.background.tertiary]} style={styles.gradient}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              {showCloseButton && (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color={Colors.text.primary} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.content}>{children}</View>
          </LinearGradient>
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxl,
  },
  container: {
    width: width - Spacing.huge,
    maxHeight: "80%",
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.primary,
  },
  title: {
    fontSize: FontSizes.xl,
    color: Colors.text.primary,
    fontWeight: "700",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
  },
})
