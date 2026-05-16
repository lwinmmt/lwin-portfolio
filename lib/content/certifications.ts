// Professional certifications. Pulled from LinkedIn credential records.

export type CertStatus = "active" | "lapsed" | "recert-in-progress";

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  expiresDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  status: CertStatus;
  logoSrc?: string;
};

export const certifications: Certification[] = [
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect, Associate",
    issuer: "Amazon Web Services",
    issuedDate: "Apr 2024",
    expiresDate: "Apr 2027",
    credentialId: "204e768cb182462994cc13b04f0f9746",
    credentialUrl: "https://www.credly.com/badges/e910b463-9599-4482-9e12-8b066acbf739",
    status: "active",
  },
  {
    id: "azure-fundamentals",
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issuedDate: "Apr 2024",
    credentialId: "1109FB6030BE0C",
    credentialUrl:
      "https://learn.microsoft.com/en-us/users/lwinmmt-5039/credentials/1109fb6030be0c",
    status: "active",
  },
  {
    id: "ceh",
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    issuedDate: "Aug 2021",
    expiresDate: "Aug 2024",
    credentialId: "ECC3261589704",
    credentialUrl:
      "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=WOs8AsH9gnc2Re2hjGo9whQwa7jt1hVo3+yydh6XikA=",
    status: "lapsed",
  },
  {
    id: "aws-ccp",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuedDate: "Jul 2020",
    expiresDate: "Jul 2023",
    credentialId: "GRSKCK82HFE11GCG",
    credentialUrl: "https://www.credly.com/badges/309eee4c-5734-40e3-8acf-ce02f6f67d99",
    status: "lapsed",
  },
  {
    id: "cisco-cybersecurity",
    name: "Cybersecurity Essentials",
    issuer: "Cisco",
    issuedDate: "Aug 2020",
    credentialUrl: "https://www.credly.com/badges/bef6d147-8115-4a25-93b3-3e7987220dc1",
    status: "lapsed",
  },
];
