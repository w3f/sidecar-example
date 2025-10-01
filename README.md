# Simple Substrate Block Explorer

A clean, single-page block explorer built with Next.js and Substrate API Sidecar. This serves as a template for building blockchain explorers for Substrate-based networks.

## Quick Start

```bash
# Install dependencies
npm install

# Start your local Substrate node with Sidecar
# Make sure Sidecar is running on http://127.0.0.1:8080

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the block explorer.

This explorer uses **Next.js API Route Handlers** to proxy requests to your local Substrate API Sidecar instance, avoiding CORS issues

#### API Routes

- `GET /api/blocks/head` - Proxies to `http://127.0.0.1:8080/blocks/head`  

## Configuration

All configuration is centralized in `src/config.ts`. To connect to a different Sidecar instance or network:

```typescript
// src/config.ts
export const SIDECAR_BASE_URL = 'http://127.0.0.1:8080'; // Change this URL
export const NETWORK_NAME = 'Local Substrate Node';       // Change network name
export const NETWORK_SYMBOL = 'UNIT';                     // Change token symbol
```

## Prerequisites

1. **Substrate Node**: Running locally or remotely
2. **Substrate API Sidecar**: Connected to your node

### Setting up Sidecar

```bash
# Install Sidecar globally
npm install -g @substrate/api-sidecar

# Run Sidecar (connects to ws://127.0.0.1:9944 by default)  
substrate-api-sidecar

# Or connect to a specific node
SAS_SUBSTRATE_URL=wss://polkadot-asset-hub-rpc.polkadot.io substrate-api-sidecar
```

## Troubleshooting

### Common Issues

- **CORS Errors**: Make sure you're accessing the app through the Next.js dev server, not opening the HTML file directly
- **Sidecar Connection**: Ensure Sidecar is running on the expected URL (check `src/config.ts`)
- **Block Not Found**: Some block numbers/hashes might not exist on your local chain

## Customization

### Adding New Features

The code is intentionally simple to make it easy to extend:

1. **Add account lookup**: Create `/api/accounts/[address]/route.ts`
2. **Add more endpoints**: Follow the same pattern for other Sidecar endpoints  
3. **Add network selector**: Support multiple networks in one interface
4. **Add real-time updates**: Use WebSockets for live block updates

### Styling

Built with Tailwind CSS. Modify styles directly in the JSX or customize the theme in `tailwind.config.ts`.

## Learn More

- [Substrate API Sidecar Documentation](https://paritytech.github.io/substrate-api-sidecar/dist/)
- [Substrate API Sidecar GitHub](https://github.com/paritytech/substrate-api-sidecar)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## License

MIT License - feel free to use this as a template for your own projects!
