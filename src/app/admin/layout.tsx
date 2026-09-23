import type { Metadata } from 'next';

// Admin screens must never be indexed, whether or not the visitor is signed in.
export const metadata: Metadata = {
  title: 'Eclavin admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
