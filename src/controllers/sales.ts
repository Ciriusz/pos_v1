import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getDailySales = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const { data, error } = await supabase
            .from('sales')
            .select(`
                *,
                sale_details (
                    *,
                    products (name)
                ),
                payment_methods (name)
            `)
            .gte('created_at', today.toISOString())
            .lt('created_at', tomorrow.toISOString())
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
