import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Image from "next/image";
import PropTypes from "prop-types";

export default function Details({places}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {id} = router.query;
  const [place, setPlace] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`/api/places/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlace(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <Container className="flex min-h-[calc(100vh-100px)] flex-col max-w-7xl mx-auto px-4">
      <Image
        className="h-96 w-full object-cover mb-4"
        width={500}
        height={500}
        src={place?.image}
        alt={place?.name}
        priority={false}
      />
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex-grow">
          <h2 className="text-2xl font-bold">{place?.name}</h2>
          <p className="text-sm font-medium text-gray-500">
            {place?.city?.name}
          </p>
          <p className="text-sm font-medium text-gray-500">
            {place?.priceByNight}€/night
          </p>
          <p className="text-sm font-medium text-gray-500">
            {place.description}
          </p>
        </div>
        <div className="w-80">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center p-4">
              <Image
                className="h-10 w-10 rounded-full"
                width={100}
                height={100}
                src={place?.host?.avatar}
                alt={place?.host?.name}
                priority={false}
              />
              <h3 className="text-lg font-medium text-gray-900 ml-2 truncate">
                {place?.host?.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
Details.propTypes = {
  places: PropTypes.array,
};
