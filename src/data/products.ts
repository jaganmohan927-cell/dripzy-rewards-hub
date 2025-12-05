export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Midnight Drip Polo",
    description: "Premium cotton polo with minimalist collar design. Perfect for those who keep it clean but stay bold.",
    price: 999,
    image: "https://images.unsplash.com/photo-1625910513413-5fc1ab47c6f2?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy"],
    category: "Classic"
  },
  {
    id: "2",
    name: "Golden Hour Polo",
    description: "Classic fit polo meets premium comfort. The perfect streetwear essential for the modern tribe member.",
    price: 999,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Mustard", "White"],
    category: "Premium"
  },
  {
    id: "3",
    name: "Shadow Wave Polo",
    description: "Where minimal meets movement. Crafted for those who create waves, not follow them.",
    price: 999,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Gray"],
    category: "Essential"
  },
  {
    id: "4",
    name: "Urban Phantom Polo",
    description: "Stealth mode activated. Dark, bold, and built for the streets with classic collar style.",
    price: 999,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Dark Gray"],
    category: "Premium"
  },
  {
    id: "5",
    name: "Tribe Classic Polo",
    description: "The OG Dripzy classic polo. Simple, sharp, and made to represent the tribe.",
    price: 999,
    image: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray"],
    category: "Classic"
  },
  {
    id: "6",
    name: "Neon Vibes Polo",
    description: "Stand out from the crowd. Bold accents meet polo aesthetics for the statement maker.",
    price: 999,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black/Yellow", "Black/Green"],
    category: "Statement"
  },
  {
    id: "7",
    name: "Concrete Jungle Polo",
    description: "Built for the city. Relaxed fit, premium fabric, endless style with classic polo collar.",
    price: 999,
    image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Olive", "Black"],
    category: "Essential"
  },
  {
    id: "8",
    name: "Drip Essential Polo",
    description: "Your everyday essential polo. Clean lines, perfect fit, timeless appeal.",
    price: 999,
    image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy"],
    category: "Essential"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
