import React from "react";
import {

  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
       
      }}
      showLabels
    >
      <BottomNavigationAction label="About" icon={<HomeIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="My Cards" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}

export default Footer;
