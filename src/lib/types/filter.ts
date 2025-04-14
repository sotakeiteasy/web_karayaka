export interface Filter {
  country?: string;
  city?: string;
  propertyType?: string;
  type?: "sale" | "rent";
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  floor?: number;
  address?: string;
}
