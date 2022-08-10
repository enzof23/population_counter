import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useCoordinatesContext } from "../../CoordinatesContext";
import { fetchPopulation, getNextPage } from "../../fetchPopulation";
import { PrettoSlider } from "./styles";
import { Loading } from "../Loading";

interface City {
  name: string;
  population: number;
  lat: number;
  lng: number;
}

const baseUrl = "https://world-geo-data.p.rapidapi.com";

export const Sidebar = () => {
  const { latitude, longitude, radius, setRadius, setLatitude, setLongitude } =
    useCoordinatesContext();

  const [loading, setLoading] = useState<boolean>(false);

  const [cities, setCities] = useState<City[]>([]);
  const [population, setPopulation] = useState<number>(0);

  const handleSliderChange = (e: any) => {
    setRadius(e.target.value);
  };

  const getPopulation = async () => {
    setLoading(true);
    setCities([]);
    setPopulation(0);

    const data = await fetchPopulation({
      lat: latitude,
      lng: longitude,
      rad: radius,
    });

    if (data.total_pages > 1) {
      mapThroughPages(data);

      console.log("more");
    } else {
      const citiesArr = mapCities(data.cities);
      setCities(citiesArr);
      setLoading(false);
    }
  };

  const mapCities = (cities: any) => {
    return cities.map((city: any) => ({
      name: city.name,
      population: city.population,
      lat: city.latitude,
      lng: city.longitude,
    }));
  };

  const mapThroughPages = async (data: any) => {
    if (data.page !== data.total_pages) {
      const citiesArr = mapCities(data.cities);
      setCities((prevCities) => [...prevCities, ...citiesArr]);

      const newPageData = await getNextPage(`${baseUrl}${data.links.next}`);
      setTimeout(() => mapThroughPages(newPageData), 1200);
    } else {
      const citiesArr = mapCities(data.cities);
      setCities((prevCities) => [...prevCities, ...citiesArr]);
      setLoading(false);
    }
  };

  const calculateTotalPopulation = () => {
    setPopulation(0);
    return cities.forEach((city) => {
      return setPopulation((prevPop) => prevPop + city.population);
    });
  };

  useEffect(() => {
    calculateTotalPopulation();
    //eslint-disable-next-line
  }, [cities]);

  const answerDisplay = (
    <div className="flex flex-col justify-center gap-y-5 items-center">
      <p className="text-5xl text-lime-500">{cities.length}</p>
      <p>cities were found</p>
      <p>for a total population of</p>
      <p className="text-5xl text-lime-500">{population}</p>
    </div>
  );

  return (
    <div
      className="flex flex-col gap-y-10 items-center justify-around py-10 px-2 w-2/6 min-w-200 bg-slate-50"
      style={{ minWidth: "350px", maxWidth: "500px" }}
    >
      <div className="flex flex-col items-center justify-around gap-y-12 w-full">
        <p className="text-xl font-semi-bold text-center">
          Click on the map or enter coordinates below
        </p>
        <div className="w-full flex justify-center">
          <TextField
            value={latitude}
            label="latitude"
            sx={{ width: "90%" }}
            onChange={(e) => setLatitude(parseFloat(e.currentTarget.value))}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <TextField
            value={longitude}
            label="longitude"
            sx={{ width: "90%" }}
            onChange={(e) => setLongitude(parseFloat(e.currentTarget.value))}
          />
        </div>
        <div className="w-full px-5 flex flex-col items-center">
          <div className="text-lg font-semi-bold">Radius: {radius}km</div>

          <PrettoSlider
            onChange={(e) => handleSliderChange(e)}
            defaultValue={25}
            min={5}
            max={100}
            step={5}
          />
          <div className="w-full max-w-sm flex justify-between">
            <p className="text-sm text-slate-400">5km</p>
            <p className="text-sm text-slate-400">100km</p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button variant="contained" onClick={getPopulation}>
            Count
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center  rounded-xl border-solid border  w-11/12 h-5/6">
        {loading ? (
          <Loading />
        ) : population === 0 ? (
          "Press 'Count' button to get started !"
        ) : (
          answerDisplay
        )}
      </div>
    </div>
  );
};
