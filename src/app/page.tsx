"use client";

import InputField from "@/components/common/InputField";
import PrintInvoice from "@/components/ui/PrintInvoice";
import { InvoiceType } from "@/types/invoice.type";
import { FormEvent, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState({
    currency: "",
    exchangeRate: "",
    localMoney: "",
  });

  const [errors, setErrors] = useState({
    currency: "",
    exchangeRate: "",
    localMoney: "",
  });
  console.log(formData);
  const [invoice, setInvoice] = useState<InvoiceType | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate field immediately when changed
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = "";

    if (!value) {
      errorMsg = `${name.replace(/([A-Z])/g, " $1")} is required.`;
    } else if (isNaN(Number(value))) {
      errorMsg = `${name.replace(/([A-Z])/g, " $1")} must be a valid number.`;
    } else if (Number(value) <= 0) {
      errorMsg = `${name.replace(
        /([A-Z])/g,
        " $1"
      )} must be greater than zero.`;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const isValidForm = () => {
    return (
      !Object.values(errors).some((err) => err) &&
      Object.values(formData).every((val) => val.trim() !== "")
    );
  };

  const exchangeAmount = useMemo(() => {
    const { currency, exchangeRate, localMoney } = formData;
    if (!isValidForm()) return "0";
    return (
      (parseFloat(currency) / parseFloat(exchangeRate)) *
      parseFloat(localMoney)
    ).toFixed(3);
  }, [formData, errors]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submitting
    Object.entries(formData).forEach(([key, value]) =>
      validateField(key, value)
    );

    if (!isValidForm()) return;

    setInvoice({
      foreignCurrency: formData?.currency,
      localExchangeRate: formData?.exchangeRate,
      localMoney: formData?.localMoney,
      convertedTotalAmount: exchangeAmount,
    });

    setTimeout(() => {
      reactToPrintFn();
    }, 1000);
  };

  const handleReset = () => {
    setFormData({ currency: "", exchangeRate: "", localMoney: "" });
    setErrors({ currency: "", exchangeRate: "", localMoney: "" });
    setInvoice(null);
  };

  return (
    <div className="sm:m-20 sm:p-5 m-2 p-3 rounded-box bg-gray-200">
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-accent text-1xl sm:text-2xl">
          Local to Foreign Currency Converter
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="py-4 space-y-4 text-gray-700 sm:text-lg flex justify-center flex-col items-center">
          <InputField
            name="currency"
            defaultValue={formData.currency}
            type="text"
            placeholder="Foreign Currency"
            handleChange={handleChange}
          />
          {errors.currency && (
            <p className="text-red-500 text-sm">{errors.currency}</p>
          )}

          <InputField
            name="exchangeRate"
            defaultValue={formData.exchangeRate}
            type="text"
            placeholder="Local Exchange Rate"
            handleChange={handleChange}
          />
          {errors.exchangeRate && (
            <p className="text-red-500 text-sm">{errors.exchangeRate}</p>
          )}

          <InputField
            name="localMoney"
            defaultValue={formData.localMoney}
            type="text"
            placeholder="Insert Local Currency"
            handleChange={handleChange}
          />
          {errors.localMoney && (
            <p className="text-red-500 text-sm">{errors.localMoney}</p>
          )}

          <div>
            <span className="text-black font-bold">Converted Amount: </span>
            <span className="text-green-800 font-bold">{exchangeAmount}</span>
          </div>
          <div className="flex justify-between items-center">
            <button className="btn btn-primary text-white mr-4" type="submit">
              Print
            </button>
            <button
              className="btn btn-error btn-outline text-white"
              onClick={() => handleReset()}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      <div className="hidden print:block" ref={contentRef}>
        {invoice && <PrintInvoice invoiceData={invoice} />}
      </div>
    </div>
  );
};

export default HomePage;
