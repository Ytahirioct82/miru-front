import React from "react";
import "./searchActivity.css";
import "./allActivities.css";

/* Handles the user's selection from the All cities dropdown menu. 
on change it triggers handleCityChange function, passing the users selected city as an argument. 
This allows the parent component to update the selected city and perform any desired actions.*/

function SearchByCity({ handleCityChange, cityOptions }) {
  const handleDropDown = (event) => {
    handleCityChange(event);
  };

  return (
    <div className="cat-Filter">
      <label htmlFor="cityDropdown" className="dropdown-label">
        Choose City
      </label>

      <div className="cat-heading">
        <select onChange={handleDropDown}>
          {cityOptions.map((city, i) => (
            <option key={i} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchByCity;
