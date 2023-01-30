import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
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
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <span className="fs-4">Logo</span>
        </Link>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to="/" className="nav-link" aria-current="page">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/articles" className="nav-link">
              Articles
            </Link>
          </li>
          {categories.map((category) => {
            return (
              <li className="nav-item">
                <Link to={`/articles/cat/${category.id}`} className="nav-link">
                  {category.title}
                </Link>
              </li>
            );
          })}
          <li className="nav-item">
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};
