import React, { useState } from "react";
import { Rating } from "@mui/material";
//This is rating component imported from material UI used for user ratings.
const RatingComponent = ({ value: initValue, onChange }) => {
  const [value, setValue] = React.useState(initValue);
  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };
  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={handleRatingChange}
    />
  );
};

export default RatingComponent;
