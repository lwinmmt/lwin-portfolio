// Long-form bio + supporting content for the /about page.

export const bio = {
  citizenshipNote: "Singaporean. Born in Yangon, Myanmar, moved to Singapore at age 1.",
};

export type CommunityRole = {
  id: string;
  org: string;
  orgLink?: string;
  role: string;
  dates: string;
  description: string;
  logoSrc?: string;
};

export const communityService: CommunityRole[] = [
  {
    id: "touch",
    org: "TOUCH Community Services",
    role: "Meals on Wheels Volunteer",
    dates: "Dec 2025 to Jan 2026",
    description:
      "Delivered meals and provided companionship to homebound elderly through the Meals on Wheels programme.",
    logoSrc: "/logos/communities/touch-community.png",
  },
  {
    id: "heartware",
    org: "Heartware Network",
    role: "Youth Leader (Learner to Champion progression)",
    dates: "Sep 2023 to May 2025",
    description:
      "Progressed through three tiers: Learner (Sep 2023 to Jan 2024, awarded Best Learner), Builder (Feb 2024 to Dec 2024, trained new Learners), Champion (Feb 2025 to May 2025, led volunteer teams across East Coast GRC).",
    logoSrc: "/logos/communities/heartware-network.jpg",
  },
  {
    id: "sp-osip",
    org: "Singapore Polytechnic Overseas Social Innovation Project",
    role: "Student Volunteer (Lead)",
    dates: "Mar 2019",
    description:
      "14-day project in Makassar, Indonesia with Politeknik Negeri Ujung Pandang. Conducted community surveys and applied design thinking to help a local soy sauce business.",
    logoSrc: "/logos/schools/sp.webp",
  },
  {
    id: "slush",
    org: "Slush Singapore",
    role: "Facilitator",
    dates: "Aug 2018 to Sep 2018",
    description:
      "Managed backstage logistics for 70 speakers, ensuring timely arrivals and keynote prep. Oversaw speaker registration and ticketing.",
    logoSrc: "/logos/communities/slush-singapore.png",
  },
  {
    id: "sg100",
    org: "SG100 Foundation",
    role: "Facilitator",
    dates: "Jun 2018 to Jul 2018",
    description:
      "Operated speaker rooms for industry talks on Entrepreneurship and Blockchain (Findjobs, BWG Academy, Ep-Tec). Managed registration for 50+ participants.",
    logoSrc: "/logos/communities/sg100-foundation.jpg",
  },
];

export type Activity = {
  id: string;
  org: string;
  role: string;
  dates: string;
  description?: string;
  logoSrc?: string;
};

export const activities: Activity[] = [
  {
    id: "smu-pm-club",
    org: "SMU Product Management Club",
    role: "Member",
    dates: "Aug 2023 to Dec 2023",
    description:
      "Won 1st place in the SMU Product Management Experience Internal Product Challenge with GrabCompare.",
    logoSrc: "/logos/schools/smu.png",
  },
  {
    id: "sp-dj",
    org: "Singapore Polytechnic Disc Jockey Club",
    role: "Vice President",
    dates: "Nov 2018 to Apr 2020",
    description:
      "Ran 3 to 4 person crews per event. Owned event logistics end-to-end: planning electrical and power setup, transporting club inventory to site, on-site rigging, and scheduling the DJs spinning the slot. Awarded SP CCA Gold with Honours for leadership.",
    logoSrc: "/logos/schools/sp.webp",
  },
  {
    id: "sp-class-chair",
    org: "Singapore Polytechnic",
    role: "Class Chairperson",
    dates: "Apr 2019 to Nov 2019",
    description:
      "Liaison between the lecturer and the cohort. Lecturer had my number, I disseminated to the class. Practical duties: chasing late project submissions, reminding people on deadlines, and coordinating money collection when the lecturer needed notes bought for the class.",
    logoSrc: "/logos/schools/sp.webp",
  },
];

export type Award = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  imageSrc?: string;
};

export const awards: Award[] = [
  {
    id: "best-learner",
    title: "Best Learner Award",
    issuer: "Heartware Network",
    date: "Jan 2024",
    description: "For outstanding contributions in the Sustainable Youth Leadership programme.",
    imageSrc: "/images/awards/best-learner-heartware.webp",
  },
  {
    id: "sp-cca-gold",
    title: "SP CCA Gold with Honours",
    issuer: "Singapore Polytechnic",
    date: "2018 to 2021",
    description: "For exceptional co-curricular contribution and leadership in the DJ Club.",
  },
  {
    id: "sp-eng-show-merit",
    title: "SP Engineering Show Merit Award",
    issuer: "Singapore Polytechnic",
    date: "2021",
    description: "Awarded for the 5G Autonomous Surveillance Vehicle project featured at SP Engineering Show.",
  },
  {
    id: "w2-book-prize",
    title: "W2 Book Prize Award",
    issuer: "Singapore Polytechnic",
    date: "2021",
  },
  {
    id: "directors-honour-roll",
    title: "Director's Honour Roll",
    issuer: "Singapore Polytechnic",
    date: "2020",
  },
];

export type InterestGroup = {
  id: string;
  label: string;
  items: string[];
};

export const personalInterests: InterestGroup[] = [
  {
    id: "motorsports",
    label: "Motorsports & Mobility",
    items: ["Car license", "Motorcycle license", "Pursuing Boat License (PPCDL)"],
  },
  {
    id: "investing",
    label: "Investing",
    items: ["US stock market (consistent contributions)"],
  },
  {
    id: "education",
    label: "Developer YouTube",
    items: ["Theo (t3.gg)", "Mo Bitar", "Fireship"],
  },
  {
    id: "gaming-past",
    label: "Used to Play",
    items: ["Counter Strike Global Offensive (SMFC rank)", "Dota 2", "Minecraft"],
  },
];
