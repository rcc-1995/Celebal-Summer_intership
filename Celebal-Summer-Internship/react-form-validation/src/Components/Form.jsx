import React, { Component } from 'react';
import { withNavigation } from './withNavigation';
import './Form.css';

// Regular expressions for validation
const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordValidator = /^.{5,}$/; // At least 5 characters
const phoneNoValidator = /^\d{10}$/; // Exactly 10 digits
const aadharNoValidator = /^\d{12}$/; // Exactly 12 digits
const panNoValidator = /^\d{10}$/; // Exactly 10 digits

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneNo: '',
        country: '',
        city: '',
        panNo: '',
        aadharNo: '',
      },
      errors: {},
      showPassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }

  validate() {
    const { formData } = this.state;
    const errors = {};

    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailValidator.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!passwordValidator.test(formData.password)) {
      errors.password = 'Password must be at least 5 characters';
    }
    if (!formData.phoneNo) {
      errors.phoneNo = 'Phone No. is required';
    } else if (!phoneNoValidator.test(formData.phoneNo)) {
      errors.phoneNo = 'Phone No. must be exactly 10 digits';
    }
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.panNo) {
      errors.panNo = 'Pan No. is required';
    }
    else if (!panNoValidator.test(formData.panNo)) {
      errors.panNo = 'Pan No. must be exactly 10 digits';
    }
    if (!formData.aadharNo) {
      errors.aadharNo = 'Aadhar No. is required';
    }
    else if (!aadharNoValidator.test(formData.aadharNo)) {
      errors.aadharNo = 'Aadhar No. must be exactly 12 digits';
    }

    return errors;
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.props.navigate('/success', { state: { formData: this.state.formData } });
    }
  }

  toggleShowPassword() {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  }

  renderCityOptions() {
    const { country } = this.state.formData;
    let cities = [];

    if (country === 'India') {
      cities = ['Delhi', 'Mumbai', 'Bangalore'];
    } else if (country === 'USA') {
      cities = ['New York', 'Los Angeles', 'Chicago'];
    }

    return cities.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ));
  }

  render() {
    const { formData, errors, showPassword } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={this.handleChange}
          />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={this.handleChange}
          />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={this.handleChange}
          />
          {errors.username && <span>{errors.username}</span>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={this.handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={this.handleChange}
          />
          <button type="button" className="show-password-toggle" onClick={this.toggleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label>Phone No.</label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={this.handleChange}
          />
          {errors.phoneNo && <span>{errors.phoneNo}</span>}
        </div>
        <div>
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={this.handleChange}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            {/* Add more countries as needed */}
          </select>
          {errors.country && <span>{errors.country}</span>}
        </div>
        <div>
          <label>City</label>
          <select
            name="city"
            value={formData.city}
            onChange={this.handleChange}
          >
            <option value="">Select City</option>
            {this.renderCityOptions()}
          </select>
          {errors.city && <span>{errors.city}</span>}
        </div>
        <div>
          <label>Pan No.</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={this.handleChange}
          />
          {errors.panNo && <span>{errors.panNo}</span>}
        </div>
        <div>
          <label>Aadhar No.</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={this.handleChange}
          />
          {errors.aadharNo && <span>{errors.aadharNo}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withNavigation(Form);
