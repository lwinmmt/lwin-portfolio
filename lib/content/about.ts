// Long-form bio + supporting content for the /about page.

export const bio = {
  citizenshipNote: "Singaporean. Born in Yangon, Myanmar, moved to Singapore at age 1.",
  citizenshipNoteVi:
    "Quốc tịch Singapore. Sinh ra ở Yangon, Myanmar, chuyển đến Singapore lúc 1 tuổi.",
};

export type CommunityRole = {
  id: string;
  org: string;
  orgLink?: string;
  role: string;
  /** Optional Vietnamese variant of the role. */
  roleVi?: string;
  dates: string;
  description: string;
  /** Optional Vietnamese variant of the description. */
  descriptionVi?: string;
  logoSrc?: string;
};

export const communityService: CommunityRole[] = [
  {
    id: "touch",
    org: "TOUCH Community Services",
    role: "Meals on Wheels Volunteer",
    roleVi: "Tình nguyện viên Meals on Wheels",
    dates: "Dec 2025 to Jan 2026",
    description:
      "Delivered meals and provided companionship to homebound elderly through the Meals on Wheels programme.",
    descriptionVi:
      "Giao bữa ăn và trò chuyện cùng người cao tuổi không ra khỏi nhà thông qua chương trình Meals on Wheels.",
    logoSrc: "/logos/communities/touch-community.png",
  },
  {
    id: "heartware",
    org: "Heartware Network",
    role: "Youth Leader (Learner to Champion progression)",
    roleVi: "Thủ lĩnh thanh niên (lộ trình Learner đến Champion)",
    dates: "Sep 2023 to May 2025",
    description:
      "Progressed through three tiers: Learner (Sep 2023 to Jan 2024, awarded Best Learner), Builder (Feb 2024 to Dec 2024, trained new Learners), Champion (Feb 2025 to May 2025, led volunteer teams across East Coast GRC).",
    descriptionVi:
      "Trải qua ba cấp độ: Learner (9/2023 đến 1/2024, đoạt giải Best Learner), Builder (2/2024 đến 12/2024, đào tạo các Learner mới), Champion (2/2025 đến 5/2025, dẫn dắt các nhóm tình nguyện viên trên khắp khu vực East Coast GRC).",
    logoSrc: "/logos/communities/heartware-network.jpg",
  },
  {
    id: "sp-osip",
    org: "Singapore Polytechnic Overseas Social Innovation Project",
    role: "Student Volunteer (Lead)",
    roleVi: "Tình nguyện viên sinh viên (Trưởng nhóm)",
    dates: "Mar 2019",
    description:
      "14-day project in Makassar, Indonesia with Politeknik Negeri Ujung Pandang. Conducted community surveys and applied design thinking to help a local soy sauce business.",
    descriptionVi:
      "Dự án 14 ngày tại Makassar, Indonesia cùng Politeknik Negeri Ujung Pandang. Thực hiện khảo sát cộng đồng và áp dụng design thinking để hỗ trợ một doanh nghiệp nước tương địa phương.",
    logoSrc: "/logos/schools/sp.webp",
  },
  {
    id: "slush",
    org: "Slush Singapore",
    role: "Facilitator",
    roleVi: "Điều phối viên",
    dates: "Aug 2018 to Sep 2018",
    description:
      "Managed backstage logistics for 70 speakers, ensuring timely arrivals and keynote prep. Oversaw speaker registration and ticketing.",
    descriptionVi:
      "Quản lý hậu cần hậu trường cho 70 diễn giả, đảm bảo đến đúng giờ và chuẩn bị keynote. Phụ trách đăng ký diễn giả và vé.",
    logoSrc: "/logos/communities/slush-singapore.png",
  },
  {
    id: "sg100",
    org: "SG100 Foundation",
    role: "Facilitator",
    roleVi: "Điều phối viên",
    dates: "Jun 2018 to Jul 2018",
    description:
      "Operated speaker rooms for industry talks on Entrepreneurship and Blockchain (Findjobs, BWG Academy, Ep-Tec). Managed registration for 50+ participants.",
    descriptionVi:
      "Vận hành phòng diễn giả cho các buổi talk về Khởi nghiệp và Blockchain (Findjobs, BWG Academy, Ep-Tec). Phụ trách đăng ký cho hơn 50 người tham dự.",
    logoSrc: "/logos/communities/sg100-foundation.jpg",
  },
];

export type Activity = {
  id: string;
  org: string;
  role: string;
  roleVi?: string;
  dates: string;
  description?: string;
  descriptionVi?: string;
  logoSrc?: string;
};

export const activities: Activity[] = [
  {
    id: "smu-pm-club",
    org: "SMU Product Management Club",
    role: "Member",
    roleVi: "Thành viên",
    dates: "Aug 2023 to Dec 2023",
    description:
      "Won 1st place in the SMU Product Management Experience Internal Product Challenge with GrabCompare.",
    descriptionVi:
      "Đoạt giải Nhất tại SMU Product Management Experience Internal Product Challenge với dự án GrabCompare.",
    logoSrc: "/logos/schools/smu.png",
  },
  {
    id: "sp-dj",
    org: "Singapore Polytechnic Disc Jockey Club",
    role: "Vice President",
    roleVi: "Phó chủ tịch",
    dates: "Nov 2018 to Apr 2020",
    description:
      "Ran 3 to 4 person crews per event. Owned event logistics end-to-end: planning electrical and power setup, transporting club inventory to site, on-site rigging, and scheduling the DJs spinning the slot. Awarded SP CCA Gold with Honours for leadership.",
    descriptionVi:
      "Điều hành đội 3 đến 4 người mỗi sự kiện. Quản lý hậu cần end-to-end: lên phương án điện và nguồn, vận chuyển thiết bị của club đến địa điểm, lắp đặt tại chỗ và xếp lịch các DJ chơi từng slot. Được trao SP CCA Gold with Honours cho khả năng lãnh đạo.",
    logoSrc: "/logos/schools/sp.webp",
  },
  {
    id: "sp-class-chair",
    org: "Singapore Polytechnic",
    role: "Class Chairperson",
    roleVi: "Lớp trưởng",
    dates: "Apr 2019 to Nov 2019",
    description:
      "Liaison between the lecturer and the cohort. Lecturer had my number, I disseminated to the class. Practical duties: chasing late project submissions, reminding people on deadlines, and coordinating money collection when the lecturer needed notes bought for the class.",
    descriptionVi:
      "Cầu nối giữa giảng viên và lớp. Giảng viên giữ số tôi, tôi truyền đạt lại cho lớp. Việc thực tế: đốc thúc các bài nộp trễ, nhắc deadline, và phối hợp thu tiền khi giảng viên cần mua tài liệu cho lớp.",
    logoSrc: "/logos/schools/sp.webp",
  },
];

export type Award = {
  id: string;
  title: string;
  /** Optional Vietnamese variant of the title. */
  titleVi?: string;
  issuer: string;
  date: string;
  description?: string;
  descriptionVi?: string;
  imageSrc?: string;
};

export const awards: Award[] = [
  {
    id: "best-learner",
    title: "Best Learner Award",
    titleVi: "Giải Best Learner",
    issuer: "Heartware Network",
    date: "Jan 2024",
    description: "For outstanding contributions in the Sustainable Youth Leadership programme.",
    descriptionVi:
      "Cho những đóng góp nổi bật trong chương trình Sustainable Youth Leadership.",
    imageSrc: "/images/awards/best-learner-heartware.webp",
  },
  {
    id: "sp-cca-gold",
    title: "SP CCA Gold with Honours",
    issuer: "Singapore Polytechnic",
    date: "2018 to 2021",
    description: "For exceptional co-curricular contribution and leadership in the DJ Club.",
    descriptionVi:
      "Cho những đóng góp ngoại khóa và khả năng lãnh đạo nổi bật tại DJ Club.",
  },
  {
    id: "sp-eng-show-merit",
    title: "SP Engineering Show Merit Award",
    titleVi: "Giải Merit tại SP Engineering Show",
    issuer: "Singapore Polytechnic",
    date: "2021",
    description: "Awarded for the 5G Autonomous Surveillance Vehicle project featured at SP Engineering Show.",
    descriptionVi:
      "Trao tặng cho dự án xe tuần tra tự hành 5G được trưng bày tại SP Engineering Show.",
  },
  {
    id: "w2-book-prize",
    title: "W2 Book Prize Award",
    titleVi: "Giải W2 Book Prize",
    issuer: "Singapore Polytechnic",
    date: "2021",
  },
  {
    id: "directors-honour-roll",
    title: "Director's Honour Roll",
    titleVi: "Bảng vinh danh của Hiệu trưởng",
    issuer: "Singapore Polytechnic",
    date: "2020",
  },
];

export type InterestGroup = {
  id: string;
  label: string;
  /** Optional Vietnamese variant of the group label. */
  labelVi?: string;
  items: string[];
  /** Optional Vietnamese variant of the item list. When present, fully
   *  replaces the English items array (positions must match). */
  itemsVi?: string[];
};

export const personalInterests: InterestGroup[] = [
  {
    id: "motorsports",
    label: "Motorsports & Mobility",
    labelVi: "Đua xe & Giao thông",
    items: ["Car license", "Motorcycle license", "Pursuing Boat License (PPCDL)"],
    itemsVi: ["Bằng lái ô tô", "Bằng lái mô tô", "Đang theo bằng lái thuyền (PPCDL)"],
  },
  {
    id: "investing",
    label: "Investing",
    labelVi: "Đầu tư",
    items: ["US stock market (consistent contributions)"],
    itemsVi: ["Thị trường chứng khoán Mỹ (đóng góp đều đặn)"],
  },
  {
    id: "education",
    label: "Developer YouTube",
    labelVi: "YouTube cho lập trình viên",
    items: ["Theo (t3.gg)", "Mo Bitar", "Fireship"],
  },
  {
    id: "gaming-past",
    label: "Used to Play",
    labelVi: "Từng chơi",
    items: ["Counter Strike Global Offensive (SMFC rank)", "Dota 2", "Minecraft"],
  },
];
