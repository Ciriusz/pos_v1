import { useState, useEffect } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../api/products';
import ProductForm from './ProductForm';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                loadProducts();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsFormVisible(true);
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setIsFormVisible(true);
    };

    const handleSave = async (productData) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
            } else {
                await createProduct(productData);
            }
            setIsFormVisible(false);
            setEditingProduct(null);
            loadProducts();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setEditingProduct(null);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Productos</h1>
                <button className="btn-primary" onClick={handleCreate}>+ Agregar Producto</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {isFormVisible ? (
                <ProductForm
                    product={editingProduct}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <div className="card">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Categoría</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td><span style={{ fontWeight: '700' }}>{product.code}</span></td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>
                                            <span style={{
                                                color: product.stock < 10 ? '#ee5d50' : '#01b574',
                                                fontWeight: '700'
                                            }}>
                                                {product.stock} un.
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                backgroundColor: '#f4f7fe',
                                                color: '#2b3674',
                                                fontSize: '12px',
                                                fontWeight: '700'
                                            }}>
                                                {product.categories?.name || '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-action btn-edit" onClick={() => handleEdit(product)}>Editar</button>
                                            <button className="btn-action btn-delete" onClick={() => handleDelete(product.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
