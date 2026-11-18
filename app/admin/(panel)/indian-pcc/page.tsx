import { PoliceList } from '@/components/admin/PoliceList';

export const dynamic = 'force-dynamic';

export default function IndianListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; from?: string; to?: string; page?: string; error?: string; saved?: string }>;
}) {
  return <PoliceList kind="indian" searchParams={searchParams} />;
}
