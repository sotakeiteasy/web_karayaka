# Karayaka Real Estate

Website of Turkish-Russian real estate agency.

🔗 [karayaka.ru](https://karayaka.ru/)

## About

### Pages

```
└── Home
└── Search
    └── Property Ad
└── About us
└── Custom offers
└── Blog
    └── Article
```

### Features

- Client-side data filtering for listings
- Multilingual support (Ru/En)
- Markdown articles pre-rendered at build time with getStaticProps for static export compatibility.
- Custom contact form with validation
- Responsive layout across mobile and desktop.
- SEO (metatags, open graph, JSON-scheme, search-engine verification)
- Yandex.Metrika for analytics

## Stack

- **Framework**: Next.js (static export), TypeScript
- **Styling**: SCSS Modules
- **UI Components**: React Select (filterable dropdowns), React Slick (image sliders), Material Design Icons
- **Forms**: React Hook Form (validation), email.js (send email)
- **Data**: Markdown (blog), JSON (listings)
- **Internalization**: next-export-i18n (static export compatible)

## Setup

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

---

© sotakeiteasy. For review only. Any use or distribution without permission is not allowed.
