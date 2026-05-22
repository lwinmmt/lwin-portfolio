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
      "Multi-region AWS (Singapore, Tokyo, Sydney) + Azure DR (Hong Kong) + Cloudflare edge with GCP secondary NS. Architecture diagram embedded inline on the case study page; click to open full size and pan or zoom around the four clouds.",
    descriptionVi:
      "AWS đa vùng (Singapore, Tokyo, Sydney) + Azure DR (Hong Kong) + Cloudflare edge với GCP làm nameserver dự phòng. Sơ đồ kiến trúc nhúng trực tiếp trong trang case study, bấm vào để mở cỡ lớn và pan / zoom quanh bốn cloud.",
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
      "ESP32-driven irrigation and lighting automation for hydroponic SMEs. AWS S3 data pipeline. SMU BIG grant funded. Showcased to Ministers Indranee Rajah and Desmond Lee at World Cities Summit 2024.",
    descriptionVi:
      "Tự động hóa tưới tiêu và chiếu sáng cho các doanh nghiệp thủy canh vừa và nhỏ, dùng ESP32. Pipeline dữ liệu trên AWS S3. Được tài trợ bởi quỹ SMU BIG. Trình diễn cho Bộ trưởng Indranee Rajah và Desmond Lee tại World Cities Summit 2024.",
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
      "Raspberry Pi rig with DHT22 humidity, a CO2 sensor, and relay-driven control of the grow lights and water pump. Deployed as a single demo rack at an indoor farm on the west coast of Singapore. Featured on Channel News Asia in May 2022.",
    descriptionVi:
      "Bộ thiết bị Raspberry Pi với cảm biến độ ẩm DHT22, cảm biến CO2 và điều khiển đèn trồng cây cùng máy bơm nước qua relay. Triển khai dưới dạng một rack demo tại một trang trại trong nhà ở phía tây Singapore. Được Channel News Asia đưa tin vào tháng 5 năm 2022.",
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
      "Internal operations dashboard for Signpost Collective. SMU-X engagement with real client use. Admin and member role-based access plus analytics views.",
    descriptionVi:
      "Dashboard vận hành nội bộ cho Signpost Collective. Dự án SMU-X có khách hàng thật sử dụng. Phân quyền theo vai trò admin và member, kèm các view phân tích.",
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
  },
  {
    slug: "asv-5g-autonomous",
    title: "5G-Enabled Autonomous Surveillance Vehicle (IoT Subsystem)",
    titleVi: "Xe tuần tra tự hành kết nối 5G (mảng IoT)",
    course: "Final Year Project, Singapore Polytechnic",
    courseVi: "Đồ án tốt nghiệp, Singapore Polytechnic",
    description:
      "Final Year Project contributing to SP's first SAE Level 3 autonomous 5G vehicle. Led a 5-person IoT subteam building a cloud-based monitoring dashboard in React, Node.js, and MySQL. Node-RED firmware on Raspberry Pi captured telemetry over MQTT, with alerting on environmental hazards and battery thresholds. Featured at SP Engineering Show 2021.",
    descriptionVi:
      "Đồ án tốt nghiệp đóng góp vào chiếc xe tự hành 5G SAE Level 3 đầu tiên của SP. Dẫn dắt nhóm IoT 5 người xây dashboard giám sát trên cloud bằng React, Node.js và MySQL. Firmware Node-RED chạy trên Raspberry Pi thu telemetry qua MQTT, cảnh báo các nguy cơ môi trường và ngưỡng pin. Trưng bày tại SP Engineering Show 2021.",
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
      "Hardened vulnerable Windows Server 2000 against common exploitation vectors. Restricted DNS zone transfers, deployed IIS Lockdown Tool, replaced insecure remote access with CopSSH, enforced strong password policies via Group Policy. Validated through active penetration testing (nslookup zone transfers, nmap port scanning).",
    descriptionVi:
      "Hardening một máy Windows Server 2000 có lỗ hổng trước các vector tấn công phổ biến. Hạn chế DNS zone transfer, triển khai IIS Lockdown Tool, thay remote access không an toàn bằng CopSSH, áp policy mật khẩu mạnh qua Group Policy. Kiểm chứng bằng penetration test chủ động (nslookup zone transfer, quét cổng nmap).",
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
      "Architected hub-and-spoke WAN topology in Cisco Packet Tracer Multi-User mode. Connected 3 branch offices to central HQ across simulated internet backbone with hierarchical IP addressing (172.23.0.0/16), RIPv2 routing with PPP auth, DHCP, and standard/extended ACL policies.",
    descriptionVi:
      "Thiết kế topology WAN hub-and-spoke trong Cisco Packet Tracer chế độ Multi-User. Kết nối 3 chi nhánh về trụ sở chính qua backbone internet mô phỏng, với sơ đồ địa chỉ IP phân cấp (172.23.0.0/16), định tuyến RIPv2 kèm xác thực PPP, DHCP và các policy ACL chuẩn / mở rộng.",
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
      "Self-hosted virtualized datacenter on VMware Workstation. 4 Windows Server 2012 R2 instances (Domain Controller, DNS/DHCP, File Server, Web Server). Active Directory with hierarchical OUs, scripted bulk user provisioning for 50+ accounts via PowerShell, enforced Group Policies with 5GB storage quotas.",
    descriptionVi:
      "Datacenter ảo hóa tự host trên VMware Workstation. 4 instance Windows Server 2012 R2 (Domain Controller, DNS/DHCP, File Server, Web Server). Active Directory với OU phân cấp, script PowerShell tạo hàng loạt 50+ tài khoản, áp Group Policy kèm quota lưu trữ 5GB.",
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
      "Multi-site enterprise network using 7 Cisco routers and 5 switches in a hybrid environment (Packet Tracer + SP physical server racks). Star-topology LAN supporting 12+ endpoints and 2 internal servers. VLSM IP scheme, OSPF multi-area routing with failover, ACL-based access policies.",
    descriptionVi:
      "Mạng doanh nghiệp đa địa điểm với 7 router Cisco và 5 switch trong môi trường hybrid (Packet Tracer + rack server vật lý của SP). LAN topology hình sao hỗ trợ 12+ endpoint và 2 server nội bộ. Sơ đồ IP VLSM, định tuyến OSPF đa vùng có failover, các policy truy cập dựa trên ACL.",
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
      "Bootstrapped plant e-commerce since July 2021. End-to-end supply chain for perishable, regulated botanical inventory including NEA phytosanitary certifications and CITES compliance. 98% on-time fulfillment, grew social following 600 to 1000+ organically.",
    descriptionVi:
      "Vận hành e-commerce cây cảnh tự thân từ tháng 7 năm 2021. Chuỗi cung ứng end-to-end cho hàng hóa thực vật dễ hỏng và bị quản lý, gồm chứng nhận kiểm dịch thực vật NEA và tuân thủ CITES. Tỉ lệ giao đúng hẹn 98%, tăng follower mạng xã hội từ 600 lên hơn 1000 một cách tự nhiên.",
    dates: "Jul 2021 to Present",
    category: "Projects",
    tags: ["Shopify", "Operations", "E-Commerce"],
    liveLink: "https://nepseeds.com/",
  },
];

