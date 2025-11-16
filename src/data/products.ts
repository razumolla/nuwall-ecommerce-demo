export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Minimal Hoodie",
    price: 49,
    image: "/images/hoodie.jpg", // you can use placeholder for now
    description: "Soft cotton hoodie with a clean minimal look.",
    category: "Clothing",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 99,
    image: "/images/headphones.jpg",
    description: "Noise-cancelling wireless headphones for deep focus.",
    category: "Electronics",
  },
];
