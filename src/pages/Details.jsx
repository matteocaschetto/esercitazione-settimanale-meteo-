import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WeatherDetails from "../components/WeatherDetails";

const Details = () => {
  const [city, setCity] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.city) {
      setCity(location.state.city);
    } else {
      const lastCity = localStorage.getItem("lastSearch");
      if (lastCity) {
        setCity(lastCity);
      }
    }
  }, [location]);

  return (
    <div>
      <WeatherDetails city={city} />
    </div>
  );
};

export default Details;
