import { data } from 'jquery'
import './styles/styles.css'
import './styles/styles.scss'

//* Результат блока
let infoLocation = document.createElement('div')
let infoLocation2 = document.createElement('div')
let infoLocation3 = document.createElement('div')

//Geolocation start
const token = 'efca0f8ab010de';

// Weather for three fay
const apiKey = '08d6846f461f4edaa9a91251212101'
let q = '59.9386,30.3141'
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
console.log('!>>>>>>>>>>>>>>>>>>>>>>>>>>', lang);
/////////////////////////////////////////////////////
//!! ПОИСК
let searchCity = null

let bgImg = ''

document.querySelector('#btnSearch').addEventListener('click', (e) => {
   searchCity = document.querySelector('#search').value
   newCity(searchCity)
   main()
   init()
})


document.querySelector('#unit').addEventListener('click', (e) => {
   unit = !unit
   savetoLacalStorage(unit)
   main()
   init()
})

document.querySelector('#lang').addEventListener('click', (e) => {
   lang = !lang
   savetoLacalStorage()
   // loadtoLacalStorage()
   main()
   init()
})

document.querySelector('#bg').addEventListener('click', (e) => {
   getBgImg()
})


document.querySelector('#back').addEventListener('click', (e) => {
   ip()
   newCity(searchCity)
   // main()
   init()
})


// document.addEventListener("DOMContentLoaded", () => { let langAndUnit = loadtoLacalStorage() });
///////////////////////////////////////////////////////////
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

   // newCity(location.city)

   console.log('Начальная позиция', location.loc);

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

   //* !!!!!!!!!!!!!!Поиск по городу
   // let seacrhGeo = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchCity}&key=2d4dd65ac76a49cd8dffa74cab0fd692&pretty=1&no_annotations=1`)
   //    .then(
   //       (response) => response.json()

   //    ).then(
   //       (jsonResponse) => jsonResponse
   //    )

   // q = `${seacrhGeo.results[0].geometry.lat},${seacrhGeo.results[0].geometry.lng}`
   // console.log('Координаты бразили', location.loc);



   //* Отдаю объект с полученными данными 
   let res = {
      location,
      threeDays,

      newcity,
      rus,
      eng
      // bgImage,

      //!!!!!!!!!!!!!!! seacrhGeo,
   }

   return res
}

async function init() {

   let result = await main()
   console.log('ВСЕ API', result);
   var newDate = new Date(result.threeDays.location.localtime)
   console.log('newDATEEEEEEEE', newDate.getMonth());
   //!! console.log(correctTime(newDate));
   //!! console.log(correctDate(newDate));
   //!! showDateTime(newDate);
   //!! setInterval(showDateTime(newDate), 1000);

   //*Получаем широту и долготу 
   let latLng = getLatLng(result)
   mapInit(latLng)

   //*ОТКРЫТЬ ДЛЯ КАРТИНКИ document.body.style.background = `url(${result.bgImage.urls.regular})`//raw //thumb
   // document.body.style.background = `url(${result.bgImage.urls.regular})`//raw //thumb

   console.log('ПРОГНОЗ НА 3 ДНЯ', threeDays(result));

   // if (lang == 'false') {
   //    console.log('TRUEEEEEEEEEE', lang)
   //    let x = 'русский';
   //    console.log(x);
   // } else {
   //    console.log('FALSEEEEEEEEEEEE', lang)
   //    let x2 = "англ";
   //    console.log(x2);
   // }


   if (lang == true) {
      infoLocation.classList.add('blocks__today')
      infoLocation2.classList.add('next__info')

      infoLocation.innerHTML = `
      <h1>Погода сегодня</h1>
      <div class='today1'>
      <div class='today2'>
      <p>Страна: ${lang ? result.rus : result.threeDays.location.country}</p>
      <p>Город: ${qCity == null ? result.newcity : qCity}</p>
      <p>City: ${result.threeDays.location.name}</p>
      <p>Время: ${correctTime(newDate)}</p>
   <p>Дата: ${correctDate(newDate)}</p>
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
   <p>Дата: ${correctDate(transformDate(threeDays(result)[0]))} 2021</p>
   <p>Температура: ${unit ? threeDays(result)[1] + ` °С` : threeDays(result)[2] + ` °F`} </p>
   <img src=${threeDays(result)[3]} alt="альтернативный текст">
   </div>
   </div>

   <div class="info__day">
   <div class="day__weather">
   <p>Дата: ${correctDate(transformDate(threeDays(result)[4]))} 2021</p>  
   <p>Температура: ${unit ? threeDays(result)[5] + ` °С` : threeDays(result)[6] + ` °F`} </p>
   <img src=${threeDays(result)[7]} alt="альтернативный текст">
   </div>
   </div>

   <div class="info__day">
   <div class="day__weather">
   <p>Дата: ${correctDate(transformDate(threeDays(result)[8]))} 2021</p>
   <p>Температура: ${unit ? threeDays(result)[9] + ` °С` : threeDays(result)[10] + ` °F`} </p>
   <img src=${threeDays(result)[11]} alt="альтернативный текст">
   </div>
   </div>

   </div>
   `
      infoLocation3.innerHTML = `
      <h1>Геолокация</h1>
      <p>Координаты: ${q}</p>`
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
   <p>Date: ${correctDate(newDate)}</p>
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
   <p>Date: ${correctDate(transformDate(threeDays(result)[0]))}</p>
   <p>Temperature: ${unit ? threeDays(result)[1] + ` °С` : threeDays(result)[2] + ` °F`} </p>
   <img src=${threeDays(result)[3]} alt="альтернативный текст">
   </div>
   </div>

   <div class="info__day">
   <div class="day__weather">
   <p>Date: ${correctDate(transformDate(threeDays(result)[4]))}</p>  
   <p>Temperature: ${unit ? threeDays(result)[5] + ` °С` : threeDays(result)[6] + ` °F`} </p>
   <img src=${threeDays(result)[7]} alt="альтернативный текст">
   </div>
   </div>

   <div class="info__day">
   <div class="day__weather">
   <p>Date: ${correctDate(transformDate(threeDays(result)[8]))}</p>
   <p>Temperature: ${unit ? threeDays(result)[9] + ` °С` : threeDays(result)[10] + ` °F`} </p>
   <img src=${threeDays(result)[11]} alt="альтернативный текст">
   </div>
   </div>

   </div>
   `
      infoLocation3.innerHTML = `
      <h1>Geolocation</h1>
      <p>Coordinates: ${q}</p>`
      document.querySelector('.today__title').after(infoLocation)
      document.querySelector('.next__title').after(infoLocation2)
      document.querySelector('#map').before(infoLocation3)
   }
}

init();

function correctTime(time) {
   let h = time.getHours(),
      m = time.getMinutes(),
      s = time.getSeconds();
   return `${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${(s < 10 ? "0" : "") + s}`;
}
function correctDate(date) {
   console.log('ЭТО DATA', date);
   let xxx = date.toString()
   xxx = xxx.substr(0, 3);
   console.log('ЭТО СТРОКА', xxx.substr(0, 3));
   let y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
   ///////////////////////
   function dateM(data, data2) {
      let month = ['Января', 'Фервраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
      let dayEng = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      let dayRus = ["Пон", "Вт", "Ср", "Чет", "Пят", "Сб", "Вс"]

      let newMonth = []
      let newDay = []
      for (let i = 0; i < month.length; i++) {
         if (data == i) {
            newMonth.push(month[i])
            console.log(newMonth);
         }
      }

      for (let i = 0; i < dayEng.length; i++) {
         if (data2 == dayEng[i]) {
            newDay.push(dayRus[i])
            console.log(newDay);
         }
         console.log('ЦИКЛ', data2);
      }

      return [newDay[0], newMonth[0]]
   }
   /////////////
   m = dateM(date.getMonth(), xxx)
   // m = dateM(date.getMonth(), xxx)
   // return `${(m[0])} ${d} ${m[1]} ${(y)}`;
   return `${(m[0])} ${d} ${m[1]} `;

}


function transformDate(data) {
   data += " 00:00:00"
   // console.log('Трансформированная дата', newDate);
   var newDate = new Date(data)
   console.log('Трансформированная дата', newDate);
   return newDate

}

function showDateTime(time) {
   //**СДЕЛАТЬ ТАЙМЕР */
}

function mapInit(data) {
   const mapKey = 'pk.eyJ1IjoidmxhZGlzbGF2MTcxMjE5OTciLCJhIjoiY2trNnFtMzVoMDVicjJxbnYzbGEydjFlMiJ9.4spRpmDvIqmQ6PXkWFhGqQ'
   mapboxgl.accessToken = mapKey;
   let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [data[0], data[1]],
      zoom: 13
   });
}

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

function getLatLng(data) {
   let geoInfo = []
   geoInfo.push(data.threeDays.location.lon)
   geoInfo.push(data.threeDays.location.lat)
   // console.log('getLatLng', geoInfo);
   return geoInfo
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
   // let bgImg = await fetch(`https://api.unsplash.com/collections/3853054/?client_id=${accessKey}&cout=10&page=2`)
   let bgImg = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&cout=10&page=2`)
      .then(
         (response) => response.json()

      ).then(
         (jsonResponse) => jsonResponse
      )
   let i = randomInteger()
   console.log(i);
   console.log(bgImg);
   document.body.style.background = `url(${bgImg.urls.full})`//raw //thumb

}


function randomInteger() {
   // случайное число от min до (max+1)
   let rand = 0 + Math.random() * (3 + 1 - 0);
   return Math.floor(rand);
}

function savetoLacalStorage() {
   localStorage.setItem('locper', lang.toString());
}

function loadtoLacalStorage() {
   lang = localStorage.getItem('locper');
}

async function ip() {
   let location = await fetch(`https://ipinfo.io/json?token=${token}`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )
   q = location.loc
   // ...
   qCity = location.city
   newCity(qCity)
}






// Weather на несколько дней
// const secretKey = 'Eh9Zb40UUFyw91jSUze5h7KxNqFlADgt'
// // fetch(`https://api.climacell.co/v3/weather/forecast/daily?${q}&apikey=${secretKey}`)
// fetch(`https://api.climacell.co/v3/weather/forecast/daily?lat=55.7522&lon=37.6156&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=rh8L0roTYDgi9hvbGsd6X3cu5rRWiV05`)

//    .then(
//       (response) => response.json()

//    ).then(
//       (jsonResponse) => console.log(jsonResponse)
//    )





//!! Images API

// function getImg() {
// const accessKey = 'ck5s7v_cYmqDic-L76jxDtX7oUZbkRUv7dQzzeM8o_A'
// const secretKeyImg = 'KbKPyminoZLU6_rQnuWWwhO2XJXSQ2sRRIsF11tEr5U'
// fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
//    .then(
//       (response) => response.json()

//    ).then(
//       (jsonResponse) => jsonResponse
//    )
// }





//!!MAP API
// const mapKey = 'pk.eyJ1IjoidmxhZGlzbGF2MTcxMjE5OTciLCJhIjoiY2trNnFtMzVoMDVicjJxbnYzbGEydjFlMiJ9.4spRpmDvIqmQ6PXkWFhGqQ'

// mapboxgl.accessToken = mapKey;
// let map = new mapboxgl.Map({
//    container: 'map', // container id
//    style: 'mapbox://styles/mapbox/streets-v11', // style URL
//    center: [-74.5, 40], // starting position [lng, lat]
//    zoom: 9 // starting zoom
// });


//!!GEO
// const apiKeyGeo = '2d4dd65ac76a49cd8dffa74cab0fd692';

// fetch(`https://api.opencagedata.com/geocode/v1/json?q=59.9386%2C+30.3141&key=2d4dd65ac76a49cd8dffa74cab0fd692&pretty=1`)
// fetch(`https://api.opencagedata.com/geocode/v1/json?q=Мяунджа&key=2d4dd65ac76a49cd8dffa74cab0fd692&pretty=1&no_annotations=1`)
//    .then(
//       (response) => response.json()

//    ).then(
//       (jsonResponse) => console.log(jsonResponse)
//    )



   // '59.9386,30.3141'








