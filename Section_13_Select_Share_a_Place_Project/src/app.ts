import axios from "axios";

const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type MapCoordinates = { lat: number; lng: number };

type GoogleGeocodingResponse = {
	results: { geometry: { location: MapCoordinates } }[];
	status: "OK" | "ZERO_RESULTS";
};

let map: google.maps.Map;

async function initMap(coordinates: MapCoordinates): Promise<void> {
	const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;

	if (!map) {
		map = new Map(document.getElementById("map") as HTMLElement, {
			center: coordinates,
			zoom: 8,
		});
	}

	const marker = new google.maps.Marker({
		position: coordinates,
		map,
	});

	marker.setMap(map);
	map.setCenter(coordinates);
}

const searchEventHandler = (event: Event) => {
	event.preventDefault();
	const enteredAddress = addressInput.value;

	axios
		.get<GoogleGeocodingResponse>(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${
				process.env.GOOGLE_API_KEY
			}`
		)
		.then((response) => {
			if (response.data.status !== "OK") {
				throw new Error("Could not fetch location status " + response.data.status);
			}

			const coordinates = response.data.results[0].geometry.location;

			initMap(coordinates);
		})
		.catch((err) => {
			console.log(err);
		});
};

form.addEventListener("submit", searchEventHandler);
