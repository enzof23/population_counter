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
      "X-RapidAPI-Key": "6ffdf84ab9msh4b025dde10ca81cp10a1a7jsn60aa4765834e",
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
      "X-RapidAPI-Key": "6ffdf84ab9msh4b025dde10ca81cp10a1a7jsn60aa4765834e",
      "X-RapidAPI-Host": "world-geo-data.p.rapidapi.com",
    },
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => alert(err));
};
