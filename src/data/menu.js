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
    image: 'images/pratos/250-shoyu.webp',
    price: 60.00,
    description: 'Caldo de frango com molho de soja. Mais suave.'
  },
  {
    code: '251',
    name: 'Missô',
    category: 'lamen',
    image: 'images/pratos/251-misso.webp',
    price: 62.00,
    description: 'Caldo de porco com pasta de soja fermentada. Mais encorpado.'
  },
  {
    code: '252',
    name: 'Karamissô',
    category: 'lamen',
    image: 'images/pratos/252-karamisso.webp',
    price: 64.00,
    description: 'Caldo de porco com pimenta. Encorpado e mais picante.'
  },
  {
    code: '350',
    name: 'Karê',
    category: 'lamen',
    image: 'images/pratos/350-kare.webp',
    price: 64.00,
    description: 'Caldo de porco com curry japonês e tonkatsu (lombo empanado). Encorpado e mais condimentado.'
  },

  // --- PORÇÕES E ENTRADAS ---
  {
    code: '109',
    name: 'Otoshi',
    category: 'porcoes',
    image: 'images/pratos/109-otoshi.webp',
    price: 26.00,
    description: 'Porção de 3 conservas.'
  },
  {
    code: '200',
    name: 'Guioza Suíno com Nirá',
    category: 'porcoes',
    image: 'images/pratos/200-guioza-suino-nira.webp',
    price: 36.00,
    description: '6 unidades, fritas.'
  },
  {
    code: '201',
    name: 'Guioza de Legumes',
    category: 'porcoes',
    image: 'images/pratos/201-guioza-legumes.webp',
    price: 34.00,
    description: '6 unidades, fritas.'
  },
  {
    code: '208',
    name: 'Edamame',
    category: 'porcoes',
    image: 'images/pratos/208-edamame.webp',
    price: 26.00,
    description: 'Vagem de soja no vapor.'
  },
  {
    code: '209',
    name: 'Spicy Edamame',
    category: 'porcoes',
    image: 'images/pratos/209-spicy-edamame.webp',
    price: 32.00,
    description: 'Soja apimentada.'
  },
  {
    code: '224',
    name: 'Nattô',
    category: 'porcoes',
    image: 'images/pratos/224-natto.webp',
    price: 30.00,
    description: 'Soja fermentada.'
  },
  {
    code: '215',
    name: 'Nassu no Missô',
    category: 'porcoes',
    image: 'images/pratos/215-nassu-no-misso.webp',
    price: 30.00,
    description: 'Berinjela, katsuobushi.'
  },
  {
    code: '227',
    name: 'Bêkon',
    category: 'porcoes',
    image: 'images/pratos/227-bekon.webp',
    price: 42.00,
    description: 'Torresmo carnudo com molho de missô.'
  },
  {
    code: '205',
    name: 'Onigiri',
    category: 'porcoes',
    image: 'images/pratos/205-onigiri.webp',
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
    image: 'images/pratos/204-missoshiro.webp',
    price: 17.00,
    description: 'Sopa de soja.'
  },
  {
    code: '222',
    name: 'Shiro Gohan',
    category: 'porcoes',
    image: 'images/pratos/222-shiro-gohan.webp',
    price: 17.00,
    description: 'Arroz japonês cozido.'
  },
  {
    code: '211',
    name: 'Karaage',
    category: 'porcoes',
    image: 'images/pratos/211-karaage.webp',
    price: 40.00,
    description: 'Sobrecoxa frita (200 g).'
  },
  {
    code: '229',
    name: 'Piri Kara Karaage',
    category: 'porcoes',
    image: 'images/pratos/229-piri-kara-karaage.webp',
    price: 42.00,
    description: 'Frango frito picante.'
  },
  {
    code: '231',
    name: 'Tebasaki',
    category: 'porcoes',
    image: 'images/pratos/231-tebasaki.webp',
    price: 38.00,
    description: 'Meio da asa com tarê, 6 unidades.'
  },
  {
    code: '228',
    name: 'Piri Kara Tebasaki',
    category: 'porcoes',
    image: 'images/pratos/228-piri-kara-tebasaki.webp',
    price: 44.00,
    description: 'Meio da asa picante.'
  },
  {
    code: '214',
    name: 'Rebá Nirá',
    category: 'porcoes',
    image: 'images/pratos/214-reba-nira.webp',
    price: 32.00,
    description: 'Fígado de frango com nirá.'
  },
  {
    code: '212',
    name: 'Ebi Furai',
    category: 'porcoes',
    image: 'images/pratos/212-ebi-furai.webp',
    price: 85.00,
    description: 'Camarão-rosa crocante.'
  },
  {
    code: '213',
    name: 'Ebi Tempurá',
    category: 'porcoes',
    image: 'images/pratos/213-ebi-tempura.webp',
    price: 85.00,
    description: 'Camarão-rosa empanado.'
  },
  {
    code: '220',
    name: 'Ebi Mayô',
    category: 'porcoes',
    image: 'images/pratos/220-ebi-mayo.webp',
    price: 87.00,
    description: 'Camarão empanado com maionese e ovas tobiko.'
  },
  {
    code: '242',
    name: 'Tempurá Misto',
    category: 'porcoes',
    image: 'images/pratos/242-tempura-misto.webp',
    price: 83.00,
    description: 'Camarão e legumes empanados em massa leve.'
  },
  {
    code: '206',
    name: 'Shiitake',
    category: 'porcoes',
    image: 'images/pratos/206-shiitake.webp',
    price: 40.00,
    description: 'Cogumelo com creme e farofa de alho.'
  },
  {
    code: '207',
    name: 'Shimeji',
    category: 'porcoes',
    image: 'images/pratos/207-shimeji.webp',
    price: 40.00,
    description: 'Cogumelo com creme e farofa de alho.'
  },
  {
    code: '226',
    name: 'Ebi to Shiitake',
    category: 'porcoes',
    image: 'images/pratos/226-ebi-to-shiitake.webp',
    price: 60.00,
    description: 'Cogumelo cremoso e camarão.'
  },
  {
    code: '225',
    name: 'Ebi to Shimeji',
    category: 'porcoes',
    image: 'images/pratos/225-ebi-to-shimeji.webp',
    price: 60.00,
    description: 'Cogumelo cremoso e camarão.'
  },

  // --- PRATOS QUENTES & REFEIÇÕES ---
  {
    code: '243',
    name: 'Chiri Karê Potato',
    category: 'pratos-quentes',
    image: 'images/pratos/243-chiri-kare-potato.webp',
    description: 'Batata frita, chili de carne bovina, feijão vermelho, curry japonês e mix de queijos.',
    price: 40
  },
  {
    code: '216',
    name: 'Tonkatsu',
    category: 'pratos-quentes',
    image: 'images/pratos/216-tonkatsu.webp',
    description: 'Lombo suíno empanado em panko, servido com salada de repolho e tomate.',
    price: 53
  },
  {
    code: '233',
    name: 'Butá Bará',
    category: 'pratos-quentes',
    image: 'images/pratos/233-buta-bara.webp',
    description: 'Panceta assada glaceada no shoyu doce, com gohan, alface, alga nori e conserva de cebola roxa.',
    price: 52
  },
  {
    code: '262',
    name: 'Yakiniku',
    category: 'pratos-quentes',
    image: 'images/pratos/262-yakiniku.webp',
    description: 'Carne bovina grelhada, servida com salada, farofinha de alho e molho especial.',
    price: 60
  },
];
