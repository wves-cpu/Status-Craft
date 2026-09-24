import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import TechBackground from '../components/TechBackground';
import LanguageSelector from '../components/LanguageSelector';
import { IconUser, IconGear, IconWrench, IconPhone } from '../components/SvgIcons';
import './AuthPage.css';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('master'); // 'master' | 'client'
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    if (tab === 'client') {
      navigate('/submit');
    } else {
      setActiveTab('master');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (isRegister) {
        if (!name || !email || !password) {
          throw new Error('Barcha majburiy maydonlarni to\'ldiring');
        }
        await register(name, email, password, shopName);
      } else {
        if (!email || !password) {
          throw new Error('Email va parolni kiriting');
        }
        await login(email, password);
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Xatolik yuz berdi');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-master-page">
      <TechBackground />

      <div className="auth-container-inner">
        {/* Dual Mode Switch Tabs */}
        <div className="auth-mode-switch glass-panel">
          <button
            type="button"
            className={`mode-btn ${activeTab === 'master' ? 'active' : ''}`}
            onClick={() => handleTabChange('master')}
          >
            <IconWrench size={18} /> {t('authMasterTab')}
          </button>
          <button
            type="button"
            className={`mode-btn ${activeTab === 'client' ? 'active' : ''}`}
            onClick={() => handleTabChange('client')}
          >
            <IconPhone size={18} /> {t('authClientTab')}
          </button>
        </div>

        {/* Main Glass Card */}
        <div className="auth-card glass-panel">
          <div className="auth-top-bar">
            <Link to="/" className="auth-brand">
              <div className="logo-gear-box" style={{ width: 28, height: 28 }}>
                <IconGear size={16} />
              </div>
              <span className="brand-title">Status<strong>Craft</strong></span>
            </Link>

            <LanguageSelector />
          </div>

          <div className="auth-header">
            <h2>{isRegister ? t('authRegisterTitle') : t('authLoginTitle')}</h2>
            <p className="auth-subtitle">
              {isRegister ? 'Заполните данные для создания кабинета' : 'Авторизуйтесь для доступа к панели заказов'}
            </p>
          </div>

          <div className="auth-form-tabs">
            <button
              type="button"
              className={`auth-subtab ${!isRegister ? 'active' : ''}`}
              onClick={() => { setIsRegister(false); setError(''); }}
            >
              {t('authLoginBtn')}
            </button>
            <button
              type="button"
              className={`auth-subtab ${isRegister ? 'active' : ''}`}
              onClick={() => { setIsRegister(true); setError(''); }}
            >
              {t('authRegisterBtn')}
            </button>
          </div>

          {error && <div className="auth-error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <div className="form-group">
                <label>{t('authName')}</label>
                <div className="input-with-icon">
                  <IconUser size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Александр Смирнов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {isRegister && (
              <div className="form-group">
                <label>{t('authShopName')}</label>
                <div className="input-with-icon">
                  <IconGear size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="StatusCraft Service Center"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>{t('authEmail')}</label>
              <div className="input-with-icon">
                <IconUser size={18} className="input-icon" />
                <input
                  type="email"
                  placeholder="master@statuscraft.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t('authPassword')}</label>
              <div className="input-with-icon">
                <IconGear size={18} className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
              {submitting ? 'Yuklanmoqda...' : isRegister ? t('authRegisterBtn') : t('authLoginBtn')}
            </button>
          </form>

          <div className="auth-footer">
            {isRegister ? (
              <p>
                {t('authHaveAccount')}{' '}
                <button type="button" className="link-btn" onClick={() => setIsRegister(false)}>
                  {t('authLoginBtn')}
                </button>
              </p>
            ) : (
              <p>
                {t('authNoAccount')}{' '}
                <button type="button" className="link-btn" onClick={() => setIsRegister(true)}>
                  {t('authRegisterBtn')}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
