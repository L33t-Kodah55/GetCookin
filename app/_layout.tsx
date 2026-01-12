import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { tagData } from '@/data/tagData';
import { Asset } from 'expo-asset';
import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PlayfairDisplayBlack: require('../assets/fonts/PlayfairDisplay-Black.ttf'),
    ...FontAwesome.font,
  });

  const [iconsReady, setIconsReady] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);


  // Précharge les icônes des tags
  useEffect(() => {
    async function preloadAssets() {
      try {
        const icons = Object.values(tagData).map((tag) => tag.icon);
        await Asset.loadAsync(icons);
      } catch (e) {
        console.warn('Erreur lors du préchargement des icônes', e);
      } finally {
        setIconsReady(true);
      }
    }
    preloadAssets();
  }, []);


  // Quand polices + icônes sont prêtes → cacher le splash
  useEffect(() => {
    if (loaded && iconsReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, iconsReady]);

  if (!loaded || !iconsReady) {
    // garde le Splash tant que tout n'est pas prêt
    return null; // garde le splash visible
  }

  return <RootLayoutNav />;
}



function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
