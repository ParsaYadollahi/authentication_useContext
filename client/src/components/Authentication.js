import React, { useContext } from 'react';

// Utils
import { AuthContext } from './../utils/context';

export default function Authentication() {
    const authContext = useContext(AuthContext);

    const loginHandler = () => {
        // API CALLS TO SERVER

        // Response from server
        const userResponse = {
            token: 'abcdefghijklmnop12369420',
        };
        authContext.login(userResponse.token);
    };

    const logoutHandler = () => {
        authContext.logout();
    };

    return (
        <>
            {!authContext.isLoggedIn && (
                <button onClick={loginHandler} className='login'>
                    Login
                </button>
            )}
            {authContext.isLoggedIn && (
                <button onClick={logoutHandler} className='login'>
                    Logout
                </button>
            )}
        </>
    );
}
