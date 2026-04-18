import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [form, setForm] = useState({ address: '', city: '', zip: '', country: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    if (!userInfo) return navigate('/login');
    if (!form.address || !form.city || !form.zip || !form.country)
      return toast.error('Please fill all fields');
    setLoading(true);
    try {
      const { data } = await api.post('/orders', { shippingAddress: form });
      toast.success('Order placed!');
      navigate(`/orders`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 700 }}>Shipping Details</h2>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e5e5' }}>
        <input name="address"  placeholder="Street address" value={form.address}  onChange={handleChange} />
        <input name="city"     placeholder="City"           value={form.city}     onChange={handleChange} />
        <input name="zip"      placeholder="ZIP / Postcode" value={form.zip}      onChange={handleChange} />
        <input name="country"  placeholder="Country"        value={form.country}  onChange={handleChange} />
        <button onClick={placeOrder} disabled={loading}
          style={{ background: '#4f46e5', color: '#fff', width: '100%', padding: 12, fontSize: 16, marginTop: 8 }}>
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}