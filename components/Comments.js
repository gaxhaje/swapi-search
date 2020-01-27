// componets/Timeline.js

import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    margin: 'auto auto',
    maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  postButton: {
    margin: theme.spacing(1),
  },
  commentName: {
    display: 'block',
    fontWeight: 'bold',
    padding: '8px 8px 8px 0',
  },
  commentTitle: {
    fontWeight: 'normal',
    fontStyle: 'italic',
    padding: '0 8px',
  },
  commentTime: {
    fontWeight: 400,
    fontSize: 12,
    padding: '0 8px',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  commentText: {
    display: 'block',
    marginLeft: '10px',
  },
  typography: {
    marginBottom: '15px',
  }
}));

const socket = io.connect('http://localhost:8000')

export default function Comments() {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [commentCnt, setCommentCnt] = useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [showFirst, setShowFirst] = useState({});
  const [inputText, setInputText] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  }

  const handlePostComment = () => {
    socket.emit('comment', {
      id: Math.random(10000) * 100, 
      name: 'Civic Champs',
      title: 'Let\'s talk',
      text: inputText,
      time: '4 PM',
    });
  };

  useEffect(() => {
    let active = true;

    socket.on('comment', data => {
      let c = comments;
      c.push(data);
      setComments(c);
    });

    socket.on('comments', data => {
      setShowFirst(data[0]);
      setCommentCnt(data.length);
      setComments(data);
    });

    return () => {
      active = false;
    };
  }, [comments]);

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more comments"
          >
            <ExpandMoreIcon />
          </IconButton>
          }
          subheader={`${comments.length} Comments`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.typography}>
          <span className={classes.commentName}>
            {showFirst.name} -
            <span className={classes.commentTitle}>{showFirst.title}</span>
            <span className={classes.commentTime}>{showFirst.time}</span>
          </span>
          <span className={classes.commentText}>{showFirst.text}</span>
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {comments && comments.slice(1).map((comment, idx) => (
            <Typography variant="body2" color="textSecondary" component="p" className={classes.typography} key={idx}>
              <span className={classes.commentName}>
              {comment.name} -
              <span className={classes.commentTitle}>{comment.title}</span>
              <span className={classes.commentTime}>{comment.time}</span>
            </span>
            <span className={classes.commentText}>{comment.text}</span>
            </Typography>
          ))}
        </Collapse>
      </CardContent>
      <CardActions disableSpacing>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Add a comment"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
        />
        <Button 
          variant="contained" 
          size="small" 
          color="primary" 
          onClick={handlePostComment}
          className={classes.postButton}
        >
          Post
        </Button>
      </CardActions>
      
    </Card>
  );
}