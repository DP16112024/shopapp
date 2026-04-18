import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const addToCart = async (e) => {
    e.stopPropagation();
    if (!userInfo) return navigate('/login');
    try {
      await api.post('/cart/add', {
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      });
      toast.success('Added to cart!');
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div onClick={() => navigate(`/product/${product._id}`)} style={{
      background: '#fff', borderRadius: 12, overflow: 'hidden',
      border: '1px solid #e5e5e5', cursor: 'pointer',
      transition: 'box-shadow 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      
      <div style={{ padding: '14px 16px' }}>
        <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{product.category}</p>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{product.name}</h3>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#4f46e5' }}>
            ${product.price}
          </span>
          <button onClick={addToCart}
            style={{ background: '#4f46e5', color: '#fff', padding: '8px 14px', fontSize: 13 }}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}