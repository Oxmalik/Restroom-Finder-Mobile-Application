import fetchMock from "jest-fetch-mock";
import { getData } from "./fetchDataMethod";

//Enable api call mock
fetchMock.enableMocks();

//Make sure before each test is reset
beforeEach(() => {
  fetch.resetMocks();
});

it("get data correctly", async () => {
  // The custom data that I passed in for testing the fetch
  fetch.mockResponseOnce(
    JSON.stringify([
      {
        id: 40932,
        name: "Richard Stockton rest stop",
        street: "On 95 south",
        city: "Nj",
        state: "Nj",
        accessible: true,
        unisex: true,
        directions: "Just before women's rest room",
        comment: "Slightly hidden",
        latitude: 36.8780134,
        longitude: -77.4037145,
        created_at: "2018-04-14T02:23:12.660Z",
        updated_at: "2018-04-14T02:23:12.660Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: true,
        edit_id: 40932,
        approved: true,
        distance: 15.4084656118449,
        bearing: "299.422384032174",
      },
    ])
  );

  //Call the method
  const result = await getData(36.74958, -77.17599);

  expect(result[0].id).toEqual(40932);
  expect(result[0].name).toEqual("Richard Stockton rest stop");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=36.74958&lng=-77.17599`
  );
});

//Test if the location doesn't have any restroom
it("Empty restroom", async () => {
  //Empty data
  fetch.mockResponseOnce(JSON.stringify([]));

  //Call the method
  const result = await getData(35.74958, -77.17599);

  expect(result).toEqual([]);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=35.74958&lng=-77.17599`
  );
});

//Catch if the API error or network error
it("cactch network error and return null", async () => {
  fetch.mockReject(() => "API failure or network error");
  const result = await getData(35.74958, -77.17599);
  expect(result).toEqual(null);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=35.74958&lng=-77.17599`
  );
});

//Catch correct multilple data return

it("catch multilple data returned", async () => {
  fetch.mockResponseOnce(
    JSON.stringify([
      {
        id: 31341,
        name: "Hanover health and rehabilitation ",
        street: "8139 lee Davis road",
        city: "Mechanicsville ",
        state: "Virginia ",
        accessible: true,
        unisex: true,
        directions: "Located in Breakroom on East Wing. ",
        comment: "",
        latitude: 37.622773,
        longitude: -77.3424749,
        created_at: "2017-02-27T14:37:22.041Z",
        updated_at: "2017-02-27T14:37:22.041Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 31341,
        approved: true,
        distance: 12.6345231957775,
        bearing: "232.704466049118",
      },
      {
        id: 36004,
        name: "Fas Mart (Gas Station)",
        street: "9492 Chamberlayne Road ",
        city: "Mechanicsville",
        state: "Virginia",
        accessible: true,
        unisex: false,
        directions: "In the back of the store on the left is one bathroom.",
        comment: "It is a room (no stalls). ",
        latitude: 37.6584757,
        longitude: -77.385709,
        created_at: "2017-06-25T21:38:40.722Z",
        updated_at: "2017-06-25T21:38:40.722Z",
        downvote: 0,
        upvote: 1,
        country: "US",
        changing_table: true,
        edit_id: 36004,
        approved: true,
        distance: 13.078778205669,
        bearing: "246.519329726314",
      },
      {
        id: 6239,
        name: "Valero",
        street: "6675 Cold Harbor Rd",
        city: "Mechanicsville",
        state: "VA",
        accessible: true,
        unisex: false,
        directions:
          "Creighton Road 34A exit off 295, at first light across from 7-11.",
        comment: "",
        latitude: 37.589878,
        longitude: -77.317291,
        created_at: "2014-08-29T09:37:40.210Z",
        updated_at: "2014-08-29T09:37:40.210Z",
        downvote: 1,
        upvote: 1,
        country: "United States",
        changing_table: false,
        edit_id: 6239,
        approved: true,
        distance: 13.4713027273619,
        bearing: "221.501731857366",
      },
      {
        id: 18445,
        name: "10103 Cool Hive Place, Mechanicsville, VA 23116, USA",
        street: "10103 Cool Hive Place",
        city: "Mechanicsville",
        state: "Virginia",
        accessible: false,
        unisex: false,
        directions: "",
        comment: "",
        latitude: 37.671262,
        longitude: -77.411821,
        created_at: "2015-08-21T13:26:57.395Z",
        updated_at: "2015-08-21T13:26:57.395Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 18445,
        approved: true,
        distance: 13.9803634298952,
        bearing: "251.628995811621",
      },
      {
        id: 57053,
        name: "CVS",
        street: "8185 Atlee Rd",
        city: "Mechanicsville",
        state: "Virginia",
        accessible: true,
        unisex: true,
        directions: "in the back left past the hallmark cards",
        comment:
          "they really don’t care if you use the bathroom and leave. i always trust a cvs to have safe bathroom.",
        latitude: 37.6246774,
        longitude: -77.3901293,
        created_at: "2021-01-01T22:46:45.811Z",
        updated_at: "2021-01-01T22:46:45.895Z",
        downvote: 0,
        upvote: 1,
        country: "US",
        changing_table: true,
        edit_id: 57053,
        approved: true,
        distance: 14.5453844305509,
        bearing: "239.745956849726",
      },
      {
        id: 34839,
        name: "Intensive Community Outreach Services",
        street: "8052 Elm Dr, Ste F",
        city: "Mechanicsville",
        state: "VA",
        accessible: false,
        unisex: true,
        directions: " ",
        comment: "",
        latitude: 37.5966442,
        longitude: -77.3736542,
        created_at: "2017-05-05T17:19:01.354Z",
        updated_at: "2017-05-05T17:19:01.354Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 34839,
        approved: true,
        distance: 15.1165924416927,
        bearing: "232.270334168125",
      },
      {
        id: 49052,
        name: "Sunoco Gas Station",
        street: "10292 E Patrick Henry Rd",
        city: "Ashland",
        state: "Virginia",
        accessible: false,
        unisex: true,
        directions:
          "Take a left, then turn right at the coffee station. There's a sign too.",
        comment: "Really nice rest stop!",
        latitude: 37.7606743,
        longitude: -77.4557658,
        created_at: "2019-04-11T11:37:43.021Z",
        updated_at: "2019-04-11T11:37:43.127Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 49052,
        approved: true,
        distance: 15.3026815560318,
        bearing: "272.270831518707",
      },
      {
        id: 58094,
        name: "Starbucks",
        street: "704 England St",
        city: "Ashland",
        state: "Virginia",
        accessible: true,
        unisex: false,
        directions: "Immediate right",
        comment: "Two unisex single stall restrooms with locks. ",
        latitude: 37.7589526,
        longitude: -77.4699418,
        created_at: "2021-06-30T18:31:02.110Z",
        updated_at: "2021-06-30T18:31:02.215Z",
        downvote: 0,
        upvote: 1,
        country: "US",
        changing_table: false,
        edit_id: 58094,
        approved: true,
        distance: 16.0711097552359,
        bearing: "271.826246879633",
      },
      {
        id: 50390,
        name: "Intermission Beer Company",
        street: "10089 Brook Rd unit A",
        city: "Glen Allen",
        state: "Virginia",
        accessible: false,
        unisex: true,
        directions: "In the back on the right. ",
        comment: "One stall. ",
        latitude: 37.6730867,
        longitude: -77.4583118,
        created_at: "2019-06-14T00:06:18.154Z",
        updated_at: "2019-06-14T00:06:18.178Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 50390,
        approved: true,
        distance: 16.311641400746,
        bearing: "254.840043205746",
      },
      {
        id: 27608,
        name: "Starbucks VCC",
        street: "1091 Virginia Center Parkway",
        city: "Glen Allen",
        state: "Virginia",
        accessible: true,
        unisex: true,
        directions: "Slight left when walking in.",
        comment: "",
        latitude: 37.665006,
        longitude: -77.458386,
        created_at: "2017-01-21T12:55:53.294Z",
        updated_at: "2017-01-21T12:55:53.294Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 27608,
        approved: true,
        distance: 16.5055804065658,
        bearing: "253.32771253333",
      },
    ])
  );

  //Call the method
  const result = await getData(37.74958, -77.17599);

  expect(result[0].id).toEqual(31341);
  expect(result[0].name).toEqual("Hanover health and rehabilitation ");
  expect(result[1].id).toEqual(36004);
  expect(result[1].name).toEqual("Fas Mart (Gas Station)");
  const distance1 = result[0].distance;

  expect(
    result.map((res) => {
      if (res.distance < distance1) return false;
      else return true;
    })
  ).toEqual([true, true, true, true, true, true, true, true, true, true]);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=37.74958&lng=-77.17599`
  );
});
