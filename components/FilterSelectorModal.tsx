/**
 * @file FilterSelectorModal.tsx
 * @date 2025-07-25
 * @title Composant de sélection des filtres pour les ingrédients et les tags
 * @description
 * Modal permettant de filtrer par inclusion/exclusion d’ingrédients et de tags.
 * - Les sélections ne sont appliquées qu’au clic sur "Appliquer".
 * - "Annuler" ferme sans sauvegarder.
 * - "Vider" réinitialise tous les filtres.
 */

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { tagData, TagKey } from '@/data/tagData';
import IngredientSelectorModal from './IngredientSelectorModal';
import TagSelectorModal from './TagSelectorModal';
import { getUserIngredients } from '@/services/ingredientService';

/** Structure des filtres */
export type FilterValues = {
    includeIngredients: string[];
    excludeIngredients: string[];
    includeTags: string[];
    excludeTags: string[];
    categories: string[];
};

type Props = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterValues) => void;
};

export default function FilterSelectorModal({ visible, onClose, onApply }: Props) {
    /** États principaux */
    const [filters, setFilters] = useState<FilterValues>({
        includeIngredients: [],
        excludeIngredients: [],
        includeTags: [],
        excludeTags: [],
        categories: [],
    });

    /** Gestion des sous-modaux */
    const [isIngredientSelectorVisible, setIsIngredientSelectorVisible] = useState(false);
    const [ingredientSelectorTarget, setIngredientSelectorTarget] = useState<'include' | 'exclude' | null>(null);

    const [isTagSelectorVisible, setIsTagSelectorVisible] = useState(false);
    const [tagSelectorTarget, setTagSelectorTarget] = useState<'include' | 'exclude' | null>(null);

    const [localIngredients, setLocalIngredients] = useState<
        { id: string; name: string; image: string; tags: string[] }[]
    >([]);

    useEffect(() => {
        const loadIngredients = async () => {
            const data = await getUserIngredients();
            setLocalIngredients(data);
        };
        loadIngredients();
    }, []);

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const handleClear = () => {
        const cleared: FilterValues = {
            includeIngredients: [],
            excludeIngredients: [],
            includeTags: [],
            excludeTags: [],
            categories: [],
        };
        setFilters(cleared);
        onApply(cleared);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.fullscreenOverlay}>
                <Pressable style={styles.dimBackground} onPress={onClose} />
                <View style={styles.modal}>
                    <ScrollView contentContainerStyle={styles.scroll}>

                        <View style={styles.titleRow}>
                            <Text style={styles.title}>🔍 Filtres avancés</Text>
                            <Pressable onPress={handleClear} style={styles.clearButton}>
                                <Text style={styles.clearButtonText}>Vider</Text>
                            </Pressable>
                        </View>



                        <Text style={styles.label}>Contient (ingrédients)</Text>
                        <Pressable
                            style={styles.tagButton}
                            onPress={() => {
                                setIngredientSelectorTarget('include');
                                setIsIngredientSelectorVisible(true);
                            }}
                        >
                            <View style={styles.iconRow}>
                                {filters.includeIngredients.length > 0 ? (
                                    filters.includeIngredients.map((name) => {
                                        const ing = localIngredients.find(i => i.name === name);
                                        return ing ? (
                                            <Image key={name} source={{ uri: ing.image }} style={styles.tinyImage} />
                                        ) : null;
                                    })
                                ) : (
                                    <Text style={styles.buttonLabel}>Choisir les ingrédients à inclure</Text>
                                )}
                            </View>
                        </Pressable>

                     
                        <Text style={styles.label}>Ne contient pas (ingrédients)</Text>
                        <Pressable
                            style={styles.tagButton}
                            onPress={() => {
                                setIngredientSelectorTarget('exclude');
                                setIsIngredientSelectorVisible(true);
                            }}
                        >
                            <View style={styles.iconRow}>
                                {filters.excludeIngredients.length > 0 ? (
                                    filters.excludeIngredients.map((name) => {
                                        const ing = localIngredients.find(i => i.name === name);
                                        return ing ? (
                                            <Image key={name} source={{ uri: ing.image }} style={styles.tinyImage} />
                                        ) : null;
                                    })
                                ) : (
                                    <Text style={styles.buttonLabel}>Choisir les ingrédients à exclure</Text>
                                )}
                            </View>
                        </Pressable>

                        <Text style={styles.label}>Est caractérisé par (tags)</Text>
                        <Pressable
                            style={styles.tagButton}
                            onPress={() => {
                                setTagSelectorTarget('include');
                                setIsTagSelectorVisible(true);
                            }}
                        >
                            <View style={styles.iconRow}>
                                {filters.includeTags.length > 0 ? (
                                    filters.includeTags.map((tag) => (
                                        <Image key={tag} source={tagData[tag as TagKey]?.icon} style={styles.tagIcon} />
                                    ))
                                ) : (
                                    <Text style={styles.buttonLabel}>Choisir les tags à inclure</Text>
                                )}
                            </View>
                        </Pressable>

                        <Text style={styles.label}>N'est pas caractérisé par (tags)</Text>
                        <Pressable
                            style={styles.tagButton}
                            onPress={() => {
                                setTagSelectorTarget('exclude');
                                setIsTagSelectorVisible(true);
                            }}
                        >
                            <View style={styles.iconRow}>
                                {filters.excludeTags.length > 0 ? (
                                    filters.excludeTags.map((tag) => (
                                        <Image key={tag} source={tagData[tag as TagKey]?.icon} style={styles.tagIcon} />
                                    ))
                                ) : (
                                    <Text style={styles.buttonLabel}>Choisir les tags à exclure</Text>
                                )}
                            </View>
                        </Pressable>


                        <Text style={styles.label}>Type d’aliment</Text>
                        <View style={styles.iconRow}>
                            {['ingredient', 'meal', 'beverage', 'dessert'].map((cat) => (
                                <Pressable
                                    key={cat}
                                    style={[
                                        styles.categoryButton,
                                        filters.categories.includes(cat) && styles.categoryButtonActive
                                    ]}
                                    onPress={() => {
                                        setFilters((prev) => ({
                                            ...prev,
                                            categories: prev.categories.includes(cat)
                                                ? prev.categories.filter((c) => c !== cat)
                                                : [...prev.categories, cat], 
                                        }));
                                    }}
                                >
                                    <Text style={styles.categoryText}>
                                        {cat === 'ingredient' && '🥦 Ingrédients'}
                                        {cat === 'meal' && '🍲 Mets'}
                                        {cat === 'beverage' && '🥤 Boissons'}
                                        {cat === 'dessert' && '🍰 Desserts'}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>


                        <Pressable style={styles.button} onPress={handleApply}>
                            <Text style={styles.buttonText}>✅ Appliquer les filtres</Text>
                        </Pressable>

                        <Pressable style={[styles.button, { backgroundColor: '#ddd' }]} onPress={onClose}>
                            <Text style={[styles.buttonText, { color: '#333' }]}>Annuler</Text>
                        </Pressable>
                    </ScrollView>
                </View>

                <IngredientSelectorModal
                    visible={isIngredientSelectorVisible}
                    ingredientList={localIngredients}
                    selected={ingredientSelectorTarget === 'include' ? filters.includeIngredients : filters.excludeIngredients}
                    onClose={() => setIsIngredientSelectorVisible(false)}
                    onApply={(selected) => {
                        setFilters((prev) => ({
                            ...prev,
                            [ingredientSelectorTarget === 'include' ? 'includeIngredients' : 'excludeIngredients']: selected,
                        }));
                        setIsIngredientSelectorVisible(false);
                    }}
                />

                <TagSelectorModal
                    visible={isTagSelectorVisible}
                    selectedTags={tagSelectorTarget === 'include' ? filters.includeTags : filters.excludeTags}
                    onClose={() => setIsTagSelectorVisible(false)}
                    onApply={(selected) => {
                        setFilters((prev) => ({
                            ...prev,
                            [tagSelectorTarget === 'include' ? 'includeTags' : 'excludeTags']: selected,
                        }));
                        setIsTagSelectorVisible(false);
                    }}
                />
            </View>
        </Modal>
    );
}





//-----------------------------------------------------------------------//
//                             STYLE                                     //
//-----------------------------------------------------------------------//


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: '90%',
    },
    scroll: {
        paddingBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    label: {
        marginTop: 12,
        marginBottom: 4,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 8,
        marginBottom: 8,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#d84315',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    fullscreenOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    dimBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    tagButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        backgroundColor: '#f5f5f5',
    },
    buttonLabel: {
        color: '#333',
    },
    iconRow: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    tagIcon: {
        width: 28,
        height: 28,
    },
    tinyImage: {
        width: 26,
        height: 26,
        borderRadius: 6,
    },
    clearButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#eee',
        borderRadius: 6,
        marginBottom: 20,
        alignSelf: 'flex-end',
    },
    clearButtonText: {
        fontSize: 14,
        color: '#444',
        fontWeight: 'bold',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    categoryButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#f5f5f5',
    },
    categoryButtonActive: {
        backgroundColor: '#d84315',
        borderColor: '#d84315',
    },
    categoryText: {
        color: '#333',
        fontWeight: '600',
    },





});