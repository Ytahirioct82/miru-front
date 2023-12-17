import React from "react";
import { Link } from "react-router-dom";
import "../Activities/allActivities.css";
import { useState, useEffect } from "react";
import { instance } from "../../helpers/api";

const ActivityCard = ({ activity }) => {
  const { id, name, city } = activity;

  const [image, setImage] = useState({});

  useEffect(() => {
    instance
      .get(`/activities/${activity.id}/images`)
      .then((response) => {
        setImage(response.data[0]);
      })
      .catch((error) => console.log("catch".error));
  }, [id, activity.id]);

  return (
    <div className="Post">
      <Link to={`/Activity/${id}`}>
        <img className="post-picture" src={image.content} alt={name} width="300" height="300"></img>
        <h2>{name}</h2>
        <p>{city}</p>
      </Link>
    </div>
  );
};

export default ActivityCard;
