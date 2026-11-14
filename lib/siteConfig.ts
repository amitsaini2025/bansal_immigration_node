/**
 * Facts the business still needs to confirm. Leave a value as null until it is known:
 * the pages simply leave that detail out. See pending-questions.md.
 */
export const GOOGLE_RATING = '4.9';
/** e.g. 212. When null, the rating is shown without a count. */
export const GOOGLE_REVIEW_COUNT: number | null = null;
/** Link to the Google Business Profile reviews. When null, the rating is not a link. */
export const GOOGLE_PROFILE_URL: string | null = null;

/**
 * Name and MARN of the registered agent who reviewed the skilled migration pages,
 * e.g. 'Arun Bansal, MARN 2418466'. When null, no reviewer line is shown. Only set it once that person agrees.
 */
export const SKILLED_PAGE_REVIEWER: string | null = null;
/** Date the skilled migration pages were last checked, shown under the heading. */
export const SKILLED_PAGE_UPDATED = '2026-11-14';
