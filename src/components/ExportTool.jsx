import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportTools = ({ data }) => {
  // 📊 EXCEL EXPORT
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "bookings.xlsx");
  };

  // 📄 PDF INVOICE
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("MobileFix Invoice", 14, 10);

    autoTable(doc, {
      head: [["ID", "Brand", "Service", "Status"]],
      body: data.map((item) => [
        item.id,
        item.brand,
        item.service,
        item.status,
      ]),
    });

    doc.save("invoice.pdf");
  };

  // 🖨 PRINT INVOICE
  const printInvoice = () => {
    const printContent = document.getElementById("invoiceTable");
    const win = window.open("", "", "width=900,height=650");

    win.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <div className="flex gap-4 mb-6">

      <button
        onClick={exportToExcel}
        className="px-4 py-2 bg-green-500 text-white rounded-xl"
      >
        Export Excel
      </button>

      <button
        onClick={exportToPDF}
        className="px-4 py-2 bg-red-500 text-white rounded-xl"
      >
        Download PDF
      </button>

      <button
        onClick={printInvoice}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl"
      >
        Print Invoice
      </button>

    </div>
  );
};

export default ExportTools;