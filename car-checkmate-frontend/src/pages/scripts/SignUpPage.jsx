import React, { useState } from 'react';

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        register: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Data:", formData);
        // Add your form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    name="firstName"
                    value={formData.firstName}
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                    name="lastName"
                    value={formData.lastName}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                />
            </label>
            <br />
            <label>
                Confirm Password:
                <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                />
            </label>
            <br />
            <label>
                Register as:
                <input 
                    type="radio"
                    name="register"
                    value="buyer"
                    onChange={handleChange}
                />
                Buyer
            </label>
            <label>
                <input 
                    type="radio"
                    name="register"
                    value="seller"
                    onChange={handleChange}
                />
                Seller
            </label>
            <label>
                <input 
                    type="radio"
                    name="register"
                    value="mechanic"
                    onChange={handleChange}
                />
                Mechanic
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}
