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
    name: "Midnight Drip Tee",
    description: "Premium cotton tee with minimalist design. Perfect for those who keep it clean but stay bold.",
    price: 999,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy"],
    category: "Essential"
  },
  {
    id: "2",
    name: "Golden Hour Oversized",
    description: "Oversized fit meets premium comfort. The perfect streetwear essential for the modern tribe member.",
    price: 999,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Mustard", "White"],
    category: "Oversized"
  },
  {
    id: "3",
    name: "Shadow Wave Tee",
    description: "Where minimal meets movement. Crafted for those who create waves, not follow them.",
    price: 999,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Gray"],
    category: "Essential"
  },
  {
    id: "4",
    name: "Urban Phantom Tee",
    description: "Stealth mode activated. Dark, bold, and built for the streets.",
    price: 999,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Dark Gray"],
    category: "Premium"
  },
  {
    id: "5",
    name: "Tribe Classic Tee",
    description: "The OG Dripzy classic. Simple, sharp, and made to represent the tribe.",
    price: 999,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray"],
    category: "Classic"
  },
  {
    id: "6",
    name: "Neon Vibes Tee",
    description: "Stand out from the crowd. Bold accents meet streetwear aesthetics.",
    price: 999,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black/Yellow", "Black/Green"],
    category: "Statement"
  },
  {
    id: "7",
    name: "Concrete Jungle Oversized",
    description: "Built for the city. Relaxed fit, premium fabric, endless style.",
    price: 999,
    image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Olive", "Black"],
    category: "Oversized"
  },
  {
    id: "8",
    name: "Drip Essential Tee",
    description: "Your everyday essential. Clean lines, perfect fit, timeless appeal.",
    price: 999,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy"],
    category: "Essential"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
