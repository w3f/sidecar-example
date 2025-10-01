'use client';

import { 
  Header, 
  Footer, 
  BlockCard, 
  ErrorMessage, 
  LoadingSpinner 
} from '@/components';
import { useBlockData } from '@/hooks/useBlockData';
import { formatBlockNumber } from '@/lib/utils';

export default function BlockExplorer() {
  // Hook to manage latest block data
  const {
    latestBlock,
    error,
    fetchLatestBlock,
  } = useBlockData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {/* Error handling */}
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={fetchLatestBlock}
          />
        )}

        {/* Latest block display */}
        {latestBlock ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Latest Block
              </h2>
              <button
                onClick={fetchLatestBlock}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
              >
                Refresh
              </button>
            </div>
            <BlockCard 
              block={latestBlock} 
              title={`Block #${formatBlockNumber(latestBlock.number)}`} 
            />
          </div>
        ) : !error && (
          <LoadingSpinner message="Loading latest block..." />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
