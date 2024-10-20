export const getData = async (req, res) => {
  const {city} = req.params;
  try {
    const response = await fetch(
      ``
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