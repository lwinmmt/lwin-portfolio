// Sanity environment configuration. Reads from .env.local.
//
// To wire this up for real:
//   1. Sign up at sanity.io and create a project.
//   2. Add the project ID to .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID="your-id".
//   3. Use the dataset name you picked (default "production").
//   4. Generate a read token for the production dataset and set
//      SANITY_API_READ_TOKEN if you want to read drafts on the server side.
//
// Until those env vars are set, the site continues to read from the
// typed lib/content/*.ts modules. The CMS infrastructure is in place
// either way.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // During build or first-run when env vars are not set yet, fall back to
    // sane defaults so the app does not hard-crash. Pages still read from
    // lib/content. The Studio at /studio will not load until env vars are set.
    if (process.env.NODE_ENV !== "production") {
       
      console.warn(errorMessage);
    }
    return "" as T;
  }
  return v;
}

export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET,
);
