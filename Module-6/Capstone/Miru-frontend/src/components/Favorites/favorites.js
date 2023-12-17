import { useContext, React } from "react";
import { instance } from "../../helpers/api";
import ActivityCard from "../DetailPage/activityCard";
import { UserContext } from "../Contexts/UserContext";

function Favorites() {
  const { favorites, setFavorites } = useContext(UserContext);

  const handleFav = (event) => {
    instance
      .delete(`/activities/${event.target.id}/favorites`)
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const result = favorites.map((fav) => {
    return (
      <div key={fav.id}>
        <div className="deleteFav">
          <button className="btn" onClick={handleFav}>
            <i className="fa fa-trash" id={fav.activity_id}>
              {" "}
              Trash
            </i>
          </button>
        </div>
        <ActivityCard activity={fav} />
      </div>
    );
  });

  return <div className="AllPosts">{result}</div>;
}
export default Favorites;
