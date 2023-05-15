import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const Place = ({ place }) => {
  return (
    <Link href={`/places/${place?.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative pb-48 overflow-hidden">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            width={500}
            height={500}
            src={place?.image}
            alt={place?.name}
            priority={false}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {place?.name}
          </h3>
          <p className="text-sm font-medium text-gray-500">
            {place?.city?.name}
          </p>
          <p className="text-sm font-medium text-gray-500">
            {place?.priceByNight}€/night
          </p>
        </div>
      </div>
    </Link>
  );
};

Place.propTypes = {
  place: PropTypes.object,
};

export default Place;
