// components/Layout.js

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Layout(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.children}
    </div>
  )
}

export default Layout;