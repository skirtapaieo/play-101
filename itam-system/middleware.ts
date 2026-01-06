export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/arende/:path*', '/onboarding/:path*', '/standardpaket/:path*', '/bestallningar/:path*', '/paket-i-lager/:path*', '/utrustning/:path*'],
};
