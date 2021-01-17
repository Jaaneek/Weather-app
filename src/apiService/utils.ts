import { WeatherDataResponse } from './interfaces';
export function findHumidityByHour(weatherGroup: WeatherDataResponse[], hour: number): number {
  return (
    weatherGroup.find((x) => {
      return new Date(x.dt_txt).getHours() > hour;
    })?.main.humidity || weatherGroup[0].main.humidity
  );
}

export function findTempByHour(weatherGroup: WeatherDataResponse[], hour: number): number {
  return (
    weatherGroup.find((x) => {
      return new Date(x.dt_txt).getHours() >= hour;
    })?.main.temp || weatherGroup[0].main.temp
  );
}

export function mode(arr: number[]) {
  return arr.sort((a, b) => arr.filter((v) => v === a).length - arr.filter((v) => v === b).length).pop();
}
export function sameDay(date1: string, date2: string) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}
export function getAvg(ar: number[]) {
  const total = ar.reduce((acc, c) => acc + c, 0);
  return total / ar.length;
}
