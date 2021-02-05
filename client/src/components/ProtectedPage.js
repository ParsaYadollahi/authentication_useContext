import React, { useContext } from 'react';

// Utils
import { AuthContext } from './../utils/context';

export default function ProtectedPage() {
    const authContext = useContext(AuthContext);

    return authContext.isLoggedIn && <h2>Protected resource</h2>;
}
