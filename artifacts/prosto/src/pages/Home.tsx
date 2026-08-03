import React, { useEffect, useRef, useState } from 'react';
import {
  motion, useScroll, useTransform, AnimatePresence,
  useInView, useMotionValue, useSpring, LayoutGroup,
} from 'framer-motion';
import {
  MapPin, Phone, Instagram, Facebook, Menu, X,
  ArrowLeft, ExternalLink, Code2,
} from 'lucide-react';
import Stack from '@/components/Stack';
import MapSection from '@/components/MapSection';
import CustomCursor from '@/components/CustomCursor';
import ReadingProgress from '@/components/ReadingProgress';
import FloatingSidebar from '@/components/FloatingSidebar';
import TypewriterText from '@/components/TypewriterText';
import BehindScenes from '@/components/BehindScenes';
import WavyDivider from '@/components/WavyDivider';
import { HeartIcon, StarIcon, FlameIcon } from '@/components/AnimatedIcons';

// ─── Images ─────────────────────────────────────────────────────────────────
import logoImg  from "@assets/prosto_restaurant.2026_20260802_103738_853_1785659367070.jpg";
import img1     from "@assets/prosto_restaurant.2026_20260802_111407_667_1785659366905.jpg";
import img2     from "@assets/mazen_al.nezaa__official_20260802_111404_406_1785659366913.jpg";
import img3     from "@assets/mazen_al.nezaa__official_20260802_111404_196_1785659366919.jpg";
import img4     from "@assets/mazen_al.nezaa__official_20260802_111346_510_1785659366927.jpg";
import img5     from "@assets/prosto_restaurant.2026_20260802_111339_336_1785659366934.jpg";
import img6     from "@assets/prosto_restaurant.2026_20260802_111339_035_1785659366941.jpg";
import img7     from "@assets/prosto_restaurant.2026_20260802_111334_297_1785659366951.jpg";
import img8     from "@assets/prosto_restaurant.2026_20260802_111327_237_1785659366960.jpg";
import img9     from "@assets/prosto_restaurant.2026_20260802_111326_721_1785659366968.jpg";
import img10    from "@assets/prosto_restaurant.2026_20260802_111325_014_1785659366981.jpg";
import img11    from "@assets/prosto_restaurant.2026_20260802_111323_925_1785659366987.jpg";
import img12    from "@assets/prosto_restaurant.2026_20260802_111323_212_1785659366994.jpg";
import img14    from "@assets/prosto_restaurant.2026_20260802_111320_214_1785659367045.jpg";
import img15    from "@assets/prosto_restaurant.2026_20260802_111318_848_1785659367054.jpg";
import img18    from "@assets/prosto_restaurant.2026_20260802_111413_509_1785659366896.jpg";

// ─── Constants ───────────────────────────────────────────────────────────────
const PHONE_NUMBER = "0996006263";

const navLinks = [
  { name: "الرئيسية", href: "#hero" },
  { name: "قصتنا",    href: "#about" },
  { name: "المنيو",   href: "#menu" },
  { name: "المعرض",   href: "#gallery" },
  { name: "موقعنا",   href: "#location" },
];

const menuItems = [
  { id: 1, name: "برغر",              enName: "Burger",              img: img3  },
  { id: 2, name: "دبابيس دجاج مقرمشة", enName: "Crispy Chicken Skewers", img: img4  },
  { id: 3, name: "بيتزا",             enName: "Pizza",               img: img7  },
  { id: 4, name: "فاهيتا",            enName: "Fajita",              img: img8  },
  { id: 5, name: "كوردون بلو",        enName: "Cordon Bleu",         img: img10 },
  { id: 6, name: "شاورما",            enName: "Shawarma",            img: img12 },
];

type GalleryFilter = 'all' | 'burger' | 'chicken' | 'pizza';

const galleryItems: { src: string; label: string; category: GalleryFilter }[] = [
  { src: img5,  label: "أجواء مميزة",  category: "all"     },
  { src: img3,  label: "برغر بروستو",  category: "burger"  },
  { src: img4,  label: "دجاج مقرمش",   category: "chicken" },
  { src: img6,  label: "طعم لا يُنسى", category: "all"     },
  { src: img7,  label: "بيتزا بروستو", category: "pizza"   },
  { src: img9,  label: "جودة عالية",   category: "all"     },
  { src: img18, label: "شهية مفتوحة",  category: "chicken" },
  { src: img8,  label: "قرمشة ذهبية",  category: "burger"  },
  { src: img11, label: "وصفات سرية",   category: "all"     },
  { src: img15, label: "نكهة فريدة",   category: "pizza"   },
  { src: img14, label: "مكونات طازجة", category: "all"     },
  { src: img10, label: "كوردون بلو",   category: "chicken" },
  { src: img2,  label: "تشكيلة رائعة", category: "chicken" },
  { src: img1,  label: "طبق خاص",      category: "all"     },
  { src: img12, label: "شاورما حارة",  category: "chicken" },
];

const filterLabels: Record<GalleryFilter, string> = {
  all:     "كل شيء",
  burger:  "برغر 🍔",
  chicken: "دجاج 🍗",
  pizza:   "بيتزا 🍕",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function AnimatedSection({ children, className = "", delay = 0, style }: {
  children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

function useMagnet(strength = 30) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25 });
  const sy = useSpring(y, { stiffness: 300, damping: 25 });
  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width  / 2) * (strength / 100));
    y.set((e.clientY - rect.top  - rect.height / 2) * (strength / 100));
  };
  const handleLeave = () => { x.set(0); y.set(0); };
  return { sx, sy, handleMove, handleLeave };
}

/** Per-section parallax background image */
function ParallaxBg({ src, speed = 60, opacity = 0.35 }: {
  src: string; speed?: number; opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  return (
    <motion.div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.img src={src} alt="" className="absolute inset-0 w-full h-full object-cover"
        style={{ y, opacity, scale: 1.2 }}
      />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all');

  const { scrollY } = useScroll();

  // Scroll listener
  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
      setNavVisible(latest < lastScrollY || latest < 100);
      setLastScrollY(latest);
    });
    return unsub;
  }, [scrollY, lastScrollY]);

  // Hero parallax
  const heroY       = useTransform(scrollY, [0, 900],  [0, 260]);
  const heroOpacity = useTransform(scrollY, [0, 700],  [1, 0]);
  const heroScale   = useTransform(scrollY, [0, 700],  [1, 1.1]);

  const ctaMagnet = useMagnet(40);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show:   { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 20 } },
  };

  const filtered = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(g => g.category === galleryFilter);

  return (
    <div className="bg-background text-foreground min-h-[100dvh] overflow-x-hidden selection:bg-primary selection:text-black font-sans">

      {/* ─── Global overlays ─── */}
      <CustomCursor />
      <ReadingProgress />
      <FloatingSidebar />

      {/* ─── NAVBAR ─── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/85 backdrop-blur-2xl border-b border-border/40 shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -80 }}
        animate={{ y: navVisible ? 0 : -80 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <motion.div
              className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/40 group-hover:ring-primary transition-all shadow-[0_0_15px_rgba(245,200,0,0.25)]"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <img src={logoImg} alt="Prosto" className="w-full h-full object-cover" />
            </motion.div>
            <span className="text-xl font-black tracking-tight text-primary hidden sm:block">PROSTO</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 font-medium">
            {navLinks.map((link, i) => (
              <motion.a key={link.name} href={link.href}
                className="text-foreground/65 hover:text-primary transition-colors text-base relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center rounded-full" />
              </motion.a>
            ))}

            <motion.a href={`tel:${PHONE_NUMBER}`}
              className="bg-primary text-black px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(245,200,0,0.35)] hover:shadow-[0_0_40px_rgba(245,200,0,0.6)] transition-all text-sm"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              اطلب الآن
            </motion.a>
          </div>

          <button className="md:hidden text-foreground p-1" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-[100] bg-background/97 backdrop-blur-3xl flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/40">
                <img src={logoImg} alt="Prosto" className="w-full h-full object-cover" />
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-foreground p-2">
                <X size={32} />
              </button>
            </div>
            <motion.div className="flex flex-col gap-8 items-start text-3xl font-bold"
              initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              {navLinks.map(link => (
                <motion.a key={link.name} href={link.href}
                  variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="mt-2 w-full h-[1px] bg-border/50" />
              <motion.a href={`tel:${PHONE_NUMBER}`}
                variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } }}
                className="text-primary flex items-center gap-4 mt-2"
              >
                <Phone />
                {PHONE_NUMBER}
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          {/* Day/Night overlays */}
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/55 to-background/20"
            animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
          />
          <motion.div className="absolute inset-0 z-10 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
          <motion.img
            src={img1} alt="Prosto Food"
            className="w-full h-full object-cover"
            style={{ scale: heroScale, opacity: 0.42 }}
          />
        </motion.div>

        {/* Golden particles */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: 3 + (i % 5),
                height: 3 + (i % 5),
                left: `${(i * 4.1) % 100}%`,
                boxShadow: "0 0 8px rgba(245,200,0,0.7)",
                opacity: 0.9,
              }}
              initial={{ y: "110vh", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: 6 + (i % 8),
                repeat: Infinity,
                delay: (i * 0.35) % 8,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-6 pt-24">
          <motion.div
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            variants={staggerContainer} initial="hidden" animate="show"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(245,200,0,0.15)] backdrop-blur-md">
                التجربة الأقوى في دير الزور
              </span>
            </motion.div>

            {/* Animated logo */}
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.5, rotate: -10 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 120, damping: 18 } } }}
              className="mb-8"
              whileHover={{ scale: 1.05, rotate: 3 }}
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-primary/50 shadow-[0_0_60px_rgba(245,200,0,0.4)]">
                <img src={logoImg} alt="Prosto Logo" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-7xl md:text-9xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-primary via-yellow-400 to-amber-600 drop-shadow-[0_0_40px_rgba(245,200,0,0.4)] tracking-tighter leading-none font-display"
            >
              PROSTO
            </motion.h1>
            <motion.h2 variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-foreground mb-6 drop-shadow-xl font-display"
            >
              بروستو
            </motion.h2>

            {/* Typewriter slogan */}
            <motion.p variants={fadeUp}
              className="text-xl md:text-3xl text-foreground/80 font-medium mb-12 max-w-xl min-h-[2em]"
            >
              <TypewriterText text="لأن الجوع إلو بروستو!" delay={1.2} speed={80} />
            </motion.p>

            <motion.div variants={fadeUp}>
              <motion.a href={`tel:${PHONE_NUMBER}`}
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-black px-12 py-5 rounded-full font-black text-xl md:text-2xl overflow-hidden shadow-[0_0_50px_rgba(245,200,0,0.45)] hover:shadow-[0_0_80px_rgba(245,200,0,0.7)] transition-shadow"
                style={{ x: ctaMagnet.sx, y: ctaMagnet.sy }}
                onMouseMove={ctaMagnet.handleMove}
                onMouseLeave={ctaMagnet.handleLeave}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              >
                <motion.div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                <Phone className="w-6 h-6 relative z-10 animate-pulse" />
                <span className="relative z-10">اطلب الآن / Order Now</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-primary/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        </motion.div>
      </section>

      {/* ─── STACK SHOWCASE ─── */}
      <section className="py-32 relative overflow-hidden min-h-[100dvh] flex items-center">
        {/* Subtle parallax bg */}
        <ParallaxBg src={img6} speed={40} opacity={0.06} />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,200,0,0.07) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container px-6 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
            <AnimatedSection className="max-w-xl text-center lg:text-right" delay={0}>
              <div className="flex items-center gap-2 justify-center lg:justify-end mb-4">
                <FlameIcon size={26} />
                <span className="text-primary text-sm font-bold tracking-widest uppercase">نكهات لا تُقاوَم</span>
              </div>
              <motion.h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight font-display">
                أكثر من وجبة —{" "}
                <motion.span className="text-primary inline-block"
                  animate={{ textShadow: ["0 0 20px rgba(245,200,0,0.4)", "0 0 50px rgba(245,200,0,0.8)", "0 0 20px rgba(245,200,0,0.4)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  تجربة
                </motion.span>
              </motion.h3>
              <p className="text-lg text-foreground/60 leading-relaxed">
                نحن لا نقدم الطعام فقط، بل نقدم تجربة فريدة تداعب الحواس. دجاج مقرمش ذهبي، برغر مليء بالعصارة، وشاورما محضرة بشغف.
              </p>
            </AnimatedSection>

            <motion.div
              initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.1 }}
              className="w-full max-w-[360px] h-[460px]"
            >
              <Stack randomRotation sensitivity={180} sendToBackOnClick autoplay autoplayDelay={2200} pauseOnHover
                cards={[
                  <img key="1" src={img1} alt="Platter" className="w-full h-full object-cover pointer-events-none" />,
                  <img key="2" src={img2} alt="Shawarma" className="w-full h-full object-cover pointer-events-none" />,
                  <img key="3" src={img3} alt="Burger" className="w-full h-full object-cover pointer-events-none" />,
                  <img key="4" src={img4} alt="Crispy Chicken" className="w-full h-full object-cover pointer-events-none" />,
                ]}
              />
              <motion.p className="text-center mt-5 text-foreground/35 text-sm flex items-center justify-center gap-2"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <ArrowLeft className="w-4 h-4" />
                اسحب البطاقة لتكتشف المزيد
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 relative overflow-hidden min-h-[100dvh] flex items-center">
        {/* Parallax bg for this section */}
        <ParallaxBg src={img9} speed={50} opacity={0.05} />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.015] to-transparent pointer-events-none" />

        {/* Giant Arabic watermark — behind all content */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="text-[20vw] font-black font-display leading-none text-foreground/[0.035] whitespace-nowrap"
            style={{ letterSpacing: '-0.02em' }}
          >
            بروستو
          </span>
        </div>

        <div className="container px-6 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <AnimatedSection className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl" delay={0}>
              <img src={img5} alt="Prosto Restaurant" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              <motion.div className="absolute bottom-8 left-8 right-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <HeartIcon size={22} />
                  <p className="text-primary font-bold text-xl drop-shadow-md">أجواء مميزة</p>
                </div>
                <p className="text-foreground/75 text-sm mt-1">مكان يجمع العائلة والأصدقاء</p>
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-3xl border border-primary/20 pointer-events-none"
                animate={{ borderColor: ["rgba(245,200,0,0.15)", "rgba(245,200,0,0.4)", "rgba(245,200,0,0.15)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </AnimatedSection>

            <AnimatedSection
              className="p-8 md:p-12 rounded-3xl border border-primary/15 relative overflow-hidden"
              delay={0.15}
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <motion.div
                className="absolute top-0 right-0 w-40 h-40 blur-[70px] rounded-full pointer-events-none"
                animate={{ background: ["rgba(245,200,0,0.08)", "rgba(245,200,0,0.18)", "rgba(245,200,0,0.08)"] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 font-display">
                قصتنا تبدأ من <span className="text-primary">الجودة</span>
              </h2>
              <p className="text-foreground/60 text-lg leading-relaxed mb-5 relative z-10">
                في بروستو، نؤمن بأن الوجبة السريعة لا يجب أن تكون عادية. نحن نختار مكوناتنا بعناية فائقة، من الدجاج الطازج إلى الخضروات اليومية.
              </p>
              <p className="text-foreground/60 text-lg leading-relaxed mb-8 relative z-10">
                مزيجنا السري من البهارات وطريقة التحضير الفريدة تجعل من بروستو الوجهة الأولى لعشاق الطعام في المدينة.
              </p>
              <motion.div className="flex items-center gap-3 text-foreground/75 font-medium relative z-10"
                whileHover={{ x: -4 }} transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="text-primary w-5 h-5 shrink-0" />
                <span>سوريا - دير الزور - شارع سينما فؤاد - جانب مركز الرشيد</span>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── MENU HIGHLIGHTS (Glassmorphism cards) ─── */}
      <section id="menu" className="py-32 relative overflow-hidden min-h-[100dvh] flex items-center">
        <ParallaxBg src={img11} speed={45} opacity={0.06} />

        <div className="container px-6 mx-auto relative z-10">
          <AnimatedSection className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <StarIcon size={28} />
              <h2 className="text-4xl md:text-6xl font-black font-display">
                أبطال <span className="text-primary">المنيو</span>
              </h2>
              <StarIcon size={28} />
            </div>
            <p className="text-xl text-foreground/45">أطباقنا الأكثر طلباً والأشد قرمشة</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 90, damping: 18 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-none"
                style={{
                  border: '1px solid rgba(245,200,0,0.12)',
                  boxShadow: '0 4px 40px rgba(0,0,0,0.35)',
                  background: 'rgb(8,6,3)',
                }}
              >
                {/* Image */}
                <img src={item.img} alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                {/* Glassmorphic info panel */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6"
                  style={{
                    background: 'rgba(0,0,0,0.75)',
                    borderTop: '1px solid rgba(245,200,0,0.18)',
                  }}
                >
                  <motion.div className="w-10 h-[3px] bg-primary mb-3 rounded-full"
                    initial={{ scaleX: 0, originX: 1 }}
                    whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                  />
                  <h3 className="text-2xl font-black text-white mb-1 group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-white/55 font-medium tracking-wider text-sm">{item.enName}</p>
                </div>

              </motion.div>
            ))}
          </div>

          <AnimatedSection className="mt-16 text-center" delay={0.2}>
            <motion.a href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-primary/30 text-primary hover:bg-primary hover:text-black rounded-full font-bold transition-all duration-300"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(245,200,0,0.3)" }}
              whileTap={{ scale: 0.96 }}
            >
              <Phone className="w-4 h-4" />
              اطلب المنيو كامل الآن
            </motion.a>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── GALLERY (with filter + reorder) ─── */}
      <section id="gallery" className="py-24 relative overflow-hidden min-h-[100dvh] flex items-center">
        <ParallaxBg src={img14} speed={35} opacity={0.05} />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ background: [
            "radial-gradient(ellipse at 20% 50%, rgba(245,200,0,0.05) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 50%, rgba(245,200,0,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, rgba(245,200,0,0.05) 0%, transparent 60%)",
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container px-6 mx-auto relative z-10">
          {/* Header */}
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block px-5 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs tracking-widest uppercase mb-5 backdrop-blur-sm">
              معرض الصور
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-3 font-display">
              لحظات من <span className="text-primary">بروستو</span>
            </h2>
            <p className="text-foreground/40 text-lg">كل صورة تحكي نكهة</p>
          </AnimatedSection>

          {/* Filter buttons */}
          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-10" delay={0.1}>
            {(Object.keys(filterLabels) as GalleryFilter[]).map(key => (
              <motion.button key={key}
                onClick={() => setGalleryFilter(key)}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 border ${
                  galleryFilter === key
                    ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(245,200,0,0.4)]'
                    : 'bg-transparent text-foreground/60 border-foreground/20 hover:border-primary/50 hover:text-primary'
                }`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                {filterLabels[key]}
              </motion.button>
            ))}
          </AnimatedSection>

          {/* Filtered grid with layout animation */}
          <LayoutGroup>
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <motion.div key={item.src + item.label}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28, delay: i * 0.03 }}
                    className="group relative rounded-2xl overflow-hidden aspect-square cursor-none"
                    whileHover={{ scale: 1.04, zIndex: 20 }}
                  >
                    <img src={item.src} alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <motion.div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-400 mix-blend-overlay" />
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/40 transition-colors duration-300 pointer-events-none" />

                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-[2px] bg-primary rounded-full" />
                        <span className="text-white text-xs font-bold drop-shadow-lg">{item.label}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>

      {/* ─── BEHIND THE SCENES ─── */}
      <BehindScenes />

      {/* ─── DELIVERY CTA ─── */}
      <section className="relative py-32 overflow-hidden border-y border-primary/15 min-h-[100dvh] flex items-center">
        <ParallaxBg src={img18} speed={50} opacity={0.08} />

        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{ background: [
            "radial-gradient(ellipse at 50% 50%, rgba(245,200,0,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse at 50% 50%, rgba(245,200,0,0.16) 0%, transparent 70%)",
            "radial-gradient(ellipse at 50% 50%, rgba(245,200,0,0.08) 0%, transparent 70%)",
          ]}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative z-10 px-6 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
          >
            <motion.h2 className="text-5xl md:text-7xl font-black mb-4 text-foreground"
              animate={{ textShadow: ["0 0 20px rgba(245,200,0,0)", "0 0 30px rgba(245,200,0,0.2)", "0 0 20px rgba(245,200,0,0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              توصيل سريع
            </motion.h2>
            <p className="text-xl md:text-2xl text-primary font-medium mb-10">لباب بيتك، ساخن ومقرمش كما تحب!</p>

            <motion.a href={`tel:${PHONE_NUMBER}`}
              className="group flex flex-col md:flex-row items-center justify-center gap-6 border border-foreground/10 hover:border-primary/40 backdrop-blur-xl p-8 rounded-3xl transition-all duration-400"
              style={{ background: 'rgba(255,255,255,0.04)' }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(245,200,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div className="bg-primary/20 p-4 rounded-full"
                animate={{ boxShadow: ["0 0 0px rgba(245,200,0,0.3)", "0 0 25px rgba(245,200,0,0.6)", "0 0 0px rgba(245,200,0,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Phone className="w-10 h-10 text-primary" />
              </motion.div>
              <div className="text-center md:text-right">
                <p className="text-foreground/40 text-sm mb-1">اتصل الآن للطلب</p>
                <p className="text-4xl md:text-5xl font-black text-foreground tracking-wider font-mono" dir="ltr">
                  {PHONE_NUMBER}
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <MapSection />

      {/* ─── WAVY DIVIDER ─── */}
      <WavyDivider flip className="-mt-1" />

      {/* ─── FOOTER ─── */}
      <footer className="bg-background pt-16 pb-10">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

            {/* Brand */}
            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <motion.div
                className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/30 mb-4 shadow-[0_0_20px_rgba(245,200,0,0.2)]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={logoImg} alt="Prosto Logo" className="w-full h-full object-cover" />
              </motion.div>
              <span className="text-2xl font-black text-primary mb-3 block">PROSTO | بروستو</span>
              <p className="text-foreground/45 mb-6 max-w-xs text-sm leading-relaxed">
                لأن الجوع إلو بروستو! أفضل تجربة طعام سريع في دير الزور.
              </p>
              <div className="flex gap-3">
                {[
                  { href: "https://instagram.com/prosto_restaurant.2026", icon: <Instagram size={18} /> },
                  { href: "https://www.facebook.com/share/1CiMzSXhdU/", icon: <Facebook size={18} /> },
                ].map((s, i) => (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                    whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <h4 className="text-lg font-bold text-foreground mb-5">روابط سريعة</h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link, i) => (
                  <motion.li key={link.name} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                    <a href={link.href} className="text-foreground/45 hover:text-primary transition-colors text-sm">{link.name}</a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <h4 className="text-lg font-bold text-foreground mb-5">تواصل معنا</h4>
              <ul className="flex flex-col gap-4 text-foreground/45 text-sm">
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <MapPin className="text-primary w-4 h-4 shrink-0 mt-0.5" />
                  <span>سوريا - دير الزور - شارع سينما فؤاد - جانب مركز الرشيد</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="text-primary w-4 h-4 shrink-0" />
                  <a href={`tel:${PHONE_NUMBER}`} className="hover:text-primary transition-colors" dir="ltr">{PHONE_NUMBER}</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-foreground/8 pt-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-foreground/20 text-[11px]">
              &copy; {new Date().getFullYear()} PROSTO Restaurant. All rights reserved.
            </p>
            <a href="https://Needaa.netlify.app" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(245,200,0,0.35)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              <Code2 className="w-3 h-3 text-primary/70 shrink-0" />
              <span className="text-foreground/35 text-[11px]">تصميم وبرمجة</span>
              <span className="w-px h-3 bg-foreground/10" />
              <span className="text-foreground/65 text-[11px] font-medium group-hover:text-primary transition-colors duration-200">نداء الرحمن</span>
              <ExternalLink className="w-2.5 h-2.5 text-foreground/20 group-hover:text-primary/60 transition-colors shrink-0" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
