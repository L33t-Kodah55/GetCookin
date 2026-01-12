/**
 * Fichier : TagSelectorModal.tsx
 * Date : 2025-07-30
 * Titre : Sélecteur visuel de tags
 * Description : Modal permettant de sélectionner plusieurs tags. 
 *               Les changements ne sont appliqués qu’en cliquant sur "Appliquer".
 */

import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { tagData, TagKey } from '@/data/tagData';

type Props = {
    visible: boolean;
    selectedTags: string[];
    onClose: () => void;
    onApply: (tags: string[]) => void;
};

export default function TagSelectorModal({ visible, selectedTags, onClose, onApply }: Props) {
    const [tempSelected, setTempSelected] = useState<string[]>([]);

    useEffect(() => {
        if (visible) {
            setTempSelected(selectedTags);
        }
    }, [visible]);

  
    const toggleTag = (tag: string) => {
        setTempSelected((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleApply = () => {
        onApply(tempSelected);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.overlay}>
      <View style={styles.container}>


        <View style={styles.headerRow}>
          <Text style={styles.title}>Sélectionner les tags</Text>
          <Pressable onPress={() => setTempSelected([])} style={styles.clearButton}>
            <Text style={styles.clearText}>Vider</Text>
          </Pressable>
        </View>

        <ScrollView style={{ maxHeight: 400 }}>
          {Object.entries(tagData).map(([tag, { label, icon }]) => (
            <Pressable key={tag} style={styles.item} onPress={() => toggleTag(tag)}>
              <Image source={icon} style={styles.icon} />
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.check}>{tempSelected.includes(tag) ? '✅' : ''}</Text>
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

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        width: '85%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
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
    },
    label: {
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
