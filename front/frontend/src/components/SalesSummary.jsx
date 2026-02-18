import { useState, useEffect } from 'react';
import { getDailySales } from '../api/sales';

function SalesSummary() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadSales();
    }, []);

    const loadSales = async () => {
        try {
            const data = await getDailySales();
            setSales(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const totalSales = sales.reduce((sum, sale) => sum + parseFloat(sale.total), 0);
    const totalTransactions = sales.length;

    if (loading) return <div>Cargando ventas...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div>
            <h1>Resumen de Ventas Diarias</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <h4>Ventas Totales</h4>
                        <p>${totalSales.toLocaleString()}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🧾</div>
                    <div className="stat-info">
                        <h4>Transacciones</h4>
                        <p>{totalTransactions}</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2>Transacciones Recientes</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Método de Pago</th>
                                <th>Total</th>
                                <th>Artículos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map(sale => (
                                <tr key={sale.id}>
                                    <td>{new Date(sale.created_at).toLocaleTimeString()}</td>
                                    <td>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            backgroundColor: 'rgba(67, 24, 255, 0.1)',
                                            color: '#4318ff',
                                            fontSize: '12px',
                                            fontWeight: '700'
                                        }}>
                                            {sale.payment_methods?.name || 'N/A'}
                                        </span>
                                    </td>
                                    <td>${sale.total}</td>
                                    <td>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#a3aed0' }}>
                                            {sale.sale_details?.map(detail => (
                                                <li key={detail.id}>
                                                    {detail.quantity}x {detail.products?.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                            {sales.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#a3aed0' }}>No se encontraron ventas hoy</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalesSummary;
