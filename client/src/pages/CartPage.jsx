import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const fetchCart = async () => { const { data } = await api.get('/cart'); setCart(data); };

  useEffect(() => { if (!userInfo) return navigate('/login'); fetchCart(); }, []);

  const updateQty = async (productId, quantity) => { await api.put(`/cart/item/${productId}`, { quantity }); fetchCart(); };
  const removeItem = async (productId) => { await api.delete(`/cart/item/${productId}`); toast.info('Removed'); fetchCart(); };
  const total = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);

  if (cart.items.length === 0) return (
    <div style={{ textAlign: 'center', padding: 60 }}>
      <p style={{ fontSize: 18, color: '#888', marginBottom: 20 }}>Your cart is empty.</p>
      <button onClick={() => navigate('/')} style={{ background: '#4f46e5', color: '#fff' }}>Shop Now</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 700 }}>
      <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 700 }}>Your Cart</h2>
      {cart.items.map(item => (
        <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, border: '1px solid #e5e5e5' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600 }}>{item.name}</p>
            <p style={{ color: '#4f46e5', fontWeight: 700 }}>${item.price}</p>
          </div>
          <select value={item.quantity} onChange={e => updateQty(item.product, Number(e.target.value))} style={{ width: 60, marginBottom: 0 }}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <p style={{ fontWeight: 700, minWidth: 60, textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => removeItem(item.product)} style={{ background: '#fee2e2', color: '#dc2626', padding: '6px 12px' }}>Remove</button>
        </div>
      ))}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e5e5e5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 600 }}>Total</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#4f46e5' }}>${total.toFixed(2)}</span>
        </div>
        <button onClick={() => navigate('/checkout')} style={{ background: '#4f46e5', color: '#fff', width: '100%', padding: 12, fontSize: 16 }}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
