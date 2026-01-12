/**
 * Fichier : index.tsx
 * Date : 2025-07-15
 * Titre : Écran d’accueil principal de l’application GetCookin!
 *
 * Description :
 * Page d’accueil de l’application GetCookin!.
 * - Gère la recherche avec debounce.
 * - Permet l’application de filtres avancés (ingrédients inclus/exclus, tags inclus/exclus).
 * - Affiche les résultats sous forme de cartes animées.
 * - Propose une suggestion intelligente si aucun résultat n’est trouvé.
 */

import { StyleSheet, Pressable, FlatList } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import stringSimilarity from 'string-similarity';
import React from 'react';

import SearchBar from '@/components/SearchBar';
import TagLegendModal from '@/components/TagLegendModal';
import { getUserIngredients } from '@/services/ingredientService';
import AnimatedIngredientCard from '@/components/AnimatedIngredientCard';
import { Text, View } from '@/components/Themed';
import FilterSelectorModal, { FilterValues } from '@/components/FilterSelectorModal';

export default function HomeScreen() {

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);


  const [ingredients, setIngredients] = useState<
    { id: string; name: string; image: string; tags: string[]; category: string; }[]
  >([]);


  const [isLegendVisible, setIsLegendVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  const [filters, setFilters] = useState<FilterValues>({
    includeIngredients: [],
    excludeIngredients: [],
    includeTags: [],
    excludeTags: [],
    categories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserIngredients();
      setIngredients(data);
    };
    fetchData();
  }, []);

  const filteredIngredients = ingredients.filter((item) => {
    const query = debouncedQuery.toLowerCase();

    const matchesSearch =
      query.length === 0 || item.name.toLowerCase().includes(query);

    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(item.category);

    const matchesIncludeIngredients =
      filters.includeIngredients.length === 0 ||
      filters.includeIngredients.every((inc) =>
        item.name.toLowerCase().includes(inc.toLowerCase())
      );

    const matchesExcludeIngredients =
      filters.excludeIngredients.length === 0 ||
      !filters.excludeIngredients.some((exc) =>
        item.name.toLowerCase().includes(exc.toLowerCase())
      );

    const matchesIncludeTags =
      filters.includeTags.length === 0 ||
      filters.includeTags.every((tag) => item.tags.includes(tag));


    const matchesExcludeTags =
      filters.excludeTags.length === 0 ||
      !filters.excludeTags.some((tag) => item.tags.includes(tag));

    return (
      matchesSearch &&
      matchesIncludeIngredients &&
      matchesExcludeIngredients &&
      matchesIncludeTags &&
      matchesExcludeTags &&
      matchesCategory
    );
  });

  let suggestion: string | null = null;
  if (filteredIngredients.length === 0 && searchQuery.length > 1) {
    const names = ingredients.map((i) => i.name);
    const match = stringSimilarity.findBestMatch(searchQuery, names);
    if (match.bestMatch.rating > 0.3) {
      suggestion = match.bestMatch.target;
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🍳 Bienvenue sur <Text style={{ color: '#d84315' }}>GetCookin!</Text>
      </Text>


      <Pressable style={styles.tagButton} onPress={() => setIsLegendVisible(true)}>
        <Text style={{ fontWeight: 'bold' }}>?</Text>
      </Pressable>


      <SearchBar
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          if (typingTimeout.current) clearTimeout(typingTimeout.current);
          typingTimeout.current = setTimeout(() => {
            setDebouncedQuery(text);
          }, 400);
        }}
        onFilterPress={() => setIsFilterOpen(true)}
      />

      <FilterSelectorModal
        visible={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(selectedFilters) => setFilters(selectedFilters)}
      />

      <TagLegendModal
        visible={isLegendVisible}
        onClose={() => setIsLegendVisible(false)}
      />

      <FlatList
        data={filteredIngredients}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-evenly', marginBottom: 12 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        initialNumToRender={6}       
        windowSize={5}                
        removeClippedSubviews={true}   
        renderItem={({ item, index }) => (
          <AnimatedIngredientCard
            key={item.id}
            index={index}
            name={item.name}
            image={item.image}
            tags={item.tags}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.noResult}>
            Aucun ingrédient trouvé.
            {suggestion && `\nVouliez-vous dire : ${suggestion} ?`}
          </Text>
        }
      />
    </View>
  );
}




//-----------------------------------------------------------------------//
//                               STYLE                                   //
//-----------------------------------------------------------------------//


const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#d1f5d3',
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplayBlack',  
    color: '#2e7d32',           
    textAlign: 'center',
    marginBottom: 16,
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  tagButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

});
