async function fetchNEODetails() {
  const urlParams = new URLSearchParams(window.location.search)
  const neoId = urlParams.get("id")
  const apiKey = "ZMLlAglkUNYoV2P0p505GatwW27jYv3uj32fKMe4"
  const apiURL = `https://api.nasa.gov/neo/rest/v1/neo/${neoId}?api_key=${apiKey}`

  try {
    const response = await fetch(apiURL)
    const neo = await response.json()
    console.log(neo)
    document.getElementById("neoTitle").textContent = `Name: ${neo.name}`
    document.getElementById("neoDate").textContent = `Close Approach Date: ${neo.close_approach_data[0].close_approach_date}`
    document.getElementById("neoSize").textContent = `Estimated Diameter: ${neo.estimated_diameter.kilometers.estimated_diameter_min} - ${neo.estimated_diameter.kilometers.estimated_diameter_max}`
    document.getElementById("neoVelocity").textContent = `Relative Velocity: ${neo.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h`
    document.getElementById("neoMissDistance").textContent = `Miss Distance: ${neo.close_approach_data[0].miss_distance.kilometers} km`
    if(neo.is_potentially_hazardous_asteroid) {
      document.body.style.backgroundImage = "url('https://c02.purpledshub.com/uploads/sites/41/2023/09/asteroid-bennuu.jpg?w=1029&webp=1')"
    } else {
      document.body.style.backgroundImage = "url('https://www-cdn.eumetsat.int/files/2022-03/earth-space.jpg')"
    }
  } 
  catch (error) {
    console.log("Hata", error)
  }
  document.body.style.backgroundSize = "cover"
  document.body.style.backgroundRepeat ="no-repeat"
}

fetchNEODetails()