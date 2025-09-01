import React, { useState, useEffect } from 'react';
import Table from './components/table';
import { fetchDataset, DATASETS } from './services/api';
import './App.css';

function App() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      setLoading(true); 
      
      try {
        const result = await fetchDataset(DATASETS.ESPACES_VERTS);
        setData(result); 
        console.log('Données chargées:', result); 
      } catch (error) {
        console.error('Erreur chargement:', error);
      } finally {
        setLoading(false); 
      }
    };

    loadData(); 
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: '#5f259f' }}>Les meilleurs Spots FRAIS de Paris ! </h1>
      </header>
      
      <main style={{ padding: '20px' }}>
        <Table data={data} loading={loading} />
      </main>
    </div>
  );
}

export default App;