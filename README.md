# Karayaka Real Estate

A multilingual real estate platform for Karayaka, a small real estate agency operating in Turkey and Russia.

## About

Karayaka Real Estate is a website designed to showcase properties available for rent and sale in Turkey and Russia. The platform serves as the online presence for Karayaka real estate agency, allowing potential clients to:

- Browse available properties by location, type, and price range
- View detailed information about each property including specifications, images, and location details
- Read informative articles about the real estate market in the blog section
- Contact the agency for custom property requests or inquiries
- Access all content in multiple languages (Russian and English)

The site caters primarily to clients looking to invest in or rent properties in Turkey and Russia, with a focus on providing comprehensive information to aid in their decision-making process.

## Tech Stack

- Next.js
- TypeScript
- SCSS Modules
- next-i18next for internationalization
- Ant Design components
- React Select
- React Slick for carousels
- React Hook Form
- Material Design Icons
- Markdown for blog content

## Setup & Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web_karayaka.git
   cd web_karayaka
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Building for Production

```bash
npm run build
npm run start
```

## Internationalization

The application supports both Russian and English languages. Language can be changed by navigating to the corresponding URL path (/ru/... or /en/...).
