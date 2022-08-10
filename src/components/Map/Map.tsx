import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import { SpringSpinner } from "react-epic-spinners";
import { useCoordinatesContext } from "../../CoordinatesContext";

export const Map = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey });

  const { latitude, setLatitude, longitude, setLongitude, radius } =
    useCoordinatesContext();

  const handleClick = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setLatitude(lat);
    setLongitude(lng);
  };

  if (!isLoaded) return <SpringSpinner color="green" />;

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: latitude, lng: longitude }}
      mapContainerStyle={{ height: "100%", width: "100%" }}
      onClick={handleClick}
    >
      <CircleF
        center={{ lat: latitude, lng: longitude }}
        radius={radius * 1000}
        onClick={handleClick}
      />
      <MarkerF position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};
