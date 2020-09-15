import React, { useState, useEffect } from 'react';
import './App.css';
import Introduction from './components/introduction';
import SearchForm from './components/searchForm';
import DataTable from './components/dataTable';
import UserInterface from './interfaces/userInterface';

function App() {
  const [apiData, setApiData] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => setApiData(json.data))
    };
    fetchData();
  }, [])

  return (
    <div>
      <div>
        <Introduction />
      </div>
      <div>
      <SearchForm />
      </div>
      <div>
        <DataTable data={apiData} />
      </div>
      <div>
        pagination widget goes here
      </div>
    </div>
  );
}

export default App;
