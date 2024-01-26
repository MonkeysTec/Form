import {
    createContext,
    useState,
    useContext,
    ReactNode,
} from 'react';

type SessionStorageContextType = {
    sessionStorageData: { [key: string]: any };
    saveToSessionStorage: (key: string, value: any) => void;
    getFromSessionStorage: (key: string) => any;
    removeFromSessionStorage: (key: string) => void;
};

const SessionStorageContext = createContext<SessionStorageContextType | undefined>(
    undefined
);

type SessionStorageProviderProps = {
    children: ReactNode;
};

const SessionStorageProvider = ({ children }: SessionStorageProviderProps) => {
    const [sessionStorageData, setSessionStorageData] = useState<{ [key: string]: any }>(
        {}
    );

    const saveToSessionStorage = (key: string, value: any) => {

        setSessionStorageData((prevData) => {
            const newData = { ...prevData, [key]: value };
            sessionStorage.setItem(key, JSON.stringify(value));
            return newData;
        });
    };

    const getFromSessionStorage = (key: string) => {
        const storedData = sessionStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    };

    const removeFromSessionStorage = (key: string) => {
        setSessionStorageData((prevData) => {
            const newData = { ...prevData };
            delete newData[key];
            sessionStorage.removeItem(key);
            return newData;
        });
    };

    const contextValue: SessionStorageContextType = {
        sessionStorageData,
        saveToSessionStorage,
        getFromSessionStorage,
        removeFromSessionStorage
    };

    return (
        <SessionStorageContext.Provider value={contextValue}>
            {children}
        </SessionStorageContext.Provider>
    );
};

const useSessionStorage = () => {
    const context = useContext(SessionStorageContext);
    if (!context) {
        throw new Error(
            'useSessionStorage must be used within a SessionStorageProvider'
        );
    }
    return context;
};

export { SessionStorageProvider, useSessionStorage };
