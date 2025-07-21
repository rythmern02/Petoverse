"use client"

import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { BorderRadius, FontSizes, Spacing } from "@/components/layout/Spacing"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Colors } from "@/constants/Colors"

export default function SignupScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleSignup = () => {
    setError("")
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    // Simulate signup
    console.log("Attempting to sign up with:", { email, password })
    // In a real app, you'd call an authentication API here
    setTimeout(() => {
      // Simulate successful signup
      router.replace("/Login") // Navigate to login after successful signup
      alert("Account created successfully! Please log in.")
    }, 1000)
  }

  return (
    <LinearGradient colors={[Colors.background.primary, Colors.background.secondary]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.welcomeText}>Join the Adventure</Text>
          <Text style={styles.titleText}>Create Your Account</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card style={styles.card}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="your@email.com"
                  placeholderTextColor={Colors.text.secondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="********"
                  placeholderTextColor={Colors.text.secondary}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="********"
                  placeholderTextColor={Colors.text.secondary}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Button
                title="Sign Up"
                onPress={handleSignup}
                variant="primary"
                size="large"
                style={styles.signupButton}
              />
            </ScrollView>
          </Card>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/Login")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xxxl,
  },
  welcomeText: {
    fontSize: FontSizes.xl,
    color: Colors.text.secondary,
    fontWeight: "500",
  },
  titleText: {
    fontSize: FontSizes.massive,
    color: Colors.text.primary,
    fontWeight: "700",
    marginTop: Spacing.xs,
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    flex: 1, // Allow form to take available space for scrolling
  },
  card: {
    padding: Spacing.xxxl,
    flex: 1, // Allow card to expand
  },
  scrollContent: {
    flexGrow: 1, // Allow content to grow within scrollview
    justifyContent: "center",
    gap: Spacing.xl,
  },
  inputGroup: {
    gap: Spacing.sm,
  },
  inputLabel: {
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    fontWeight: "600",
  },
  textInput: {
    backgroundColor: Colors.background.tertiary,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    fontSize: FontSizes.lg,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  errorText: {
    fontSize: FontSizes.sm,
    color: Colors.status.error,
    textAlign: "center",
    marginTop: Spacing.sm,
  },
  signupButton: {
    width: "100%",
    marginTop: Spacing.lg,
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl, // Add some bottom margin for spacing
  },
  loginText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
  },
  loginLink: {
    fontSize: FontSizes.md,
    color: Colors.orange.primary,
    fontWeight: "600",
  },
})
