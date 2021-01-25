export async function getBgImg(accessKey) {
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