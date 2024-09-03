import { useState } from 'react';
import axios from 'axios';


const Login = ({setUser, setIsAuthenticated}) => {
  const URL="/auth/login"
    const [formValues, setFormValues] = useState({
        name: '',
        password: ''
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const loginUser = (event) => {
      event.preventDefault();
      const user = {
        name: formValues.name,
        password: formValues.password
      };
  
      axios.post(URL, user)
        .then(response => {
          if (response.data.user) {
            // Update state on successful login
            setIsAuthenticated(true);
            setUser(response.data.user);
          }
        })
        .catch(error => {
          console.error('Error logging in', error);
        });
    };
  
  return (
    <form onSubmit={loginUser}>
      <div>
        <label>Name:</label>
        <input type="text" name='name' onChange={(handleChange)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name='password' onChange={handleChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
