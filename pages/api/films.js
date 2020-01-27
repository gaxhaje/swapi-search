import fetch from 'isomorphic-unfetch';

// https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript/9083076
const romanize = (num) => {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

// represents holding favorite films
const favorites = new Set();

// SWAPI /api/films
const getFilms = async () => {
  const res = await fetch(`https://swapi.co/api/films`);
  const data = await res.json();
  const sortedByFilmReleaseYear = data.results.sort((a, b) => {
    let aReleaseYear = new Date(a.release_date).getFullYear();
    let bReleaseYear = new Date(b.release_date).getFullYear();
    return aReleaseYear - bReleaseYear;
  });

  // map to timeline events
  const events = sortedByFilmReleaseYear.map((film, idx) => {
    const episode = romanize(film.episode_id); // roman numeral episode name
    const date = new Date(film.release_date).toLocaleDateString('en-US', { dateStyle: 'medium' });
    const id = idx+1;
    return {
      id: id,
      title: film.title,
      episode: episode,
      opening_crawl: film.opening_crawl,
      date: date,
      is_favored: favorites.has(id)
    };
  });

  return events;
}

// fetch all films
export default async (req, res) => {

  switch (req.method) {
    case 'GET':
      let favorite = req.query.favorite || 0;
      let data = await getFilms(); 

      // if user requests only favorite films
      if (favorite === '1') {
        data = data.filter(item => item.is_favored)
      }

      res.status(200).json(data);
      break;
    case 'PUT':
      // TODO: add some validation of body here.
      const payload = req.body || {};
      if (!payload.favorite_id && !payload.is_favored) {
        return res.status(400).json({
          message: "Payload { favorite_id: <film_id>, is_favored: <true|false> } is missing from request body"
        });
      }

      // add/remove id to favorites
      if (payload.is_favored) favorites.add(payload.favorite_id);
      if (!payload.is_favored) favorites.delete(payload.is_favored);
      res.status(200).json([payload.favorite_id]);
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};