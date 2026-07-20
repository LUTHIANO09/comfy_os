import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportReportExcel = (report) => {
  if (!report) return;

  const rows = [
    {
      "Total Sales": report.total_sales,
      "Total Expenses": report.total_expenses,
      "Net Profit": report.net_profit,
      Products: report.products,
      Customers: report.customers,
      "Low Stock": report.low_stock,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Report"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "Business_Report.xlsx");
};