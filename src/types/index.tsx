// product and order related types
type Category = {
  id: number;
  name: string;
  image: string;
  slug: string;
};

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
