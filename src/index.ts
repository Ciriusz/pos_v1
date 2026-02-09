import app from './app';
import { supabase } from './config/supabase';

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);

    // Test Supabase connection
    try {
        const { error } = await supabase.from('products').select('id').limit(1);
        if (error) throw error;
        console.log('✅ Conexión a Supabase exitosa');
    } catch (error: any) {
        console.error('❌ Error conectando a Supabase:', error.message);
    }
});
