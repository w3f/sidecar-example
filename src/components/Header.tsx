import { NETWORK_NAME } from '@/config';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Substrate Block Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Simple block explorer for {NETWORK_NAME} built with Next.js and Substrate API Sidecar
          </p>
        </div>
      </div>
    </header>
  );
}