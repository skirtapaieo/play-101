import { readSheet } from '@/lib/sheets';
import type { Dashboard } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  let dashboardData: Dashboard | null = null;
  let error: string | null = null;

  try {
    const data = await readSheet('0 - Dashboard', 'A4:D8');

    // Parse dashboard data
    const antalKomplettaPaket = parseInt(data[0]?.[1] || '0');
    const golv = parseInt(data[1]?.[1] || '0');
    const malniva = parseInt(data[2]?.[1] || '0');

    dashboardData = {
      antalKomplettaPaket,
      golv,
      malniva,
    };
  } catch (e: any) {
    error = e.message || 'Failed to load dashboard data';
    console.error('Dashboard error:', e);
  }

  const sections = [
    { href: '/arende', label: 'Ärende', description: 'Hantera ärenden och tickets' },
    { href: '/onboarding', label: 'Onboarding', description: 'Onboarding tracking' },
    { href: '/standardpaket', label: 'Standardpaket', description: 'Standard paketdefinitioner' },
    { href: '/bestallningar', label: 'Beställningar', description: 'Hantera beställningar' },
    { href: '/paket-i-lager', label: 'Paket i Lager', description: 'Paketinventering' },
    { href: '/utrustning', label: 'Utrustning', description: 'Asset tracking' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-6">
            <p className="font-medium">Configuration Required</p>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-sm mt-2">
              Please set up your Google Sheets API credentials in <code>.env.local</code>
            </p>
          </div>
        )}

        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Antal kompletta paket</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.antalKomplettaPaket}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Golv (för nybeställningar)</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.golv}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Målnivå</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.malniva}
              </p>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.label}</h3>
              <p className="text-sm text-gray-600">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
