import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Simple user database - in production, use a real database
// For now, using environment variables
const users = [
  {
    id: '1',
    username: process.env.ADMIN_USERNAME || 'admin',
    passwordHash: process.env.ADMIN_PASSWORD_HASH || '', // bcrypt hash
    name: 'Admin User',
    role: 'admin',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = users.find((u) => u.username === credentials.username);

        if (!user) {
          return null;
        }

        // For development: allow plain password "admin" if no hash is set
        if (!user.passwordHash && credentials.password === 'admin') {
          return {
            id: user.id,
            name: user.name,
            email: user.username,
            role: user.role,
          };
        }

        // Verify password with bcrypt
        if (user.passwordHash) {
          const isValid = await compare(credentials.password, user.passwordHash);
          if (!isValid) {
            return null;
          }
        }

        return {
          id: user.id,
          name: user.name,
          email: user.username,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
