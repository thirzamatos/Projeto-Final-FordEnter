export interface Vehicle {
  id: number;
  vehicle: string;
  vin: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

export interface SelectedVehicleData {
  id: number;
  vehicle: string;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}
