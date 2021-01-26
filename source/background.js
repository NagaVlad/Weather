export async function getBgImg(accessKey) {
   let bgImg = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&cout=10&page=2`)
      .then(
         (response) => response.json()
      ).then(
         (jsonResponse) => jsonResponse
      )
   document.body.style.background = `url(${bgImg.urls.full})`
}
