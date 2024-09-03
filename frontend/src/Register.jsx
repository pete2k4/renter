import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react'

function Register() {
    const URL="/auth/register"
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

      
    const registerUser = (event) => {
        event.preventDefault()
        const user = {
            name: formValues.name,
            password: formValues.password,
        }

        axios.
            post(URL, user).
            then(console.log('user posted!'))
    }

    return (
        <form onSubmit={registerUser}>
        <div>
            <label>Name:</label>
            <input onChange={handleChange} value={formValues.name} type="text" name="name"  />
        </div>
        <div>
            <label>Password:</label>
            <input onChange={handleChange} value={formValues.password} type="text" name="password"  />
        </div>
        <button type="submit">Register</button>
        </form>
    );
}

export default Register;
