import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Authentication Flow */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />

        {/* Main App Tabs (grouped) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Other top-level screens that are not part of tabs */}
        <Stack.Screen name="pet-creation" options={{ headerShown: false }} />
        <Stack.Screen name="pet-styling" options={{ headerShown: false }} />
        <Stack.Screen name="pet-token" options={{ headerShown: false }} />
        <Stack.Screen name="pet-multiverse" options={{ headerShown: false }} />
        <Stack.Screen name="rewards" options={{ headerShown: false }} />
        <Stack.Screen name="pet-playground" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  )
}
