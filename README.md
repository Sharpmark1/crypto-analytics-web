# Crypto Market Analytics

A responsive cryptocurrency market dashboard built with React, TypeScript, and Vite. Track selected crypto assets, compare market prices, and explore historical performance through charts and analytics.

> **Live demo:** [Open Crypto Market Analytics](YOUR_VERCEL_DEPLOYMENT_URL)

> Replace `YOUR_VERCEL_DEPLOYMENT_URL` with your Vercel production URL before publishing this README.

## Screenshots

Add screenshots of the deployed application to `docs/screenshots/`, then update the image paths below.

| Dashboard | Markets |
| --- | --- |
| ![Dashboard](docs/screenshots/dashboard.png) | ![Markets](docs/screenshots/markets.png) |

| Analytics | Returns |
| --- | --- |
| ![Analytics](docs/screenshots/analytics.png) | ![Returns](docs/screenshots/returns.png) |

## Features

- **Market snapshot:** View current prices and 24-hour price changes for Bitcoin, Ethereum, Solana, and Sui.
- **Coin selection:** Switch the selected asset and update the dashboard data and charts.
- **Markets:** Browse supported assets and their available market information.
- **Historical price chart:** Explore historical price movement over the selected time period.
- **Daily returns:** Review daily percentage changes and return trends.
- **Historical analytics:** View calculated statistics such as the highest price, lowest price, average price, and return performance.
- **Watchlist and favorites:** Keep track of selected assets.
- **Dedicated pages:** Navigate between Dashboard, Markets, Analytics, Returns, and Settings.
- **Responsive interface:** Use the dashboard across desktop, tablet, and mobile screen sizes.

## Tech stack

- **React** for the user interface.
- **TypeScript** for type-safe application code.
- **Vite** for development and production builds.
- **React Router** for client-side page navigation.
- **CSS** for layout, styling, and responsive behavior.
- **CoinGecko API** for cryptocurrency market and historical price data.

## Getting started

### Prerequisites

- Node.js and npm installed.
- Git installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sharpmark1/crypto-analytics-web.git
   ```

2. Move into the project directory:

   ```bash
   cd crypto-analytics-web
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in your terminal by Vite.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local development server. |
| `npm run build` | Runs the TypeScript build checks and creates the production build. |
| `npm run preview` | Serves the production build locally for a final check. |

## Data source

Market and historical price data comes from the [CoinGecko API](https://www.coingecko.com/en/api). Data availability and request limits are subject to CoinGecko's API service and terms.

## Deployment

The application is deployed with [Vercel](https://vercel.com/) and connected to the GitHub repository. Pushes to the configured production branch trigger a new deployment.

The project includes a `vercel.json` rewrite rule so direct visits and browser refreshes on React Router routes are served through the app entry point.

## Project structure

```text
src/
├── api/          # API requests
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── pages/        # Dashboard, Markets, Analytics, Returns, Settings
├── types/        # TypeScript types
└── utils/        # Analytics and formatting helpers
```

## Current scope

This project currently focuses on market data and historical price analysis for BTC, ETH, SOL, and SUI. Prices and analytics are informational and should not be treated as financial advice.

## Author

**Sharpmark**

- GitHub: [@Sharpmark1](https://github.com/Sharpmark1)
