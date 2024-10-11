
export const TransactionsTable = ({ transactions }) => {
    return (
        <table className="transaction-table table">
            <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount (USD)</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.description}</td>
                        <td>${transaction.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
