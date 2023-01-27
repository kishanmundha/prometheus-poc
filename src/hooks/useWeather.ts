import { LatLngLiteral } from 'leaflet';
import Config from '../config';
import { useAppQuery } from './useAppQuery';
import { useDidUpdate } from './useDidUpdate';

export interface WeatherData {
  timezone: string;
  currently?: {
    temperature: number;
    summary: string;
    icon: string;
    windSpeed: number;
    humidity: number;
  };
  minutely?: {
    summary: string;
  };
  hourly?: {
    summary: string;
  };
}

export function useWeather(
  position: LatLngLiteral | null,
  refreshInterval?: number | false
) {
  const {
    data,
    isLoading,
    refetch,
    isFetched,
    isError,
    isFetching,
    isInitialLoading,
    isRefetching,
  } = useAppQuery<WeatherData>(
    async () => {
      if (!position) {
        return null;
      }

      const response = await fetch(
        `http://prometheus-api.zkx.fi/${Config.APIKEY}/${position.lat},${position.lng}`
      );
      return await response.json();
    },
    { refetchInterval: refreshInterval || false }
  );

  useDidUpdate(() => {
    refetch();
  }, [position?.lat, position?.lng, refetch]);

  return {
    data,
    isLoading,
    refetch,
    isFetched,
    isError,
    isFetching,
    isInitialLoading,
    isRefetching,
  };
}
