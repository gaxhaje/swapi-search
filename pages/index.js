// pages/index.js

import useSWR from 'swr';
import { debounce } from 'throttle-debounce';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Avatar, Icon } from '@material-ui/core';

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Timeline from '../components/Timeline';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Index(props) {
  const classes = useStyles();
  const [timelineData, setTimelineData] = useState(props.timelineData);
  const [favorite, setFavorite] = useState('');

  // API request
  const updatFavorite = 
    debounce(100, (input, callback) => {
      return fetch(`/api/films`, { 
        method: 'PUT' ,
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      })
      .then(r => r.json())
      .then(data =>  callback(data));
    });

  // handle input change
  const handleToggleFavorite = film => {
    const found = timelineData.find(item => item.id === film.id);
    setFavorite(found);
  };

  useEffect(() => {
    let active = true;

    if (favorite === '') {
      return undefined;
    }

    if (favorite) {
      updatFavorite({
        "favorite_id": favorite.id,
        "is_favored": !favorite.is_favored
      }, results => {
        if (active) {
          // update all favorites
          const films = timelineData;
          const found = films.find(item => item.id === results[0]);
          found.is_favored = !found.is_favored;
          setFavorite('');
          setTimelineData(films);
        }
      });
    }

    return () => {
      active = false;
    };
  }, [favorite, updatFavorite]);

  return (
    <Layout>
      <CssBaseline />
      <Header />
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Timeline 
          timelineData={timelineData} 
          handleToggleFavorite={handleToggleFavorite} 
        />
      </main>
    </Layout>
  );
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/films');
  const timelineData = await res.json();
  return { timelineData: timelineData };
};