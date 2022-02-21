// import React from 'react'
// import { Grid, Paper } from '@material-ui/core';

// const Article = ({ article }) => {
//   return (
//     <div>
//       <Grid container spacing={3}>
//       <Grid item xs={12} sm={6}>
//           <Paper className="paper" >xs=12 sm=6</Paper>
//         </Grid>
//         <span>{article.title}</span>
//         <span>{article.text}</span>
//         <span>{article.date}</span>
//         <span>{article.image_url}</span>
//       </Grid>
//     </div>

//   )
// }

// export default Article



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Article({article}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={article.image_url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {article.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
