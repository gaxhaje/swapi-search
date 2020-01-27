import fetch from 'isomorphic-unfetch';

// SWAPI /api/people
const getCharacters = async () => {
  const res = await fetch('https://swapi.co/api/people');
  const data = await res.json();
  return data;
}

// fetch all films
export default async (req, res) => {

  switch (req.method) {
    case 'GET':
      let favorite = req.query.favorite || 0;
      let data = await getCharacters(); 
      res.status(200).json(data.results);
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};