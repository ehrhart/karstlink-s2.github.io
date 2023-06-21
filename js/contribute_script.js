// Hide the "Point of Observation" input field by default
document.getElementById("observation-input").style.display = "none";

// Add an event listener to the "Choose Field" dropdown menu
 document.getElementById("field-choice").addEventListener("change", function() {
   if (this.value === "cave") {
	 // Show the "Cave ID" input field and hide the "Point of Observation" input field
	 document.getElementById("cave-input").style.display = "";
	 document.getElementById("observation-input").style.display = "none";
   } else {
	 // Show the "Point of Observation" input field and hide the "Cave ID" input field
	 document.getElementById("cave-input").style.display = "none";
	 document.getElementById("observation-input").style.display = "";
   }
 });

// Upload button functionality
function showUpload() {
	document.getElementById("upload").click();
	document.getElementById("upload").addEventListener("change", handleFileUpload);
  }
 
 //CSV File validation and also upload button functionality
 function handleFileUpload(event) {
	const file = event.target.files[0];
	if (file) {
	  if (file.name.endsWith(".csv")) {
		const formData = new FormData();
		formData.append("file", file);
  
		//fetch("http://localhost:8083/api/caveObservation/upload", {
		fetch("https://speleograph.tools.eurecom.fr/api/caveObservation/upload", {
		  method: "POST",
		  body: formData
		})
		  .then(response => response.json())
		  .then(data => {
			const fileUrl = data.data.fileUrl; // Update the property access to data.fileUrl
			document.getElementById("autoSizingInputGroup").value = fileUrl;
			console.log(fileUrl);
		  })
		  .catch(error => {
			console.error(error);
			// Handle the error appropriately, e.g., display an error message to the user
		  });
  
		document.getElementById("autoSizingInputGroup").placeholder = file.name;
		document.getElementById("upload").value = "";
	  } else {
		document.getElementById("autoSizingInputGroup").placeholder = "Please Upload a CSV File";
		document.getElementById("upload").value = "";
	  }
	} else {
	  const input = document.getElementById("autoSizingInputGroup");
	  try {
		// Try to create a URL object from the input value
		const url = new URL(input.value);
		input.value = url.href;
	  } catch (error) {
		// If the input value is not a valid URL, assume it's a file name
		input.value = input.value.split('\\').pop().split('/').pop();
	  }
	}
  }

$(document).ready(function() {
	$(".dropdown-item").click(function() {
	  var selectedOption = $(this).text();
	  $("#dropdownMenuLink").text(selectedOption);
	});
  });
  
  let selectedSensorId = null; // Declare the selectedSensorId variable

function refreshDropdown() {
  return new Promise((resolve, reject) => {
    const dropdown = document.getElementById('SensorDropdown');
    const dropdownLabel = document.querySelector('.dropdown-label');

    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Clear the existing dropdown options
    dropdown.innerHTML = '';
    // Array to store sensor IDs and names
    const sensorArray = [];

    //fetch('http://localhost:8083/api/sensorType', {
		fetch('https://speleograph.tools.eurecom.fr/api/sensorType', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const sensorData = data.data;

          const uniqueSensorNames = new Set(); // Use a Set to store unique sensor names

          sensorData.forEach(sensor => {
            // Check if the sensor name already exists in the Set
            if (!uniqueSensorNames.has(sensor.name)) {
              uniqueSensorNames.add(sensor.name); // Add the sensor name to the Set
              sensorArray.push({ id: sensor._id, name: sensor.name }); // Store sensor ID and name in the array

              const dropdownItem = document.createElement('button');
              dropdownItem.classList.add('dropdown-item');
              dropdownItem.type = 'button';
              dropdownItem.textContent = sensor.name;
              dropdownItem.addEventListener('click', () => {
                dropdownLabel.textContent = sensor.name;
                console.log(`Selected sensor Name: ${sensor.name}`);
                console.log(`Selected sensor ID: ${sensor._id}`);
                selectedSensorId = sensor._id; // Assign the selected sensor ID to the variable
              });
              dropdown.appendChild(dropdownItem);
            }
          });

          const otherOption = document.createElement('button');
          otherOption.classList.add('dropdown-item');
          otherOption.type = 'button';
          otherOption.textContent = 'Other';
          otherOption.addEventListener('click', () => {
            dropdownLabel.textContent = 'Other';
            console.log('Selected sensor: Other');
            const dropdownItems = document.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
              item.disabled = false;
            });
          });
          dropdown.appendChild(otherOption);

          resolve(sensorArray); // Resolve the promise with the sensorArray
        } else {
          reject(new Error('Unable to fetch sensor data')); // Reject the promise if the fetch request was not successful
        }
      })
      .catch(error => {
        console.error('Error retrieving sensor names:', error);
        reject(error); // Reject the promise if there was an error during the fetch request
      });
  });
}

async function run() {
  try {
    const sensorArray = await refreshDropdown();
    console.log(sensorArray); // Access the array of sensor IDs and names
  } catch (error) {
    console.error(error);
  }
}

run();
  
  
  

  




//BUTTONS
  $(document).ready(function() {
	// Hide the "NEXT" button and "SENSOR NAME" field by default
	$('#next-btn, #sensor-name-field').hide();
  
	// Show the "SENSOR NAME" field and change the button text when "Other" is selected
	$('.dropdown-menu').on('click', '.dropdown-item', function() {
	  if ($(this).text() == 'Other') {
		$('#submit-btn').hide();
		$('#next-btn').show().text('NEXT');
		$('#sensor-name-field').hide();
	  } else {
		$('#submit-btn').show();
		$('#next-btn').hide();
		$('#sensor-name-field').hide();
	  }
	});
  
	// Reset dropdownMenuLink to "Yes" when back button is clicked
	$('#back-btn').click(function() {
	  $('#dropdownMenuLink').text('Other');
	});
  });
  
  const val1 = document.getElementById("form1");
  const val2 = document.getElementById("form2");
  const val3 = document.getElementById("back-btn");
  
  function form2() {
    console.log("clicked");
    val1.classList.add("hide-btn");
    val2.classList.add("show-btn");
    val1.classList.remove("show-btn");
    val2.classList.remove("hide-btn");
    val3.classList.remove("hide-btn");
    val3.classList.add("show-btn");
    $('#submit-btn').hide();
    $('#next-btn').hide();
    $('#create-btn').show();
    $('#sensor-name-field').hide();
	
}

function form1() {
    console.log(val3);
    val2.classList.add("hide-btn");
    val1.classList.add("show-btn");
    val2.classList.remove("show-btn");
    val1.classList.remove("hide-btn");
    val3.classList.add("hide-btn");
    val3.classList.remove("show-btn");
    $('#submit-btn').show();
    $('#next-btn').hide();
    $('#create-btn').hide();
    $('#sensor-name-field').hide();
}


  
function createSensor() {
	const name = $('#sensor-name').val();
	const type = $('#sensor').val();
	const manufacturer = $('#manufacturer').val();
  
	//const ipAddress = 'localhost';
	//const port = '8083';
	const token = localStorage.getItem('token');
  
	//return fetch(`http://${ipAddress}:${port}/api/sensorType`, {
		fetch('https://speleograph.tools.eurecom.fr/api/sensorType', {
	  method: 'POST',
	  headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + token // Include the token as an authorization header
	  },
	  body: JSON.stringify({ name, type, manufacturer })
	})
	  .then(response => response.json())
	  .then(data => {
		// Handle the response from the backend
		const sensorId = data.data._id;
		console.log('Created sensor ID:', sensorId);
		refreshDropdown();
		alert('New sensor created, please click Back button to proceed with form submission');
		// Return the sensor ID
		return sensorId;
		// Store the ID in a variable or perform any further actions
	  })
	  .catch(error => {
		// Handle any errors that occurred during the request
		console.error('Error creating sensor:', error);
	  });
  }
  


  
  
  function submitForm1() {
	// Handle form submission logic for Form 1
  }
  
//datetime
$(function() {
	$('.datetimepicker').daterangepicker({
	  timePicker: true,
	  timePicker24Hour: true,
	  timePickerSeconds: true,
	  singleDatePicker: true,
	  autoUpdateInput: false, 
	  locale: {
		format: 'YYYY-MM-DD HH:mm:ss'
	  }
	});

	$('.datetimepicker').on('apply.daterangepicker', function(ev, picker) {
	  $(this).val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
	});
  });

  $(function() {
	$('.datetimepickerend').daterangepicker({
	  timePicker: true,
	  timePicker24Hour: true,
	  timePickerSeconds: true,
	  singleDatePicker: true,
	  autoUpdateInput: false,
	  locale: {
		format: 'YYYY-MM-DD HH:mm:ss'
	  },
	  timePickerIncrement: 1,
	  timeZone: $('#begin-timezone').val() // Use the selected timezone value
	});

	$('.datetimepickerend').on('apply.daterangepicker', function(ev, picker) {
	  $(this).val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
	});
  });
    


  
  
  const submitButton1 = document.getElementById('submit-btn');

submitButton1.addEventListener('click', () => {
  console.log("contribute");

  const caveId = document.getElementById('cave').value;
  const point = document.getElementById('point').value;
  const coordinate = document.getElementById('coordinate').value;
  const beginDate = document.getElementById('datetimepicker').value;
  const endDate = document.getElementById('datetimepickerend').value;
  const filePath = document.getElementById('autoSizingInputGroup').value;
  //const timezoneSelect = document.getElementById('end-timezone');
  //const timeZone = timezoneSelect.value;
  //console.log(timezoneSelect);
  const timezoneSelect = document.getElementById('end-timezone');
  const selectedOption = timezoneSelect.options[timezoneSelect.selectedIndex];
  const timeZone = selectedOption.text;
console.log(timeZone);	
  const ipAddress = 'localhost';
  const port = '8083';

  const selectedSensor = $('#dropdownMenuLink').text();
  let sensorIdPromise;
  if (selectedSensor === 'Other') {
    sensorIdPromise = createSensor();
  } else {
    sensorIdPromise = Promise.resolve(selectedSensorId); // Use the selectedSensorId variable
  }

  const token = localStorage.getItem('token');
  if (!token) {
    alert('You are not authenticated. Please log in.');
    return;
  }

  sensorIdPromise
    .then(sensorId => {
      const observationData = {
        caveId,
        beginDate,
        endDate,
        filePath,
        timeZone,
        sensorId: sensorId // Use the sensorId obtained from the promise
      };

      //return fetch(`http://${ipAddress}:${port}/api/caveObservation`, {
		  return fetch(`https://speleograph.tools.eurecom.fr/api/caveObservation`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(observationData)
      });
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        alert('You have successfully contributed to our database.');
        //window.location.href = '../html/search.html';
      }
    })
    .catch(error => {
      console.error(error);
      // Handle the error appropriately, e.g., display an error message to the user
    });

});
