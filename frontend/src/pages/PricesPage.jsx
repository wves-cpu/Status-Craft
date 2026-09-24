import RepairCostModal from '../components/RepairCostModal';
import { useNavigate } from 'react-router-dom';

export default function PricesPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '80vh', background: '#0b1120' }}>
      <RepairCostModal onClose={() => navigate('/')} />
    </div>
  );
}
