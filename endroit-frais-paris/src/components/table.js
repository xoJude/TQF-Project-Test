import React from 'react';

const Table = ({ data, loading }) => {
    if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (data.length === 0) {
    return <div>Aucune donnée disponible</div>;
  }

  return (
    <div>
      <h2>Résultats ({data.length})</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        {}
        <thead>
          <tr style={{ backgroundColor: '#5f259f', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nom</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Truc à faire</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Adresse </th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Prix</th>
          </tr>
        </thead>
        
        {}
        <tbody>
          {}
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {item.fields?.nom || item.fields?.name || 'Non renseigné'}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {item.fields?.adresse || item.fields?.address || 'Non renseigné'}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {item.fields?.arrondissement || 'Non renseigné'}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {item.fields?.arrondissement || 'Non renseigné'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;