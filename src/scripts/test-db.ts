import { supabase } from '../config/supabase';

async function testConnection() {
    console.log('🔄 Iniciando prueba de conexión con Supabase...');

    try {
        // 1. Probar conexión básica
        const { data: categories, error: catError } = await supabase
            .from('categories')
            .select('*')
            .limit(5);

        if (catError) throw catError;

        console.log('✅ Conexión Exitosa!');
        console.log('📊 Categorías encontradas:', categories);

        // 2. Probar productos
        const { data: products, error: prodError } = await supabase
            .from('products')
            .select('*')
            .limit(5);

        if (prodError) throw prodError;

        console.log('📦 Productos encontrados:', products);

    } catch (error: any) {
        console.error('❌ Error en la prueba:', error.message);
    }
}

testConnection();
