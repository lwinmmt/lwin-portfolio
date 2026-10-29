// Projects data. Featured 4 surface on home; full list lives at /projects.

export type ProjectCategory = "Projects" | "Coursework";

export type ProjectLiveLink = { url: string; label: string };

export type CaseStudySection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** Optional Vietnamese variant of the title. Skip when the title
   *  is purely a proper noun ("GrabCompare"). */
  titleVi?: string;
  /** Course code, engagement context, or institutional eyebrow. Shown
   *  consistently on every project card. */
  course?: string;
  /** Optional Vietnamese variant of the course eyebrow. */
  courseVi?: string;
  description: string;
  /** Optional Vietnamese variant of the description. Keep tech
   *  stack names (AWS, ESP32, MQTT, etc.) and proper nouns in
   *  their English form; translate only the surrounding prose. */
  descriptionVi?: string;
  dates: string;
  category: ProjectCategory;
  tags: string[];
  liveLink?: string;
  liveLinks?: ProjectLiveLink[];
  repoLink?: string;
  videoLink?: string;
  newsLink?: string;
  /** Public deck (Google Slides, public PowerPoint, etc.) */
  slidesLink?: string;
  /** Case study PDF or report. */
  pdfLink?: string;
  imageSrc?: string;
  /** Optional CSS `object-position` value applied to the cover image
   *  in landscape crops. Useful when the source photo is portrait
   *  and the subject is not at the geometric center (e.g. face in
   *  the upper portion). Defaults to "center" if omitted. */
  coverFocus?: string;
  /** Additional images surfaced as a small gallery below the cover image
   *  on the case study page. */
  gallery?: string[];
  /** Marks the project as having an inline diagram. The slug page renders
   *  the matching diagram component. */
  diagramType?: "esmos";
  featured?: boolean;
};

export const projects:  Project[] = [
  {
    "slug": "becalearn",
    "title": "BecaLearn: Internal Learning Platform",
    "course": "VNTT · Self-initiated internship project",
    "description": "Initiated and built a learning management system (LMS) using AI-assisted development to bring scattered onboarding materials, video links and learning guidance into one place. Designed for internal hosting and handed over the codebase and Docker Compose configuration after deployment testing.",
    "dates": "May 2026 to Jul 2026",
    "category": "Projects",
    "tags": [
      "LMS",
      "Docker Compose",
      "Architecture",
      "UAT",
      "AI-assisted development"
    ],
    "featured": true
  },
  {
    "slug": "vntt-industrial-gateway",
    "title": "Industrial Gateway Integration Prototype",
    "course": "VNTT · Internship project",
    "description": "Built an EdgeX Foundry gateway prototype with simulated Modbus TCP, MQTT and Siemens S7 inputs. Integrated custom device services, Python simulators and TLS publishing to HiveMQ in an 18-container Docker environment.",
    "dates": "May 2026 to Jul 2026",
    "category": "Projects",
    "tags": [
      "EdgeX Foundry",
      "Docker",
      "Python",
      "Modbus TCP",
      "Siemens S7",
      "MQTT"
    ]
  },
  {
    "slug": "inno2-nea-wastewater",
    "title": "Inno2: Wastewater Sampler Monitoring & Control",
    "course": "W2 Industrial Services Hub",
    "description": "Co-developed an Azure-hosted IoT system for remote wastewater-sampler settings and monitoring. Integrated SIM-equipped Tastek RTUs, Mosquitto MQTT and a web dashboard. The platform involved 100+ RTUs and roughly 50 sites during my engagement.",
    "dates": "Oct 2020 to Jul 2021",
    "category": "Projects",
    "tags": [
      "Azure",
      "MQTT",
      "Mosquitto",
      "Twilio"
    ],
    "imageSrc": "/images/projects/inno2-nea-wastewater/cover.webp",
    "newsLink": "https://www.straitstimes.com/singapore/wastewater-surveillance-sites-for-covid-19-to-double-by-2022-from-current-200-nea",
    "featured": true
  },
  {
    "slug": "esmos-multi-cloud",
    "title": "ESMOS: Multi-Cloud APAC Architecture",
    "course": "IS214 Enterprise Solution Management, Singapore Management University",
    "description": "Designed the architecture and authored the Service Design Document for a healthcare coursework scenario. Deployed the AWS/Azure stack with the team using Terraform, then demonstrated geo-routing and regional failover.",
    "dates": "Jan 2026 to Apr 2026",
    "category": "Coursework",
    "tags": [
      "AWS",
      "Azure",
      "Cloudflare",
      "Kubernetes",
      "Aurora Global"
    ],
    "diagramType": "esmos",
    "featured": true
  },
  {
    "slug": "osiris-hydroponics",
    "title": "Hydroponics IoT Automation",
    "course": "Osiris Technology",
    "description": "Built ESP32 switch-box hardware, MicroPython firmware and MQTT-to-S3 telemetry for hydroponic lighting and irrigation. Demonstrated remote monitoring and control in early pre-revenue pilots and at World Cities Summit 2024.",
    "dates": "Dec 2023 to Jul 2024",
    "category": "Projects",
    "tags": [
      "ESP32",
      "MicroPython",
      "DHT22",
      "HiveMQ Cloud",
      "AWS S3",
      "Relays"
    ],
    "newsLink": "https://sbr.com.sg/markets-investing/exclusive/meet-9-singapore-students-promising-business-ventures",
    "imageSrc": "/images/projects/osiris-hydroponics/cover.jpg",
    "coverFocus": "center 55%",
    "featured": true,
    "liveLinks": [
      {
        "url": "https://osiris.so/",
        "label": "Company website"
      }
    ]
  },
  {
    "slug": "singapore-indoor-farms",
    "title": "Singapore Indoor Farms IoT Showcase",
    "course": "W2 Industrial Services Hub · Freelance project",
    "description": "Built a Raspberry Pi demonstration rig for one hydroponic rack, combining readings from a DHT22 humidity sensor and a separate CO2 sensor, camera monitoring, and relay control of grow lights and a water pump for client walkthroughs.",
    "dates": "2021 to 2022",
    "category": "Projects",
    "tags": [
      "Raspberry Pi",
      "DHT22",
      "Relays",
      "Hardware"
    ],
    "imageSrc": "/images/highlights/cna-singapore-indoor-farm.webp"
  },
  {
    "slug": "royce-connect",
    "title": "Royce Connect: Patient & Operations Platform",
    "course": "IS215 Digital Business Technologies & Transformation, Singapore Management University",
    "description": "Team coursework based on our own research, using Royce Dental as the case company. Led the proposal and contributed to a React Native patient app and Next.js operations dashboard for appointment, recall and no-show workflows.",
    "dates": "Jan 2026 to Apr 2026",
    "category": "Coursework",
    "tags": [
      "Next.js",
      "React Native",
      "Vercel",
      "TypeScript"
    ],
    "liveLinks": [
      {
        "url": "https://royceconnect.vercel.app/",
        "label": "Patient app demo"
      },
      {
        "url": "https://royceconnect-dashboard.vercel.app/",
        "label": "Operations dashboard demo"
      }
    ],
    "imageSrc": "/images/projects/royce-connect/dashboard.jpg",
    "gallery": [
      "/images/projects/royce-connect/mobile.jpg"
    ],
    "featured": true
  },
  {
    "slug": "signpost-collective-dashboard",
    "title": "Signpost Collective Internal Dashboard",
    "course": "COR1301 Leadership and Team Building, Singapore Management University",
    "description": "Co-developed a Next.js/TypeScript reference dashboard for volunteer operations, with admin/member permissions and analytics. Shared the codebase with Signpost Collective for reference as part of an SMU-X project.",
    "dates": "2026",
    "category": "Coursework",
    "tags": [
      "Next.js",
      "Vercel",
      "TypeScript",
      "SMU-X"
    ],
    "liveLinks": [
      {
        "url": "https://signpost-collective-internal-dashbo.vercel.app/",
        "label": "Reference dashboard demo"
      }
    ]
  },
  {
    "slug": "grabcompare",
    "title": "GrabCompare",
    "course": "SMU Product Management Club, Internal Product Challenge",
    "description": "Co-developed a ride-hailing comparison proposal covering research, a business case, a Figma prototype and the pitch. Our team placed first in the SMU Product Management Club’s internal product challenge.",
    "dates": "Oct 2023",
    "category": "Coursework",
    "tags": [
      "Product research",
      "Business case",
      "Figma",
      "Pitch"
    ],
    "imageSrc": "/images/highlights/pm-club-grabcompare.webp",
    "coverFocus": "30% 55%"
  },
  {
    "slug": "asv-5g-autonomous",
    "title": "5G-Enabled Autonomous Surveillance Vehicle (IoT Subsystem)",
    "course": "Final Year Project, Singapore Polytechnic",
    "description": "Integrated cloud and dashboard components for live vehicle-status and sensor monitoring within a five-intern IoT team. Connected vehicle telemetry to DECADA for storage and demonstrated the IoT subsystem at SP Engineering Show 2021.",
    "dates": "Sep 2020 to Feb 2021",
    "category": "Coursework",
    "tags": [
      "React",
      "Node.js",
      "MySQL",
      "MQTT",
      "Node-RED",
      "Raspberry Pi",
      "DECADA"
    ],
    "imageSrc": "/images/projects/asv-5g-autonomous/dashboard.jpg",
    "gallery": [
      "/images/projects/asv-5g-autonomous/team-1.jpg",
      "/images/projects/asv-5g-autonomous/team-2.jpg",
      "/images/projects/asv-5g-autonomous/team-3.jpg"
    ]
  },
  {
    "slug": "windows-server-2000-security",
    "title": "Windows Server 2000 Security Hardening",
    "course": "ET0521 Network Vulnerability & Security Tools · SP lab work",
    "description": "Lab work evaluating Windows Server vulnerabilities, applying DNS, IIS, password and remote-access controls, then repeating the probes to compare behaviour after hardening.",
    "dates": "Jan 2020 to Feb 2020",
    "category": "Coursework",
    "tags": [
      "Windows Server",
      "Security hardening",
      "IIS",
      "Group Policy",
      "Nmap"
    ]
  },
  {
    "slug": "cisco-wan-architecture",
    "title": "Three-Branch Hub-and-Spoke WAN (Cisco)",
    "course": "ET0718 Wide Area Networks · SP lab work",
    "description": "Led a three-person team building a simulated WAN connecting headquarters and three branches in Cisco Packet Tracer Multi-User, integrating routing, PPP, DHCP and ACLs.",
    "dates": "Dec 2019 to Jan 2020",
    "category": "Coursework",
    "tags": [
      "Cisco",
      "Networking",
      "ACL",
      "RIPv2"
    ]
  },
  {
    "slug": "windows-server-2012-r2-enterprise",
    "title": "Windows Server 2012 R2 Enterprise Environment",
    "course": "ET0015 Server Management · SP lab work",
    "description": "Led a three-person team building a four-VM environment for a fictional sports facility. Configured Active Directory, organisational units, policies, quotas and cross-server authentication for more than 50 accounts.",
    "dates": "Jun 2019 to Sep 2019",
    "category": "Coursework",
    "tags": [
      "Windows Server",
      "Active Directory",
      "PowerShell",
      "VMware"
    ]
  },
  {
    "slug": "cisco-enterprise-lan",
    "title": "Multi-Site Enterprise LAN with OSPF (Cisco)",
    "course": "ET0716 LAN Switching and Wireless · SP lab work",
    "description": "Led a three-person team integrating VLSM addressing, OSPF routing and ACLs. Configured physical SP lab equipment across seven routers, five switches, more than 12 endpoints and two servers.",
    "dates": "Jun 2019 to Aug 2019",
    "category": "Coursework",
    "tags": [
      "Cisco",
      "OSPF",
      "Networking",
      "VLSM"
    ]
  },
  {
    "slug": "nepseeds",
    "title": "Nepseeds: E-Commerce & Operations",
    "course": "Nepseeds · Part-time venture",
    "description": "Co-founded a business selling Nepenthes seeds. Manage Shopify, international fulfilment, customer enquiries and NParks phytosanitary coordination. Implemented an order-triggered printing script and grew the Facebook group organically to approximately 1,500 members.",
    "dates": "Jul 2021 to Present",
    "category": "Projects",
    "tags": [
      "Shopify",
      "Operations",
      "Workflow automation",
      "Meta Business Suite"
    ],
    "liveLinks": [
      {
        "url": "https://nepseeds.com/",
        "label": "Visit store"
      }
    ]
  },
  {
    "slug": "ntuc-workstation-automation",
    "title": "Workstation Provisioning & Asset Automation",
    "course": "NTUC LearningHub · IT operations",
    "description": "Automated Windows installation, configuration and domain joining with custom images and PowerShell. Reduced hands-on setup effort from over 45 minutes to under 10 minutes per computer, with images and scripts used by IT colleagues.",
    "dates": "May 2021 to Jul 2021",
    "category": "Projects",
    "tags": [
      "PowerShell",
      "Windows imaging",
      "Rufus",
      "Python",
      "MySQL",
      "Active Directory"
    ]
  },
  {
    "slug": "seagate-lyve-cloud",
    "title": "Seagate Lyve Cloud: Media Streaming",
    "course": "Seagate Lyve Cloud Hackathon · Team project",
    "description": "Worked with a team on an AWS/Node.js media-streaming service supporting concurrent connections.",
    "dates": "2022",
    "category": "Coursework",
    "tags": [
      "AWS",
      "Node.js",
      "Media streaming"
    ]
  }
];
