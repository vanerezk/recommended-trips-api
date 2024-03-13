import "./App.css";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import UserProfile from "./pages/userProfile/UserProfile";
import Login from "./pages/Login/Login";
import Recommendations from "./pages/recommendations/Recommendations";
import Register from "./pages/Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Navbarx from "./components/NavBar/Navbarx";
import ExpandedRecommendation from "./pages/expandedRecommendation/ExpandedRecommendation";
import Footer from "./components/Footer/Footer";
import CreateRecommendation from "./pages/createRecommendation/CreateRecommendation";
import EditRecommendation from "./pages/editRecommendation/EditRecommendation";
import EditProfile from "./pages/editProfile/EditProfile";
import AnotherUserProfile from "./components/AnotherUserProfile/AnotherUserProfile";

function App() {
  return (
    <main className="App">
      <Navbarx />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/user"
          element={<UserProfile />}
        />
        <Route
          path="/user/:id"
          element={<EditProfile />}
        />
        <Route
          path="/profile/:id"
          element={<AnotherUserProfile />}></Route>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/recommendations"
          element={<Recommendations />}
        />
        <Route
          path="/recommendations/:id"
          element={<ExpandedRecommendation />}
        />
        <Route
          path="/create-recommendation"
          element={<CreateRecommendation />}
        />
        <Route
          path="/edit-recommendations/:id"
          element={<EditRecommendation />}
        />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
