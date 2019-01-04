import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import FormGroup from '@material-ui/core/FormGroup';

const theme = createMuiTheme({
    direction: 'rtl',
});
const styles = theme => ({
    root: {
        display: 'flex',
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        direction: 'rtl'
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    customColor: {
        margin: theme.spacing.unit,
        boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
        background: "linear-gradient(60deg, #023c93, #0b0049)"
    },
    tableActionButton: {
        width: "27px",
        height: "27px",
        padding: "0"
    },
    tableActionButtonIcon: {
        width: "17px",
        height: "17px",
        marginTop: "10px"
    },
    deleteIcon: {
        margin: "8px -6px 0px 0px;"
    },
    inputStyle: {
        marginLeft: theme.spacing.unit * 2,
        height: "35px",
        width: 140,
        direction: 'rtl'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },

    inputSelection: {
        height: "36px",
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 4,
        width: 160,
    },
    cardHeaderStyle: {
        background: "linear-gradient(60deg, #023c93, #0b0049)"
    },
    customStyle: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: 200,
        direction: 'rtl'
    }
});


class SaleInfoDetails extends React.Component {

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>حساب کاربری</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem>
                                    <FormGroup row>
                                        <TextField
                                            placeholder="نام کاربری"
                                            className={classes.inputStyle}
                                            type="username"
                                            onChange={this.props.handleChange('name')}
                                            defaultValue={''}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                        />
                                        <TextField
                                            placeholder="رمز عبور"
                                            className={classes.inputStyle}
                                            type="password"
                                            onChange={this.props.handleChange('password')}
                                            defaultValue={''}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                        />
                                    </FormGroup>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CardFooter>
                                        <Button variant="contained" className={classes.customColor} color="secondary"
                                                onClick={this.saveAndContinue}>
                                            مرحله بعدی
                                        </Button>
                                    </CardFooter>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(SaleInfoDetails);
