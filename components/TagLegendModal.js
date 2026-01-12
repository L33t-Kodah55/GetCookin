// TagLegendModal.js
import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { tagData } from '@/data/tagData'

export default function TagLegendModal({ visible, onClose }) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Légende des tags</Text>

          <ScrollView style={styles.scroll}>
            {Object.entries(tagData).map(([tag, { label, icon }]) => (
            <View key={tag} style={styles.item}>
             <Image source={icon} style={styles.icon} resizeMode="contain" />
              <Text style={styles.desc}>{label}</Text>
           </View>
          ))}
          </ScrollView>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Fermer</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    width: '85%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scroll: {
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  desc: {
    fontSize: 16,
    flex: 1,
    color: '#333',
    marginRight: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  closeButton: {
    backgroundColor: '#eee',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  closeText: {
    fontWeight: 'bold',
  },
  icon: {
  width: 32,
  height: 32,
  marginRight: 10, // ajoute un petit espace entre l’icône et le texte
},

});