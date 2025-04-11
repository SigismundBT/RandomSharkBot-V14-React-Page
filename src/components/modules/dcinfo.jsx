import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
const axios = require('axios')

const useStyles = makeStyles((theme) => ({
  root: {
    height: 250,
    width:220
  },
  media: {
    height: 200,
  },
  cardcontent: {
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }
}));

export default function DcInfo(){
  const classes = useStyles();

  //Get Pathname
  const path = (window.location.pathname);
  const pathArr = path.split("/");
  const dcID = `${pathArr[3]}`; //Discord ID


  //get Discord data from Discord web api
  const [ dcinfos, getDcInfos] = React.useState('');

  const dcApiUrl = `https://discordapp.com/api/users/${dcID}` //Discord api Url

  React.useEffect(() => {
    getRes();
  }, []);

  const getRes = () => {
    axios.get(dcApiUrl,{headers: {'Authorization': `Bot ${process.env.REACT_APP_DISCORD_BOT_TOKEN}`}, 'Content-Type': 'application/json'})

    .then((res)=>{
      const dcData = res.data
      if(dcData === undefined){
        return 
      }
      getDcInfos(dcData)
    })
          
    .catch((err) => {
      console.error('err: ' + err)
    })
  }

  const username = `${dcinfos.username}#${dcinfos.discriminator}`
  const avatar = `https://cdn.discordapp.com/avatars/${dcinfos.id}/${dcinfos.avatar}.png`

  if(avatar === 'https://cdn.discordapp.com/avatars/undefined/undefined.png' || username === 'undefined#undefined'){
    return null
  }

  return (
    <div>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              component="img"
              alt="你的Discord頭圖"
              height="140"
              src={avatar}
              title="你的Discord頭圖"/>
            <CardContent className={classes.cardcontent}>
              <p className='title is-4'>{username}</p>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>  
    </div>
  );

}


