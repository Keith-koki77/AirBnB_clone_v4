$(document).ready(function () {
    // Object to store selected amenities
    const amenities = {};

    // Event listener for changes in checkboxes for amenities
    $("li input[type=checkbox]").change(function () {
        // If checkbox is checked, add the amenity to the list
        if (this.checked) {
            amenities[this.dataset.name] = this.dataset.id;
        } else {
            // If checkbox is unchecked, remove the amenity from the list
            delete amenities[this.dataset.name];
        }
        // Update the display of selected amenities
        $(".amenities h4").text(Object.keys(amenities).sort().join(", "));
    });

    // Get the status of the API
    $.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
        // Check API status and update API status display accordingly
        if (data.status === "OK") {
            $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    });

    // Fetch data about places
    $.post({
        url: `${HOST}/api/v1/places_search`,
        data: JSON.stringify({}),
        headers: {
            "Content-Type": "application/json",
        },
        success: (data) => {
            // Append each place's information to the places section
            data.forEach((place) =>
                $("section.places").append(
                    `<article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? "s" : ""}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? "s" : ""}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? "s" : ""}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`
                )
            );
        },
        dataType: "json",
    });
});
