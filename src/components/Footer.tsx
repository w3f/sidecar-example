export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Built with{' '}
          <a 
            href="https://github.com/paritytech/substrate-api-sidecar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Substrate API Sidecar
          </a>
        </p>
      </div>
    </footer>
  );
}