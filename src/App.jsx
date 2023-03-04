import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login, Main, Navbar, Register, ArticleDetail, CreateArticle, EditArticle } from "./components";
import { useEffect } from "react";
import AuthService from "./service/auth";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./slice/auth";
import { getItem } from "./components/helpers/PersistanceStorage";

function App() {
  const dispatch = useDispatch();
  
  const getUser = async () => {
    try {
      const response = await AuthService.getUser();
      dispatch(signUserSuccess(response.user));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUser();
    }
   
  }, []);
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
          <Route path="/createArticle" element={<CreateArticle />} />
          <Route path="/editArticle/:slug" element={<EditArticle />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
