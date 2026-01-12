/**
 * localIngredients.ts
 * Date: 2025-07-29
 * Rôle: Liste locale d'ingrédients avec IDs stables (slugs)
 * Les IDs ne dépendent plus de l'ordre → évite les problèmes lors de réorganisation.
 */

const localIngredients = [
  {

    // ---------------------------------------------------------------------- // 
    // ------------------------      INGREDIENTS       ---------------------- //
    // ---------------------------------------------------------------------- // 
    
    id: 'tomato',
    name: 'Tomate',
    image: 'https://i.postimg.cc/k5tvZWNp/TOMATO-img.png',
    tags: ['fruit', 'juicy', 'seed', 'mild', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'chicken_breast',
    name: 'Poitrine de poulet',
    image: 'https://i.postimg.cc/HnChcDHb/POITRINE-DE-POULET.png',
    tags: ['whitemeat', 'dry', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'avocado',
    name: 'Avocat',
    image: 'https://i.postimg.cc/Kz6Rpsr1/AVOCADO.png',
    tags: ['fruit', 'seed', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'salmon',
    name: 'Saumon',
    image: 'https://i.postimg.cc/RZ8GJ5Lq/SALMON.png',
    tags: ['fish', 'moist', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'basil',
    name: 'Basilic',
    image: 'https://i.postimg.cc/xCHD0sMD/BASILIC.png',
    tags: ['herb', 'aroma', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'lemon',
    name: 'Citron',
    image: 'https://i.postimg.cc/tRF0VmfY/LEMON.png',
    tags: ['fruit', 'juicy', 'acidic', 'healthy', 'seed'],
    category: 'ingredient',
  },
  {
    id: 'orange',
    name: 'Orange',
    image: 'https://i.postimg.cc/wBKfj42s/ORANGE.png',
    tags: ['fruit', 'juicy', 'acidic', 'sweet', 'healthy', 'seed'],
    category: 'ingredient',
  },
  {
    id: 'lime',
    name: 'Lime',
    image: 'https://i.postimg.cc/jdxCGsrD/LIME.png',
    tags: ['fruit', 'juicy', 'acidic', 'healthy', 'seed'],
    category: 'ingredient',
  },
  {
    id: 'mozzarella',
    name: 'Mozzarella',
    image: 'https://i.postimg.cc/KvbFYy09/MOZZARELLA.png',
    tags: ['cheese', 'dairy', 'salty', 'soft'],
    category: 'ingredient',
  },
  {
    id: 'carrot',
    name: 'Carotte',
    image: 'https://i.postimg.cc/8zwFtYpD/CARROT.png',
    tags: ['vegetable', 'hard', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'apple',
    name: 'Pomme',
    image: 'https://i.postimg.cc/jdMwh9dT/APPLE.png',
    tags: ['fruit', 'juicy', 'hard', 'sweet', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'banana',
    name: 'Banane',
    image: 'https://i.postimg.cc/SRWQHvg7/BANANA.png',
    tags: ['fruit', 'soft', 'sweet', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'greenbellpepper',
    name: 'Poivron Vert',
    image: 'https://i.postimg.cc/dVzCMzBg/POIVRON-VERT.png',
    tags: ['vegetable', 'mild', 'healthy'],
    category: 'ingredient',
  },

  {
    id: 'redbellpepper',
    name: 'Poivron Rouge',
    image: 'https://i.postimg.cc/R0ZD8pSr/POIVRON-ROUGE.png',
    tags: ['vegetable', 'mild', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'orangebellpepper',
    name: 'Poivron Orange',
    image: 'https://i.postimg.cc/jqpCSzNJ/POIVRON-ORANGE.png',
    tags: ['vegetable', 'mild', 'healthy'],
    category: 'ingredient',
  },
  {
    id: 'yellowbellpepper',
    name: 'Poivron Jaune',
    image: 'https://i.postimg.cc/TPdzxYc4/POIVRON-JAUNE.png',
    tags: ['vegetable', 'mild', 'healthy'],
    category: 'ingredient',
  },

    // ---------------------------------------------------------------------- // 
    // -----------------------        DISHES          ----------------------- //
    // ---------------------------------------------------------------------- // 

     {
    id: 'minestronesoup',
    name: 'Soupe Minestrone',
    image: 'https://i.postimg.cc/rpzLWwtt/SOUPE-MINESTRONE.png',
    tags: ['soup','salty','warm', 'vegetable', 'bean','herb', 'healthy', ],
    category: 'meal',
  },
       {
    id: 'shangainoodles',
    name: 'Nouilles sautées à la Shanghai',
    image: 'https://i.postimg.cc/5Nv54B7X/NOUILLES-SAUT-ES-A-LA-SHANGHAI.png',
    tags: ['pasta','salty','warm', 'vegetable','gluten','aroma','herb', ],
    category: 'meal',
  },


];

export default localIngredients;
