// components/character.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const createData = (label, value) => {
  return { label, value };
};

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

const parseFilms = films => {
  return films.sort().map(film => {
    let s = film.split('/');
    s = s[s.length-2];
    return romanize(s);
  });
};

export default function SimpleTable(props) {
  const classes = useStyles();
  const data = props.data;

  const rows = [
    createData('Height', data.height),
    createData('Mass', data.mass),
    createData('Hair color', data.hair_color),
    createData('Skin color', data.skin_color),
    createData('Eye color', data.eye_color),
    createData('Birth Year', data.birth_year),
    createData('Gener', data.gender),
    createData('Films', parseFilms(data.films).join(', ')),
  ];

  return (
    <div>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan="2">Character: {data.name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">{row.label}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
