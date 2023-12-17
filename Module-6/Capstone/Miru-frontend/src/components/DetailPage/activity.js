import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../helpers/api";
import "./activity.css";
import Comments from "../Comments/comments";
import ActivityImages from "./activityImages";

function Activity() {
  const { id } = useParams();

  const [activity, setActivity] = useState([]);
  const [newImages, setImages] = useState([]);

  // get activities with specific id from data base in the back-end and sets it in the post state.
  useEffect(() => {
    instance
      .get(`/activities/${id}`)
      .then((response) => {
        // set the all activities data into the post state
        setActivity(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, [id]);

  return (
    <div>
      <section className="DetailPost">
        <div className="post">
          <h3>{activity.name}</h3>

          <ActivityImages activityId={id} newImages={newImages} />
          <div className="address">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.google.com/maps/place/${activity.street_address} ${activity.city} ${activity.state} ${activity.zip_code}`}
            >
              {activity.street_address}, {activity.city}, {activity.state}, {activity.zip_code}
            </a>
          </div>

          <p>{activity.description}</p>
        </div>
        <div className="modify">
          <h3>*Top comments from the United States*</h3>
          <Comments setImages={setImages} />
        </div>
      </section>
    </div>
  );
}

export default Activity;
