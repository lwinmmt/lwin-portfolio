import type { Locale } from "./types";

// Translation dictionary. Add a new key under BOTH locales when you need
// a new translated string. Keys use dot.notation for grouping.
//
// Phase 1 covers sidebar nav + sidebar chrome. Hero, about, projects,
// experience, etc. follow in subsequent phases.

export const messages = {
  en: {
    // Sidebar navigation labels
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.uses": "Uses",
    "nav.highlights": "Highlights",
    "nav.resume": "Resume",
    "nav.studio": "Studio",
    "nav.email": "Email",
    "nav.whatsapp": "WhatsApp",
    "nav.github": "GitHub",
    "nav.linkedin": "LinkedIn",
    // Sidebar section headings
    "nav.section.resources": "Resources",
    "nav.section.stayInTouch": "Stay in touch",
    // Sidebar chrome
    "sidebar.subtitle": "AI & IIoT Engineer",
    "sidebar.search": "Search",
    // Language switcher
    "switcher.aria": "Language",
    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.studentRole": "Information Systems student",
    "hero.intro.atSchool": "at",
    "hero.intro.iBuild": ". I build",
    "hero.intro.emphasis": "IoT systems and ship products end-to-end",
    "hero.intro.rest": ". Hardware, cloud, and the operating system in between. Engineer by training. Daily AI-tools operator.",
    "hero.rightNow": "Right now",
    "hero.currentRole": "AI & IIoT Engineer",
    "hero.currentRole.at": "at",
    "hero.currentOrgFullName": "Vietnam Technology & Telecommunication Joint Stock Company",
    "hero.cta.resume": "Resume",
    "hero.cta.email": "Email",
    "hero.cta.github": "GitHub",
    "hero.cta.linkedin": "LinkedIn",
    "hero.cta.ariaCurrentRole": "Currently {role} at {org}, opens in new tab",
    // Globe
    "globe.dragToRotate": "Drag to rotate.",
    // About page chrome
    "about.eyebrow": "About",
    "about.title": "The longer story",
    "about.citizenshipNote":
      "Singaporean. Born in Yangon, Myanmar, moved to Singapore at age 1.",
    "about.languagesLabel": "Languages",
    "about.section.communityService": "Community service and leadership",
    "about.section.activities": "Activities and CCAs",
    "about.section.awards": "Awards",
    "about.section.personalInterests": "Personal interests",
    // About kinetic quote
    "about.quote.text": "I tend to build things at the intersection of",
    "about.quote.emphasis": "hardware, cloud, and product.",
    // About bio paragraphs (renderRich-formatted)
    "about.bio.p1":
      "I'm an **Information Systems student** at **Singapore Management University**, on a dual track of **Product Development** and **Business Analytics**. Before SMU, I did a **Diploma in Computer Engineering** at **Singapore Polytechnic**, which is where most of my hardware and networking foundations came from.",
    "about.bio.p2":
      "The story so far has been a mix of architected production IoT systems (**NEA wastewater monitoring** at 360 sites), founding things from scratch (**Osiris** hydroponics automation, funded by an [SMU BIG grant](https://iie.smu.edu.sg/acceleration-grant)), and bootstrapping commercial operations (5 years of **Nepseeds** plant e-commerce). Right now I'm at [Vietnam Technology & Telecommunication (VNTT)](https://vntt.com.vn/) in Ho Chi Minh City learning what production-scale industrial IoT actually feels like, working on **EdgeX-based systems**.",
    "about.bio.p3":
      "I'm a heavy daily user of __Claude Code, Gemini, ChatGPT, and Kimi__ and treat the ability to direct them well as a real competitive skill. Most of my recent project output uses AI-assisted code generation; my contribution sits in **framing the problem**, making the **architecture decisions**, and **validating the output**.",
    "about.bio.p4":
      "Outside of school and work, I hold a **motorcycle and car license** and I'm pursuing a **Boat License (PPCDL)**. I follow **Theo (t3.gg)**, **Mo Bitar**, and **Fireship** for engineering and dev-tooling content, and I invest consistently in the US stock market. I used to play a lot of Counter Strike Global Offensive, Dota 2, and Minecraft, but not much time for that these days.",
    // About interest group labels
    "about.interests.motorsports": "Motorsports & Mobility",
    "about.interests.investing": "Investing",
    "about.interests.education": "Developer YouTube",
    "about.interests.gamingPast": "Used to Play",
    // Resume page
    "resume.eyebrow": "Resume",
    "resume.byline":
      "**Information Systems student** at **Singapore Management University**. Currently **AI & IIoT Engineer at VNTT**, Ho Chi Minh City.",
    "resume.cta.download": "Download PDF",
    "resume.section.experience": "Experience",
    "resume.experienceCount": "{n} roles",
    "resume.section.education": "Education",
    "resume.section.skills": "Skills",
    "resume.section.certifications": "Certifications",
    "resume.section.awards": "Awards",
    "resume.section.languages": "Languages",
    "resume.cert.issued": "Issued",
    "resume.cert.expires": "Expires",
    "resume.cert.id": "ID",
    "resume.cert.verify": "Verify",
    "resume.endYear.now": "NOW",
    // Resume role highlights (ROLE_HIGHLIGHTS in app/resume/page.tsx)
    "resume.highlight.vntt":
      "Learning production-scale industrial IoT on EdgeX Foundry.",
    "resume.highlight.nepseeds":
      "5 years bootstrapped, NEA phytosanitary + CITES compliance, 98% on-time fulfillment.",
    "resume.highlight.osiris":
      "SMU BIG grant. World Cities Summit 2024 showcase to Ministers Indranee Rajah + Desmond Lee.",
    "resume.highlight.w2":
      "360-site NEA wastewater monitoring. Contributed to LHL IDM Smart Nation Award 2022.",
    "resume.highlight.sp-iot":
      "5G Autonomous Surveillance Vehicle. Featured at SP Engineering Show 2021.",
  },
  vi: {
    // Sidebar navigation
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.projects": "Dự án",
    "nav.blog": "Blog",
    "nav.uses": "Công cụ",
    "nav.highlights": "Điểm nổi bật",
    "nav.resume": "Hồ sơ",
    "nav.studio": "Studio",
    "nav.email": "Email",
    "nav.whatsapp": "WhatsApp",
    "nav.github": "GitHub",
    "nav.linkedin": "LinkedIn",
    // Section headings
    "nav.section.resources": "Tài nguyên",
    "nav.section.stayInTouch": "Liên hệ",
    // Sidebar chrome
    "sidebar.subtitle": "Kỹ sư AI & IIoT",
    "sidebar.search": "Tìm kiếm",
    // Language switcher
    "switcher.aria": "Ngôn ngữ",
    // Hero
    "hero.greeting": "Xin chào, tôi là",
    "hero.studentRole": "sinh viên ngành Hệ thống Thông tin",
    "hero.intro.atSchool": "tại",
    "hero.intro.iBuild": ". Tôi xây dựng",
    "hero.intro.emphasis": "hệ thống IoT và đưa sản phẩm ra thị trường, từ đầu đến cuối",
    "hero.intro.rest": ". Phần cứng, điện toán đám mây, và hệ điều hành ở giữa. Kỹ sư được đào tạo bài bản. Sử dụng công cụ AI hàng ngày.",
    "hero.rightNow": "Hiện tại",
    "hero.currentRole": "Kỹ sư AI & IIoT",
    "hero.currentRole.at": "tại",
    "hero.currentOrgFullName": "Công ty Cổ phần Công nghệ và Viễn thông Việt Nam",
    "hero.cta.resume": "Hồ sơ",
    "hero.cta.email": "Email",
    "hero.cta.github": "GitHub",
    "hero.cta.linkedin": "LinkedIn",
    "hero.cta.ariaCurrentRole": "Hiện đang là {role} tại {org}, mở trong tab mới",
    // Globe
    "globe.dragToRotate": "Kéo để xoay.",
    // About page chrome
    "about.eyebrow": "Giới thiệu",
    "about.title": "Câu chuyện dài hơn",
    "about.citizenshipNote":
      "Người Singapore. Sinh ra tại Yangon, Myanmar, chuyển đến Singapore khi 1 tuổi.",
    "about.languagesLabel": "Ngôn ngữ",
    "about.section.communityService": "Phục vụ cộng đồng và lãnh đạo",
    "about.section.activities": "Hoạt động và CCA",
    "about.section.awards": "Giải thưởng",
    "about.section.personalInterests": "Sở thích cá nhân",
    // About kinetic quote
    "about.quote.text": "Tôi thường xây dựng những thứ tại giao điểm của",
    "about.quote.emphasis": "phần cứng, đám mây và sản phẩm.",
    // About bio paragraphs (renderRich-formatted)
    "about.bio.p1":
      "Tôi là **sinh viên ngành Hệ thống Thông tin** tại **Đại học Quản lý Singapore**, theo học song song hai chuyên ngành **Phát triển Sản phẩm** và **Phân tích Kinh doanh**. Trước SMU, tôi học **Diploma ngành Kỹ thuật Máy tính** tại **Singapore Polytechnic**, nơi tôi xây dựng nền tảng vững chắc về phần cứng và mạng.",
    "about.bio.p2":
      "Hành trình đến nay là sự kết hợp giữa kiến trúc các hệ thống IoT quy mô sản xuất (**giám sát nước thải NEA** tại 360 điểm), khởi nghiệp từ con số không (**Osiris** tự động hóa thủy canh, được tài trợ bởi [quỹ SMU BIG](https://iie.smu.edu.sg/acceleration-grant)), và vận hành thương mại bootstrap (5 năm **Nepseeds**, nền tảng thương mại điện tử cây trồng). Hiện tại tôi đang làm tại [Vietnam Technology & Telecommunication (VNTT)](https://vntt.com.vn/) ở TP. Hồ Chí Minh, học hỏi về IoT công nghiệp quy mô sản xuất với **các hệ thống dựa trên EdgeX**.",
    "about.bio.p3":
      "Tôi sử dụng __Claude Code, Gemini, ChatGPT và Kimi__ hàng ngày, và xem khả năng định hướng các công cụ này là một kỹ năng cạnh tranh thực sự. Phần lớn sản phẩm dự án gần đây của tôi đều dùng AI hỗ trợ sinh mã; đóng góp của tôi nằm ở việc **đặt vấn đề**, đưa ra **quyết định kiến trúc**, và **xác thực kết quả**.",
    "about.bio.p4":
      "Ngoài giờ học và làm việc, tôi có **bằng lái xe máy và ô tô**, đang học **bằng lái thuyền (PPCDL)**. Tôi theo dõi **Theo (t3.gg)**, **Mo Bitar** và **Fireship** để cập nhật nội dung kỹ thuật và công cụ dev, và đầu tư đều đặn vào thị trường chứng khoán Mỹ. Trước đây tôi chơi nhiều Counter Strike Global Offensive, Dota 2 và Minecraft, nhưng giờ không còn nhiều thời gian cho việc đó.",
    // About interest group labels
    "about.interests.motorsports": "Mô tô và Phương tiện",
    "about.interests.investing": "Đầu tư",
    "about.interests.education": "YouTube Lập trình",
    "about.interests.gamingPast": "Đã từng chơi",
    // Resume page
    "resume.eyebrow": "Hồ sơ",
    "resume.byline":
      "**Sinh viên ngành Hệ thống Thông tin** tại **Đại học Quản lý Singapore**. Hiện tại là **Kỹ sư AI & IIoT tại VNTT**, TP. Hồ Chí Minh.",
    "resume.cta.download": "Tải PDF",
    "resume.section.experience": "Kinh nghiệm",
    "resume.experienceCount": "{n} vai trò",
    "resume.section.education": "Học vấn",
    "resume.section.skills": "Kỹ năng",
    "resume.section.certifications": "Chứng chỉ",
    "resume.section.awards": "Giải thưởng",
    "resume.section.languages": "Ngôn ngữ",
    "resume.cert.issued": "Cấp ngày",
    "resume.cert.expires": "Hết hạn",
    "resume.cert.id": "Mã",
    "resume.cert.verify": "Xác minh",
    "resume.endYear.now": "HIỆN NAY",
    // Resume role highlights
    "resume.highlight.vntt":
      "Học IoT công nghiệp quy mô sản xuất với EdgeX Foundry.",
    "resume.highlight.nepseeds":
      "5 năm bootstrap, tuân thủ NEA phytosanitary và CITES, giao hàng đúng hạn 98%.",
    "resume.highlight.osiris":
      "Quỹ SMU BIG. Trưng bày tại World Cities Summit 2024 cho các Bộ trưởng Indranee Rajah và Desmond Lee.",
    "resume.highlight.w2":
      "Giám sát nước thải NEA tại 360 điểm. Đóng góp cho Giải thưởng Smart Nation LHL IDM 2022.",
    "resume.highlight.sp-iot":
      "Xe Giám sát Tự hành 5G. Trưng bày tại SP Engineering Show 2021.",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof typeof messages.en;
