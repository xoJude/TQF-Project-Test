import React, { useState, useEffect } from 'react';
import Table from './components/table';
import Filters from './components/filters';
import { fetchDataset, DATASETS } from './services/api';
import './App.css';

function App() {
  // États pour les données
  const [allData, setAllData] = useState([]); // Toutes les données brutes
  const [filteredData, setFilteredData] = useState([]); // Données filtrées
  const [loading, setLoading] = useState(true);

  // États pour les filtres
  const [selectedDataset, setSelectedDataset] = useState(DATASETS.ESPACES_VERTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArrondissement, setSelectedArrondissement] = useState('');

  // Charger les données quand le dataset change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        console.log('Chargement dataset:', selectedDataset);
        const result = await fetchDataset(selectedDataset);
        setAllData(result);
        console.log('Données chargées:', result.length, 'éléments');
      } catch (error) {
        console.error('Erreur chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedDataset]); // Se relance quand selectedDataset change

  // Appliquer les filtres quand les données ou filtres changent
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...allData]; // Copie des données

      // Filtre par terme de recherche
      if (searchTerm.trim()) {
        filtered = filtered.filter(item => {
          const nom = item.fields?.nom || item.fields?.name || '';
          return nom.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }

      // Filtre par arrondissement
      if (selectedArrondissement) {
        filtered = filtered.filter(item => {
          const arr = item.fields?.arrondissement || '';
          return arr.includes(selectedArrondissement);
        });
      }

      setFilteredData(filtered);
      console.log('Filtres appliqués:', filtered.length, 'résultats');
    };

    applyFilters();
  }, [allData, searchTerm, selectedArrondissement]); // Se relance quand un de ces éléments change

  // Fonctions pour gérer les changements de filtres
  const handleDatasetChange = (dataset) => {
    console.log('Changement dataset vers:', dataset);
    setSelectedDataset(dataset);
    // Reset des autres filtres quand on change de dataset
    setSearchTerm('');
    setSelectedArrondissement('');
  };

  const handleSearchChange = (term) => {
    console.log('Recherche:', term);
    setSearchTerm(term);
  };

  const handleArrondissementChange = (arr) => {
    console.log('Arrondissement:', arr);
    setSelectedArrondissement(arr);
  };

  const handleResetFilters = () => {
    console.log('Reset des filtres');
    setSearchTerm('');
    setSelectedArrondissement('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ 
          color: '#5f259f', 
          textAlign: 'center',
          fontFamily: 'Nexa, Arial, sans-serif' 
        }}>
          Endroits Frais à Paris
        </h1>
      </header>
      
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Composant des filtres */}
        <Filters
          selectedDataset={selectedDataset}
          searchTerm={searchTerm}
          selectedArrondissement={selectedArrondissement}
          onDatasetChange={handleDatasetChange}
          onSearchChange={handleSearchChange}
          onArrondissementChange={handleArrondissementChange}
          onResetFilters={handleResetFilters}
        />
        
        {/* Tableau des résultats */}
        <Table data={filteredData} loading={loading} />
        
      </main>
    </div>
  );
}

export default App;