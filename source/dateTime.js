export function correctTime(time) {
   let h = time.getHours(),
      m = time.getMinutes(),
      s = time.getSeconds();
   return `${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${(s < 10 ? "0" : "") + s}`;
}

export function correctDate(date, lang) {
   let timeToString = date.toString()
   timeToString = timeToString.substr(0, 3);
   let y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
   function dateM(data, data2) {
      let month = ['Января', 'Фервраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
      let monthEng = ['Jan', 'Feb', 'March', 'Apr', 'May ', 'June', 'Июля', 'July', 'Sep', 'Oct', 'Nov', 'Dec']
      let dayEng = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      let dayRus = ["Пон", "Вт", "Ср", "Чет", "Пят", "Сб", "Вс"]
      let newMonth = []
      let newDay = []

      for (let i = 0; i < month.length; i++) {
         if (data == i) {
            lang ? newMonth.push(month[i]) : newMonth.push(monthEng[i])
         }
      }

      for (let i = 0; i < dayEng.length; i++) {
         if (data2 == dayEng[i]) {
            lang ? newDay.push(dayRus[i]) : newDay.push(dayEng[i])
         }
      }
      return [newDay[0], newMonth[0]]
   }
   m = dateM(date.getMonth(), timeToString)
   return `${(m[0])} ${d} ${m[1]} `;
}

export function transformDate(data) {
   data += " 00:00:00"
   var newDate = new Date(data)
   return newDate
}

export function showTime(result, interval, lang) {
   let outTimer = document.querySelector('.timeee')
   var timeToObject = new Date(result.threeDays.location.localtime)
   let timeNow = timeToObject;
   function timerr(time) {
      timeNow.setSeconds(new Date().getSeconds())
      timeNow.setMinutes(new Date().getMinutes())
      let h = time.getHours(),
         m = time.getMinutes(),
         s = time.getSeconds()
      if (lang) {
         outTimer.innerHTML = `Время: ${h < 10 ? `0${h}` : `${h}`}:${m < 10 ? "0" + m : "" + m}:${s < 10 ? `0${s}` : "" + s} `
      } else {
         outTimer.innerHTML = `Time: ${h < 10 ? `0${h}` : `${h}`}:${m < 10 ? "0" + m : "" + m}:${s < 10 ? `0${s}` : "" + s} `
      }
   }

   interval = setInterval(() => {
      timerr(timeNow)
   }, 1000);
}

