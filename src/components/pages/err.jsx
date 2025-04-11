import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    height: 200,
    width: 450
  },
});

const Err = () => {
  const classes = useStyles();
  document.title = 'Error'

  return (
    <React.Fragment>
      <Box paddingBottom={30}>
      </Box>
      <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
        <Card className={classes.root} style={{backgroundColor: "lightgray"}}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h2" component="h2">
                <p className="title is-2">Error!</p>
                <p className="title is-4">An error has occurred, please try again.</p>
                <p className="title is-4">錯誤發生，請重試。</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  )
}

export default Err
