// Education entries shown compressed on home.

export type EducationEntry = {
  id: string;
  school: string;
  schoolLink?: string;
  degree: string;
  /** Optional Vietnamese variant of the degree label. School names
   *  stay in their original English form. */
  degreeVi?: string;
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
    degreeVi:
      "Cử nhân Khoa học Hệ thống Thông tin (Phát triển Sản phẩm & Phân tích Kinh doanh)",
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
    degreeVi:
      "Cao đẳng Kỹ thuật Máy tính (chuyên ngành Mạng & An ninh mạng)",
    dates: "Apr 2018 to May 2021",
    initial: "SP",
    logoSrc: "/logos/schools/sp.webp",
  },
];
