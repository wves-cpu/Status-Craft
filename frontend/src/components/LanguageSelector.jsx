import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

const LANGUAGES = [
  { code: 'uz', label: 'UZ', flag: '🇺🇿', full: 'Oʻzbekcha' },
  { code: 'ru', label: 'RU', flag: '🇷🇺', full: 'Русский' },
  { code: 'en', label: 'EN', flag: '🇬🇧', full: 'English' },
];

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[1];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div className="custom-lang-selector" ref={dropdownRef}>
      <button
        type="button"
        className={`lang-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="lang-flag">{currentLang.flag}</span>
        <span className="lang-code">{currentLang.label}</span>
        <svg
          className={`lang-arrow ${isOpen ? 'rotate' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu glass-panel">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`lang-option-btn ${l.code === lang ? 'selected' : ''}`}
              onClick={() => handleSelect(l.code)}
            >
              <span className="lang-flag">{l.flag}</span>
              <span className="lang-full-name">{l.full}</span>
              <span className="lang-short-badge">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
