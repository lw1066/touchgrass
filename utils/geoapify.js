

export async function fetchPlaces(

  postcode,
  radiusInMeters = 5000,
  limit = 100
) {
  try {
    const apiKey = '8c4b8ef0c8334c7fbd0782c94e1fe1aa'; 
    const geocodingResponse = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${postcode}&lang=en&limit=1&type=postcode&filter=countrycode:gb&apiKey=${apiKey}`
    );
    const geocodingData = await geocodingResponse.json();

    const lon = geocodingData.features[0].geometry.coordinates[0];
    const lat = geocodingData.features[0].geometry.coordinates[1];

    console.log("Longitude:", lon);
    console.log("Latitude:", lat);

    const categories = ["commercial", "natural", "leisure"];

    const placesResponse = await fetch(
      `https://api.geoapify.com/v2/places?categories=commercial,national_park,entertainment,leisure&filter=circle:${lon},${lat},${radiusInMeters}&bias=proximity:${lon},${lat}&limit=${limit}&apiKey=${apiKey}`
    );

    const placesData = await placesResponse.json();

    const places = placesData.features.map((place) => ({
      name: place.properties.name || "Mystery!",
      coordinates: place.geometry.coordinates,
    }));

    return places;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
