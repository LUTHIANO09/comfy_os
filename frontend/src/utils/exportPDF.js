import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportReportPDF = (report) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("COMFY FOOTWEARS", 14, 18);

  doc.setFontSize(12);
  doc.text("Business Report", 14, 28);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    36
  );

  autoTable(doc, {
    startY: 45,
    head: [["Metric", "Value"]],
    body: [
      [
        "Total Sales",
        `₦${Number(report.total_sales).toLocaleString()}`,
      ],
      [
        "Total Expenses",
        `₦${Number(report.total_expenses).toLocaleString()}`,
      ],
      [
        "Net Profit",
        `₦${Number(report.net_profit).toLocaleString()}`,
      ],
      [
        "Products",
        report.products,
      ],
      [
        "Customers",
        report.customers,
      ],
      [
        "Low Stock",
        report.low_stock,
      ],
    ],
  });

  doc.save("Comfy_Report.pdf");
};