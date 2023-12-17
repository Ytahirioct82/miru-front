import "./app.css";
import { React } from "react";
import { Route, Routes } from "react-router-dom";
import AllActivities from "./components/Activities/allActivities";
import Activity from "./components/DetailPage/activity";
import NewPost from "./components/NewListing/newPost";
import EditPost from "./components/EditPage/editPost";
import Navbar from "./components/Nav/navbar";
import UserLogin from "./components/UserLogin/userLogin";
import UserRegistration from "./components/UserRegistration/userRegistration";
import MyListings from "./components/MyListings/myListings";
import Footer from "./components/Footer/footer";
import Favorites from "./components/Favorites/favorites";
import { UserContextProvider } from "./components/Contexts/UserContext";

function App() {
  return (
    <div>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<AllActivities />} />
          <Route path="/activity/login" element={<UserLogin />} />
          <Route path="/activity/registration" element={<UserRegistration />} />
          <Route path="/activity/listings" element={<MyListings />} />
          <Route path="/activity/favorites" element={<Favorites />} />
          <Route path="/activity/:id" element={<Activity />} />
          <Route path="/activity/new" element={<NewPost />} />
          <Route path="/activity/:id/edit" element={<EditPost />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </div>
  );
}

export default App;
