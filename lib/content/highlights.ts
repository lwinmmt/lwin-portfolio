// Recent highlights surfaced on home and on the /highlights page.

export type HighlightTag = "Work" | "Talk" | "Award" | "Press" | "School";

export type Highlight = {
  title: string;
  description: string;
  date: string;
  tag: HighlightTag;
  icon: "grid" | "globe" | "trophy" | "camera" | "book";
  href?: string;
  imageSrc?: string;
};

export const highlights: Highlight[] = [
  {
    title: "AI & IIoT Engineer at VNTT",
    description:
      "Production-scale industrial IoT in Ho Chi Minh City. Learning EdgeX, deploying real systems at scale.",
    date: "MAY 2026",
    tag: "Work",
    icon: "grid",
    href: "https://vntt.com.vn/",
    imageSrc: "/images/highlights/vntt-welcome.jpg",
  },
  {
    title: "World Cities Summit 2024",
    description:
      "Showcased Osiris hydroponics IoT to government stakeholders including Ministers Indranee Rajah and Desmond Lee at the SMU IIE booth.",
    date: "JUN 2024",
    tag: "Talk",
    icon: "globe",
    href: "https://cityperspectives.smu.edu.sg/special-features/wcs-2024",
    imageSrc: "/images/highlights/world-cities-summit-2024.webp",
  },
  {
    title: "Featured in Singapore Business Review",
    description:
      "Osiris named among 9 SMU student ventures with promising business ventures in the SBR exclusive feature.",
    date: "MAY 2024",
    tag: "Press",
    icon: "book",
    href: "https://sbr.com.sg/markets-investing/exclusive/meet-9-singapore-students-promising-business-ventures",
  },
  {
    title: "PM Club Internal Challenge 1st",
    description:
      "Won the SMU Product Management Experience Internal Product Challenge with GrabCompare.",
    date: "OCT 2023",
    tag: "Award",
    icon: "trophy",
    href: "/projects/grabcompare",
    imageSrc: "/images/highlights/pm-club-grabcompare.webp",
  },
  {
    title: "Featured on Channel News Asia",
    description:
      "Singapore Indoor Farms project featured on CNA. One Raspberry Pi with DHT22 humidity, a CO2 sensor, and relay-driven lighting and water-pump control. Simple demo rack, but it landed on national TV.",
    date: "MAY 2022",
    tag: "Press",
    icon: "camera",
    imageSrc: "/images/highlights/cna-singapore-indoor-farm.webp",
  },
];
