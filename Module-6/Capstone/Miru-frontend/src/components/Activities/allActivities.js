import { useState, useEffect, useContext } from "react";
import Content from "./content";
import { getActivities } from "../api/getActivities";
import SearchByCategory from "./searchByCategory";
import SearchByCity from "./searchByCity";
import { getCityOptions } from "../api/getCityOptions";
import { getCategoryOptions } from "../api/getCategoryOptions";
import { UserContext } from "../Contexts/UserContext";
import { getFavorites } from "../api/getFavorites";
import { getUser } from "../api/getUser";

function AllActivities() {
  const [category, setCategory] = useState("1");
  const [city, setCity] = useState("1");

  // context hooks

  const { favorites, setFavorites } = useContext(UserContext);
  const { setUserValue } = useContext(UserContext);
  const { activities, setActivities } = useContext(UserContext);
  const { categoryOptions, setCategoryOptions } = useContext(UserContext);
  const { cityOptions, setCityOptions } = useContext(UserContext);

  useEffect(() => {
    getUser().then((userInfo) => {
      userInfo && setUserValue(userInfo);

      if (userInfo) {
        getFavorites().then((response) => {
          setFavorites(response);
        });
      } else {
        setFavorites([]);
      }
    });
  }, [favorites.length]);

  useEffect(() => {
    /* send Api request to get all Activities by criteria of city and category from database
    and sets it to the activities state.*/

    getActivities({ city, category }).then((activities) => {
      setActivities(activities);
    });
  }, [city, category, favorites.length]);

  useEffect(() => {
    /* send Api request to get all uniq cities then stores them in cityOptions state.*/
    getCityOptions().then((cities) => {
      setCityOptions(cities);
    });

    /* send Api request to get all uniq categories then stores them in categoryOptions state.*/
    getCategoryOptions().then((categories) => {
      setCategoryOptions(categories);
    });
  }, []);

  /* updates the category state with selected category value retrieved from the event object whenever 
  the user selects a category from the All categories dropdown menu.*/
  const handleCategoryChange = (selectedCat) => {
    setCategory(selectedCat.target.value);
  };
  /* updates the city state with selected city value retrieved from the event object whenever 
  the user selects a city from the cities dropdown menu.*/
  const handleCityChange = (selectedCity) => {
    setCity(selectedCity.target.value);
  };

  return (
    <>
      <section className="body">
        <section className="cat-search">
          <div className="cat">
            <SearchByCategory
              handleCategoryChange={handleCategoryChange}
              selected={category}
              categoryOptions={categoryOptions}
            />
          </div>
          <div className="search">
            <SearchByCity city={city} handleCityChange={handleCityChange} cityOptions={cityOptions} />
            {!activities.length && (
              <p className="not-found">{`Sorry, our App currently dose not have this category available in this city `}</p>
            )}
          </div>
        </section>
        <section className="AllPosts">
          <Content />
        </section>
      </section>
    </>
  );
}

export default AllActivities;
