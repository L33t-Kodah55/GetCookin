import localIngredients from '@/data/localIngredients';

export const getUserIngredients = async () => {
  // plus tard tu feras ici : Firebase → fetch les ingrédients de l'utilisateur
  return localIngredients;
};
