import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);

  const ringX = useSpring(rawX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 14);
      rawY.set(e.clientY - 14);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      if (!visible) setVisible(true);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [rawX, rawY, dotX, dotY, visible]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer gold ring — follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{ scale: clicking ? 0.7 : 1 }}
        transition={{ scale: { type: 'spring', stiffness: 400, damping: 25 } }}
      >
        <div
          className="w-7 h-7 rounded-full border-2 border-primary"
          style={{ boxShadow: '0 0 10px rgba(245,200,0,0.55), 0 0 20px rgba(245,200,0,0.2)' }}
        />
      </motion.div>

      {/* Inner glowing dot — snaps instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-primary"
          style={{ boxShadow: '0 0 8px 3px rgba(245,200,0,0.9)' }}
        />
      </motion.div>
    </>
  );
}
