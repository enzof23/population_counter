/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_MAPS_API_KEY: string;
      REACT_APP_WORLDGEO_API: string;
    }
  }
}

export {};
