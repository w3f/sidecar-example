import { Block } from '@/types/block';
import { shortHash, formatBlockNumber, getExtrinsicStats } from '@/lib/utils';

interface BlockCardProps {
  block: Block;
  title: string;
}

/**
 * Component that displays detailed information about a blockchain block
 * Shows block summary stats, details, extrinsics, and events
 */
export default function BlockCard({ block, title }: BlockCardProps) {
  // Calculate extrinsic statistics
  const stats = getExtrinsicStats(block.extrinsics || []);
  
  // Count total events from both initialization and finalization
  const totalEvents = (block.onFinalize?.events?.length || 0) + (block.onInitialize?.events?.length || 0);
  
  // Get all extrinsics (no need to separate user vs system)
  const allExtrinsics = block.extrinsics || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
      
      {/* Block Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            #{formatBlockNumber(block.number)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Block Number</div>
        </div>
        
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.total}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Extrinsics</div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.successful}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Successful</div>
        </div>
        
        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {totalEvents}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Events</div>
        </div>
      </div>

      {/* Block Details */}
      <div className="space-y-2 text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Hash:</span>
          <span className="font-mono text-gray-900 dark:text-white">{shortHash(block.hash)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Parent Hash:</span>
          <span className="font-mono text-gray-900 dark:text-white">{shortHash(block.parentHash)}</span>
        </div>
      </div>

      {/* Show failed extrinsics if any */}
      {stats.failed > 0 && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
          <p className="text-red-800 dark:text-red-200 text-sm">
            ⚠️ {stats.failed} failed extrinsic{stats.failed > 1 ? 's' : ''} in this block
          </p>
        </div>
      )}

      {/* Extrinsics */}
      {allExtrinsics.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Extrinsics ({allExtrinsics.length})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allExtrinsics.map((extrinsic, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">#{index}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {extrinsic.method?.pallet || 'unknown'}.{extrinsic.method?.method || 'unknown'}
                    </div>
                    {typeof extrinsic.signature === 'object' && extrinsic.signature?.signer && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                        From: {shortHash(extrinsic.signature.signer)}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                      {shortHash(extrinsic.hash)}
                    </div>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${extrinsic.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events */}
      {totalEvents > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Events ({totalEvents})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {/* All Events */}
            {[
              ...(block.onInitialize?.events || []),
              ...(block.onFinalize?.events || [])
            ].slice(0, 15).map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">#{index}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.method?.pallet || 'unknown'}.{event.method?.method || 'unknown'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {totalEvents > 15 && (
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                ... and {totalEvents - 15} more events
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}