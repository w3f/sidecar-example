import { NextResponse } from 'next/server';
import { SIDECAR_BASE_URL } from '@/config';

/**
 * API route to fetch the latest block from Substrate API Sidecar
 * Acts as a proxy to avoid CORS issues when calling Sidecar directly from the browser
 */
export async function GET() {
  try {
    // Fetch latest block from Sidecar API
    const response = await fetch(`${SIDECAR_BASE_URL}/blocks/head`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from Sidecar: ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Sidecar API Error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to Sidecar API. Make sure Sidecar is running on http://127.0.0.1:8080' },
      { status: 500 }
    );
  }
}