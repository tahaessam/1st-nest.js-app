export interface ProductQueryOptions {
  search?: string;
  category?: string;
  brand?: string;
  seller?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
}
