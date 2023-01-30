import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CreateArticle } from "../components/Article/CreateArticle";
import { DynamicModal } from "../components/DynamicModal";
import { EditArticle } from "../components/Article/EditArticle";

const ArticleCard = ({ article, removeArticle, showEditModal }) => {
  const deleteArticle = () => {
    axios
      .delete(`http://localhost:8000/articles/${article.id}`)
      .then((res) => removeArticle(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="col-4">
      <div className="card">
        <img
          src={article.imageUrl}
          className="card-img-top"
          alt={article.title}
        />
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.description}</p>
          <div className="d-flex justify-content-between">
            <Link to={`/articles/${article.id}`} className="btn btn-primary">
              Read More
            </Link>
            <div className="d-flex gap-1">
              <Button
                onClick={() => showEditModal(article)}
                variant="success"
                size="sm"
              >
                Edit
              </Button>
              <Button onClick={deleteArticle} variant="danger" size="sm">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { categoryId } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const modalClose = () => setModalShow(false);

  const submitArticle = (article) => {
    setArticles([...articles, article]);
    modalClose();
  };

  const updateArticle = (article) => {
    const newArticles = articles.map((curArticle) => {
      if (article.id === curArticle.id) return article;

      return curArticle;
    });

    setArticles(newArticles);
    modalClose();
  };

  const removeArticle = (id) => {
    const newArticles = articles.filter((article) => {
      if (article.id !== id) return article;
    });

    setArticles(newArticles);
  };

  const showAddModal = () => {
    setModalTitle(`Create Article`);
    setModalContent(<CreateArticle submitArticle={submitArticle} />);
    setModalShow(true);
  };

  const showEditModal = (article) => {
    setModalTitle(`Edit Article`);
    setModalContent(
      <EditArticle article={article} updateArticle={updateArticle} />
    );
    setModalShow(true);
  };

  useEffect(() => {
    let dataUrl = `http://localhost:8000/articles`;

    if (categoryId)
      dataUrl = `http://localhost:8000/articles/categories/${categoryId}`;

    axios
      .get(dataUrl)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, [categoryId]);

  return (
    <div className="row g-3">
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={showAddModal}>Create</Button>
      </div>
      {articles.map((article, index) => {
        return (
          <ArticleCard
            key={`article-${index}`}
            article={article}
            removeArticle={removeArticle}
            showEditModal={showEditModal}
          />
        );
      })}

      <DynamicModal
        title={modalTitle}
        content={modalContent}
        handleClose={modalClose}
        show={modalShow}
      />
    </div>
  );
};
