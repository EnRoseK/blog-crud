import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SingleArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-3">{article.title}</h1>
      <img src={article.imageUrl} style={{ maxWidth: "60%" }} />
      <p className="mt-5">{article.text}</p>
    </div>
  );
};
