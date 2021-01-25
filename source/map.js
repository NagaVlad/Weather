export function mapInit(data) {
   const mapKey = 'pk.eyJ1IjoidmxhZGlzbGF2MTcxMjE5OTciLCJhIjoiY2trNnFtMzVoMDVicjJxbnYzbGEydjFlMiJ9.4spRpmDvIqmQ6PXkWFhGqQ'
   mapboxgl.accessToken = mapKey;
   let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [data[0], data[1]],
      zoom: 13
   });
}

export function getLatLng(data) {
   let geoInfo = []
   geoInfo.push(data.threeDays.location.lon)
   geoInfo.push(data.threeDays.location.lat)
   return geoInfo
}