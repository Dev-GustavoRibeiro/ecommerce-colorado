export const categories = [
  {
    id: '1',
    name: 'Sofás e Estofados',
    slug: 'sofas-estofados',
    description: 'Conforto e elegância para sua sala',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    icon: 'Sofa',
  },
  {
    id: '2',
    name: 'Cozinha',
    slug: 'cozinha',
    description: 'Eletrodomésticos e móveis para cozinha',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    icon: 'ChefHat',
  },
  {
    id: '3',
    name: 'Quartos',
    slug: 'quartos',
    description: 'Móveis e decoração para quartos',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
    icon: 'Bed',
  },
  {
    id: '4',
    name: 'TV e Áudio',
    slug: 'tv-audio',
    description: 'Smart TVs, soundbars e home theater',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
    icon: 'Tv',
  },
  {
    id: '5',
    name: 'Lavanderia',
    slug: 'lavanderia',
    description: 'Máquinas de lavar, secar e tanques',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800',
    icon: 'Shirt',
  },
  {
    id: '6',
    name: 'Climatização',
    slug: 'climatizacao',
    description: 'Ar condicionado e ventiladores',
    image: 'https://images.unsplash.com/photo-1631545806609-35d4d452374c?w=800',
    icon: 'Wind',
  },
]

export const products = [
  {
    id: '1',
    name: 'Sofá Retrátil 3 Lugares Premium',
    slug: 'sofa-retratil-3-lugares-premium',
    description: 'Sofá retrátil e reclinável em tecido suede, estrutura em madeira de reflorestamento. Conforto e durabilidade para sua família.',
    price: 2499.90,
    originalPrice: 3299.90,
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
    ],
    stock: 15,
    featured: true,
    specifications: {
      'Dimensões': '230 x 100 x 95 cm',
      'Material': 'Tecido Suede',
      'Cor': 'Cinza Grafite',
      'Peso': '85 kg',
      'Garantia': '2 anos',
    },
  },
  {
    id: '2',
    name: 'Smart TV LED 55" 4K UHD',
    slug: 'smart-tv-led-55-4k-uhd',
    description: 'Smart TV com resolução 4K UHD, sistema operacional WebOS, Wi-Fi integrado e controle por voz.',
    price: 2799.00,
    originalPrice: 3499.00,
    categoryId: '4',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800',
    ],
    stock: 25,
    featured: true,
    specifications: {
      'Tamanho da Tela': '55 polegadas',
      'Resolução': '4K UHD (3840x2160)',
      'Taxa de Atualização': '60Hz',
      'Sistema Operacional': 'WebOS',
      'Conexões': '3x HDMI, 2x USB',
    },
  },
  {
    id: '3',
    name: 'Geladeira Frost Free 400L',
    slug: 'geladeira-frost-free-400l',
    description: 'Geladeira duplex frost free com painel digital externo, gaveta de frutas e legumes com controle de umidade.',
    price: 3299.00,
    originalPrice: 4199.00,
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800',
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800',
    ],
    stock: 12,
    featured: true,
    specifications: {
      'Capacidade': '400 Litros',
      'Tipo': 'Frost Free',
      'Voltagem': 'Bivolt',
      'Eficiência Energética': 'A',
      'Cor': 'Inox',
    },
  },
  {
    id: '4',
    name: 'Cama Box Queen Size + Colchão',
    slug: 'cama-box-queen-size-colchao',
    description: 'Conjunto cama box queen size com colchão de molas ensacadas, pillow top e espuma viscoelástica.',
    price: 1899.90,
    originalPrice: 2599.90,
    categoryId: '3',
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    ],
    stock: 20,
    featured: true,
    specifications: {
      'Tamanho': 'Queen Size (158x198 cm)',
      'Altura do Colchão': '28 cm',
      'Tipo de Mola': 'Ensacadas',
      'Densidade': 'D45',
      'Garantia': '5 anos',
    },
  },
  {
    id: '5',
    name: 'Máquina de Lavar 15kg',
    slug: 'maquina-de-lavar-15kg',
    description: 'Lavadora automática com 15 programas de lavagem, centrifugação de 1000 RPM e sistema de economia de água.',
    price: 2199.00,
    originalPrice: 2799.00,
    categoryId: '5',
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800',
      'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800',
    ],
    stock: 18,
    featured: false,
    specifications: {
      'Capacidade': '15 kg',
      'Programas': '15 programas',
      'Centrifugação': '1000 RPM',
      'Voltagem': '220V',
      'Eficiência': 'A',
    },
  },
  {
    id: '6',
    name: 'Ar Condicionado Split 12000 BTUs',
    slug: 'ar-condicionado-split-12000-btus',
    description: 'Ar condicionado split inverter com tecnologia Wi-Fi, modo sleep e filtro antibacteriano.',
    price: 1899.00,
    originalPrice: 2399.00,
    categoryId: '6',
    images: [
      'https://images.unsplash.com/photo-1631545806609-35d4d452374c?w=800',
    ],
    stock: 30,
    featured: true,
    specifications: {
      'Capacidade': '12000 BTUs',
      'Tecnologia': 'Inverter',
      'Área': 'Até 20m²',
      'Voltagem': 'Bivolt',
      'Classificação': 'A',
    },
  },
  {
    id: '7',
    name: 'Mesa de Jantar 6 Lugares',
    slug: 'mesa-de-jantar-6-lugares',
    description: 'Mesa de jantar em MDF com tampo de vidro temperado e pés em aço cromado. Elegância para suas refeições.',
    price: 1299.90,
    originalPrice: 1699.90,
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
    ],
    stock: 10,
    featured: false,
    specifications: {
      'Dimensões': '160 x 90 x 78 cm',
      'Material': 'MDF + Vidro Temperado',
      'Cor': 'Carvalho',
      'Peso': '45 kg',
      'Lugares': '6',
    },
  },
  {
    id: '8',
    name: 'Guarda-Roupa 6 Portas',
    slug: 'guarda-roupa-6-portas',
    description: 'Guarda-roupa espaçoso com 6 portas, gavetas internas, maleiro e espelho. Organização completa.',
    price: 1599.90,
    originalPrice: 2199.90,
    categoryId: '3',
    images: [
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800',
    ],
    stock: 8,
    featured: false,
    specifications: {
      'Dimensões': '207 x 56 x 240 cm',
      'Material': 'MDP',
      'Cor': 'Branco',
      'Portas': '6',
      'Gavetas': '4',
    },
  },
  {
    id: '9',
    name: 'Fogão 5 Bocas Inox',
    slug: 'fogao-5-bocas-inox',
    description: 'Fogão 5 bocas em aço inox com forno auto-limpante, acendimento automático e mesa de vidro.',
    price: 1499.00,
    originalPrice: 1899.00,
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    ],
    stock: 22,
    featured: false,
    specifications: {
      'Bocas': '5',
      'Material': 'Aço Inox',
      'Forno': 'Auto-limpante',
      'Acendimento': 'Automático',
      'Mesa': 'Vidro Temperado',
    },
  },
  {
    id: '10',
    name: 'Home Theater 5.1 Canais',
    slug: 'home-theater-5-1-canais',
    description: 'Sistema de home theater 5.1 canais com subwoofer wireless, Bluetooth e entrada óptica.',
    price: 1799.00,
    originalPrice: 2299.00,
    categoryId: '4',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800',
    ],
    stock: 15,
    featured: false,
    specifications: {
      'Canais': '5.1',
      'Potência': '850W RMS',
      'Subwoofer': 'Wireless',
      'Conexões': 'Bluetooth, HDMI, Óptica',
      'Garantia': '1 ano',
    },
  },
  {
    id: '11',
    name: 'Poltrona Reclinável Massageadora',
    slug: 'poltrona-reclinavel-massageadora',
    description: 'Poltrona reclinável com sistema de massagem, aquecimento lombar e porta-copos. Relaxamento total.',
    price: 2899.90,
    originalPrice: 3599.90,
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    ],
    stock: 6,
    featured: true,
    specifications: {
      'Reclinação': 'Até 160°',
      'Massagem': '8 pontos',
      'Aquecimento': 'Lombar',
      'Material': 'Couro Sintético',
      'Cor': 'Marrom',
    },
  },
  {
    id: '12',
    name: 'Micro-ondas 32L Espelhado',
    slug: 'micro-ondas-32l-espelhado',
    description: 'Micro-ondas com painel touch, função descongelar, grill e 10 receitas pré-programadas.',
    price: 699.00,
    originalPrice: 899.00,
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800',
    ],
    stock: 35,
    featured: false,
    specifications: {
      'Capacidade': '32 Litros',
      'Potência': '1000W',
      'Painel': 'Touch',
      'Funções': 'Grill, Descongelar',
      'Cor': 'Espelhado',
    },
  },
]

export const getProductBySlug = (slug: string) => {
  return products.find((p) => p.slug === slug)
}

export const getProductsByCategory = (categorySlug: string) => {
  const category = categories.find((c) => c.slug === categorySlug)
  if (!category) return []
  return products.filter((p) => p.categoryId === category.id)
}

export const getFeaturedProducts = () => {
  return products.filter((p) => p.featured)
}

export const getCategoryBySlug = (slug: string) => {
  return categories.find((c) => c.slug === slug)
}
