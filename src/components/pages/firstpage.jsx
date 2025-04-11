import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 70,
    width: 220
  },
});



const Firstpage = () => {
  const classes = useStyles();
  document.title = 'Index'

  return (
    <React.Fragment>
      <Box paddingBottom={50}>
      </Box>
      <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
        <Card className={classes.root} style={{backgroundColor: "lightgray"}}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h2" component="h2">
                <p className="title is-3">Working Fine</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

export default Firstpage;
