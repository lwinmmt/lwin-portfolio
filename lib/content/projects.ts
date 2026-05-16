// Projects data. Featured 4 surface on home; full list lives at /projects.

export type ProjectCategory = "Production" | "Coursework" | "Projects";

export type ProjectLiveLink = { url: string; label: string };

export type CaseStudySection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** Course code, engagement context, or institutional eyebrow. Shown
   *  consistently on every project card. */
  course?: string;
  description: string;
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
  /** Additional images surfaced as a small gallery below the cover image
   *  on the case study page. */
  gallery?: string[];
  /** Marks the project as having an inline diagram. The slug page renders
   *  the matching diagram component. */
  diagramType?: "esmos";
  featured?: boolean;
  caseStudy?: CaseStudySection[];
};

export const projects: Project[] = [
  {
    slug: "inno2-nea-wastewater",
    title: "Inno2: Cloud-Based Wastewater Monitoring System",
    course: "W2 Industrial Services Hub",
    description:
      "Azure-hosted pipeline for 360-site NEA COVID-19 wastewater surveillance. 100+ Tastek industrial RTUs (embedded SIM) streaming directly over cellular to a single Azure VM running Mosquitto, the database, and the dashboard. Twilio WhatsApp alerts to the on-call engineers. Contributed to the Lee Hsien Loong IDM Smart Nation Award 2022. Straits Times feature.",
    dates: "Oct 2020 to Jul 2021",
    category: "Production",
    tags: ["Azure", "MQTT", "Mosquitto", "Twilio"],
    imageSrc: "/images/projects/inno2-nea-wastewater/cover.webp",
    newsLink:
      "https://www.straitstimes.com/singapore/wastewater-surveillance-sites-for-covid-19-to-double-by-2022-from-current-200-nea",
    featured: true,
    caseStudy: [
      {
        heading: "Context",
        body: [
          "In 2020 the National Environment Agency rolled out wastewater surveillance as a community-level COVID-19 early warning system. Inno2 (the W2 Industrial Services Hub initiative I worked on) built the cloud and edge stack that powered the deployment.",
          "The brief expanded fast. We started at roughly 200 sites and scaled to over 360 across migrant worker dormitories, residential blocks, and treatment facilities, with engineers visiting site cabinets daily to verify uptime.",
        ],
      },
      {
        heading: "My role",
        body: [
          "Cloud and IoT engineer on a small team, first as an SP-attached intern then on as a W2 IoT Solutions consultant. I owned the Azure-side architecture and the integration between field RTUs, the broker, and the operations dashboard. I also wrote the alerting logic that pushed offline-device notifications out over Twilio WhatsApp.",
        ],
      },
      {
        heading: "Architecture",
        bullets: [
          "100+ Tastek industrial RTUs in the field. Each unit had a SIM card slot, so the RTU dialed straight out to the cloud over cellular. No edge gateway in between.",
          "One Azure VM running everything: the Mosquitto MQTT broker, the database, and the web dashboard. Plain monolith, no microservices.",
          "Vertical scaling via an Auto-Scaling Group. When load grew, the VM scaled up rather than out. Basic, but reliable for the workload.",
          "Twilio WhatsApp Business API for alerts. Engineers registered their numbers once, then offline-RTU and threshold-breach notifications landed on WhatsApp.",
        ],
      },
      {
        heading: "Outcomes",
        bullets: [
          "Contributed to the Lee Hsien Loong IDM Smart Nation Award 2022 received by W2.",
          "Featured by [The Straits Times](https://www.straitstimes.com/singapore/wastewater-surveillance-sites-for-covid-19-to-double-by-2022-from-current-200-nea) when NEA announced the doubling of surveillance sites.",
          "Stayed in regular production use across 360 sites, with the alerting flow catching dropouts before site visits.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Field IoT at this scale is mostly about the failure modes you do not see in a demo. Devices reboot in the rain. SIMs roam onto the wrong tower. Reconnect storms surprise you at 3am. The system has to assume every link is lossy and every device is going to lie to you eventually.",
          "The alerting layer is the product. A dashboard nobody opens is worse than a WhatsApp message that wakes an engineer up at the right moment.",
          "Single-VM monoliths get a lot of grief, but for this scale it was the right call. Fewer moving parts, fewer pages.",
        ],
      },
    ],
  },
  {
    slug: "esmos-multi-cloud",
    title: "Multi-Cloud APAC Architecture",
    course: "IS214 Enterprise Solution Management, Singapore Management University",
    description:
      "Multi-region AWS (Singapore, Tokyo, Sydney) + Azure DR (Hong Kong) + Cloudflare edge with GCP secondary NS. Architecture diagram embedded inline on the case study page; click to open full size and pan or zoom around the four clouds.",
    dates: "Jan 2026 to Apr 2026",
    category: "Coursework",
    tags: ["AWS", "Azure", "Cloudflare", "Kubernetes", "Aurora Global"],
    diagramType: "esmos",
    featured: true,
    caseStudy: [
      {
        heading: "Context",
        body: [
          "ESMOS is a fictional regional healthcare provider that needs to scale a single Odoo-based clinical system out across APAC, with hard requirements on availability, disaster recovery, and data sovereignty. The course brief asked for an enterprise solution: multi-region, multi-cloud, with explicit RTO and RPO targets.",
          "I treated it like a real architecture review. The diagram below is the v9.4 output: four clouds, three active AWS regions, an Azure DR + always-active Helpdesk, a Cloudflare edge, a GCP secondary nameserver for DNS resilience, and a backup path to Cloudflare R2.",
        ],
      },
      {
        heading: "My role",
        body: [
          "Team lead and solution architect, effectively by default: I was the one with the cloud and architecture background, so I drove the regional layout, the failover model, the DR runbook, and the diagram. I authored the Service Design Document that the rest of the deliverables hung off, and wrote the rationale for each non-obvious choice (why Aurora Global over manual replication, why a second cloud for DR, why GCP just for DNS).",
        ],
      },
      {
        heading: "Architecture, the short version",
        bullets: [
          "Three AWS regions: Singapore primary, Tokyo and Sydney active replicas. Each runs its own EKS cluster with the same Odoo deployment. Latency routing at the edge sends each user to their nearest region.",
          "Aurora Global Database as the single source of truth. Tokyo and Sydney read the SG primary via VPC peering; on a SG-region failure, Aurora promotes a secondary with sub-minute RTO. If both SG and TK go down, Sydney promotes.",
          "Azure East Asia in Hong Kong as the cross-cloud DR target. AKS sits idle until a Cloudflare DNS failover (gated by /healthz write validation) flips traffic. The Odoo Helpdesk on Azure runs always-active on its own subdomain.",
          "Cloudflare for the edge (WAF, DDoS, CDN, TLS) and authoritative DNS. GCP Cloud DNS holds the secondary NS records so DNS itself survives a Cloudflare control-plane outage.",
          "Cloudflare R2 for cold archival: daily Aurora snapshots get exported to R2 and life-cycled to long-term tier after 90 days. Helpdesk backups land in Azure Blob.",
          "Moodle on EC2 inside an Auto Scaling Group, with WireGuard for staff access. Video uploads run S3 to Lambda to MediaConvert to HLS, then back out through Cloudflare CDN.",
          "BetterStack does the external uptime checks. CloudWatch Container Insights per region rolls up into a cross-region dashboard, with SNS pushing alarm emails out.",
        ],
      },
      {
        heading: "Decisions worth talking about",
        body: [
          "**Aurora Global over hand-rolled cross-region replication.** Managed failover, sub-minute RTO, and the ops team does not have to babysit replication lag. The trade-off is vendor lock-in, but for a healthcare workload the operational simplicity wins.",
          "**Multi-cloud DR rather than multi-region within AWS.** The brief specifically required resilience against a single-vendor incident. Azure DR adds real cost and complexity, but it is the only way to actually answer the question being asked. If this were my own startup I would push back on the requirement first.",
          "**/healthz-gated DNS failover.** The failover only flips when an explicit write-path health check confirms Azure DR can take traffic. Cheap insurance against flapping, and forces the runbook to be honest about what 'ready' means.",
          "**GCP for DNS only.** Three-vendor DNS sounds overkill, but DNS is the single most catastrophic failure surface in a multi-cloud setup. Putting the secondary NS on a third party makes DNS itself survive any single-vendor incident.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Enterprise architecture is mostly about reading the trade-off honestly. Every line on this diagram cost something. The interesting work is justifying each line, not adding more.",
          "Multi-cloud DR is rare in practice because it doubles the operational surface area. The cost is only worth paying when the regulator or the customer asks for it in writing. ESMOS asked, so the diagram has it.",
          "Authoring the diagram in a real tool (Eraser, exported as SVG) beats screenshotting Lucid every time. It version-controls cleanly, scales without quality loss, and the same file is what you see embedded on this page above.",
        ],
      },
    ],
  },
  {
    slug: "osiris-hydroponics",
    title: "Osiris: Hydroponics IoT Automation",
    course: "Osiris Technology",
    description:
      "ESP32-driven irrigation and lighting automation for hydroponic SMEs. AWS S3 data pipeline. SMU BIG grant funded. Showcased to Ministers Indranee Rajah and Desmond Lee at World Cities Summit 2024.",
    dates: "Dec 2023 to Jul 2024",
    category: "Production",
    tags: ["ESP32", "AWS", "MQTT", "Hardware"],
    liveLink: "https://osiris.so/",
    newsLink:
      "https://sbr.com.sg/markets-investing/exclusive/meet-9-singapore-students-promising-business-ventures",
    featured: true,
    caseStudy: [
      {
        heading: "Context",
        body: [
          "Hydroponic SMEs in Singapore are run by tight teams with thin margins. Irrigation and lighting are still mostly manual or run on dumb timers, which means crop loss when pumps fail overnight and over-watering when conditions shift.",
          "Osiris was a product attempt at the smallest useful thing: a controller that automates the daily cycle and tells the operator when something is off, without forcing them to learn a dashboard.",
        ],
      },
      {
        heading: "My role",
        body: [
          "Founder. I owned the hardware design, firmware, cloud pipeline, and the conversations with farmers. I led the funding pitch and the booth at World Cities Summit. The architectural decisions and the trade-offs are mine.",
        ],
      },
      {
        heading: "Funding and validation",
        body: [
          "Funded by the [SMU BIG (Business Innovations Generator) acceleration grant](https://iie.smu.edu.sg/acceleration-grant) out of SMU IIE. Featured in [Singapore Business Review](https://sbr.com.sg/markets-investing/exclusive/meet-9-singapore-students-promising-business-ventures)'s list of nine SMU student ventures to watch.",
        ],
      },
      {
        heading: "Architecture",
        bullets: [
          "ESP32-based controller with relays for the irrigation pumps and the LED grow lights. Local daily schedule on the device so the rig keeps running if the cloud is unreachable.",
          "Telemetry pushed up to AWS S3. Cheap, simple, and good enough for the early scale.",
          "Web dashboard for the farmers to monitor crop view, the daily cycle, and any alerts.",
        ],
      },
      {
        heading: "Showcase moments",
        bullets: [
          "World Cities Summit 2024 at the SMU IIE booth. Demoed Osiris to Ministers Indranee Rajah and Desmond Lee.",
          "Featured in Singapore Business Review.",
          "Internal demo at SMU IIE for the BIG cohort.",
        ],
      },
      {
        heading: "Where it stands",
        body: [
          "Osiris kept going in a different shape. The original hydroponics product stopped shipping, but the company pivoted to a systems-integrator-style consulting model for custom IoT builds.",
          "The original platform (ESP32 controller, cloud pipeline, dashboard) ended up reusable across domains: the same architecture gets redeployed with different sensors for different problem spaces. The early lessons in firmware reliability, supply chain, and deployment ride along.",
        ],
      },
    ],
  },
  {
    slug: "singapore-indoor-farms",
    title: "Singapore Indoor Farms IoT Showcase",
    course: "W2 Industrial Services Hub",
    description:
      "Raspberry Pi rig with DHT22 humidity, a CO2 sensor, and relay-driven control of the grow lights and water pump. Deployed as a single demo rack at an indoor farm on the west coast of Singapore. Featured on Channel News Asia in May 2022.",
    dates: "2021 to 2022",
    category: "Production",
    tags: ["Raspberry Pi", "DHT22", "Relays", "Hardware"],
    imageSrc: "/images/highlights/cna-singapore-indoor-farm.webp",
    caseStudy: [
      {
        heading: "Context",
        body: [
          "An indoor farm on the west coast of Singapore wanted a small visible IoT rig they could show clients walking through their facility. Not a full deployment, just one demo rack on their floor to prove the data path end-to-end and let visitors see live readings.",
          "It was a W2 freelance gig during my SP IoT internship era. The scope was deliberately narrow: prove the loop works, show numbers on a screen, let an operator flip a relay.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "One Raspberry Pi at the rack. GPIO wired to a DHT22 humidity sensor and a separate CO2 sensor.",
          "Raspberry Pi camera (later iterations swapped in an audio module) for visual monitoring of the rack.",
          "Relays off the Pi GPIO to switch the grow lights and the water pump on and off.",
          "A monitoring view so the operator could observe readings and trigger simple notifications. Useful for the demo, not a production platform.",
        ],
      },
      {
        heading: "What it did for the customer",
        body: [
          "The rig was as much a sales tool as a sensor stack. The farm's team used it to walk clients through what data-driven indoor agriculture looks like. CNA picked it up in May 2022 as a Singapore Indoor Farms feature.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "A small, deliberate scope can outperform a complex one. The same engineering effort spent making a hundred sensors work imperfectly would have been less useful than making one rack actually work in front of clients.",
          "Hardware demos are different from hardware products. The bar for a demo is liveness and legibility on a screen. The bar for a product is the failure modes that show up at 3am.",
        ],
      },
    ],
  },
  {
    slug: "royce-connect",
    title: "Royce Connect: Patient & Operations Platform",
    course: "IS215 Digital Business Technologies & Transformation, Singapore Management University",
    description:
      "Two-surface product for a dental clinic chain: patient mobile app (appointments, recall reminders) and operations dashboard (retention by outlet, no-show analytics).",
    dates: "Aug 2024 to Dec 2024",
    category: "Coursework",
    tags: ["Next.js", "React Native", "Vercel", "TypeScript"],
    liveLinks: [
      { url: "https://royceconnect.vercel.app/", label: "Patient app" },
      { url: "https://royceconnect-dashboard.vercel.app/", label: "Ops dashboard" },
    ],
    imageSrc: "/images/projects/royce-connect/dashboard.jpg",
    featured: true,
    caseStudy: [
      {
        heading: "Context",
        body: [
          "The IS215 brief asked for an end-to-end digitalization project against a real (or realistic) business. I proposed using Royce Dental, a Singapore dental chain, and the team went with it. Dental chains in Singapore live and die by two numbers: no-show rate and recall conversion, so the brief had real bite once we framed it that way.",
          "This was an academic exercise, not a client engagement. We did not deploy to a real clinic. Treat what is on the live links as the prototype we shipped at the end of the module.",
        ],
      },
      {
        heading: "My role",
        body: [
          "Project lead. I drove the proposal, the strategic analysis (SWOT, Porter's Five Forces, target market sizing), the product framing, and most of the deck the team presented with. On the build side I worked across both surfaces with the team.",
        ],
      },
      {
        heading: "Two surfaces, one platform",
        bullets: [
          "**Patient mobile app**: appointment booking, recall reminders, and a one-tap confirmation loop designed to bring no-show numbers down.",
          "**Operations dashboard**: per-outlet retention curves, no-show analytics, and the daily and weekly views the practice manager actually opens.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript for the operations dashboard, deployed on Vercel.",
          "React Native for the patient app. Same TypeScript domain types shared with the web side.",
          "Both apps configured for fast preview deploys per branch so we could iterate with the team quickly.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Two-surface products are mostly about the seam between them. The patient app and the ops dashboard look like different products to their users, but they share a domain model. Getting that model right (appointments, patients, recalls, outlets) was 70 percent of the engineering work.",
          "Strategy and product framing pull more weight than the code in academic exercises like this. The SWOT, the Porter's analysis, and the deck were what carried the room. The build was the proof, not the pitch.",
        ],
      },
      {
        heading: "Artifacts",
        body: [
          "I will upload the final deck (SWOT, Porter's Five Forces, market sizing, the full digitalization roadmap) to this page once cleaned up for public viewing.",
        ],
      },
    ],
  },
  {
    slug: "signpost-collective-dashboard",
    title: "Signpost Collective Internal Dashboard",
    course: "COR1301 Leadership and Team Building, Singapore Management University",
    description:
      "Internal operations dashboard for Signpost Collective. SMU-X engagement with real client use. Admin and member role-based access plus analytics views.",
    dates: "2026",
    category: "Coursework",
    tags: ["Next.js", "Vercel", "TypeScript", "SMU-X"],
    liveLink: "https://signpost-collective-internal-dashbo.vercel.app/",
    caseStudy: [
      {
        heading: "Context",
        body: [
          "Built for Signpost Collective as an [SMU-X](https://x.smu.edu.sg/) project plus coursework deliverable for COR1301 Leadership and Team Building. SMU-X projects are real engagements with external organizations: the client team actually uses what you ship and tells you when it does not work.",
        ],
      },
      {
        heading: "What we built",
        bullets: [
          "Internal operations dashboard for the Signpost Collective team.",
          "Role-based access with admin and member tiers, each with different view and edit permissions.",
          "Analytics views surfacing the operational metrics the team cares about.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript for the dashboard.",
          "Deployed on Vercel with per-branch preview deploys so the client could review changes before merge.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "SMU-X projects are not coursework with a sticker on it. A real client team uses the thing you ship and will tell you in the next meeting when it does not work for them. That feedback loop sharpens product instincts faster than any case study brief can.",
        ],
      },
    ],
  },
  {
    slug: "grabcompare",
    title: "GrabCompare",
    course: "SMU Product Management Club, Internal Product Challenge",
    description:
      "Ride-hailing aggregator concept: one screen to compare prices and wait times across Grab, Tada, and the other apps before booking. Won 1st place at the SMU PMx Internal Product Challenge.",
    dates: "Oct 2023",
    category: "Coursework",
    tags: ["Product", "UX", "Aggregator"],
    caseStudy: [
      {
        heading: "Context",
        body: [
          "Ride-hailing in Singapore is fragmented. Grab, Tada, and a handful of other apps serve overlapping routes at different prices and wait times, and there is no easy way to compare them in one place before booking. You open three apps to make one decision.",
          "GrabCompare was a product concept that aggregated rides across providers in one ranked view. Pick where you are going, see all options side by side, book through the right app.",
        ],
      },
      {
        heading: "My role",
        body: [
          "Project lead on a 3-person team. I drove the product framing, the deck, and the live pitch. Won 1st place at the SMU Product Management Experience Internal Product Challenge in October 2023.",
        ],
      },
      {
        heading: "Why it landed",
        body: [
          "The aggregator pattern is well understood: judges did not have to imagine what the product feels like because they have already used similar tools for flights and hotels. That let the pitch focus on the harder local-execution questions (which APIs to integrate, what to do when one app says 5 minutes and another says 12, how to handle pricing surge across apps) rather than on whether the category should exist.",
        ],
      },
      {
        heading: "Artifacts",
        body: [
          "No public deck or repo currently uploaded. If I can recover the slides from the cohort folder I will attach them here.",
        ],
      },
    ],
  },
  {
    slug: "asv-5g-autonomous",
    title: "5G-Enabled Autonomous Surveillance Vehicle (IoT Subsystem)",
    course: "Final Year Project, Singapore Polytechnic",
    description:
      "Final Year Project contributing to SP's first SAE Level 3 autonomous 5G vehicle. Led a 5-person IoT subteam building a cloud-based monitoring dashboard in React, Node.js, and MySQL. Node-RED firmware on Raspberry Pi captured telemetry over MQTT, with alerting on environmental hazards and battery thresholds. Featured at SP Engineering Show 2021.",
    dates: "Sep 2020 to Feb 2021",
    category: "Coursework",
    tags: ["React", "Node.js", "MQTT", "Node-RED", "Raspberry Pi"],
    imageSrc: "/images/projects/asv-5g-autonomous/dashboard.jpg",
    gallery: [
      "/images/projects/asv-5g-autonomous/team-1.jpg",
      "/images/projects/asv-5g-autonomous/team-2.jpg",
      "/images/projects/asv-5g-autonomous/team-3.jpg",
    ],
  },
  {
    slug: "windows-server-2000-security",
    title: "Windows Server 2000 Security Hardening",
    course: "Diploma in Computer Engineering, Singapore Polytechnic",
    description:
      "Hardened vulnerable Windows Server 2000 against common exploitation vectors. Restricted DNS zone transfers, deployed IIS Lockdown Tool, replaced insecure remote access with CopSSH, enforced strong password policies via Group Policy. Validated through active penetration testing (nslookup zone transfers, nmap port scanning).",
    dates: "Jan 2020 to Feb 2020",
    category: "Coursework",
    tags: ["Windows Server", "Security", "Penetration Testing", "Active Directory"],
    caseStudy: [
      {
        heading: "Context",
        body: [
          "A classic blue-team versus red-team exercise on a deliberately vulnerable Windows Server 2000 box. The goal: take a known-bad baseline and harden it against the common attack vectors of that era, then verify the hardening actually held under active probing.",
        ],
      },
      {
        heading: "Hardening moves",
        bullets: [
          "Restricted DNS zone transfers so an external nslookup could no longer dump the zone.",
          "Deployed the IIS Lockdown Tool to disable unused IIS features and reduce the attack surface.",
          "Replaced the insecure remote-access stack with CopSSH (Cygwin-based OpenSSH on Windows).",
          "Enforced strong password policies via Group Policy: complexity, length, lockout thresholds.",
        ],
      },
      {
        heading: "Validation",
        body: [
          "Hardening claims are worth nothing without verification. I re-ran the same probes against the hardened box that I had used against the baseline: nslookup zone transfer attempts, nmap port scanning for unexpected open services, attempts to authenticate against the old remote-access surface. Every probe that worked before had to fail after.",
        ],
      },
      {
        heading: "Why this lab still matters",
        body: [
          "The specific software is decades old, but the mindset transfers directly to modern security work: assume a baseline is broken, harden by removing surface area first, then verify with active probing. Most production systems I have touched since (NEA wastewater, Osiris) have had similar broken-by-default assumptions worth challenging.",
        ],
      },
    ],
  },
  {
    slug: "cisco-wan-architecture",
    title: "Cisco WAN Architecture",
    course: "Diploma in Computer Engineering, Singapore Polytechnic",
    description:
      "Architected hub-and-spoke WAN topology in Cisco Packet Tracer Multi-User mode. Connected 3 branch offices to central HQ across simulated internet backbone with hierarchical IP addressing (172.23.0.0/16), RIPv2 routing with PPP auth, DHCP, and standard/extended ACL policies.",
    dates: "Dec 2019 to Jan 2020",
    category: "Coursework",
    tags: ["Cisco", "Networking", "ACL", "RIPv2"],
  },
  {
    slug: "windows-server-2012-r2-enterprise",
    title: "Windows Server 2012 R2 Enterprise Infrastructure",
    course: "Diploma in Computer Engineering, Singapore Polytechnic",
    description:
      "Self-hosted virtualized datacenter on VMware Workstation. 4 Windows Server 2012 R2 instances (Domain Controller, DNS/DHCP, File Server, Web Server). Active Directory with hierarchical OUs, scripted bulk user provisioning for 50+ accounts via PowerShell, enforced Group Policies with 5GB storage quotas.",
    dates: "Jun 2019 to Sep 2019",
    category: "Coursework",
    tags: ["Windows Server", "Active Directory", "PowerShell", "VMware"],
  },
  {
    slug: "cisco-enterprise-lan",
    title: "Cisco Enterprise Network Architecture (LAN)",
    course: "Diploma in Computer Engineering, Singapore Polytechnic",
    description:
      "Multi-site enterprise network using 7 Cisco routers and 5 switches in a hybrid environment (Packet Tracer + SP physical server racks). Star-topology LAN supporting 12+ endpoints and 2 internal servers. VLSM IP scheme, OSPF multi-area routing with failover, ACL-based access policies.",
    dates: "Jun 2019 to Aug 2019",
    category: "Coursework",
    tags: ["Cisco", "OSPF", "Networking", "VLSM"],
  },
  {
    slug: "nepseeds",
    title: "Nepseeds: Plant E-Commerce",
    course: "Nepseeds (self-started)",
    description:
      "Bootstrapped plant e-commerce since July 2021. End-to-end supply chain for perishable, regulated botanical inventory including NEA phytosanitary certifications and CITES compliance. 98% on-time fulfillment, grew social following 600 to 1000+ organically.",
    dates: "Jul 2021 to Present",
    category: "Projects",
    tags: ["Shopify", "Operations", "E-Commerce"],
    liveLink: "https://nepseeds.com/",
    caseStudy: [
      {
        heading: "Origin",
        body: [
          "Started in 2021 with a friend who was growing nepenthes (carnivorous pitcher plants) and selling them as a hobby on Carousell. The volume kept creeping up. Eventually it made sense to formalize it into a real brand with real compliance, real fulfillment, and a real customer base.",
        ],
      },
      {
        heading: "What it became",
        body: [
          "A bootstrapped plant e-commerce operation focused on perishable, regulated botanical inventory. NEA phytosanitary certifications for plant exports, CITES compliance for the protected species we carry, end-to-end supply chain from grower to shipped order. The site is live at [nepseeds.com](https://nepseeds.com/).",
        ],
      },
      {
        heading: "What I picked up",
        body: [
          "Bootstrapping a physical-product business teaches a different set of skills than shipping software. Inventory math. Phytosanitary paperwork. The difference between a customer who is angry because the plant arrived late and a customer who is angry because their last shipment was wrong. Operations work compounds: small process fixes save hours every week.",
          "It also taught me when not to over-engineer. A Shopify store with a tight fulfillment workflow beats a custom-built platform for this scale.",
        ],
      },
    ],
  },
];

// Convenience selectors
export const featuredProjects = projects.filter((p) => p.featured);
export const projectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);
