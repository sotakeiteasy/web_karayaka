# Karayaka Real Estate

Website of Turkish-Russian real estate agency.

🔗 [karayaka.ru](https://karayaka.ru/)

## About

### Pages

```
├── Home
├── Buy
│   └── Listing
├── Rent
│   └── Listing
├── About us
├── Contacts
├── Discounts
├── Offer
├── Blog
│   └── Article
├── Sitemap
└── Privacy Policy
    └── Agreement
```

### Features

- Client-side data filtering for listings
- Multilingual support (ru/en)
- Custom contact form with validation
- Responsive layout across mobile and desktop.
- SEO (metatags, open graph, JSON-scheme, search-engine verification)
- Yandex.Metrika for analytics

## Stack

- **Framework**: Next.js (static export), TypeScript
- **Styling**: SCSS Modules
- **UI Components**: React Select (filterable dropdowns), React Slick (image sliders), Material Design Icons, antd
- **Forms**: React Hook Form (validation), email.js (send email)
- **Data**: Markdown (blog), JSON (listings)
- **Internalization**: next-export-i18n (static export compatible)

## Setup

```bash
# Clone repository
git clone https://github.com/sotakeiteasy/web_karayaka.git
cd web_karayaka

# Install dependencies
npm install

# For better performance, build and start the production server. Recommended =)
npm run build
npm start

# Or start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application

---

© sotakeiteasy. For review only. Any use or distribution without permission is not allowed.
