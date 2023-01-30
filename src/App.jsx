import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Header } from "./components/Header";
import { Articles } from "./pages/Articles";
import { SingleArticle } from "./pages/SingleArticle";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<SingleArticle />} />
        <Route path="/articles/cat/:categoryId" element={<Articles />} />
      </Routes>
    </div>
  );
};

export default App;
