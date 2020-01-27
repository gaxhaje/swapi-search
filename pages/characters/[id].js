// pages/characters/[id].js

import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import Character from '../../components/Character';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function CharacterInfo(props) {
  const classes = useStyles();

  return (
    <Layout>
      <Header />
      <CssBaseline />
      <Header characterData={props.characterData} />
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Character data={props.character} />
      </main>
      <style jsx>{`
          main {
            width: 90%;
            margin: 50px auto;
          }
          .stock-graph {
            margin: 100px auto;
            text-align: center;
            font-family: cursive;
            color: #e243de;
          }
        `}</style>
    </Layout>
  );
}

CharacterInfo.getInitialProps = async ctx => {
  const id = ctx.query.id;
  const res = await fetch(`https://swapi.co/api/people/${id}/`);
  const data = await res.json();
  return { character: data };
}
