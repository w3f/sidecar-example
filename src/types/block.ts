/**
 * TypeScript interfaces for Substrate API Sidecar responses
 */

/**
 * Represents a blockchain block with all its components
 */
export interface Block {
  number: string;           // Block number as string
  hash: string;            // Block hash
  parentHash: string;      // Previous block hash
  extrinsics: Extrinsic[]; // Array of transactions/calls in this block
  onFinalize: {            // Events that occurred during block finalization
    events: Event[];
  };
  onInitialize?: {         // Events that occurred during block initialization
    events: Event[];
  };
}

/**
 * Represents a single extrinsic (transaction/call) in a block
 */
export interface Extrinsic {
  method: {
    pallet: string;        // The pallet (module) name
    method: string;        // The method name within the pallet
  };
  signature?: {           // Signature data for signed extrinsics (null for inherent)
    signer?: string;      // Address of the signer
    signature?: string;   // The actual signature
  } | null;
  nonce?: string;         // Transaction nonce
  args?: any;            // Arguments passed to the method call
  tip?: string;          // Optional tip for transaction priority
  hash: string;          // Extrinsic hash
  info?: any;           // Additional metadata
  era?: any;            // Transaction era information
  events?: Event[];     // Events emitted by this extrinsic
  success: boolean;     // Whether the extrinsic executed successfully
  paysFee: boolean;     // Whether this extrinsic requires a fee payment
}

/**
 * Represents an event emitted during block execution
 */
export interface Event {
  method: {
    pallet: string;       // The pallet that emitted this event
    method: string;       // The event name
  };
  data: any[];           // Event data/parameters
}