import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    emoji: '🥩',
    title: 'المكونات الطازجة',
    titleEn: 'Fresh Ingredients',
    desc: 'لحوم طازجة وخضروات يومية مختارة بعناية من أفضل المصادر',
    color: 'from-red-500/20 to-orange-500/10',
    borderColor: 'border-red-400/30',
    glowColor: 'rgba(239,68,68,0.3)',
  },
  {
    emoji: '🔥',
    title: 'التحضير والطهي',
    titleEn: 'Cooking',
    desc: 'طهي على أعلى درجات الحرارة بتوابل سرية تُعطي النكهة الفريدة',
    color: 'from-orange-500/20 to-yellow-500/10',
    borderColor: 'border-orange-400/30',
    glowColor: 'rgba(245,158,11,0.4)',
  },
  {
    emoji: '✨',
    title: 'إتمام وتجميل',
    titleEn: 'Finishing',
    desc: 'إضافة الصلصات والإكمالات التي تجعل كل طبق تحفة فنية',
    color: 'from-yellow-500/20 to-primary/10',
    borderColor: 'border-yellow-400/30',
    glowColor: 'rgba(245,200,0,0.4)',
  },
  {
    emoji: '🍽️',
    title: 'التقديم بشغف',
    titleEn: 'Served with Passion',
    desc: 'تُقدَّم وجبتك ساخنة ومقرمشة، لأن التفاصيل هي الفارق',
    color: 'from-primary/20 to-green-500/10',
    borderColor: 'border-primary/40',
    glowColor: 'rgba(245,200,0,0.5)',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 90, damping: 18 }}
      className={`relative flex flex-col items-center text-center p-6 md:p-8 rounded-3xl border bg-gradient-to-b ${step.color} ${step.borderColor} backdrop-blur-md overflow-hidden group`}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${step.glowColor}` }}
      />

      {/* Step number */}
      <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-black">
        {index + 1}
      </div>

      {/* Animated emoji icon */}
      <motion.div
        className="text-5xl md:text-6xl mb-4 select-none"
        animate={{
          y: [0, -6, 0],
          rotate: index % 2 === 0 ? [0, 4, -4, 0] : [0, -4, 4, 0],
        }}
        transition={{
          duration: 2.5 + index * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
        role="img"
        aria-label={step.titleEn}
      >
        {step.emoji}
      </motion.div>

      {/* Arrow connector (not on last item) */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 z-10">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-primary/60 text-xl"
          >
            ←
          </motion.div>
        </div>
      )}

      <h3 className="text-xl md:text-2xl font-black text-foreground mb-2">{step.title}</h3>
      <p className="text-xs text-primary/70 font-medium tracking-wider uppercase mb-3">{step.titleEn}</p>
      <p className="text-foreground/55 text-sm leading-relaxed">{step.desc}</p>

      {/* Animated bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
        style={{ width: '100%' }}
      />
    </motion.div>
  );
}

export default function BehindScenes() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden min-h-[100dvh] flex items-center">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 50%, rgba(245,200,0,0.04) 0%, transparent 60%)',
            'radial-gradient(ellipse at 70% 50%, rgba(245,200,0,0.07) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 50%, rgba(245,200,0,0.04) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container px-6 mx-auto">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs tracking-widest uppercase mb-5 backdrop-blur-sm">
            خلف الكواليس
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-3 font-display">
            رحلة <span className="text-primary">وجبتك</span>
          </h2>
          <p className="text-foreground/45 text-lg max-w-xl mx-auto">
            من المكوّن الطازج إلى طبقك — كل خطوة مصنوعة بعناية وشغف
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 relative">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}

          {/* Connecting dashed line (desktop) */}
          <div className="absolute hidden lg:block top-[60px] left-[12.5%] right-[12.5%] h-px border-t border-dashed border-primary/20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
