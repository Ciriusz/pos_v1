const API_URL = '/api/sales';

export const getDailySales = async () => {
    const response = await fetch(`${API_URL}/daily`);
    if (!response.ok) throw new Error('Failed to fetch daily sales');
    return response.json();
};
