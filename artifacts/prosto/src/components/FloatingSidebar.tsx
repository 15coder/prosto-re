import { motion } from 'framer-motion';
import { Phone, Instagram, Facebook } from 'lucide-react';

const PHONE_NUMBER = "0996006263";

const items = [
  { href: `tel:${PHONE_NUMBER}`, icon: <Phone size={16} />, label: "اتصل بنا" },
  { href: "https://instagram.com/prosto_restaurant.2026", icon: <Instagram size={16} />, label: "إنستغرام" },
  { href: "https://www.facebook.com/share/1CiMzSXhdU/", icon: <Facebook size={16} />, label: "فيسبوك" },
];

export default function FloatingSidebar() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-3 hidden md:flex">
      {items.map((item, i) => (
        <motion.a
          key={i}
          href={item.href}
          target={item.href.startsWith('tel:') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="group relative w-10 h-10 rounded-full border border-primary/40 backdrop-blur-md flex items-center justify-center text-primary transition-all duration-300 cursor-none"
          style={{ background: 'rgba(10,10,10,0.65)', boxShadow: '0 0 12px rgba(245,200,0,0.1)' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + i * 0.15, type: 'spring', stiffness: 220, damping: 25 }}
          whileHover={{ scale: 1.2, boxShadow: '0 0 24px rgba(245,200,0,0.5)', backgroundColor: 'hsl(46,98%,48%)' }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="text-primary group-hover:text-black transition-colors duration-200"
          >
            {item.icon}
          </motion.span>

          {/* Tooltip */}
          <span className="absolute left-12 bg-black/90 border border-primary/20 text-primary text-xs px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
            {item.label}
          </span>
        </motion.a>
      ))}

      {/* Vertical line connector */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 pointer-events-none"
        style={{ top: '-24px', bottom: '-24px' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2, duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}
