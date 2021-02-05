import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Authentication from './components/Authentication';
import ProtectedPage from './components/ProtectedPage';

// Utils
import { AuthContext } from './utils/context';

let logoutTimer;

function App() {
    const [token, setToken] = useState(null);
    const [tokenExpirationTime, setTokenExpirationTime] = useState();

    const login = (token, expirationTime) => {
        setToken(token);
        const expiration =
            expirationTime || new Date(new Date().getTime() + 100 * 3600);
        setTokenExpirationTime(expiration);
        localStorage.setItem(
            'userDate',
            JSON.stringify({
                token,
                expirationTime: expiration.toISOString(),
            })
        );
    };

    const logout = () => {
        setToken(null);
        setTokenExpirationTime(null);
        localStorage.removeItem('userDate');
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));

        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(storedData.token, new Date(storedData.expirationTime));
        }
    }, [login]);

    useEffect(() => {
        if (token && tokenExpirationTime) {
            const remainingTime =
                tokenExpirationTime.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationTime]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token, // \!! converts is to a bool
                login: login,
                logout: logout,
            }}
        >
            <Authentication />
            <ProtectedPage />
        </AuthContext.Provider>
    );
}

export default App;
