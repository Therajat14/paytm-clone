import React, { useState } from "react";
import FormWrapper from "../Components/FormWrapper";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import AuthFooter from "../Components/AuthFooter";
import axios from "axios";
import { useNavigate } from "react-router";

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <FormWrapper
      title="Welcome back"
      subtitle="Enter your credentials to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Button
          type="submit"
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/auth/signin",
              form,
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }}
        >
          Sign In
        </Button>
      </form>

      <AuthFooter
        text="Don't have an account?"
        linkText="Sign up"
        to="/register"
      />
    </FormWrapper>
  );
};

export default Signin;
