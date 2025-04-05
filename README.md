# Karayaka Real Estate

Real estate website for a Turkish-Russian agency built with Next.js, focusing on property listings and multilingual content.

## About

**Features:**
- Property listings with filtering (location, type, price, etc.)
- Detailed property pages with specifications and images
- Multilingual support (Russian/English)
- Blog section with industry articles
- Contact forms for custom requests
- Responsive design for all devices
- SEO optimization

## Stack

**Core:**
- Next.js (static export)
- TypeScript
- SCSS Modules 

**UI Components:**
- React Select for filterable dropdowns
- React Slick for image carousels
- React Hook Form for validation
- Material Design Icons

**Data & Content:**
- Markdown for blog posts (Separated server/client code for static export compatibility )
- JSON data for property listings

**Functionality:**
- next-export-i18n for internationalization (static export compatible)
- Client-side data filtering
- Yandex.Metrika for analytics

## Development

### Setup
```bash
# Clone repository
git clone https://github.com/yourusername/web_karayaka.git
cd web_karayaka

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application