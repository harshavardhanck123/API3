const form = document.getElementById("myform");
const geographicalData = document.getElementById("geographicalData");
const cityHeader = document.getElementById("cityHeader");
const cardBody = document.getElementById("cardBody");
const cardTitle = document.getElementById("cardTitle");

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  const ip = document.getElementById("Internet").value;
  await fetchGeographicalData(ip);
});

async function fetchGeographicalData(ip) {
  try {
    var res = await fetch(`https://www.geoplugin.net/json.gp?ip=${ip}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    var resdata = await res.json();
    var city = resdata.geoplugin_city;
    cityHeader.textContent = city;
    cardBody.innerHTML = `
      <p class="card-text">Country: ${resdata.geoplugin_countryName}</p>
      <p class="card-text">Continent: ${resdata.geoplugin_continentName}</p>
      <p class="card-text">Latitude: ${resdata.geoplugin_latitude}</p>
      <p class="card-text">Longitude: ${resdata.geoplugin_longitude}</p>
      <p class="card-text">Timezone: ${resdata.geoplugin_timezone}</p>
      <p class="card-text">Currency: ${resdata.geoplugin_currencyCode} (${resdata.geoplugin_currencySymbol})</p>
    `;
    geographicalData.style.display = "block";
  } catch (error) {
    console.error('Error:', error.message);
  }
}