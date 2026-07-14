import Card from "./Card";

function RecentSales({ sales }) {
  return (
    <Card title="Recent Sales">

      <div className="divide-y">

        {sales.length === 0 ? (

          <div className="py-8 text-center text-slate-500">
            No recent sales found.
          </div>

        ) : (

          sales.map((sale) => (

            <div
              key={sale.id}
              className="flex justify-between items-center py-4"
            >

              <div>

                <h4 className="font-semibold">
                  {sale.receipt}
                </h4>

                <p className="text-sm text-slate-500">
                  {sale.cashier} • {sale.payment}
                </p>

                <p className="text-xs text-slate-400">
                  {sale.date}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">
                  ₦{Number(sale.amount).toLocaleString()}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </Card>
  );
}

export default RecentSales;