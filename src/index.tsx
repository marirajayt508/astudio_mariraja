import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { store } from './redux/store';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import './styles/index.css';

const App = () => {
  return (
    <div className="app font-neutra">
      <nav className="flex items-center justify-between p-4 bg-custom-black text-white mb-6">
        <div className="text-xl font-bold">Data Dashboard</div>
        <div className="flex space-x-4">
          <Link to="/users" className="hover:text-custom-yellow transition-colors">Users</Link>
          <Link to="/products" className="hover:text-custom-yellow transition-colors">Products</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
