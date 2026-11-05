export const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'lamen', label: 'Lámen' },
  { id: 'porcoes', label: 'Porções' },
  { id: 'pratos-quentes', label: 'Pratos Quentes' }
];

export const MENU_ITEMS = [
  // --- LÁMEN ---
  {
    code: '250',
    name: 'Shoyu',
    category: 'lamen',
    price: 60.00,
    description: 'Caldo de frango com molho de soja. Mais suave.'
  },
  {
    code: '251',
    name: 'Missô',
    category: 'lamen',
    price: 62.00,
    description: 'Caldo de porco com pasta de soja fermentada. Mais encorpado.'
  },
  {
    code: '252',
    name: 'Karamissô',
    category: 'lamen',
    price: 64.00,
    description: 'Caldo de porco com pimenta. Encorpado e mais picante.'
  },
  {
    code: '350',
    name: 'Karê',
    category: 'lamen',
    price: 64.00,
    description: 'Caldo de porco com curry japonês e tonkatsu (lombo empanado). Encorpado e mais condimentado.'
  },

  // --- PORÇÕES E ENTRADAS ---
  {
    code: '109',
    name: 'Otoshi',
    category: 'porcoes',
    price: 26.00,
    description: 'Porção de 3 conservas.'
  },
  {
    code: '200',
    name: 'Guioza Suíno com Nirá',
    category: 'porcoes',
    price: 36.00,
    description: '6 unidades, fritas.'
  },
  {
    code: '201',
    name: 'Guioza de Legumes',
    category: 'porcoes',
    price: 34.00,
    description: '6 unidades, fritas.'
  },
  {
    code: '208',
    name: 'Edamame',
    category: 'porcoes',
    price: 26.00,
    description: 'Vagem de soja no vapor.'
  },
  {
    code: '209',
    name: 'Spicy Edamame',
    category: 'porcoes',
    price: 32.00,
    description: 'Soja apimentada.'
  },
  {
    code: '224',
    name: 'Nattô',
    category: 'porcoes',
    price: 30.00,
    description: 'Soja fermentada.'
  },
  {
    code: '215',
    name: 'Nassu no Missô',
    category: 'porcoes',
    price: 30.00,
    description: 'Berinjela, katsuobushi.'
  },
  {
    code: '227',
    name: 'Bêkon',
    category: 'porcoes',
    price: 42.00,
    description: 'Torresmo carnudo com molho de missô.'
  },
  {
    code: '205',
    name: 'Onigiri',
    category: 'porcoes',
    price: 18.00,
    description: 'Bolinho de arroz cozido, unidade.',
    fillings: [
      { code: '235', name: 'Porco' },
      { code: '238', name: 'Atum com maionese' },
      { code: '236', name: 'Umeboshi (Conserva japonesa de ameixa)' },
      { code: '237', name: 'Cogumelo' },
      { code: '205', name: 'Sem recheio' }
    ]
  },
  {
    code: '204',
    name: 'Missoshiro',
    category: 'porcoes',
    price: 17.00,
    description: 'Sopa de soja.'
  },
  {
    code: '222',
    name: 'Shiro Gohan',
    category: 'porcoes',
    price: 17.00,
    description: 'Arroz japonês cozido.'
  },
  {
    code: '211',
    name: 'Karaage',
    category: 'porcoes',
    price: 40.00,
    description: 'Sobrecoxa frita (200 g).'
  },
  {
    code: '229',
    name: 'Piri Kara Karaage',
    category: 'porcoes',
    price: 42.00,
    description: 'Frango frito picante.'
  },
  {
    code: '231',
    name: 'Tebasaki',
    category: 'porcoes',
    price: 38.00,
    description: 'Meio da asa com tarê, 6 unidades.'
  },
  {
    code: '228',
    name: 'Piri Kara Tebasaki',
    category: 'porcoes',
    price: 44.00,
    description: 'Meio da asa picante.'
  },
  {
    code: '214',
    name: 'Rebá Nirá',
    category: 'porcoes',
    price: 32.00,
    description: 'Fígado de frango com nirá.'
  },
  {
    code: '212',
    name: 'Ebi Furai',
    category: 'porcoes',
    price: 85.00,
    description: 'Camarão-rosa crocante.'
  },
  {
    code: '213',
    name: 'Ebi Tempurá',
    category: 'porcoes',
    price: 85.00,
    description: 'Camarão-rosa empanado.'
  },
  {
    code: '220',
    name: 'Ebi Mayô',
    category: 'porcoes',
    price: 87.00,
    description: 'Camarão empanado com maionese e ovas tobiko.'
  },
  {
    code: '242',
    name: 'Tempurá Misto',
    category: 'porcoes',
    price: 83.00,
    description: 'Camarão e legumes empanados em massa leve.'
  },
  {
    code: '206',
    name: 'Shiitake',
    category: 'porcoes',
    price: 40.00,
    description: 'Cogumelo com creme e farofa de alho.'
  },
  {
    code: '207',
    name: 'Shimeji',
    category: 'porcoes',
    price: 40.00,
    description: 'Cogumelo com creme e farofa de alho.'
  },
  {
    code: '226',
    name: 'Ebi to Shiitake',
    category: 'porcoes',
    price: 60.00,
    description: 'Cogumelo cremoso e camarão.'
  },
  {
    code: '225',
    name: 'Ebi to Shimeji',
    category: 'porcoes',
    price: 60.00,
    description: 'Cogumelo cremoso e camarão.'
  },

  // --- PRATOS QUENTES & REFEIÇÕES ---
  {
    code: '243',
    name: 'Chiri Karê Potato',
    category: 'pratos-quentes',
    price: 40.00,
    description: 'Batata frita, chilli de carne bovina, feijão vermelho, curry japonês e mix de queijos.'
  },
  {
    code: '216',
    name: 'Tonkatsu',
    category: 'pratos-quentes',
    price: 53.00,
    description: 'Lombo suíno empanado em panko, servido com salada de repolho e tomate.'
  },
  {
    code: '233',
    name: 'Butá Bará',
    category: 'pratos-quentes',
    price: 52.00,
    description: 'Pancetta assada glaceada no shoyu doce, com gohan, alface, alga nori e conserva de cebola roxa.'
  },
  {
    code: '262',
    name: 'Yakiniku',
    category: 'pratos-quentes',
    price: 60.00,
    description: 'Carne bovina grelhada, servida com salada, farofinha de alho e molho especial.'
  }
];
