import React, { createContext, useContext, useState } from 'react';

export type UserContextType = {
    name: string;
    email: string;
    token: string;
    phone: string;
    setName: (newState: string) => void;
    setEmail: (newState: string) => void;
    setToken: (newState: string) => void;
    setPhone: (newState: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const contextValue: UserContextType = {
        name,
        setName,
        email,
        setEmail,
        token,
        setToken,
        phone,
        setPhone,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserProvider = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserProvider must be used within a UserProvider');
    }
    return context;
};
