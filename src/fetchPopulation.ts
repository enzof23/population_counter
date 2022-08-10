interface Coordinates {
  lat: number;
  lng: number;
  rad: number;
}

export const fetchPopulation = async ({ lat, lng, rad }: Coordinates) => {
  console.log("api fetch");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_WORLDGEO_API,
      "X-RapidAPI-Host": "world-geo-data.p.rapidapi.com",
    },
  };

  return fetch(
    `https://world-geo-data.p.rapidapi.com/cities/nearby?latitude=${lat}&longitude=${lng}&radius=${rad}&min_population=100&per_page=100`,
    options
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => alert(err));
};

export const getNextPage = async (url: string) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_WORLDGEO_API,
      "X-RapidAPI-Host": "world-geo-data.p.rapidapi.com",
    },
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => alert(err));
};
