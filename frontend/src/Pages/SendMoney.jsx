import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FormWrapper from "../Components/FormWrapper";
import InputField from "../Components/InputField";
import Button from "../Components/Button";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const to = searchParams.get("to");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      return alert("Enter valid amount");
    }

    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/account/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to,
          amount: Number(amount),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Payment successful 🚀");
        navigate("/dashboard");
      } else {
        alert(data.message || "Transfer failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Send Money" subtitle={`Sending to ${name}`}>
      <form onSubmit={handleTransfer} className="space-y-4">
        {/* Receiver Info */}
        <div className="p-3 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-500">To</p>
          <p className="font-medium text-black">{name}</p>
        </div>

        {/* Amount Input */}
        <InputField
          label="Amount"
          name="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Button */}
        <Button type="submit" loading={loading}>
          Send Money
        </Button>
      </form>
    </FormWrapper>
  );
};

export default SendMoney;
