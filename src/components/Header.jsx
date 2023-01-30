import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export const Header = ({ user }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/categories`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <header className='d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'>
                <Link
                    to='/'
                    className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none'
                >
                    <span className='fs-4'>Logo</span>
                </Link>
                <ul className='nav nav-pills'>
                    <li className='nav-item'>
                        <Link to='/' className='nav-link'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <NavDropdown title='Articles' menuVariant='light'>
                            <NavDropdown.Item as={Link} to='/articles'>
                                All
                            </NavDropdown.Item>
                            {categories.map((category) => {
                                return (
                                    <NavDropdown.Item as={Link} to={`/articles/cat/${category.id}`}>
                                        {category.title}
                                    </NavDropdown.Item>
                                );
                            })}
                        </NavDropdown>
                    </li>
                    <li className='nav-item'>
                        <Link to='/categories' className='nav-link'>
                            Categories
                        </Link>
                    </li>
                    <li className='nav-item'>
                        {user ? (
                            <Link to='/signout' className='nav-link'>
                                Sign Out
                            </Link>
                        ) : (
                            <Link to='/login' className='nav-link'>
                                Log In
                            </Link>
                        )}
                    </li>
                </ul>
            </header>
        </>
    );
};
