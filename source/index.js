import { data } from 'jquery'
import './styles/styles.css'
import './styles/styles.scss'
import { correctTime, correctDate, transformDate } from './dateTime.js'
import { mapInit, getLatLng } from './map.js'
import { changeControlLang } from './changeControlLang.js'
import { transforMinut } from './transforMinut.js'
import { savetoLocalStorage, savetoLocalStorage2 } from './localStorage.js'

let start = null;

//* Результат блока
let infoLocation = document.createElement('div')
let infoLocation2 = document.createElement('div')
let infoLocation3 = document.createElement('div')

//Geolocation start
const token = 'efca0f8ab010de';

// Weather for three fay
const apiKey = '08d6846f461f4edaa9a91251212101'
let q = ''
let qCity = null
// Images API
const accessKey = 'ck5s7v_cYmqDic-L76jxDtX7oUZbkRUv7dQzzeM8o_A'
const secretKeyImg = 'KbKPyminoZLU6_rQnuWWwhO2XJXSQ2sRRIsF11tEr5U'

//GEO
const apiKeyGeo = '2d4dd65ac76a49cd8dffa74cab0fd692';



let unit = true;
let lang = true
// let lang = localStorage.getItem("locper")
// let lang = true



let searchCity = null

document.querySelector('#btnSearch').addEventListener('click', (e) => {
   searchCity = document.querySelector('#search').value
   newCity(searchCity)
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
   getBgImg()
})


document.querySelector('#back').addEventListener('click', (e) => {
   ip()
   newCity(searchCity)
   init()
})

async function main() {
   //*Начальное положение
   let location = await fetch(`https://ipinfo.io/json?token=${token}`)
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

   //*Погода сейчас и на 3 дня
   let threeDays = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${q}&days=${3}`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )

   let newcity = newCity2.results[0].components.city
   let rus = newCity2.results[0].components.country
   let eng = threeDays.location.country


   //*Получить изображение
   // let bgImage = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
   //    .then(
   //       (response) => response.json()

   //    ).then(
   //       (jsonResponse) => jsonResponse
   //    )


   let res = {
      location,
      threeDays,
      newcity,
      rus,
      eng
      // bgImage,
   }
   return res
}

async function init() {
   let result = await main()
   // console.log('ВСЕ API', result);
   var newDate = new Date(result.threeDays.location.localtime)
   // console.log('newDATEEEEEEEE', newDate.getMonth());


   let latLng = getLatLng(result)
   mapInit(latLng)

   //*ОТКРЫТЬ ДЛЯ КАРТИНКИ document.body.style.background = `url(${result.bgImage.urls.regular})`//raw //thumb
   // document.body.style.background = `url(${result.bgImage.urls.regular})`//raw //thumb
   // console.log('ПРОГНОЗ НА 3 ДНЯ', threeDays(result));

   if (lang == true) {
      infoLocation.classList.add('blocks__today')
      infoLocation2.classList.add('next__info')
      infoLocation.innerHTML = `
      <h1>Погода сегодня</h1>
      <div class='today1'>
      <div class='today2'>
      <p>Страна: ${lang ? result.threeDays.location.country : result.threeDays.location.country}</p>
      <p>Город: ${qCity == null ? result.newcity : qCity}</p>
      <p>City: ${result.threeDays.location.name}</p>
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
      <p>City2: ${result.threeDays.location.name}</p>
      <p>Time: ${correctTime(newDate)}</p>
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

   ////////////////////////////////////////////////////////////////////
   // let uuu = document.querySelector('.timeee')
   // var newDate2 = new Date(result.threeDays.location.localtime)

   // // console.log(document.querySelector('.time'));

   // // let times = '';
   // let p = newDate2;
   // function timerr(time) {
   //    let h = time.getHours(),
   //       m = time.getMinutes(),
   //       s = time.getSeconds(),
   //       x = ''
   //    // document.querySelector('.time').innerHTML =
   //    x = `2021-01-23, ${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${(s++ < 10 ? "0" : "") + s}`;

   //    let newDate3 = new Date(x)
   //    console.log(newDate3);
   //    p = newDate3
   //    // console.log(p);
   //    uuu.innerHTML = `${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${(s++ < 10 ? "0" : "") + s}`
   //    // console.log(newDate3);
   //    // let h1 = newDate3.getHours(),
   //    //    m1 = newDate3.getMinutes(),
   //    //    s1 = newDate3.getSeconds();
   //    // console.log(h1, s1, m1);

   //    // times = newDate3
   //    // newDate2 = times
   //    // console.log(times);
   // }
   // timerr(newDate2)
   // let interval = setInterval(() => {
   //    timerr(p)
   //    // console.log(times);
   // }, 1000);
   /////////////////////////////////////////////////////////////////////
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


function threeDays(data) {
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

async function newCity(name) {
   let seacrhGeo = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${name}&key=2d4dd65ac76a49cd8dffa74cab0fd692&pretty=1&no_annotations=1`)
      .then(
         (response) => response.json()

      ).then(
         (jsonResponse) => jsonResponse
      )
   console.log('!!!!!!!!!!!!!!', seacrhGeo);
   q = `${seacrhGeo.results[0].geometry.lat},${seacrhGeo.results[0].geometry.lng}`
   qCity = `${seacrhGeo.results[0].components.city}`
   // qCity = `${seacrhGeo.results[0].components.city}`

   console.log('Координаты Новой страны', q);
   return seacrhGeo
}

async function getBgImg() {
   let bgImg = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&cout=10&page=2`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )
   // let i = randomInteger()
   document.body.style.background = `url(${bgImg.urls.full})`

}

// function randomInteger() {
//    let rand = 0 + Math.random() * (3 + 1 - 0);
//    return Math.floor(rand);
// }

async function ip() {
   let location = await fetch(`https://ipinfo.io/json?token=${token}`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )
   q = location.loc
   start = location.loc
   // ...
   qCity = location.city
   newCity(qCity)
}


















