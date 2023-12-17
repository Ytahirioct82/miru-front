import { useState, useEffect } from "react";
import { instance } from "../../helpers/api";
import ActivityCard from "../DetailPage/activityCard";
import { useNavigate } from "react-router-dom";
import "./myListings.css";

function MyListings() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    instance

      .get(`/user/listings`)

      .then((response) => {
        if (response) {
          setPosts(response.data);
        }
      })

      .catch((error) => {
        console.error("catch", error);
      });
  }, [navigate]);

  const myPosts = posts.map((post) => {
    return (
      <div key={post.id} className="userListing">
        <button
          onClick={() => {
            navigate(`/activity/${post.id}/edit`);
          }}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <ActivityCard activity={post} />
      </div>
    );
  });

  const result = myPosts.length ? (
    myPosts
  ) : (
    <div className="message">
      <h3>You have not posted any listings</h3>
    </div>
  );

  return <div className="userContainer">{result}</div>;
}

export default MyListings;
