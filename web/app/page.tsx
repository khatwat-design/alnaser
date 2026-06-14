"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  MessageCircle,
  X,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/9647741888444";
const WHITE = "#F5F3EE";
const BRONZE = "#B08D57";

const al = (file: string) => `/aluminum/${encodeURIComponent(file)}`;

const KITCHEN = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556909211-36987daf7b4d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
  ],
};

const ALUMINUM_CATEGORIES = [
  {
    id: "windows",
    label: "شبابيك",
    tagline: "عزل، ضوء، وتصميم يناسب كل واجهة",
    images: [al("IMG_0071.JPG"), al("IMG_0074.JPG"), al("IMG_0082.JPG")],
  },
  {
    id: "facades",
    label: "واجهات",
    tagline: "الانطباع الأول قبل أن تدخل",
    images: [al("IMG_0131.JPG"), al("IMG_0132.JPG")],
  },
  {
    id: "stairs",
    label: "محجرات درج",
    tagline: "تفصيلة ترفع المساحة كلها",
    images: [
      al("IMG_0163.JPG"),
      al("IMG_0165.JPG"),
      al("IMG_0167.JPG"),
      al("IMG_0168.JPG"),
    ],
  },
  {
    id: "skylight",
    label: "سكاي لايت",
    tagline: "السماء سقفك الجديد",
    images: [
      al("IMAGE 2026-06-14 20:46:21.jpg"),
      al("IMAGE 2026-06-14 20:46:24.jpg"),
      al("IMAGE 2026-06-14 20:46:26.jpg"),
    ],
  },
  {
    id: "doors",
    label: "أبواب",
    tagline: "أول انطباع، وآخر لمسة",
    images: [al("IMG_9039.jpg"), al("IMG_9043.jpg"), al("IMG_9044.jpg")],
  },
];

type Page = "landing" | "kitchens" | "aluminum";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<Page>("landing");
  const [curtain, setCurtain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useCallback((target: Page) => {
    setCurtain(true);
    setTimeout(() => {
      setPage(target);
      setCurtain(false);
    }, 750);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F5F3EE] antialiased selection:bg-[#B08D57]/30"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 60% 50% at 20% 50%, rgba(176,141,87,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 50%, rgba(245,243,238,0.02) 0%, transparent 60%)
        `
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-[60] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC4wNCIvPjwvc3ZnPg==')] opacity-40 mix-blend-overlay" />

      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <AnimatePresence>
        {curtain && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 origin-right bg-gradient-to-l from-[#0B0B0C] via-[#1A1A1C] to-[#0B0B0C]"
          />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <AnimatePresence mode="wait">
            {page === "landing" && !curtain && (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <LandingPage onNavigate={navigate} />
              </motion.div>
            )}
            {page === "kitchens" && !curtain && (
              <KitchenPage
                key="kitchens"
                onBack={() => navigate("landing")}
              />
            )}
            {page === "aluminum" && !curtain && (
              <AluminumPage
                key="aluminum"
                onBack={() => navigate("landing")}
              />
            )}
          </AnimatePresence>

          <WhatsAppButton />
          <ScrollProgress />
        </>
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#0B0B0C]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <Image
          src="/logo.png"
          alt="النصر"
          width={72}
          height={72}
          className="mx-auto brightness-0 invert"
          priority
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-xs tracking-[0.3em] text-[#B08D57]"
        >
          مطابخ × ألمنيوم وديكور
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function LandingPage({
  onNavigate,
}: {
  onNavigate: (page: Page) => void;
}) {
  const [hovered, setHovered] = useState<"kitchens" | "aluminum" | null>(null);

  return (
    <div className="flex h-dvh flex-col overflow-hidden md:flex-row">
      <ShimmerLine />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-center border-b border-[#3A3F44]/15 bg-[#0B0B0C]/85 backdrop-blur-xl"
      >
        <Image
          src="/logo.png"
          alt="النصر"
          width={32}
          height={32}
          className="brightness-0 invert"
          priority
        />
      </motion.header>

      <div className="absolute left-1/2 top-[calc(20%+28px)] z-30 -translate-x-1/2 text-center md:top-1/4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-display leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 6vw, 6.875rem)" }}
        >
          بيتك يستحق
          <br />
          لمسة{" "}
          <span className="text-[#B08D57] font-black">لا تتكرر</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 text-xs tracking-[0.15em] text-[#8C9094] max-w-md mx-auto leading-loose md:mt-8 md:text-sm"
        >
          من المطبخ إلى آخر شباك — كل تفصيل مدروس، وكل تنفيذ موقّع
        </motion.p>
      </div>

      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        style={{ flex: hovered === "kitchens" ? 0.6 : hovered === "aluminum" ? 0.4 : 0.5 }}
        className="relative overflow-hidden border-b border-[#3A3F44]/30 last:border-b-0 md:border-b-0 md:border-l last:md:border-l-0 transition-[flex] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer group"
        onMouseEnter={() => setHovered("kitchens")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => onNavigate("kitchens")}
      >
        <Image
          src={KITCHEN.hero}
          alt="مطابخ"
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="50vw"
          priority
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/70 to-[#0B0B0C]/40 backdrop-blur-[2px] transition-all duration-500 ${
            hovered === "kitchens"
              ? "bg-black/20 backdrop-blur-none"
              : "bg-black/40 backdrop-blur-[2px]"
          }`}
        />
        <div className="absolute bottom-6 right-6 z-10 text-right md:bottom-8 md:right-8">
          <h2 className="font-display font-black leading-none max-md:text-[clamp(40px,11vw,56px)] md:text-7xl lg:text-8xl">
            مطابخ
          </h2>
          <p className="mt-2 text-sm tracking-[1px] text-[#8C9094] md:text-xs">
            تُصمَّم على مزاجك
          </p>
          <div className="mt-2 h-[1px] w-0 bg-[#B08D57] transition-all duration-500 group-hover:w-full" />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.45 }}
        style={{ flex: hovered === "aluminum" ? 0.6 : hovered === "kitchens" ? 0.4 : 0.5 }}
        className="relative overflow-hidden border-t border-[#3A3F44]/30 md:border-t-0 md:border-r last:md:border-r-0 transition-[flex] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer group"
        onMouseEnter={() => setHovered("aluminum")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => onNavigate("aluminum")}
      >
        <Image
          src={al("IMG_0132.JPG")}
          alt="ألمنيوم"
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="50vw"
          priority
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/70 to-[#0B0B0C]/40 backdrop-blur-[2px] transition-all duration-500 ${
            hovered === "aluminum"
              ? "bg-black/20 backdrop-blur-none"
              : "bg-black/40 backdrop-blur-[2px]"
          }`}
        />
        <div className="absolute bottom-6 right-6 z-10 text-right md:bottom-8 md:right-8">
          <h2 className="font-display font-black leading-none max-md:text-[clamp(40px,11vw,56px)] md:text-7xl lg:text-8xl">
            ألمنيوم
          </h2>
          <p className="mt-2 text-sm tracking-[1px] text-[#8C9094] md:text-xs">
            يحمي ويُبهر بنفس اللحظة
          </p>
          <div className="mt-2 h-[1px] w-0 bg-[#B08D57] transition-all duration-500 group-hover:w-full" />
        </div>
      </motion.div>
    </div>
  );
}

function ShimmerLine() {
  return (
    <div className="absolute top-0 bottom-0 left-1/2 z-20 hidden w-[1px] -translate-x-1/2 overflow-hidden md:block">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3A3F44]/20 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B08D57]/60 to-transparent"
        animate={{ y: ["-100%", "100%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2,
        }}
      />
    </div>
  );
}

function Header({
  onBack,
  tag,
}: {
  onBack: () => void;
  tag: string;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-[#3A3F44]/20 bg-[#0B0B0C]/80 px-5 backdrop-blur-xl md:px-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#8C9094] transition-colors hover:text-[#F5F3EE]"
      >
        <ChevronRight className="h-4 w-4" />
        رجوع
      </button>
      <p className="text-[10px] tracking-[0.2em] text-[#B08D57]">{tag}</p>
      <div className="w-16" />
    </header>
  );
}

function ParallaxSection({
  src,
  className,
  children,
  priority = false,
}: {
  src: string;
  className?: string;
  children: React.ReactNode;
  priority?: boolean;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={priority}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/50 to-[#0B0B0C]/20" />
      <div className="absolute inset-0">{children}</div>
    </section>
  );
}

function GalleryGrid({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick?: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="group relative overflow-hidden cursor-pointer"
          onClick={() => onImageClick?.(i)}
        >
          <div className="relative h-64 w-full sm:h-72">
            <Image
              src={src}
              alt={`صورة ${i + 1}`}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <span className="pointer-events-none absolute bottom-3 left-3 text-[10px] tracking-[0.15em] text-white/40 transition-all duration-500 sm:text-white/0 sm:group-hover:text-white/70">
            {String(i + 1).padStart(2, "0")}
          </span>
        </motion.figure>
      ))}
    </div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
}: {
  images: string[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setCurrent((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-[#8C9094]">
        <span>
          {current + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrent((i) => (i - 1 + images.length) % images.length)
            }
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={() => setCurrent((i) => (i + 1) % images.length)}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full w-full max-h-[85vh] max-w-5xl"
      >
        <Image
          src={images[current]}
          alt={`صورة ${current + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "right" }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-l from-[#B08D57] to-[#B08D57]/50"
    />
  );
}

function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.35)] before:absolute before:inset-0 before:rounded-full before:animate-[whatsapp-pulse_2s_ease-in-out_infinite] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </motion.a>
  );
}

function KitchenPage({ onBack }: { onBack: () => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-dvh">
      <Header onBack={onBack} tag="مطابخ" />

      <section className="flex min-h-[80vh] flex-col md:flex-row">
        <div className="relative h-[50vh] md:h-auto md:w-[60%]">
          <Image
            src={KITCHEN.hero}
            alt=""
            fill
            className="object-cover"
            sizes="60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent md:bg-gradient-to-l" />
        </div>
        <div className="flex items-center bg-[#0B0B0C] px-6 py-16 md:w-[40%] md:px-10 md:py-0">
          <div className="max-w-sm">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 block text-[10px] tracking-[0.25em] text-[#B08D57]"
            >
              النصر | مطابخ
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl leading-[1.1] font-black md:text-5xl lg:text-6xl"
            >
              مطبخك ليس
              <br />
              مجرد مكان للطبخ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 text-sm leading-relaxed text-[#8C9094]"
            >
              هو المساحة التي تجمع بيتك كله
            </motion.p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-[10px] tracking-[0.2em] text-[#B08D57]"
        >
          معرض الأعمال
        </motion.h2>
        <GalleryGrid
          images={KITCHEN.gallery}
          onImageClick={(i) => setLightboxIndex(i)}
        />
      </section>

      <section className="bg-[#1A1A1C]/30">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B08D57]/20 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:gap-12">
            <div className="relative -mx-6 md:mx-0 md:sticky md:top-24 md:self-start md:w-[38%] md:h-[70vh] overflow-hidden">
              <div className="relative h-[40vh] md:h-full">
                <Image
                  src={KITCHEN.gallery[0]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 38vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent" />
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-6 text-[10px] tracking-[0.25em] text-[#B08D57] md:left-8"
              >
                لماذا النصر
              </motion.h2>
            </div>
            <div className="py-12 md:py-24 md:w-[58%]">
              {[
                {
                  title: "12 سنة، وكل مطبخ نفّذناه يحمل بصمتنا",
                  desc: "لا نكرر التصميم، نكرر الجودة",
                },
                {
                  title: "ضمان حقيقي على التنفيذ",
                  desc: "لأن ثقتك ليست شعاراً نكتبه ونمضي",
                },
                {
                  title: "بعد التسليم، احنا أقرب لك",
                  desc: "أي ملاحظة، أي تعديل، نحضر له",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex gap-4 md:gap-6">
                    <span className="font-[family-name:var(--font-numbers)] text-[10px] tracking-[0.15em] text-[#3A3F44] pt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-xl font-bold leading-tight md:text-2xl">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#8C9094] max-w-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {i < 2 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="h-[1px] w-full bg-gradient-to-r from-[#B08D57]/20 via-[#3A3F44]/30 to-transparent origin-right my-8 md:my-10"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B08D57]/15 to-transparent" />
      <FooterSection />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={KITCHEN.gallery}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AluminumPage({ onBack }: { onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allImages = ALUMINUM_CATEGORIES.flatMap((c) => c.images);
  const activeCategory = ALUMINUM_CATEGORIES.find(
    (c) => c.id === activeFilter,
  );
  const filteredImages =
    activeFilter === "all" ? allImages : activeCategory?.images || [];

  return (
    <div className="min-h-dvh">
      <Header onBack={onBack} tag="لأنظمة الألمنيوم" />

      <section className="flex min-h-[80vh] flex-col-reverse md:flex-row">
        <div className="flex items-center bg-[#0B0B0C] px-6 py-16 md:w-[40%] md:px-10 md:py-0">
          <div className="max-w-sm">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 block text-[10px] tracking-[0.25em] text-[#B08D57]"
            >
              النصر | لأنظمة الألمنيوم
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl leading-[1.1] font-black md:text-5xl lg:text-6xl"
            >
              الفخامة تبدأ
              <br />
              من{" "}
              <span className="text-[#B08D57]">اللمسة الأولى</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 text-sm leading-relaxed text-[#8C9094]"
            >
              أنظمة ألمنيوم متكاملة — شبابيك، واجهات، أبواب، محجرات درج، وسكاي
              لايت
            </motion.p>
          </div>
        </div>
        <div className="relative h-[50vh] md:h-auto md:w-[60%]">
          <Image
            src={al("IMG_0132.JPG")}
            alt=""
            fill
            className="object-cover"
            sizes="60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0B0C] md:bg-gradient-to-r" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
        <div className="flex items-center gap-x-0 overflow-x-auto whitespace-nowrap scrollbar-none text-sm text-[#8C9094] md:flex-wrap md:overflow-visible md:whitespace-normal">
          {(() => {
            const items = [
              { id: "all" as const, label: "الكل" },
              ...ALUMINUM_CATEGORIES.map((c) => ({
                id: c.id as string,
                label: c.label,
              })),
            ];
            return items.map((item, i) => (
              <span key={item.id} className="inline-flex items-center">
                {i > 0 && (
                  <span className="mx-2 text-[#3A3F44]/40 select-none">/</span>
                )}
                <button
                  onClick={() => setActiveFilter(item.id)}
                  className={`py-1.5 transition-all duration-300 ${
                    activeFilter === item.id
                      ? "text-[#F5F3EE] font-bold underline underline-offset-4 decoration-[#B08D57]"
                      : "text-[#8C9094] hover:text-[#B08D57]"
                  }`}
                >
                  {item.label}
                </button>
              </span>
            ));
          })()}
        </div>

        <AnimatePresence mode="wait">
          {activeFilter !== "all" && activeCategory && (
            <motion.p
              key={activeFilter}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-6 text-base font-display text-[#B08D57]"
            >
              {activeCategory.tagline}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <GalleryGrid
                images={filteredImages}
                onImageClick={(i) => {
                  const idx = allImages.indexOf(filteredImages[i]);
                  setLightboxIndex(idx);
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-[#1A1A1C]/30">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B08D57]/20 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:gap-12">
            <div className="relative -mx-6 md:mx-0 md:sticky md:top-24 md:self-start md:w-[38%] md:h-[70vh] overflow-hidden">
              <div className="relative h-[40vh] md:h-full">
                <Image
                  src={al("IMG_0131.JPG")}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 38vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent" />
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-6 text-[10px] tracking-[0.25em] text-[#B08D57] md:left-8"
              >
                لماذا النصر
              </motion.h2>
            </div>
            <div className="py-12 md:py-24 md:w-[58%]">
              {[
                {
                  title: "أكثر من 12 سنة في سوق الألمنيوم",
                  desc: "خبرة تظهر في كل تفصيلة، من التصنيع إلى التركيب",
                },
                {
                  title: "ضمان يمتد معك حتى بعد التركيب",
                  desc: "لأن المنتج الجيد يثبت نفسه، ونحن نثبت وجودنا معك",
                },
                {
                  title: "فريق متخصص بكل أنواع الأنظمة",
                  desc: "سحب، تيلت، فولدينق، كيوينق — نوفر لك الحل المناسب",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex gap-4 md:gap-6">
                    <span className="font-[family-name:var(--font-numbers)] text-[10px] tracking-[0.15em] text-[#3A3F44] pt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-xl font-bold leading-tight md:text-2xl">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#8C9094] max-w-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {i < 2 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="h-[1px] w-full bg-gradient-to-r from-[#B08D57]/20 via-[#3A3F44]/30 to-transparent origin-right my-8 md:my-10"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B08D57]/15 to-transparent" />
      <FooterSection />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={allImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function WindowFrameSVG() {
  return (
    <svg width="600" height="480" viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="598" height="478" stroke="currentColor" strokeWidth="0.5" />
      <rect x="50" y="40" width="500" height="400" stroke="currentColor" strokeWidth="0.3" />
      <line x1="300" y1="40" x2="300" y2="440" stroke="currentColor" strokeWidth="0.3" />
      <line x1="50" y1="240" x2="550" y2="240" stroke="currentColor" strokeWidth="0.3" />
      <rect x="50" y="40" width="250" height="200" stroke="currentColor" strokeWidth="0.15" />
      <rect x="300" y="40" width="250" height="200" stroke="currentColor" strokeWidth="0.15" />
      <rect x="50" y="240" width="250" height="200" stroke="currentColor" strokeWidth="0.15" />
      <rect x="300" y="240" width="250" height="200" stroke="currentColor" strokeWidth="0.15" />
      <line x1="50" y1="120" x2="50" y2="200" stroke="currentColor" strokeWidth="0.4" />
      <line x1="550" y1="120" x2="550" y2="200" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

function FooterSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] text-[#F5F3EE]">
        <WindowFrameSVG />
      </div>
      <div className="relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="font-display font-black leading-[1.1] tracking-tight max-md:text-[clamp(36px,10vw,56px)] md:text-6xl lg:text-7xl"
        >
          جاهزون
          <br />
          نسمع فكرتك
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="mt-12 space-y-2 text-xs tracking-[0.15em] text-[#8C9094] leading-loose md:text-sm"
        >
          <p>حي الجامعة — مقابل مجمع الايادي، بغداد</p>
          <p>
            واتساب:{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F3EE] transition-colors hover:text-[#B08D57]"
            >
              077418884444
            </a>
          </p>
        </motion.div>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="group mt-10 inline-flex items-center gap-3 text-sm font-bold transition-colors hover:text-[#B08D57]"
        >
          احجز استشارتك المجانية
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span className="h-[1px] w-0 bg-[#B08D57] transition-all duration-500 group-hover:w-16" />
        </motion.a>

        <div className="mt-12 pt-8">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B08D57]/20 to-transparent mb-8" />
          <p className="text-[10px] tracking-[0.1em] text-[#3A3F44]">
            © {new Date().getFullYear()} النصر للمطابخ والألمنيوم والديكور
          </p>
        </div>
      </div>
    </section>
  );
}
