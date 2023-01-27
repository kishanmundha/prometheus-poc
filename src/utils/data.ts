import uuid from 'react-native-uuid';

export interface Position {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  lat: number;
  lng: number;
  name: string;
}

const STORAGE_KEY = 'prometheus_poc';

export function getLocations(): Location[] {
  const dataStr = localStorage.getItem(STORAGE_KEY);

  if (!dataStr) {
    return [];
  }

  return JSON.parse(dataStr);
}

export function getLocation(id: string): Location | null {
  const locations = getLocations();
  return locations.find(x => x.id === id) || null;
}

export function addLocation(location: Omit<Location, 'id'>) {
  const locations = getLocations();

  locations.push({
    ...location,
    id: uuid.v4() as string,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
}

export function removeLocation(id: string) {
  const locations = getLocations();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(locations.filter(x => x.id !== id))
  );
}

export function updateLocation(id: string, location: Omit<Location, 'id'>) {
  const locations = getLocations();

  const index = locations.findIndex(x => x.id === id);

  if (index !== -1) {
    locations[index] = {
      ...location,
      id,
    };
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
}
