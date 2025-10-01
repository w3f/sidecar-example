/**
 * Utility functions for the block explorer
 */

/**
 * Truncates a hash to show first 8 and last 8 characters
 * @param hash - The full hash string
 * @returns Truncated hash in format "12345678...87654321"
 */
export const shortHash = (hash: string) => `${hash.slice(0, 8)}...${hash.slice(-8)}`;

/**
 * Formats a block number string with thousands separators
 * @param number - Block number as string
 * @returns Formatted number with commas (e.g., "1,234,567")
 */
export const formatBlockNumber = (number: string) => parseInt(number).toLocaleString();

/**
 * Calculates statistics for extrinsics in a block
 * @param extrinsics - Array of extrinsic objects
 * @returns Object with total, successful, and failed counts
 */
export const getExtrinsicStats = (extrinsics: any[]) => {
  const successful = extrinsics.filter(ext => ext.success).length;
  const failed = extrinsics.length - successful;
  
  return {
    total: extrinsics.length,
    successful,
    failed
  };
};
