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
    price: {
        rub: number;  
        usd: number;  
        try: number; 
    };
    location: {
        country: {
            ru: string;
            en?: string;
            tr?: string;
        };
        city: {
            ru: string;
            en?: string;
            tr?: string;
        };
        district: {
            ru: string;
            en?: string;
            tr?: string;
        };
        address?: {
            street?: {
                ru: string;
                en?: string;
                tr?: string;
            };
            houseNumber?: string;
            postalCode?: string;
        };
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    type: 'sale' | 'rent';
    propertyType: 'apartment' | 'residence' | 'villa' | 'commercial' | 'land';
    features: string[];
    area: number; 
    rooms: number;
    floor: number;
    parking: boolean;
    balcony: boolean;
    furnished: boolean;
    images: string[];
}
