import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  IconPhone,
  IconTablet,
  IconLaptop,
  IconConsole,
  IconTv,
  IconGear,
  IconWrench,
} from './SvgIcons';
import TechBackground from './TechBackground';
import './PageLoader.css';

const GADGET_LIST = [
  {
    id: 'phone',
    name: 'iPhone 15 Pro Max',
    icon: <IconPhone size={64} className="gadget-svg" />,
    repairAction: {
      ru: 'Замена стекла и диагностика материнской платы',
      uz: 'Shisha almashtirish va plata diagnostikasi',
      en: 'Glass replacement & motherboard diagnostics',
    },
  },
  {
    id: 'tablet',
    name: 'iPad Air 5',
    icon: <IconTablet size={64} className="gadget-svg" />,
    repairAction: {
      ru: 'Калибровка сенсора и замена аккумулятора',
      uz: 'Sensor kalibrovkasi va akkumulyator ta\'miri',
      en: 'Sensor calibration & battery replacement',
    },
  },
  {
    id: 'laptop',
    name: 'MacBook Pro 16"',
    icon: <IconLaptop size={64} className="gadget-svg" />,
    repairAction: {
      ru: 'Чистка от пыли, замена термопасты и BGA пайка',
      uz: 'Changdan tozalash, termopasta va BGA kavsharlash',
      en: 'Cleaning, thermal paste & BGA soldering',
    },
  },
  {
    id: 'console',
    name: 'PlayStation 5',
    icon: <IconConsole size={64} className="gadget-svg" />,
    repairAction: {
      ru: 'Замена жидкого металла и ремонт кулера',
      uz: 'Suyuq metall almashtirish va kuler ta\'miri',
      en: 'Liquid metal replacement & fan repair',
    },
  },
  {
    id: 'tv',
    name: 'Smart TV 4K OLED',
    icon: <IconTv size={64} className="gadget-svg" />,
    repairAction: {
      ru: 'Восстановление подсветки и диагностика блока питания',
      uz: 'Yoritish tizimini tiklash va blok diagnostikasi',
      en: 'Backlight restoration & power board check',
    },
  },
];

export default function PageLoader({ onFinish }) {
  const { lang } = useLanguage();
  const [currentGadget, setCurrentGadget] = useState(GADGET_LIST[0]);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    try {
      const storedIdx = localStorage.getItem('statuscraft_gadget_idx');
      let nextIdx = 0;
      if (storedIdx !== null) {
        nextIdx = (parseInt(storedIdx, 10) + 1) % GADGET_LIST.length;
      }
      localStorage.setItem('statuscraft_gadget_idx', nextIdx.toString());
      setCurrentGadget(GADGET_LIST[nextIdx]);
    } catch (e) {
      setCurrentGadget(GADGET_LIST[0]);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinish?.();
          }, 250);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18 + 12);
      });
    }, 140);

    return () => clearInterval(interval);
  }, [onFinish]);

  const repairText = currentGadget.repairAction[lang] || currentGadget.repairAction.ru;

  return (
    <div className="fullscreen-loader-overlay">
      <TechBackground />

      <div className="fullscreen-loader-center">
        {/* Brand Header */}
        <div className="loader-brand-header">
          <div className="logo-gear-box glow-box" style={{ width: 40, height: 40 }}>
            <IconGear size={22} className="spin-gear-icon" />
          </div>
          <span className="fullscreen-brand-title">Status<strong>Craft</strong></span>
        </div>

        {/* Repair Scene Graphic */}
        <div className="fullscreen-repair-scene">
          <div className="laser-scanner-line" />
          <div className="gadget-display-wrapper">
            {currentGadget.icon}
          </div>
          <div className="repair-sparks-badge">
            <IconWrench size={22} className="spark-wrench-icon" />
          </div>
        </div>

        {/* Gadget Info & Status */}
        <div className="fullscreen-gadget-badge">
          🔧 {currentGadget.name}
        </div>

        <p className="fullscreen-action-desc">
          {repairText}
        </p>

        {/* Percentage Counter (No bottom line) */}
        <div className="fullscreen-progress-num">
          {progress}%
        </div>
      </div>
    </div>
  );
}
