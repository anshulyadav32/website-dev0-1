# Anshul Yadav - Developer Portfolio

## 🚀 Developer 0 → No.1

Welcome to my developer portfolio showcasing open source projects and professional development journey.

### 🌐 Live Demo
- **Homepage**: [https://dev0-1.com](https://dev0-1.com)
- **Dashboard**: [https://dev0-1.com/dashboard](https://dev0-1.com/dashboard)

### 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Styled Components for styling
- React Router for navigation
- Context API for state management

**Backend:**
- Node.js with Express
- PostgreSQL with Prisma ORM
- Passport.js for authentication
- JWT for token management

**Authentication:**
- Local email/password
- GitHub OAuth
- Google OAuth

**Database:**
- Neon PostgreSQL (cloud)
- Prisma ORM
- Database migrations

### 🚀 Features

- **Portfolio Homepage**: Professional developer showcase
- **DNS Management**: Full-featured DNS record management
- **Authentication System**: Multi-provider login
- **Real-time Monitoring**: DNS status tracking
- **Responsive Design**: Mobile-first approach
- **Open Source**: All code available on GitHub

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/anshulyadav32/website-dev0-1.git
cd website-dev0-1

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
npm run db:generate
npm run db:push
npm run db:seed

# Start development server
npm run dev:react
```

### 🔧 Available Scripts

```bash
# Development
npm run dev:react    # Start both frontend and backend
npm run start:react  # Start React app only
npm run api:dev      # Start API server only

# Production
npm run build        # Build for production
npm run api          # Start production API server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

### 🌍 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# API Configuration
API_PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT & Session Secrets
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# OAuth (Optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# DNS Configuration
DNS_PROVIDER=digitalocean
DNS_API_TOKEN=your_dns_api_token
DOMAIN_NAME=dev0-1.com
```

### 📱 Pages

- **Homepage** (`/`): Developer portfolio and project showcase
- **Authentication** (`/auth`): Login and registration
- **Dashboard** (`/dashboard`): DNS management interface
- **Admin** (`/admin`): Administrative functions

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is open source and available under the [MIT License](LICENSE).

### 👨‍💻 Author

**Anshul Yadav**
- GitHub: [@anshulyadav32](https://github.com/anshulyadav32)
- Email: anshul@dev0-1.com
- Website: [dev0-1.com](https://dev0-1.com)

### 🙏 Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent ORM
- Neon for the PostgreSQL hosting
- All open source contributors

---

**Developer 0 → No.1** - Continuous learning and improvement in the tech world! 🚀