export function threeDays(data) {
   let forecastThreeDays = [];
   for (let i = 0; i < 3; i++) {
      forecastThreeDays.push(data.threeDays.forecast.forecastday[i].date)
      forecastThreeDays.push(data.threeDays.forecast.forecastday[i].day.avgtemp_c)
      forecastThreeDays.push(data.threeDays.forecast.forecastday[i].day.avgtemp_f)
      forecastThreeDays.push(data.threeDays.forecast.forecastday[i].day.condition.icon)
   }
   forecastThreeDays.push(data.threeDays.current.condition.icon);
   return forecastThreeDays
}