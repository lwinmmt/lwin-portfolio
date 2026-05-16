// GROQ queries. Hand-written, type-narrowed at the call site.
// All queries assume the schemas in ../schemas/index.ts.

export const PROFILE_QUERY = `*[_type == "profile"][0]{
  name, greeting, school, schoolShort, schoolLink, studentRole,
  currentRole, currentOrg, currentOrgFullName, currentOrgLink,
  location, email, github, linkedin,
  "photoSrc": photo.asset->url
}`;

export const BIO_QUERY = `*[_type == "bio"][0]{ citizenshipNote }`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt desc){
  "slug": slug.current, title, course, description, dates, category, tags,
  liveLink, liveLinks, repoLink, videoLink, slidesLink, pdfLink, newsLink,
  "imageSrc": coverImage.asset->url,
  featured, caseStudy
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  "slug": slug.current, title, course, description, dates, category, tags,
  liveLink, liveLinks, repoLink, videoLink, slidesLink, pdfLink, newsLink,
  "imageSrc": coverImage.asset->url,
  featured, caseStudy
}`;

export const HIGHLIGHTS_QUERY = `*[_type == "highlight"] | order(order asc){
  title, description, date, tag, icon, href,
  "imageSrc": image.asset->url
}`;

export const EXPERIENCE_QUERY = `*[_type == "experienceRole"] | order(order asc){
  "id": _id, company, companyLink, role, dates, initial,
  "logoSrc": logo.asset->url, type
}`;

export const EDUCATION_QUERY = `*[_type == "educationEntry"] | order(order asc){
  "id": _id, school, schoolLink, degree, dates, initial,
  "logoSrc": logo.asset->url
}`;

export const COMMUNITY_QUERY = `*[_type == "communityRole"] | order(order asc){
  "id": _id, org, orgLink, role, dates, description,
  "logoSrc": logo.asset->url
}`;

export const ACTIVITIES_QUERY = `*[_type == "activity"] | order(order asc){
  "id": _id, org, role, dates, description,
  "logoSrc": logo.asset->url
}`;

export const AWARDS_QUERY = `*[_type == "award"] | order(order asc){
  "id": _id, title, issuer, date, description,
  "imageSrc": image.asset->url
}`;

export const INTERESTS_QUERY = `*[_type == "interestGroup"] | order(order asc){
  "id": _id, label, items
}`;

export const CERTIFICATIONS_QUERY = `*[_type == "certification"] | order(order asc){
  "id": _id, name, issuer, issuedDate, expiresDate,
  credentialId, credentialUrl, status
}`;

export const SKILLS_QUERY = `*[_type == "skillGroup"] | order(order asc){
  "id": _id, label, items
}`;

export const LANGUAGES_QUERY = `*[_type == "spokenLanguage"] | order(order asc){
  name, level
}`;

export const USES_QUERY = `*[_type == "usesGroup"] | order(order asc){
  "id": _id, label, description, items
}`;
