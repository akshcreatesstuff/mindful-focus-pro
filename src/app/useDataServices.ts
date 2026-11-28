import { useContext } from "react";
import { DataServicesContext } from "./DataServicesContext";

export function useDataServices() {
  return useContext(DataServicesContext);
}
