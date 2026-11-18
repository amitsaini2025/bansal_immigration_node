import { PoliceDetail } from '@/components/admin/PoliceDetail';

export const dynamic = 'force-dynamic';

export default function AfpDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  return <PoliceDetail kind="afp" params={params} searchParams={searchParams} />;
}
