async function getData(latitude, longitude) {
    try {
      const result = await fetch(
        `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${latitude}&lng=${longitude}`
        );
        const data = await result.json();
       
      return data;
    } catch (e) {
      return null;
    }
}
  

  export { getData };