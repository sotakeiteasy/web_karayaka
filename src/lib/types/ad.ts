import { PriceType, CountryType, SearchType, PropertyType, SituationType, ParkingType } from './FilterTypes';

export interface Ad {
  id: string;
  publicationDate: string | null;
  man: string | null;
  number: string | null;
  info: string | null;
  description: {
    ru: string | null;
    en: string | null;
  };
  price: PriceType;
  location: {
    country: CountryType;
    city: string;
    district: string | null;
  };
  type: SearchType;
  propertyType: PropertyType;
  area: number;
  rooms: string | null;
  bathroom: number | null;
  age: string | null;
  situation: SituationType;
  floor: number | null;
  floorInHouse: number | null;
  parking: ParkingType | null;
  images: string[];
}
