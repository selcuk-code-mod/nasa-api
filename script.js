async function fetchNEOData() {
  const apiKey = "ZMLlAglkUNYoV2P0p505GatwW27jYv3uj32fKMe4";
  const startDateInput = document.getElementById("start-date").value;
  const endDateInput = document.getElementById("end-date").value;
  sessionStorage.setItem("startDate", startDateInput);
  sessionStorage.setItem("endDate", endDateInput);

  const apiURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateInput}&end_date=${endDateInput}&api_key=${apiKey}`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const elementCount = document.getElementById("elementCount");
    elementCount.innerHTML = `<h4 class="writing">Total NEOs: ${data.element_count}</h4>`;
    const neosContainer = document.getElementById("neos");
    neosContainer.innerHTML = "";
    Object.values(data.near_earth_objects)
      .flat()
      .forEach((neo) => {
        const cardClass = neo.is_potentially_hazardous_asteroid
          ? "bg-danger text-white"
          : "bg-light";
        const neoCard = `
      <div class= "col">
        <div class= "card h-100 ${cardClass}">
          <div class="cord-body d-flex flex-column align-items-center justify-content-center">
            <h5>${neo.name}</h5>
            <p>${neo.id}</p>
            <a href="neo-details.html?id=${neo.id}" class="btn ${
          neo.is_potentially_hazardous_asteroid
            ? "btn-light"
            : "btn-outline-dark"
        }">Details</a>
          </div>
        </div>
      </div>
      `;
        neosContainer.innerHTML += neoCard;
      });
  } catch (error) {
    console.log("Hata: ", error);
  }
}

function loadPreviousSelections() {
  const storedStartDate = sessionStorage.getItem("startDate");
  const storedEndDate = sessionStorage.getItem("endDate");
  if (storedStartDate && storedEndDate) {
    document.getElementById("start-date").value = storedStartDate;
    document.getElementById("end-date").value = storedEndDate;
    fetchNEOData();
  }
}

async function setApodBackground() {
  const apiKey = "ZMLlAglkUNYoV2P0p505GatwW27jYv3uj32fKMe4";
  const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    const imageContainer = document.getElementById("imageContainer").style;
    imageContainer.backgroundImage = `url(${data.url})`;
    imageContainer.backgroundSize = "cover";
    imageContainer.width = "100%";
    imageContainer.height = "100dvh";
    imageContainer.position = "fixed";
    imageContainer.zIndex = "-1";
    imageContainer.top = "0";
  } catch (error) {
    console.log("Hata", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPreviousSelections();
  setApodBackground();
});
