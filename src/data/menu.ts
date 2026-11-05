export interface MenuItem {
  code: string;
  name: string;
  japaneseName?: string;
  category: 'lamen' | 'porcoes' | 'pratos-quentes';
  categoryLabel: string;
  price: number; // in BRL
  description: string;
  image?: string;
  portionNote?: string;
  fillings?: { name: string; code: string }[];
}

export const CATEGORIES = [
  { id: 'todos', label: 'Todos os Pratos' },
  { id: 'lamen', label: 'Lámen' },
  { id: 'porcoes', label: 'Porções e Entradas' },
  { id: 'pratos-quentes', label: 'Pratos Quentes' }
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // --- LÁMEN (Destaque Principal) ---
  {
    code: '250',
    name: 'Shoyu Lámen',
    japaneseName: '醤油ラーメン',
    category: 'lamen',
    categoryLabel: 'Lámen',
    price: 60.00,
    description: 'Caldo de frango com molho de soja. Mais suave.'
  },
  {
    code: '251',
    name: 'Missô Lámen',
    japaneseName: '味噌ラーメン',
    category: 'lamen',
    categoryLabel: 'Lámen',
    price: 62.00,
    description: 'Caldo de porco com pasta de soja fermentada. Mais encorpado.'
  },
  {
    code: '252',
    name: 'Karamissô Lámen',
    japaneseName: '辛味噌ラーメン',
    category: 'lamen',
    categoryLabel: 'Lámen',
    price: 64.00,
    description: 'Caldo de porco com pimenta. Encorpado e mais picante.'
  },
  {
    code: '350',
    name: 'Karê Lámen',
    japaneseName: 'カレーラーメン',
    category: 'lamen',
    categoryLabel: 'Lámen',
    price: 64.00,
    description: 'Caldo de porco com curry japonês e tonkatsu (lombo empanado). Encorpado e mais condimentado.'
  },

  // --- PORÇÕES E ENTRADAS ---
  {
    code: '109',
    name: 'Otoshi',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 26.00,
    description: 'Porção de três conservas.'
  },
  {
    code: '200',
    name: 'Guioza Suíno com Nirá',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 36.00,
    description: 'Guioza frito de carne suína com nirá.',
    portionNote: '6 unidades · Frito'
  },
  {
    code: '201',
    name: 'Guioza de Legumes',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 34.00,
    description: 'Guioza frito de legumes.',
    portionNote: '6 unidades · Frito'
  },
  {
    code: '208',
    name: 'Edamame',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 26.00,
    description: 'Vagem de soja no vapor.'
  },
  {
    code: '209',
    name: 'Spicy Edamame',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 32.00,
    description: 'Soja apimentada.'
  },
  {
    code: '224',
    name: 'Nattô',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 30.00,
    description: 'Soja fermentada.'
  },
  {
    code: '215',
    name: 'Nassu no Missô',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 30.00,
    description: 'Berinjela com katsuobushi.'
  },
  {
    code: '227',
    name: 'Bêkon',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 42.00,
    description: 'Torresmo carnudo com molho de missô.'
  },
  {
    code: '205',
    name: 'Onigiri',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 18.00,
    description: 'Bolinho de arroz cozido, com opções de recheio.',
    portionNote: '1 unidade',
    fillings: [
      { code: '235', name: 'Porco' },
      { code: '238', name: 'Atum com Maionese' },
      { code: '236', name: 'Umeboshi (Conserva japonesa de ameixa)' },
      { code: '237', name: 'Cogumelo' },
      { code: '205', name: 'Sem recheio' }
    ]
  },
  {
    code: '204',
    name: 'Missoshiro',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 17.00,
    description: 'Sopa de soja.'
  },
  {
    code: '222',
    name: 'Shiro Gohan',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 17.00,
    description: 'Arroz japonês cozido.'
  },
  {
    code: '211',
    name: 'Karaage',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 40.00,
    description: 'Sobrecoxa de frango frita.',
    portionNote: 'Porção de 200g'
  },
  {
    code: '229',
    name: 'Piri Kara Karaage',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 42.00,
    description: 'Frango frito picante.'
  },
  {
    code: '231',
    name: 'Tebasaki',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 38.00,
    description: 'Meio da asa de frango com tarê.',
    portionNote: '6 unidades'
  },
  {
    code: '228',
    name: 'Piri Kara Tebasaki',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 44.00,
    description: 'Meio da asa de frango picante.'
  },
  {
    code: '214',
    name: 'Rebá Nirá',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 32.00,
    description: 'Fígado de frango com nirá.'
  },
  {
    code: '212',
    name: 'Ebi Furai',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 85.00,
    description: 'Camarão-rosa crocante.'
  },
  {
    code: '213',
    name: 'Ebi Tempurá',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 85.00,
    description: 'Camarão-rosa empanado.'
  },
  {
    code: '220',
    name: 'Ebi Mayô',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 87.00,
    description: 'Camarão empanado com maionese e ovas tobiko.'
  },
  {
    code: '242',
    name: 'Tempurá Misto',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 83.00,
    description: 'Camarão e legumes empanados em massa leve.'
  },
  {
    code: '206',
    name: 'Shiitake',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 40.00,
    description: 'Cogumelo shiitake com creme e farofa de alho.'
  },
  {
    code: '207',
    name: 'Shimeji',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 40.00,
    description: 'Cogumelo shimeji com creme e farofa de alho.'
  },
  {
    code: '226',
    name: 'Ebi to Shiitake',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 60.00,
    description: 'Cogumelo shiitake cremoso com camarão.'
  },
  {
    code: '225',
    name: 'Ebi to Shimeji',
    category: 'porcoes',
    categoryLabel: 'Porções e Entradas',
    price: 60.00,
    description: 'Cogumelo shimeji cremoso com camarão.'
  },

  // --- PRATOS QUENTES & REFEIÇÕES ---
  {
    code: '243',
    name: 'Chiri Karê Potato',
    category: 'pratos-quentes',
    categoryLabel: 'Pratos Quentes',
    price: 40.00,
    description: 'Batata frita com chilli de carne bovina, feijão vermelho, curry japonês e mix de queijos.'
  },
  {
    code: '216',
    name: 'Tonkatsu',
    category: 'pratos-quentes',
    categoryLabel: 'Pratos Quentes',
    price: 53.00,
    description: 'Lombo suíno empanado em panko, servido com salada de repolho e tomate.'
  },
  {
    code: '233',
    name: 'Butá Bará',
    category: 'pratos-quentes',
    categoryLabel: 'Pratos Quentes',
    price: 52.00,
    description: 'Pancetta assada glaceada no shoyu doce, com gohan, alface, alga nori e conserva de cebola roxa.'
  },
  {
    code: '262',
    name: 'Yakiniku',
    category: 'pratos-quentes',
    categoryLabel: 'Pratos Quentes',
    price: 60.00,
    description: 'Carne bovina grelhada, servida com salada, farofinha de alho e molho especial.'
  }
];

const RAMEN_PROFILES: Record<string, { flavorTag: string; flavorType: string }> = {
  '250': { flavorTag: 'Mais Suave', flavorType: 'mild' },
  '251': { flavorTag: 'Mais Encorpado', flavorType: 'rich' },
  '252': { flavorTag: 'Mais Picante', flavorType: 'spicy' },
  '350': { flavorTag: 'Mais Condimentado', flavorType: 'curry' }
};

export const RAMEN_DETAILS = MENU_ITEMS.filter((item) => item.category === 'lamen')
  .map((item) => ({ ...item, ...RAMEN_PROFILES[item.code] }));
