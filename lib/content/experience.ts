// Work experience timeline shown compressed on home; full bullets live on /resume.

export type EmploymentType =
  | "Internship"
  | "Part-time"
  | "Full-time"
  | "Freelance";

export type ExperienceRole = {
  id: string;
  company: string;
  companyLink?: string;
  role: string;
  /** Optional Vietnamese variant of the role title. Translate
   *  descriptive titles ("Founder", "Web Developer"); keep highly
   *  technical English titles ("AI & IIoT Engineer") as-is. */
  roleVi?: string;
  dates: string;
  initial: string;
  logoSrc?: string;
  type?: EmploymentType;
};

// Type label translations. Used by the rendering component to localize
// the small chip next to the company name.
export const EMPLOYMENT_TYPE_VI: Record<EmploymentType, string> = {
  Internship: "Thực tập",
  "Part-time": "Bán thời gian",
  "Full-time": "Toàn thời gian",
  Freelance: "Tự do",
};

export const experience: ExperienceRole[] = [
  {
    id: "vntt",
    company: "VNTT",
    companyLink: "https://vntt.com.vn/",
    role: "AI & IIoT Engineer",
    roleVi: "Kỹ sư AI & IIoT",
    dates: "May 2026 to Present",
    initial: "V",
    logoSrc: "/logos/companies/vntt.png",
    type: "Internship",
  },
  {
    id: "nepseeds",
    company: "Nepseeds",
    companyLink: "https://nepseeds.com/",
    role: "Co-Founder & Operations Lead",
    roleVi: "Đồng sáng lập & Trưởng vận hành",
    dates: "Jul 2021 to Present",
    initial: "N",
    logoSrc: "/logos/companies/nepseeds.avif",
    type: "Part-time",
  },
  {
    id: "osiris",
    company: "Osiris Technology",
    companyLink: "https://osiris.so/",
    role: "Founder",
    roleVi: "Nhà sáng lập",
    dates: "Dec 2023 to Jul 2024",
    initial: "O",
    logoSrc: "/logos/companies/osiris.png",
    type: "Full-time",
  },
  {
    id: "ntuc",
    company: "NTUC LearningHub",
    companyLink: "https://www.ntuclearninghub.com/",
    role: "Information Technology Executive",
    roleVi: "Chuyên viên Công nghệ thông tin",
    dates: "May 2021 to Jul 2021",
    initial: "NL",
    logoSrc: "/logos/companies/ntuc-learning-hub.png",
    type: "Full-time",
  },
  {
    id: "w2",
    company: "W2 Industrial Services Hub",
    role: "IoT Solutions Consultant",
    roleVi: "Tư vấn giải pháp IoT",
    dates: "Mar 2021 to Jul 2021",
    initial: "W",
    logoSrc: "/logos/companies/w2-industrial.jpg",
    type: "Freelance",
  },
  {
    id: "sp-iot",
    company: "Singapore Polytechnic",
    companyLink: "https://www.sp.edu.sg/",
    role: "IoT Engineering Intern",
    roleVi: "Thực tập sinh kỹ thuật IoT",
    dates: "Sep 2020 to Feb 2021",
    initial: "SP",
    logoSrc: "/logos/schools/sp.webp",
    type: "Internship",
  },
  {
    id: "one-alliance-group",
    company: "One Alliance Group",
    role: "Web Developer",
    roleVi: "Lập trình viên Web",
    dates: "Mar 2019 to Jul 2019",
    initial: "OA",
    type: "Freelance",
  },
];
