export interface Filter {
  country?: string;
  city?: string;
  district?: string[];
  propertyType?: string;
  bedroom?: string[];
  type?: 'sale' | 'rent';
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  floor?: number;
  address?: string;
  sortOption: string;
}
