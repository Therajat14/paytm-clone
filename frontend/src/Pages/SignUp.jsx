import React, { useState } from "react";
import FormWrapper from "../Components/FormWrapper";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import ErrorMessage from "../Components/ErrorMessage";
import AuthFooter from "../Components/AuthFooter";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation (keep it basic for now)
    if (!form.email.includes("@")) {
      return setError("Invalid email address");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setError("");
    console.log(form);
  };

  return (
    <FormWrapper
      title="Create an account"
      subtitle="Enter your details to get started"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Full Name"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          required
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        <ErrorMessage text={error} />

        <Button
          type="submit"
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/auth/signup",
              form,
            );
            localStorage.setItem("token", response.data.token);
          }}
        >
          Sign Up
        </Button>
      </form>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        to="/login"
      />
    </FormWrapper>
  );
};

export default Signup;
