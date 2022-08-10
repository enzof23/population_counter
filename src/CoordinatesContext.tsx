import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type UseStateNumberType = React.Dispatch<SetStateAction<number>>;

type CoordinatesContextType = {
  latitude: number;
  setLatitude: UseStateNumberType;
  longitude: number;
  setLongitude: UseStateNumberType;
  radius: number;
  setRadius: UseStateNumberType;
};

const CoordinatesContext = createContext({} as CoordinatesContextType);

export const CoordinatesProvider = ({ children }: { children: ReactNode }) => {
  const [latitude, setLatitude] = useState<number>(48.86);
  const [longitude, setLongitude] = useState<number>(2.34);
  const [radius, setRadius] = useState<number>(25);

  return (
    <CoordinatesContext.Provider
      value={{
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        radius,
        setRadius,
      }}
    >
      {children}
    </CoordinatesContext.Provider>
  );
};

export const useCoordinatesContext = () => useContext(CoordinatesContext);
