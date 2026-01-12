import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { tagData, TagKey } from '@/data/tagData';
import { Image } from 'expo-image';

/**
 * Propriétés attendues par le composant IngredientCard.
 *
 * @property name - Nom de l'ingrédient
 * @property image - URL de l'image associée à l'ingrédient
 * @property tags - (Optionnel) Tableau de mots-clés ou catégories
 */
type IngredientCardProps = {
  name: string;
  image: string;
  tags?: string[];
};

/**
 * Composant visuel représentant une carte d'ingrédient.
 *
 * Optimisé pour de meilleures performances :
 * - Utilisation de `expo-image` avec cache disque pour accélérer le rendu.
 * - Gestion fluide des tags avec icônes locales.
 *
 * @param name - Nom de l'ingrédient à afficher
 * @param image - URL de l'image de l'ingrédient
 * @param tags - (Facultatif) Tags décrivant l'ingrédient
 * @returns Un bloc visuel stylisé représentant un ingrédient
 */
export default function IngredientCard({ name, image, tags = [] }: IngredientCardProps) {
  return (
    <View style={styles.card}>
    
      <Image
        source={{ uri: image }}
        style={styles.image}
        contentFit="cover"
        cachePolicy="disk"
      />

  
      <Text style={styles.name}>{name}</Text>

    
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => {
          const icon = tagData[tag as TagKey]?.icon;
          return (
            <View key={index} style={styles.tag}>
              {icon ? (
                <Image
                  source={icon}
                  style={styles.tagIcon}
                  contentFit="contain"
                  cachePolicy="memory" 
                />
              ) : (
                <Text style={styles.tagText}>#{tag}</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

//-----------------------------------------------------------------------//
//                              STYLE                                    //
//-----------------------------------------------------------------------//

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    width: 140,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingTop: 6,
    textAlign: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingBottom: 6,
    gap: 4,
  },
  tag: {},
  tagText: {
    fontSize: 12,
    color: '#2e7d32',
  },
  tagIcon: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
});
