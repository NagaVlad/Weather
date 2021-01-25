// export async function newCity(name, q, qCity) {
//    let seacrhGeo = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${name}&key=2d4dd65ac76a49cd8dffa74cab0fd692&pretty=1&no_annotations=1`)
//       .then(
//          (response) => response.json()

//       ).then(
//          (jsonResponse) => jsonResponse
//       )
//    console.log('!!!!!!!!!!!!!!', seacrhGeo);
//    q = `${seacrhGeo.results[0].geometry.lat},${seacrhGeo.results[0].geometry.lng}`
//    qCity = `${seacrhGeo.results[0].components.city}`
//    return seacrhGeo
// }