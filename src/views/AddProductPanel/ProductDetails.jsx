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
import Select from 'react-select';
import {Input,Form} from 'antd';
import 'antd/dist/antd.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';

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
        textAlign: 'right',
        color: "#FFFFFF",
        marginRight: "10px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    customColor: {
        margin: theme.spacing.unit,
        background: "rgb(92,184,92)",
        color:"#fff",
        "&:hover": {
            background: "rgb(70, 142, 70)",
        },
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
        height: "38px",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        width: 150,
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
        height: "40px",
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 1,
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


class ProductDetails extends React.Component {
    state = {
        selectedOption: null,

    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        var selectedProductCategoryId = selectedOption !== null ? selectedOption.value : null;

        this.props.handelechangeWithValue('selectedProductCategoryId', selectedProductCategoryId);
    }


    handleChangeNew = input => event => {
        console.log(event.target.value);
    }

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}> اطلاعات اولیه کالا</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>

                                    <FormControlLabel
                                        style={{
                                            marginTop: theme.spacing.unit * 2,
                                        }}
                                        control={
                                            <Input
                                                placeholder="-------------------------------"
                                                className={classes.inputStyle}
                                                onChange={this.props.handleChange('name')}
                                                defaultValue={this.props.name}
                                            />
                                        }
                                        label={"نام کالا :"}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        style={{
                                            marginTop: theme.spacing.unit * 2,
                                        }}
                                        control={
                                            <Select
                                                className={classes.inputSelection}
                                                isDisabled={false}
                                                isLoading={false}
                                                isClearable={true}
                                                isRtl={true}
                                                isSearchable={true}
                                                options={this.props.productCategoryOptions}
                                                onChange={this.handleChange}
                                                placeholder="----------------------"
                                                value={this.state.selectedOption}

                                            />
                                        }
                                        label={"دسته ی کالا :"}
                                        labelPlacement="start"
                                    />
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

export default withStyles(styles)(ProductDetails);
