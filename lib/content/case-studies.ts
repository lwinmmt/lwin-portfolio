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
          "Cloud and IoT engineer plus team lead on a five-person team. Joined as an SP-attached intern and stayed on as a W2 IoT Solutions consultant. Owned the Azure-side architecture, the integration between field RTUs, the broker, and the operations dashboard, and drove the team's day-to-day direction on what to build next.",
        ],
      },
      {
        heading: "Architecture",
        bullets: [
          "100+ Tastek industrial RTUs in the field. Each unit had a SIM card slot, so the RTU dialed straight out to the cloud over cellular.",
          "One Azure VM running everything: the Mosquitto MQTT broker, the database, and the web dashboard.",
          "Vertical scaling via an Auto-Scaling Group. When load grew, the VM scaled up rather than out. Reliable for the workload size we were running.",
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
          "Kỹ sư Cloud và IoT, kiêm trưởng nhóm trong team năm người. Bắt đầu là thực tập sinh gắn với SP, sau đó làm consultant IoT Solutions cho W2. Phụ trách kiến trúc phía Azure, việc tích hợp giữa các RTU thực địa, broker, và dashboard vận hành, đồng thời quyết định nhóm sẽ làm cái gì tiếp theo.",
        ],
      },
      {
        heading: "Kiến trúc",
        bullets: [
          "Hơn 100 RTU công nghiệp Tastek tại các điểm. Mỗi unit có khe SIM, nên RTU gọi thẳng lên cloud qua mạng di động.",
          "Một Azure VM chạy mọi thứ: Mosquitto MQTT broker, database, và dashboard web.",
          "Scale dọc qua Auto-Scaling Group. Khi load tăng, VM scale up thay vì scale out. Đáng tin cậy với workload chúng tôi chạy.",
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
          "Every line on this diagram costs something to operate, monitor, or recover from. Most of the work on this project was justifying each line in writing, against the brief, before adding it.",
          "Multi-cloud DR is rare in practice because it doubles the operational surface area. The brief here explicitly required resilience against a single-vendor incident, so the diagram has it.",
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
          "Mỗi đường trên sơ đồ này đều tốn chi phí để vận hành, giám sát, hoặc khôi phục. Phần lớn công việc trong dự án này là biện minh cho từng đường bằng văn bản, đối chiếu với đề bài, trước khi thêm nó vào.",
          "Multi-cloud DR hiếm trong thực tế vì nó nhân đôi bề mặt vận hành. Đề bài ở đây yêu cầu rõ ràng khả năng chịu được sự cố ở một vendor duy nhất, nên sơ đồ có nó.",
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
          "Founder. Recruited the core team out of SMU and split the work across hardware, firmware, and cloud. On the build side I owned the hardware design, the ESP32 firmware, and the cloud pipeline up through the HiveMQ broker into S3. Outside the build I ran the SMU BIG grant pitch, led the conversations with the farmers we were selling into, and ran the booth at World Cities Summit 2024 where we demoed to Ministers Indranee Rajah and Desmond Lee.",
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
          "Relay switches wired to a standard socket panel: anything plugged into the panel (pump, light, fan, anything off a wall socket) becomes remotely toggleable. A hand-built device-agnostic smart plug strip.",
          "Local daily schedule on the device so the rig keeps running if the cloud is unreachable. Telemetry pushed up over MQTT through HiveMQ Cloud, then landed in AWS S3.",
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
          "Osiris pivoted away from a packaged hydroponics product into a systems-integrator model. Now it builds custom IoT systems for clients in industries like construction.",
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
          "Nhà sáng lập. Tuyển team core từ SMU và chia việc giữa hardware, firmware, và cloud. Về mặt build, tôi phụ trách thiết kế phần cứng, firmware ESP32, và pipeline cloud chạy qua HiveMQ broker vào S3. Ngoài việc build, tôi dẫn dắt pitch xin quỹ SMU BIG, các cuộc trò chuyện với nông dân tụi tôi muốn bán cho, và gian trưng bày tại World Cities Summit 2024 nơi tụi tôi demo cho Bộ trưởng Indranee Rajah và Desmond Lee.",
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
          "Relay switch nối vào bảng ổ cắm tiêu chuẩn: bất kỳ thiết bị nào cắm vào bảng (bơm, đèn, quạt, bất cứ thứ gì chạy điện ổ cắm) đều bật-tắt từ xa được. Một thanh smart plug không phụ thuộc thiết bị tự ráp tay.",
          "Lịch hằng ngày chạy ngay trên thiết bị để rig vẫn hoạt động khi mất kết nối cloud. Telemetry đẩy lên qua MQTT thông qua HiveMQ Cloud, sau đó lưu vào AWS S3.",
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
          "Osiris chuyển từ sản phẩm thủy canh đóng gói sang mô hình systems-integrator. Giờ thì xây dựng các hệ thống IoT tùy chỉnh cho khách trong các ngành như xây dựng.",
        ],
      },
    ],
  },
  "singapore-indoor-farms": {
    en: [
      {
        heading: "Context",
        body: [
          "Singapore Indoor Farms wanted a small visible IoT rig they could show clients walking through their facility. One demo rack on their floor to prove the data path end-to-end and let visitors see live readings.",
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
          "The rig was primarily a sales tool. The farm's team used it to walk clients through what data-driven indoor agriculture looks like. CNA picked it up in May 2022 as a Singapore Indoor Farms feature.",
        ],
      },
    ],
    vi: [
      {
        heading: "Bối cảnh",
        body: [
          "Singapore Indoor Farms muốn có một bộ thiết bị IoT nhỏ gọn dễ nhìn để trưng cho khách đi tham quan cơ sở của họ. Một rack demo đặt trên sàn nhà để chứng minh đường đi của dữ liệu end-to-end và để khách thấy số liệu live.",
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
          "Bộ thiết bị này chủ yếu là công cụ bán hàng. Team của trang trại dùng nó để dẫn khách đi qua câu chuyện nông nghiệp trong nhà dựa trên dữ liệu trông thế nào. CNA đưa tin vào tháng 5/2022 trong bài về Singapore Indoor Farms.",
        ],
      },
    ],
  },
  "royce-connect": {
    en: [
      {
        heading: "About",
        body: [
          "IS215 module project. The team picked Royce Dental, a Singapore dental chain, and framed the brief around two metrics dental chains track closely: no-show rate and recall conversion. The deliverable was a two-surface product: a patient mobile app for appointments and recall reminders, and an operations dashboard for managers to track retention by outlet and dig into no-show patterns.",
          "I was project lead. Drove the proposal, the strategic analysis (SWOT, Porter's Five Forces, market sizing), the product framing, and most of the team's deck. Built across both surfaces with the team.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript for the operations dashboard, deployed on Vercel.",
          "React Native for the patient app. Same TypeScript domain types shared with the web side.",
          "UI designed in Figma Make.",
        ],
      },
    ],
    vi: [
      {
        heading: "Giới thiệu",
        body: [
          "Project môn IS215. Team chọn Royce Dental, một chuỗi nha khoa ở Singapore, và đóng khung đề bài quanh hai metric mà chuỗi nha khoa theo dõi sát: tỉ lệ vắng hẹn (no-show) và recall conversion. Sản phẩm cuối là hai mặt: app mobile cho bệnh nhân để đặt lịch và nhắc hẹn, và dashboard vận hành cho quản lý theo dõi retention theo chi nhánh và phân tích các pattern no-show.",
          "Tôi là project lead. Phụ trách proposal, phân tích chiến lược (SWOT, Porter's Five Forces, market sizing), framing sản phẩm, và phần lớn deck của team. Làm chung cả hai mặt với team.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript cho operations dashboard, deploy trên Vercel.",
          "React Native cho app bệnh nhân. Chia sẻ TypeScript domain types với phía web.",
          "UI thiết kế trong Figma Make.",
        ],
      },
    ],
  },
  "signpost-collective-dashboard": {
    en: [
      {
        heading: "About",
        body: [
          "SMU-X project for Signpost Collective, paired with the coursework deliverable for COR1301 Leadership and Team Building. Signpost runs a volunteer-operations team and already had their own internal dashboard for the day-to-day. The team built our version as the project deliverable: role-based access with admin and member tiers, different view and edit permissions for each, and analytics views over the operational metrics they cared about.",
          "We shared the codebase openly with the Signpost team afterwards so they could reference it and pull whatever was useful into the dashboard they actually run on.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript for the dashboard, deployed on Vercel.",
          "UI designed in Figma Make.",
        ],
      },
    ],
    vi: [
      {
        heading: "Giới thiệu",
        body: [
          "Project SMU-X cho Signpost Collective, kết hợp với deliverable cho môn COR1301 Leadership and Team Building. Signpost vận hành một team volunteer-operations và đã có dashboard nội bộ riêng cho công việc hằng ngày. Team xây phiên bản của tụi tôi như deliverable của project: role-based access với tier admin và member, mỗi bên có quyền view và edit khác nhau, và các analytics view trên những metric vận hành mà họ quan tâm.",
          "Sau đó tụi tôi chia sẻ codebase công khai cho team Signpost để họ tham khảo và rút ra cái gì có ích cho dashboard họ thực sự đang dùng.",
        ],
      },
      {
        heading: "Stack",
        bullets: [
          "Next.js + TypeScript cho dashboard, deploy trên Vercel.",
          "UI thiết kế trong Figma Make.",
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
  "windows-server-2000-security": {
    en: [
      {
        heading: "About",
        body: [
          "Blue-team hardening lab on a deliberately vulnerable Windows Server 2000 box. Take a known-bad baseline, harden it against the era's common attack vectors (DNS zone transfers, unused IIS features, insecure remote-access stack, weak password policy), then re-run the same probes against the hardened box to confirm every exploit that worked before now failed.",
          "Built as a Singapore Polytechnic security coursework lab. The specific software is decades old, but the mindset (assume the baseline is broken, harden by removing surface area first, then verify with active probing) maps directly to modern security work.",
        ],
      },
      {
        heading: "Tools",
        bullets: [
          "Windows Server 2000 inside VMware Workstation for the lab environment.",
          "IIS Lockdown Tool to strip unused IIS modules and reduce attack surface.",
          "CopSSH (Cygwin-based OpenSSH on Windows) replacing the insecure remote-access stack.",
          "Group Policy for password complexity, length, and lockout thresholds.",
          "nmap, nslookup, and standard probing scripts for before-and-after validation.",
        ],
      },
    ],
    vi: [
      {
        heading: "Giới thiệu",
        body: [
          "Bài lab blue-team hardening trên một máy Windows Server 2000 cố tình để lỗ hổng. Lấy một baseline đã biết là yếu, hardening lại chống các vector tấn công phổ biến thời đó (DNS zone transfer, IIS để dư tính năng không dùng, stack remote-access không an toàn, chính sách mật khẩu yếu), rồi chạy lại đúng các probe đó lên máy đã hardening để xác nhận mọi exploit từng work giờ đều fail.",
          "Xây dựng như một bài lab môn an ninh ở Singapore Polytechnic. Phần mềm cụ thể đã cũ hàng chục năm, nhưng tư duy (giả định baseline đang lỗi, hardening bằng cách giảm bề mặt tấn công trước, sau đó verify bằng probe chủ động) ánh xạ thẳng vào công việc bảo mật hiện đại.",
        ],
      },
      {
        heading: "Công cụ",
        bullets: [
          "Windows Server 2000 trên VMware Workstation cho môi trường lab.",
          "IIS Lockdown Tool để tắt các module IIS không dùng và giảm bề mặt tấn công.",
          "CopSSH (OpenSSH chạy trên Windows qua Cygwin) thay cho stack remote-access không an toàn.",
          "Group Policy cho độ phức tạp, độ dài và ngưỡng khoá tài khoản của mật khẩu.",
          "nmap, nslookup, và các script probe tiêu chuẩn để verify trước-sau.",
        ],
      },
    ],
  },
  "cisco-wan-architecture": {
    en: [
      {
        heading: "About",
        body: [
          "Hub-and-spoke WAN topology connecting three branch offices to a central HQ across a simulated internet backbone. Hierarchical IP addressing (172.23.0.0/16), RIPv2 routing with PPP authentication, DHCP per branch, and standard plus extended ACL policies controlling inter-branch and internet-facing traffic.",
          "Built as a Singapore Polytechnic networking lab. The full topology lived only in Cisco Packet Tracer's Multi-User Mode, with no physical hardware involved. That made it straightforward to spin up failure scenarios and verify the routing converged the way the design intended.",
        ],
      },
      {
        heading: "Tools",
        bullets: [
          "Cisco Packet Tracer (Multi-User Mode) for the full virtual topology.",
          "Cisco IOS CLI for router and switch configuration.",
          "RIPv2 with PPP authentication, DHCP, standard and extended ACLs.",
        ],
      },
    ],
    vi: [
      {
        heading: "Giới thiệu",
        body: [
          "Topology WAN hub-and-spoke nối ba văn phòng chi nhánh về HQ trung tâm qua một internet backbone giả lập. Sơ đồ IP có phân cấp (172.23.0.0/16), routing RIPv2 với xác thực PPP, DHCP từng chi nhánh, cộng với các policy ACL chuẩn và mở rộng để kiểm soát lưu lượng giữa các chi nhánh và ra internet.",
          "Xây dựng như một bài lab mạng ở Singapore Polytechnic. Toàn bộ topology chỉ chạy trong Cisco Packet Tracer Multi-User Mode, không có phần cứng vật lý. Nhờ vậy mà dựng các kịch bản lỗi và verify routing converge theo đúng thiết kế khá thẳng tiến.",
        ],
      },
      {
        heading: "Công cụ",
        bullets: [
          "Cisco Packet Tracer (Multi-User Mode) cho toàn bộ topology ảo.",
          "Cisco IOS CLI để cấu hình router và switch.",
          "RIPv2 với xác thực PPP, DHCP, ACL chuẩn và mở rộng.",
        ],
      },
    ],
  },
  "windows-server-2012-r2-enterprise": {
    en: [
      {
        heading: "About",
        body: [
          "Self-hosted virtualized datacenter built on VMware Workstation. Four Windows Server 2012 R2 instances split into role-specific machines: Domain Controller, DNS/DHCP, File Server, Web Server. Active Directory configured with hierarchical OUs, scripted bulk user provisioning for 50+ accounts via PowerShell, and enforced Group Policies for password complexity and shared resource access.",
          "An SP coursework lab on real Windows Server 2012 R2 with VMware Workstation as the hypervisor. The point of the exercise was end-to-end: design the role split, stand up each VM, wire the AD trust, automate user provisioning and policy enforcement with PowerShell, then prove the policies actually applied across machines.",
        ],
      },
      {
        heading: "Tools",
        bullets: [
          "Windows Server 2012 R2 across four VMs.",
          "VMware Workstation as the hypervisor.",
          "Active Directory + Group Policy.",
          "PowerShell for bulk user provisioning and policy automation.",
        ],
      },
    ],
    vi: [
      {
        heading: "Giới thiệu",
        body: [
          "Datacenter ảo tự host trên VMware Workstation. Bốn instance Windows Server 2012 R2 chia theo vai trò: Domain Controller, DNS/DHCP, File Server, Web Server. Active Directory cấu hình với OU phân cấp, script provision bulk 50+ tài khoản qua PowerShell, và Group Policy bắt buộc cho độ phức tạp mật khẩu và quyền truy cập tài nguyên dùng chung.",
          "Một bài lab môn của SP trên Windows Server 2012 R2 thật với VMware Workstation làm hypervisor. Mục tiêu là end-to-end: thiết kế phân vai trò, dựng từng VM, đấu nối trust AD, tự động hoá việc provision tài khoản và áp policy bằng PowerShell, sau đó chứng minh policy thực sự áp xuyên qua các máy.",
        ],
      },
      {
        heading: "Công cụ",
        bullets: [
          "Windows Server 2012 R2 trên bốn VM.",
          "VMware Workstation làm hypervisor.",
          "Active Directory + Group Policy.",
          "PowerShell cho bulk user provisioning và tự động hoá policy.",
        ],
      },
    ],
  },
  "cisco-enterprise-lan": {
    en: [
      {
        heading: "About",
        body: [
          "Multi-site enterprise network using 7 Cisco routers and 5 switches across a hybrid environment that combined Cisco Packet Tracer simulation with SP's physical Cisco server racks. Star-topology LAN supporting 12+ endpoints and 2 internal servers, with a VLSM IP scheme, OSPF multi-area routing with failover, and ACL-based access policies.",
          "The hybrid setup was the distinguishing piece: the larger topology lived in Packet Tracer, but the inner LAN was wired up on actual Cisco hardware in the SP networking lab. Verifying behaviour across both halves showed where the simulation drifted from the physical setup.",
        ],
      },
      {
        heading: "Tools",
        bullets: [
          "Cisco Packet Tracer for the simulated outer topology.",
          "Physical Cisco routers and switches in the SP networking lab for the inner LAN.",
          "Cisco IOS CLI for configuration.",
          "OSPF multi-area routing, VLSM addressing, ACL policies.",
        ],
      },
    ],
    vi: [
      {
        heading: "Giới thiệu",
        body: [
          "Mạng doanh nghiệp đa site dùng 7 router Cisco và 5 switch trong môi trường lai, kết hợp giả lập Cisco Packet Tracer với rack Cisco vật lý của SP. LAN topology hình sao hỗ trợ 12+ endpoint và 2 server nội bộ, với sơ đồ IP VLSM, routing OSPF đa vùng có failover, và policy ACL.",
          "Phần đặc biệt là setup lai: phần topology lớn nằm trong Packet Tracer, nhưng LAN bên trong thì đấu nối trên phần cứng Cisco thật ở lab mạng của SP. Verify hành vi trên cả hai nửa cho thấy chỗ nào giả lập lệch khỏi setup phần cứng thực tế.",
        ],
      },
      {
        heading: "Công cụ",
        bullets: [
          "Cisco Packet Tracer cho phần topology giả lập bên ngoài.",
          "Router và switch Cisco vật lý tại lab mạng của SP cho LAN bên trong.",
          "Cisco IOS CLI để cấu hình.",
          "OSPF routing đa vùng, định địa chỉ VLSM, policy ACL.",
        ],
      },
    ],
  },
};
