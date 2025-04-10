const TransactionTable = () => {
    const transactions = [
      { name: "22-03-2025", role: "500", status: "Credit" },
      { name: "23-03-2025", role: "200", status: "Debit" },
      { name: "30-03-2025", role: "300", status: "Credit" },
      { name: "05-04-2025", role: "100", status: "Credit" },
    
    ];
  
    return (
      <div className="w-screen overflow-x-auto px-0">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm" style={{width: "-webkit-fill-available"}}>
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Transaction Date</th>
              <th className="py-2 px-4 border-b">Transaction Amount</th>
              <th className="py-2 px-4 border-b">Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => (
              <tr
                key={index}
                className={
                  item.status === "success" ? "bg-green-50" : "bg-white"
                }
              >
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b font-semibold">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.role}</td>
                <td className="py-2 px-4 border-b">
  <span
    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
      item.status === "Credit"
        ? "bg-green-200 text-green-800"
        : "bg-red-200 text-red-800"
    }`}
  >
    {item.status}
  </span>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TransactionTable;
  