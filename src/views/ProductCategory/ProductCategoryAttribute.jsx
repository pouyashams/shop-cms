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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Input} from 'antd';
import 'antd/dist/antd.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import getAccessToken from "../../routes/ACCESS_TOKEN";


const theme = createMuiTheme({
    direction: 'rtl',
});
const styles = theme => ({
    root: {
        flexGrow: 1,
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
        height: "40px",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        width: 120,
        direction: 'rtl'
    },
});

class ProductCategoryAttribute extends React.Component {
    state = {
        linearProgress: false,
        name: '',
        elements: [],
        countOfElements: 0,
        elementsValue: [],
        text: '',
        alertStyle: 'info',
        tc: false,
    };

    onButtonClick() {
        if (this.state.name === '') {
            this.showNotification("tc", "نام ویژگی را وارد کنید!", 'danger')
            return;
        } else if (this.state.elements.length === 0) {
            this.showNotification("tc", "حداقل یک مقدار ویژگی اضافه کنید!", 'danger')
            return;
        } else {
            for (var i = 0; i < this.state.elements.length; i++) {
                let value = this.state.elements[i].value;
                if (value === null || value === '') {
                    this.showNotification("tc", "حداقل یک مقدار ویژگی وارد کنید!", 'danger')
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

    async sendProductAttributeCategory() {
        var access_token = await getAccessToken();

        this.setState({
            linearProgress: true,
        });
        for (var i = 0; i < this.state.elements.length; i++) {
            let value = this.state.elements[i].value;
            const attributeValue = {
                "attributeValue": value
            };
            this.state.elementsValue.push(attributeValue);
        }
        const data = {
            "categoryName": this.state.name,
            "productAttributeList": this.state.elementsValue
        };
        axios.post(`http://shop.isuncharge.com/isunshop/register/product-attribute-category?access_token=`+access_token,
            data)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        linearProgress: false,
                    });
                    this.showNotification("tc", "عملیات با موفقیت انجام شد!", "success")
                    this.setState({
                        name: '',
                        elements: [],
                        countOfElements: 0
                    });
                } else {
                    this.setState({
                        linearProgress: false,
                    });
                    this.showNotification("tc", "عملیات انجام نشد! ", "danger")
                }
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "عملیات انجام نشد! ", "danger")
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

    changeItem(eleemnt){
        alert(eleemnt.id);
    }

    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                {
                    this.state.linearProgress === true ?
                        <div style={{
                            position: 'fixed',
                            zIndex: '100',
                            top: '0px',
                            width: '108%',
                            left: '-33px'
                        }}>
                            <LinearProgress/>
                        </div>
                        : null
                }
                <div dir="rtl">
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>تعریف نوع کالا</h4>
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
                                                placeholder="---------------------------"
                                                className={classes.inputStyle}
                                                onChange={this.handleChangeName()}
                                                defaultValue={this.state.name}
                                                value={this.state.name}
                                            />
                                        }
                                        label={"نام ویژگی :"}
                                        labelPlacement="start"
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <form className={classes.container}
                                          style={{marginTop: theme.spacing.unit * 8,}}
                                    >
                                        {this.state.elements.map(element => (
                                            <GridContainer key={element.id}>
                                                <div onClick={this.handleCloseElement(element.id)}
                                                     style={{
                                                         marginRight: theme.spacing.unit * 8,
                                                         marginBottom: theme.spacing.unit * 2
                                                     }}
                                                >
                                                    <IconButton aria-label="Delete">
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton>
                                                </div>
                                                <Input
                                                    value={element.value}
                                                    id={"element" + element.id}
                                                    placeholder="مقدار ویژگی"
                                                    className={classes.inputStyle}
                                                    onChange={this.handleChange()}
                                                />
                                            </GridContainer>
                                        ))}
                                    </form>
                                </GridItem>
                            </GridContainer>

                        </CardBody>
                        <CardFooter>
                            <Button variant="contained" className={classes.customColor}
                                    style={{
                                        marginRight:"15px"
                                     }}
                                    onClick={this.onButtonClick.bind(this)}>
                                ذخیره کردن
                            </Button>

                            <Button variant="fab" color="primary" aria-label="اضافه کردن مقادیر"
                                    className={classes.customColor}
                                    style={{
                                        marginLeft:"15px"
                                    }}
                                    onClick={this.handleClickOnAddElement.bind(this)}>
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