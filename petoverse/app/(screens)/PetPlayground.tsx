"use client";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { router } from "expo-router";

import { Header } from "@/components/layout/Header";
import { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BorderRadius, FontSizes, Spacing } from "@/components/layout/Spacing";

import { Button } from "@/components/ui/Button";

import { Card } from "@/components/ui/Card";

import { Colors } from "@/constants/Colors";


interface ChatMessage {
  id: number;

  type: "user" | "pet" | "system";

  text: string;
}

export default function PetPlaygroundScreen() {
  const [message, setMessage] = useState("");

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, type: "pet", text: "Hello! I'm so happy to see you! ✨" },

    { id: 2, type: "system", text: "Your pet is feeling energetic today!" },
  ]);

  const [selectedToy, setSelectedToy] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const petBounceAnim = useRef(new Animated.Value(0)).current;

  const toyFloatAnim = useRef(new Animated.Value(0)).current;

  const heartAnim = useRef(new Animated.Value(0)).current;

  // Unique ID ref for chat messages
  const nextMessageId = useRef(3);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,

      duration: 1000,

      useNativeDriver: true,
    }).start();

    const petBounceLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(petBounceAnim, {
          toValue: 1,

          duration: 2000,

          useNativeDriver: true,
        }),

        Animated.timing(petBounceAnim, {
          toValue: 0,

          duration: 2000,

          useNativeDriver: true,
        }),
      ])
    );
    petBounceLoop.start();

    const toyFloatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(toyFloatAnim, {
          toValue: 1,

          duration: 3000,

          useNativeDriver: true,
        }),

        Animated.timing(toyFloatAnim, {
          toValue: 0,

          duration: 3000,

          useNativeDriver: true,
        }),
      ])
    );
    toyFloatLoop.start();

    return () => {
      petBounceLoop.stop();
      toyFloatLoop.stop();
    };
  }, []);

  const toys = [
    { id: "ball", name: "Cosmic Ball", emoji: "⚽" },

    { id: "star", name: "Star Wand", emoji: "⭐" },

    { id: "crystal", name: "Energy Crystal", emoji: "💎" },

    { id: "music", name: "Music Box", emoji: "🎵" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: nextMessageId.current++, // Use unique ID
        type: "user",
        text: message,
      };

      setChatMessages([...chatMessages, newMessage]);

      setMessage(""); // Simulate pet response

      setTimeout(() => {
        const responses = [
          "That sounds amazing! Tell me more! 🌟",

          "I love spending time with you! 💫",

          "You make me so happy! Let's play more! ✨",

          "I'm learning so much from you! 🚀",

          "This is the best day ever! 🎉",
        ];

        const petResponse: ChatMessage = {
          id: nextMessageId.current++, // Use unique ID
          type: "pet",
          text: responses[Math.floor(Math.random() * responses.length)],
        };

        setChatMessages((prev) => [...prev, petResponse]);
      }, 1000);
    }
  };

  const handleToyInteraction = (toy: { id: string; name: string; emoji: string }) => {
    setSelectedToy(toy.id); // Animate heart effect

    Animated.sequence([
      Animated.timing(heartAnim, {
        toValue: 1,

        duration: 500,

        useNativeDriver: true,
      }),

      Animated.timing(heartAnim, {
        toValue: 0,

        duration: 500,

        useNativeDriver: true,
      }),
    ]).start(); // Add interaction message

    const interactionMessage: ChatMessage = {
      id: nextMessageId.current++, // Use unique ID
      type: "system",
      text: `Your pet is playing with the ${toy.name}! Happiness +10 ✨`,
    };

    setChatMessages((prev) => [...prev, interactionMessage]);

    setTimeout(() => setSelectedToy(null), 2000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Header
            title="Pet Playground"
            showBack
            onBackPress={() => router.back()}
            rightComponent={
              <Button
                title=""
                onPress={() => {}}
                variant="secondary"
                size="small"
                icon="stats-chart"
                style={styles.statsButton}
              />
            }
          />
        </Animated.View>
        {/* Pet Environment */}
        <Animated.View
          style={[
            styles.playgroundContainer,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Card variant="gradient" style={styles.environment}>
            {/* Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.particle,
                  {
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 60 + 20}%`,
                    transform: [
                      {
                        translateY: toyFloatAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -10 - i * 2],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.particleText}>✨</Text>
              </Animated.View>
            ))}
            {/* Main Pet */}
            <Animated.View
              style={[
                styles.petContainer,
                {
                  transform: [
                    {
                      translateY: petBounceAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -20],
                      }),
                    },
                    {
                      scale: selectedToy ? 1.2 : 1,
                    },
                  ],
                },
              ]}
            >
              <LinearGradient
                colors={[Colors.orange.primary, Colors.orange.dark]}
                style={styles.petAvatar}
              >
                <Text style={styles.petEmoji}>🐱</Text>
              </LinearGradient>
              {/* Heart effect */}
              {selectedToy && (
                <Animated.View
                  style={[
                    styles.heartEffect,
                    {
                      opacity: heartAnim,
                      transform: [
                        {
                          translateY: heartAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -30],
                          }),
                        },
                        {
                          scale: heartAnim.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [0, 1.2, 0.8],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.heartText}>💖</Text>
                </Animated.View>
              )}
            </Animated.View>
            {/* Pet Status */}
            <View style={styles.petStatus}>
              <View style={styles.statusItem}>
                <Ionicons
                  name="heart"
                  size={16}
                  color={Colors.status.success}
                />
                <Text style={styles.statusText}>Happy</Text>
              </View>
              <View style={styles.statusItem}>
                <Ionicons
                  name="flash"
                  size={16}
                  color={Colors.orange.primary}
                />
                <Text style={styles.statusText}>Energetic</Text>
              </View>
            </View>
          </Card>
        </Animated.View>
        {/* Toys Section */}
        <Animated.View
          style={[
            styles.toysSection,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Toys & Activities</Text>
          <View style={styles.toysContainer}>
            {toys.map((toy, index) => (
              <Animated.View
                key={toy.id}
                style={[
                  styles.toyItem,
                  {
                    transform: [
                      {
                        translateY: toyFloatAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -5 - index * 2],
                        }),
                      },
                      {
                        scale: selectedToy === toy.id ? 1.1 : 1,
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleToyInteraction(toy)}
                  style={styles.toyButton}
                >
                  <LinearGradient
                    colors={[Colors.orange.light, Colors.orange.primary]}
                    style={styles.toyGradient}
                  >
                    <Text style={styles.toyEmoji}>{toy.emoji}</Text>
                  </LinearGradient>
                  <Text style={styles.toyName}>{toy.name}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
        {/* Chat Section */}
        <Animated.View
          style={[
            styles.chatSection,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Talk to Your Pet</Text>
          <ScrollView
            style={styles.chatContainer}
            showsVerticalScrollIndicator={false}
          >
            {chatMessages.slice(-4).map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.chatMessage,
                  msg.type === "user" && styles.userMessage,
                  msg.type === "system" && styles.systemMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.type === "user" && styles.userMessageText,
                    msg.type === "system" && styles.systemMessageText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Talk to your pet..."
              placeholderTextColor={Colors.text.secondary}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <Button
              title=""
              onPress={handleSendMessage}
              variant="primary"
              size="small"
              icon="send"
              style={styles.sendButton}
            />
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background.primary,
  },

  safeArea: {
    flex: 1,
  },

  statsButton: {
    width: 44,

    height: 44,
  },

  playgroundContainer: {
    height: 250,

    marginHorizontal: Spacing.xxl,

    marginBottom: Spacing.xl,
  },

  environment: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    position: "relative",

    padding: Spacing.xl,
  },

  particle: {
    position: "absolute",
  },

  particleText: {
    fontSize: 12,

    opacity: 0.6,
  },

  petContainer: {
    alignItems: "center",

    position: "relative",
  },

  petAvatar: {
    width: 100,

    height: 100,

    borderRadius: 50,

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 3,

    borderColor: Colors.text.primary,
  },

  petEmoji: {
    fontSize: 50,
  },

  heartEffect: {
    position: "absolute",

    top: -20,
  },

  heartText: {
    fontSize: 24,
  },

  petStatus: {
    position: "absolute",

    bottom: Spacing.lg,

    flexDirection: "row",

    gap: Spacing.lg,
  },

  statusItem: {
    flexDirection: "row",

    alignItems: "center",

    gap: Spacing.xs,

    backgroundColor: "rgba(0,0,0,0.3)",

    paddingHorizontal: Spacing.md,

    paddingVertical: Spacing.sm,

    borderRadius: BorderRadius.lg,
  },

  statusText: {
    color: Colors.text.primary,

    fontSize: FontSizes.sm,

    fontWeight: "600",
  },

  toysSection: {
    paddingHorizontal: Spacing.xxl,

    marginBottom: Spacing.xl,
  },

  sectionTitle: {
    fontSize: FontSizes.xl,

    color: Colors.text.primary,

    fontWeight: "700",

    marginBottom: Spacing.lg,
  },

  toysContainer: {
    flexDirection: "row",

    justifyContent: "space-around",
  },

  toyItem: {
    alignItems: "center",
  },

  toyButton: {
    alignItems: "center",
  },

  toyGradient: {
    width: 60,

    height: 60,

    borderRadius: 30,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: Spacing.sm,
  },

  toyEmoji: {
    fontSize: 28,
  },

  toyName: {
    fontSize: FontSizes.xs,

    color: Colors.text.primary,

    textAlign: "center",

    maxWidth: 60,
  },

  chatSection: {
    flex: 1,

    paddingHorizontal: Spacing.xxl,
  },

  chatContainer: {
    flex: 1,

    marginBottom: Spacing.lg,
  },

  chatMessage: {
    backgroundColor: Colors.background.secondary,

    padding: Spacing.md,

    borderRadius: BorderRadius.lg,

    maxWidth: "80%",

    marginBottom: Spacing.sm,
  },

  userMessage: {
    alignSelf: "flex-end",

    backgroundColor: Colors.orange.ultraLight,

    borderColor: Colors.orange.primary,

    borderWidth: 1,
  },

  systemMessage: {
    alignSelf: "center",

    backgroundColor: Colors.status.success + "20",

    borderColor: Colors.status.success,

    borderWidth: 1,
  },

  messageText: {
    color: Colors.text.primary,

    fontSize: FontSizes.md,

    lineHeight: 18,
  },

  userMessageText: {
    textAlign: "right",
  },

  systemMessageText: {
    textAlign: "center",

    fontStyle: "italic",

    fontSize: FontSizes.sm,
  },

  inputContainer: {
    flexDirection: "row",

    alignItems: "flex-end",

    gap: Spacing.md,

    paddingBottom: Spacing.xl,
  },

  messageInput: {
    flex: 1,

    backgroundColor: Colors.background.secondary,

    borderRadius: BorderRadius.xl,

    paddingHorizontal: Spacing.lg,

    paddingVertical: Spacing.md,

    color: Colors.text.primary,

    fontSize: FontSizes.md,

    maxHeight: 80,

    borderWidth: 1,

    borderColor: Colors.border.primary,
  },

  sendButton: {
    width: 44,

    height: 44,

    borderRadius: 22,
  },
});
