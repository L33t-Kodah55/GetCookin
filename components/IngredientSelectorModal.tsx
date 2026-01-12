/**
 * @file IngredientSelectorModal.tsx
 * @date 2025-07-25
 * @title Sélecteur d'ingrédients avec image
 * @description
 * Modal affichant une liste d’ingrédients avec leur image.
 * La sélection se fait en local et n’est transmise que si l’usager clique sur "Appliquer".
 * Si l’usager clique sur "Annuler", aucune modification n’est appliquée.
 */

import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';

/**
 * @typedef Ingredient
 * @property {string} name - Nom de l'ingrédient
 * @property {string} image - URI de l'image de l'ingrédient
 */
type Ingredient = {
  name: string;
  image: string;
};

/**
 * @typedef Props
 * @property {boolean} visible - Indique si le modal est visible
 * @property {Ingredient[]} ingredientList - Liste des ingrédients disponibles avec leurs images
 * @property {string[]} selected - Liste actuelle des ingrédients sélectionnés
 * @property {() => void} onClose - Fonction appelée à la fermeture du modal
 * @property {(selected: string[]) => void} onApply - Fonction appelée lors de l'application des sélections
 */
type Props = {
  visible: boolean;
  ingredientList: Ingredient[];
  selected: string[];
  onClose: () => void;
  onApply: (selected: string[]) => void;
};

/**
 * @function IngredientSelectorModal
 * @param {Props} props - Propriétés du composant
 * @returns {JSX.Element} Modal de sélection d'ingrédients
 */
export default function IngredientSelectorModal({
  visible,
  ingredientList,
  selected,
  onClose,
  onApply,
}: Props) {
  /** État temporaire qui stocke la sélection courante tant qu'on n'a pas cliqué sur "Appliquer" */
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  /**
   * Met à jour la sélection temporaire UNIQUEMENT lors de l'ouverture du modal
   */
  useEffect(() => {
    if (visible) {
      setTempSelected(selected);
    }
  }, [visible]);

  /**
   * Ajoute ou retire un ingrédient de la sélection temporaire
   * @param {string} name - Nom de l'ingrédient à basculer
   */
  const toggle = (name: string) => {
    setTempSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  /**
   * Applique la sélection temporaire au parent
   */
  const handleApply = () => {
    onApply(tempSelected);
    onClose();
  };

  /**
   * Annule la sélection temporaire et ferme le modal
   */
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Sélectionner les ingrédients</Text>
            <Pressable onPress={() => setTempSelected([])} style={styles.clearButton}>
              <Text style={styles.clearText}>Vider</Text>
            </Pressable>
          </View>


          <ScrollView>
            {ingredientList.map((item) => (
              <Pressable
                key={item.name}
                style={styles.item}
                onPress={() => toggle(item.name)}
              >
                <Image source={{ uri: item.image }} style={styles.icon} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.check}>
                  {tempSelected.includes(item.name) ? '✅' : ''}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Pressable style={styles.applyBtn} onPress={handleApply}>
            <Text style={styles.applyText}>✅ Appliquer</Text>
          </Pressable>

          <Pressable style={[styles.applyBtn, { backgroundColor: '#ccc' }]} onPress={handleCancel}>
            <Text style={[styles.applyText, { color: '#333' }]}>Annuler</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

//-----------------------------------------------------------------------//
//                                STYLE                                  //
//-----------------------------------------------------------------------//
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    maxHeight: '85%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  check: {
    fontSize: 18,
  },
  applyBtn: {
    marginTop: 20,
    backgroundColor: '#d84315',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
},
clearButton: {
  paddingHorizontal: 10,
  paddingVertical: 4,
  backgroundColor: '#eee',
  borderRadius: 6,
},
clearText: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#444',
},

});
