import type { Locale } from "./types";

// Translation dictionary. Add a new key under BOTH locales when you need
// a new translated string. Keys use dot.notation for grouping.
//
// Phase 1 covers sidebar nav + sidebar chrome. Hero, about, projects,
// experience, etc. follow in subsequent phases.

export const messages = {
  en: {
    // Document meta — emitted via [lang]/layout.tsx generateMetadata so
    // EN visitors get English OG/Twitter cards and VI visitors get
    // Vietnamese. Hero copy is mirrored in the description for parity
    // with social shares.
    "meta.title.default": "Lwin, AI and IIoT Engineer",
    "meta.title.template": "%s | Lwin MMT",
    "meta.description":
      "Information Systems student at Singapore Management University. I build IoT systems and ship products end-to-end. Hardware, cloud, and the operating system in between. Engineer by training. Daily AI-tools operator.",
    "meta.og.description":
      "Information Systems student at Singapore Management University. I build IoT systems and ship products end-to-end. Engineer by training. Daily AI-tools operator.",
    "a11y.skipToMain": "Skip to main content",
    // Per-route page titles + descriptions. Used by each page's
    // generateMetadata so the <title> tag and meta description match
    // the visitor's locale. The route layout's title template wraps
    // these as "{page} | Lwin MMT".
    "page.title.about": "About",
    "page.description.about":
      "Bio, community service, activities, awards, and personal interests.",
    "page.title.blog": "Blog",
    "page.description.blog":
      "Writing on engineering, AI tools, and shipping products.",
    "page.title.highlights": "Highlights",
    "page.description.highlights":
      "Talks, press, awards, and notable moments.",
    "page.title.uses": "Uses",
    "page.description.uses":
      "Daily AI tools, dev stack, IoT and cloud stack, hardware, and everyday software.",
    "page.title.resume": "Resume",
    "page.description.resume": "Web-readable resume with PDF download.",
    "page.title.projects": "Projects",
    "page.description.projects":
      "Selected work across IoT, cloud platforms, and product engineering.",
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
    // Nav aria
    "nav.aria.mobile": "Primary navigation, mobile",
    "nav.aria.primary": "Primary navigation",
    "nav.aria.cmdPalette": "Open command palette",
    "nav.aria.more": "More",
    "nav.aria.moreSheet": "More navigation",
    "nav.skipToMain": "Skip to main content",
    // Sidebar chrome
    "sidebar.subtitle": "AI & IIoT Engineer",
    "sidebar.search": "Search",
    // Image alt boilerplate (translated subject + boilerplate noun)
    "image.alt.cover": "{title} cover",
    "image.alt.photo": "{title}, photo {n}",
    "image.alt.logo": "{name} logo",
    // Email button
    "email.toast.copied": "Copied {email}",
    "email.aria.fallback": "Email {email}",
    // Projects attachments aria
    "projects.aria.attachments": "{n} attachments",
    // Hero variant switcher
    "hero.variant.aria": "Switch to {variant} variant",
    // Hero terminal mock output
    "hero.terminal.role": "AI & IIoT Engineer @ VNTT",
    "hero.terminal.school": "Info Systems student @ SMU",
    "hero.terminal.location": "Ho Chi Minh City • GMT+7",
    // ESMOS diagram caption
    "esmos.diagram.caption": "Architecture v9.4 · Authored in Eraser",
    "esmos.diagram.rawSvg": "Raw SVG",
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
    // Command palette
    "cmd.placeholder": "Type a page, project, or action",
    "cmd.aria": "Search command palette",
    "cmd.aria.dialog": "Command palette",
    "cmd.empty": "No matches for “{q}”",
    "cmd.group.pages": "Pages",
    "cmd.group.projects": "Projects",
    "cmd.group.actions": "Actions",
    "cmd.hint.page": "Page",
    "cmd.hint.email": "Email",
    "cmd.hint.external": "External",
    "cmd.hint.action": "Action",
    "cmd.footer.navigate": "Navigate",
    "cmd.footer.open": "Open",
    "cmd.footer.toggle": "Close",
    "cmd.action.resumePdf": "Download resume PDF",
    "cmd.action.email": "Email {email}",
    "cmd.action.github": "Open GitHub profile",
    "cmd.action.linkedin": "Open LinkedIn profile",
    // Lightbox + zoom
    "lightbox.open.cover": "Open {title} cover image full size",
    "lightbox.open.photo": "Open {title} photo {n} full size",
    "lightbox.aria.viewer": "Image viewer",
    "lightbox.close": "Close image viewer",
    "lightbox.previous": "Previous image",
    "lightbox.next": "Next image",
    // Project links shared between cards and detail page
    "project.link.live": "Live",
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
      "The story so far has been a mix of architected production IoT systems (**wastewater monitoring** at 360 sites), founding things from scratch (**Osiris** smart vertical farm, funded by an [SMU BIG grant](https://iie.smu.edu.sg/acceleration-grant)), and bootstrapping commercial operations (5 years of **Nepseeds** plant e-commerce). Right now I'm at [Vietnam Technology & Telecommunication (VNTT)](https://vntt.com.vn/) in Ho Chi Minh City learning what production-scale industrial IoT actually feels like, working on systems built on [**EdgeX Foundry**](https://docs.edgexfoundry.org/4.0/).",
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
      "360-site wastewater monitoring. Contributed to LHL IDM Smart Nation Award 2022.",
    "resume.highlight.sp-iot":
      "5G Autonomous Surveillance Vehicle. Featured at SP Engineering Show 2021.",
    // Projects list page
    "projects.eyebrow": "Projects",
    "projects.title": "Projects & Coursework",
    "projects.description":
      "Projects are things I built, shipped, or have run for real users. Coursework projects are Singapore Management University and Singapore Polytechnic related.",
    "projects.filter.all": "All",
    "projects.count.one": "{n} project",
    "projects.count.many": "{n} projects",
    // Project category display labels (the enum value drives logic;
    // these strings are display-only)
    "projects.category.Coursework": "Coursework",
    "projects.category.Projects": "Projects",
    "projects.empty": "No projects match this filter yet.",
    // Project detail page
    "project.back": "All projects",
    "project.archDiagramTitle": "Architecture diagram",
    "project.comingSoon": "Coming soon",
    "project.fullCaseStudyTitle": "Full case study in progress",
    "project.fullCaseStudyBody":
      "Context, role, architecture, implementation highlights, outcomes, and reflections will land here as I expand each project. For ESMOS, the interactive multi-cloud architecture diagram will be embedded inline.",
    "project.relatedIn": "Related in {category}",
    "project.aside.stack": "Stack",
    "project.aside.links": "Links",
    "project.link.github": "GitHub",
    "project.link.video": "Video",
    "project.link.slides": "Slides",
    "project.link.pdf": "PDF / Report",
    "project.link.press": "Press",
    // Experience section (home + resume)
    "experience.title": "Experience",
    "experience.viewAll": "Full timeline",
    // Highlights home section
    "highlights.title": "Recent Highlights",
    "highlights.viewAll": "View all",
    // Highlights page
    "highlightsPage.eyebrow": "Highlights",
    "highlightsPage.titleHead": "Moments worth remembering",
    "highlightsPage.titleDot": ".",
    "highlightsPage.intro":
      "Talks, press features, awards, and other public moments. Click into any of them for context.",
    "highlightsPage.open": "Open",
    // Education
    "education.title": "Education",
    // Skills, stack & certifications
    "skills.title": "Skills, Stack & Certifications",
    "skills.viewAll": "Full toolkit",
    "skills.techStack": "Tech Stack",
    "skills.certifications": "Certifications",
    "skills.languages": "Languages",
    "skills.cert.issued": "Issued",
    "skills.cert.expires": "Expires",
    "skills.cert.id": "ID",
    "skills.cert.verify": "Verify",
    // Uses page
    "uses.eyebrow": "Uses",
    "uses.titleHead": "The daily toolkit",
    "uses.titleDot": ".",
    "uses.intro":
      "The tools I reach for every day. Rotation changes; if something falls off the list it gets removed.",
    "uses.dailyCore": "Daily core",
    "uses.aiTools.subtitle": "{n} agents, no fixed workflow",
    "uses.hardwareTag": "Hardware /",
    "uses.workedWith.label": "Tools I've worked with",
    "uses.workedWith.subtitle":
      "Not all daily, all hands-on at some point.",
    // Blog page
    "blog.eyebrow": "Blog",
    "blog.titleHead": "Notes in progress",
    "blog.titleDot": ".",
    "blog.intro":
      "Occasional writing on engineering decisions, AI tools, and lessons from shipping products. MDX-backed, so each post will have code blocks, diagrams, and embeds.",
    "blog.empty.heading": "Writing is coming.",
    "blog.empty.body": "Three drafts are in progress. Check back soon.",
    "blog.drafts.heading": "Drafts in the pipeline",
    "blog.drafts.queued": "{n} queued",
    "blog.signupFooter": "Email signup goes here once the first post ships.",
    "blog.soon": "Soon",
    // 404 page
    "notFound.eyebrow": "404",
    "notFound.titleHead": "Nothing here",
    "notFound.titleDot": ".",
    "notFound.body":
      "The page you tried to open is missing, was renamed, or never existed. Try one of these instead.",
    "notFound.home": "Home",
    "notFound.projects": "Projects",
    "notFound.about": "About",
    "notFound.resume": "Resume",
    "notFound.status": "Status",
    "notFound.routeMissing": "route not found",
  },
  vi: {
    // Document meta — see EN block.
    "meta.title.default": "Lwin, Kỹ sư AI & IIoT",
    "meta.title.template": "%s | Lwin MMT",
    "meta.description":
      "Sinh viên ngành Hệ thống Thông tin tại Đại học Quản lý Singapore. Tôi xây dựng hệ thống IoT và đưa sản phẩm ra thị trường, từ đầu đến cuối. Phần cứng, điện toán đám mây, và hệ điều hành ở giữa. Kỹ sư được đào tạo bài bản. Sử dụng công cụ AI hàng ngày.",
    "meta.og.description":
      "Sinh viên ngành Hệ thống Thông tin tại Đại học Quản lý Singapore. Tôi xây dựng hệ thống IoT và đưa sản phẩm ra thị trường, từ đầu đến cuối. Kỹ sư được đào tạo bài bản. Sử dụng công cụ AI hàng ngày.",
    "a11y.skipToMain": "Bỏ qua tới nội dung chính",
    // Per-route page titles + descriptions — see EN block.
    "page.title.about": "Giới thiệu",
    "page.description.about":
      "Tiểu sử, hoạt động cộng đồng, sinh hoạt, giải thưởng và sở thích cá nhân.",
    "page.title.blog": "Blog",
    "page.description.blog":
      "Bài viết về kỹ thuật, công cụ AI và việc đưa sản phẩm ra thị trường.",
    "page.title.highlights": "Điểm nhấn",
    "page.description.highlights":
      "Diễn thuyết, báo chí, giải thưởng và những khoảnh khắc đáng nhớ.",
    "page.title.uses": "Công cụ",
    "page.description.uses":
      "Công cụ AI hàng ngày, dev stack, IoT và cloud stack, phần cứng và phần mềm thường dùng.",
    "page.title.resume": "Sơ yếu lý lịch",
    "page.description.resume": "Sơ yếu lý lịch dạng web và bản PDF tải về.",
    "page.title.projects": "Dự án",
    "page.description.projects":
      "Một số dự án về IoT, nền tảng cloud và kỹ thuật sản phẩm.",
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
    // Nav aria
    "nav.aria.mobile": "Điều hướng chính, mobile",
    "nav.aria.primary": "Điều hướng chính",
    "nav.aria.cmdPalette": "Mở bảng lệnh",
    "nav.aria.more": "Thêm",
    "nav.aria.moreSheet": "Điều hướng thêm",
    "nav.skipToMain": "Bỏ qua đến nội dung chính",
    // Sidebar chrome
    "sidebar.subtitle": "Kỹ sư AI & IIoT",
    "sidebar.search": "Tìm kiếm",
    // Image alt boilerplate (translated subject + boilerplate noun)
    "image.alt.cover": "Ảnh bìa {title}",
    "image.alt.photo": "{title}, ảnh {n}",
    "image.alt.logo": "Logo {name}",
    // Email button
    "email.toast.copied": "Đã sao chép {email}",
    "email.aria.fallback": "Gửi email tới {email}",
    // Projects attachments aria
    "projects.aria.attachments": "{n} tệp đính kèm",
    // Hero variant switcher
    "hero.variant.aria": "Chuyển sang biến thể {variant}",
    // Hero terminal mock output
    "hero.terminal.role": "Kỹ sư AI & IIoT @ VNTT",
    "hero.terminal.school": "Sinh viên Hệ thống Thông tin @ SMU",
    "hero.terminal.location": "TP. Hồ Chí Minh • GMT+7",
    // ESMOS diagram caption
    "esmos.diagram.caption": "Kiến trúc v9.4 · Tạo trong Eraser",
    "esmos.diagram.rawSvg": "SVG gốc",
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
    // Command palette
    "cmd.placeholder": "Gõ tên trang, dự án, hoặc thao tác",
    "cmd.aria": "Tìm trong bảng lệnh",
    "cmd.aria.dialog": "Bảng lệnh",
    "cmd.empty": "Không có kết quả cho “{q}”",
    "cmd.group.pages": "Trang",
    "cmd.group.projects": "Dự án",
    "cmd.group.actions": "Thao tác",
    "cmd.hint.page": "Trang",
    "cmd.hint.email": "Email",
    "cmd.hint.external": "Ngoài",
    "cmd.hint.action": "Thao tác",
    "cmd.footer.navigate": "Di chuyển",
    "cmd.footer.open": "Mở",
    "cmd.footer.toggle": "Đóng",
    "cmd.action.resumePdf": "Tải hồ sơ PDF",
    "cmd.action.email": "Gửi email tới {email}",
    "cmd.action.github": "Mở hồ sơ GitHub",
    "cmd.action.linkedin": "Mở hồ sơ LinkedIn",
    // Lightbox + zoom
    "lightbox.open.cover": "Mở ảnh bìa {title} kích thước đầy đủ",
    "lightbox.open.photo": "Mở ảnh {title} số {n} kích thước đầy đủ",
    "lightbox.aria.viewer": "Trình xem ảnh",
    "lightbox.close": "Đóng trình xem ảnh",
    "lightbox.previous": "Ảnh trước",
    "lightbox.next": "Ảnh sau",
    // Project links shared between cards and detail page
    "project.link.live": "Live",
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
      "Hành trình đến nay là sự kết hợp giữa kiến trúc các hệ thống IoT quy mô sản xuất (**giám sát nước thải** tại 360 điểm), khởi nghiệp từ con số không (**Osiris** trang trại thẳng đứng thông minh, được tài trợ bởi [quỹ SMU BIG](https://iie.smu.edu.sg/acceleration-grant)), và vận hành thương mại bootstrap (5 năm **Nepseeds**, nền tảng thương mại điện tử cây trồng). Hiện tại tôi đang làm tại [Vietnam Technology & Telecommunication (VNTT)](https://vntt.com.vn/) ở TP. Hồ Chí Minh, học hỏi về IoT công nghiệp quy mô sản xuất với các hệ thống xây trên [**EdgeX Foundry**](https://docs.edgexfoundry.org/4.0/).",
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
      "Giám sát nước thải tại 360 điểm. Đóng góp cho Giải thưởng Smart Nation LHL IDM 2022.",
    "resume.highlight.sp-iot":
      "Xe Giám sát Tự hành 5G. Trưng bày tại SP Engineering Show 2021.",
    // Projects list page
    "projects.eyebrow": "Dự án",
    "projects.title": "Dự án và Bài tập",
    "projects.description":
      "Dự án là những thứ tôi đã xây, đã ship, hoặc đang vận hành cho người dùng thật. Bài tập là các dự án thuộc Đại học Quản lý Singapore và Singapore Polytechnic.",
    "projects.filter.all": "Tất cả",
    "projects.count.one": "{n} dự án",
    "projects.count.many": "{n} dự án",
    "projects.category.Coursework": "Bài tập",
    "projects.category.Projects": "Dự án",
    "projects.empty": "Chưa có dự án nào khớp với bộ lọc này.",
    // Project detail page
    "project.back": "Tất cả dự án",
    "project.archDiagramTitle": "Sơ đồ kiến trúc",
    "project.comingSoon": "Sắp ra mắt",
    "project.fullCaseStudyTitle": "Case study đầy đủ đang được hoàn thiện",
    "project.fullCaseStudyBody":
      "Bối cảnh, vai trò, kiến trúc, điểm nhấn triển khai, kết quả và bài học sẽ được bổ sung khi tôi mở rộng từng dự án. Với ESMOS, sơ đồ kiến trúc đa đám mây sẽ được nhúng trực tiếp.",
    "project.relatedIn": "Liên quan trong {category}",
    "project.aside.stack": "Stack",
    "project.aside.links": "Liên kết",
    "project.link.github": "GitHub",
    "project.link.video": "Video",
    "project.link.slides": "Slides",
    "project.link.pdf": "PDF / Báo cáo",
    "project.link.press": "Báo chí",
    // Experience section (home + resume)
    "experience.title": "Kinh nghiệm",
    "experience.viewAll": "Toàn bộ quá trình",
    // Highlights home section
    "highlights.title": "Điểm nhấn gần đây",
    "highlights.viewAll": "Xem tất cả",
    // Highlights page
    "highlightsPage.eyebrow": "Điểm nhấn",
    "highlightsPage.titleHead": "Những khoảnh khắc đáng nhớ",
    "highlightsPage.titleDot": ".",
    "highlightsPage.intro":
      "Các buổi nói chuyện, bài báo, giải thưởng, và những khoảnh khắc công khai khác. Bấm vào để xem bối cảnh.",
    "highlightsPage.open": "Mở",
    // Education
    "education.title": "Học vấn",
    // Skills, stack & certifications
    "skills.title": "Kỹ năng, Stack & Chứng chỉ",
    "skills.viewAll": "Bộ công cụ đầy đủ",
    "skills.techStack": "Tech Stack",
    "skills.certifications": "Chứng chỉ",
    "skills.languages": "Ngôn ngữ",
    "skills.cert.issued": "Cấp ngày",
    "skills.cert.expires": "Hết hạn",
    "skills.cert.id": "Mã",
    "skills.cert.verify": "Xác minh",
    // Uses page
    "uses.eyebrow": "Công cụ",
    "uses.titleHead": "Bộ công cụ hằng ngày",
    "uses.titleDot": ".",
    "uses.intro":
      "Những công cụ tôi dùng mỗi ngày. Danh sách thay đổi theo thời gian. Nếu công cụ nào không còn phù hợp, nó sẽ bị loại.",
    "uses.dailyCore": "Cốt lõi hàng ngày",
    "uses.aiTools.subtitle": "{n} agent, không quy trình cố định",
    "uses.hardwareTag": "Phần cứng /",
    "uses.workedWith.label": "Công cụ tôi từng dùng",
    "uses.workedWith.subtitle":
      "Không phải tất cả đều hằng ngày, nhưng đều đã thực sự đụng tay vào.",
    // Blog page
    "blog.eyebrow": "Blog",
    "blog.titleHead": "Ghi chú đang viết",
    "blog.titleDot": ".",
    "blog.intro":
      "Những bài viết thỉnh thoảng về các quyết định kỹ thuật, công cụ AI, và bài học từ việc ship sản phẩm. Dựa trên MDX, nên mỗi bài sẽ có code, sơ đồ, và embed.",
    "blog.empty.heading": "Sắp có bài viết.",
    "blog.empty.body": "Ba bản nháp đang được hoàn thiện. Quay lại sớm nhé.",
    "blog.drafts.heading": "Bản nháp trong pipeline",
    "blog.drafts.queued": "{n} đang chờ",
    "blog.signupFooter":
      "Phần đăng ký email sẽ xuất hiện ngay khi bài đầu tiên được ship.",
    "blog.soon": "Sắp ra",
    // 404 page
    "notFound.eyebrow": "404",
    "notFound.titleHead": "Không có gì ở đây",
    "notFound.titleDot": ".",
    "notFound.body":
      "Trang bạn vừa mở không tồn tại, đã đổi tên, hoặc chưa từng tồn tại. Thử một trong các trang dưới đây.",
    "notFound.home": "Trang chủ",
    "notFound.projects": "Dự án",
    "notFound.about": "Giới thiệu",
    "notFound.resume": "Hồ sơ",
    "notFound.status": "Trạng thái",
    "notFound.routeMissing": "không tìm thấy route",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof typeof messages.en;
