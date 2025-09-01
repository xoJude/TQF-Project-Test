import React from 'react';
import { DATASETS } from '../services/api';

const Filters = ({ 
  selectedDataset, 
  searchTerm, 
  selectedArrondissement,
  onDatasetChange,
  onSearchChange,
  onArrondissementChange,
  onResetFilters
}) => {
  
  // Liste des arrondissements de Paris
  const arrondissements = [
    '75001', '75002', '75003', '75004', '75005', '75006',
    '75007', '75008', '75009', '75010', '75011', '75012',
    '75013', '75014', '75015', '75016', '75017', '75018',
    '75019', '75020'
  ];

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: '#5f259f', marginTop: '0' }}>Filtres de recherche</h3>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        
        {/* Sélecteur de dataset */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Type d'endroit :
          </label>
          <select 
            value={selectedDataset} 
            onChange={(e) => onDatasetChange(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minWidth: '180px'
            }}
          >
            <option value={DATASETS.ESPACES_VERTS}>Espaces verts</option>
            <option value={DATASETS.FONTAINES}>Fontaines à boire</option>
            <option value={DATASETS.EQUIPEMENTS}>Équipements et activités</option>
          </select>
        </div>

        {/* Recherche textuelle */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Rechercher par nom :
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tapez un nom..."
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minWidth: '200px'
            }}
          />
        </div>

        {/* Filtre par arrondissement */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Arrondissement :
          </label>
          <select 
            value={selectedArrondissement} 
            onChange={(e) => onArrondissementChange(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minWidth: '120px'
            }}
          >
            <option value="">Tous</option>
            {arrondissements.map(arr => (
              <option key={arr} value={arr}>{arr}</option>
            ))}
          </select>
        </div>

        {/* Bouton Reset */}
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <button 
            onClick={onResetFilters}
            style={{
              padding: '8px 15px',
              backgroundColor: '#5f259f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Réinitialiser
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Filters;