"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { BottomNavigation } from "@/components/layout/BottomNavigation"
import { Header } from "@/components/layout/Header"
import { FontSizes, Spacing } from "@/components/layout/Spacing"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { Colors } from "@/constants/Colors"

const { width, height } = Dimensions.get("window")

interface GalaxyNode {
  id: number
  name: string
  type: string
  x: number
  y: number
  pets: number
  distance: string
  colors: string[]
}

export default function PetMultiverseScreen() {
  const [selectedNode, setSelectedNode] = useState<GalaxyNode | null>(null)
  const [showModal, setShowModal] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const twinkleAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()

    // Pulse animation for nodes
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // Twinkle animation for stars
    Animated.loop(
      Animated.sequence([
        Animated.timing(twinkleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(twinkleAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  const galaxyNodes: GalaxyNode[] = [
    {
      id: 1,
      name: "Cosmic Playground",
      type: "playground",
      x: width * 0.3,
      y: height * 0.25,
      pets: 12,
      distance: "0.5 ly",
      colors: [Colors.orange.primary, Colors.orange.dark],
    },
    {
      id: 2,
      name: "Stellar Academy",
      type: "training",
      x: width * 0.7,
      y: height * 0.2,
      pets: 8,
      distance: "1.2 ly",
      colors: [Colors.status.info, "#0056CC"],
    },
    {
      id: 3,
      name: "Nebula Gardens",
      type: "social",
      x: width * 0.2,
      y: height * 0.45,
      pets: 25,
      distance: "2.1 ly",
      colors: [Colors.status.success, "#28A745"],
    },
    {
      id: 4,
      name: "Quantum Arena",
      type: "battle",
      x: width * 0.8,
      y: height * 0.5,
      pets: 15,
      distance: "3.7 ly",
      colors: [Colors.status.error, "#CC0000"],
    },
    {
      id: 5,
      name: "Crystal Caves",
      type: "treasure",
      x: width * 0.5,
      y: height * 0.65,
      pets: 6,
      distance: "5.2 ly",
      colors: ["#AF52DE", "#8E44AD"],
    },
  ]

  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height * 0.8,
    size: Math.random() * 3 + 1,
  }))

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "playground":
        return "game-controller"
      case "training":
        return "school"
      case "social":
        return "people"
      case "battle":
        return "flash"
      case "treasure":
        return "diamond"
      default:
        return "planet"
    }
  }

  const handleNodePress = (node: GalaxyNode) => {
    setSelectedNode(node)
    setShowModal(true)
  }

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: "home-outline" as const,
      onPress: () => router.push("/"),
    },
    {
      id: "explore",
      label: "Explore",
      icon: "planet" as const,
      onPress: () => {},
    },
    {
      id: "customize",
      label: "Customize",
      icon: "brush-outline" as const,
      onPress: () => router.push("/PetStyling"),
    },
    {
      id: "profile",
      label: "Profile",
      icon: "person-outline" as const,
      onPress: () => {},
    },
  ]

  return (
    <View style={styles.container}>
      <LinearGradient colors={[Colors.background.primary, "#001122", "#002244"]} style={styles.backgroundGradient} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Header
            title="Pet Multiverse"
            showBack
            onBackPress={() => router.back()}
            rightComponent={
              <Button
                title=""
                onPress={() => {}}
                variant="secondary"
                size="small"
                icon="location"
                style={styles.locationButton}
              />
            }
          />
        </Animated.View>

        {/* Galaxy Container */}
        <Animated.View style={[styles.galaxyContainer, { opacity: fadeAnim }]}>
          {/* Background Stars */}
          {stars.map((star) => (
            <Animated.View
              key={star.id}
              style={[
                styles.star,
                {
                  left: star.x,
                  top: star.y,
                  width: star.size,
                  height: star.size,
                  opacity: twinkleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ]}
            />
          ))}

          {/* Galaxy Nodes */}
          {galaxyNodes.map((node, index) => (
            <Animated.View
              key={node.id}
              style={[
                styles.nodeContainer,
                {
                  left: node.x - 30,
                  top: node.y - 30,
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <TouchableOpacity onPress={() => handleNodePress(node)} style={styles.nodeButton}>
                <LinearGradient colors={node.colors} style={styles.nodeGradient}>
                  <Ionicons name={getNodeIcon(node.type) as any} size={24} color={Colors.text.primary} />
                </LinearGradient>

                {/* Connection Lines */}
                {index < galaxyNodes.length - 1 && (
                  <View
                    style={[
                      styles.connectionLine,
                      {
                        width: Math.sqrt(
                          Math.pow(galaxyNodes[index + 1].x - node.x, 2) +
                            Math.pow(galaxyNodes[index + 1].y - node.y, 2),
                        ),
                        transform: [
                          {
                            rotate: `${Math.atan2(
                              galaxyNodes[index + 1].y - node.y,
                              galaxyNodes[index + 1].x - node.x,
                            )}rad`,
                          },
                        ],
                      },
                    ]}
                  />
                )}
              </TouchableOpacity>

              <Text style={styles.nodeName}>{node.name}</Text>
              <Text style={styles.nodePets}>{node.pets} pets</Text>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Bottom Navigation */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <BottomNavigation items={navItems} activeItem="explore" />
        </Animated.View>
      </SafeAreaView>

      {/* Node Details Modal */}
      {selectedNode && (
        <Modal visible={showModal} onClose={() => setShowModal(false)} title={selectedNode.name} showCloseButton={true}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <LinearGradient colors={selectedNode.colors} style={styles.modalIcon}>
                <Ionicons name={getNodeIcon(selectedNode.type) as any} size={32} color={Colors.text.primary} />
              </LinearGradient>
              <View style={styles.modalInfo}>
                <Text style={styles.modalSubtitle}>
                  {selectedNode.pets} pets • {selectedNode.distance}
                </Text>
              </View>
            </View>

            <Text style={styles.modalDescription}>
              {selectedNode.type === "playground" &&
                "A cosmic playground where pets can play and explore together in zero gravity environments."}
              {selectedNode.type === "training" &&
                "Advanced AI training facilities where pets can develop new skills and abilities."}
              {selectedNode.type === "social" &&
                "Beautiful gardens where pets socialize and form friendships across the galaxy."}
              {selectedNode.type === "battle" &&
                "Competitive arena where pets can test their skills in friendly battles."}
              {selectedNode.type === "treasure" && "Mysterious caves filled with rare crystals and hidden treasures."}
            </Text>

            <View style={styles.modalActions}>
              <Button
                title="Travel Here"
                onPress={() => {
                  setShowModal(false)
                  // Handle travel logic
                }}
                variant="primary"
                icon="rocket"
                style={styles.modalButton}
              />
              <Button
                title="Preview"
                onPress={() => {
                  setShowModal(false)
                  // Handle preview logic
                }}
                variant="secondary"
                icon="eye"
                style={styles.modalButton}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  locationButton: {
    width: 44,
    height: 44,
  },
  galaxyContainer: {
    flex: 1,
    position: "relative",
  },
  star: {
    position: "absolute",
    backgroundColor: Colors.text.primary,
    borderRadius: 50,
  },
  nodeContainer: {
    position: "absolute",
    alignItems: "center",
  },
  nodeButton: {
    position: "relative",
  },
  nodeGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  connectionLine: {
    position: "absolute",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    top: 30,
    left: 60,
    transformOrigin: "0 0",
  },
  nodeName: {
    fontSize: FontSizes.sm,
    color: Colors.text.primary,
    fontWeight: "600",
    textAlign: "center",
    marginTop: Spacing.sm,
    maxWidth: 80,
  },
  nodePets: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  modalContent: {
    gap: Spacing.lg,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalInfo: {
    flex: 1,
  },
  modalSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
  },
  modalDescription: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  modalButton: {
    flex: 1,
  },
})
