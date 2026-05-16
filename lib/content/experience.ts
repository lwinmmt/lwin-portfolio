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
  dates: string;
  initial: string;
  logoSrc?: string;
  type?: EmploymentType;
};

export const experience: ExperienceRole[] = [
  {
    id: "vntt",
    company: "VNTT",
    companyLink: "https://vntt.com.vn/",
    role: "AI & IIoT Engineer",
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
    dates: "May 2021 to Jul 2021",
    initial: "NL",
    logoSrc: "/logos/companies/ntuc-learning-hub.png",
    type: "Full-time",
  },
  {
    id: "w2",
    company: "W2 Industrial Services Hub",
    role: "IoT Solutions Consultant",
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
    dates: "Sep 2020 to Feb 2021",
    initial: "SP",
    logoSrc: "/logos/schools/sp.webp",
    type: "Internship",
  },
  {
    id: "one-alliance-group",
    company: "One Alliance Group",
    role: "Web Developer",
    dates: "Mar 2019 to Jul 2019",
    initial: "OA",
    type: "Freelance",
  },
];
