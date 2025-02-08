"use client";
import InputField from "@/components/common/InputField";
import { FormEvent, useState } from "react";

const HomePage = () => {
  type InputFormType = {
    currency: string;
    exchangeRate: string;
    localMoney: string;
  };

  const initialState: InputFormType = {
    currency: "",
    exchangeRate: "",
    localMoney: "",
  };

  const [formData, setFormData] = useState<InputFormType>(initialState);
  const [exchangeAmount, setExchangeAmount] = useState("0");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trim input values to remove unnecessary spaces
    const currency = formData.currency.trim();
    const exchangeRate = formData.exchangeRate.trim();
    const localMoney = formData.localMoney.trim();

    if (!currency) {
      setError("Foregin Currency field is required.");
      setExchangeAmount("0");
      return;
    }

    if (!exchangeRate) {
      setError("Local Exchange Rate field is required.");
      setExchangeAmount("0");
      return;
    }

    if (!localMoney) {
      setError("Insert Local Money Amount field is required.");
      setExchangeAmount("0");
      return;
    }

    setError("");

    setExchangeAmount(exchangeAmount || "0");

    if (
      isNaN(Number(currency)) ||
      isNaN(Number(exchangeRate)) ||
      isNaN(Number(localMoney))
    ) {
      setError(
        "Please enter valid numeric values for Currency, Exchange Rate, and Local Money."
      );
      return;
    }

    // Convert inputs to numbers
    const currencyValue = parseFloat(currency);
    const exchangeRateValue = parseFloat(exchangeRate);
    const localMoneyValue = parseFloat(localMoney);

    // Prevent division by zero
    if (
      currencyValue === 0 ||
      exchangeRateValue === 0 ||
      localMoneyValue === 0
    ) {
      setError("Input field cannot be zero.");
      return;
    }

    // Perform currency conversion
    const convertedAmount = (
      (currencyValue / exchangeRateValue) *
      localMoneyValue
    ).toFixed(3);
    setExchangeAmount(convertedAmount);
  };

  const handleReset = () => {
    setFormData(initialState);
    setError(null);
    setExchangeAmount("0");
  };

  return (
    <div className="sm:m-20 sm:p-5 m-2 p-3 rounded-box bg-gray-200">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex justify-center items-center">
            <h1 className="font-bold text-accent text-1xl sm:text-2xl">
              Foreign Currency Converter
            </h1>
          </div>
          <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 flex justify-center flex-col items-center">
            {error && (
              <div className="text-red-500 text-sm bg-red-100 px-3 py-2 rounded">
                {error}
              </div>
            )}

            <InputField
              name="currency"
              type="text"
              placeholder="Foreign Currency"
              handleChange={handleChange}
            />

            <InputField
              name="exchangeRate"
              type="text"
              placeholder="Local Exchange Rate"
              handleChange={handleChange}
            />

            <InputField
              name="localMoney"
              type="text"
              placeholder="Insert Local Money Amount"
              handleChange={handleChange}
            />

            <div>
              <span>
                <span className="text-black font-bold">Converted Amount: </span>
                <span className="text-green-800 font-bold">
                  {exchangeAmount}
                </span>
              </span>
            </div>

            <div className="flex justify-between items-center">
              <button
                className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-success text-white mr-4`}
                disabled={formData.localMoney === "" ? true : false}
                type="submit"
              >
                Convert
              </button>
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white btn-error btn-outline"
                type="reset"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
