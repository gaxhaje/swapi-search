// pages/comments.js

import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Comments from '../components/Comments';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function CommentsPage(props) {
  const classes = useStyles();
  
  return (
    <Layout>
      <CssBaseline />
      <Header />
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Comments />
      </main>
    </Layout>
  );
}

CommentsPage.getInitialProps = async () => {
  // const res = await fetch('http://localhost:3000/api/films');
  // const timelineData = await res.json();
  return { comments: [] };
};
