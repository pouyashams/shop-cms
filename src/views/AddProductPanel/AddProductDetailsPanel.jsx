import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import AddIcon from '@material-ui/icons/Add';
import AddStuffDetails from "./AddProductDetails";
// import axios from "axios";
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';

const theme = createMuiTheme({
    direction: 'rtl',
});
const styles = theme => ({

    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
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
    customButtons: {
        margin: theme.spacing.unit,
        // margin: "0px -550px 0px 0px;",
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

    customInputStyle: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 415,
        direction: 'rtl'
    },

    inputStyle: {
        height: "55px",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        direction: 'rtl'
    }
});


class AddProductDetailsPanel extends React.Component {

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.sendInformationOfProduct()
        this.props.nextStep()
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    add = (e) => {
        this.props.add();
    }


    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>اطلاعات تکمیلی کالا</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    {this.props.productItemInfoList.map(productItemInfo => (
                                        <AddStuffDetails
                                            handleChange={this.props.handleChange}
                                            values={this.props.values}
                                            productItemInfo={productItemInfo}
                                            productItemAttributeInfoList={this.props.productItemAttributeInfoList}
                                            productItemSupplierList={this.props.productItemSupplierList}
                                            lastProductItemAttributeInfo={this.props.lastProductItemAttributeInfo}
                                            color={this.props.color}

                                        />
                                    ))}
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <form>
                            <CardFooter>
                                <Button variant="contained" className={classes.customColor}
                                        color="secondary"
                                        onClick={this.saveAndContinue}>
                                    مرحله بعدی
                                </Button>

                                {/*<Button variant="fab" color="primary" aria-label="اضافه کردن مقادیر"*/}
                                {/*className={classes.customColor} onClick={this.props.add}>*/}
                                {/*<AddIcon titleAccess="اضافه کردن مقادیر" viewBox="اضافه کردن مقادیر"/>*/}
                                {/*</Button>*/}

                                <Button variant="contained" className={classes.customButtons}
                                        color="secondary"
                                        onClick={this.back}>
                                    مرحله قبلی
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </MuiThemeProvider>

        )
    }
}

export default withStyles(styles)(AddProductDetailsPanel);