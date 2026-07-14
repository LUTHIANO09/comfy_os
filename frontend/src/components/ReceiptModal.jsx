import { useRef } from "react";

function ReceiptModal({ sale, onClose }) {

  if (!sale) return null;

  const receiptRef = useRef(null);

const handlePrint = () => {

  const printContents = receiptRef.current.innerHTML;

  const printWindow = window.open("", "", "width=800,height=700");

  printWindow.document.write(`
    <html>
      <head>
        <title>Receipt</title>

        <style>

          body{
            font-family: Arial, sans-serif;
            padding:30px;
          }

          table{
            width:100%;
            border-collapse:collapse;
          }

          th,
          td{
            padding:8px;
            border-bottom:1px solid #ddd;
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

      <div ref={receiptRef} className="bg-white rounded-2xl w-[420px] shadow-2xl overflow-hidden" >

        {/* Header */}

        <div className="bg-slate-900 text-white px-6 py-5">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-xl font-bold">
                COMFY FOOTWEARS
              </h2>

              <p className="text-sm text-slate-300 mt-1">
                Sales Receipt
              </p>

            </div>

                <div className="flex items-center gap-3">

                    <button
                        onClick={handlePrint}
                        className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 transition"
                    >
                        🖨 Print
                    </button>

                    <button
                        onClick={onClose}
                        className="text-white hover:text-red-300 text-xl"
                    >
                        ✕
                    </button>

                </div>

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
                    {new Date(sale.created_at).toLocaleString()}
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
                            Item
                        </div>

                        <div className="col-span-2 text-center">
                            Qty
                        </div>

                        <div className="col-span-4 text-right">
                            Amount
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
                                ₦{Number(item.total_price).toLocaleString()}
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
            ₦{Number(sale.subtotal).toLocaleString()}
        </span>

    </div>

    <div className="flex justify-between">

        <span className="text-slate-500">
            Discount
        </span>

        <span>
            ₦{Number(sale.discount).toLocaleString()}
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

                <div className="flex justify-between text-xl font-bold">

                    <span>
                        TOTAL
                    </span>

                    <span className="text-blue-600">
                        ₦{Number(sale.total_amount).toLocaleString()}
                    </span>

                </div>

                <hr className="my-6" />

                <div className="text-center space-y-2">

                    <h3 className="font-bold text-lg">
                        COMFY FOOTWEARS
                    </h3>

                    <p className="text-sm text-slate-500">
                        Lagos, Nigeria
                    </p>

                    <p className="text-sm text-slate-500">
                        +234 XXX XXX XXXX
                    </p>

                    <p className="text-sm text-slate-500">
                        support@comfyfootwears.com
                    </p>

                    <div className="pt-4">

                        <p className="font-semibold">
                            Thank you for shopping with us!
                        </p>

                        <p className="text-xs text-slate-500 mt-2">
                            Goods sold are not returnable except as permitted by our return policy.
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