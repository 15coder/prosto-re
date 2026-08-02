import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Instagram, Facebook, Menu, X, ArrowLeft } from 'lucide-react';
import Stack from '@/components/Stack';

// Images
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
import img17 from "@assets/prosto_restaurant.2026_20260802_103738_853_1785659367070.jpg";
import img18 from "@assets/prosto_restaurant.2026_20260802_111413_509_1785659366896.jpg";

const PHONE_NUMBER = "0996006263";

const navLinks = [
  { name: "الرئيسية", href: "#hero" },
  { name: "قصتنا", href: "#about" },
  { name: "المنيو", href: "#menu" },
  { name: "المعرض", href: "#gallery" },
];

export default function Home() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Parallax values for Hero
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  // Framer Motion variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <div className="bg-background text-foreground min-h-[100dvh] overflow-x-hidden selection:bg-primary selection:text-black font-sans">
      
      {/* --- NAVBAR --- */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled ? "bg-background/80 backdrop-blur-xl border-border/50 py-3 shadow-lg" : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#hero" className="text-3xl font-black tracking-tighter text-primary flex items-center gap-2">
            PROSTO
            <span className="text-xl mt-1 text-white">بروستو</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-white/80 hover:text-primary transition-colors text-lg">
                {link.name}
              </a>
            ))}
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="bg-primary text-black px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(245,200,0,0.3)] hover:shadow-[0_0_30px_rgba(245,200,0,0.5)] transition-all hover:scale-105 active:scale-95"
            >
              اطلب الآن
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white p-2">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 items-start text-3xl font-bold">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-8 w-full h-[1px] bg-border" />
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="text-primary flex items-center gap-4 mt-4"
              >
                <Phone />
                0996006263
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
          <img 
            src={img1} 
            alt="Prosto Food" 
            className="w-full h-full object-cover opacity-40 blur-[2px] scale-110"
          />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/40"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 2,
              }}
              animate={{
                y: [null, Math.random() * -500],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                boxShadow: "0 0 10px rgba(245,200,0,0.5)"
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-6 pt-20">
          <motion.div 
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp} className="mb-4 inline-block">
              <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium tracking-widest text-sm shadow-[0_0_15px_rgba(245,200,0,0.15)] backdrop-blur-md">
                التجربة الأقوى في المدينة
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="text-7xl md:text-9xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary to-amber-600 drop-shadow-[0_0_30px_rgba(245,200,0,0.3)] tracking-tighter"
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
              className="text-2xl md:text-4xl text-white/90 font-medium mb-10 max-w-2xl"
            >
              لأن الجوع إلو بروستو!
            </motion.p>

            <motion.a 
              variants={scaleUp}
              href={`tel:${PHONE_NUMBER}`}
              className="group relative inline-flex items-center justify-center gap-3 bg-primary text-black px-10 py-5 rounded-full font-bold text-xl md:text-2xl overflow-hidden shadow-[0_0_40px_rgba(245,200,0,0.4)] hover:shadow-[0_0_60px_rgba(245,200,0,0.6)] transition-all"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              <Phone className="w-6 h-6 animate-pulse" />
              <span>اطلب الآن / Order Now</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* --- STACK SHOWCASE SECTION --- */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
            
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-xl text-center lg:text-right"
            >
              <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                أكثر من وجبة — <span className="text-primary">تجربة</span>
                <br />
                <span className="text-2xl md:text-3xl text-white/60 font-semibold block mt-4 tracking-wide">More Than a Meal</span>
              </motion.h3>
              <motion.p variants={fadeUp} className="text-lg text-white/70 leading-relaxed mb-8">
                نحن لا نقدم الطعام فقط، بل نقدم تجربة فريدة تداعب الحواس. دجاج مقرمش ذهبي، برغر مليء بالعصارة، وشاورما محضرة بشغف. كل قضمة هي قصة جديدة.
              </motion.p>
              <motion.div variants={fadeUp} className="flex gap-4 justify-center lg:justify-end">
                <div className="flex -space-x-4 space-x-reverse">
                  <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden"><img src={img3} alt="Food" className="w-full h-full object-cover" /></div>
                  <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden"><img src={img4} alt="Food" className="w-full h-full object-cover" /></div>
                  <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden"><img src={img8} alt="Food" className="w-full h-full object-cover" /></div>
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-primary flex items-center justify-center text-black font-bold text-sm">+99</div>
                </div>
                <div className="flex flex-col justify-center text-sm font-medium">
                  <span className="text-white">آلاف العملاء</span>
                  <span className="text-primary">الراضين يومياً</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="w-full max-w-[380px] h-[480px]"
            >
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={true}
                cards={[
                  <img key="1" src={img1} alt="Prosto Platter" className="w-full h-full object-cover pointer-events-none" />,
                  <img key="2" src={img2} alt="Shawarma Wrap" className="w-full h-full object-cover pointer-events-none" />,
                  <img key="3" src={img3} alt="Prosto Burger" className="w-full h-full object-cover pointer-events-none" />,
                  <img key="4" src={img4} alt="Crispy Chicken" className="w-full h-full object-cover pointer-events-none" />
                ]}
              />
              <div className="text-center mt-6 text-white/50 text-sm flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4 animate-bounce" />
                <span>اسحب البطاقة لتكتشف المزيد</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-card/30 relative">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={img17} alt="Prosto Restaurant Interior" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-primary font-bold text-xl drop-shadow-md">أجواء مميزة</p>
                <p className="text-white/90 text-sm mt-2">مكان يجمع العائلة والأصدقاء</p>
              </div>
            </motion.div>

            <motion.div 
              className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-primary/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px]" />
              <h2 className="text-3xl md:text-5xl font-black mb-6">قصتنا تبدأ من <span className="text-primary">الجودة</span></h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                في بروستو، نؤمن بأن الوجبة السريعة لا يجب أن تكون عادية. نحن نختار مكوناتنا بعناية فائقة، من الدجاج الطازج إلى الخضروات اليومية، لنقدم لك طعماً لا ينسى.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                مزيجنا السري من البهارات، وطريقة التحضير الفريدة، تجعل من بروستو الوجهة الأولى لعشاق الطعام في المدينة.
              </p>
              
              <div className="flex items-center gap-4 text-white/90 font-medium">
                <MapPin className="text-primary w-6 h-6" />
                <span>شارع سينما فؤاد - جانب مركز الرشيد</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MENU HIGHLIGHTS --- */}
      <section id="menu" className="py-32 relative">
        <div className="container px-6 mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4">أبطال <span className="text-primary">المنيو</span></h2>
            <p className="text-xl text-white/60">أطباقنا الأكثر طلباً والأشد قرمشة</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              { id: 1, name: "برغر بروستو", enName: "Prosto Burger", img: img3 },
              { id: 2, name: "دجاج مقرمش", enName: "Crispy Chicken", img: img4 },
              { id: 3, name: "شاورما", enName: "Shawarma Wrap", img: img7 },
              { id: 4, name: "بطاطس ذهبية", enName: "Golden Fries", img: img8 },
              { id: 5, name: "سلطة طازجة", enName: "Fresh Salad", img: img10 },
              { id: 6, name: "مزة مشكلة", enName: "Meze Platter", img: img12 },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 z-10" />
                
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-1 bg-primary mb-4 rounded-full shadow-[0_0_10px_rgba(245,200,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="text-2xl font-black text-white mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-white/60 font-medium tracking-wider">{item.enName}</p>
                </div>
                
                {/* Glass Hover Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-3xl z-30 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center px-8 py-4 border border-primary/30 text-primary hover:bg-primary hover:text-black rounded-full font-bold transition-all"
            >
              اطلب المنيو كامل الآن
            </a>
          </div>
        </div>
      </section>

      {/* --- GALLERY MOSAIC --- */}
      <section id="gallery" className="py-24 bg-card/20">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="col-span-2 md:col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
              <img src={img5} className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
            </div>
            <div className="col-span-1 rounded-2xl overflow-hidden relative group">
              <img src={img6} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
            <div className="col-span-1 rounded-2xl overflow-hidden relative group">
              <img src={img9} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
            <div className="col-span-2 md:col-span-2 rounded-2xl overflow-hidden relative group">
              <img src={img18} className="w-full h-full object-cover min-h-[200px] group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
            <div className="col-span-1 rounded-2xl overflow-hidden relative group">
              <img src={img11} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
            <div className="col-span-1 md:col-span-1 row-span-2 rounded-2xl overflow-hidden relative group">
              <img src={img14} className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
            <div className="col-span-2 md:col-span-2 rounded-2xl overflow-hidden relative group">
              <img src={img15} className="w-full h-full object-cover min-h-[200px] group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
          </div>
        </div>
      </section>

      {/* --- DELIVERY CTA --- */}
      <section className="relative py-32 overflow-hidden border-y border-primary/20">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/20 blur-[150px] pointer-events-none" />
        
        <div className="container relative z-10 px-6 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-2xl">
              🛵 توصيل سريع
            </h2>
            <p className="text-xl md:text-2xl text-primary font-medium mb-10">
              لباب بيتك، ساخن ومقرمش كما تحب!
            </p>
            
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="group flex flex-col md:flex-row items-center justify-center gap-6 bg-white/[0.05] border border-white/10 hover:border-primary/50 backdrop-blur-md p-8 rounded-3xl transition-all duration-300"
            >
              <div className="bg-primary/20 p-4 rounded-full group-hover:bg-primary/30 transition-colors">
                <Phone className="w-10 h-10 text-primary" />
              </div>
              <div className="text-center md:text-right">
                <p className="text-white/50 text-sm mb-1">اتصل الآن للطلب</p>
                <p className="text-4xl md:text-5xl font-black text-white tracking-wider font-mono">
                  {PHONE_NUMBER}
                </p>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-background pt-20 pb-10 border-t border-white/5">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <span className="text-3xl font-black text-primary mb-4 block">PROSTO</span>
              <p className="text-white/60 mb-6 max-w-xs">
                لأن الجوع إلو بروستو! أفضل تجربة طعام سريع في المدينة. دجاج مقرمش، برغر، وشاورما محضرة بشغف.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/prosto_restaurant.2026" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <h4 className="text-xl font-bold text-white mb-6">روابط سريعة</h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/60 hover:text-primary transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <h4 className="text-xl font-bold text-white mb-6">تواصل معنا</h4>
              <ul className="flex flex-col gap-4 text-white/60">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <MapPin className="text-primary w-5 h-5 shrink-0" />
                  <span>شارع سينما فؤاد - جانب مركز الرشيد</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="text-primary w-5 h-5 shrink-0" />
                  <a href={`tel:${PHONE_NUMBER}`} className="hover:text-primary transition-colors hover:underline" dir="ltr">{PHONE_NUMBER}</a>
                </li>
              </ul>
            </div>

          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} PROSTO Restaurant. All rights reserved.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-1">
              Made with <span className="text-primary">💛</span> for great taste.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}