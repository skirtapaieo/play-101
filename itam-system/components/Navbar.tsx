'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/arende', label: 'Ärende' },
    { href: '/onboarding', label: 'Onboarding' },
    { href: '/standardpaket', label: 'Standardpaket' },
    { href: '/bestallningar', label: 'Beställningar' },
    { href: '/paket-i-lager', label: 'Paket i Lager' },
    { href: '/utrustning', label: 'Utrustning' },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">ITAM</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {session && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
