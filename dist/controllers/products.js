"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const supabase_1 = require("../config/supabase");
const getProducts = async (req, res) => {
    try {
        const { data, error } = await supabase_1.supabase
            .from('products')
            .select('*, categories(name)');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase_1.supabase
            .from('products')
            .select('*, categories(name)')
            .eq('id', id)
            .single();
        if (error)
            throw error;
        if (!data)
            return res.status(404).json({ error: 'Product not found' });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const { code, name, price, stock, category_id } = req.body;
        const { data, error } = await supabase_1.supabase
            .from('products')
            .insert([
            { code, name, price, stock, category_id }
        ])
            .select();
        if (error)
            throw error;
        res.status(201).json(data[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createProduct = createProduct;
