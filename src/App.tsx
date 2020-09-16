import React, { useState, useEffect } from 'react';
import './App.css';
import Introduction from './components/introduction';
import SearchForm from './components/searchForm';
import DataTable from './components/dataTable';
import UserInterface from './interfaces/userInterface';
import Pagination from './components/pagination';

function App() {
  const [apiData, setApiData] = useState<UserInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApiData, setFilteredApiData] = useState<UserInterface[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => setApiData(json.data))
    };
    fetchData();
  }, []);

  const setUserSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const executeUserQuery = () => {
      const query = searchTerm;
      const filteredList = paginatedData.filter((user: UserInterface) => user.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1);
      setFilteredApiData(filteredList);
    }
    executeUserQuery();
  }, [paginatedData, searchTerm]);

  const updateCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // when user clicks on a number, we need to grab a slice of data that corresponds to the records that should be on that page i.e. if we want 10 records per page and click on page 1, then show records 0-9..
// 9 comes from page number * records per page -1
// 0 comes from index of last record - records per page

  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const pagination = () => {
      const paginatedList = apiData.slice(indexOfFirstRecord, indexOfLastRecord);
      setPaginatedData(paginatedList);
    }
    pagination();
  }, [apiData, recordsPerPage, currentPage]);

  return (
    <div>
      <div>
        <Introduction />
      </div>
      <div>
      <SearchForm setUserSearchTerm={setUserSearchTerm} />
      </div>
      <div>
        <DataTable data={searchTerm ? filteredApiData: paginatedData} />
      </div>
      <div>
        <Pagination totalRecords={searchTerm ? filteredApiData.length: apiData.length} recordsPerPage={recordsPerPage} updateCurrentPage={updateCurrentPage} />
      </div>
    </div>
  );
}

export default App;
