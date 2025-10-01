import { useState, useEffect } from 'react';
import { Block } from '@/types/block';

/**
 * Custom hook for managing block data from the Substrate blockchain
 * Fetches the latest block and provides loading/error states
 */
export function useBlockData() {
  const [latestBlock, setLatestBlock] = useState<Block | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the latest block from the Sidecar API
   * Updates the block state and handles error states
   */
  const fetchLatestBlock = async () => {
    setError(null);
    try {
      const response = await fetch('/api/blocks/head');
      if (!response.ok) {
        throw new Error(`Failed to fetch latest block: ${response.statusText}`);
      }
      const block = await response.json();
      setLatestBlock(block);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch block';
      setError(errorMessage);
    }
  };

  // Fetch latest block when component mounts
  useEffect(() => {
    fetchLatestBlock();
  }, []);

  return {
    /** Current latest block data */
    latestBlock,
    /** Error message if fetch failed */
    error,
    /** Function to manually refresh block data */
    fetchLatestBlock,
  };
}