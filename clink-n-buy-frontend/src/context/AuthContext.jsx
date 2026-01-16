import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // We now look for a 'user' object in storage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error("Error parsing saved user", error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (userData) => {
        // Save the entire object: { token, role, email }
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token); 
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = "#/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};