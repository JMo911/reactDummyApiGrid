import React, { useState, useEffect } from 'react';
import './App.css';
import Introduction from './components/introduction';
import SearchForm from './components/searchForm';
import DataTable from './components/dataTable';
import UserInterface from './interfaces/userInterface';

function App() {
  const [apiData, setApiData] = useState<UserInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApiData, setFilteredApiData] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => setApiData(json.data))
    };
    fetchData();
  }, [])

  const setUserSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const executeUserQuery = () => {
      const query = searchTerm;
      const filteredList = apiData.filter((user: UserInterface) => user.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1);
      setFilteredApiData(filteredList);
    }
    executeUserQuery();
  }, [apiData, searchTerm])



  return (
    <div>
      <div>
        <Introduction />
      </div>
      <div>
      <SearchForm setUserSearchTerm={setUserSearchTerm} />
      </div>
      <div>
        <DataTable data={searchTerm ? filteredApiData: apiData} />
      </div>
      <div>
        pagination widget goes here
      </div>
    </div>
  );
}

export default App;
