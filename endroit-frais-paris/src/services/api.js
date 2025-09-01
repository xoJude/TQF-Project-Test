const BASE_URL = 'https://opendata.paris.fr/api/records/1.0/search/';
export const fetchDataset = async (dataset, params = {}) => {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append('dataset', dataset);
    
    const response = await fetch(url);
    
    const data = await response.json();

    return data.records || [];
  } catch (error) {
    console.error('Erreur API:', error);
    return []; 
  }
};

export const DATASETS = {
  ESPACES_VERTS: 'espaces_verts',
  FONTAINES: 'fontaines-a-boire',
  EQUIPEMENTS: 'que-faire-a-paris-'
};