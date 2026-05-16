/**
 * This route mounts Sanity Studio at /studio.
 *
 * The Studio is a client-side React app that loads next to the public site.
 * Auth is handled by Sanity's own login (sign in with the email you used to
 * create the project at sanity.io).
 *
 * To use: set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in
 * .env.local, then visit /studio.
 */

import { Studio } from "./studio";

// Sanity Studio is a live, auth-gated client app. It must run dynamic.
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <Studio />;
}
