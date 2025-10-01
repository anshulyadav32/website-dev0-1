# Deployment Configuration for dev0-1.com DNS Status Website

## Quick Deploy Commands

### Development
```bash
npm start
# Opens http://localhost:3000
```

### Production Build
```bash
npm run build
# Creates optimized build in ./build directory
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag `build` folder to https://netlify.com/drop
3. Or use Netlify CLI: `netlify deploy --prod --dir=build`

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d build"
npm run deploy
```

## Environment Variables

Create `.env.production` for production settings:
```
REACT_APP_DNS_API_ENDPOINT=https://dns.google/resolve
REACT_APP_DOMAIN=dev0-1.com
REACT_APP_OWNER=anshulyadav32
```

## Build Optimization

The website is optimized for:
- Fast DNS lookups
- Responsive design
- SEO-friendly structure
- Progressive loading
- Cross-browser compatibility

## Domain Configuration

For dev0-1.com, ensure:
1. DNS records are properly configured
2. Domain points to hosting provider
3. SSL certificate is active
4. CDN is configured (optional)

## Performance Monitoring

Monitor the website using:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Chrome DevTools

## Security Headers

Recommended headers for production:
```
Content-Security-Policy: default-src 'self' https://dns.google
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```