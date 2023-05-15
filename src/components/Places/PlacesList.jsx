import { useEffect, useState } from "react";
import Place from "./Place";
import PropTypes from "prop-types";

const PlacesList = ({ search }) => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    fetch("/api/places")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {places
        .filter(
          (place) =>
            place.name.toLowerCase().includes(search.toLowerCase()) || place.city.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((place) => (
          <Place key={place.id} place={place} />
        ))}
    </div>
  );
};

PlacesList.propTypes = {
  search: PropTypes.string,
};

export default PlacesList;
