// Case-study content for each project. Split out of projects.ts so
// the /projects index page bundle does not ship paragraphs of detail
// text it will never render. The detail page at /projects/[slug]
// imports both projects (slim) + caseStudies (heavy) and joins them.
//
// Auto-generated once by scripts/split-projects.mjs. Edits go here.

import type { CaseStudySection } from "./projects";

export type ProjectCaseStudy = {
  en?: CaseStudySection[];
  vi?: CaseStudySection[];
};

export const caseStudies: Record<string, ProjectCaseStudy> = {
  "inno2-nea-wastewater": {
    en: [
      {
        heading: "Context",
        body: [
          "In 2020 the National Environment Agency rolled out wastewater surveillance as a community-level COVID-19 early warning system. Inno2 (the W2 Industrial Services Hub initiative I worked on) built the cloud and edge stack that powered the deployment.",
          "We built it from scratch. By the time I rotated off the project, the platform was running across roughly 50 sites (migrant worker dormitories, residential blocks, and treatment facilities), with engineers visiting site cabinets daily to verify uptime. Deployment kept scaling past 360 sites after I left.",
        ],
      },
      {
        heading: "My role",
        body: [
          "Cloud and IoT engineer plus team lead. Joined as an SP-attached intern and stayed on as a W2 IoT Solutions consultant. Owned the Azure-side architecture, the integration between field RTUs, the broker, and the operations dashboard, and drove the team's day-to-day direction on what to build next.",
        ],
      },
      {
        heading: "Architecture",
        bullets: [
          "100+ Tastek industrial RTUs in the field. Each unit had a SIM card slot, so the RTU dialed straight out to the cloud over cellular.",
          "One Azure VM running everything: the Mosquitto MQTT broker, the database, and the web dashboard.",
          "Vertical scaling via an Auto-Scaling Group. When load grew, the VM scaled up rather than out. Basic, but reliable for the workload.",
          "Twilio WhatsApp Business API for alerts. Engineers registered their numbers once, then offline-RTU and threshold-breach notifications landed on WhatsApp.",
        ],
      },
      {
        heading: "Outcomes",
        bullets: [
          "Contributed to the Lee Hsien Loong IDM Smart Nation Award 2022 received by W2.",
          "Featured by [The Straits Times](https://www.straitstimes.com/singapore/wastewater-surveillance-sites-for-covid-19-to-double-by-2022-from-current-200-nea) when NEA announced the doubling of surveillance sites.",
          "Stayed in regular production use, with the alerting flow catching dropouts before site visits.",
        ],
      },
    ],
    vi: [
      {
        heading: "Bối cảnh",
        body: [
          "Năm 2020, National Environment Agency triển khai giám sát nước thải như một hệ thống cảnh báo sớm COVID-19 ở cấp cộng đồng. Inno2 (sáng kiến của W2 Industrial Services Hub mà tôi làm) xây dựng tầng cloud và edge phục vụ việc triển khai đó.",
          "Chúng tôi xây từ con số 0. Khi tôi rời dự án, hệ thống đang chạy trên khoảng 50 điểm (ký túc xá lao động nhập cư, khu dân cư, và các nhà máy xử lý), với kỹ sư đến các tủ thiết bị mỗi ngày để kiểm tra uptime. Sau khi tôi rời, hệ thống tiếp tục được mở rộng lên hơn 360 điểm.",
        ],
      },
      {
        heading: "Vai trò của tôi",
        body: [
          "Kỹ sư Cloud và IoT, kiêm trưởng nhóm. Bắt đầu là thực tập sinh gắn với SP, sau đó làm consultant IoT Solutions cho W2. Phụ trách kiến trúc phía Azure, việc tích hợp giữa các RTU thực địa, broker, và dashboard vận hành, đồng thời quyết định nhóm sẽ làm cái gì tiếp theo.",
        ],
      },
      {
        heading: "Kiến trúc",
        bullets: [
          "Hơn 100 RTU công nghiệp Tastek tại các điểm. Mỗi unit có khe SIM, nên RTU gọi thẳng lên cloud qua mạng di động.",
          "Một Azure VM chạy mọi thứ: Mosquitto MQTT broker, database, và dashboard web.",
          "Scale dọc qua Auto-Scaling Group. Khi load tăng, VM scale up thay vì scale out. Cơ bản, nhưng đáng tin cậy cho workload này.",
          "Twilio WhatsApp Business API cho cảnh báo. Kỹ sư đăng ký số điện thoại một lần, sau đó thông báo RTU offline và vượt ngưỡng tới qua WhatsApp.",
        ],
      },
      {
        heading: "Kết quả",
        bullets: [
          "Góp phần vào giải Lee Hsien Loong IDM Smart Nation Award 2022 mà W2 nhận được.",
          "Được [The Straits Times](https://www.straitstimes.com/singapore/wastewater-surveillance-sites-for-covid-19-to-double-by-2022-from-current-200-nea) đưa tin khi NEA công bố tăng gấp đôi số điểm giám sát.",
          "Vận hành production đều đặn, luồng cảnh báo bắt được các lần mất kết nối trước khi kỹ sư đến hiện trường.",
        ],
      },
    ],
  },
  "esmos-multi-cloud": {
    en: [
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
          "Team lead and solution architect. With the cloud and architecture background on the team, I drove the regional layout, the failover model, the DR runbook, and the diagram. I authored the Service Design Document the rest of the deliverables hung off, and wrote the rationale for each non-obvious choice (why Aurora Global over manual replication, why a second cloud for DR, why GCP just for DNS).",
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
    vi: [
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
          "Trưởng nhóm và solution architect. Với nền tảng cloud và kiến trúc trong team, tôi dẫn dắt regional layout, mô hình failover, DR runbook, và sơ đồ. Tôi viết Service Design Document mà phần còn lại của các deliverable bám theo, và viết lập luận cho mỗi lựa chọn không hiển nhiên (vì sao chọn Aurora Global thay vì replication thủ công, vì sao cần cloud thứ hai cho DR, vì sao GCP chỉ dùng cho DNS).",
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
  "osiris-hydroponics": {
    en: [
      {
        heading: "Context",
        body: [
          "Hydroponics in Singapore is a small market. Most of the activity sits on the supply side: selling grow racks to hobbyists and schools at low margin. There isn't a real ecosystem of funded operators beyond that.",
          "Osiris was an attempt to push past the rack itself. Smart vertical farming: daily irrigation and lighting on automatic cycles, device-agnostic relay control so anything plugged into a normal socket could be toggled remotely, and the operator only pulled in when something needed attention.",
        ],
      },
      {
        heading: "My role",
        body: [
          "Founder. I owned the hardware design, firmware, cloud pipeline, and the conversations with farmers. I led the funding pitch and the booth at World Cities Summit.",
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
          "ESP32 controller in a roughly 20×20 cm enclosure, mounted next to the rack. Wi-Fi to the local router.",
          "Relay switches wired to a standard socket panel: anything plugged into the panel (pump, light, fan, anything off a wall socket) becomes remotely toggleable. A hand-built device-agnostic smart plug strip, a few years before the consumer ones turned up on Shopee.",
          "Local daily schedule on the device so the rig keeps running if the cloud is unreachable. Telemetry pushed up to AWS S3.",
          "Web dashboard for the operator to monitor crop view, the daily cycle, and any alerts.",
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
          "Osiris pivoted away from a packaged hydroponics product into a systems-integrator model: custom IoT builds for other people's problems. Different shape, same crew.",
        ],
      },
    ],
    vi: [
      {
        heading: "Bối cảnh",
        body: [
          "Thủy canh ở Singapore là một thị trường nhỏ. Phần lớn hoạt động nằm ở mặt cung: bán giá thể trồng cho người chơi và trường học với biên lợi nhuận thấp. Không có hệ sinh thái thực sự của các nhà vận hành được tài trợ ngoài đó.",
          "Osiris là nỗ lực đi xa hơn chính cái giá thể. Smart vertical farming: chu kỳ tưới và đèn chiếu sáng hằng ngày tự động, điều khiển relay không phụ thuộc thiết bị nên bất cứ thứ gì cắm vào ổ cắm thông thường đều có thể bật-tắt từ xa, và người vận hành chỉ phải vào cuộc khi có chuyện thực sự cần.",
        ],
      },
      {
        heading: "Vai trò của tôi",
        body: [
          "Nhà sáng lập. Tôi phụ trách thiết kế phần cứng, firmware, pipeline cloud, và các cuộc trò chuyện với nông dân. Tôi dẫn dắt pitch xin tài trợ và gian trưng bày tại World Cities Summit.",
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
          "Bộ điều khiển ESP32 trong hộp khoảng 20×20 cm, gắn cạnh giá thể. Wi-Fi về router nội bộ.",
          "Relay switch nối vào bảng ổ cắm tiêu chuẩn: bất kỳ thiết bị nào cắm vào bảng (bơm, đèn, quạt, bất cứ thứ gì chạy điện ổ cắm) đều bật-tắt từ xa được. Một thanh smart plug không phụ thuộc thiết bị tự ráp tay, vài năm trước khi loại tương tự bán đại trà trên Shopee.",
          "Lịch hằng ngày chạy ngay trên thiết bị để rig vẫn hoạt động khi mất kết nối cloud. Telemetry đẩy lên AWS S3.",
          "Dashboard web cho người vận hành theo dõi camera giá thể, chu kỳ hằng ngày, và mọi cảnh báo.",
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
          "Osiris chuyển từ sản phẩm thủy canh đóng gói sang mô hình systems-integrator: các bản IoT tùy chỉnh cho bài toán của người khác. Hình dạng khác, vẫn cùng một crew.",
        ],
      },
    ],
  },
  "singapore-indoor-farms": {
    en: [
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
    ],
    vi: [
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
    ],
  },
  "royce-connect": {
    en: [
      {
        heading: "About",
        body: [
          "IS215 module project. The team picked Royce Dental, a Singapore dental chain, and framed the brief around the two numbers dental chains actually live by: no-show rate and recall conversion. The deliverable was a two-surface product: a patient mobile app for appointments and recall reminders, and an operations dashboard for managers to track retention by outlet and dig into no-show patterns.",
          "I was project lead. Drove the proposal, the strategic analysis (SWOT, Porter's Five Forces, market sizing), the product framing, and most of the team's deck. Built across both surfaces with the team.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript for the operations dashboard, deployed on Vercel.",
          "React Native for the patient app. Same TypeScript domain types shared with the web side.",
          "Preview deploys per branch so the team could iterate fast.",
        ],
      },
    ],
    vi: [
      {
        heading: "Giới thiệu",
        body: [
          "Project môn IS215. Team chọn Royce Dental, một chuỗi nha khoa ở Singapore, và đóng khung đề bài quanh hai con số mà chuỗi nha khoa thực sự sống bằng: tỉ lệ vắng hẹn (no-show) và recall conversion. Sản phẩm cuối là hai mặt: app mobile cho bệnh nhân để đặt lịch và nhắc hẹn, và dashboard vận hành cho quản lý theo dõi retention theo chi nhánh và phân tích các pattern no-show.",
          "Tôi là project lead. Phụ trách proposal, phân tích chiến lược (SWOT, Porter's Five Forces, market sizing), framing sản phẩm, và phần lớn deck của team. Làm chung cả hai mặt với team.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript cho operations dashboard, deploy trên Vercel.",
          "React Native cho app bệnh nhân. Chia sẻ TypeScript domain types với phía web.",
          "Preview deploy theo branch để iterate nhanh cùng team.",
        ],
      },
    ],
  },
  "signpost-collective-dashboard": {
    en: [
      {
        heading: "About",
        body: [
          "SMU-X project for Signpost Collective, paired with the coursework deliverable for COR1301 Leadership and Team Building. SMU-X engagements are real external client work: the client team uses what you ship and tells you what does not work, so the feedback loop is much tighter than a normal class brief.",
          "What the team built was an internal operations dashboard with role-based access (admin and member tiers, different view and edit permissions for each) and analytics views over the metrics their team actually cared about.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript for the dashboard.",
          "Deployed on Vercel with per-branch preview deploys so the client could review changes before merge.",
        ],
      },
    ],
    vi: [
      {
        heading: "Giới thiệu",
        body: [
          "Project SMU-X cho Signpost Collective, kết hợp với deliverable cho môn COR1301 Leadership and Team Building. SMU-X là engagement thực tế với khách hàng bên ngoài: team của khách dùng sản phẩm bạn ship và sẽ nói cho bạn biết cái gì không work, nên vòng phản hồi gần hơn nhiều so với đề bài lớp học thông thường.",
          "Cái team xây là một internal operations dashboard với role-based access (tier admin và member, mỗi bên có quyền view và edit khác nhau) và các analytics view trên những metric mà team họ thực sự quan tâm.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript cho dashboard.",
          "Deploy trên Vercel với preview deploy theo branch để khách review thay đổi trước khi merge.",
        ],
      },
    ],
  },
  "asv-5g-autonomous": {
    en: [
      {
        heading: "Context",
        body: [
          "Final Year Project at Singapore Polytechnic, contributing to the school's first SAE Level 3 autonomous 5G vehicle. The vehicle itself was a multi-team effort across mechatronics, controls, and IoT. My team owned the IoT subsystem: collecting telemetry from the vehicle and surfacing it to a remote operator over 5G.",
        ],
      },
      {
        heading: "My role",
        body: [
          "Led the 5-person IoT subteam. Coordinated the split between firmware, cloud, and dashboard work and steered what each phase shipped. On the build side I focused on the cloud and the dashboard integration.",
        ],
      },
      {
        heading: "Architecture",
        bullets: [
          "Node-RED firmware on a Raspberry Pi onboard the vehicle. Captured sensor telemetry (environmental + vehicle state) and pushed it out over MQTT through the 5G uplink.",
          "React + Node.js + MySQL on the cloud side. Live dashboard for the remote operator showing the vehicle's current state, with alerting rules on environmental hazard thresholds.",
          "5G as the transport. Lower latency and higher uplink throughput than LTE made remote teleop and live telemetry actually feasible at distance.",
        ],
      },
      {
        heading: "Where it stands",
        body: [
          "Final-year capstone, shipped to demo. The vehicle and the IoT subsystem stayed at SP as part of their autonomous-vehicle research track.",
        ],
      },
    ],
    vi: [
      {
        heading: "Bối cảnh",
        body: [
          "Final Year Project tại Singapore Polytechnic, đóng góp cho chiếc xe tự hành SAE Level 3 dùng 5G đầu tiên của trường. Chính chiếc xe là dự án đa nhóm trải dài mechatronics, controls, và IoT. Team của tôi phụ trách subsystem IoT: thu telemetry từ xe và đưa lên cho remote operator qua 5G.",
        ],
      },
      {
        heading: "Vai trò của tôi",
        body: [
          "Dẫn dắt subteam IoT 5 người. Điều phối phần chia việc giữa firmware, cloud, và dashboard, đồng thời quyết định mỗi pha sẽ ship cái gì. Về phần build, tôi tập trung vào cloud và việc tích hợp dashboard.",
        ],
      },
      {
        heading: "Kiến trúc",
        bullets: [
          "Firmware Node-RED chạy trên Raspberry Pi gắn trên xe. Thu telemetry sensor (môi trường + trạng thái xe) và đẩy ra qua MQTT thông qua uplink 5G.",
          "React + Node.js + MySQL phía cloud. Dashboard live cho remote operator hiển thị trạng thái hiện tại của xe, với rule cảnh báo các ngưỡng nguy cơ môi trường.",
          "5G làm transport. Độ trễ thấp hơn và uplink throughput cao hơn LTE giúp teleop từ xa và live telemetry thực sự khả thi ở khoảng cách.",
        ],
      },
      {
        heading: "Hiện tại",
        body: [
          "Capstone năm cuối, đã ship demo. Chiếc xe và subsystem IoT vẫn ở lại SP như một phần của track nghiên cứu autonomous vehicle.",
        ],
      },
    ],
  },
  "nepseeds": {
    en: [
      {
        heading: "About",
        body: [
          "Nepseeds is a specialized provider of rare Nepenthes seeds from Southeast Asia, with a focus on global shipping to enthusiasts and collectors worldwide. The mission is to enrich the Nepenthes hobby by offering a diverse selection of seeds and promoting the growth of unique and fascinating plant varieties.",
          "We take pride in the joy of seeing customers grow their own thriving Nepenthes from home, and we strive to provide the highest quality seeds and service. The site is live at [nepseeds.com](https://nepseeds.com/).",
        ],
      },
    ],
    vi: [
      {
        heading: "Giới thiệu",
        body: [
          "Nepseeds là nhà cung cấp chuyên biệt về hạt giống Nepenthes hiếm từ Đông Nam Á, tập trung vào việc giao hàng toàn cầu cho người chơi và nhà sưu tập trên khắp thế giới. Sứ mệnh là làm phong phú thêm cộng đồng chơi Nepenthes bằng cách cung cấp đa dạng hạt giống và thúc đẩy việc trồng các giống cây độc đáo, thú vị.",
          "Chúng tôi tự hào khi thấy khách hàng tự trồng được Nepenthes khỏe mạnh ngay tại nhà, và luôn cố gắng cung cấp hạt giống và dịch vụ chất lượng cao nhất. Trang web ở [nepseeds.com](https://nepseeds.com/).",
        ],
      },
    ],
  },
};
