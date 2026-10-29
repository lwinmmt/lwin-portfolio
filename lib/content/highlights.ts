// Recent highlights surfaced on home and on the /highlights page.

export type Highlight = {
  title: string;
  /** Optional Vietnamese variant of the title. Skip for proper-noun
   *  titles ("World Cities Summit 2024"); used when the title carries
   *  descriptive prose worth translating. */
  titleVi?: string;
  description: string;
  /** Optional Vietnamese variant of the description. Keep proper
   *  nouns and product names in English, translate only prose. */
  descriptionVi?: string;
  date: string;
  href?: string;
  imageSrc?: string;
  /** Optional CSS `object-position` value for the cover crop. Cards
   *  default to `object-top` which works for portrait subjects, but
   *  some sources have the subject in the lower or off-center region
   *  (team photos where Lwin is at the edge, wide booth shots where
   *  faces sit below the poster). Override per-image to keep the
   *  subject in frame at every aspect ratio. */
  coverFocus?: string;
};

export const highlights:  Highlight[] = [
  {
    "title": "VNTT Internship: IoT & Internal Tools",
    "description": "Built an EdgeX industrial gateway prototype with simulated devices and initiated BecaLearn, an internal onboarding and learning platform.",
    "date": "MAY 2026 to JUL 2026",
    "href": "/projects/becalearn",
    "imageSrc": "/images/highlights/vntt-welcome.jpg"
  },
  {
    "title": "Multi-Cloud Deployment & Failover Demo",
    "description": "Presented the ESMOS architecture and demonstrated geo-routing and regional failover on the team’s deployed AWS/Azure coursework stack.",
    "date": "JAN 2026 to APR 2026",
    "href": "/projects/esmos-multi-cloud"
  },
  {
    "title": "Featured in Singapore Business Review",
    "description": "Osiris featured alongside student entrepreneurs from several institutions in Singapore Business Review.",
    "date": "OCT 2024",
    "href": "https://sbr.com.sg/markets-investing/exclusive/meet-9-singapore-students-promising-business-ventures",
    "imageSrc": "/images/highlights/sbr-osiris-team.jpg",
    "coverFocus": "center 35%"
  },
  {
    "title": "World Cities Summit 2024",
    "description": "Demonstrated remote hydroponic monitoring, lighting and irrigation control to visitors at the SMU IIE booth with the Osiris team.",
    "date": "JUN 2024",
    "href": "https://cityperspectives.smu.edu.sg/special-features/wcs-2024",
    "imageSrc": "/images/highlights/osiris-wcs-2024-rig.jpg",
    "coverFocus": "center 55%"
  },
  {
    "title": "First Place, SMU PMx Internal Product Challenge",
    "description": "Our GrabCompare team placed first with a research-backed proposal, Figma prototype and pitch for comparing ride-hailing options.",
    "date": "OCT 2023",
    "href": "/projects/grabcompare",
    "imageSrc": "/images/highlights/pm-club-grabcompare.webp",
    "coverFocus": "30% 55%"
  },
  {
    "title": "Singapore Indoor Farms Demonstration",
    "description": "Built a single-rack Raspberry Pi demonstration with humidity and CO2 sensing, camera monitoring, and relay control for lighting and a water pump.",
    "date": "2021 to 2022",
    "imageSrc": "/images/highlights/cna-singapore-indoor-farm.webp",
    "href": "/projects/singapore-indoor-farms"
  }
];
