import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  // State to manage form inputs
  const [formState, setFormState] = useState({ email: '', password: '' });
  // Mutation hook to perform login mutation
  const [login, { error }] = useMutation(LOGIN);

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform login mutation
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      // Retrieve token from response and store it
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log('error', e);
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
          <Link to="/signup">← Go to Sign Up</Link>

          <h2 className="text-center mb-4 mt-5">Log In To Your Account</h2>
          {/* Form fields with Bootstrap styling */}
          <form onSubmit={handleFormSubmit}>
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
            {/* Display error message if login fails */}
            {error ? (
              <div>
                <p className="error-text" style={{ width: '20rem'}}>The provided credentials are incorrect</p>
              </div>
            ) : null}
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

export default Login;
