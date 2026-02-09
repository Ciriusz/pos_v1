export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    code: string;
    name: string;
    price: number;
    stock: number;
    category_id?: string;
    active: boolean;
    created_at: string;
}

export interface PaymentMethod {
    id: string;
    name: string;
}

export interface Sale {
    id: string;
    user_id: string;
    payment_method_id?: string;
    total: number;
    tax?: number;
    created_at: string;
}

export interface SaleDetail {
    id: string;
    sale_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
}
