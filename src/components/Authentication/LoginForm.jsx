import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      // Redirect to respective dashboards based on the role
      if (user && user.role) {
        if (user.role === 'Admin') {
          navigate('/admin-dashboard');
        } else if (user.role === 'Inspector') {
          navigate('/inspector-dashboard');
        } else if (user.role === 'Engineer') {
          navigate('/engineer-dashboard');
        }
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="block w-full p-2 mb-3 border"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="block w-full p-2 mb-3 border"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
