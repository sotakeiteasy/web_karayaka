export interface Filter {
  country?: string;
  city?: string;
  propertyType?: string;
  type?: 'sale' | 'rent';
  minPrice?: number;  
  maxPrice?: number;  
  bedrooms?: number;
  minArea?: number;
  maxArea?: number;
  features?: string[];
  floor?: number;
  open?: boolean;
  closed?: boolean;
  address?: string;
}
