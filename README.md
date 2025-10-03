
# Afro Food - African Restaurant Website

A modern React website for an authentic African restaurant featuring online ordering, chef services, and traditional cuisine.

## Features

- 🍽️ Interactive menu with filtering and ordering
- 👨‍🍳 Chef booking services
- 🛒 Shopping cart functionality
- 📱 Responsive design
- 🌍 Multi-language support
- 🔥 Traditional African grilled specialties

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Font Awesome, Remix Icons
- **Internationalization**: react-i18next

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd afro-food-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

This project is optimized for deployment on:
- Netlify
- Vercel
- GitHub Pages

### Netlify Deployment

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `out`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── base/           # Basic UI components
│   └── feature/        # Feature-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization
└── router/             # Routing configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
