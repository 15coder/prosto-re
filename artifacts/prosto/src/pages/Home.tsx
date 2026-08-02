import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { MapPin, Phone, Instagram, Facebook, Menu, X, ArrowLeft, ExternalLink, Code2 } from 'lucide-react';
import Stack from '@/components/Stack';

// Images
import logoImg from "@assets/prosto_restaurant.2026_20260802_103738_853_1785659367070.jpg";
import img1 from "@assets/prosto_restaurant.2026_20260802_111407_667_1785659366905.jpg";
import img2 from "@assets/mazen_al.nezaa__official_20260802_111404_406_1785659366913.jpg";
import img3 from "@assets/mazen_al.nezaa__official_20260802_111404_196_1785659366919.jpg";
import img4 from "@assets/mazen_al.nezaa__official_20260802_111346_510_1785659366927.jpg";
import img5 from "@assets/prosto_restaurant.2026_20260802_111339_336_1785659366934.jpg";
import img6 from "@assets/prosto_restaurant.2026_20260802_111339_035_1785659366941.jpg";
import img7 from "@assets/prosto_restaurant.2026_20260802_111334_297_1785659366951.jpg";
import img8 from "@assets/prosto_restaurant.2026_20260802_111327_237_1785659366960.jpg";
import img9 from "@assets/prosto_restaurant.2026_20260802_111326_721_1785659366968.jpg";
import img10 from "@assets/prosto_restaurant.2026_20260802_111325_014_1785659366981.jpg";
import img11 from "@assets/prosto_restaurant.2026_20260802_111323_925_1785659366987.jpg";
import img12 from "@assets/prosto_restaurant.2026_20260802_111323_212_1785659366994.jpg";
import img14 from "@assets/prosto_restaurant.2026_20260802_111320_214_1785659367045.jpg";
import img15 from "@assets/prosto_restaurant.2026_20260802_111318_848_1785659367054.jpg";
import img18 from "@assets/prosto_restaurant.2026_20260802_111413_509_1785659366896.jpg";

const PHONE_NUMBER = "0996006263";

const navLinks = [
  { name: "الرئيسية", href: "#hero" },
  { name: "قصتنا", href: "#about" },
  { name: "المنيو", href: "#menu" },
  { name: "المعرض", href: "#gallery" },
];

// Reusable animated section wrapper
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

// Magnetic button hook
function useMagnet(strength = 30) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25 });
  const sy = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * (strength / 100));
    y.set((e.clientY - cy) * (strength / 100));
  };
  const handleLeave = () => { x.set(0); y.set(0); };
  return { sx, sy, handleMove, handleLeave };
}

export default function Home() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
      setNavVisible(latest < lastScrollY || latest < 100);
      setLastScrollY(latest);
    });
    return unsub;
  }, [scrollY, lastScrollY]);

  const heroY = useTransform(scrollY, [0, 1000], [0, 280]);
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.08]);

  const ctaMagnet = useMagnet(40);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 20 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };

  const menuItems = [
    { id: 1, name: "برغر", enName: "Burger", img: img3 },
    { id: 2, name: "دبابيس دجاج مقرمشة", enName: "Crispy Chicken Skewers", img: img4 },
    { id: 3, name: "بيتزا", enName: "Pizza", img: img7 },
    { id: 4, name: "بطاطس ذهبية", enName: "Golden Fries", img: img8 },
    { id: 5, name: "سلطة طازجة", enName: "Fresh Salad", img: img10 },
    { id: 6, name: "شاورما", enName: "Shawarma", img: img12 },
  ];

  return (
    <div className="bg-background text-foreground min-h-[100dvh] overflow-x-hidden selection:bg-primary selection:text-black font-sans">

      {/* ─── NAVBAR ─── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/80 backdrop-blur-2xl border-b border-border/40 shadow-2xl py-3" : "bg-transparent py-5"
        }`}
        initial={{ y: -80 }}
        animate={{ y: navVisible ? 0 : -80 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo in navbar */}
          <a href="#hero" className="flex items-center gap-3 group">
            <motion.div
              className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/40 group-hover:ring-primary transition-all duration-300 shadow-[0_0_15px_rgba(245,200,0,0.25)]"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <img src={logoImg} alt="Prosto Logo" className="w-full h-full object-cover" />
            </motion.div>
            <span className="text-xl font-black tracking-tight text-primary hidden sm:block">PROSTO</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-primary transition-colors text-base relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center rounded-full" />
              </motion.a>
            ))}
            <motion.a
              href={`tel:${PHONE_NUMBER}`}
              className="bg-primary text-black px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(245,200,0,0.35)] hover:shadow-[0_0_40px_rgba(245,200,0,0.6)] transition-all hover:scale-105 active:scale-95 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              اطلب الآن
            </motion.a>
          </div>

          <button className="md:hidden text-white p-1" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-[100] bg-background/96 backdrop-blur-3xl flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/40">
                <img src={logoImg} alt="Prosto Logo" className="w-full h-full object-cover" />
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white p-2">
                <X size={32} />
              </button>
            </div>
            <motion.div
              className="flex flex-col gap-8 items-start text-3xl font-bold"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="mt-4 w-full h-[1px] bg-border/50" />
              <motion.a
                href={`tel:${PHONE_NUMBER}`}
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
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <motion.div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/55 to-background/20" />
          <motion.div className="absolute inset-0 z-10 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
          <motion.img
            src={img1}
            alt="Prosto Food"
            className="w-full h-full object-cover opacity-45"
            style={{ scale: heroScale }}
          />
        </motion.div>

        {/* Floating golden particles */}
        <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: 3 + Math.random() * 6,
                height: 3 + Math.random() * 6,
                left: `${Math.random() * 100}%`,
                boxShadow: "0 0 8px rgba(245,200,0,0.7)",
              }}
              initial={{ y: "110vh", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-6 pt-24">
          <motion.div
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(245,200,0,0.15)] backdrop-blur-md">
                التجربة الأقوى في دير الزور
              </span>
            </motion.div>

            {/* Animated logo in hero */}
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.5, rotate: -10 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 120, damping: 18 } } }}
              className="mb-8"
              whileHover={{ scale: 1.05, rotate: 3 }}
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-primary/50 shadow-[0_0_60px_rgba(245,200,0,0.4)]">
                <img src={logoImg} alt="Prosto Logo" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-7xl md:text-9xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-primary via-yellow-400 to-amber-600 drop-shadow-[0_0_40px_rgba(245,200,0,0.4)] tracking-tighter leading-none"
            >
              PROSTO
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl"
            >
              بروستو
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-3xl text-white/85 font-medium mb-12 max-w-xl"
            >
              لأن الجوع إلو بروستو!
            </motion.p>

            <motion.div variants={fadeUp}>
              <motion.a
                href={`tel:${PHONE_NUMBER}`}
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-black px-12 py-5 rounded-full font-black text-xl md:text-2xl overflow-hidden shadow-[0_0_50px_rgba(245,200,0,0.45)] hover:shadow-[0_0_80px_rgba(245,200,0,0.7)] transition-shadow"
                style={{ x: ctaMagnet.sx, y: ctaMagnet.sy }}
                onMouseMove={ctaMagnet.handleMove}
                onMouseLeave={ctaMagnet.handleLeave}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
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
      <section className="py-32 relative overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,200,0,0.07) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">

            <AnimatedSection className="max-w-xl text-center lg:text-right" delay={0}>
              <motion.h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                أكثر من وجبة —{" "}
                <motion.span
                  className="text-primary inline-block"
                  animate={{ textShadow: ["0 0 20px rgba(245,200,0,0.4)", "0 0 50px rgba(245,200,0,0.8)", "0 0 20px rgba(245,200,0,0.4)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  تجربة
                </motion.span>
                <br />
              </motion.h3>
              <p className="text-lg text-white/65 leading-relaxed">
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
              <Stack
                randomRotation
                sensitivity={180}
                sendToBackOnClick
                autoplay
                autoplayDelay={2200}
                pauseOnHover
                cards={[
                  <img key="1" src={img1} alt="Platter" className="w-full h-full object-cover pointer-events-none" />,
                  <img key="2" src={img2} alt="Shawarma" className="w-full h-full object-cover pointer-events-none" />,
                  <img key="3" src={img3} alt="Burger" className="w-full h-full object-cover pointer-events-none" />,
                  <img key="4" src={img4} alt="Crispy Chicken" className="w-full h-full object-cover pointer-events-none" />,
                ]}
              />
              <motion.p
                className="text-center mt-5 text-white/40 text-sm flex items-center justify-center gap-2"
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
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Use interior/ambiance photos here — NOT the logo */}
            <AnimatedSection className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl" delay={0}>
              <img src={img5} alt="Prosto Restaurant" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              <motion.div
                className="absolute bottom-8 left-8 right-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-primary font-bold text-xl drop-shadow-md">أجواء مميزة</p>
                <p className="text-white/85 text-sm mt-1">مكان يجمع العائلة والأصدقاء</p>
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
              style={{ background: "rgba(255,255,255,0.02)" } as React.CSSProperties}
            >
              <motion.div
                className="absolute top-0 right-0 w-40 h-40 blur-[70px] rounded-full pointer-events-none"
                animate={{ background: ["rgba(245,200,0,0.08)", "rgba(245,200,0,0.18)", "rgba(245,200,0,0.08)"] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">
                قصتنا تبدأ من <span className="text-primary">الجودة</span>
              </h2>
              <p className="text-white/65 text-lg leading-relaxed mb-5 relative z-10">
                في بروستو، نؤمن بأن الوجبة السريعة لا يجب أن تكون عادية. نحن نختار مكوناتنا بعناية فائقة، من الدجاج الطازج إلى الخضروات اليومية.
              </p>
              <p className="text-white/65 text-lg leading-relaxed mb-8 relative z-10">
                مزيجنا السري من البهارات وطريقة التحضير الفريدة تجعل من بروستو الوجهة الأولى لعشاق الطعام في المدينة.
              </p>
              <motion.div
                className="flex items-center gap-3 text-white/80 font-medium relative z-10"
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="text-primary w-5 h-5 shrink-0" />
                <span>سوريا - دير الزور - شارع سينما فؤاد - جانب مركز الرشيد</span>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── MENU HIGHLIGHTS ─── */}
      <section id="menu" className="py-32 relative">
        <div className="container px-6 mx-auto">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              أبطال <span className="text-primary">المنيو</span>
            </h2>
            <p className="text-xl text-white/50">أطباقنا الأكثر طلباً والأشد قرمشة</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 90, damping: 18 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent z-10" />
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-112 transition-transform duration-700 ease-out"
                  style={{ transformOrigin: "center center" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-7 z-20">
                  <motion.div
                    className="w-10 h-[3px] bg-primary mb-3 rounded-full"
                    initial={{ scaleX: 0, originX: 1 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                  />
                  <h3 className="text-2xl font-black text-white mb-1 group-hover:text-primary transition-colors duration-300">{item.name}</h3>
                  <p className="text-white/50 font-medium tracking-wider text-sm">{item.enName}</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-3xl z-30 transition-colors duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(245,200,0,0)] group-hover:shadow-[inset_0_0_30px_rgba(245,200,0,0.08)]" />
              </motion.div>
            ))}
          </div>

          <AnimatedSection className="mt-16 text-center" delay={0.2}>
            <motion.a
              href={`tel:${PHONE_NUMBER}`}
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

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="py-24 relative overflow-hidden">
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ background: [
            "radial-gradient(ellipse at 20% 50%, rgba(245,200,0,0.05) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 50%, rgba(245,200,0,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, rgba(245,200,0,0.05) 0%, transparent 60%)",
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container px-6 mx-auto">
          {/* Section header */}
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block px-5 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs tracking-widest uppercase mb-5 backdrop-blur-sm">
              معرض الصور
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-3">
              لحظات من <span className="text-primary">بروستو</span>
            </h2>
            <p className="text-white/45 text-lg">كل صورة تحكي نكهة</p>
          </AnimatedSection>

          {/* Magazine-style grid */}
          <div className="grid grid-cols-12 grid-rows-[auto] gap-3 md:gap-4">

            {/* Hero tile — large left */}
            {[
              { src: img5,  cols: "col-span-12 md:col-span-7", rows: "row-span-2", h: "h-[340px] md:h-[520px]", label: "أجواء مميزة", i: 0 },
              { src: img6,  cols: "col-span-6 md:col-span-5", rows: "",            h: "h-[250px] md:h-[248px]", label: "طعم لا يُنسى", i: 1 },
              { src: img9,  cols: "col-span-6 md:col-span-5", rows: "",            h: "h-[250px] md:h-[248px]", label: "جودة عالية",   i: 2 },
              { src: img18, cols: "col-span-12 md:col-span-4", rows: "",           h: "h-[220px] md:h-[280px]", label: "شهية مفتوحة",  i: 3 },
              { src: img11, cols: "col-span-6 md:col-span-4",  rows: "",           h: "h-[220px] md:h-[280px]", label: "وصفات سرية",   i: 4 },
              { src: img14, cols: "col-span-6 md:col-span-4",  rows: "",           h: "h-[220px] md:h-[280px]", label: "مكونات طازجة", i: 5 },
              { src: img15, cols: "col-span-12 md:col-span-6", rows: "",           h: "h-[200px] md:h-[240px]", label: "نكهة فريدة",   i: 6 },
              { src: img8,  cols: "col-span-12 md:col-span-6", rows: "",           h: "h-[200px] md:h-[240px]", label: "قرمشة ذهبية",  i: 7 },
            ].map((item) => (
              <motion.div
                key={item.i}
                className={`${item.cols} ${item.rows} ${item.h} rounded-2xl overflow-hidden relative group cursor-pointer`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: item.i * 0.07, type: "spring", stiffness: 80, damping: 18 }}
                whileHover={{ scale: 1.015, zIndex: 20 }}
                style={{ position: "relative" }}
              >
                {/* Photo */}
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark vignette always */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Yellow overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-primary/0 group-hover:bg-primary/12 transition-colors duration-500 mix-blend-overlay"
                />

                {/* Glowing border on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/50 transition-colors duration-400 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 40px rgba(245,200,0,0.12)" }} />

                {/* Label revealed on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-[2px] bg-primary rounded-full" />
                    <span className="text-white font-bold text-base drop-shadow-lg">{item.label}</span>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/0 group-hover:bg-primary transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DELIVERY CTA ─── */}
      <section className="relative py-32 overflow-hidden border-y border-primary/15">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ background: [
            "radial-gradient(ellipse at 50% 50%, rgba(245,200,0,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse at 50% 50%, rgba(245,200,0,0.16) 0%, transparent 70%)",
            "radial-gradient(ellipse at 50% 50%, rgba(245,200,0,0.08) 0%, transparent 70%)",
          ] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative z-10 px-6 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
          >
            <motion.h2
              className="text-5xl md:text-7xl font-black mb-4 text-white"
              animate={{ textShadow: ["0 0 20px rgba(255,255,255,0)", "0 0 30px rgba(245,200,0,0.2)", "0 0 20px rgba(255,255,255,0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              توصيل سريع
            </motion.h2>
            <p className="text-xl md:text-2xl text-primary font-medium mb-10">لباب بيتك، ساخن ومقرمش كما تحب!</p>

            <motion.a
              href={`tel:${PHONE_NUMBER}`}
              className="group flex flex-col md:flex-row items-center justify-center gap-6 bg-white/[0.04] border border-white/10 hover:border-primary/40 backdrop-blur-xl p-8 rounded-3xl transition-all duration-400"
              whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(245,200,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="bg-primary/20 p-4 rounded-full"
                animate={{ boxShadow: ["0 0 0px rgba(245,200,0,0.3)", "0 0 25px rgba(245,200,0,0.6)", "0 0 0px rgba(245,200,0,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Phone className="w-10 h-10 text-primary" />
              </motion.div>
              <div className="text-center md:text-right">
                <p className="text-white/45 text-sm mb-1">اتصل الآن للطلب</p>
                <p className="text-4xl md:text-5xl font-black text-white tracking-wider font-mono" dir="ltr">
                  {PHONE_NUMBER}
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-background pt-20 pb-10 border-t border-white/5">
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
              <p className="text-white/50 mb-6 max-w-xs text-sm leading-relaxed">
                لأن الجوع إلو بروستو! أفضل تجربة طعام سريع في دير الزور.
              </p>
              <div className="flex gap-3">
                <motion.a
                  href="https://instagram.com/prosto_restaurant.2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={18} />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/share/1CiMzSXhdU/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook size={18} />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <h4 className="text-lg font-bold text-white mb-5">روابط سريعة</h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link, i) => (
                  <motion.li key={link.name} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                    <a href={link.href} className="text-white/50 hover:text-primary transition-colors text-sm">{link.name}</a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <h4 className="text-lg font-bold text-white mb-5">تواصل معنا</h4>
              <ul className="flex flex-col gap-4 text-white/50 text-sm">
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

          {/* Developer credit — prominent row */}
          <motion.div
            className="border-t border-white/8 pt-10 mt-4 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <p className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} PROSTO Restaurant. All rights reserved.
            </p>

            {/* Developer badge — full-width signature card */}
            <motion.a
              href="https://Needaa.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full max-w-lg overflow-hidden rounded-3xl cursor-pointer"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.975 }}
              style={{
                background: "linear-gradient(135deg, rgba(245,200,0,0.07) 0%, rgba(255,255,255,0.02) 60%, rgba(245,200,0,0.04) 100%)",
                border: "1px solid rgba(245,200,0,0.18)",
                boxShadow: "0 0 0 rgba(245,200,0,0)",
              }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(245,200,0,0)",
                  "0 8px 48px rgba(245,200,0,0.14)",
                  "0 0 0px rgba(245,200,0,0)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Scan-line texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(245,200,0,0.03) 3px, rgba(245,200,0,0.03) 4px)",
                }}
              />

              {/* Sweeping shimmer */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 35%, rgba(245,200,0,0.12) 50%, transparent 65%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
              />

              <div className="relative z-10 px-8 py-6 flex items-center justify-between gap-4">

                {/* Left — code tag label */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <motion.span
                    className="font-mono text-primary/70 text-xl font-black leading-none select-none"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {"</>"}
                  </motion.span>
                  <span className="font-mono text-white/20 text-[9px] tracking-[0.25em] uppercase">dev</span>
                </div>

                {/* Center — name block */}
                <div className="flex-1 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2">
                    تصميم · برمجة · إبداع
                  </p>

                  {/* Giant gradient name */}
                  <motion.p
                    className="font-black leading-none select-none"
                    style={{
                      fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                      background: "linear-gradient(90deg, #c49800 0%, #F5C800 30%, #ffffff 55%, #F5C800 80%, #c49800 100%)",
                      backgroundSize: "250% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "none",
                    }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  >
                    نداء الرحمن
                  </motion.p>

                  {/* Animated underline */}
                  <motion.div
                    className="h-px mt-2 mx-auto rounded-full"
                    style={{ background: "linear-gradient(90deg, transparent, #F5C800, transparent)" }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "80%" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  />
                </div>

                {/* Right — visit button */}
                <motion.div
                  className="shrink-0 flex items-center gap-2 bg-primary text-black px-4 py-2.5 rounded-2xl font-bold text-xs"
                  whileHover={{ scale: 1.1, backgroundColor: "#ffe033" }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">زيارة</span>
                </motion.div>

              </div>
            </motion.a>
          </motion.div>
        </div>
      </footer>

    </div>
  );
}
