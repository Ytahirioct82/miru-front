import { React, useContext } from "react";
import { instance } from "../../helpers/api";
import ActivityCard from "../DetailPage/activityCard";
import { UserContext } from "../Contexts/UserContext";

const Content = () => {
  const { setFavorites } = useContext(UserContext);
  const { activities } = useContext(UserContext);

  const handleFav = (event) => {
    //on clicking the heart icon button, if className is notFav, it posts the activity to the
    //users favorites table in the database and calls the load() func to render the changes.
    if (event.target.name === "notFav") {
      instance
        .post(`/activities/${event.target.id}/favorites`)
        .then((response) => {
          setFavorites(response.data);
        })
        .catch((error) => {
          console.warn(error);
        });
      //on clicking the heart icon button, if className is fav, it deletes the activity from the
      //users favorites table in the database and calls the load() func to render the changes.
    } else {
      instance
        .delete(`/activities/${event.target.id}/favorites`)
        .then((response) => {
          // load();
          setFavorites(response.data);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  };

  return (
    // map and check if current activity exist in user favorites.
    <>
      {activities.map((activity) => {
        return (
          //if current activity exist in user favorites a className of fav is set to the heart icon button
          // else if it doesn't a className of notFav is set to the  heart icon button.

          <div key={activity.id} className={activity.is_favorite ? "fav" : "notFav"}>
            <button
              className="fa fa-heart"
              id={activity.id}
              name={activity.is_favorite ? "fav" : "notFav"}
              onClick={handleFav}
            ></button>
            <ActivityCard activity={activity} />
          </div>
        );
      })}
    </>
  );
};

export default Content;
