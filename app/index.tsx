import { StyleSheet, View, Text, StatusBar } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import LoginScreen from "./screen/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import Navigations from "./components/Navigations";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function Page() {
  const [fontLoaded] = useFonts({
    "outfit-regular": require("@/assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <ClerkProvider
      // tokenCache={tokenCache}
      publishableKey={
        "pk_test_c3RpcnJpbmctc2hyZXctMjUuY2xlcmsuYWNjb3VudHMuZGV2JA"
      }
    >
      <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          {/* <NavigationContainer> */}
          <Navigations />
          {/* </NavigationContainer> */}
        </SignedIn>
        <SignedOut>
          {/* <LoginScreen /> */}
          {/* <NavigationContainer> */}
          <Navigations />
          {/* </NavigationContainer> */}
        </SignedOut>
        <StatusBar />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 25,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
