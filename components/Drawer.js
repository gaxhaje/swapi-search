// components/Drawer.js

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/Movie';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import Link from 'next/link';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <Link href="/">
          <ListItem button key="Films">
              <ListItemIcon><MovieIcon /></ListItemIcon>
              <ListItemText primary="Films" />
          </ListItem>
        </Link>
        <Link href="/comments">
          <ListItem button key="Comments">
            <ListItemIcon><CommentIcon /></ListItemIcon>
            <ListItemText primary="Comments" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}