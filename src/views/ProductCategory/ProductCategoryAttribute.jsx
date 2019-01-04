import React from 'react';
import PropTypes from 'prop-types';
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
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";

const theme = createMuiTheme({
    direction: 'rtl',
});
const styles = theme => ({
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
        height: "30px",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        direction: 'rtl'
    }
});
class ProductCategoryAttribute extends React.Component {
    state = {
        name: '',
        elements: [],
        countOfElements: 0,
        elementsValue: [
        ],
        text: '',
        alertStyle: 'info',
        tc: false,
    };
    onButtonClick() {
        if (this.state.name === '') {
            this.showNotification("tc","نام ویژگی را وارد کنید!", 'danger')
            return;
        } else if (this.state.elements.length === 0) {
            this.showNotification("tc","حداقل یک مقدار ویژگی اضافه کنید!", 'danger')
            return;
        } else {
            for (var i = 0; i < this.state.elements.length; i++) {
                let value = this.state.elements[i].value;
                if (value === null || value === '') {
                    this.showNotification("tc","حداقل یک مقدار ویژگی وارد کنید!", 'danger')
                    return;
                }
            }
        }
        this.sendProductAttributeCategory();
    }
    componentWillUnmount() {
        var id = window.setTimeout(null, 0);
        while (id--) {
            window.clearTimeout(id);
        }
    }
    showNotification(place, text, alertStyle) {
        var x = [];
        x[place] = true;
        x['text'] = text;
        x['alertStyle'] = alertStyle;
        this.setState(x);
        this.alertTimeout = setTimeout(
            function () {
                x[place] = false;
                this.setState(x);
            }.bind(this),
            6000
        );
    }
    sendProductAttributeCategory() {
        for (var i = 0; i < this.state.elements.length; i++) {
            let value = this.state.elements[i].value;
            const attributeValue = {
            "attributeValue":value
            };
            this.state.elementsValue.push(attributeValue);
        }
        const data = {
            "categoryName": this.state.name,
            "productAttributeList": this.state.elementsValue
        };
        axios.post(`http://shop.isuncharge.com/isunshop/register/product-attribute-category`,
            data)
            .then(res => {
                if (res.data.success) {
                    this.showNotification("tc","عملیات با موفقیت انجام شد!", "success")
                    this.setState({
                        name: '',
                        elements: [],
                        countOfElements: 0
                    });
                } else {
                    this.showNotification("tc","عملیات انجام نشد! ", "danger")
                }
            }).catch((error)=>{
            this.showNotification("tc","عملیات انجام نشد! ", "danger")
        });
    };
    handleChangeName = () => event => {
        var name = event.target.value;
        this.setState({name});
    };
    handleChange = () => event => {
        var value = event.target.value;
        var id = event.target.id;
        var elements = this.state.elements;
        elements.forEach(function (element) {
            if ("element" + element.id === id) {
                element.value = value;
            }
        });
        this.setState({elements});
    };

    handleCloseElement = elementId => event => {
        var elements = this.state.elements;
        elements = elements.filter(element => element.id !== elementId);
        this.setState({elements});
    };
    handleClickOnAddElement = () => {
        var elements = this.state.elements;
        var countOfElements = this.state.countOfElements;
        countOfElements = countOfElements + 1;
        var newItem = {
            id: countOfElements,
            value: ''
        };
        elements.push(newItem);
        this.setState({elements, countOfElements});
    };
    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>تعریف نوع کالا</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <form className={classes.container} noValidate autoComplete="off">
                                        <TextField
                                            id="standard-name"
                                            placeholder="نام ویژگی"
                                            className={classes.inputStyle}
                                            value={this.state.name}
                                            onChange={this.handleChangeName()}
                                            margin="normal"
                                            variant="outlined"
                                            required
                                        />
                                    </form>
                                </GridItem>
                            </GridContainer>
                            {this.state.elements.map(element => (
                                <GridContainer key={element.id}>
                                    <GridItem xs={12} sm={12} md={5}>
                                        <form className={classes.container} noValidate autoComplete="off">
                                            <div onClick={this.handleCloseElement(element.id)}>
                                                <IconButton aria-label="Delete" className={classes.deleteIcon}>
                                                    <DeleteIcon fontSize="small"/>
                                                </IconButton>
                                            </div>
                                            <TextField
                                                id={"element" + element.id}
                                                placeholder="مقدار ویژگی"
                                                className={classes.inputStyle}
                                                value={element.value}
                                                variant="outlined"
                                                onChange={this.handleChange()}
                                                margin="normal"
                                                required
                                            />
                                        </form>
                                    </GridItem>
                                </GridContainer>
                            ))}
                        </CardBody>
                        <CardFooter>
                            <Button variant="contained" className={classes.customColor} color="secondary"
                                    onClick={this.onButtonClick.bind(this)}>
                                ذخیره کردن
                            </Button>

                            <Button variant="fab" color="primary" aria-label="اضافه کردن مقادیر"
                                    className={classes.customColor} onClick={this.handleClickOnAddElement.bind(this)}>
                                <AddIcon titleAccess="اضافه کردن مقادیر" viewBox="اضافه کردن مقادیر"/>
                            </Button>
                        </CardFooter>
                        <Snackbar
                            place="tc"
                            color={this.state.alertStyle}
                            icon={AddAlert}
                            message={this.state.text}
                            open={this.state.tc}

                        />
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}
ProductCategoryAttribute.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProductCategoryAttribute);