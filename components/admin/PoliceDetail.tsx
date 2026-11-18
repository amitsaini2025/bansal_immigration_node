import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Notice, secondaryButtonClass } from '@/components/admin/ui';
import { asJson, formatWhen, money } from '@/lib/admin/format';
import { getDb } from '@/lib/db';
import { deleteApplication } from '@/app/admin/(panel)/police-actions';

type Kind = 'afp' | 'indian';

const DOCS: Record<Kind, { key: string; label: string }[]> = {
  afp: [
    { key: 'primary_id', label: 'Primary ID' },
    { key: 'secondary_id', label: 'Secondary ID' },
    { key: 'address_proof', label: 'Address proof' },
    { key: 'additional_docs', label: 'Additional documents' },
  ],
  indian: [
    { key: 'primary_id', label: 'Primary ID' },
    { key: 'secondary_id', label: 'Secondary ID' },
    { key: 'address_proof', label: 'Address proof' },
    { key: 'additional_docs', label: 'Additional documents' },
    { key: 'visa_status_doc', label: 'Visa status' },
    { key: 'oci_card_doc', label: 'OCI card' },
    { key: 'india_address_doc', label: 'India address' },
    { key: 'australia_address_doc', label: 'Australia address' },
  ],
};

function Field({ label, value }: { label: string; value: unknown }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm text-slate-900">{value == null || value === '' ? '—' : String(value)}</dd>
    </div>
  );
}

export async function PoliceDetail({
  kind,
  params,
  searchParams,
}: {
  kind: Kind;
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const applicationId = Number(id);
  if (!Number.isInteger(applicationId) || applicationId <= 0) notFound();
  const table = kind === 'afp' ? 'afp_applications' : 'indian_police_applications';
  const listHref = kind === 'afp' ? '/admin/afp' : '/admin/indian-pcc';
  const fileKind = kind === 'afp' ? 'afp' : 'indian';
  const db = getDb();
  const [rows] = await db.query<any[]>(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`, [applicationId]);
  const app = rows[0];
  if (!app) notFound();

  const fields: [string, unknown][] = [
    ['Reference', app.reference],
    ['Status', app.status],
    ['Purpose', app.purpose],
    ['Email', app.email],
    ['Phone', app.phone],
    ['Given names', app.first_names],
    ['Family name', app.family_name],
    ['Date of birth', formatWhen(app.date_of_birth)],
    ['Place of birth', app.birth_place],
    ['Gender', app.gender],
    ['Citizenship', app.citizenship],
    ['Other names', Number(app.has_other_names) === 1 ? 'Yes' : 'No'],
    ['Official fee', money(app.official_fee)],
    ['Service fee', money(app.service_fee)],
    ['Total', money(app.total_amount)],
    ['Payment status', app.stripe_payment_status],
    ['Card', app.card_brand ? `${app.card_brand} •••• ${app.card_last_four || ''}` : null],
    ['Received', formatWhen(app.created_at)],
  ];
  if (kind === 'indian') {
    fields.push(
      ['Spouse', app.spouse_name],
      ['OCI card number', app.oci_card_number],
      ['Preferred consulate', app.preferred_consulate],
      ['Purpose of PCC', app.purpose_of_pcc],
      ['Last departure from India', formatWhen(app.last_departure_from_india)],
      ['Years abroad', app.years_residing_abroad],
      ['Profession', app.profession]
    );
  }

  const blocks = [
    ['Name history', app.name_history],
    ['Address history', app.address_history],
    ...(kind === 'indian'
      ? [
          ['Address state', app.address_state_info],
          ['References', app.references],
        ]
      : []),
    ['Notes', app.notes],
  ] as [string, unknown][];

  return (
    <div className="max-w-4xl">
      <Link href={listHref} className="text-sm text-brand-800 hover:underline">
        Back to list
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">{app.reference}</h1>
      <p className="mt-1 text-sm text-slate-600">
        {app.first_names} {app.family_name}
      </p>
      <Notice error={query.error} saved={query.saved} />
      <dl className="mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <Field key={label} label={label} value={value} />
        ))}
      </dl>
      <div className="mt-4 space-y-4">
        {blocks.map(([label, value]) => {
          const parsed = asJson(value);
          return (
            <section key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-700">{label}</h2>
              {parsed == null || parsed === '' ? (
                <p className="mt-2 text-sm text-slate-500">None</p>
              ) : typeof parsed === 'string' ? (
                <p className="mt-2 whitespace-pre-wrap text-sm">{parsed}</p>
              ) : (
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs text-slate-800">{JSON.stringify(parsed, null, 2)}</pre>
              )}
            </section>
          );
        })}
      </div>
      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-700">Documents</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {DOCS[kind].map((doc) => {
            const stored = app[`${doc.key}_path`];
            return (
              <li key={doc.key} className="flex items-center justify-between gap-3">
                <span>{doc.label}</span>
                {stored ? (
                  <a className="text-brand-800 hover:underline" href={`/admin/files/${fileKind}/${app.id}/${doc.key}`}>
                    Download
                  </a>
                ) : (
                  <span className="text-slate-400">Not uploaded</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <form action={deleteApplication} className="mt-4 rounded-2xl border border-red-200 bg-white p-5">
        <input type="hidden" name="kind" value={kind} />
        <input type="hidden" name="id" value={app.id} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="confirm" value="yes" />
          Delete this application and its documents
        </label>
        <button className={`${secondaryButtonClass} mt-3 border-red-300 text-red-700`} type="submit">
          Delete
        </button>
      </form>
    </div>
  );
}
