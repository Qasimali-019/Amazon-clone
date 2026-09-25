export interface SubProduct {
  images: { url: string; public_id: string }[];
  description_images: { url: string; public_id: string }[];
  color: { color: string; image?: string };
  sizes: { size: string; qty: number; price: number }[];
  discount: number;
  sold: number;
  sku: string;
}

export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  category: { _id: string; name: string; slug: string };
  subCategories: { _id: string; name: string; slug: string }[];
  brand: string;
  details: { name: string; value: string }[];
  questions: { question: string; answer: string }[];
  reviews: { rating: number; review: string; reviewBy: { name: string; image: string } }[];
  subProducts: SubProduct[];
  shipping: number;
  updatedAt: string;
  createdAt: string;
}

export const mockCategories = [
  { _id: "cat_1", name: "Women's Clothing", slug: "women-clothing" },
  { _id: "cat_2", name: "Shoes", slug: "shoes" },
  { _id: "cat_3", name: "Beauty & Personal Care", slug: "beauty" },
  { _id: "cat_4", name: "Kids & Toys", slug: "kids" },
  { _id: "cat_5", name: "Electronics & Tech", slug: "electronics" },
  { _id: "cat_6", name: "Deals & Offers", slug: "deals" },
];

export const mockSubCategories = [
  { _id: "sub_1", name: "Dresses", slug: "dresses", parent: mockCategories[0] },
  { _id: "sub_2", name: "Sneakers", slug: "sneakers", parent: mockCategories[1] },
  { _id: "sub_3", name: "Skincare", slug: "skincare", parent: mockCategories[2] },
  { _id: "sub_4", name: "Toys", slug: "toys", parent: mockCategories[3] },
  { _id: "sub_5", name: "Headphones & Audio", slug: "headphones", parent: mockCategories[4] },
];

export const mockProducts: ProductType[] = [
  {
    _id: "prod_1",
    name: "Women Elegance Floral Summer Maxidress",
    slug: "women-elegance-floral-summer-maxidress",
    category: mockCategories[0],
    subCategories: [mockSubCategories[0]],
    brand: "Zara",
    shipping: 0,
    details: [
      { name: "Style", value: "Casual" },
      { name: "Material", value: "Cotton & Polyester" },
      { name: "Pattern", value: "Floral" },
    ],
    questions: [],
    reviews: [
      {
        rating: 5,
        review: "Love this dress! Super comfortable and stylish.",
        reviewBy: { name: "Sarah M.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
      },
    ],
    subProducts: [
      {
        images: [
          { url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800", public_id: "img1" },
          { url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800", public_id: "img2" },
        ],
        description_images: [],
        color: { color: "#e11d48", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100" },
        sizes: [
          { size: "S", qty: 20, price: 45 },
          { size: "M", qty: 15, price: 49 },
          { size: "L", qty: 10, price: 52 },
        ],
        discount: 15,
        sold: 142,
        sku: "DRESS-RED-001",
      },
    ],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_2",
    name: "Classic Women Denim Jacket Slim Fit",
    slug: "classic-women-denim-jacket-slim-fit",
    category: mockCategories[0],
    subCategories: [mockSubCategories[0]],
    brand: "Levi's",
    shipping: 0,
    details: [
      { name: "Style", value: "Denim" },
      { name: "Material", value: "100% Cotton" },
    ],
    questions: [],
    reviews: [
      {
        rating: 4.5,
        review: "Great quality denim, perfect fit!",
        reviewBy: { name: "Emily R.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
      },
    ],
    subProducts: [
      {
        images: [
          { url: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800", public_id: "img4" },
        ],
        description_images: [],
        color: { color: "#3b82f6", image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=100" },
        sizes: [
          { size: "S", qty: 30, price: 65 },
          { size: "M", qty: 25, price: 65 },
        ],
        discount: 20,
        sold: 210,
        sku: "JACKET-BLUE-01",
      },
    ],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_3",
    name: "Nike Air Max Sports Running Sneakers",
    slug: "nike-air-max-sports-running-sneakers",
    category: mockCategories[1],
    subCategories: [mockSubCategories[1]],
    brand: "Nike",
    shipping: 0,
    details: [
      { name: "Style", value: "Sportswear" },
      { name: "Material", value: "Mesh & Rubber" },
    ],
    questions: [],
    reviews: [
      {
        rating: 5,
        review: "Extremely lightweight and super comfy for workouts.",
        reviewBy: { name: "David K.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
      },
    ],
    subProducts: [
      {
        images: [
          { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", public_id: "img6" },
        ],
        description_images: [],
        color: { color: "#ef4444", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100" },
        sizes: [
          { size: "8", qty: 15, price: 120 },
          { size: "9", qty: 18, price: 120 },
        ],
        discount: 10,
        sold: 340,
        sku: "NIKE-RED-99",
      },
    ],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_5",
    name: "Wireless Noise-Canceling Bluetooth Headphones",
    slug: "wireless-noise-canceling-bluetooth-headphones",
    category: mockCategories[4],
    subCategories: [mockSubCategories[4]],
    brand: "Sony",
    shipping: 0,
    details: [
      { name: "Connectivity", value: "Bluetooth 5.2" },
      { name: "Battery Life", value: "30 Hours" },
    ],
    questions: [],
    reviews: [
      {
        rating: 5,
        review: "Incredible sound clarity and active noise cancellation!",
        reviewBy: { name: "Alex P.", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" },
      },
    ],
    subProducts: [
      {
        images: [
          { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", public_id: "img_elec1" },
        ],
        description_images: [],
        color: { color: "#000000", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" },
        sizes: [
          { size: "Standard", qty: 45, price: 199 },
        ],
        discount: 25,
        sold: 620,
        sku: "SONY-HEAD-01",
      },
    ],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_6",
    name: "Smart Watch Fitness Tracker HR & Sleep Monitor",
    slug: "smart-watch-fitness-tracker-hr-sleep-monitor",
    category: mockCategories[4],
    subCategories: [mockSubCategories[4]],
    brand: "Apple",
    shipping: 0,
    details: [
      { name: "Display", value: "AMOLED" },
      { name: "Water Resistance", value: "50m" },
    ],
    questions: [],
    reviews: [
      {
        rating: 4.9,
        review: "Accurate health metrics and smooth touch interface.",
        reviewBy: { name: "Rachel K.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
      },
    ],
    subProducts: [
      {
        images: [
          { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", public_id: "img_elec2" },
        ],
        description_images: [],
        color: { color: "#374151", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100" },
        sizes: [
          { size: "44mm", qty: 30, price: 249 },
        ],
        discount: 30,
        sold: 810,
        sku: "SMART-WATCH-01",
      },
    ],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }
];

export function initLocalStorageData() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem("amazon_products")) {
    localStorage.setItem("amazon_products", JSON.stringify(mockProducts));
  }
  if (!localStorage.getItem("amazon_categories")) {
    localStorage.setItem("amazon_categories", JSON.stringify(mockCategories));
  }
  if (!localStorage.getItem("amazon_subcategories")) {
    localStorage.setItem("amazon_subcategories", JSON.stringify(mockSubCategories));
  }
}

export function getLocalProducts(): ProductType[] {
  if (typeof window === "undefined") return mockProducts;
  try {
    const data = localStorage.getItem("amazon_products");
    return data ? JSON.parse(data) : mockProducts;
  } catch {
    return mockProducts;
  }
}

export function getLocalProductBySlug(slug: string): ProductType | undefined {
  const products = getLocalProducts();
  return products.find((p) => p.slug === slug || p.name === slug);
}
