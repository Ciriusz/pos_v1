import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*');

        if (error) throw error;

        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const { data, error } = await supabase
            .from('categories')
            .insert([{ name }])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
