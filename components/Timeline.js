// componets/Timeline.js

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

// build with help from (https://www.florin-pop.com/blog/2019/04/how-to-create-a-timeline-with-react/)

const TimelineWrapper = (props) => (
  <div>{props.children}</div>
);

const avatarStyle = {
  backgroundColor: '#e17b77',
};

const Timeline = (props) => (
  <TimelineWrapper>
    <div className="timeline-container">
      {props.timelineData.map(data => (
        <div className="timeline-item" key={data.id}>
          <div className="timeline-item-content">
            <CardHeader
              avatar={
                <Avatar aria-label="film" style={avatarStyle}>
                  {data.episode}
                </Avatar>
              }
              title={data.title}
              subheader={`Episode ${data.episode}`}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.opening_crawl}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton 
                aria-label="add to favorites" 
                color={data.is_favored ? "secondary" : "default"}
                onClick={() => props.handleToggleFavorite(data)}
              >
                <FavoriteIcon />
              </IconButton>
            </CardActions>
            <time>{data.date}</time>
            <span className="circle" />
          </div>
        </div>
      ))}
    </div>
    <style jsx>{`
      .timeline-container {
        display: flex;
        flex-direction: column;
        position: relative;
        margin: 40px 0;
      }

      .timeline-container::after {
        background-color: #e17b77;
        content: '';
        position: absolute;
        left: calc(50% - 2px);
        width: 4px;
        height: 100%;
      }

      .timeline-item {
        display: flex;
        justify-content: flex-end;
        padding-right: 30px;
        position: relative;
        margin: 10px 0;
        width: 50%;
      }

      .timeline-item:nth-child(odd) {
        align-self: flex-end;
        justify-content: flex-start;
        padding-left: 30px;
        padding-right: 0;
      }

      .timeline-item-content {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        position: relative;
        width: 400px;
        max-width: 70%;
        text-align: right;
      }

      .timeline-item-content::after {
        content: ' ';
        background-color: #fff;
        box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.2);
        position: absolute;
        right: -7.5px;
        top: calc(50% - 7.5px);
        transform: rotate(45deg);
        width: 15px;
        height: 15px;
      }

      .timeline-item:nth-child(odd) .timeline-item-content {
        text-align: left;
        align-items: flex-start;
      }

      .timeline-item:nth-child(odd) .timeline-item-content::after {
        right: auto;
        left: -7.5px;
        box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
      }

      .timeline-item-content time {
        color: #777;
        font-size: 12px;
        font-weight: bold;
        right: -40px;
        // border: 3px solid #e17b77;
        // border-radius: 50%;
        position: absolute;
        top: calc(50% - 10px);
        right: -125px;
        margin-top: 2px;
        z-index: 100;
      }

      .timeline-item:nth-child(odd) .timeline-item-content time {
        right: auto;
        left: -125px;
      }

      .timeline-item-content .circle {
        background-color: #fff;
        border: 3px solid #e17b77;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - 10px);
        right: -40px;
        width: 20px;
        height: 20px;
        z-index: 100;
      }

      .timeline-item:nth-child(odd) .timeline-item-content .circle {
        right: auto;
        left: -40px;
      }

      @media only screen and (max-width: 1023px) {
        .timeline-item-content {
          max-width: 100%;
        }
      }

      @media only screen and (max-width: 767px) {
        .timeline-item-content,
        .timeline-item:nth-child(odd) .timeline-item-content {
          padding: 15px 10px;
          text-align: center;
          align-items: center;
        }

        .timeline-item-content time {
          margin-top: 20px;
        }
      }
    `}</style>
  </TimelineWrapper>
);

export default Timeline;