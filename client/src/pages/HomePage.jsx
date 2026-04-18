import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Footwear', 'Accessories', 'Sports', 'Kitchen'];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const params = {};
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const { data } = await api.get('/products', { params });
      setProducts(data);
      setLoading(false);
    };
    fetch();
  }, [category, search]);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <input placeholder="Search products..." value={search}
          onChange={e => setSearch(e.target.value)} style={{ maxWidth: 360, marginBottom: 12 }} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              background: category === c ? '#4f46e5' : '#f3f4f6',
              color: category === c ? '#fff' : '#374151', padding: '6px 16px', fontSize: 13,
            }}>{c}</button>
          ))}
        </div>
      </div>
      {loading ? <p style={{ color: '#888' }}>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
