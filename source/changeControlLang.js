export function changeControlLang(lang) {
   if (lang) {
      document.querySelector('#btnSearch').innerHTML = 'Найти'
      document.querySelector('#bg').innerHTML = 'Сменить фон'
      document.querySelector('#back').innerHTML = 'Мой город'
   }
   else {
      document.querySelector('#btnSearch').innerHTML = 'Search'
      document.querySelector('#bg').innerHTML = 'Change background'
      document.querySelector('#back').innerHTML = 'My city'
   }
}