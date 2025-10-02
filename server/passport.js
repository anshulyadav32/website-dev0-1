const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

// Database connection
const prisma = new PrismaClient();

// Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        provider: 'local'
      }
    });

    if (!user) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    if (!user.passwordHash) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// GitHub Strategy (only if credentials are provided)
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_ID !== 'placeholder_github_client_id') {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3001/api/auth/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await prisma.user.findFirst({
        where: {
          providerId: profile.id,
          provider: 'github'
        }
      });

      if (user) {
        return done(null, user);
      }

      // Check if user exists with same email
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.emails[0].value }
      });

      if (existingUser) {
        // Update existing user with GitHub info
        const updatedUser = await prisma.user.update({
          where: { email: profile.emails[0].value },
          data: {
            provider: 'github',
            providerId: profile.id,
            avatarUrl: profile.photos[0].value
          }
        });
        return done(null, updatedUser);
      }

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          email: profile.emails[0].value,
          name: profile.displayName || profile.username,
          provider: 'github',
          providerId: profile.id,
          avatarUrl: profile.photos[0].value,
          isVerified: true
        }
      });

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }));
}

// Google Strategy (only if credentials are provided)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'placeholder_google_client_id') {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await prisma.user.findFirst({
        where: {
          providerId: profile.id,
          provider: 'google'
        }
      });

      if (user) {
        return done(null, user);
      }

      // Check if user exists with same email
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.emails[0].value }
      });

      if (existingUser) {
        // Update existing user with Google info
        const updatedUser = await prisma.user.update({
          where: { email: profile.emails[0].value },
          data: {
            provider: 'google',
            providerId: profile.id,
            avatarUrl: profile.photos[0].value
          }
        });
        return done(null, updatedUser);
      }

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          email: profile.emails[0].value,
          name: profile.displayName,
          provider: 'google',
          providerId: profile.id,
          avatarUrl: profile.photos[0].value,
          isVerified: true
        }
      });

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }));
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;