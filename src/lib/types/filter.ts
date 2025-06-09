import { SearchType } from './FilterTypes/SearchType';

export interface Filter {
  country?: string;
  city?: string;
  district?: string[];
  propertyType?: string;
  bedroom?: string[];
  type: SearchType;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  floor?: number;
  address?: string;
  sortOption: string;
}
