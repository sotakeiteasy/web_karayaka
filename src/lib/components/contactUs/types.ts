export type Inputs = {
  name: string;
  surname?: string;
  location: string[];
  purpose: string[];
  city?: string;
  district?: string;
  budget?: string;
  phone_number: string;
  email: string;
  message?: string;
}

export type LocationKey = 'Russia' | 'Turkey';

export type PurposeKey = 'Buy' | 'Rent';
