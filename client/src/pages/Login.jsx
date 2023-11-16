import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log('error', e);
    }
  };

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

          <h2 className="text-center mb-4">Log In To Your Account</h2>
          {/* Form fields with Bootstrap styling */}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3" style={{ width: '21rem'}}>
              <label htmlFor="email" className="form-label" style={{ marginRight: '17rem'}}>
                Email:
              </label>
              <input
                className="form-control"
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
                className="form-control"
                placeholder=""
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            {error ? (
          <div>
            <p className="error-text" style={{ width: '20rem'}}>The provided credentials are incorrect</p>
          </div>
            ) : null}
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

export default Login;
