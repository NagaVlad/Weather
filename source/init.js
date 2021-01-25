export async function init2(lang, unit, init, changeControlLang) {
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