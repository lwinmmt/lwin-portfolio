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
  caseStudy?: CaseStudySection[];
  /** Optional Vietnamese variant of the full case study. When set,
   *  replaces `caseStudy` for VI visitors. Heading + body + bullets
   *  all flip; technical tokens (AWS, MQTT, ESP32, Next.js, etc.)
   *  and proper nouns (people, places, project codenames) stay in
   *  their English form inside the translated prose. */
  caseStudyVi?: CaseStudySection[];
};

export const projects: Project[] = [
  {
    slug: "inno2-nea-wastewater",
    title: "Inno2: Cloud-Based Wastewater Monitoring System",
    titleVi: "Inno2: Hệ thống giám sát nước thải trên cloud",
    course: "W2 Industrial Services Hub",
    description:
      "Azure-hosted pipeline for 360-site NEA COVID-19 wastewater surveillance. 100+ Tastek industrial RTUs (embedded SIM) streaming directly over cellular to a single Azure VM running Mosquitto, the database, and the dashboard. Twilio WhatsApp alerts to the on-call engineers. Contributed to the Lee Hsien Loong IDM Smart Nation Award 2022. Straits Times feature.",
    descriptionVi:
      "Pipeline chạy trên Azure cho hệ thống giám sát nước thải COVID-19 của NEA tại 360 điểm. Hơn 100 RTU công nghiệp Tastek (gắn SIM tích hợp) truyền dữ liệu trực tiếp qua mạng di động về một Azure VM duy nhất chạy Mosquitto, database và dashboard. Cảnh báo Twilio WhatsApp gửi tới kỹ sư trực. Góp phần vào giải Lee Hsien Loong IDM Smart Nation Award 2022. Được Straits Times đưa tin.",
    dates: "Oct 2020 to Jul 2021",
    category: "Projects",
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
    caseStudyVi: [
      {
        heading: "Bối cảnh",
        body: [
          "Năm 2020, National Environment Agency triển khai giám sát nước thải như một hệ thống cảnh báo sớm COVID-19 ở cấp cộng đồng. Inno2 (sáng kiến của W2 Industrial Services Hub mà tôi làm) xây dựng tầng cloud và edge phục vụ việc triển khai đó.",
          "Phạm vi mở rộng nhanh. Chúng tôi bắt đầu khoảng 200 điểm và scale lên hơn 360 điểm, bao gồm ký túc xá lao động nhập cư, khu dân cư, và các nhà máy xử lý. Kỹ sư phải đến các tủ thiết bị mỗi ngày để kiểm tra uptime.",
        ],
      },
      {
        heading: "Vai trò của tôi",
        body: [
          "Kỹ sư Cloud và IoT trong một team nhỏ, ban đầu là thực tập sinh gắn với SP, sau đó làm consultant IoT Solutions cho W2. Tôi phụ trách kiến trúc phía Azure và việc tích hợp giữa các RTU ngoài thực địa, broker, và dashboard vận hành. Tôi cũng viết logic cảnh báo đẩy thông báo thiết bị offline qua Twilio WhatsApp.",
        ],
      },
      {
        heading: "Kiến trúc",
        bullets: [
          "Hơn 100 RTU công nghiệp Tastek tại các điểm. Mỗi unit có khe SIM, nên RTU gọi thẳng lên cloud qua mạng di động. Không có edge gateway ở giữa.",
          "Một Azure VM chạy mọi thứ: Mosquitto MQTT broker, database, và dashboard web. Monolith thuần, không microservice.",
          "Scale dọc qua Auto-Scaling Group. Khi load tăng, VM scale up thay vì scale out. Cơ bản, nhưng đáng tin cậy cho workload này.",
          "Twilio WhatsApp Business API cho cảnh báo. Kỹ sư đăng ký số điện thoại một lần, sau đó thông báo RTU offline và vượt ngưỡng tới qua WhatsApp.",
        ],
      },
      {
        heading: "Kết quả",
        bullets: [
          "Góp phần vào giải Lee Hsien Loong IDM Smart Nation Award 2022 mà W2 nhận được.",
          "Được [The Straits Times](https://www.straitstimes.com/singapore/wastewater-surveillance-sites-for-covid-19-to-double-by-2022-from-current-200-nea) đưa tin khi NEA công bố tăng gấp đôi số điểm giám sát.",
          "Vận hành production đều đặn trên 360 điểm, luồng cảnh báo bắt được các lần mất kết nối trước khi kỹ sư đến hiện trường.",
        ],
      },
      {
        heading: "Bài học",
        body: [
          "IoT thực địa ở quy mô này chủ yếu là về các failure mode mà bạn không nhìn thấy trong demo. Thiết bị reboot khi trời mưa. SIM roam sang sai trạm. Reconnect storm xảy ra lúc 3 giờ sáng. Hệ thống phải giả định mọi link là lossy và mọi thiết bị sẽ lừa bạn sớm muộn.",
          "Tầng cảnh báo chính là sản phẩm. Một dashboard không ai mở còn tệ hơn một tin nhắn WhatsApp đánh thức kỹ sư đúng lúc.",
          "Monolith single-VM bị chê nhiều, nhưng với quy mô này thì đây là lựa chọn đúng. Ít phần chuyển động hơn, ít page hơn.",
        ],
      },
    ],
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
    caseStudyVi: [
      {
        heading: "Bối cảnh",
        body: [
          "ESMOS là một nhà cung cấp dịch vụ y tế khu vực hư cấu cần scale một hệ thống lâm sàng dựa trên Odoo ra khắp APAC, với yêu cầu khắt khe về availability, disaster recovery, và data sovereignty. Đề bài môn học yêu cầu một enterprise solution: đa vùng, đa cloud, có RTO và RPO rõ ràng.",
          "Tôi tiếp cận nó như một architecture review thật. Sơ đồ bên dưới là output v9.4: bốn cloud, ba AWS region active, một Azure DR + Helpdesk always-active, edge Cloudflare, GCP làm secondary nameserver cho DNS resilience, và đường backup tới Cloudflare R2.",
        ],
      },
      {
        heading: "Vai trò của tôi",
        body: [
          "Trưởng nhóm và solution architect, mặc định: tôi là người có nền tảng cloud và kiến trúc, nên tôi dẫn dắt regional layout, mô hình failover, DR runbook, và sơ đồ. Tôi viết Service Design Document mà phần còn lại của các deliverable bám theo, và viết lập luận cho mỗi lựa chọn không hiển nhiên (vì sao chọn Aurora Global thay vì replication thủ công, vì sao cần cloud thứ hai cho DR, vì sao GCP chỉ dùng cho DNS).",
        ],
      },
      {
        heading: "Kiến trúc, phiên bản ngắn",
        bullets: [
          "Ba AWS region: Singapore primary, Tokyo và Sydney active replica. Mỗi region chạy EKS cluster riêng với cùng một Odoo deployment. Latency routing ở edge gửi mỗi user về region gần nhất.",
          "Aurora Global Database làm single source of truth. Tokyo và Sydney đọc SG primary qua VPC peering; khi SG region fail, Aurora promote một secondary với RTO dưới một phút. Nếu cả SG và TK đều down, Sydney promote.",
          "Azure East Asia tại Hong Kong làm cross-cloud DR target. AKS nằm idle cho đến khi Cloudflare DNS failover (gated bởi /healthz write validation) chuyển traffic. Odoo Helpdesk trên Azure chạy always-active trên subdomain riêng.",
          "Cloudflare cho edge (WAF, DDoS, CDN, TLS) và authoritative DNS. GCP Cloud DNS giữ secondary NS records để DNS bản thân nó vẫn sống sót khi Cloudflare control-plane gặp sự cố.",
          "Cloudflare R2 cho cold archival: snapshot Aurora hằng ngày được export sang R2 và life-cycle sang tier dài hạn sau 90 ngày. Backup Helpdesk đẩy vào Azure Blob.",
          "Moodle trên EC2 trong Auto Scaling Group, dùng WireGuard cho staff access. Upload video chạy S3 sang Lambda sang MediaConvert ra HLS, rồi đi tiếp qua Cloudflare CDN.",
          "BetterStack làm uptime check ngoài. CloudWatch Container Insights theo từng region được roll up vào cross-region dashboard, với SNS đẩy alarm email.",
        ],
      },
      {
        heading: "Các quyết định đáng bàn",
        body: [
          "**Aurora Global thay vì replication tự dựng giữa các region.** Failover được quản lý, RTO dưới một phút, và đội vận hành không phải canh replication lag. Đánh đổi là vendor lock-in, nhưng với workload y tế thì sự đơn giản về vận hành thắng.",
          "**Multi-cloud DR thay vì multi-region trong AWS.** Đề bài yêu cầu cụ thể khả năng chịu được sự cố ở một vendor duy nhất. Azure DR thêm chi phí và độ phức tạp thật, nhưng đó là cách duy nhất để thực sự trả lời câu hỏi được đặt ra. Nếu đây là startup của riêng tôi, tôi sẽ phản biện yêu cầu này trước đã.",
          "**DNS failover gate bằng /healthz.** Failover chỉ flip khi một health check write-path xác nhận Azure DR sẵn sàng nhận traffic. Bảo hiểm rẻ chống flapping, và ép runbook phải trung thực về định nghĩa 'ready'.",
          "**GCP chỉ cho DNS.** DNS ba vendor nghe có vẻ overkill, nhưng DNS là failure surface thảm khốc nhất trong setup multi-cloud. Đặt secondary NS ở bên thứ ba khiến bản thân DNS sống sót qua mọi sự cố ở một vendor.",
        ],
      },
      {
        heading: "Bài học",
        body: [
          "Enterprise architecture chủ yếu là đọc đánh đổi một cách trung thực. Mỗi đường trên sơ đồ này tốn một cái gì đó. Phần thú vị là biện minh cho từng đường, không phải thêm nhiều đường.",
          "Multi-cloud DR hiếm trong thực tế vì nó nhân đôi bề mặt vận hành. Chi phí chỉ đáng trả khi regulator hoặc khách hàng yêu cầu bằng văn bản. ESMOS có yêu cầu, nên sơ đồ có nó.",
          "Vẽ sơ đồ trong một tool thật (Eraser, export sang SVG) ăn đứt việc chụp màn hình Lucid mọi lần. Version control sạch sẽ, scale không mất chất lượng, và cùng một file là thứ bạn đang thấy nhúng trên trang này phía trên.",
        ],
      },
    ],
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
    caseStudyVi: [
      {
        heading: "Bối cảnh",
        body: [
          "Các doanh nghiệp thủy canh vừa và nhỏ ở Singapore vận hành bằng team gọn, biên lợi nhuận mỏng. Tưới tiêu và chiếu sáng phần lớn vẫn là thủ công hoặc chạy bằng timer ngu, dẫn đến mất mùa khi bơm hỏng qua đêm và tưới quá đà khi điều kiện thay đổi.",
          "Osiris là một nỗ lực sản phẩm cho thứ nhỏ nhất nhưng có ích: một controller tự động hóa chu kỳ hằng ngày và báo cho người vận hành khi có gì đó sai, mà không bắt họ phải học một dashboard.",
        ],
      },
      {
        heading: "Vai trò của tôi",
        body: [
          "Nhà sáng lập. Tôi phụ trách thiết kế phần cứng, firmware, pipeline cloud, và các cuộc trò chuyện với nông dân. Tôi dẫn dắt pitch xin tài trợ và gian trưng bày tại World Cities Summit. Các quyết định kiến trúc và đánh đổi là của tôi.",
        ],
      },
      {
        heading: "Tài trợ và xác thực",
        body: [
          "Được tài trợ bởi [quỹ tăng tốc SMU BIG (Business Innovations Generator)](https://iie.smu.edu.sg/acceleration-grant) thuộc SMU IIE. Được điểm danh trong danh sách 9 startup sinh viên SMU đáng theo dõi của [Singapore Business Review](https://sbr.com.sg/markets-investing/exclusive/meet-9-singapore-students-promising-business-ventures).",
        ],
      },
      {
        heading: "Kiến trúc",
        bullets: [
          "Controller dựa trên ESP32 với relay điều khiển bơm tưới và đèn LED trồng cây. Lịch chạy hằng ngày lưu local trên thiết bị để hệ thống vẫn hoạt động khi cloud không kết nối.",
          "Telemetry đẩy lên AWS S3. Rẻ, đơn giản, và đủ tốt cho quy mô ban đầu.",
          "Dashboard web cho người nông dân theo dõi tình trạng cây, chu kỳ hằng ngày, và các cảnh báo.",
        ],
      },
      {
        heading: "Khoảnh khắc trưng bày",
        bullets: [
          "World Cities Summit 2024 tại gian SMU IIE. Demo Osiris cho Bộ trưởng Indranee Rajah và Desmond Lee.",
          "Được giới thiệu trên Singapore Business Review.",
          "Demo nội bộ tại SMU IIE cho cohort BIG.",
        ],
      },
      {
        heading: "Hiện tại",
        body: [
          "Osiris vẫn tiếp tục dưới một hình thức khác. Sản phẩm thủy canh ban đầu dừng ship, nhưng công ty xoay trục sang mô hình tư vấn kiểu systems-integrator cho các project IoT đặt riêng.",
          "Nền tảng ban đầu (controller ESP32, pipeline cloud, dashboard) hóa ra dùng lại được trên nhiều lĩnh vực: cùng kiến trúc được redeploy với các sensor khác cho các bài toán khác. Những bài học sớm về độ tin cậy firmware, supply chain, và triển khai đi theo cùng.",
        ],
      },
    ],
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
    caseStudyVi: [
      {
        heading: "Bối cảnh",
        body: [
          "Một trang trại trong nhà ở phía tây Singapore muốn có một bộ thiết bị IoT nhỏ gọn dễ nhìn để trưng cho khách đi tham quan cơ sở của họ. Không phải triển khai full quy mô, chỉ là một rack demo đặt trên sàn nhà để chứng minh đường đi của dữ liệu end-to-end và để khách thấy số liệu live.",
          "Đây là một việc freelance của W2 trong giai đoạn tôi thực tập IoT tại SP. Phạm vi được giữ hẹp có chủ đích: chứng minh vòng lặp hoạt động, hiển thị số trên màn hình, cho người vận hành bật relay.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Một Raspberry Pi tại rack. GPIO nối với cảm biến độ ẩm DHT22 và một cảm biến CO2 riêng.",
          "Camera Raspberry Pi (các phiên bản sau thay bằng module audio) để giám sát hình ảnh của rack.",
          "Relay từ GPIO của Pi để bật / tắt đèn trồng cây và bơm nước.",
          "View giám sát để người vận hành theo dõi số đo và kích hoạt cảnh báo đơn giản. Hữu ích cho demo, không phải nền tảng production.",
        ],
      },
      {
        heading: "Đem lại gì cho khách hàng",
        body: [
          "Bộ thiết bị này vừa là công cụ bán hàng vừa là sensor stack. Team của trang trại dùng nó để dẫn khách đi qua câu chuyện nông nghiệp trong nhà dựa trên dữ liệu trông thế nào. CNA đưa tin vào tháng 5/2022 trong bài về Singapore Indoor Farms.",
        ],
      },
      {
        heading: "Bài học",
        body: [
          "Phạm vi nhỏ và có chủ đích có thể vượt qua phạm vi phức tạp. Cùng nỗ lực kỹ thuật bỏ vào việc làm cho một trăm cảm biến chạy không hoàn hảo sẽ không có ích bằng việc làm cho một rack thực sự chạy trước mặt khách.",
          "Demo phần cứng khác sản phẩm phần cứng. Tiêu chí cho demo là live và đọc được trên màn hình. Tiêu chí cho sản phẩm là các failure mode xuất hiện lúc 3 giờ sáng.",
        ],
      },
    ],
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
    caseStudyVi: [
      {
        heading: "Bối cảnh",
        body: [
          "Đề bài IS215 yêu cầu một dự án số hóa end-to-end cho một doanh nghiệp thật (hoặc gần như thật). Tôi đề xuất dùng Royce Dental, một chuỗi nha khoa tại Singapore, và team đồng ý. Các chuỗi nha khoa ở Singapore sống chết bằng hai con số: tỉ lệ trễ hẹn và tỉ lệ tái khám, nên đề bài có sức nặng thật một khi đã đóng khung như vậy.",
          "Đây là bài tập học thuật, không phải dự án với khách hàng thật. Chúng tôi không triển khai cho phòng khám thật. Hãy xem những gì có ở live link là bản prototype mà chúng tôi ship lúc kết thúc môn học.",
        ],
      },
      {
        heading: "Vai trò của tôi",
        body: [
          "Trưởng dự án. Tôi dẫn dắt việc đề xuất, phân tích chiến lược (SWOT, Porter's Five Forces, ước tính thị trường mục tiêu), đóng khung sản phẩm, và phần lớn deck thuyết trình. Về phần build, tôi làm việc trên cả hai mặt cùng team.",
        ],
      },
      {
        heading: "Hai mặt, một nền tảng",
        bullets: [
          "**Ứng dụng di động cho bệnh nhân**: đặt lịch hẹn, nhắc tái khám, và vòng xác nhận một chạm được thiết kế để kéo tỉ lệ trễ hẹn xuống.",
          "**Dashboard vận hành**: đường cong giữ chân khách theo từng chi nhánh, phân tích trễ hẹn, và các view ngày / tuần mà người quản lý phòng khám thực sự mở.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript cho dashboard vận hành, deploy trên Vercel.",
          "React Native cho ứng dụng bệnh nhân. Dùng chung các type domain TypeScript với phần web.",
          "Cả hai app được cấu hình preview deploy nhanh theo nhánh để chúng tôi iterate cùng team nhanh chóng.",
        ],
      },
      {
        heading: "Bài học",
        body: [
          "Sản phẩm hai mặt chủ yếu là về phần ráp nối giữa chúng. Ứng dụng bệnh nhân và dashboard vận hành trông như hai sản phẩm khác nhau với người dùng cuối, nhưng chúng dùng chung một domain model. Làm đúng model đó (appointments, patients, recalls, outlets) chiếm 70% công việc kỹ thuật.",
          "Chiến lược và đóng khung sản phẩm có sức nặng hơn code trong các bài tập học thuật kiểu này. SWOT, phân tích Porter, và deck là thứ đã chinh phục phòng. Bản build chỉ là bằng chứng, không phải phần pitch.",
        ],
      },
      {
        heading: "Tài liệu",
        body: [
          "Tôi sẽ upload deck cuối (SWOT, Porter's Five Forces, ước tính thị trường, lộ trình số hóa đầy đủ) lên trang này sau khi dọn dẹp cho phù hợp public.",
        ],
      },
    ],
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
    caseStudyVi: [
      {
        heading: "Bối cảnh",
        body: [
          "Xây cho Signpost Collective dưới dạng dự án [SMU-X](https://x.smu.edu.sg/) đồng thời là deliverable môn học cho COR1301 Leadership and Team Building. Dự án SMU-X là các engagement thật với tổ chức bên ngoài: team khách hàng thực sự dùng thứ bạn ship và nói cho bạn biết khi nó không hoạt động.",
        ],
      },
      {
        heading: "Cái chúng tôi xây",
        bullets: [
          "Dashboard vận hành nội bộ cho team Signpost Collective.",
          "Phân quyền theo vai trò với hai cấp admin và member, mỗi cấp có quyền xem và sửa khác nhau.",
          "Các view analytics đưa ra các chỉ số vận hành mà team quan tâm.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript cho dashboard.",
          "Deploy trên Vercel với preview deploy theo từng nhánh để khách hàng review thay đổi trước khi merge.",
        ],
      },
      {
        heading: "Bài học",
        body: [
          "Dự án SMU-X không phải là coursework dán nhãn lại. Một team khách hàng thật dùng thứ bạn ship và sẽ nói cho bạn biết trong buổi gặp tiếp theo khi nó không phù hợp với họ. Vòng phản hồi đó mài giũa product instinct nhanh hơn bất kỳ case study brief nào.",
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
    descriptionVi:
      "Ý tưởng aggregator gọi xe: một màn hình so sánh giá cước và thời gian chờ trên Grab, Tada và các ứng dụng khác trước khi đặt. Đạt giải Nhất tại SMU PMx Internal Product Challenge.",
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
    caseStudyVi: [
      {
        heading: "Bối cảnh",
        body: [
          "Thị trường gọi xe ở Singapore phân mảnh. Grab, Tada và một số app khác phục vụ các tuyến chồng lấn với giá cước và thời gian chờ khác nhau, và không có cách dễ dàng để so sánh chúng tại một nơi trước khi đặt. Bạn phải mở ba app chỉ để ra một quyết định.",
          "GrabCompare là một ý tưởng sản phẩm gom các chuyến đi từ nhiều nhà cung cấp vào một view xếp hạng. Chọn điểm đến, xem hết các lựa chọn cạnh nhau, đặt qua đúng app.",
        ],
      },
      {
        heading: "Vai trò của tôi",
        body: [
          "Trưởng dự án trong team 3 người. Tôi dẫn dắt việc đóng khung sản phẩm, deck và phần pitch trực tiếp. Đạt giải Nhất tại SMU Product Management Experience Internal Product Challenge tháng 10/2023.",
        ],
      },
      {
        heading: "Vì sao nó thuyết phục",
        body: [
          "Pattern aggregator thì quen thuộc: ban giám khảo không phải tưởng tượng sản phẩm sẽ thế nào vì họ đã dùng các tool tương tự cho vé máy bay và khách sạn. Điều đó cho phép phần pitch tập trung vào các câu hỏi khó hơn về local execution (API nào tích hợp, làm gì khi một app báo 5 phút còn một app báo 12, xử lý surge giá khắp các app thế nào) thay vì tranh luận liệu category này có nên tồn tại không.",
        ],
      },
      {
        heading: "Tài liệu",
        body: [
          "Hiện chưa upload deck hay repo công khai. Nếu tôi tìm lại được slide từ folder cohort tôi sẽ đính kèm ở đây.",
        ],
      },
    ],
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
    caseStudyVi: [
      {
        heading: "Bối cảnh",
        body: [
          "Một bài tập blue-team đấu red-team kinh điển trên một máy Windows Server 2000 cố tình để lỗ hổng. Mục tiêu: lấy một baseline đã biết là tệ, hardening nó trước các vector tấn công phổ biến của thời đó, rồi xác minh việc hardening có thật sự giữ vững trước khi probing chủ động hay không.",
        ],
      },
      {
        heading: "Các bước hardening",
        bullets: [
          "Hạn chế DNS zone transfer để nslookup từ ngoài không thể dump toàn bộ zone.",
          "Triển khai IIS Lockdown Tool để tắt các tính năng IIS không dùng và giảm bề mặt tấn công.",
          "Thay stack remote access không an toàn bằng CopSSH (OpenSSH chạy trên Windows qua Cygwin).",
          "Áp policy mật khẩu mạnh qua Group Policy: độ phức tạp, độ dài, ngưỡng khóa tài khoản.",
        ],
      },
      {
        heading: "Xác minh",
        body: [
          "Tuyên bố hardening không giá trị nếu không có xác minh. Tôi chạy lại các probe đã dùng với baseline trên máy đã hardening: thử nslookup zone transfer, quét cổng nmap tìm service mở bất ngờ, thử xác thực trên bề mặt remote access cũ. Mọi probe đã hoạt động trước đó phải fail sau khi hardening.",
        ],
      },
      {
        heading: "Vì sao lab này vẫn quan trọng",
        body: [
          "Phần mềm cụ thể đã có vài thập kỷ tuổi, nhưng mindset chuyển thẳng sang công việc bảo mật hiện đại: giả định baseline đã bị bẻ, hardening bằng cách loại bỏ bề mặt trước, rồi xác minh bằng probing chủ động. Hầu hết các hệ thống production tôi đụng tới sau này (giám sát nước thải, Osiris) đều có các giả định broken-by-default đáng nghi vấn tương tự.",
        ],
      },
    ],
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
    caseStudyVi: [
      {
        heading: "Khởi đầu",
        body: [
          "Bắt đầu năm 2021 cùng một người bạn đang trồng cây nepenthes (cây nắp ấm ăn thịt) và bán làm thú vui trên Carousell. Khối lượng cứ tăng dần. Cuối cùng việc chính thức hóa thành một brand thật với compliance thật, fulfillment thật, và một tập khách hàng thật là hợp lý.",
        ],
      },
      {
        heading: "Trở thành cái gì",
        body: [
          "Một dự án e-commerce cây cảnh tự thân, tập trung vào hàng hóa thực vật dễ hỏng và bị quản lý. Chứng nhận kiểm dịch thực vật NEA cho hàng xuất khẩu, tuân thủ CITES cho các loài được bảo vệ chúng tôi bán, chuỗi cung ứng end-to-end từ nhà vườn đến đơn hàng đã ship. Trang web đang chạy tại [nepseeds.com](https://nepseeds.com/).",
        ],
      },
      {
        heading: "Tôi học được gì",
        body: [
          "Bootstrap một doanh nghiệp sản phẩm vật lý dạy một bộ kỹ năng khác hẳn với ship phần mềm. Toán tồn kho. Giấy tờ kiểm dịch thực vật. Sự khác biệt giữa khách hàng giận vì cây tới trễ và khách hàng giận vì lô hàng trước bị sai. Công việc vận hành dồn lại: những fix process nhỏ tiết kiệm hàng giờ mỗi tuần.",
          "Nó cũng dạy tôi khi nào KHÔNG nên over-engineer. Một cửa hàng Shopify với workflow fulfillment chặt chẽ ăn đứt một platform tự xây cho quy mô này.",
        ],
      },
    ],
  },
];

