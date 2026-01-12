/**
 * Fichier: SearchBar.tsx
 * Date: 2025-07-21
 * Titre: Composant barre de recherche avec bouton de filtre
 * Description: Barre de recherche réutilisable incluant un champ texte et un bouton filtre.
 *              Le bouton filtre déclenche l'ouverture d'un menu ou modal pour affiner les résultats.
 */

import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
};

export default function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
      />

      <Pressable style={styles.filterButton} onPress={onFilterPress}>
        <Ionicons name="filter-outline" size={22} color="#333" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    paddingLeft: 12,
    paddingVertical: 4,
  },
});
