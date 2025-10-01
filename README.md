# DNS Status Website for dev0-1.com

A React-based DNS ### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### `npm run neon`

Runs the Neon CLI commands for managing your Neon Postgres database.

Example: `npm run neon -- projects list`

See [Neon documentation](https://neon.tech/docs/reference/neon-cli) for more information.

### `npm run vercel`

Runs Vercel CLI commands for managing your Vercel deployments.

Example: `npm run vercel -- --help`

### `npm run deploy`

Deploys your application to Vercel.

For production deployment: `npm run deploy -- --prod`

See [VERCEL.md](VERCEL.md) for detailed deployment instructions.oring dashboard for the domain dev0-1.com owned by @anshulyadav32.

## Features

- 🌐 Real-time DNS record monitoring
- 📊 Comprehensive DNS record display (A, AAAA, MX, NS, CNAME, TXT, SOA)
- 🚀 Fast and responsive interface with fluid design
- 📱 Mobile-first approach with adaptive layouts
- ⚡ Real-time status indicators with visual feedback
- 🔄 Auto-refresh functionality
- 🎨 Modern and clean UI design
- 🧩 Component-based architecture for maintainability

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Styled Components with responsive design
- **DNS Queries**: Google DNS-over-HTTPS API
- **CI/CD**: GitHub Actions with environment-specific deployments
- **Environment Management**: Custom environment variable handling for different deployment targets
- **Deployment**: Vercel with automatic deployments
- **Database**: Neon Postgres serverless database
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Build Tool**: Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Environment Management

This project includes a comprehensive environment management system that handles different deployment environments (development, production, and local). See [ENVIRONMENT.md](ENVIRONMENT.md) for detailed documentation.

### Key Features

- **Environment Templates**: Pre-configured templates for different environments
- **GitHub Actions Workflows**: Automated deployment with environment-specific configurations
- **Secret Management**: Tools to sync environment variables with GitHub Secrets
- **Local Development**: Scripts to generate local environment files

### Quick Start with Environments

1. Generate a local environment file:
   ```bash
   # On Linux/macOS
   ./scripts/generate-env-files.sh local
   
   # On Windows
   .\scripts\generate-env-files.ps1 local
   ```

2. For deployment environments, set up GitHub Secrets using the sync scripts:
   ```bash
   # On Linux/macOS
   ./scripts/sync-env-to-github.sh production
   
   # On Windows
   .\scripts\sync-env-to-github.ps1 production
   ```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
