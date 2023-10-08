$(document).ready(function () {
    const amenities = {};
    const locations = {};

    // Event listener for changes in checkboxes for amenities, cities and states
    $("li input[type=checkbox]").change(function () {
	const dataType = this.dataset.type; // 'amenity', 'city', or 'state'
	const dataName = this.dataset.name;
	const dataId = this.dataset.id;
	
	if (this.checked) {
	    // Checkbox is checked
	    if (!locations[dataType]) {
		locations[dataType] = {};
	    }
	    locations[dataType][dataName] = dataId;
	} else {
	    // Checkbox is unchecked
	    if (locations[dataType] && locations[dataType][dataName]) {
		delete locations[dataType][dataName];
	    }
	}

	// Update the h4 tag inside the div locations
	$(".locations h4").text(
	    Object.values(locations)
		.map((type) => Object.keys(type).sort().join(", "))
		.join(" | ")
	);
    });

    //Event listener for button click
    $("button").click (function () {
	// Make a POST request to place_search with the list of amenities
	$.post({
	    url: '${HOST}/api/v1/places_search',
	    data: JSON.stringify({
		amenities: Object.values(amenities),
		cities: locations.city,
		states: locations.state,
	    }),
	    headers: {
		"Content-Type": "application/json",
	    },
	    success: (data) => {
		// Handle the response data
		console.log("Response:", data);
		// Update or display the places based on the response
	    },
	    dataType: "json",
	});
    });
});
