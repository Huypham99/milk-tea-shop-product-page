export const mockVariants = {
  size: {
    type: 'size' as const,
    name: 'Chọn size',
    required: true,
    multiSelect: false,
    options: [
      { id: 'size_m', name: 'Size M', priceModifier: 0, available: true },
      { id: 'size_l', name: 'Size L', priceModifier: 5000, available: true },
    ],
  },
  sugar: {
    type: 'sugar' as const,
    name: 'Chọn đường',
    required: true,
    multiSelect: false,
    options: [
      { id: 'sugar_none', name: 'Không đường', priceModifier: 0, available: true },
      { id: 'sugar_low', name: 'Ít đường', priceModifier: 0, available: true },
      { id: 'sugar_normal', name: '100% đường', priceModifier: 0, available: true },
    ],
  },
  ice: {
    type: 'ice' as const,
    name: 'Chọn đá',
    required: true,
    multiSelect: false,
    options: [
      { id: 'ice_none', name: 'Không đá', priceModifier: 0, available: true },
      { id: 'ice_low', name: 'Ít đá', priceModifier: 0, available: true },
      { id: 'ice_normal', name: '100% đá', priceModifier: 0, available: true },
    ],
  },
  temperature: {
    type: 'temperature' as const,
    name: 'Chọn loại',
    required: true,
    multiSelect: false,
    options: [
      { id: 'temp_cold', name: 'Lạnh', priceModifier: 0, available: true },
      { id: 'temp_hot', name: 'Nóng', priceModifier: 0, available: true },
    ],
  },
}

export const mockToppings = [
  { id: 'topping_pearls', name: 'Trân châu đen', price: 5000, available: true, category: 'pearls' },
  {
    id: 'topping_brown_pearls',
    name: 'Trân châu đường đen',
    price: 7000,
    available: true,
    category: 'pearls',
  },
  { id: 'topping_grass_jelly', name: 'Thạch cỏ', price: 4000, available: true, category: 'jelly' },
  {
    id: 'topping_coconut_jelly',
    name: 'Thạch dừa',
    price: 4000,
    available: true,
    category: 'jelly',
  },
  { id: 'topping_pudding', name: 'Pudding', price: 6000, available: true, category: 'cream' },
  {
    id: 'topping_cheese_foam',
    name: 'Cheese foam',
    price: 8000,
    available: true,
    category: 'cream',
  },
  { id: 'topping_red_bean', name: 'Đậu đỏ', price: 5000, available: true, category: 'beans' },
  { id: 'topping_taro_balls', name: 'Taro balls', price: 6000, available: true, category: 'balls' },
]

export const mockData = {
  categories: [
    {
      id: 1,
      name: 'Món Nổi Bật',
      description: 'Các món đồ uống được yêu thích nhất',
      productCount: 8,
    },
    {
      id: 2,
      name: 'Trà Sữa',
      description: 'Trà sữa truyền thống và hiện đại',
      productCount: 8,
    },
    {
      id: 3,
      name: 'Trà trái cây',
      description: 'Trà trái cây tươi mát',
      productCount: 8,
    },
    {
      id: 4,
      name: 'Cà phê',
      description: 'Cà phê rang xay nguyên chất',
      productCount: 8,
    },
    {
      id: 5,
      name: 'Món đặc biệt',
      description: 'Thức uống đặc biệt theo mùa',
      productCount: 8,
    },
  ],

  products: [
    // Category 1: Món Nổi Bật (8 products)
    {
      id: 1,
      name: 'Trà Sữa Hai Anh Em',
      description:
        'Vị trà xanh nhài organic đậm vị, chất nhẹ kết hợp hai loại topping pudding phô mai tươi mềm béo thơm, thạch sương sáo thanh mát',
      price: 30000,
      originalPrice: 45000,
      categoryId: 1,
      image: '/images/tra-sua-hai-anh-em.jpg',
      isNew: true,
      isPopular: true,

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice, mockVariants.temperature],

      availableToppings: [
        'topping_pearls',
        'topping_grass_jelly',
        'topping_pudding',
        'topping_coconut_jelly',
      ],

      inventory: {
        quantity: 22,
        status: 'in_stock' as const,
      },

      details: {
        calories: 10,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['strong', 'espresso', 'black'],
      searchKeywords: ['americano', 'đậm đà', 'espresso'],
    },

    {
      id: 30,
      name: 'Cà Phê Latte',
      description: 'Latte mềm mại với sữa tươi thơm ngon',
      price: 38000,
      categoryId: 4,
      image: '/images/ca-phe-latte.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.temperature],

      availableToppings: ['topping_vanilla_syrup', 'topping_caramel_syrup'],

      inventory: {
        quantity: 18,
        status: 'in_stock' as const,
      },

      details: {
        calories: 190,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 3,
      },

      tags: ['smooth', 'milky', 'creamy'],
      searchKeywords: ['latte', 'mềm mại', 'sữa tươi'],
    },

    {
      id: 31,
      name: 'Cà Phê Mocha',
      description: 'Mocha chocolate đậm đà kết hợp cà phê',
      price: 42000,
      categoryId: 4,
      image: '/images/ca-phe-mocha.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.temperature],

      availableToppings: ['topping_whipped_cream', 'topping_chocolate_chips'],

      inventory: {
        quantity: 15,
        status: 'in_stock' as const,
      },

      details: {
        calories: 280,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 4,
      },

      tags: ['chocolate', 'sweet', 'indulgent'],
      searchKeywords: ['mocha', 'chocolate', 'đậm đà'],
    },

    {
      id: 32,
      name: 'Cà Phê Espresso',
      description: 'Espresso nguyên chất đậm đà theo phong cách Ý',
      price: 32000,
      categoryId: 4,
      image: '/images/ca-phe-espresso.jpg',

      variants: [mockVariants.size, mockVariants.sugar],

      availableToppings: [],

      inventory: {
        quantity: 25,
        status: 'in_stock' as const,
      },

      details: {
        calories: 5,
        caffeine: true,
        preparationTime: 1,
      },

      tags: ['pure', 'italian', 'concentrated'],
      searchKeywords: ['espresso', 'nguyên chất', 'ý'],
    },

    // Category 5: Món đặc biệt (8 products)
    {
      id: 33,
      name: 'Trà Hoa Anh Đào Nhật Bản',
      description: 'Trà hoa anh đào nhập khẩu từ Nhật Bản, thơm ngọt tinh tế',
      price: 55000,
      categoryId: 5,
      image: '/images/tra-hoa-anh-dao-nhat-ban.jpg',
      isNew: true,

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_sakura_petals', 'topping_pearls', 'topping_coconut_jelly'],

      inventory: {
        quantity: 10,
        status: 'in_stock' as const,
      },

      details: {
        calories: 80,
        caffeine: true,
        preparationTime: 4,
      },

      tags: ['japanese', 'sakura', 'premium', 'seasonal'],
      searchKeywords: ['trà hoa', 'anh đào', 'nhật bản', 'sakura'],
    },

    {
      id: 34,
      name: 'Smoothie Bowl Açaí',
      description: 'Smoothie bowl açaí siêu thực phẩm với granola và trái cây tươi',
      price: 65000,
      categoryId: 5,
      image: '/images/smoothie-bowl-acai.jpg',
      isNew: true,

      variants: [mockVariants.size],

      availableToppings: ['topping_granola', 'topping_chia_seeds', 'topping_fresh_fruits'],

      inventory: {
        quantity: 8,
        status: 'in_stock' as const,
      },

      details: {
        calories: 320,
        caffeine: false,
        allergens: ['nuts'],
        preparationTime: 5,
      },

      tags: ['superfood', 'healthy', 'acai', 'bowl'],
      searchKeywords: ['smoothie bowl', 'açaí', 'siêu thực phẩm'],
    },

    {
      id: 35,
      name: 'Trà Ô Long Đài Loan',
      description: 'Trà ô long cao cấp từ Đài Loan với hương vị đặc trưng',
      price: 48000,
      categoryId: 5,
      image: '/images/tra-o-long-dai-loan.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_grass_jelly'],

      inventory: {
        quantity: 12,
        status: 'in_stock' as const,
      },

      details: {
        calories: 60,
        caffeine: true,
        preparationTime: 3,
      },

      tags: ['oolong', 'taiwanese', 'premium', 'traditional'],
      searchKeywords: ['trà ô long', 'đài loan', 'cao cấp'],
    },

    {
      id: 36,
      name: 'Kombucha Chanh Dây',
      description: 'Kombucha chanh dây lên men tự nhiên, tốt cho sức khỏe',
      price: 52000,
      categoryId: 5,
      image: '/images/kombucha-chanh-day.jpg',
      isNew: true,

      variants: [mockVariants.size, mockVariants.ice],

      availableToppings: ['topping_chia_seeds', 'topping_mint'],

      inventory: {
        quantity: 6,
        status: 'in_stock' as const,
      },

      details: {
        calories: 45,
        caffeine: false,
        preparationTime: 2,
      },

      tags: ['kombucha', 'fermented', 'healthy', 'probiotic'],
      searchKeywords: ['kombucha', 'chanh dây', 'lên men', 'healthy'],
    },

    {
      id: 37,
      name: 'Trà Hoa Nhài Cao Cấp',
      description: 'Trà hoa nhài thượng hạng với hương thơm tự nhiên',
      price: 45000,
      categoryId: 5,
      image: '/images/tra-hoa-nhai-cao-cap.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_jasmine_flowers', 'topping_pearls'],

      inventory: {
        quantity: 14,
        status: 'in_stock' as const,
      },

      details: {
        calories: 70,
        caffeine: true,
        preparationTime: 3,
      },

      tags: ['jasmine', 'premium', 'floral', 'aromatic'],
      searchKeywords: ['trà hoa nhài', 'cao cấp', 'thượng hạng'],
    },

    {
      id: 38,
      name: 'Cold Brew Nitro',
      description: 'Cold brew nitro độc đáo với bọt khí nitrogen mịn',
      price: 58000,
      categoryId: 5,
      image: '/images/cold-brew-nitro.jpg',
      isNew: true,

      variants: [mockVariants.size, mockVariants.sugar],

      availableToppings: ['topping_vanilla_cream', 'topping_caramel_syrup'],

      inventory: {
        quantity: 9,
        status: 'in_stock' as const,
      },

      details: {
        calories: 15,
        caffeine: true,
        preparationTime: 4,
      },

      tags: ['nitro', 'cold-brew', 'premium', 'unique'],
      searchKeywords: ['cold brew', 'nitro', 'độc đáo', 'nitrogen'],
    },

    {
      id: 39,
      name: 'Trà Matcha Ceremonial',
      description: 'Trà matcha ceremonial grade từ Uji, Nhật Bản',
      price: 68000,
      categoryId: 5,
      image: '/images/tra-matcha-ceremonial.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.temperature],

      availableToppings: ['topping_matcha_powder', 'topping_red_bean'],

      inventory: {
        quantity: 7,
        status: 'in_stock' as const,
      },

      details: {
        calories: 35,
        caffeine: true,
        preparationTime: 5,
      },

      tags: ['matcha', 'ceremonial', 'japanese', 'premium'],
      searchKeywords: ['matcha', 'ceremonial', 'uji', 'nhật bản'],
    },

    {
      id: 40,
      name: 'Bubble Waffle Ice Cream',
      description: 'Bánh waffle bong bóng kết hợp kem tươi và topping đặc biệt',
      price: 75000,
      categoryId: 5,
      image: '/images/bubble-waffle-ice-cream.jpg',
      isNew: true,

      variants: [mockVariants.size],

      availableToppings: ['topping_ice_cream', 'topping_fresh_fruits', 'topping_chocolate_sauce'],

      inventory: {
        quantity: 5,
        status: 'low_stock' as const,
        lowStockThreshold: 5,
      },

      details: {
        calories: 450,
        caffeine: false,
        allergens: ['milk', 'gluten', 'eggs'],
        preparationTime: 6,
      },

      tags: ['dessert', 'waffle', 'ice-cream', 'special'],
      searchKeywords: ['bubble waffle', 'kem', 'bánh waffle', 'đặc biệt'],
    },
    {
      id: 2,
      name: 'Xanh Nhài Xoài Băng Tuyết',
      description: 'Trà xanh nhài kết hợp với xoài tươi và topping băng tuyết mát lạnh',
      price: 37000,
      categoryId: 1,
      image: '/images/xanh-nhai-xoai-bang-tuyet.jpg',
      isNew: true,
      isPopular: true,

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_coconut_jelly', 'topping_cheese_foam'],

      inventory: {
        quantity: 8,
        status: 'in_stock' as const,
      },

      details: {
        calories: 160,
        caffeine: true,
        preparationTime: 3,
      },

      tags: ['tropical', 'creamy', 'mango'],
      searchKeywords: ['xanh nhài', 'xoài', 'băng tuyết', 'cheese foam'],
    },

    {
      id: 3,
      name: 'Trà Sữa Matcha Hokkaido',
      description: 'Trà sữa matcha thượng hạng với kem tươi Hokkaido béo ngậy',
      price: 42000,
      originalPrice: 50000,
      categoryId: 1,
      image: '/images/tra-sua-matcha-hokkaido.jpg',
      isPopular: true,

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_pudding', 'topping_red_bean'],

      inventory: {
        quantity: 20,
        status: 'in_stock' as const,
      },

      details: {
        calories: 320,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 4,
      },

      tags: ['premium', 'matcha', 'japanese'],
      searchKeywords: ['trà sữa', 'matcha', 'hokkaido', 'premium'],
    },

    {
      id: 4,
      name: 'Cà Phê Sữa Đá Đặc Biệt',
      description: 'Cà phê rang xay thủ công kết hợp sữa đặc ngọt thơm',
      price: 28000,
      categoryId: 1,
      image: '/images/ca-phe-sua-da-dac-biet.jpg',
      isPopular: true,

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_coffee_jelly', 'topping_coconut_jelly'],

      inventory: {
        quantity: 30,
        status: 'in_stock' as const,
      },

      details: {
        calories: 200,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['classic', 'vietnamese', 'strong'],
      searchKeywords: ['cà phê', 'sữa đá', 'đặc biệt', 'việt nam'],
    },

    {
      id: 5,
      name: 'Trà Đào Cam Sả',
      description: 'Trà đào thơm ngon kết hợp cam tươi và sả thơm',
      price: 35000,
      categoryId: 1,
      image: '/images/tra-dao-cam-sa.jpg',
      isPopular: true,

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_coconut_jelly', 'topping_grass_jelly'],

      inventory: {
        quantity: 22,
        status: 'in_stock' as const,
      },

      details: {
        calories: 110,
        caffeine: false,
        preparationTime: 3,
      },

      tags: ['fruity', 'refreshing', 'herbal'],
      searchKeywords: ['trà đào', 'cam', 'sả', 'thơm'],
    },

    {
      id: 6,
      name: 'Trà Sữa Chocolate Oreo',
      description: 'Trà sữa socola đậm đà với bánh Oreo giòn tan',
      price: 38000,
      categoryId: 1,
      image: '/images/tra-sua-chocolate-oreo.jpg',
      isNew: true,
      isPopular: true,

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_oreo', 'topping_pudding', 'topping_cheese_foam'],

      inventory: {
        quantity: 15,
        status: 'in_stock' as const,
      },

      details: {
        calories: 380,
        caffeine: true,
        allergens: ['milk', 'gluten'],
        preparationTime: 4,
      },

      tags: ['chocolate', 'dessert', 'indulgent'],
      searchKeywords: ['trà sữa', 'chocolate', 'oreo', 'ngọt'],
    },

    {
      id: 7,
      name: 'Trà Chanh Mật Ong',
      description: 'Trà chanh tươi mát với mật ong nguyên chất',
      price: 25000,
      categoryId: 1,
      image: '/images/tra-chanh-mat-ong.jpg',
      isPopular: true,

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_lemon_slice', 'topping_coconut_jelly'],

      inventory: {
        quantity: 18,
        status: 'in_stock' as const,
      },

      details: {
        calories: 80,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['healthy', 'natural', 'vitamin-c'],
      searchKeywords: ['trà chanh', 'mật ong', 'tươi mát', 'healthy'],
    },

    {
      id: 8,
      name: 'Smoothie Dâu Tây Yogurt',
      description: 'Smoothie dâu tây tươi ngon kết hợp yogurt chua ngọt',
      price: 40000,
      categoryId: 1,
      image: '/images/smoothie-dau-tay-yogurt.jpg',
      isNew: true,
      isPopular: true,

      variants: [mockVariants.size, mockVariants.sugar],

      availableToppings: ['topping_strawberry', 'topping_granola', 'topping_chia_seeds'],

      inventory: {
        quantity: 12,
        status: 'in_stock' as const,
      },

      details: {
        calories: 220,
        caffeine: false,
        allergens: ['milk'],
        preparationTime: 3,
      },

      tags: ['healthy', 'fruity', 'smoothie'],
      searchKeywords: ['smoothie', 'dâu tây', 'yogurt', 'healthy'],
    },

    // Category 2: Trà Sữa (8 products)
    {
      id: 9,
      name: 'Trà Sữa Truyền Thống',
      description: 'Trà sữa kiểu truyền thống với hương vị đặc trưng',
      price: 22000,
      categoryId: 2,
      image: '/images/tra-sua-truyen-thong.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_grass_jelly'],

      inventory: {
        quantity: 25,
        status: 'in_stock' as const,
      },

      details: {
        calories: 250,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 2,
      },

      tags: ['classic', 'traditional', 'simple'],
      searchKeywords: ['trà sữa', 'truyền thống', 'cổ điển'],
    },

    {
      id: 10,
      name: 'Trà Sữa Khoai Môn',
      description: 'Trà sữa vị khoai môn thơm béo hấp dẫn',
      price: 28000,
      categoryId: 2,
      image: '/images/tra-sua-khoai-mon.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_pudding', 'topping_coconut_jelly'],

      inventory: {
        quantity: 20,
        status: 'in_stock' as const,
      },

      details: {
        calories: 270,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 3,
      },

      tags: ['taro', 'creamy', 'unique'],
      searchKeywords: ['trà sữa', 'khoai môn', 'taro', 'béo ngậy'],
    },

    {
      id: 11,
      name: 'Trà Sữa Dừa Nướng',
      description: 'Trà sữa với hương vị dừa nướng thơm lừng',
      price: 32000,
      categoryId: 2,
      image: '/images/tra-sua-dua-nuong.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_coconut_jelly', 'topping_pearls', 'topping_pudding'],

      inventory: {
        quantity: 18,
        status: 'in_stock' as const,
      },

      details: {
        calories: 290,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 3,
      },

      tags: ['coconut', 'roasted', 'tropical'],
      searchKeywords: ['trà sữa', 'dừa nướng', 'thơm lừng'],
    },

    {
      id: 12,
      name: 'Trà Sữa Socola',
      description: 'Trà sữa socola đậm đà ngọt ngào',
      price: 30000,
      categoryId: 2,
      image: '/images/tra-sua-socola.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_chocolate_chips', 'topping_pudding', 'topping_pearls'],

      inventory: {
        quantity: 22,
        status: 'in_stock' as const,
      },

      details: {
        calories: 310,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 3,
      },

      tags: ['chocolate', 'sweet', 'indulgent'],
      searchKeywords: ['trà sữa', 'socola', 'chocolate', 'ngọt'],
    },

    {
      id: 13,
      name: 'Trà Sữa Vanilla',
      description: 'Trà sữa vanilla thơm ngon dịu nhẹ',
      price: 26000,
      categoryId: 2,
      image: '/images/tra-sua-vanilla.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_grass_jelly', 'topping_pudding'],

      inventory: {
        quantity: 24,
        status: 'in_stock' as const,
      },

      details: {
        calories: 260,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 2,
      },

      tags: ['vanilla', 'smooth', 'classic'],
      searchKeywords: ['trà sữa', 'vanilla', 'thơm ngon', 'dịu nhẹ'],
    },

    {
      id: 14,
      name: 'Trà Sữa Trân Châu Hoàng Gia',
      description: 'Trà sữa cao cấp với trân châu hoàng gia đặc biệt',
      price: 35000,
      categoryId: 2,
      image: '/images/tra-sua-tran-chau-hoang-gia.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_golden_pearls', 'topping_cheese_foam', 'topping_pudding'],

      inventory: {
        quantity: 15,
        status: 'in_stock' as const,
      },

      details: {
        calories: 320,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 4,
      },

      tags: ['premium', 'royal', 'luxury'],
      searchKeywords: ['trà sữa', 'trân châu', 'hoàng gia', 'cao cấp'],
    },

    {
      id: 15,
      name: 'Trà Sữa Kiwi',
      description: 'Trà sữa vị kiwi chua ngọt tươi mát',
      price: 29000,
      categoryId: 2,
      image: '/images/tra-sua-kiwi.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_coconut_jelly', 'topping_kiwi_pieces'],

      inventory: {
        quantity: 19,
        status: 'in_stock' as const,
      },

      details: {
        calories: 240,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 3,
      },

      tags: ['kiwi', 'fruity', 'tangy'],
      searchKeywords: ['trà sữa', 'kiwi', 'chua ngọt', 'tươi mát'],
    },

    {
      id: 16,
      name: 'Trà Sữa Đậu Xanh',
      description: 'Trà sữa đậu xanh thanh mát với hương vị tự nhiên',
      price: 27000,
      categoryId: 2,
      image: '/images/tra-sua-dau-xanh.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_grass_jelly', 'topping_red_bean'],

      inventory: {
        quantity: 21,
        status: 'in_stock' as const,
      },

      details: {
        calories: 255,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 3,
      },

      tags: ['green-bean', 'natural', 'healthy'],
      searchKeywords: ['trà sữa', 'đậu xanh', 'thanh mát', 'tự nhiên'],
    },

    // Category 3: Trà trái cây (8 products)
    {
      id: 17,
      name: 'Trà Xanh Chanh Leo',
      description: 'Trà xanh tươi mát kết hợp với chanh leo chua ngọt tự nhiên',
      price: 38000,
      categoryId: 3,
      image: '/images/tra-xanh-chanh-leo.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_coconut_jelly'],

      inventory: {
        quantity: 12,
        status: 'in_stock' as const,
      },

      details: {
        calories: 95,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['refreshing', 'citrus', 'vitamin-c'],
      searchKeywords: ['trà xanh', 'chanh leo', 'tươi mát'],
    },

    {
      id: 18,
      name: 'Trà Đào Cam Sả',
      description: 'Trà đào thơm ngon kết hợp cam tươi và sả thơm',
      price: 35000,
      categoryId: 3,
      image: '/images/tra-dao-cam-sa.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_pearls', 'topping_coconut_jelly', 'topping_grass_jelly'],

      inventory: {
        quantity: 22,
        status: 'in_stock' as const,
      },

      details: {
        calories: 110,
        caffeine: false,
        preparationTime: 3,
      },

      tags: ['fruity', 'refreshing', 'herbal'],
      searchKeywords: ['trà đào', 'cam', 'sả', 'thơm'],
    },

    {
      id: 19,
      name: 'Trà Vải Thiều',
      description: 'Trà vải thiều ngọt thanh với hương vị đặc trưng',
      price: 32000,
      categoryId: 3,
      image: '/images/tra-vai-thieu.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_lychee', 'topping_coconut_jelly', 'topping_pearls'],

      inventory: {
        quantity: 16,
        status: 'in_stock' as const,
      },

      details: {
        calories: 120,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['lychee', 'sweet', 'seasonal'],
      searchKeywords: ['trà vải', 'thiều', 'ngọt thanh'],
    },

    {
      id: 20,
      name: 'Trà Dâu Tây',
      description: 'Trà dâu tây tươi ngọt với hương vị tự nhiên',
      price: 36000,
      categoryId: 3,
      image: '/images/tra-dau-tay.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_strawberry', 'topping_pearls', 'topping_coconut_jelly'],

      inventory: {
        quantity: 14,
        status: 'in_stock' as const,
      },

      details: {
        calories: 130,
        caffeine: true,
        preparationTime: 3,
      },

      tags: ['strawberry', 'fruity', 'sweet'],
      searchKeywords: ['trà dâu', 'tây', 'tươi ngọt'],
    },

    {
      id: 21,
      name: 'Trà Nho Xanh',
      description: 'Trà nho xanh tươi mát với vị chua ngọt dễ uống',
      price: 33000,
      categoryId: 3,
      image: '/images/tra-nho-xanh.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_grape', 'topping_coconut_jelly', 'topping_pearls'],

      inventory: {
        quantity: 18,
        status: 'in_stock' as const,
      },

      details: {
        calories: 115,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['grape', 'refreshing', 'antioxidant'],
      searchKeywords: ['trà nho', 'xanh', 'chua ngọt'],
    },

    {
      id: 22,
      name: 'Trà Thanh Long',
      description: 'Trà thanh long độc đáo với hương vị nhẹ nhàng',
      price: 34000,
      categoryId: 3,
      image: '/images/tra-thanh-long.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_dragon_fruit', 'topping_coconut_jelly', 'topping_pearls'],

      inventory: {
        quantity: 13,
        status: 'in_stock' as const,
      },

      details: {
        calories: 105,
        caffeine: true,
        preparationTime: 3,
      },

      tags: ['dragon-fruit', 'exotic', 'healthy'],
      searchKeywords: ['trà thanh long', 'độc đáo', 'nhẹ nhàng'],
    },

    {
      id: 23,
      name: 'Trà Xoài Xanh',
      description: 'Trà xoài xanh chua ngọt đặc biệt',
      price: 31000,
      categoryId: 3,
      image: '/images/tra-xoai-xanh.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_mango', 'topping_coconut_jelly', 'topping_pearls'],

      inventory: {
        quantity: 20,
        status: 'in_stock' as const,
      },

      details: {
        calories: 125,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['green-mango', 'tangy', 'tropical'],
      searchKeywords: ['trà xoài', 'xanh', 'chua ngọt'],
    },

    {
      id: 24,
      name: 'Trà Cam Tươi',
      description: 'Trà cam tươi giàu vitamin C tự nhiên',
      price: 29000,
      categoryId: 3,
      image: '/images/tra-cam-tuoi.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_orange', 'topping_coconut_jelly', 'topping_pearls'],

      inventory: {
        quantity: 25,
        status: 'in_stock' as const,
      },

      details: {
        calories: 100,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['orange', 'vitamin-c', 'healthy'],
      searchKeywords: ['trà cam', 'tươi', 'vitamin'],
    },

    // Category 4: Cà phê (8 products)
    {
      id: 25,
      name: 'Cà Phê Sữa Đá',
      description: 'Cà phê sữa đá truyền thống Việt Nam',
      price: 25000,
      categoryId: 4,
      image: '/images/ca-phe-sua-da.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_coffee_jelly', 'topping_coconut_jelly'],

      inventory: {
        quantity: 30,
        status: 'in_stock' as const,
      },

      details: {
        calories: 180,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['classic', 'vietnamese', 'iced'],
      searchKeywords: ['cà phê', 'sữa đá', 'truyền thống'],
    },

    {
      id: 26,
      name: 'Cà Phê Đen Đá',
      description: 'Cà phê đen đá nguyên chất, đậm đà',
      price: 20000,
      categoryId: 4,
      image: '/images/ca-phe-den-da.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_coffee_jelly'],

      inventory: {
        quantity: 35,
        status: 'in_stock' as const,
      },

      details: {
        calories: 50,
        caffeine: true,
        preparationTime: 1,
      },

      tags: ['black', 'strong', 'pure'],
      searchKeywords: ['cà phê', 'đen đá', 'nguyên chất'],
    },

    {
      id: 27,
      name: 'Bạc Xỉu',
      description: 'Bạc xỉu ngọt ngào với sữa đặc thơm béo',
      price: 28000,
      categoryId: 4,
      image: '/images/bac-xiu.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.ice],

      availableToppings: ['topping_coffee_jelly', 'topping_coconut_jelly'],

      inventory: {
        quantity: 25,
        status: 'in_stock' as const,
      },

      details: {
        calories: 220,
        caffeine: true,
        preparationTime: 2,
      },

      tags: ['sweet', 'milky', 'vietnamese'],
      searchKeywords: ['bạc xỉu', 'ngọt ngào', 'sữa đặc'],
    },

    {
      id: 28,
      name: 'Cà Phê Cappuccino',
      description: 'Cappuccino Ý với bọt sữa mịn mượt',
      price: 35000,
      categoryId: 4,
      image: '/images/ca-phe-cappuccino.jpg',

      variants: [mockVariants.size, mockVariants.sugar, mockVariants.temperature],

      availableToppings: ['topping_cinnamon', 'topping_chocolate_powder'],

      inventory: {
        quantity: 20,
        status: 'in_stock' as const,
      },

      details: {
        calories: 150,
        caffeine: true,
        allergens: ['milk'],
        preparationTime: 3,
      },

      tags: ['italian', 'foam', 'espresso'],
      searchKeywords: ['cappuccino', 'bọt sữa', 'ý'],
    },
  ],
}
