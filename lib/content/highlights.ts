// Recent highlights surfaced on home and on the /highlights page.

export type Highlight = {
  title: string;
  /** Optional Vietnamese variant of the title. Skip for proper-noun
   *  titles ("World Cities Summit 2024"); used when the title carries
   *  descriptive prose worth translating. */
  titleVi?: string;
  description: string;
  /** Optional Vietnamese variant of the description. Keep proper
   *  nouns and product names in English, translate only prose. */
  descriptionVi?: string;
  date: string;
  href?: string;
  imageSrc?: string;
  /** Optional CSS `object-position` value for the cover crop. Cards
   *  default to `object-top` which works for portrait subjects, but
   *  some sources have the subject in the lower or off-center region
   *  (team photos where Lwin is at the edge, wide booth shots where
   *  faces sit below the poster). Override per-image to keep the
   *  subject in frame at every aspect ratio. */
  coverFocus?: string;
};

export const highlights: Highlight[] = [
  {
    title: "AI & IIoT Engineer at VNTT",
    titleVi: "Kỹ sư AI & IIoT tại VNTT",
    description:
      "Production-scale industrial IoT in Ho Chi Minh City. Learning EdgeX, deploying real systems at scale.",
    descriptionVi:
      "Hệ thống IoT công nghiệp quy mô production tại TP. Hồ Chí Minh. Học EdgeX, triển khai hệ thống thật ở quy mô lớn.",
    date: "MAY 2026",
    href: "https://vntt.com.vn/",
    imageSrc: "/images/highlights/vntt-welcome.jpg",
  },
  {
    title: "World Cities Summit 2024",
    description:
      "Showcased Osiris hydroponics IoT to government stakeholders including Ministers Indranee Rajah and Desmond Lee at the SMU IIE booth.",
    descriptionVi:
      "Giới thiệu giải pháp IoT thủy canh Osiris cho lãnh đạo chính phủ, bao gồm Bộ trưởng Indranee Rajah và Desmond Lee, tại gian trưng bày của SMU IIE.",
    date: "JUN 2024",
    href: "https://cityperspectives.smu.edu.sg/special-features/wcs-2024",
    // Swapped from the wide team shot (Lwin at the far-left edge,
    // his face was getting clipped on every aspect ratio because the
    // source was already framed with him against the border) to this
    // closer angle of the booth — Lwin + colleague at the hydroponics
    // rig with the IIE poster behind. Same WCS 2024 booth, just a
    // composition where his face has room.
    imageSrc: "/images/highlights/osiris-wcs-2024-rig.jpg",
    // Portrait source (1200x1600). Faces sit around 35-40% from the
    // top; rig + plants occupy the lower half. Anchor at 40% so a
    // wide-aspect crop (home small card) lands on the faces and a
    // taller crop (bento side-by-side) still shows the rig context.
    coverFocus: "center 40%",
  },
  {
    title: "Featured in Singapore Business Review",
    titleVi: "Được giới thiệu trên Singapore Business Review",
    description:
      "Osiris named among 9 SMU student ventures with promising business ventures in the SBR exclusive feature.",
    descriptionVi:
      "Osiris được điểm danh trong số 9 startup sinh viên SMU triển vọng nhất trong bài viết độc quyền của SBR.",
    date: "MAY 2024",
    href: "https://sbr.com.sg/markets-investing/exclusive/meet-9-singapore-students-promising-business-ventures",
    imageSrc: "/images/highlights/sbr-osiris-team.jpg",
    // Source was a wide composite: team photo on the left, giant
    // OSIRIS wordmark on the right. Lwin sat at the very left margin
    // of the source and got pushed to the container edge on every
    // crop. Recropped the source down to the team portion
    // (800x1200 portrait); his face now sits at ~15% from the left
    // instead of at the border. center 35% vertical anchors on the
    // faces, not the booth poster.
    coverFocus: "center 35%",
  },
  {
    title: "PM Club Internal Challenge 1st",
    titleVi: "Giải Nhất Internal Challenge của PM Club",
    description:
      "Won the SMU Product Management Experience Internal Product Challenge with GrabCompare.",
    descriptionVi:
      "Đạt giải Nhất tại SMU Product Management Experience Internal Product Challenge với dự án GrabCompare.",
    date: "OCT 2023",
    href: "/projects/grabcompare",
    imageSrc: "/images/highlights/pm-club-grabcompare.webp",
    // GrabCompare slides occupy the top half; six team members
    // stand below. Lwin is the leftmost. Push down + left so his
    // face survives narrow horizontal crops on small cards.
    coverFocus: "30% 70%",
  },
  {
    title: "Featured on Channel News Asia",
    titleVi: "Lên sóng Channel News Asia",
    description:
      "Singapore Indoor Farms project featured on CNA. One Raspberry Pi with DHT22 humidity, a CO2 sensor, and relay-driven lighting and water-pump control. Simple demo rack, but it landed on national TV.",
    descriptionVi:
      "Dự án Singapore Indoor Farms được giới thiệu trên CNA. Một Raspberry Pi với cảm biến độ ẩm DHT22, cảm biến CO2 và điều khiển đèn cùng máy bơm nước qua relay. Một bộ demo đơn giản, nhưng lên được truyền hình quốc gia.",
    date: "MAY 2022",
    imageSrc: "/images/highlights/cna-singapore-indoor-farm.webp",
  },
];
