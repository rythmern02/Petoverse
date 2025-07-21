"use client"

import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { BorderRadius, FontSizes, Spacing } from "@/components/layout/Spacing"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Colors } from "@/constants/Colors"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

  const handleLogin = () => {
    setError("")
    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }
    // Simulate login
    console.log("Attempting to log in with:", { email, password })
    // In a real app, you'd call an authentication API here
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        router.replace("/(screens)/PetCreation") // Navigate to home on successful login
      } else {
        setError("Invalid email or password.")
      }
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
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.titleText}>Login to Petoverse</Text>
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

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button title="Login" onPress={handleLogin} variant="primary" size="large" style={styles.loginButton} />

            <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => console.log("Forgot password")}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </Card>

          <View style={styles.signupPrompt}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/Signup")}>
              <Text style={styles.signupLink}>Sign Up</Text>
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
  },
  card: {
    padding: Spacing.xxxl,
    gap: Spacing.xl,
    marginBottom: Spacing.xl,
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
  loginButton: {
    width: "100%",
    marginTop: Spacing.lg,
  },
  forgotPasswordButton: {
    alignSelf: "center",
    marginTop: Spacing.md,
  },
  forgotPasswordText: {
    fontSize: FontSizes.md,
    color: Colors.orange.primary,
    fontWeight: "600",
  },
  signupPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xs,
  },
  signupText: {
    fontSize: FontSizes.md,
    color: Colors.text.secondary,
  },
  signupLink: {
    fontSize: FontSizes.md,
    color: Colors.orange.primary,
    fontWeight: "600",
  },
})
