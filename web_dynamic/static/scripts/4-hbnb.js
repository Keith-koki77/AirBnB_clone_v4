$(document).ready(function () {
    const amenities = {};

    // Event listener for changes in checkboxes for amenities
    $("li input[type=checkbox]").change(function () {
        if (this.checked) {
            amenities[this.dataset.name] = this.dataset.id;
        } else {
            delete amenities[this.dataset.name];
        }
        $(".amenities h4").text(Object.keys(amenities).sort().join(", "));
    });

    // Event listener for button click
    $("button").click(function () {
        // Make a POST request to places_search with the list of amenities
        $.post({
            url: `${HOST}/api/v1/places_search`,
            data: JSON.stringify({ amenities: Object.values(amenities) }),
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

    // Get the status of the API
    $.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
        if (data.status === "OK") {
            $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    });
});
