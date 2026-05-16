import { defineType, defineField, defineArrayMember } from "sanity";

// Profile (singleton) ---------------------------------------------------------
const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "greeting", type: "string" }),
    defineField({ name: "school", type: "string" }),
    defineField({ name: "schoolShort", type: "string" }),
    defineField({ name: "schoolLink", type: "url" }),
    defineField({ name: "studentRole", type: "string" }),
    defineField({ name: "currentRole", type: "string" }),
    defineField({ name: "currentOrg", type: "string" }),
    defineField({ name: "currentOrgFullName", type: "string" }),
    defineField({ name: "currentOrgLink", type: "url" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "github", type: "url" }),
    defineField({ name: "linkedin", type: "url" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "currentRole" } },
});

// Project ---------------------------------------------------------------------
const caseStudySection = defineType({
  name: "caseStudySection",
  title: "Case study section",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "body",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
      description: "Paragraphs. Supports [label](url) and **bold** inline.",
    }),
    defineField({
      name: "bullets",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Bulleted points. Same inline syntax as body.",
    }),
  ],
});

const projectLiveLink = defineType({
  name: "projectLiveLink",
  title: "Live link",
  type: "object",
  fields: [
    defineField({ name: "url", type: "url", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
});

const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "course", type: "string" }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({ name: "dates", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Production", value: "Production" },
          { title: "Coursework", value: "Coursework" },
          { title: "Projects", value: "Projects" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "liveLink", type: "url" }),
    defineField({
      name: "liveLinks",
      type: "array",
      of: [defineArrayMember({ type: "projectLiveLink" })],
    }),
    defineField({ name: "repoLink", type: "url" }),
    defineField({ name: "videoLink", type: "url" }),
    defineField({ name: "slidesLink", type: "url" }),
    defineField({ name: "pdfLink", type: "url" }),
    defineField({ name: "newsLink", type: "url" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({
      name: "caseStudy",
      type: "array",
      of: [defineArrayMember({ type: "caseStudySection" })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});

// Highlight -------------------------------------------------------------------
const highlight = defineType({
  name: "highlight",
  title: "Highlight",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "date",
      type: "string",
      description: 'Display string e.g. "JUN 2024".',
    }),
    defineField({
      name: "tag",
      type: "string",
      options: {
        list: ["Work", "Talk", "Award", "Press", "School"],
      },
    }),
    defineField({
      name: "icon",
      type: "string",
      options: { list: ["grid", "globe", "trophy", "camera", "book"] },
    }),
    defineField({ name: "href", type: "url" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "tag", media: "image" } },
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});

// Experience ------------------------------------------------------------------
const experienceRole = defineType({
  name: "experienceRole",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "companyLink", type: "url" }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "dates", type: "string" }),
    defineField({ name: "initial", type: "string" }),
    defineField({ name: "logo", type: "image" }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: ["Internship", "Part-time", "Full-time", "Freelance"],
      },
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "company", subtitle: "role", media: "logo" } },
});

// Education -------------------------------------------------------------------
const educationEntry = defineType({
  name: "educationEntry",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "school", type: "string", validation: (r) => r.required() }),
    defineField({ name: "schoolLink", type: "url" }),
    defineField({ name: "degree", type: "string" }),
    defineField({ name: "dates", type: "string" }),
    defineField({ name: "initial", type: "string" }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "school", subtitle: "degree", media: "logo" } },
});

// Community service -----------------------------------------------------------
const communityRole = defineType({
  name: "communityRole",
  title: "Community Service",
  type: "document",
  fields: [
    defineField({ name: "org", type: "string", validation: (r) => r.required() }),
    defineField({ name: "orgLink", type: "url" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "dates", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "org", subtitle: "role", media: "logo" } },
});

// Activity --------------------------------------------------------------------
const activity = defineType({
  name: "activity",
  title: "Activity / CCA",
  type: "document",
  fields: [
    defineField({ name: "org", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "dates", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "org", subtitle: "role", media: "logo" } },
});

// Award -----------------------------------------------------------------------
const award = defineType({
  name: "award",
  title: "Award",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", type: "string" }),
    defineField({ name: "date", type: "string" }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "image", type: "image" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "issuer", media: "image" } },
});

// Personal interest group -----------------------------------------------------
const interestGroup = defineType({
  name: "interestGroup",
  title: "Personal Interest Group",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "label" } },
});

// Certification ---------------------------------------------------------------
const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", type: "string" }),
    defineField({ name: "issuedDate", type: "string" }),
    defineField({ name: "expiresDate", type: "string" }),
    defineField({ name: "credentialId", type: "string" }),
    defineField({ name: "credentialUrl", type: "url" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["active", "lapsed", "recert-in-progress"] },
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "issuer" } },
});

// Skill group -----------------------------------------------------------------
const skillGroup = defineType({
  name: "skillGroup",
  title: "Skill Group",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "label" } },
});

// Spoken language -------------------------------------------------------------
const spokenLanguage = defineType({
  name: "spokenLanguage",
  title: "Spoken Language",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "level",
      type: "string",
      options: { list: ["Native", "Proficient", "Conversational", "Basic"] },
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "level" } },
});

// Uses group ------------------------------------------------------------------
const usesItem = defineType({
  name: "usesItem",
  title: "Uses item",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "detail", type: "string" }),
    defineField({ name: "link", type: "url" }),
  ],
});

const usesGroup = defineType({
  name: "usesGroup",
  title: "Uses Group",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "usesItem" })],
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "label" } },
});

// Bio (singleton) -------------------------------------------------------------
const bio = defineType({
  name: "bio",
  title: "Bio (singleton)",
  type: "document",
  fields: [
    defineField({ name: "citizenshipNote", type: "text", rows: 2 }),
  ],
});

export const schemaTypes = [
  // Singletons
  profile,
  bio,
  // Documents
  project,
  highlight,
  experienceRole,
  educationEntry,
  communityRole,
  activity,
  award,
  interestGroup,
  certification,
  skillGroup,
  spokenLanguage,
  usesGroup,
  // Objects
  caseStudySection,
  projectLiveLink,
  usesItem,
];
