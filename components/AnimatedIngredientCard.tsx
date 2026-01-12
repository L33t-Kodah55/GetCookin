import { Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import IngredientCard from './IngredientCard';
import { tagData } from '@/data/tagData';


/**
 * Props attendues pour le composant AnimatedIngredientCard.
 *
 * @property name - Nom de l'ingrédient
 * @property image - URL de l'image de l'ingrédient
 * @property tags - Liste de tags associés
 * @property index - Index de la carte dans la liste (sert à échelonner l'animation)
 */
type Props = {
  name: string;
  image: string;
  tags: string[];
  index: number;
};

/**
 * Composant visuel représentant une carte d'ingrédient avec animation.
 *
 * Ce composant applique un effet d'apparition progressif (`fadeIn`) combiné à un glissement léger vers le haut (`translateY`)
 * lorsque chaque carte est affichée. L'effet est légèrement décalé selon l'index pour une transition plus fluide.
 *
 * @param name - Nom de l'ingrédient à afficher
 * @param image - Image de l'ingrédient (URL)
 * @param tags - Mots-clés/tags associés à l'ingrédient
 * @param index - Position dans la liste, utilisé pour l'effet en cascade
 * @returns Un composant animé contenant une `IngredientCard`
 */
export default function AnimatedIngredientCard({ name, image, tags, index }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        delay: index * 50, 
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
     
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        delay: index * 50,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
      <IngredientCard name={name} image={image} tags={tags} />
    </Animated.View>
  );
}
