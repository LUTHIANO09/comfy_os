import { useEffect, useRef, useState } from "react";
import { getSettings } from "../services/settingsService";

function ReceiptModal({ sale, onClose }) {



  const receiptRef = useRef(null);

  const [settings, setSettings] = useState(null);

        useEffect(() => {
        const loadSettings = async () => {
            try {
            const data = await getSettings();
            setSettings(data);
            } catch (error) {
            console.error(error);
            }
        };

        loadSettings();
        }, []);

        if (!sale) return null;

const handlePrint = () => {

  const printContents = receiptRef.current.outerHTML;

  const printWindow = window.open("", "", "width=800,height=700");

  printWindow.document.write(`
    <html>
      <head>
        <title>${settings?.business_name || "Receipt"}</title>

        <style>

          body{
            font-family: Arial, Helvetica, sans-serif;
            margin:0;
            padding:0;
            background:#fff;
        }

        *{
            box-sizing:border-box;
        }

        img{
            max-width:120px;
        }

        hr{
            border:none;
            border-top:1px dashed #ccc;
            margin:16px 0;
        }

        .text-center{
            text-align:center;
        }
        @page{
            margin:8mm;
        }

        </style>

      </head>

      <body>

        ${printContents}

      </body>

    </html>
  `);

  printWindow.document.close();

  printWindow.focus();

  printWindow.print();

  printWindow.close();

};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="w-full max-w-[360px]">

            {/* Buttons (NOT printed) */}
            <div className="mb-4 flex justify-end gap-3">

                 <button
                    onClick={handlePrint}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    🖨 Print
                </button>

                <button
                    onClick={onClose}
                    className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700">
                    ✕ Close
                </button>

            </div>

            {/* Receipt (printed) */}
            <div
            ref={receiptRef}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="border-b px-6 py-6">

            {settings?.logo && (
                <div className="flex justify-center mb-3">
                <img
                    src={settings.logo}
                    alt="Business Logo"
                    className="h-20 object-contain"
                />
                </div>
            )}

            <h2 className="text-center text-2xl font-bold">
                {settings?.business_name || "COMFY FOOTWEARS"}
            </h2>

            <p className="mt-1 text-center text-sm text-slate-500">
                Customer Receipt
            </p>

            <div className="mt-4 space-y-1 text-center text-sm text-slate-500">

                {settings?.business_address && (
                <p>{settings.business_address}</p>
                )}

                {settings?.phone_number && (
                <p>{settings.phone_number}</p>
                )}

                {settings?.email && (
                <p>{settings.email}</p>
                )}

            </div>

            </div>

        {/* Body */}

        <div className="p-6">

          <div className="space-y-3">

           <div className="space-y-2 text-sm">

                <div className="flex justify-between">

                    <span className="text-slate-500">
                    Receipt No.
                    </span>

                    <span className="font-semibold">
                    {sale.receipt_number}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">
                    Date
                    </span>

                    <span>
                    {new Date(sale.created_at).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">
                    Cashier
                    </span>

                    <span>
                    {sale.cashier_name}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">
                    Payment
                    </span>

                    <span>
                    {sale.payment_method_display}
                    </span>

                </div>

                </div>
            <hr className="my-4" />

           <h3 className="font-semibold mb-3">
                    Items
                </h3>

                <div className="border rounded-lg overflow-hidden">

                    <div className="grid grid-cols-12 bg-slate-100 px-3 py-2 text-xs font-semibold uppercase">

                        <div className="col-span-6">
                            Product
                        </div>

                        <div className="col-span-2 text-center">
                            Qty
                        </div>

                        <div className="col-span-4 text-right">
                            Total
                        </div>

                    </div>

                    {sale.items.map((item) => (

                        <div
                            key={item.id}
                            className="grid grid-cols-12 px-3 py-3 border-t text-sm"
                        >

                            <div className="col-span-6">
                                {item.product_name}
                            </div>

                            <div className="col-span-2 text-center">
                                {item.quantity}
                            </div>

                            <div className="col-span-4 text-right font-medium">
                                {settings?.currency || "₦"}
                                {Number(item.total_price).toLocaleString()}
                            </div>

                        </div>

                    ))}

                </div>

            <hr className="my-5" />

<div className="space-y-3">

    <div className="flex justify-between">

        <span className="text-slate-500">
            Subtotal
        </span>

        <span>
            {settings?.currency || "₦"}
            {Number(sale.subtotal).toLocaleString()}
        </span>

    </div>

    <div className="flex justify-between">

        <span className="text-slate-500">
            Discount
        </span>

        <span>
            {settings?.currency || "₦"}
            {Number(sale.discount).toLocaleString()}
        </span>

    </div>

    <div className="flex justify-between">

        <span className="text-slate-500">
            Payment Method
        </span>

        <span>
            {sale.payment_method_display}
        </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">
                        Status
                    </span>

                    <span className="text-green-600 font-semibold">
                        {sale.status_display}
                    </span>

                </div>

                <hr />

                <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3 text-lg font-bold">

                    <span>
                        TOTAL
                    </span>

                    <span className="text-blue-600">
                        {settings?.currency || "₦"}
                        {Number(sale.total_amount).toLocaleString()}
                    </span>

                </div>

                <hr className="my-6" />


                   <div className="text-center space-y-2">

                            <p className="text-sm font-semibold">
                                {settings?.receipt_footer || "Thank you for shopping with us!"}
                            </p>

                            <p className="text-sm text-slate-500">
                                Visit Again
                            </p>

                            <p className="text-xs text-slate-400">
                                Powered by COMFY OS
                            </p>

                        </div>


            </div>

          </div>

        </div>

      </div>

    </div>

    </div>
  );
}

export default ReceiptModal;