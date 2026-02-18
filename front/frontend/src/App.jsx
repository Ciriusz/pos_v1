import { useState } from 'react';
import ProductList from './components/ProductList';
import CategoryForm from './components/CategoryForm';
import SalesSummary from './components/SalesSummary';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">POS V1</div>
        <nav className="nav-links">
          <button
            className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Productos
          </button>
          <button
            className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            🏷️ Categorías
          </button>
          <button
            className={`nav-link ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            📊 Resumen de Ventas
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {activeTab === 'products' && <ProductList />}
        {activeTab === 'categories' && <CategoryForm />}
        {activeTab === 'sales' && <SalesSummary />}
      </main>
    </div>
  );
}

export default App;
