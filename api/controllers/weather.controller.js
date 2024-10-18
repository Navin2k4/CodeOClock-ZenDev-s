export const getData = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Madurai&appid=72d5acd9a409b970697976aea796cc6d"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data from OpenWeather API");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
