import { useState } from 'react';
import { createCategory } from '../api/categories';

function CategoryForm({ onSave }) {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await createCategory(name);
            setSuccess('Category created successfully!');
            setName('');
            if (onSave) onSave();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Categorías</h1>
            <div className="card" style={{ maxWidth: '600px' }}>
                <h2>Agregar Nueva Categoría</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message" style={{ color: '#01b574', marginBottom: '20px', padding: '10px', backgroundColor: 'rgba(1, 181, 116, 0.1)', borderRadius: '8px' }}>{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre de Categoría</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="ej. Electrónica"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-primary">Crear Categoría</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryForm;
