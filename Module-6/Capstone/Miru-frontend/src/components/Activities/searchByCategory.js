import React from "react";
import "./searchActivity.css";
import "./allActivities.css";

/* Handles the user's selection from the categories dropdown menu. 
on change it triggers handleCategoryChange function, passing the users selected category as an argument. 
This allows the parent component to update the selected category and perform any desired actions.*/

const SearchByCategory = ({ handleCategoryChange, selected, categoryOptions }) => {
  const handleDropDown = (event) => {
    handleCategoryChange(event);
  };

  return (
    <div className="cat-Filter">
      <label htmlFor="categoryDropdown" className="dropdown-label">
        Choose Category
      </label>
      <div className="cat-heading">
        <select value={selected} onChange={handleDropDown}>
          {categoryOptions.map((category, i) => (
            <option key={i} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchByCategory;
