import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup() {
  // State for form data
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null); // New state for error message

  // Apollo mutation hook
  const [addUser] = useMutation(ADD_USER);

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform Apollo mutation
      const { data } = await addUser({
        variables: { ...formState },
      });

      // Extract token from mutation response and login
      const token = data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.error(e);
  
      // Check if the error is due to a duplicate key (email already exists)
      if (e.message.includes("duplicate key error")) {
        setErrorMessage("This email is already in use. Please use a different email.");
      } else if (e.message.includes("User validation failed: password:")) {
        // Display the specific password-related error message
        setErrorMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      } else {
        setErrorMessage("An error occurred during signup.");
      }
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signUp mt-5 container d-flex align-items-center justify-content-center">
      <div className="card">
        <div className="card-body">
          <Link to="/login">← Go to Login</Link>

          <h2 className="text-center mb-4 mt-4">Create Your Account</h2>

          {/* Display error message if exists */}
          {errorMessage && <div className="alert alert-danger passCheck">{errorMessage}</div>}

          {/* Form fields with Bootstrap styling */}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3 signUpBox">
              <label htmlFor="firstName" className="form-label firstNameLabel" style={{ marginRight: '17rem'}}>
                First Name:
              </label>
              <input
                className="form-control loginFont"
                placeholder=""
                name="firstName"
                type="text"
                id="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 signUpBox">
              <label htmlFor="lastName" className="form-label lastNameLabel" style={{ marginRight: '17rem'}}>
                Last Name:
              </label>
              <input
                className="form-control loginFont"
                placeholder=""
                name="lastName"
                type="text"
                id="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 signUpBox">
              <label htmlFor="email" className="form-label emailLabel" style={{ marginRight: '19.5rem'}}>
                Email:
              </label>
              <input
                className="form-control loginFont"
                placeholder=""
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 signUpBox">
              <label htmlFor="pwd" className="form-label pwLabel" style={{ marginRight: '17rem'}}>
                Password:
              </label>
              <input
                className="form-control loginFont"
                placeholder=""
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            <div className="mb-2 text-center submitButton">
              <button type="submit" className="btn btn-primary mt-2" style={{ marginRight: '3rem'}}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

