import React from 'react';

const Table = ({ data, loading }) => {
  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        fontSize: '18px',
        color: '#5f259f'
      }}>
        ⏳ Chargement des données...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        fontSize: '16px',
        color: '#666'
      }}>
        🔍 Aucun résultat trouvé. Essayez de modifier vos filtres.
      </div>
    );
  }

  // Fonction pour extraire les bonnes données selon le dataset
  const getDisplayData = (item) => {
    const fields = item.fields || {};
    
    // Détection automatique du type de dataset
    let nom, adresse, arrondissement, info;
    
    if (fields.nom_ev) {
      // Dataset: Espaces verts
      nom = fields.nom_ev;
      adresse = `${fields.adresse_typevoie || ''} ${fields.adresse_codepostal || ''}`.trim();
      arrondissement = fields.adresse_codepostal?.slice(0, 5) || 'Non renseigné';
      info = fields.type_ev || 'Espace vert';
      
    } else if (fields.modele || fields.type_objet) {
      // Dataset: Fontaines
      nom = fields.modele || 'Fontaine';
      adresse = `${fields.voie || ''} ${fields.no_voirie_pair || ''}`.trim();
      arrondissement = fields.commune?.match(/(\d{5})/)?.[1] || 'Non renseigné';
      info = fields.type_objet || 'Fontaine';
      
    } else if (fields.title) {
      // Dataset: Équipements et activités  
      nom = fields.title;
      const location = fields.locations?.[0] || {};
      adresse = location.address_street || 'Non renseigné';
      arrondissement = location.address_zipCode || 'Non renseigné';
      info = fields.price_type || 'Activité';
      
    } else {
      // Fallback générique
      nom = fields.nom || fields.name || fields.denomination || 'Non renseigné';
      adresse = fields.adresse || fields.address || 'Non renseigné';
      arrondissement = fields.arrondissement || 'Non renseigné';
      info = fields.type || fields.category || 'Non renseigné';
    }
    
    return {
      nom: nom || 'Non renseigné',
      adresse: adresse || 'Non renseigné',
      arrondissement: arrondissement || 'Non renseigné',
      info: info || 'Non renseigné'
    };
  };

  return (
    <div>
      <h2 style={{ color: '#5f259f' }}>
        📍 Résultats ({data.length})
      </h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#5f259f', color: 'white' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Nom</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Adresse</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Arrondissement</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Info</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const displayData = getDisplayData(item);
              return (
                <tr key={index} style={{ 
                  backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white'
                }}>
                  <td style={{ 
                    padding: '10px', 
                    border: '1px solid #ddd',
                    fontWeight: 'bold'
                  }}>
                    {displayData.nom}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {displayData.adresse}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    border: '1px solid #ddd',
                    textAlign: 'center'
                  }}>
                    {displayData.arrondissement}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    {displayData.info}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;