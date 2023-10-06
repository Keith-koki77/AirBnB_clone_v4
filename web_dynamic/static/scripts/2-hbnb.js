$(function () {
  // Object to store selected amenities
  const listAmenities = {};

  // Event listener for changes in checkboxes
  $('div.amenities li input').change(function () {
    // Check if checkbox is checked
    if ($(this).is(':checked')) {
      // Add amenity to the list
      listAmenities[($(this).attr('data-id'))] = $(this).attr('data-name');
    } else {
      // Remove amenity from the list
      delete listAmenities[($(this).attr('data-id'))];
    }
    // Update the display of selected amenities
    $('div.amenities h4').html(Object.values(listAmenities).join(', ') || '&nbsp;');
  });

  // Get API status from the specified URL
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    // Check API status and update API status display accordingly
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
