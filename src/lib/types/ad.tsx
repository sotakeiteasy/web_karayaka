export interface Ad {
    id: string;
    title: {
        ru: string;
        en?: string;
        tr?: string;
    };
    description: {
        ru: string;
        en?: string;
        tr?: string;
    };
    price: number;
    location: {
        country: string;
        city: string;
        district: string;
        address?: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    type: 'sale' | 'rent';
    features: string[];
    area: number; 
    bedrooms: number;
    bathrooms: number;
    images: string[];
    createdAt: string;
}

