import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav style={{
      background: '#fff', borderBottom: '1px solid #e5e5e5',
      padding: '0 24px', height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link to="/" style={{ fontSize: 20, fontWeight: 700, color: '#4f46e5' }}>
        ShopMERN
      </Link>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', fontSize: 14 }}>
        <Link to="/cart" style={{ fontWeight: 500 }}>Cart</Link>
        {userInfo ? (
          <>
            <Link to="/orders">Orders</Link>
            <span style={{ color: '#888' }}>{userInfo.name}</span>
            <button onClick={handleLogout}
              style={{ background: '#f3f4f6', color: '#374151', padding: '6px 14px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">
              <button style={{ background: '#4f46e5', color: '#fff', padding: '6px 14px' }}>
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}