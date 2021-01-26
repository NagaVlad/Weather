import './styles/styles.css'
import './styles/styles.scss'
import { correctTime, correctDate, transformDate, showTime } from './dateTime.js'
import { mapInit, getLatLng } from './map.js'
import { changeControlLang } from './changeControlLang.js'
import { transforMinut } from './transforMinut.js'
import { savetoLocalStorage, savetoLocalStorage2 } from './localStorage.js'
import { getBgImg } from './background.js'
import { threeDays } from './weatherThreeDays.js'
import { token, apiKey, accessKey } from './tokens.js'
import { blockWeatherToDay, blockWatherThreeDays, blockGeolocation } from './state.js'

let startLocation = null, coordinates = '', coordinatesCity = null, unit = true, lang = true, searchCity = null
let interval = ''
document.querySelector('#btnSearch').addEventListener('click', (e) => {
   searchCity = document.querySelector('#search').value
   newCity(searchCity, coordinates, coordinatesCity)
   init2()
})

document.querySelector('#unit').addEventListener('click', (e) => {
   unit = !unit
   savetoLocalStorage2(unit)
   init2()
})

document.querySelector('#lang').addEventListener('click', (e) => {
   lang = !lang
   savetoLocalStorage(lang)
   init2()
})

document.querySelector('#bg').addEventListener('click', (e) => {
   getBgImg(accessKey)
})

document.querySelector('#back').addEventListener('click', (e) => {
   ip()
   newCity(searchCity, coordinates, coordinatesCity)
   init()
})

async function main() {
   let location = await fetch(`https://ipinfo.io/json?token=${token}`,
      {
         headers: {
            host: 'ipinfo.io',
            origin: 'https://flamboyant-rosalind-326379.netlify.app'
         }
      })
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )

   console.log(location);

   let cityFromApi = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location.city}&key=2d4dd65ac76a49cd8dffa74cab0fd692&pretty=1&no_annotations=1`,
      {
         headers: {
            host: 'api.opencagedata.com',
            origin: 'https://flamboyant-rosalind-326379.netlify.app'
         }
      })
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )

   if (startLocation === null) {
      await ip()
   }

   let threeDays = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${coordinates}&days=${3}`,
      {
         headers: {
            host: 'api.weatherapi.com',
            origin: 'https://flamboyant-rosalind-326379.netlify.app'
         }
      })
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )

   let newCitys = cityFromApi.results[0].components.city
   let rus = cityFromApi.results[0].components.country
   let eng = threeDays.location.country

   let res = {
      location,
      threeDays,
      newCitys,
      rus,
      eng
   }
   return res
}

async function init() {
   interval = clearInterval(interval)
   let result = await main()
   var newDate = new Date(result.threeDays.location.localtime)
   let latLng = getLatLng(result)
   mapInit(latLng)

   newDate.setSeconds(new Date().getSeconds())
   newDate.setMinutes(new Date().getMinutes())
   if (lang == true) {
      blockWeatherToDay.classList.add('blocks__today')
      blockWatherThreeDays.classList.add('next__info')
      blockWeatherToDay.innerHTML = `
      <h1>Погода сегодня</h1>
      <div class='today1'>
      <div class='today2'>
      <p>Страна: ${lang ? result.threeDays.location.country : result.threeDays.location.country}</p>
      <p>Город: ${coordinatesCity == null ? result.newCitys : coordinatesCity}</p>

      <p class='timeee'>Время: ${correctTime(newDate)}</p>
      <p>Дата: ${correctDate(newDate, lang)}</p>
      </div>
      <div class="today2">
      <p>Температура : ${unit ? result.threeDays.current.temp_c + `°C` : result.threeDays.current.temp_f + `°F`}</p>
      <p>Ощущается : ${unit ? result.threeDays.current.feelslike_c + `°C` : result.threeDays.current.feelslike_f + `°F`}</p>
      <p>Влажность : ${result.threeDays.current.humidity} %</p>
      <p>Скорост ветра : ${result.threeDays.current.wind_mph} м/с</p>
      <img src=${threeDays(result)[12]} alt="альтернативный текст">
      </div>
      </div>
      `
      blockWatherThreeDays.innerHTML = `
      <div class="info__column">
      <div class="newRow"><h1>Погода на 3 дня</h1></div>
      <div class="info__day">
      <div class="day__weather">
      <p>Дата: ${correctDate(transformDate(threeDays(result)[0]), lang)} 2021</p>
      <p>Температура: ${unit ? threeDays(result)[1] + ` °С` : threeDays(result)[2] + ` °F`} </p>
      <img src=${threeDays(result)[3]} alt="альтернативный текст">
      </div>
      </div>
      <div class="info__day">
      <div class="day__weather">
      <p>Дата: ${correctDate(transformDate(threeDays(result)[4]), lang)} 2021</p>  
      <p>Температура: ${unit ? threeDays(result)[5] + ` °С` : threeDays(result)[6] + ` °F`} </p>
      <img src=${threeDays(result)[7]} alt="альтернативный текст">
      </div>
      </div>
      <div class="info__day">
      <div class="day__weather">
      <p>Дата: ${correctDate(transformDate(threeDays(result)[8]), lang)} 2021</p>
      <p>Температура: ${unit ? threeDays(result)[9] + ` °С` : threeDays(result)[10] + ` °F`} </p>
      <img src=${threeDays(result)[11]} alt="альтернативный текст">
      </div>
      </div>
      </div>
      `
      blockGeolocation.innerHTML = `
      <h1>Геолокация</h1>
      <p>Координаты: ${transforMinut(coordinates, lang)}</p>`
      document.querySelector('.today__title').after(blockWeatherToDay)
      document.querySelector('.next__title').after(blockWatherThreeDays)
      document.querySelector('#map').before(blockGeolocation)
   } else {
      blockWeatherToDay.classList.add('blocks__today')
      blockWatherThreeDays.classList.add('next__info')
      blockWeatherToDay.innerHTML = `
      <h1>Wheater today</h1>
      <div class='today1'>
      <div class='today2'>
      <p>Country: ${lang ? result.rus : result.threeDays.location.country}</p>
      <p>City: ${coordinatesCity == null ? result.newCitys : coordinatesCity}</p>
     
      <p class='timeee'>Time: ${correctTime(newDate)}</p>
      <p>Date: ${correctDate(newDate, lang)}</p>
      </div>
      <div class="today2">
      <p>Temperature : ${unit ? result.threeDays.current.temp_c + ` °С` : result.threeDays.current.temp_f + ` °F`} </p>
      <p>Feels : ${unit ? result.threeDays.current.feelslike_c + ` °С` : result.threeDays.current.feelslike_f + ` °F`} </p>
      <p>Humidity : ${result.threeDays.current.humidity} %</p>
      <p>Wind : ${result.threeDays.current.wind_mph} m/s</p>
      <img src=${threeDays(result)[12]} alt="альтернативный текст">
      </div>
      </div>
      `
      blockWatherThreeDays.innerHTML = `
      <div class="info__column">
      <div class="newRow"><h1>Weather for three day</h1></div>
      <div class="info__day">
      <div class="day__weather">
      <p>Date: ${correctDate(transformDate(threeDays(result)[0]), lang)}</p>
      <p>Temperature: ${unit ? threeDays(result)[1] + ` °С` : threeDays(result)[2] + ` °F`} </p>
      <img src=${threeDays(result)[3]} alt="альтернативный текст">
      </div>
      </div>
      <div class="info__day">
      <div class="day__weather">
      <p>Date: ${correctDate(transformDate(threeDays(result)[4]), lang)}</p>  
      <p>Temperature: ${unit ? threeDays(result)[5] + ` °С` : threeDays(result)[6] + ` °F`} </p>
      <img src=${threeDays(result)[7]} alt="альтернативный текст">
      </div>
      </div>
      <div class="info__day">
      <div class="day__weather">
      <p>Date: ${correctDate(transformDate(threeDays(result)[8]), lang)}</p>
      <p>Temperature: ${unit ? threeDays(result)[9] + ` °С` : threeDays(result)[10] + ` °F`} </p>
      <img src=${threeDays(result)[11]} alt="альтернативный текст">
      </div>
      </div>
      </div>
      `
      blockGeolocation.innerHTML = `
      <h1>Geolocation</h1>
      <p>Coordinates: ${transforMinut(coordinates, lang)}</p>`
      document.querySelector('.today__title').after(blockWeatherToDay)
      document.querySelector('.next__title').after(blockWatherThreeDays)
      document.querySelector('#map').before(blockGeolocation)
   }
   showTime(result, interval, lang)
}

async function init2() {
   lang = localStorage.getItem('locper')
   if (lang == 'false') {
      lang = false
   } else {
      lang = true
   }

   unit = localStorage.getItem('locper2')
   if (unit == 'false') {
      unit = false
   } else {
      unit = true
   }

   changeControlLang(lang)
   await init()
}

init2()

async function newCity(name) {
   let seacrhGeo = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${name}&key=2d4dd65ac76a49cd8dffa74cab0fd692&pretty=1&no_annotations=1`, {
      headers: {
         host: 'api.opencagedata.com',
         origin: 'https://flamboyant-rosalind-326379.netlify.app'
      }
   })
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )
   coordinates = `${seacrhGeo.results[0].geometry.lat},${seacrhGeo.results[0].geometry.lng}`
   coordinatesCity = `${seacrhGeo.results[0].components.city}`
   return seacrhGeo
}

async function ip() {
   let location = await fetch(`https://ipinfo.io/json?token=${token}`, {
      headers: {
         host: 'ipinfo.io',
         origin: 'https://flamboyant-rosalind-326379.netlify.app'
      }
   })
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )
   coordinates = location.loc
   startLocation = location.loc
   coordinatesCity = location.city
   newCity(coordinatesCity)
}




















