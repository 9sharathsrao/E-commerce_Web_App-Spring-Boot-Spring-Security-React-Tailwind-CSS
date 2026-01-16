import React, { useState, useEffect } from 'react';
import API from '../API';

const SellerDashboard = () => {
    const [categories, setCategories] = useState([]); 
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        imageLink: '',
        brand: '',
        category: '' // Changed from {id: ''} to a simple string
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get('/seller/category'); 
                if (response.data && response.data.data) {
                    setCategories(response.data.data);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            // Now sending the correct JSON structure to avoid "HttpMessageNotReadableException"
            await API.post('/seller/products', product);
            alert("Product submitted successfully!");
            setProduct({ name: '', description: '', price: '', stock: '', imageLink: '', brand: '', category: '' });
        } catch (err) {
            console.error("Submit Error:", err.response?.data);
            alert("Upload failed: " + (err.response?.data?.message || "Check Eclipse Console"));
        }
    };

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4 text-center">Seller Hub</h1>
            <form onSubmit={handleAddProduct} className="bg-white p-8 rounded-xl shadow-lg grid grid-cols-2 gap-6">
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold text-orange-600">Add New Product</h2>
                </div>
                
                <input type="text" placeholder="Product Name" className="p-3 border rounded shadow-sm outline-none" required
                    onChange={(e) => setProduct({...product, name: e.target.value})} value={product.name} />
                
                <input type="text" placeholder="Brand" className="p-3 border rounded shadow-sm outline-none" required
                    onChange={(e) => setProduct({...product, brand: e.target.value})} value={product.brand} />

                {/* Updated Category Dropdown to send ID/Name as a simple string */}
                <select className="p-3 border rounded shadow-sm outline-none bg-white" required value={product.category}
                    onChange={(e) => setProduct({...product, category: e.target.value})}>
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                
                <input type="number" step="0.01" placeholder="Price" className="p-3 border rounded shadow-sm outline-none" required
                    onChange={(e) => setProduct({...product, price: e.target.value})} value={product.price} />
                
                <input type="number" placeholder="Stock" className="p-3 border rounded shadow-sm outline-none" required
                    onChange={(e) => setProduct({...product, stock: e.target.value})} value={product.stock} />
                
                <input type="text" placeholder="Image URL" className="p-3 border rounded shadow-sm outline-none" required
                    onChange={(e) => setProduct({...product, imageLink: e.target.value})} value={product.imageLink} />
                
                <textarea placeholder="Description" className="col-span-2 p-3 border rounded shadow-sm h-32 outline-none" required
                    onChange={(e) => setProduct({...product, description: e.target.value})} value={product.description}></textarea>
                
                <button className="col-span-2 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-md">
                    Upload Product
                </button>
            </form>
        </div>
    );
};

export default SellerDashboard;