const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');


signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const passwordInput = document.querySelector('input[type="password"]');
const confirmPasswordInput = document.querySelector('input[placeholder="Confirm Password"]');
const signUpButton1 = document.querySelector('button');

signUpButton1.addEventListener('click', () => {
	if (passwordInput.value !== confirmPasswordInput.value) {
		alert("Passwords don't match. Please try again.");
		return false;
	} 
	
	// Proceed with form submission or other logic here
	container.classList.add("right-panel-active");
	console.log("Register");
	const email = document.querySelector('input[placeholder="email"]').value;
	const password = passwordInput.value;
	const firstName = document.querySelector('input[placeholder="firstName"]').value;
	const lastName = document.querySelector('input[placeholder="lastName"]').value;
	const license = document.querySelector('input[placeholder="license"]').value;

	// const ipAddress = 'localhost';
	// const port = '8083';
	// fetch(`http://${ipAddress}:${port}/api/user/register`, {
	//fetch('http://172.24.11.5:8083/api/user/register', {
		const apiUrl = 'https://speleograph.tools.eurecom.fr/api';
		fetch(`${apiUrl}/user/register`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password, firstName, lastName, license })
	})
		.then(response => response.json())
		.then(data => {
			// Handle the response from the backend
			console.log(data);
			//testing for message pop-p of successful user block
			if (data.success) {
				// Display success message
				//const successMessage = document.getElementById('successMessage');
				//successMessage.textContent = 'Registration successful!';
				alert('Registration successful!');
				// Reset input fields to default values
				document.querySelector('input[placeholder="firstName"]').value = '';
				document.querySelector('input[placeholder="lastName"]').value = '';
				document.querySelector('input[placeholder="email"]').value = '';
				document.querySelector('input[placeholder="license"]').value = '';
				passwordInput.value = '';
				confirmPasswordInput.value = '';
			}
			else {
				// Display error message
				//const errorMessage = document.getElementById('errorMessage');
				//errorMessage.textContent = data.err;
				alert('Registration failed: ' + data.err);
			}
			//block ends
			
		})
		.catch(error => {
			// Handle any errors that occurred during the request
			console.error(error);
		});
});

//LOGIN
const btnSignIn = document.getElementById('btnSignIn');

btnSignIn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
	const ipAddress = 'localhost';
	const port = '8083';
    // Perform validation or additional checks if needed

    // Send the login request to the backend
	
    //fetch('http://172.24.11.5:8083/api/user/login', {
		//fetch(`http://${ipAddress}:${port}/api/user/login`, {
		const apiUrl = 'https://speleograph.tools.eurecom.fr/api';
		fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email,password})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: ' + response.status);
            }
			console.log(response);
            return response.json();
        })
        .then(data => {
            // Handle the response from the backend
            console.log(data);
            // Assuming the response contains a success status indicating successful login
            //if (data.success) 
			if (data.success) 
			{
				// Retrieve the bearer token from the response
				const token = data.data.token;
				console.log(data);
				console.log(token);
				// Save the token to local storage or session storage for future authenticated requests
				localStorage.setItem('token', token);
				
				//console.log(token);
				// Redirect to the user's dashboard
                window.location.href = './html/user.html';
            } 
			
			else { 
				
                // Display error message for wrong login credentials
               // const errorMessage = document.getElementById('errorMessage');
                //errorMessage.textContent = 'Incorrect email or password. Please try again.';
				alert("Incorrect email or password. Please try again.");
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error(error);
        });
});


//RESET PASSWORD

const passwordMessage = document.querySelector('.password-message');
const forgotPasswordLink = document.querySelector('a[href="#"]');
email=document.querySelector('input[placeholder="Enter Your Email"]').value;
forgotPasswordLink.addEventListener('click', () => {	    // Hide the password input field
const passwordInput = document.querySelector('input[placeholder="Enter Your Password"]');
passwordInput.style.display = "none";
document.getElementById('forgot').innerHTML = `<a onclick="location.reload()">Login Again </a>`;
document.getElementById('btnSignIn').style="display:none";
document.getElementById('btnReset').style="block";
email=document.querySelector('input[placeholder="Enter Your Email"]').value;
});

// EARLIER RESET PASSWORD

function resetPassword() {
	console.log("reset password");
	const email = document.querySelector('input[placeholder="Enter Your Email"]').value;
	console.log(email);
	if (email !== null && email !== "") {
		const apiUrl = 'https://speleograph.tools.eurecom.fr/api';
		fetch(`${apiUrl}/user/forgot-password`, {
		//fetch('http://localhost:8083/api/user/forgot-password', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Error: ' + response.status);
				}
				return response.json();
			})
			.then(data => {
				// Handle the response from the backend
				console.log(data);
				passwordMessage.innerHTML = `Password reset instructions have been sent to ${email}.`;
				document.getElementById('btnReset').style = "display:none";
			})
			.catch(error => {
				// Handle any errors that occurred during the request
				console.error(error);
			});
	}
}


  const mobilesignin = document.querySelector('.signinbutton');
  const mobilesignup = document.querySelector('.signupbutton');
  const mobileSignIn = document.querySelector('.mobile-sign-in');
  const mobileSignUp = document.querySelector('.mobile-sign-up')
  mobilesignin.addEventListener('click', () => {
	mobileSignUp.classList.add("hide-mobile");
	mobileSignIn.classList.add("show-mobile");
	mobileSignIn.classList.remove("hide-mobile");
	mobileSignUp.classList.remove("show-mobile");
	
  });
  mobilesignup.addEventListener('click', () => {
	mobileSignIn.classList.add("hide-mobile");
	mobileSignUp.classList.add("show-mobile");
	mobileSignUp.classList.remove("hide-mobile");
	mobileSignIn.classList.remove("show-mobile");
  });