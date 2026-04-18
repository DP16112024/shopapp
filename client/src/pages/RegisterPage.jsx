import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      toast.success(`Welcome, ${data.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Create Account</h2>
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e5e5e5' }}>
        <input name="name"     placeholder="Full name" value={form.name}     onChange={handleChange} />
        <input name="email"    type="email" placeholder="Email" value={form.email}    onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button onClick={handleSubmit}
          style={{ background: '#4f46e5', color: '#fff', width: '100%', padding: 12, fontSize: 15 }}>
          Create Account
        </button>
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: '#6b7280' }}>
          Already have an account? <Link to="/login" style={{ color: '#4f46e5', fontWeight: 500 }}>Login</Link>
        </p>
      </div>
    </div>
  );
}