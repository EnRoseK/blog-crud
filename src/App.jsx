import { Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header';
import { Articles } from './pages/Articles';
import { SingleArticle } from './pages/SingleArticle';
import { Home } from './pages/Home';
import { useEffect, useState } from 'react';
import { LogIn } from './pages/LogIn';
import { LogInSuccess } from './pages/LogInSuccess';

const App = () => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            setUser(localStorage.getItem('user'));
        }
    }, [user]);

    console.log(user);

    return (
        <div className='container'>
            <Routes>
                <Route path='/login' element={<LogIn />} />
                <Route path='/login/success' element={<LogInSuccess />} />
                <Route
                    path='/*'
                    element={
                        <>
                            <Header user={user} />
                            <Routes>
                                <Route exact path='/' element={<Home />} />
                                <Route path='/articles' element={<Articles user={user} />} />
                                <Route path='/articles/:id' element={<SingleArticle />} />
                                <Route path='/articles/cat/:categoryId' element={<Articles user={user} />} />
                            </Routes>
                        </>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
