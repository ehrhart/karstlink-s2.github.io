  // Get the token from local storage
const token = localStorage.getItem('token');
// Retrieve the token from the JavaScript variable
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDgwOTFlY2ZmMDhhNmFiN2ViY2NiMDYiLCJpYXQiOjE2ODYxNDc2MDksImV4cCI6MTY4NjIzNDAwOX0._eFuhFrS_T4rKpi-rZZxNjpul03n3lkFCuK-ALk68bA";
console.log(token);

//const ipAddress = '172.24.11.5';
//const ipAddress = 'localhost';
//const port = '8083';
const apiUrl = 'https://speleograph.tools.eurecom.fr/api';
  // Make an HTTP request to retrieve user profile data
  // fetch('http://172.24.11.5:8083/api/user/profile', {
  // fetch(`http://${ipAddress}:${port}/api/user/profile`, {
	  fetch(`${apiUrl}/user/profile`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => response.json())
    .then(data => {
      const profileData = data.data;
        // Format the createdAt date
  const createdAt = new Date(profileData.createdAt).toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric' 
  });
      // Populate the <p> elements with the retrieved user profile data
      document.getElementById('license').textContent = profileData.license;
      document.getElementById('firstName').textContent = profileData.firstName;
      document.getElementById('lastName').textContent = profileData.lastName;
      document.getElementById('email').textContent = profileData.email;
      document.getElementById('createdAt').textContent = createdAt;
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
