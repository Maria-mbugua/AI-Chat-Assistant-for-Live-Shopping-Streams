import React, { useState, useEffect } from 'react';
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
    },
    {
        id: 6,
        name: 'Cyberpunk Leather Jacket',
        price: 299.00,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 7,
        name: 'Premium Canvas Sneakers',
        price: 110.00,
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 8,
        name: 'Aviator Sunglasses',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1511499767390-90342f441ca9?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 9,
        name: 'Minimalist Leather Watch',
        price: 185.00,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 10,
        name: 'Oversized Silk Scarf',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop'
    }
];

export const ProductOverlay: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate featured product every 15 seconds to simulate a live showcase
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
        }, 15000);
        return () => clearInterval(timer);
    }, []);

    const activeProduct = PRODUCTS[currentIndex];

    return (
        <div className="product-card glass-panel animate-fade-in" key={activeProduct.id}>
            <div className="product-image">
                <img src={activeProduct.image} alt={activeProduct.name} />
            </div>

            <div className="product-info">
                <h4>{activeProduct.name}</h4>
                <div className="price-row">
                    <span className="price">${activeProduct.price}</span>
                </div>
            </div>
        </div>
    );
};
