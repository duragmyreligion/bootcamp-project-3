import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup() {
  // State for form data
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });

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

          <h2 className="text-center mb-4">Create Your Account</h2>
          {/* Form fields with Bootstrap styling */}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3" style={{ width: '21rem'}}>
              <label htmlFor="firstName" className="form-label" style={{ marginRight: '14rem'}}>
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
            <div className="mb-3" style={{ width: '21rem'}}>
              <label htmlFor="lastName" className="form-label" style={{ marginRight: '14rem'}}>
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
            <div className="mb-3" style={{ width: '21rem'}}>
              <label htmlFor="email" className="form-label" style={{ marginRight: '17rem'}}>
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
            <div className="mb-3" style={{ width: '21rem'}}>
              <label htmlFor="pwd" className="form-label" style={{ marginRight: '14.5rem'}}>
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
            <div className="mb-2 text-center">
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

