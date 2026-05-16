import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Lwin MMT Portfolio CMS",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons surface as single editable docs.
            S.listItem()
              .title("Profile")
              .child(S.document().schemaType("profile").documentId("profile")),
            S.listItem()
              .title("Bio")
              .child(S.document().schemaType("bio").documentId("bio")),
            S.divider(),
            // Document collections.
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("highlight").title("Highlights"),
            S.documentTypeListItem("experienceRole").title("Experience"),
            S.documentTypeListItem("educationEntry").title("Education"),
            S.documentTypeListItem("communityRole").title("Community Service"),
            S.documentTypeListItem("activity").title("Activities / CCAs"),
            S.documentTypeListItem("award").title("Awards"),
            S.documentTypeListItem("interestGroup").title("Personal Interests"),
            S.documentTypeListItem("certification").title("Certifications"),
            S.documentTypeListItem("skillGroup").title("Skills"),
            S.documentTypeListItem("spokenLanguage").title("Languages"),
            S.documentTypeListItem("usesGroup").title("Uses Groups"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
