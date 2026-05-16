// Education entries shown compressed on home.

export type EducationEntry = {
  id: string;
  school: string;
  schoolLink?: string;
  degree: string;
  dates: string;
  initial: string;
  logoSrc?: string;
};

export const education: EducationEntry[] = [
  {
    id: "smu",
    school: "Singapore Management University",
    schoolLink: "https://www.smu.edu.sg/",
    degree:
      "Bachelor of Science in Information Systems (Product Development & Business Analytics)",
    dates: "Aug 2023 to Present",
    initial: "SMU",
    logoSrc: "/logos/schools/smu.png",
  },
  {
    id: "sp",
    school: "Singapore Polytechnic",
    schoolLink: "https://www.sp.edu.sg/",
    degree:
      "Diploma in Computer Engineering (Networking & Cybersecurity Track)",
    dates: "Apr 2018 to May 2021",
    initial: "SP",
    logoSrc: "/logos/schools/sp.webp",
  },
];
