/**
 * tagData.ts
 * Date: 2025-07-29
 * Rôle: Définit la liste des tags disponibles (labels + icônes) et génère automatiquement le type TagKey
 */

export const tagData = {
  nuts: {
    label: 'Contient des noix',
    icon: require('@/assets/icons/Nuts.png'),
  },
  creamy: {
    label: 'Crémeux',
    icon: require('@/assets/icons/Creamy.png'),
  },
  dry: {
    label: 'Sec',
    icon: require('@/assets/icons/Dry.png'),
  },
  seed: {
    label: 'Graines/noyaux',
    icon: require('@/assets/icons/Seed.png'),
  },
  acidic: {
    label: 'Acide',
    icon: require('@/assets/icons/Acidic.png'),
  },
  gluten: {
    label: 'Contient du gluten',
    icon: require('@/assets/icons/Gluten.png'),
  },
  cheese: {
    label: 'Fromage',
    icon: require('@/assets/icons/Cheese.png'),
  },
  warm: {
    label: 'Se consomme chaud',
    icon: require('@/assets/icons/Warm.png'),
  },
  mild: {
    label: 'Doux',
    icon: require('@/assets/icons/Mild.png'),
  },
  aroma: {
    label: 'Arôme ou odeur distincte',
    icon: require('@/assets/icons/Aroma.png'),
  },
  sweet: {
    label: 'Sucré',
    icon: require('@/assets/icons/Sweet.png'),
  },
  hot: {
    label: 'Piquant',
    icon: require('@/assets/icons/Hot.png'),
  },
  bean: {
    label: 'Légumineuse',
    icon: require('@/assets/icons/Bean.png'),
  },
  redmeat: {
    label: 'Viande rouge',
    icon: require('@/assets/icons/RedMeat.png'),
  },
  bitter: {
    label: 'Amer',
    icon: require('@/assets/icons/Bitter.png'),
  },
  whitemeat: {
    label: 'Viande blanche',
    icon: require('@/assets/icons/WhiteMeat.png'),
  },
  fish: {
    label: 'Poisson',
    icon: require('@/assets/icons/Fish.png'),
  },
  seafood: {
    label: 'Fruit de mer',
    icon: require('@/assets/icons/Seafood.png'),
  },
  cold: {
    label: 'Se consomme froid',
    icon: require('@/assets/icons/Cold.png'),
  },
  moist: {
    label: 'Texture humide',
    icon: require('@/assets/icons/Moist.png'),
  },
  healthy: {
    label: 'Bon pour la santé',
    icon: require('@/assets/icons/Healthy.png'),
  },
  vegetarian: {
    label: 'Végétarien',
    icon: require('@/assets/icons/Vegetarian.png'),
  },
  juicy: {
    label: 'Juteux',
    icon: require('@/assets/icons/Juicy.png'),
  },
  fruit: {
    label: 'Fruit',
    icon: require('@/assets/icons/Fruit.png'),
  },
  herb: {
    label: 'Herbes/aromates',
    icon: require('@/assets/icons/Herb.png'),
  },
  vegetable: {
    label: 'Légume',
    icon: require('@/assets/icons/Vegetable.png'),
  },
  vegan: {
    label: 'Végétalien',
    icon: require('@/assets/icons/Vegan.png'),
  },
  unhealthy: {
    label: 'Moins bon pour la santé',
    icon: require('@/assets/icons/Unhealthy.png'),
  },
    spice: {
    label: 'Épices/assaisonnement',
    icon: require('@/assets/icons/Spice.png'),
  },
  hard: {
    label: 'Dur',
    icon: require('@/assets/icons/Hard.png'),
  },
  salty: {
    label: 'Salé',
    icon: require('@/assets/icons/Salty.png'),
  },
  dairy: {
    label: 'Produit laitier',
    icon: require('@/assets/icons/Dairy.png'),
  },
  soft: {
    label: 'Texture molle',
    icon: require('@/assets/icons/Soft.png'),
  },
  soup: {
    label: 'Soupe',
    icon: require('@/assets/icons/Soup.png'),
  },
  salad: {
    label: 'Salade',
    icon: require('@/assets/icons/Salad.png'),
  },
  pasta: {
    label: 'Pâtes',
    icon: require('@/assets/icons/Pasta.png'),
  },
  bread: {
    label: 'Pain',
    icon: require('@/assets/icons/Bread.png'),
  },
  sandwich: {
    label: 'Sandwich',
    icon: require('@/assets/icons/Sandwich.png'),
  },



} as const;

/**
 * Type automatiquement généré à partir des clés de tagData
 * Avantage: plus besoin de maintenir manuellement la liste des TagKey
 */
export type TagKey = keyof typeof tagData;
