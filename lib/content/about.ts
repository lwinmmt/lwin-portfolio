// Long-form bio + supporting content for the /about page.
//
// (The previous `bio` const carried a citizenship note that was never
// rendered anywhere. Removed as part of the bloat sweep. If the
// citizenship line ever needs to surface, add it as an i18n key
// instead so it routes through pickLocalized properly.)

export type CommunityRole = {
  id: string;
  org: string;
  orgLink?: string;
  role: string;
  /** Optional Vietnamese variant of the role. */
  roleVi?: string;
  dates: string;
  description?: string;
  bullets?: string[];
  /** Optional Vietnamese variant of the description. */
  descriptionVi?: string;
  logoSrc?: string;
  /** Display scale for logos supplied with extra surrounding whitespace. */
  logoScale?: number;
};

export const communityService: CommunityRole[] = [
  {
    "id": "touch",
    "org": "TOUCH Community Services",
    "role": "Meals on Wheels Volunteer",
    "dates": "Dec 2025 to Jan 2026",
    "description": "Delivered meals and provided companionship to homebound elderly residents through the Meals on Wheels programme.",
    "logoSrc": "/logos/communities/touch-community.png"
  },
  {
    "id": "heartware",
    "org": "Heartware Network",
    "role": "Youth Volunteer and Leader (Learner to Champion)",
    "dates": "Sep 2023 to May 2025",
    "bullets": [
      "Champion (Feb to May 2025): Coordinated youth volunteer teams and responsibilities for community engagement activities and events across East Coast GRC.",
      "Builder (Feb to Dec 2024): Trained and mentored new Learners, conducted facilitator training sessions and supported volunteer deployment and logistics.",
      "Learner (Sep 2023 to Jan 2024): Engaged residents through door-to-door outreach, youth-festival booths with the Singapore Police Force and cultural activities for elderly residents. Received the Best Learner Award."
    ],
    "logoSrc": "/logos/communities/heartware-network.jpg"
  },
  {
    "id": "minds",
    "org": "MINDS",
    "role": "Volunteer",
    "dates": "Jul 2019",
    "description": "Assisted children with special needs during developmental classes.",
    "logoSrc": "/logos/communities/minds.png",
    "logoScale": 1.15
  },
  {
    "id": "sp-osip",
    "org": "Singapore Polytechnic Overseas Social Innovation Project",
    "role": "Student Volunteer (Lead)",
    "dates": "Mar 2019",
    "description": "Led a 14-day project in Makassar with Politeknik Negeri Ujung Pandang. Conducted community surveys and used design thinking to develop proposals for a local soy-sauce business, then presented them to the owner.",
    "logoSrc": "/logos/schools/sp.webp"
  },
  {
    "id": "ymca",
    "org": "YMCA",
    "role": "Volunteer",
    "dates": "Mar 2019",
    "description": "Supported fundraising and awareness activities for the Pioneer Generation.",
    "logoSrc": "/logos/communities/ymca-singapore.png",
    "logoScale": 3.25
  },
  {
    "id": "slush",
    "org": "Slush Singapore",
    "role": "Facilitator",
    "dates": "Aug 2018 to Sep 2018",
    "description": "Supported speaker arrivals, backstage logistics, keynote preparation and registration at an event featuring 70 speakers.",
    "logoSrc": "/logos/communities/slush-singapore.png"
  },
  {
    "id": "sg100",
    "org": "SG100 Foundation",
    "role": "Facilitator",
    "dates": "Jun 2018 to Jul 2018",
    "description": "Supported speaker coordination, room logistics and registration for entrepreneurship and blockchain talks attended by approximately 50 participants.",
    "logoSrc": "/logos/communities/sg100-foundation.jpg"
  },
  {
    "id": "presidents-challenge",
    "org": "Singapore Polytechnic",
    "role": "President’s Challenge Volunteer",
    "dates": "Apr 2018",
    "description": "Supported fundraising activities for voluntary welfare organisations.",
    "logoSrc": "/logos/schools/sp.webp"
  }
];

export type Activity = {
  id: string;
  org: string;
  role: string;
  roleVi?: string;
  dates: string;
  description?: string;
  descriptionVi?: string;
  logoSrc?: string;
};

export const activities: Activity[] = [
  {
    "id": "smu-pm-club",
    "org": "SMU Product Management Club",
    "role": "Member",
    "dates": "Aug 2023 to Dec 2023",
    "description": "Worked with the GrabCompare team on problem research, a business case, Figma prototype and pitch. Our team placed first in the club’s internal product challenge.",
    "logoSrc": "/logos/schools/smu.png"
  },
  {
    "id": "sp-dj",
    "org": "Singapore Polytechnic Disc Jockey Club",
    "role": "Vice President",
    "dates": "Nov 2018 to Apr 2020",
    "description": "Trained junior members and coordinated 3–4-person event crews, equipment transport, electrical and power setup, on-site installation and DJ schedules.",
    "logoSrc": "/logos/schools/sp.webp"
  },
  {
    "id": "sp-class-chair",
    "org": "Singapore Polytechnic",
    "role": "Class Chairperson",
    "dates": "Apr 2019 to Nov 2019",
    "description": "Served as the liaison between lecturers and classmates, communicated deadlines, coordinated activities and organised payments for class materials.",
    "logoSrc": "/logos/schools/sp.webp"
  }
];

export type Award = {
  id: string;
  title: string;
  /** Optional Vietnamese variant of the title. */
  titleVi?: string;
  issuer: string;
  date: string;
  description?: string;
  descriptionVi?: string;
  imageSrc?: string;
};

export const awards: Award[] = [
  {
    "id": "best-learner",
    "title": "Best Learner Award",
    "issuer": "Heartware Network",
    "date": "Jan 2024",
    "description": "For outstanding contributions in the Sustainable Youth Leadership programme.",
    "imageSrc": "/images/awards/best-learner-heartware.webp"
  },
  {
    "id": "grabcompare-first",
    "title": "First Place, PMx Internal Product Challenge",
    "issuer": "SMU Product Management Club · Team award",
    "date": "Oct 2023"
  },
  {
    "id": "seagate-fourth",
    "title": "Fourth Place, Seagate Lyve Cloud Hackathon",
    "issuer": "Team award",
    "date": "2022"
  },
  {
    "id": "w2-book-prize",
    "title": "W2 Book Prize Award",
    "issuer": "Singapore Polytechnic",
    "date": "Feb 2021"
  },
  {
    "id": "sp-eng-show-merit",
    "title": "SP Engineering Show Merit Award",
    "issuer": "Singapore Polytechnic",
    "date": "Jan 2021",
    "description": "Awarded for the 5G Autonomous Surveillance Vehicle project featured at SP Engineering Show."
  },
  {
    "id": "directors-honour-roll",
    "title": "Director's Honour Roll",
    "issuer": "Singapore Polytechnic",
    "date": "Jul 2020"
  },
  {
    "id": "sp-cca-gold",
    "title": "SP CCA Gold with Honours",
    "issuer": "Singapore Polytechnic",
    "date": "Jan 2020",
    "description": "For exceptional co-curricular contribution and leadership in the DJ Club."
  }
];

export type InterestGroup = {
  id: string;
  label: string;
  /** Optional Vietnamese variant of the group label. */
  labelVi?: string;
  items: string[];
  /** Optional Vietnamese variant of the item list. When present, fully
   *  replaces the English items array (positions must match). */
  itemsVi?: string[];
};

export const personalInterests: InterestGroup[] = [
  {
    "id": "motorsports",
    "label": "Motorsports & Mobility",
    "items": [
      "Car licence",
      "Motorcycle licence",
      "Recreational boating"
    ]
  },
  {
    "id": "investing",
    "label": "Investing",
    "items": [
      "US equities"
    ]
  },
  {
    "id": "education",
    "label": "Technology & Science",
    "items": [
      "Veritasium",
      "ColdFusion",
      "Fireship"
    ]
  },
  {
    "id": "gaming-past",
    "label": "PC Gaming",
    "items": [
      "Counter-Strike",
      "Dota 2",
      "Minecraft"
    ]
  }
];
