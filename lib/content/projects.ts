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

export const projects: Project[] = [
  {
    slug: "inno2-nea-wastewater",
    title: "Inno2: Cloud-Based Wastewater Monitoring System",
    titleVi: "Inno2: Hệ thống giám sát nước thải trên cloud",
    course: "W2 Industrial Services Hub",
    description:
      "Azure-hosted pipeline for NEA COVID-19 wastewater surveillance. 100+ Tastek industrial RTUs (embedded SIM) streaming directly over cellular to a single Azure VM running Mosquitto, the database, and the dashboard. Twilio WhatsApp alerts to the on-call engineers. Contributed to the Lee Hsien Loong IDM Smart Nation Award 2022. Straits Times feature.",
    descriptionVi:
      "Pipeline chạy trên Azure cho hệ thống giám sát nước thải COVID-19 của NEA. Hơn 100 RTU công nghiệp Tastek (gắn SIM tích hợp) truyền dữ liệu trực tiếp qua mạng di động về một Azure VM duy nhất chạy Mosquitto, database và dashboard. Cảnh báo Twilio WhatsApp gửi tới kỹ sư trực. Góp phần vào giải Lee Hsien Loong IDM Smart Nation Award 2022. Được Straits Times đưa tin.",
    dates: "Oct 2020 to Jul 2021",
    category: "Projects",
    tags: ["Azure", "MQTT", "Mosquitto", "Twilio"],
    imageSrc: "/images/projects/inno2-nea-wastewater/cover.webp",
    newsLink:
      "https://www.straitstimes.com/singapore/wastewater-surveillance-sites-for-covid-19-to-double-by-2022-from-current-200-nea",
    featured: true,
  },
  {
    slug: "esmos-multi-cloud",
    title: "Multi-Cloud APAC Architecture",
    titleVi: "Kiến trúc đa cloud khu vực APAC",
    course: "IS214 Enterprise Solution Management, Singapore Management University",
    description:
      "Multi-region AWS (Singapore, Tokyo, Sydney) + Azure DR (Hong Kong) + Cloudflare edge with GCP secondary NS. Architecture diagram embedded inline on the case study page.",
    descriptionVi:
      "AWS đa vùng (Singapore, Tokyo, Sydney) + Azure DR (Hong Kong) + Cloudflare edge với GCP làm nameserver dự phòng. Sơ đồ kiến trúc nhúng trực tiếp trong trang case study.",
    dates: "Jan 2026 to Apr 2026",
    category: "Coursework",
    tags: ["AWS", "Azure", "Cloudflare", "Kubernetes", "Aurora Global"],
    diagramType: "esmos",
    featured: true,
  },
  {
    slug: "osiris-hydroponics",
    title: "Hydroponics IoT Automation",
    titleVi: "Tự động hóa IoT cho thủy canh",
    course: "Osiris Technology",
    description:
      "ESP32-driven irrigation and lighting automation for vertical farms and grow setups. Device-agnostic relay control over standard socket panels, MQTT through HiveMQ Cloud, telemetry landed in S3. SMU BIG grant funded. Showcased to Ministers Indranee Rajah and Desmond Lee at World Cities Summit 2024.",
    descriptionVi:
      "Tự động hóa tưới và đèn chiếu sáng dựa trên ESP32 cho các trang trại thẳng đứng và hệ thống trồng. Điều khiển relay không phụ thuộc thiết bị qua bảng ổ cắm tiêu chuẩn, MQTT qua HiveMQ Cloud, telemetry lưu vào S3. Được tài trợ bởi quỹ SMU BIG. Trình diễn cho Bộ trưởng Indranee Rajah và Desmond Lee tại World Cities Summit 2024.",
    dates: "Dec 2023 to Jul 2024",
    category: "Projects",
    tags: ["ESP32", "AWS", "MQTT", "Hardware"],
    liveLink: "https://osiris.so/",
    newsLink:
      "https://sbr.com.sg/markets-investing/exclusive/meet-9-singapore-students-promising-business-ventures",
    imageSrc: "/images/projects/osiris-hydroponics/cover.jpg",
    // Portrait booth photo: the SMU IIE wall sits at the top, the
    // two subjects kneeling in front of the Osiris display are in
    // the middle of the frame, and the floor is at the bottom. Slight
    // downward bias (55% Y) keeps the heads + display in the landscape
    // crop window instead of defaulting to the wall above them.
    coverFocus: "center 55%",
    featured: true,
  },
  {
    slug: "singapore-indoor-farms",
    title: "Singapore Indoor Farms IoT Showcase",
    titleVi: "IoT Showcase cho Singapore Indoor Farms",
    course: "W2 Industrial Services Hub",
    description:
      "Raspberry Pi rig with DHT22 humidity, a CO2 sensor, and relay-driven control of the grow lights and water pump. One demo rack deployed at their facility on the west coast. Featured on Channel News Asia in May 2022.",
    descriptionVi:
      "Bộ thiết bị Raspberry Pi với cảm biến độ ẩm DHT22, cảm biến CO2 và điều khiển đèn trồng cây cùng máy bơm nước qua relay. Một rack demo triển khai tại cơ sở của họ ở phía tây Singapore. Được Channel News Asia đưa tin vào tháng 5 năm 2022.",
    dates: "2021 to 2022",
    category: "Projects",
    tags: ["Raspberry Pi", "DHT22", "Relays", "Hardware"],
    imageSrc: "/images/highlights/cna-singapore-indoor-farm.webp",
  },
  {
    slug: "royce-connect",
    title: "Royce Connect: Patient & Operations Platform",
    titleVi: "Royce Connect: Nền tảng cho bệnh nhân & vận hành",
    course: "IS215 Digital Business Technologies & Transformation, Singapore Management University",
    description:
      "Two-surface product for a dental clinic chain: patient mobile app (appointments, recall reminders) and operations dashboard (retention by outlet, no-show analytics).",
    descriptionVi:
      "Sản phẩm hai mặt cho chuỗi nha khoa: ứng dụng di động cho bệnh nhân (đặt lịch, nhắc tái khám) và dashboard vận hành (giữ chân khách theo chi nhánh, phân tích trễ hẹn).",
    dates: "Jan 2026 to Apr 2026",
    category: "Coursework",
    tags: ["Next.js", "React Native", "Vercel", "TypeScript"],
    liveLinks: [
      { url: "https://royceconnect.vercel.app/", label: "Patient app" },
      { url: "https://royceconnect-dashboard.vercel.app/", label: "Ops dashboard" },
    ],
    imageSrc: "/images/projects/royce-connect/dashboard.jpg",
    gallery: ["/images/projects/royce-connect/mobile.jpg"],
    featured: true,
  },
  {
    slug: "signpost-collective-dashboard",
    title: "Signpost Collective Internal Dashboard",
    titleVi: "Dashboard nội bộ cho Signpost Collective",
    course: "COR1301 Leadership and Team Building, Singapore Management University",
    description:
      "SMU-X project for Signpost Collective. Built a reference internal operations dashboard and shared the codebase openly with their team.",
    descriptionVi:
      "Dự án SMU-X cho Signpost Collective. Xây dashboard vận hành nội bộ tham chiếu và chia sẻ codebase công khai với team của họ.",
    dates: "2026",
    category: "Coursework",
    tags: ["Next.js", "Vercel", "TypeScript", "SMU-X"],
    liveLink: "https://signpost-collective-internal-dashbo.vercel.app/",
  },
  {
    slug: "grabcompare",
    title: "GrabCompare",
    course: "SMU Product Management Club, Internal Product Challenge",
    description:
      "Ride-hailing aggregator concept: one screen to compare prices and wait times across Grab, Tada, and the other apps before booking. Won 1st place at the SMU PMx Internal Product Challenge.",
    descriptionVi:
      "Ý tưởng aggregator gọi xe: một màn hình so sánh giá cước và thời gian chờ trên Grab, Tada và các ứng dụng khác trước khi đặt. Đạt giải Nhất tại SMU PMx Internal Product Challenge.",
    dates: "Oct 2023",
    category: "Coursework",
    tags: ["Product", "UX", "Aggregator"],
    imageSrc: "/images/highlights/pm-club-grabcompare.webp",
    // Same crop as the matching highlight on the home page. The
    // GrabCompare slides occupy the top half and the six team
    // members stand below; 30% horizontal keeps Lwin (leftmost)
    // in narrow card crops, 55% vertical lands on heads instead
    // of waists.
    coverFocus: "30% 55%",
  },
  {
    slug: "asv-5g-autonomous",
    title: "5G-Enabled Autonomous Surveillance Vehicle (IoT Subsystem)",
    titleVi: "Xe tuần tra tự hành kết nối 5G (mảng IoT)",
    course: "Final Year Project, Singapore Polytechnic",
    courseVi: "Đồ án tốt nghiệp, Singapore Polytechnic",
    description:
      "Final Year Project at Singapore Polytechnic. IoT subsystem for SP's first SAE Level 3 autonomous 5G vehicle. Featured at SP Engineering Show 2021.",
    descriptionVi:
      "Đồ án tốt nghiệp tại Singapore Polytechnic. Subsystem IoT cho chiếc xe tự hành 5G SAE Level 3 đầu tiên của SP. Trưng bày tại SP Engineering Show 2021.",
    dates: "Sep 2020 to Feb 2021",
    category: "Projects",
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
    titleVi: "Tăng cường bảo mật Windows Server 2000",
    course: "ET0521 Network Vulnerability & Security Tools, Singapore Polytechnic",
    description:
      "Blue-team hardening lab on a deliberately vulnerable Windows Server 2000 box.",
    descriptionVi:
      "Bài lab blue-team hardening trên một máy Windows Server 2000 có lỗ hổng cố ý.",
    dates: "Jan 2020 to Feb 2020",
    category: "Coursework",
    tags: ["Windows Server", "Security", "Penetration Testing", "Active Directory"],
  },
  {
    slug: "cisco-wan-architecture",
    title: "Three-Branch Hub-and-Spoke WAN (Cisco)",
    titleVi: "Hệ thống WAN Hub-and-Spoke 3 chi nhánh (Cisco)",
    course: "ET0718 Wide Area Networks, Singapore Polytechnic",
    description:
      "Three-branch hub-and-spoke WAN, built fully virtual in Cisco Packet Tracer Multi-User Mode.",
    descriptionVi:
      "WAN hub-and-spoke ba chi nhánh, dựng hoàn toàn ảo trong Cisco Packet Tracer Multi-User Mode.",
    dates: "Dec 2019 to Jan 2020",
    category: "Coursework",
    tags: ["Cisco", "Networking", "ACL", "RIPv2"],
  },
  {
    slug: "windows-server-2012-r2-enterprise",
    title: "Windows Server 2012 R2 Datacenter (4 Roles, Active Directory)",
    titleVi: "Datacenter Windows Server 2012 R2 (4 vai trò, Active Directory)",
    course: "ET0015 Server Management, Singapore Polytechnic",
    description:
      "Self-hosted four-VM Windows Server 2012 R2 datacenter on VMware Workstation, glued together with Active Directory.",
    descriptionVi:
      "Datacenter tự host bốn VM Windows Server 2012 R2 trên VMware Workstation, gắn kết bằng Active Directory.",
    dates: "Jun 2019 to Sep 2019",
    category: "Coursework",
    tags: ["Windows Server", "Active Directory", "PowerShell", "VMware"],
  },
  {
    slug: "cisco-enterprise-lan",
    title: "Multi-Site Enterprise LAN with OSPF (Cisco)",
    titleVi: "Mạng LAN doanh nghiệp đa điểm với OSPF (Cisco)",
    course: "ET0716 LAN Switching and Wireless, Singapore Polytechnic",
    description:
      "Multi-site enterprise LAN with OSPF. Designed in Cisco Packet Tracer, then replicated on SP's physical Cisco rack.",
    descriptionVi:
      "LAN doanh nghiệp đa site với OSPF. Thiết kế trong Cisco Packet Tracer, sau đó dựng lại trên rack Cisco vật lý của SP.",
    dates: "Jun 2019 to Aug 2019",
    category: "Coursework",
    tags: ["Cisco", "OSPF", "Networking", "VLSM"],
  },
  {
    slug: "nepseeds",
    title: "Nepseeds: Plant E-Commerce",
    titleVi: "Nepseeds: Sàn thương mại điện tử cây cảnh",
    course: "Nepseeds (self-started)",
    courseVi: "Nepseeds (tự khởi nghiệp)",
    description:
      "Bootstrapped plant e-commerce. Live at nepseeds.com since July 2021.",
    descriptionVi:
      "Plant e-commerce bootstrap. Live tại nepseeds.com từ tháng 7 năm 2021.",
    dates: "Jul 2021 to Present",
    category: "Projects",
    tags: ["Shopify", "Operations", "E-Commerce"],
    liveLink: "https://nepseeds.com/",
  },
];

