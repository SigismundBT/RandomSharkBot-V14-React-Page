import React from 'react';
import { Grid, Box } from '@material-ui/core';

export default function LoggerEnding(){
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
          <p className="title is-2">生日登記完成</p>
        </Grid>
        <Box paddingBottom={8}>
        </Box>
        <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
          <p className="title is-4">記得到群組裡</p>
        </Grid>
        <Box paddingBottom={3}>
        </Box>
        <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
          <p className="title is-4">查詢自己的生日設定是否正確</p>
        </Grid>
        <Box paddingBottom={6}>
        </Box>
        <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
          <p className="title is-4">你現在可以關閉這個分頁了</p>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


