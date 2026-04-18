import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) return navigate('/login');
    api.get('/orders/myorders').then(({ data }) => setOrders(data));
  }, []);

  if (orders.length === 0) return <p style={{ color: '#888', marginTop: 40, textAlign: 'center' }}>No orders yet.</p>;

  return (
    <div style={{ maxWidth: 700 }}>
      <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 700 }}>My Orders</h2>
      {orders.map(order => (
        <div key={order._id} style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 12, border: '1px solid #e5e5e5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: '#888' }}>Order #{order._id.slice(-8).toUpperCase()}</span>
            <span style={{ fontSize: 13, color: '#888' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          {order.items.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>{item.name} x {item.quantity}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: order.isPaid ? '#dcfce7' : '#fef9c3', color: order.isPaid ? '#16a34a' : '#ca8a04' }}>
              {order.isPaid ? 'Paid' : 'Pending'}
            </span>
            <span style={{ fontWeight: 700, color: '#4f46e5', fontSize: 18 }}>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
