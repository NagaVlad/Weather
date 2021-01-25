import { data } from 'jquery'
import './styles/styles.css'
import './styles/styles.scss'
import { correctTime, correctDate, transformDate, showTime } from './dateTime.js'

// import { timer } from './dateTime.js'

import { mapInit, getLatLng } from './map.js'
import { changeControlLang } from './changeControlLang.js'
import { transforMinut } from './transforMinut.js'
import { savetoLocalStorage, savetoLocalStorage2 } from './localStorage.js'
import { getBgImg } from './background.js'
import { threeDays } from './weatherThreeDays.js'
import { token, apiKey, accessKey, secretKeyImg, apiKeyGeo } from './tokens.js'
import { infoLocation, infoLocation2, infoLocation3 } from './state.js'

let start = null, q = '', qCity = null, unit = true, lang = true, searchCity = null
let mmm = ''
document.querySelector('#btnSearch').addEventListener('click', (e) => {
   searchCity = document.querySelector('#search').value
   newCity(searchCity, q, qCity)
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
   newCity(searchCity, q, qCity)
   init()
})

async function main() {
   http://api.weatherapi.com/v1/forecast.json?key=08d6846f461f4edaa9a91251212101&q=59.9386,30.3141&days=3/https://flamboyant-rosalind-326379.netlify.app
   let location = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=08d6846f461f4edaa9a91251212101&q=59.9386,30.3141&days=3`)
      // let location = await fetch(`flamboyant-rosalind-326379.netlify.apphttps://ipinfo.io/json?token=efca0f8ab010de`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )

   let newCity2 = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location.city}&key=2d4dd65ac76a49cd8dffa74cab0fd692&pretty=1&no_annotations=1`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )

   if (start === null) {
      await ip()
   }

   let threeDays = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${q}&days=${3}`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )

   let newcity = newCity2.results[0].components.city
   let rus = newCity2.results[0].components.country
   let eng = threeDays.location.country

   let res = {
      location,
      threeDays,
      newcity,
      rus,
      eng
   }
   return res
}

async function init() {
   mmm = clearInterval(mmm)
   let result = await main()
   var newDate = new Date(result.threeDays.location.localtime)
   let latLng = getLatLng(result)
   mapInit(latLng)

   //*ОТКРЫТЬ ДЛЯ КАРТИНКИ document.body.style.background = `url(${result.bgImage.urls.regular})`//raw //thumb
   // document.body.style.background = `url(${result.bgImage.urls.regular})`//raw //thumb
   // console.log('ПРОГНОЗ НА 3 ДНЯ', threeDays(result));

   newDate.setSeconds(new Date().getSeconds())
   newDate.setMinutes(new Date().getMinutes())
   if (lang == true) {
      infoLocation.classList.add('blocks__today')
      infoLocation2.classList.add('next__info')
      infoLocation.innerHTML = `
      <h1>Погода сегодня</h1>
      <div class='today1'>
      <div class='today2'>
      <p>Страна: ${lang ? result.threeDays.location.country : result.threeDays.location.country}</p>
      <p>Город: ${qCity == null ? result.newcity : qCity}</p>

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
      infoLocation2.innerHTML = `
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
      infoLocation3.innerHTML = `
      <h1>Геолокация</h1>
      <p>Координаты: ${transforMinut(q, lang)}</p>`
      document.querySelector('.today__title').after(infoLocation)
      document.querySelector('.next__title').after(infoLocation2)
      document.querySelector('#map').before(infoLocation3)
   } else {
      infoLocation.classList.add('blocks__today')
      infoLocation2.classList.add('next__info')
      infoLocation.innerHTML = `
      <h1>Wheater today</h1>
      <div class='today1'>
      <div class='today2'>
      <p>Country: ${lang ? result.rus : result.threeDays.location.country}</p>
      <p>City: ${qCity == null ? result.newcity : qCity}</p>
     
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
      infoLocation2.innerHTML = `
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
      infoLocation3.innerHTML = `
      <h1>Geolocation</h1>
      <p>Coordinates: ${transforMinut(q, lang)}</p>`
      document.querySelector('.today__title').after(infoLocation)
      document.querySelector('.next__title').after(infoLocation2)
      document.querySelector('#map').before(infoLocation3)
   }

   // let uuu = document.querySelector('.timeee')
   // var newDate2 = new Date(result.threeDays.location.localtime)
   // let p = newDate2;
   // function timerr(time) {
   //    p.setSeconds(new Date().getSeconds())
   //    p.setMinutes(new Date().getMinutes())
   //    let h = time.getHours(),
   //       m = time.getMinutes(),
   //       s = time.getSeconds(),
   //       x = ''
   //    console.log(`${h}:${m < 10 ? "0" + m : "" + m}:${s < 10 ? `0${s}` : "" + s}`);
   //    if (lang) {
   //       uuu.innerHTML = `Время: ${h < 10 ? `0${h}` : `${h}`}:${m < 10 ? "0" + m : "" + m}:${s < 10 ? `0${s}` : "" + s} `
   //    } else {
   //       uuu.innerHTML = `Time: ${h < 10 ? `0${h}` : `${h}`}:${m < 10 ? "0" + m : "" + m}:${s < 10 ? `0${s}` : "" + s} `
   //    }
   // }


   // mmm = setInterval(() => {
   //    timerr(p)
   // }, 1000);

   showTime(result, mmm, lang)
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
   let seacrhGeo = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${name}&key=2d4dd65ac76a49cd8dffa74cab0fd692&pretty=1&no_annotations=1`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )
   q = `${seacrhGeo.results[0].geometry.lat},${seacrhGeo.results[0].geometry.lng}`
   qCity = `${seacrhGeo.results[0].components.city}`
   return seacrhGeo
}

async function ip() {
   let location = await fetch(`https://ipinfo.io/json?token=${token}`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )
   q = location.loc
   start = location.loc
   qCity = location.city
   newCity(qCity)
}


















