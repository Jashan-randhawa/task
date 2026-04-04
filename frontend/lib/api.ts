import type { RequirementPayload } from '../components/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:1337';

type StrapiCreateResponse = {
  data: {
    id: number;
    documentId: string;
    hiringFor: string;
  };
};

export async function createRequirement(payload: RequirementPayload): Promise<StrapiCreateResponse> {
  const response = await fetch(`${API_BASE_URL}/api/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload })
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: { message: 'Request failed' } }));
    throw new Error(errorBody?.error?.message ?? 'Failed to create requirement');
  }

  return response.json();
}
