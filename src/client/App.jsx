import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';

import { Header } from './components/Header';
import { Home } from './components/Home';
import { User } from './components/User';
import { Movie } from './components/Movie';

import { TOKEN, URL } from './config';

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(TOKEN)) setIsLoggedIn(true);
    }, [isLoggedIn]);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {!isLoggedIn && (
                <Routes>
                    <Route
                        path={URL.REGISTER}
                        element={<User setIsLoggedIn={setIsLoggedIn} />}
                    />
                    <Route
                        path={URL.LOGIN}
                        element={<User setIsLoggedIn={setIsLoggedIn} />}
                    />
                    <Route 
                        path={URL.HOME} 
                        element={<Home />} 
                    />
                    <Route 
                        path={URL.NOT_FOUND}  
                        element={<Home />} 
                    />
                </Routes>
            )}
            {isLoggedIn && (
                <Routes>
                    <Route 
                        path={URL.MOVIES} 
                        element={<Movie />} 
                    />
                    <Route 
                        path={URL.HOME} 
                        element={<Home />} 
                    />
                    <Route 
                        path={URL.NOT_FOUND}  
                        element={<Home />} 
                    />
                </Routes>
            )}
        </div>
    );
};
