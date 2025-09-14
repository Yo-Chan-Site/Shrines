import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Landmark, BookOpen, Train, Info, Leaf, Star, Sun, Waves, HeartHandshake, Languages } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ——————————————————————————————————————————————————————————
// Translations (EN / JP)
// ——————————————————————————————————————————————————————————
const i18n = {
  en: {
    nav: [
      { id: "overview", label: "Overview" },
      { id: "myth", label: "Myth & Deities" },
      { id: "shrines", label: "Ise & Izumo" },
      { id: "nearby", label: "Nearby Attractions" },
      { id: "visit", label: "How to Visit" },
      { id: "etiquette", label: "Etiquette" },
      { id: "faq", label: "FAQ" },
    ],
    switch: "日本語",
    heroTitle: "Ise & Izumo: A Friendly Guide to Japan’s Origin Myths",
    heroText:
      "This English‑language guide connects Japan’s two most storied shrines— Ise Grand Shrine in Mie and Izumo Taisha in Shimane—with the myths from the Kojiki and Nihon Shoki. You’ll learn the key stories, what each shrine represents, and the best nearby places to explore.",
    overviewTitle: "Why these two shrines matter",
    overviewSubtitle:
      "Think of Ise as the spiritual heart of the nation (Amaterasu’s seat) and Izumo as the cradle of cooperation and relationships (Ōkuninushi’s realm). Together, they form a narrative arc from divine authority to human harmony.",
    atAGlance: "At a Glance",
    glanceBullets: [
      "Ise Grand Shrine → Amaterasu, renewal every 20 years.",
      "Izumo Taisha → Ōkuninushi, famous for matchmaking prayers.",
      "October in Izumo → ‘Month when the gods are present’ (Kami‑Ari‑zuki).",
      "Classic pairing: visit Ise for national spirit; Izumo for personal ties.",
    ],
    bigPictureTitle: "The Big Picture",
    bigPictureText:
      "In myth, the heavenly lineage of Amaterasu legitimizes rule (Ise), while Ōkuninushi builds the land and forges bonds (Izumo). The famous Kuni‑Yuzuri story—where Ōkuninushi peacefully yields rulership—symbolically links both shrines. Visiting them offers two complementary perspectives on Japan’s beginnings.",
    pills: ["Amaterasu – Sovereignty", "Ōkuninushi – Relationships", "Kuni‑Yuzuri – Peaceful transfer", "Shikinen Sengū – Renewal"],

    // Myth cards
    myths: [
      {
        title: "Amaterasu (Sun Goddess)",
        icon: "sun",
        text:
          "Central deity of Shinto and the divine ancestor of Japan’s imperial line. Ise Grand Shrine (Inner Shrine) is dedicated to Amaterasu.",
        tag: "Ise",
      },
      {
        title: "Ōkuninushi (Nation‑Builder)",
        icon: "landmark",
        text:
          "A key god of nation‑building, medicine, and relationships. Izumo Taisha enshrines Ōkuninushi and is famous for matchmaking.",
        tag: "Izumo",
      },
      {
        title: "Susanoo (Storm God)",
        icon: "waves",
        text:
          "Brother of Amaterasu; linked to Izumo myths (like the Yamata‑no‑Orochi tale). Often connected to shrines across Izumo.",
        tag: "Izumo",
      },
      {
        title: "Ninigi & Yamatohime",
        icon: "star",
        text:
          "Ninigi (Amaterasu’s grandson) begins the divine lineage on earth; Princess Yamatohime is said to have chosen Ise as Amaterasu’s sacred site.",
        tag: "Ise",
      },
      {
        title: "Kuni‑Yuzuri (Transfer of the Land)",
        icon: "handshake",
        text:
          "Mythic pact where Ōkuninushi yields rulership to Amaterasu’s descendants—symbolically linking Izumo (negotiation) and Ise (sovereignty).",
        tag: "Both",
      },
    ],

    shrinesTitle: "The Two Shrines",
    shrinesSubtitle: "Switch between Ise and Izumo for what to know before you go.",
    iseMythicFocus:
      "Ise’s Inner Shrine (Naikū) venerates Amaterasu, the Sun Goddess and divine ancestress of Japan’s imperial line. Traditions recount that Princess Yamatohime chose Ise as Amaterasu’s dwelling after a long pilgrimage. The Shikinen Sengū rebuilding every 20 years renews the sacred precincts, transmits craftsmanship, and symbolizes rebirth and purity.",
    iseGoodToKnow: {
      title: "Good to Know",
      deity: ["Deity", "Amaterasu (Sun Goddess)"],
      sites: ["Sites", "Naikū (Inner), Gekū (Outer)"],
      theme: ["Theme", "National well‑being, renewal"],
      dontMiss: ["Don’t Miss", "Oharaimachi & Okage Yokocho food stroll"],
    },
    izumoMythicFocus:
      "Izumo Taisha enshrines Ōkuninushi, famed for building the land, healing, and fostering relationships. Izumo is also tied to Susanoo legends and the great gathering of deities in October. The Kuni‑Yuzuri (Transfer of the Land) depicts Ōkuninushi’s peaceful pact to entrust rulership to Amaterasu’s descendants—linking Izumo’s spirit of cooperation to Ise’s symbol of sovereignty.",
    izumoGoodToKnow: {
      title: "Good to Know",
      deity: ["Deity", "Ōkuninushi (Nation‑Builder)"],
      theme: ["Theme", "Relationships (en‑musubi), harmony"],
      dontMiss: ["Don’t Miss", "Giant shimenawa rope, Inasa‑no‑Hama beach"],
    },

    nearbyTitle: "Nearby Attractions",
    nearbySubtitle: "Build an itinerary around each shrine.",
    iseArea: "Ise Area (Mie)",
    iseBadge: "Nature • Food • Coast",
    izumoArea: "Izumo Area (Shimane)",
    izumoBadge: "Mythic Coast • Onsen • Castles",

    iseSpots: [
      ["Naikū (Inner Shrine)", "Amaterasu’s sanctuary; rebuilt every 20 years (Shikinen Sengū)."],
      ["Gekū (Outer Shrine)", "Dedicated to Toyouke, deity of food and industry."],
      ["Oharaimachi & Okage Yokocho", "Atmospheric streets for food (ise‑udon, akafuku) and crafts."],
      ["Meoto Iwa (Wedded Rocks)", "Iconic twin rocks off Futami coast linked by a shimenawa rope."],
      ["Toba & Mikimoto Pearl Island", "Learn pearl culture; coastal views and museums."],
      ["Kashikojima / Ago Bay", "Island‑dotted bay cruises; Ise‑Shima National Park."],
      ["Kumano Kodo Iseji", "Pilgrim route connecting Ise to Kumano shrines (scenic day hikes)."],
    ],

    izumoSpots: [
      ["Izumo Taisha (Grand Shrine)", "Massive shimenawa rope; pray for relationships and connections."],
      ["Inasa‑no‑Hama Beach", "Mythic shore where gods are welcomed during Kami‑Ari‑zuki (Oct)."],
      ["Hinomisaki Shrine & Lighthouse", "Striking coastal shrine and one of Japan’s tallest lighthouses."],
      ["Lake Shinji Sunset", "Famous golden sunsets; local shijimi clam cuisine."],
      ["Matsue Castle", "One of Japan’s few original castles; samurai district nearby."],
      ["Adachi Museum of Art", "World‑renowned gardens and modern Japanese art (Yasugi)."],
      ["Tamatsukuri Onsen & Yaegaki Shrine", "Hot springs and a small shrine for relationships."],
    ],

    visitTitle: "How to Visit & Suggested Flow",
    visitSubtitle: "Simple logistics from major hubs. Always check current schedules.",
    getIseTitle: "Getting to Ise (Mie)",
    getIse: [
      "From Nagoya: Kintetsu or JR to Ise‑shi / Ujiyamada (~1.5–2h).",
      "From Osaka: Kintetsu Limited Express from Namba (~2h).",
      "Closest airports: Chubu Centrair (NGO), Kansai (KIX).",
    ],
    getIzumoTitle: "Getting to Izumo (Shimane)",
    getIzumo: [
      "Fly to Izumo Enmusubi Airport (IZO) from Tokyo (HND) (~1.5h), then bus to shrine (~40–60 min).",
      "Or JR to Izumoshi / Matsue via Okayama (San‑in line).",
      "Consider renting a car to reach coastal spots easily.",
    ],
    tripIdeaTitle: "Trip Idea: 4–6 Days",
    tripIdea: [
      "Days 1–2: Ise (Naikū/Gekū, Oharaimachi, Meoto Iwa, Ago Bay).",
      "Days 3–4: Travel to Izumo; visit shrine and Inasa‑no‑Hama.",
      "Days 5–6: Matsue Castle, Lake Shinji sunset, Adachi Museum; onsen.",
    ],
    seasons: [
      ["Spring", "Cherry blossoms and mild weather. Busy on weekends."],
      ["Summer", "Green landscapes and festivals; hot and humid—hydrate well."],
      ["Autumn", "Clear skies, fall colors; popular season for travel."],
      ["Winter", "Crisp air and quieter sites; dress warmly (coastal winds)."],
    ],

    etiquetteTitle: "Shrine Etiquette (Quick Guide)",
    etiquette: [
      "Dress modestly; keep voices low inside sacred precincts.",
      "At a purification basin (temizuya), rinse left hand, right hand, mouth (discreetly), then the handle.",
      "At a shrine: bow twice, clap twice, pray silently, bow once.",
      "Photography is restricted at some inner areas—follow signs and staff.",
    ],
    manners: [
      "No eating while walking inside sacred areas.",
      "Step aside for ceremonies; follow staff guidance.",
      "Coins for offerings are fine (5‑yen is considered lucky).",
    ],

    faqTitle: "FAQ",
    faqs: [
      [
        "How are Ise and Izumo connected in mythology?",
        "In Shinto lore, Ōkuninushi of Izumo negotiates the ‘Transfer of the Land’ (Kuni‑Yuzuri) to the heavenly descendants of Amaterasu—whose supreme shrine is Ise. Symbolically, Izumo embodies cooperation and ties among deities and people, while Ise represents divine legitimacy and national well‑being.",
      ],
      [
        "What’s special about Ise Grand Shrine?",
        "It’s the most revered shrine to Amaterasu, enshrining the Sacred Mirror (Yata‑no‑Kagami). The shrine buildings are ritually rebuilt every 20 years (Shikinen Sengū), passing techniques and purity to the next generation.",
      ],
      [
        "What’s special about Izumo Taisha?",
        "Dedicated to Ōkuninushi, it’s famous for en‑musubi (binding of relationships). In October (traditionally Kami‑Ari‑zuki in Izumo), deities from across Japan are said to gather here for divine meetings.",
      ],
      [
        "Can I visit both in one trip?",
        "Yes, but Japan’s geography makes it a longer itinerary. Many travelers visit Ise from Nagoya/Osaka, and Izumo with Matsue/Shimane. Consider a 4–6 day plan if combining both.",
      ],
    ],

    footerNote:
      "Always check official websites for current hours, rituals, and access information.",
  },

  jp: {
    nav: [
      { id: "overview", label: "概要" },
      { id: "myth", label: "神話と神々" },
      { id: "shrines", label: "伊勢と出雲" },
      { id: "nearby", label: "周辺観光" },
      { id: "visit", label: "アクセス" },
      { id: "etiquette", label: "参拝マナー" },
      { id: "faq", label: "よくある質問" },
    ],
    switch: "English",
    heroTitle: "伊勢と出雲：日本神話の源をたどる英語ガイド",
    heroText:
      "このガイドは、三重の伊勢神宮と島根の出雲大社という日本を代表する2つの神社を『古事記』『日本書紀』の神話と結び付けて紹介します。それぞれの神社が表す意味や、周辺の観光スポットも英語で分かりやすくご案内します。",
    overviewTitle: "2つの神社が重要な理由",
    overviewSubtitle:
      "伊勢は国家の精神的中心（天照大神の御座所）、出雲は国づくりと縁結び（大国主大神の領域）。両者を合わせて見ることで、神の権威から人の和へとつながる物語が見えてきます。",
    atAGlance: "ポイント早見",
    glanceBullets: [
      "伊勢神宮 → 天照大神、20年に一度の式年遷宮。",
      "出雲大社 → 大国主大神、縁結びの祈願で有名。",
      "出雲の10月 → 神在月（全国の神々が集うと伝わる）。",
      "伊勢＝国の祈り、出雲＝人のご縁という対比が楽しめる。",
    ],
    bigPictureTitle: "全体像",
    bigPictureText:
      "神話では、天照大神の天つ神の系譜が統治の正当性（伊勢）を示し、大国主大神は国づくりと人のつながり（出雲）を担います。大国主が統治を譲る『国譲り』は、出雲の協調と伊勢の主権を象徴的に結び付けます。2社を巡ると、日本のはじまりを二つの視点から体感できます。",
    pills: ["天照大神＝主権", "大国主＝ご縁", "国譲り＝平和的移譲", "式年遷宮＝更新"],

    myths: [
      {
        title: "天照大神（太陽の女神）",
        icon: "sun",
        text: "神道の中心神で日本の皇統の祖神。伊勢神宮（内宮）にお祀りされています。",
        tag: "伊勢",
      },
      {
        title: "大国主大神（国づくりの神）",
        icon: "landmark",
        text: "国づくり・医療・良縁の神。出雲大社に祀られ、縁結びで名高い。",
        tag: "出雲",
      },
      {
        title: "素戔嗚尊（嵐の神）",
        icon: "waves",
        text: "天照の弟。ヤマタノオロチ退治など出雲の物語に登場。",
        tag: "出雲",
      },
      {
        title: "ニニギと倭姫命",
        icon: "star",
        text: "天照の孫ニニギは地上での神統の始まり。倭姫命が長い巡行の末に伊勢を御鎮座地に選んだと伝わる。",
        tag: "伊勢",
      },
      {
        title: "国譲り",
        icon: "handshake",
        text: "大国主が統治を天照の子孫に譲る物語。出雲（交渉）と伊勢（主権）を象徴的に結ぶ。",
        tag: "両方",
      },
    ],

    shrinesTitle: "2つの神社",
    shrinesSubtitle: "伊勢／出雲それぞれの見どころを切り替え表示。",
    iseMythicFocus:
      "伊勢神宮の内宮は天照大神をお祀りし、皇統の祖神として最も尊いお社とされます。倭姫命が巡行の末に伊勢を御鎮座地に選んだと伝わります。20年ごとの式年遷宮は、技術の継承と浄新を象徴します。",
    iseGoodToKnow: {
      title: "基本情報",
      deity: ["御祭神", "天照大神"],
      sites: ["主な社殿", "内宮・外宮"],
      theme: ["象徴", "国家安寧・更新"],
      dontMiss: ["見どころ", "おはらい町・おかげ横丁の食べ歩き"],
    },
    izumoMythicFocus:
      "出雲大社は大国主大神をお祀りし、国づくり・医療・縁結びのご神徳で知られます。10月の神在月には全国の神々が集うと伝わります。『国譲り』は、大国主が天照の子孫に政を譲る故事で、出雲の協調と伊勢の主権を結びます。",
    izumoGoodToKnow: {
      title: "基本情報",
      deity: ["御祭神", "大国主大神"],
      theme: ["象徴", "縁結び・和合"],
      dontMiss: ["見どころ", "巨大しめ縄・稲佐の浜"],
    },

    nearbyTitle: "周辺観光",
    nearbySubtitle: "各神社を中心に行程を組み立てましょう。",
    iseArea: "伊勢エリア（三重）",
    iseBadge: "自然・食・海辺",
    izumoArea: "出雲エリア（島根）",
    izumoBadge: "神話の海岸・温泉・城下町",

    iseSpots: [
      ["内宮（ないくう）", "天照大神の正宮。20年ごとに式年遷宮。"],
      ["外宮（げくう）", "食と産業の神・豊受大神をお祀り。"],
      ["おはらい町・おかげ横丁", "伊勢うどん・赤福など食べ歩きと工芸。"],
      ["夫婦岩（めおといわ）", "二つの岩を大しめ縄で結ぶ伊勢二見の象徴。"],
      ["鳥羽・ミキモト真珠島", "真珠文化を学べる施設と海景色。"],
      ["賢島／英虞湾", "多島美のクルーズ。伊勢志摩国立公園。"],
      ["熊野古道・伊勢路", "熊野三山へ続く巡礼道。日帰りハイキング可。"],
    ],

    izumoSpots: [
      ["出雲大社", "巨大しめ縄で有名。良縁・ご縁祈願。"],
      ["稲佐の浜", "神在月に神々をお迎えする浜。"],
      ["日御碕神社・灯台", "海辺の鮮やかな社殿と日本有数の灯台。"],
      ["宍道湖の夕日", "黄金色の夕景。しじみ料理も名物。"],
      ["松江城", "現存天守の一つ。武家屋敷エリアあり。"],
      ["足立美術館", "世界的に評価の高い日本庭園と近代日本画（安来）。"],
      ["玉造温泉・八重垣神社", "温泉と、縁占いで知られる小社。"],
    ],

    visitTitle: "アクセス＆モデルコース",
    visitSubtitle: "主要都市からのシンプルな行き方（最新のダイヤは要確認）。",
    getIseTitle: "伊勢（三重）への行き方",
    getIse: [
      "名古屋から：近鉄またはJRで伊勢市／宇治山田（約1.5～2時間）",
      "大阪から：近鉄特急（難波）で約2時間",
      "最寄り空港：中部国際（NGO）、関西国際（KIX）",
    ],
    getIzumoTitle: "出雲（島根）への行き方",
    getIzumo: [
      "東京（羽田）→ 出雲縁結び空港（約1.5時間）→ バスで神社へ（40～60分）",
      "またはJRで岡山経由・山陰本線で出雲市／松江へ",
      "海沿いは車が便利。レンタカーも検討を",
    ],
    tripIdeaTitle: "モデルコース（4～6日）",
    tripIdea: [
      "1～2日目：伊勢（内宮／外宮・おはらい町・夫婦岩・英虞湾）",
      "3～4日目：移動して出雲。神社と稲佐の浜を巡る",
      "5～6日目：松江城・宍道湖の夕日・足立美術館・温泉",
    ],
    seasons: [
      ["春", "桜と穏やかな気候。週末は混雑しやすい"],
      ["夏", "緑と祭。暑湿につき水分補給を"],
      ["秋", "快晴と紅葉。人気の行楽シーズン"],
      ["冬", "澄んだ空気で静かに参拝。海風に注意"],
    ],

    etiquetteTitle: "参拝マナー（簡易ガイド）",
    etiquette: [
      "露出は控えめに。境内では静かに",
      "手水舎：左手→右手→口（控えめに）→柄の順に清める",
      "拝礼：二拝二拍手一拝（地域差あり。案内に従う）",
      "内側の撮影禁止エリアあり。標識と職員の指示に従う",
    ],
    manners: ["境内での歩き食べは控える", "祭事の際は道を譲る・指示に従う", "賽銭は5円などでも可"],

    faqTitle: "よくある質問",
    faqs: [
      [
        "伊勢と出雲は神話の中でどうつながっていますか？",
        "出雲の大国主が『国譲り』で、天照系の子孫（伊勢の最高神を祀る系譜）へ政を譲る物語があります。象徴的に、出雲は神々と人のご縁、伊勢は国家安寧と正統性を体現します。",
      ],
      [
        "伊勢神宮が特別と言われる理由は？",
        "天照大神をお祀りする最も尊いお社の一つで、八咫鏡を御神体とする伝承があります。式年遷宮で20年ごとに社殿を新造し、技術と清浄を継承します。",
      ],
      [
        "出雲大社の特徴は？",
        "大国主大神をお祀りし、縁結びで有名です。10月（出雲では神在月）には全国の神々が集うと伝わります。",
      ],
      [
        "同じ旅で両方回れますか？",
        "可能ですが距離があるため、移動時間に余裕を。伊勢は名古屋／大阪と組み合わせ、出雲は松江・山陰観光と合わせるのが一般的。4～6日程度を目安に。",
      ],
    ],

    footerNote: "参拝時間や儀式、アクセスは必ず公式サイトで最新情報をご確認ください。",
  },
};

// Icons helper
const Icon = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case "sun":
      return <Sun className={className} />;
    case "waves":
      return <Waves className={className} />;
    case "star":
      return <Star className={className} />;
    case "landmark":
      return <Landmark className={className} />;
    case "handshake":
      return <HeartHandshake className={className} />;
    default:
      return <Leaf className={className} />;
  }
};

const Section = ({ id, icon, title, subtitle, children }) => (
  <section id={id} className="py-14 scroll-mt-24">
    <div className="max-w-6xl mx-auto px-5">
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 rounded-2xl bg-gray-100 shadow-sm">{icon}</div>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-1 leading-relaxed">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  </section>
);

export default function IseIzumoGuide() {
  const [lang, setLang] = useState("en");
  const t = i18n[lang];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Nav */}
      <div className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
        <nav className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-3 overflow-x-auto">
          {t.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-sm font-medium hover:underline whitespace-nowrap">
              {item.label}
            </a>
          ))}
          <Button size="sm" variant="outline" className="ml-auto flex items-center gap-1 rounded-2xl" onClick={() => setLang(lang === "en" ? "jp" : "en")}>
            <Languages className="w-4 h-4" /> {t.switch}
          </Button>
        </nav>
      </div>

      {/* Hero */}
      <header className="relative">
        <div className="max-w-6xl mx-auto px-5 pt-12 pb-10">
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {t.heroTitle}
          </motion.h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl leading-relaxed">{t.heroText}</p>
        </div>
      </header>

      {/* Overview */}
      <Section id="overview" icon={<BookOpen className="w-5 h-5" />} title={t.overviewTitle} subtitle={t.overviewSubtitle}>
        <Card className="rounded-2xl">
          <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-semibold text-xl">{t.bigPictureTitle}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">{t.bigPictureText}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.pills.map((p) => (
                  <span key={p} className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm">{p}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-blue-50 p-6">
              <h4 className="font-semibold">{t.atAGlance}</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-800">
                {t.glanceBullets.map((g) => (
                  <li key={g}>• {g}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Myth & Deities */}
      <Section id="myth" icon={<Leaf className="w-5 h-5" />} title={lang === "en" ? "Key Myths & Deities" : "主要な神話と神々"} subtitle={lang === "en" ? "Quick cards to keep the stories straight." : "物語の要点をカードで手早く把握。"}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.myths.map((m) => (
            <Card key={m.title} className="rounded-2xl">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Icon name={m.icon} />
                  <CardTitle className="text-lg">{m.title}</CardTitle>
                </div>
                <div className="mt-2">
                  <Badge variant="secondary">{m.tag}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 leading-relaxed">{m.text}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Shrines Tabs */}
      <Section id="shrines" icon={<Landmark className="w-5 h-5" />} title={t.shrinesTitle} subtitle={t.shrinesSubtitle}>
        <Tabs defaultValue="ise" className="w-full">
          <TabsList className="rounded-2xl">
            <TabsTrigger value="ise" className="rounded-xl">{lang === "en" ? "Ise Grand Shrine" : "伊勢神宮"}</TabsTrigger>
            <TabsTrigger value="izumo" className="rounded-xl">{lang === "en" ? "Izumo Taisha" : "出雲大社"}</TabsTrigger>
          </TabsList>
          <TabsContent value="ise" className="mt-6">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <Card className="rounded-2xl h-full">
                  <CardHeader>
                    <CardTitle>{lang === "en" ? "Mythic Focus" : "神話の焦点"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-gray-700 leading-relaxed">{t.iseMythicFocus}</CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <Card className="rounded-2xl h-full">
                  <CardHeader>
                    <CardTitle>{t.iseGoodToKnow.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700 space-y-2">
                    <div><Badge>{t.iseGoodToKnow.deity[0]}</Badge> {t.iseGoodToKnow.deity[1]}</div>
                    <div><Badge>{t.iseGoodToKnow.sites[0]}</Badge> {t.iseGoodToKnow.sites[1]}</div>
                    <div><Badge>{t.iseGoodToKnow.theme[0]}</Badge> {t.iseGoodToKnow.theme[1]}</div>
                    <div><Badge>{t.iseGoodToKnow.dontMiss[0]}</Badge> {t.iseGoodToKnow.dontMiss[1]}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="izumo" className="mt-6">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <Card className="rounded-2xl h-full">
                  <CardHeader>
                    <CardTitle>{lang === "en" ? "Mythic Focus" : "神話の焦点"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-gray-700 leading-relaxed">{t.izumoMythicFocus}</CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <Card className="rounded-2xl h-full">
                  <CardHeader>
                    <CardTitle>{t.izumoGoodToKnow.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700 space-y-2">
                    <div><Badge>{t.izumoGoodToKnow.deity[0]}</Badge> {t.izumoGoodToKnow.deity[1]}</div>
                    <div><Badge>{t.izumoGoodToKnow.theme[0]}</Badge> {t.izumoGoodToKnow.theme[1]}</div>
                    <div><Badge>{t.izumoGoodToKnow.dontMiss[0]}</Badge> {t.izumoGoodToKnow.dontMiss[1]}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      {/* Nearby Attractions */}
      <Section id="nearby" icon={<MapPin className="w-5 h-5" />} title={t.nearbyTitle} subtitle={t.nearbySubtitle}>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.iseArea}</CardTitle>
                <Badge variant="secondary">{t.iseBadge}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-800">
                {t.iseSpots.map(([name, note]) => (
                  <li key={name} className="flex items-start gap-3">
                    <span className="mt-1"><ChevronRight className="w-4 h-4" /></span>
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="text-sm text-gray-600">{note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.izumoArea}</CardTitle>
                <Badge variant="secondary">{t.izumoBadge}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-800">
                {t.izumoSpots.map(([name, note]) => (
                  <li key={name} className="flex items-start gap-3">
                    <span className="mt-1"><ChevronRight className="w-4 h-4" /></span>
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="text-sm text-gray-600">{note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Visit */}
      <Section id="visit" icon={<Train className="w-5 h-5" />} title={t.visitTitle} subtitle={t.visitSubtitle}>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>{t.getIseTitle}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              {t.getIse.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>{t.getIzumoTitle}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              {t.getIzumo.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>{t.tripIdeaTitle}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              {t.tripIdea.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Separator className="my-8" />
        <div className="grid md:grid-cols-4 gap-4">
          {t.seasons.map(([season, tip]) => (
            <Card key={season} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">{season}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">{tip}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Etiquette */}
      <Section id="etiquette" icon={<Info className="w-5 h-5" />} title={t.etiquetteTitle}>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl md:col-span-2">
            <CardContent className="p-6">
              <ol className="list-decimal ml-6 space-y-2 text-gray-800">
                {t.etiquette.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>{lang === "en" ? "Good Manners" : "ちょっとした心がけ"}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              {t.manners.map((m) => (
                <div key={m}>• {m}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" icon={<Info className="w-5 h-5" />} title={t.faqTitle}>
        <Accordion type="single" collapsible className="w-full">
          {t.faqs.map(([q, a], idx) => (
            <AccordionItem value={`item-${idx}`} key={q}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Footer */}
      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-5 py-10 text-sm text-gray-600">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{lang === "en" ? "English Travel Guide" : "英語トラベルガイド"}</Badge>
            <Badge variant="outline">Ise • Izumo • Mythology</Badge>
          </div>
          <p className="mt-4">{t.footerNote}</p>
        </div>
      </footer>
    </div>
  );
}
