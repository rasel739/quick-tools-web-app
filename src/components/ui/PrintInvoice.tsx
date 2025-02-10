import { InvoiceType } from "@/types/invoice.type";
import Image from "next/image";
import React from "react";

type InvoiceProps = {
  invoiceData: InvoiceType | null;
};

const PrintInvoice: React.FC<InvoiceProps> = ({ invoiceData }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6">
      <div className="grid grid-cols-2 items-center">
        <div>
          <Image
            src="/quick-tools-invoice-logo.svg"
            alt="company-logo"
            height={50}
            width={50}
          />
          <h1>Quick Tools</h1>
        </div>
        {/* <div className="text-right">
          <p>Tailwind Inc.</p>
          <p className="text-gray-500 text-sm">sales@tailwindcss.com</p>
          <p className="text-gray-500 text-sm mt-1">+41-442341232</p>
          <p className="text-gray-500 text-sm mt-1">VAT: 8657671212</p>
        </div> */}
      </div>

      {/* <div className="grid grid-cols-2 items-center mt-8">
        <div>
          <p className="font-bold text-gray-800">Bill to :</p>
          <p className="text-gray-500">
            Laravel LLC.
            <br />
            102, San-Fransico, CA, USA
          </p>
          <p className="text-gray-500">info@laravel.com</p>
        </div>
        <div className="text-right">
          <p>
            Invoice number:{" "}
            <span className="text-gray-500">INV-2023786123</span>
          </p>
          <p>
            Invoice date: <span className="text-gray-500">03/07/2023</span>
            <br />
            Due date: <span className="text-gray-500">31/07/2023</span>
          </p>
        </div>
      </div> */}

      <div className="-mx-4 mt-8 flow-root sm:mx-0">
        <table className="min-w-full">
          <thead className="border-b border-gray-300 text-gray-900">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold">
                Currency
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Foregin Currency",
                currency: invoiceData?.foreignCurrency,
              },
              {
                name: "Local Exchange Rate",
                currency: invoiceData?.localExchangeRate,
              },
              {
                name: "Local Insert Currency",

                currency: invoiceData?.localMoney,
              },
            ].map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-3 py-5 text-right text-sm text-gray-500">
                  {item.currency}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                colSpan={3}
                className="pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900"
              >
                Converted Total Amount
              </th>
              <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900">
                {invoiceData?.convertedTotalAmount}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
        Please process a payment of {invoiceData?.convertedTotalAmount} foregin
        currency to the buyer at your earliest convenience.
      </div>
    </div>
  );
};

export default PrintInvoice;
