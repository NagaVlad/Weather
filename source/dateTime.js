export function correctTime(time) {
   let h = time.getHours(),
      m = time.getMinutes(),
      s = time.getSeconds();
   return `${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${(s < 10 ? "0" : "") + s}`;
}

export function correctDate(date, lang) {
   let xxx = date.toString()
   xxx = xxx.substr(0, 3);
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
   m = dateM(date.getMonth(), xxx)
   return `${(m[0])} ${d} ${m[1]} `;
}

export function transformDate(data) {
   data += " 00:00:00"
   var newDate = new Date(data)
   return newDate
}