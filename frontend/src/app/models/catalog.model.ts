export interface ProductImage {
  cdn?: string | null;
  stored_image_id?: string | null;
}

export interface Product {
  id: string;
  store_id: string;
  sku: string;
  name: string;
  description?: string | null;
  category: string;
  price: number;
  currency: string;
  stock_quantity: number;
  unit: string;
  status: string;
  image_url?: string | null;
  image_cdn?: string | null;
  image?: ProductImage | null;
  images?: ProductImage[];
  tags?: string[];
}

export interface Shop {
  id: string;
  name: string;
  city?: string;
  locality?: string;
  shop_type?: string;
  description?: string | null;
}
