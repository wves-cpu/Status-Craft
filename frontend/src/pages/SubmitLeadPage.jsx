import SubmitDeviceModal from '../components/SubmitDeviceModal';
import { useNavigate } from 'react-router-dom';

export default function SubmitLeadPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '80vh', background: '#0b1120' }}>
      <SubmitDeviceModal onClose={() => navigate('/')} />
    </div>
  );
}
