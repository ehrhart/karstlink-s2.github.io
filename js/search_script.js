$(document).ready(function() {
  
  $('.dropdown-item').on('click', function() {
    var code = $(this).text();
    $('#dropdownMenuLink').text(code);
    $('#codeInput').val(code.split(' / ')[0]);
  });


  // Event listener for the search button click
  $('#search-btn').click(function(e) {
    e.preventDefault(); // Prevent form submission

    // Get the values from the form inputs
    var idChecked = $('#inlineCheckbox1').is(':checked'); // Check if ID checkbox is checked
    var nameChecked = $('#inlineCheckbox2').is(':checked'); // Check if Name checkbox is checked
    var countryChecked = $('#inlineCheckbox3').is(':checked'); // Check if Country checkbox is checked
    var idValue = $('#idInput').val(); // Get the value of the ID input field
    var nameValue = $('#nameInput').val(); // Get the value of the Name input field
    var countryValue = $('#dropdownMenuLink').text(); // Get the selected country name

    // Prepare the request URL based on the selected checkboxes
    var apiUrl = '';

    //const ipAddress = 'localhost';
    //const port = '8083';
	const ipAddress = 'https://speleograph.tools.eurecom.fr/api';
	
    if (idChecked && idValue) {
      //apiUrl = `http://${ipAddress}:${port}/api/cave/search/${idValue}`; // Create the URL for searching by ID
	  apiUrl = `${ipAddress}/cave/search/${idValue}`;
    } else if (nameChecked && nameValue) {
      //apiUrl = `http://${ipAddress}:${port}/api/cave/search?name=${nameValue}`; // Create the URL for searching by Name
	  apiUrl = `${ipAddress}/cave/search?name=${nameValue}`;
    } else if (countryChecked && countryValue) {
      //apiUrl = `http://${ipAddress}:${port}/api/cave/search?country=${countryValue}`; // Create the URL for searching by Country
	  apiUrl = `${ipAddress}/cave/search?country=${countryValue}`;
    } else if (nameChecked && countryChecked && nameValue && countryValue) {
      //apiUrl = `http://${ipAddress}:${port}/api/cave/search?name=${nameValue}&country=${countryValue}`; // Create the URL for searching by Name and Country
	  apiUrl = `${ipAddress}/cave/search?name=${nameValue}&country=${countryValue}`;
    } else {
      // Handle the case where no checkbox is selected or input values are missing
      alert('Please select a search option and enter the corresponding value.');
      return;
    }

    // Retrieve the bearer token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
      // If the token is not found, redirect the user to the login page or display an error message
      alert('You are not authenticated. Please log in.');
      return;
    }

    // Send the AJAX request to the backend API
    $.ajax({
      url: apiUrl, // Set the URL for the API request
      method: 'GET', // Use the GET method for retrieving data
      headers: {
        Authorization: 'Bearer ' + token // Include the bearer token for authentication
      },
      success: function(response) {
        // Handle the successful response from the backend
        console.log('idChecked:', idChecked);
        console.log('idValue:', idValue);
        console.log('Search result:', response);

        if (response.success) {
          var data = response.data;
          var resultContainer = $('#result-container');
          resultContainer.empty(); // Clear the existing search result container

          if (data.results && data.results.length === 0) {
            // Display a message when no caves are found
            resultContainer.append('<p>No caves found.</p>');
          } else {
            var table = $('<table>').addClass('table');
            var thead = $('<thead>').appendTo(table);
            var tbody = $('<tbody>').appendTo(table);

            // Create the table header
            var headerRow = $('<tr>').appendTo(thead);
            headerRow.append('<th>Name</th>');
            headerRow.append('<th>ID</th>');
            headerRow.append('<th>Depth</th>');
            headerRow.append('<th>Length</th>');
            headerRow.append('<th>Latitude</th>');
            headerRow.append('<th>Longitude</th>');
            headerRow.append('<th>County</th>');
            headerRow.append('<th>Country Code</th>');
            headerRow.append('<th>Cave Observations</th>');

            // Handle response for ID search
            if (idChecked && idValue) {
              resultContainer.empty();

              // Handle response for ID search
              var caveData = response.data;
              //console.log("success:", response.success);
              //console.log("err:", response.err);

              if (response.success === false && response.err === "No Caves found") {
                resultContainer.empty(); // Clear the existing search result container
                resultContainer.text('No Caves Found');
                $('#inlineCheckbox1').prop('checked', false);
              
                // Clear the input fields
                $('#idInput').val('');
              }
              else
              {
                //var caveData = response.data;
              var table = $('<table>').addClass('table');
              var thead = $('<thead>').appendTo(table);
              var tbody = $('<tbody>').appendTo(table);
            
              var headerRow = $('<tr>').appendTo(thead);
              headerRow.append('<th>Name</th>');
              headerRow.append('<th>ID</th>');
              headerRow.append('<th>Depth</th>');
              headerRow.append('<th>Length</th>');
              headerRow.append('<th>Latitude</th>');
              headerRow.append('<th>Longitude</th>');
              headerRow.append('<th>County</th>');
              headerRow.append('<th>Country Code</th>');
              headerRow.append('<th>Cave Observations</th>');

              var dataRow = $('<tr>').appendTo(tbody);
              dataRow.append('<td>' + caveData.name + '</td>');
              dataRow.append('<td>' + caveData.id + '</td>');
              dataRow.append('<td>' + (caveData.depth ? caveData.depth : '-') + '</td>');
              dataRow.append('<td>' + (caveData.length ? caveData.length : '-') + '</td>');
              dataRow.append('<td>' + caveData.entrances[0].latitude + '</td>');
              dataRow.append('<td>' + caveData.entrances[0].longitude + '</td>');
              dataRow.append('<td>' + (caveData.entrances[0].county ? caveData.entrances[0].county : '-') + '</td>');
              dataRow.append('<td>' + (caveData.entrances[0].country ? caveData.entrances[0].country : '-') + '</td>');
// Add a button to the right of the Country Code column
              var buttonCell = $('<td>').appendTo(dataRow);
              var button = $('<button>').text('View').addClass('btn btn-secondary');
              button.click(function() {
                // Redirect to another page when the button is clicked
                window.location.href = '../html/cave.html?id=' + caveData.id;
                
              });
              button.appendTo(buttonCell);

              resultContainer.append(table);
          }
        }
      
          
          
                       
            // Handle response for Name search
            //else if (nameChecked && nameValue) {
              else if ((nameChecked && nameValue)||(countryChecked && countryValue) || (nameChecked && nameValue && countryChecked && countryValue)) {
              var results = data.results;

              if (results.length === 0) {
                // Display a message when no caves are found
                resultContainer.append('<p>No caves found.</p>');
              } else {
                // Iterate over the caves and display the details in the table
                results.forEach(function(cave) {
                  var caveData = cave.cave;
                  var row = $('<tr>').appendTo(tbody);
                  row.append('<td>' + caveData.name + '</td>');
                  row.append('<td>' + (cave["@id"] || caveData.id) + '</td>');
                  row.append('<td>' + (caveData.depth ? caveData.depth : '-') + '</td>');
                  row.append('<td>' + (caveData.length ? caveData.length : '-') + '</td>');
                  row.append('<td>' + cave.latitude + '</td>');
                  row.append('<td>' + cave.longitude + '</td>');
                  row.append('<td>' + (cave.county ? cave.county : '-') + '</td>');
                  row.append('<td>' + (cave.countryCode ? cave.countryCode : '-') + '</td>');
                  var buttonCell = $('<td>').appendTo(row);
                  var button = $('<button>').text('View').addClass('btn btn-secondary');
                  button.click(function() {
                    // Redirect to another page when the button is clicked
                  window.location.href = '../html/cave.html?id=' + caveData.id;
                    
                  });
                  button.appendTo(buttonCell);
                });

                resultContainer.append(table);
              }
            }
            // Uncheck the checkboxes
      $('#inlineCheckbox1').prop('checked', false);
      $('#inlineCheckbox2').prop('checked', false);
      $('#inlineCheckbox3').prop('checked', false);

      // Clear the input fields
      $('#idInput').val('');
      $('#nameInput').val('');
         // Clear the selected dropdown country name
         $('#dropdownMenuLink').text('Choose The Country Name');
          }
        } else {
          // Handle the case where the backend response indicates an error
          alert('An error occurred while retrieving the data.');
        }
      },
      error: function(xhr, status, error) {
        // Handle the case where the AJAX request encounters an error
        console.log('AJAX request error:', error);
    
        if (xhr.status === 404) {
          // Handle 404 error
          if (idChecked && idValue) {
            var resultContainer = $('#result-container');
            resultContainer.empty(); // Clear the existing search result container
            //resultContainer.text('No Caves Found');
              // Display a message when no caves are found
  var message = $('<p>').addClass('text-center').text('No Caves Found');
  var container = $('<div>').addClass('d-flex align-items-center justify-content-center').append(message);
  resultContainer.append(container);


            $('#inlineCheckbox1').prop('checked', false);
    
            // Clear the input fields
            $('#idInput').val('');
          }
        } else {
          // Handle other errors
          alert('An error occurred while making the request.');
        }
      }
    });
  });
});
