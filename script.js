async function searchCity() {
  const cityName = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!cityName) {
    resultDiv.innerHTML = "⚠️ Please enter a city name.";
    return;
  }

  try {
    // Fetch city timezone dataset
    const response = await fetch("https://raw.githubusercontent.com/kevinroberts/city-timezones/refs/heads/master/data/cityMap.json");
    const cityData = await response.json();

    // Find city (case-insensitive search)
    const city = cityData.find(c => c.city.toLowerCase() === cityName.toLowerCase());

    if (!city) {
      resultDiv.innerHTML = "❌ City not found in dataset.";
      return;
    }

    // Get timezone
    const timezone = city.timezone;

    // Get current time in that city
    const cityTime = new Date().toLocaleString("en-US", { timeZone: timezone });

    // Get local time
    const localTime = new Date();

    // Calculate time difference (hours)
    const cityDate = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    const diffHours = (cityDate - localTime) / (1000 * 60 * 60);

    resultDiv.innerHTML = `
      🌍 <b>${city.city}, ${city.country}</b><br>
      🕒 Current Time: ${cityTime}<br>
      ⏱️ Time Difference: ${diffHours.toFixed(1)} hours
    `;
  } catch (err) {
    resultDiv.innerHTML = "⚠️ Error loading data.";
    console.error(err);
  }
}
