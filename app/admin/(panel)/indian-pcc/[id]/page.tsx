import { PoliceDetail } from '@/components/admin/PoliceDetail';

export const dynamic = 'force-dynamic';

export default function IndianDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  return <PoliceDetail kind="indian" params={params} searchParams={searchParams} />;
}
