import React, { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import './ProductOverlay.css';

const PRODUCTS = [
    {
        id: 1,
        name: 'Urban Street Hoodie',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Vintage Denim Jacket',
        price: 129.50,
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Retro Graphic Tee',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Classic Cargo Pants',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Streetwear Beanie',
        price: 24.50,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop'
    }
];

export const ProductOverlay: React.FC = () => {
    const [activeProduct, setActiveProduct] = useState(PRODUCTS[0]);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return (
            <button className="show-products-btn glass-panel" onClick={() => setIsVisible(true)}>
                <ShoppingBag size={20} />
                <span>View Products</span>
            </button>
        );
    }

    return (
        <div className="product-card glass-panel animate-fade-in">
            <button className="close-btn" onClick={() => setIsVisible(false)}>
                <X size={16} />
            </button>

            <div className="product-image">
                <img src={activeProduct.image} alt={activeProduct.name} />
                <div className="featured-tag">FEATURED</div>
            </div>

            <div className="product-info">
                <h4>{activeProduct.name}</h4>
                <div className="price-row">
                    <span className="price">${activeProduct.price}</span>
                    <button className="btn-primary">Buy Now</button>
                </div>
            </div>

            <div className="product-list">
                {PRODUCTS.map(p => (
                    <div
                        key={p.id}
                        className={`product-thumb ${activeProduct.id === p.id ? 'active' : ''}`}
                        onClick={() => setActiveProduct(p)}
                    >
                        <img src={p.image} alt={p.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};
