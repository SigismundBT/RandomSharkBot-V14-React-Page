import React, { useState } from 'react';
import { makeStyles , createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
    Container,
    Stepper,
    Step,
    StepLabel,
    FormGroup,
    Grid,
    Box,
    Button,
    CircularProgress
} from '@material-ui/core';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import * as Yup from 'yup';
//import { } from 'yup';

import firebase from "firebase/app";
import "firebase/firestore";

import LoggerHero from '../modules/logger-hero';
import DcInfo from '../modules/dcinfo';
import LoggerEnding from '../modules/loggerending';



const useStyles = makeStyles((theme) => ({
    root: {
    },
    gridList: {
      height: 450,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    stepper: {
        padding: theme.spacing(3, 0, 5)
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative'
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
}));

const theme = createTheme({
    palette: {
        primary: {
            main: '#003c6c',
        },
        secondary: {
            main: '#005499',
        },
    },
});


const validationSchema = [
    Yup.object().shape({
        dcInfoCheck: Yup.boolean().oneOf([true], '你必須確認Discord資料是否正確'),
    }),
    Yup.object().shape({
        dbDatePicker:Yup.date().required('請點這個框選擇你的生日')
    }),
]

const initialValues = {
    dcInfoCheck: false,
    dbDatePicker: '',

}

const steps = ['Discord資料', '生日登記'];


export default function Reset() {
    const classes = useStyles();
    document.title = '生日登錄器'

    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <React.Fragment>
                        <Box paddingBottom={2}>
                            <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                                <p className="title is-2">Discord資料</p>
                            </Grid>
                            <Box paddingBottom={8}>
                            </Box>
                            <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                                <p className="title is-4">這是你要登記生日的帳號資料嗎？</p>
                            </Grid>
                            <Box paddingBottom={2}>
                            </Box>
                        </Box>
                        <Box paddingBottom={2}>
                        </Box>
                        <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                            <DcInfo/>
                        </Grid>
                        <Box paddingBottom={6}>
                        </Box>
                        <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                            <p className="title is-5">*若沒有顯示資料，請重新產生網址</p>
                        </Grid>
                        <Box paddingBottom={4}>
                        </Box>
                        <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Box paddingBottom={2} paddingLeft={2}>
                                <Field name='dcInfoCheck' type="checkbox" component={CheckboxWithLabel} Label={{label:'確定這是我的Discord資料無誤'}} color="primary" />
                                <ErrorMessage name='dcInfoCheck' component="div" className="invalid-feedback">{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </Box>
                        </Grid>
                    </React.Fragment>
                )
            case 1:
                return (
                    <React.Fragment>
                        <Container maxWidth='md'>
                            <FormGroup> 
                                <Box paddingBottom={2}>
                                    <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <p className="title is-2">生日設定頁面</p>
                                    </Grid>
                                </Box>
                                <Box paddingBottom={3}>
                                </Box>
                                <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <p className="title is-5">*請無視選擇器年份，選你生日的日期</p>
                                </Grid>
                                <FormGroup>
                                <Box paddingBottom={10}>
                                </Box>
                                    <Box paddingBottom={1}>
                                        <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Field 
                                                component={DatePicker} 
                                                name='dbDatePicker'
                                                label='生日'
                                                inputVariant='outlined'
                                                format= 'yyyy/MM/dd'
                                                invalidDateMessage='請選擇日期'
                                                maxDate= {new Date('2020-12-31')}
                                                maxDateMessage='如果你年紀真的有這麼小，請找管理員協助'
                                                minDate= {new Date('2020-01-01')}
                                                minDateMessage='如果你年紀真的有這麼大，請找管理員協助'
                                                disableFuture />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Box>
                                </FormGroup>
                                <Box paddingBottom={8}></Box>
                            </FormGroup>
                        </Container>
                    </React.Fragment>
                )
            default:
                return <div>Error</div>;
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function _submitForm(values, actions){
        await _sleep(1000);
        //alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
        setActiveStep(activeStep + 1);

        const DoB = new Date(values.dbDatePicker)
        const { format } = require('date-fns')
        const datelog = format(DoB,'MM-dd')
        const dateargs = datelog.split('-')
        const dbmonth = Number(dateargs[0])
        const dbday = Number(dateargs[1])

          //Get Pathname
        const path = (window.location.pathname);
        const pathArr = path.split("/");
        const guildID = `${pathArr[2]}`
        const userID = `${pathArr[3]}`; //Discord ID

        const db = firebase.firestore();

        const dbdocname = guildID
        const dbarrname = userID
        const bdrec = (`${dbmonth}-${dbday}`)
        const birthdaydata = db.collection('BDdata').doc(dbdocname);

        birthdaydata
            .get()
            .then(res => {
                if(res.data() === undefined){
                    birthdaydata.set({
                        [dbarrname]:firebase.firestore.FieldValue.arrayUnion(bdrec)
                    });
                    
                    return
                    
                } else if (res.data()[dbarrname] === undefined){
                    birthdaydata.update({
                        [dbarrname]:firebase.firestore.FieldValue.arrayUnion(bdrec)
                    });
                    return
                } else {
                    birthdaydata.update({
                        [dbarrname]:firebase.firestore.FieldValue.delete()
                    })

                    .then(
                        birthdaydata.update({
                           [dbarrname]:firebase.firestore.FieldValue.arrayUnion(bdrec)
                        })
                    )
                }



                // if(res.size > 0){
                //     res.forEach(doc => {
                //         const oldbddata = db.collection('BDdata').doc(doc.id)

                //         oldbddata.get().then(
                //             oldbddata.update({
                //                 [guildID]:firebase.firestore.FieldValue.arrayRemove(userID)
                //             })
                //         )

                //         birthdaydata.get().then(res => {
                //             if(!res.exists){
                //                 birthdaydata.set({
                //                     [guildID]:firebase.firestore.FieldValue.arrayUnion(userID)
                //                 })
                //             }
        
                //             if(res.exists){
                //                 birthdaydata.update({
                //                     [guildID]:firebase.firestore.FieldValue.arrayUnion(userID)
                //                 })
                //             }
                //             return
                //         })
                //     })
                // } 
                
                // else {
                //     birthdaydata.get().then(res => {
                //         if(!res.exists){
                //             birthdaydata.set({
                //                 [guildID]:firebase.firestore.FieldValue.arrayUnion(userID)
                //             })
                //         }
    
                //         if(res.exists){
                //             birthdaydata.update({
                //                 [guildID]:firebase.firestore.FieldValue.arrayUnion(userID)
                //             })
                //         }
                //     })
                //     return
                // }
            })
    }
    
    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }
  
    return (
        <React.Fragment>
        <ThemeProvider theme={theme}>
            <LoggerHero />
            <Container maxWidth='sm'>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
                </Stepper>
            </Container>
        <React.Fragment>
            {activeStep === steps.length ? (
                <Grid>
                    <Box paddingBottom={6}>
                    </Box>
                    <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                        <LoggerEnding/>
                    </Grid>
                </Grid>
            ) : (
                <Formik
                    initialValues={initialValues}
                    validationSchema={currentValidationSchema}
                    onSubmit={_handleSubmit}
                > 
                    {({ isSubmitting }) => (
                        <Form autoComplete="off">
                            {_renderStepContent(activeStep)}
                            <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                                {activeStep !== 0 && (
                                    <Button onClick={_handleBack} variant="outlined" color="secondary"> 
                                        上一步
                                    </Button>
                                )}
                                <div className={classes.wrapper}>
                                <Grid item></Grid>
                                <Button
                                    startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    {isSubmitting ? '處理中' : isLastStep ? '完成' : '下一步'}
                                </Button>
                                </div>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            )}
        </React.Fragment>
    </ThemeProvider>
    </React.Fragment>
  );
}