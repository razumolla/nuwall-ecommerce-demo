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

// PiWall API  types
export type PiWallCategory = {
  id: number;
  name: string;
};

export interface PiWallProduct {
  id: number;
  name: string;
  description: string;
  sku: string;
  category: PiWallCategory;
  price: number;
  formatted_price: string;
  mrp: number;
  formatted_mrp: string;
  discount_percent: number;
  product_type: string;
  product_type_code: string;
  dimensions: string;
  main_image: string;
  image_version: string;
  is_available: boolean;
  stock_quantity: number;
  dealer_available_qty: number;
  image_count: number;
  last_updated: string; // ISO string
}

export interface PiWallProductsResponse {
  status: string;
  data: PiWallProduct[];
}
