import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import mockTransations from '../api/mockTransactions';
import DateFilter from './DateFilter';
import Sort from './Sort';
import Summary from './Summary';
import { TransactionsTable } from './TransactionsTable';

// Simulate API Request with Async/Await
const fetchMockData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) { // Simulate random failure 
        reject(new Error('Failed to fetch data'));
      } else {
        resolve(mockTransations);
      }
    }, 1000); // Simulate network delay
  });
};

const PaymentTransactions = () => {

  const [transactions, setTransactions] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sorting
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMockData(); // Await the mock data
        setTransactions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const filteredTransactions = () => {
    if (!startDate || !endDate) return transactions;
    const filteredList = transactions.filter((transaction) => {
      const date = new Date(transaction.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    return filteredList;
  };

  // Calculate the total amount for the filtered transactions
  const totalAmount = filteredTransactions().reduce((acc, transaction) => acc + transaction.amount, 0);


  // Paginate filtered transactions
  const paginatedTransactions = () => {
    const filtered = sortTransactions(filteredTransactions());
    const start = currentPage * transactionsPerPage;
    const end = start + transactionsPerPage;
    return filtered.slice(start, end);
  };

  const sortTransactions = (transactions) => {
    return transactions.sort((a, b) => {
      if (sortField === 'date') {
        return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
      } else if (sortField === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });
  };

  // Handle navigation page click
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const pageCount = Math.ceil(filteredTransactions().length / transactionsPerPage);

  if (loading) return <span className="loading loading-spinner loading-md"></span>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="container">
      <h2 className='text-3xl pb-2 font-bold underline'>Payment Transactions</h2>

      <div className=' flex  justify-between'>
        <DateFilter startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
        <Sort sortOrder={sortOrder} sortField={sortField} setSortField={setSortField} setSortOrder={setSortOrder} />
      </div>
      {!paginatedTransactions().length ? (
        <p className="text-warning">No results matching the selected dates!</p>
      ) : (
        <TransactionsTable transactions={paginatedTransactions()} />
      )}
      <Summary totalTransactions={paginatedTransactions().length} totalAmount={totalAmount} />

      <ReactPaginate
        previousLabel={'< previous'}
        nextLabel={'next >'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination join m-2'}
        activeClassName={'active'}
      />
    </main>
  );
}

export default PaymentTransactions