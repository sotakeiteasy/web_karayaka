export interface Ad {
  id: string;
  man: string | null;
  number: string | null;
  info: string | null;
  description: {
    ru: string | null;
    en: string | null;
  };
  price: Price;
  location: {
    country: 'Turkey' | 'Russia';
    city: string;
    district: string | null;
  };
  type: 'sale' | 'rent';
  propertyType: 'apartment' | 'villa' | 'commercial' | 'land';
  area: number;
  rooms: string | null;
  bathroom: number | null;
  age: string | null;
  situation: 'tenanted' | 'owner' | 'empty' | 'free';
  floor: number | null;
  floorInHouse: number | null;
  parking: 'open' | 'closed' | 'both' | null;
  images: string[];
}

type Price = {
  rub?: number | null;
  try?: number | null;
} & (
  | {
      rub: number;
    }
  | {
      try: number;
    }
);
