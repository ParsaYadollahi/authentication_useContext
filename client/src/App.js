import react, { useState } from 'react';
import './App.css';

// Components
import Authentication from './components/Authentication';
import ProtectedPage from './components/ProtectedPage';

// Utils
import { AuthContext } from './utils/context';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const login = () => {
        setLoggedIn(true);
    };

    const logout = () => {
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
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
