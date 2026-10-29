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
  bullets?: string[];
  projectLinks?: { slug: string; label: string }[];
};

// Type label translations. Used by the rendering component to localize
// the small chip next to the company name.
export const EMPLOYMENT_TYPE_VI: Record<EmploymentType, string> = {
  Internship: "Thực tập",
  "Part-time": "Bán thời gian",
  "Full-time": "Toàn thời gian",
  Freelance: "Tự do",
};

export const experience:  ExperienceRole[] = [
  {
    "id": "vntt",
    "company": "VNTT",
    "companyLink": "https://vntt.com.vn/",
    "role": "AI & IIoT Engineer Intern",
    "dates": "May 2026 to Jul 2026",
    "initial": "V",
    "logoSrc": "/logos/companies/vntt.png",
    "type": "Internship",
    "bullets": [
      "Built an EdgeX Foundry gateway prototype using simulated Modbus TCP, MQTT and Siemens S7 inputs. Integrated Python device simulators and TLS publishing to HiveMQ in an 18-container Docker environment.",
      "Initiated BecaLearn to centralise intern learning materials. Designed its internal hosting architecture, built the initial LMS and completed deployment testing and handover.",
      "Assigned page reviews and user acceptance testing of business flows to another intern.",
      "Reviewed the feedback and implemented selected improvements.",
      "Used AI-assisted coding to map stacker-crane actions to device command codes."
    ],
    "projectLinks": [
      {
        "slug": "becalearn",
        "label": "BecaLearn"
      },
      {
        "slug": "vntt-industrial-gateway",
        "label": "Gateway prototype"
      }
    ]
  },
  {
    "id": "nepseeds",
    "company": "Nepseeds",
    "companyLink": "https://nepseeds.com/",
    "role": "Co-Founder & Operations Lead",
    "dates": "Jul 2021 to Present",
    "initial": "N",
    "logoSrc": "/logos/companies/nepseeds.avif",
    "type": "Part-time",
    "bullets": [
      "Manage Shopify, customer enquiries, international fulfilment and NParks phytosanitary coordination for Nepenthes seeds and occasional live-plant shipments.",
      "Implemented an order-triggered script to print shipping labels and order/packing slips automatically.",
      "Grew the Facebook group organically to approximately 1,500 members through posts and responsive customer communication."
    ],
    "projectLinks": [
      {
        "slug": "nepseeds",
        "label": "Storefront and operations"
      }
    ]
  },
  {
    "id": "osiris",
    "company": "Osiris Technology",
    "companyLink": "https://osiris.so/",
    "role": "Co-Founder",
    "dates": "Dec 2023 to Jul 2024",
    "initial": "O",
    "logoSrc": "/logos/companies/osiris.png",
    "bullets": [
      "Built ESP32/DHT22/relay switch boxes, MicroPython firmware, local daily schedules and Wi-Fi/MQTT telemetry through HiveMQ Cloud to AWS S3.",
      "Recruited the core SMU team and divided hardware, firmware and cloud work. Demonstrated remote lighting and irrigation control in early pre-revenue pilots.",
      "Presented Osiris’s BIG grant pitch. The venture received grant support and SMU incubation.",
      "Demonstrated remote hydroponic control to visitors at the World Cities Summit 2024 SMU IIE booth.",
      "Discussed initial requirements and potential IoT/SIDS applications with a construction-industry company."
    ],
    "projectLinks": [
      {
        "slug": "osiris-hydroponics",
        "label": "Hydroponics IoT"
      }
    ]
  },
  {
    "id": "ntuc",
    "company": "NTUC LearningHub",
    "companyLink": "https://www.ntuclearninghub.com/",
    "role": "Information Technology Executive",
    "dates": "May 2021 to Jul 2021",
    "initial": "NL",
    "logoSrc": "/logos/companies/ntuc-learning-hub.png",
    "type": "Full-time",
    "bullets": [
      "Automated installation, configuration and domain joining using Windows images and PowerShell, reducing hands-on setup effort from over 45 minutes to under 10 minutes per computer.",
      "Shared the images and scripts with IT colleagues who used them.",
      "Built a Python/MySQL workflow to collect MAC addresses, IP addresses and NetBIOS names into a central asset database, replacing manual entry for the IT team.",
      "Managed Active Directory accounts and day-to-day support.",
      "Demonstrated a Chocolatey for Business software-installation proof of concept."
    ],
    "projectLinks": [
      {
        "slug": "ntuc-workstation-automation",
        "label": "Provisioning and asset automation"
      }
    ]
  },
  {
    "id": "w2",
    "company": "W2 Industrial Services Hub",
    "role": "IoT Solutions Consultant",
    "dates": "Mar 2021 to Jul 2021",
    "initial": "W",
    "logoSrc": "/logos/companies/w2-industrial.jpg",
    "type": "Freelance",
    "bullets": [
      "Gathered requirements through discussions with W2’s team and set up the Azure VM as the team built the wastewater-sampler IoT system from scratch.",
      "Integrated SIM-equipped Tastek RTUs, Mosquitto MQTT and the dashboard for remote schedule changes and temperature monitoring.",
      "The platform involved 100+ RTUs and roughly 50 sites during the engagement. It expanded beyond 360 sites after my engagement ended."
    ],
    "projectLinks": [
      {
        "slug": "inno2-nea-wastewater",
        "label": "Wastewater monitoring"
      }
    ]
  },
  {
    "id": "sp-iot",
    "company": "Singapore Polytechnic",
    "companyLink": "https://www.sp.edu.sg/",
    "role": "IoT Engineering Intern",
    "dates": "Sep 2020 to Feb 2021",
    "initial": "SP",
    "logoSrc": "/logos/schools/sp.webp",
    "type": "Internship",
    "bullets": [
      "Integrated cloud and React/Node.js/MySQL dashboard components within a five-intern IoT team for live vehicle-status and sensor monitoring.",
      "Contributed to Raspberry Pi/Node-RED/MQTT integration over SP’s dedicated 5G network. Integrated telemetry with DECADA for storage.",
      "Demonstrated the IoT subsystem and explained the vehicle-to-dashboard data path at SP Engineering Show 2021."
    ],
    "projectLinks": [
      {
        "slug": "asv-5g-autonomous",
        "label": "ASV capstone"
      }
    ]
  },
  {
    "id": "one-alliance-group",
    "company": "Great Eastern, One Alliance Group",
    "role": "Web Developer",
    "dates": "Mar 2019 to Jul 2019",
    "initial": "OA",
    "type": "Freelance",
    "bullets": [
      "Maintained the WordPress website and updated content for insurance marketing campaigns.",
      "Created campaign landing pages to support marketing activity."
    ],
    "projectLinks": []
  }
];
