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
  const [filterQueries, setFilterQueries] = useState<any>({
    "id": "",
    "email": "",
    "first_name": "",
    "last_name": "",
    "avatar": ""
  });

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

  const updateRecordsPerPage = (recordsPerPage: number) => {
    setRecordsPerPage(recordsPerPage);
  };

  const updateFilterQueries = (column: any, term: any) => {
    const clonedQueries = {...filterQueries};
    clonedQueries[column] = term
    setFilterQueries(clonedQueries);
  };

  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const pagination = () => {
      const paginatedList = apiData.slice(indexOfFirstRecord, indexOfLastRecord);
      setPaginatedData(paginatedList);
    }
    pagination();
  }, [apiData, recordsPerPage, currentPage]);

  // useEffect(() => {
  //   // const executeFilterQueries = () => {
  //   //   return Object.keys(filterQueries).every((key) => user[key].toLowerCase().indexOf(query.toLowerCase()) > -1);

  //   // }
  //   // executeFilterQueries();

  //   // const executeFilterQueries = () => {
  //   //   let filteredList: UserInterface[] = [];
  //   //   if(filterQueries.first_name.split("").length > 0) {
  //   //     filteredList = paginatedData.filter((user: UserInterface) => user.first_name.toLowerCase().indexOf(filterQueries.first_name.toLowerCase()) > -1)
  //   //     console.log(filterQueries.first_name.toLowerCase())
  //   //   }


  //   //   // const filteredList = paginatedData.filter((user: UserInterface) => user.first_name.toLowerCase().indexOf(filterQueries['first_name'].toLowerCase()) > -1)
  //   //   setFilteredApiData(filteredList);
  //   //   // console.log(filterQueries.first_name.toLowerCase())
  //   // }
  //   // executeFilterQueries();

    
  // }, [paginatedData, filterQueries]);

  return (
    <div>
      <div>
        <Introduction />
      </div>
      <div>
      <SearchForm setUserSearchTerm={setUserSearchTerm} />
      </div>
      <div>
        <DataTable data={searchTerm ? filteredApiData: paginatedData} updateFilterQueries={updateFilterQueries} />
      </div>
      <div>
        <Pagination totalRecords={apiData.length} recordsPerPage={recordsPerPage} updateCurrentPage={updateCurrentPage} updateRecordsPerPage={updateRecordsPerPage} />
      </div>
    </div>
  );
}

export default App;
