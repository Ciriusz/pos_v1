import { useState, useEffect } from 'react';
import { getCategories } from '../api/categories';

function ProductForm({ product, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        price: '',
        stock: '',
        category_id: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to load categories', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2>{product ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                        <label>Código</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="ej. P001"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="ej. Coca Cola"
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                        <label>Precio ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="0"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Categoría</label>
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="input-select"
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-actions" style={{ marginTop: '20px' }}>
                    <button type="button" className="btn-secondary" onClick={onCancel} style={{ marginRight: '10px' }}>Cancelar</button>
                    <button type="submit" className="btn-primary">Guardar Producto</button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
