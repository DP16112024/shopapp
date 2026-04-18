import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  const addToCart = async () => {
    if (!userInfo) return navigate('/login');
    await api.post('/cart/add', {
      productId: product._id, name: product.name,
      image: product.image, price: product.price, quantity: qty,
    });
    toast.success('Added to cart!');
    navigate('/cart');
  };

  if (!product) return <p style={{ color: '#888' }}>Loading...</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, maxWidth: 800 }}>
      <img src={product.image} alt={product.name}
        style={{ width: '100%', borderRadius: 12, background: '#f3f4f6' }} />
      <div>
        <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 6 }}>{product.category}</p>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{product.name}</h1>
        <p style={{ color: '#6b7280', marginBottom: 20 }}>{product.description}</p>
        <p style={{ fontSize: 28, fontWeight: 700, color: '#4f46e5', marginBottom: 16 }}>
          ${product.price}
        </p>
        <p style={{ fontSize: 13, color: product.stock > 0 ? '#16a34a' : '#dc2626', marginBottom: 16 }}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <label style={{ fontSize: 14 }}>Qty:</label>
          <select value={qty} onChange={e => setQty(Number(e.target.value))}
            style={{ width: 70, marginBottom: 0 }}>
            {[...Array(Math.min(product.stock, 5))].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <button onClick={addToCart} disabled={product.stock === 0}
          style={{ background: '#4f46e5', color: '#fff', width: '100%', padding: '12px' }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}