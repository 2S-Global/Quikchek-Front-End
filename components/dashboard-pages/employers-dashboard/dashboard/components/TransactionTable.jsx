const TransactionTable = () => {
  const transactions = [
    { name: "22-03-2025", role: "500", status: "Credit" },
    { name: "23-03-2025", role: "200", status: "Debit" },
    { name: "30-03-2025", role: "300", status: "Credit" },
    { name: "05-04-2025", role: "100", status: "Credit" },
  ];

  return (
    <div className="container d-flex justify-content-start mt-4">
      <table className="table table-bordered text-center w-full">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Transaction Date</th>
            <th>Transaction Amount (₹)</th>
            <th>Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><strong>{item.name}</strong></td>
              <td>{item.role}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === "Credit"
                      ? "bg-success text-light"
                      : "bg-danger text-light"
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
