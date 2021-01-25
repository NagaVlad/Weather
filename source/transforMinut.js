export function transforMinut(value, lang) {
   value = value.split(',')
   let num = Number(value[0])
   let result = Math.floor(num) + '° '
   num = num % 1 * 60
   result += Math.floor(num) + '\' '
   num = num % 1 * 60
   result += Math.floor(num) + '" '

   let num2 = Number(value[1])
   let result2 = Math.floor(num2) + '° '
   num2 = num2 % 1 * 60
   result2 += Math.floor(num) + '\' '
   num2 = num2 % 1 * 60
   result2 += Math.floor(num2) + '" '

   if (lang) {
      return `Широта: ${result} Долгота: ${result2}`
   } else {
      return `Latitude: ${result} Longitude: ${result2}`
   }
}