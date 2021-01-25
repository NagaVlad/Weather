export async function main(token, start, ip, apiKey, q) {
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