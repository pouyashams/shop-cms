import React from 'react';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import Select from 'react-select';
import FormLabel from '@material-ui/core/FormLabel';
import {Input} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import getAccessToken from "../../routes/ACCESS_TOKEN";
// import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
    direction: 'rtl',
});

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        // margin: theme.spacing.unit * 3,
        height: "90px",
    },
    formStyleControl: {
        height: "5px",
        marginBottom: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit * 6,

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
    formControlLabel: {
        marginRight: theme.spacing.unit * 10,
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
    inputSelection: {
        height: "40px",
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 1,
        width: 160,
    },
    FormControlLabel: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});


class definitionProductCategory extends React.Component {
    state = {
        linearProgress: false,
        categoryName: '',
        attributeCategoryList: [],
        productCategoryList: [],
        productCategoryOptions: [],
        parentIdentifier: null,
        countOfElements: 0,
        productAttributeCategoryList: [],
        tc: false,
        selectedOption: null,

    };

    onButtonClick() {
        if (this.state.categoryName === '') {
            this.showNotification("tc", "نام نوع کالا را وارد کنید!  ", 'danger')
            return;
        } else {
            var checkedAnyOne = false;
            var attributeCategoryList = this.state.attributeCategoryList;
            attributeCategoryList.forEach(function (attributeCategory) {
                    if (attributeCategory.checked) {
                        checkedAnyOne = true;
                    }
                }
            );
            if (checkedAnyOne) {
                this.sendProductCategory();
            } else {
                this.showNotification("tc", "حداقل یک فیلد انتخاب کنید!", 'danger')
            }
        }
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

    async useAccessToken() {
        var access_token = await getAccessToken();
        this.setState({
            linearProgress: true,
        });
        axios.get(`http://shop.isuncharge.com/isunshop/fetch/define-product-category-info?access_token=`+access_token)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        linearProgress: false,
                    });

                    const data = res.data;
                    console.log(data)
                    // var productCategoryList = this.state.productCategoryList;
                    var productCategorys = data.productCategoryList;
                    var productAttributeCategoryList = data.productAttributeCategoryList;
                    var attributeCategoryList = [];
                    var productCategoryOptions = [];
                    productCategorys.forEach(function (productCategory) {
                        var info = {
                            value: productCategory.identifier,
                            label: productCategory.productCategoryName
                        }
                        productCategoryOptions.push(info);
                    });

                    productAttributeCategoryList.forEach(function (productAttributeCategory) {
                        var attribute = {
                            productAttributeCategoryInfo: productAttributeCategory,
                            checked: false
                        }
                        attributeCategoryList.push(attribute);
                    });
                    this.setState({
                        productCategoryList: productCategorys,
                        attributeCategoryList: attributeCategoryList,
                        productCategoryOptions: productCategoryOptions,
                        parentIdentifier: null
                    });
                }
                else {
                    this.setState({
                        linearProgress: false,
                    });
                    this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
                }
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
        });
    }

    componentDidMount() {
        this.useAccessToken();
    };

    async sendProductCategory() {

        this.setState({
            linearProgress: true,
        });
        var selectedAttributeList = [];
        var attributeCategoryList = this.state.attributeCategoryList;
        attributeCategoryList.forEach(function (attributeCategory) {
            if (attributeCategory.checked) {
                var selectedAttribute = {
                    "identifier": attributeCategory.productAttributeCategoryInfo.identifier
                }
                selectedAttributeList.push(selectedAttribute);
            }
        });
        const data = {
            "productCategoryName": this.state.categoryName,
            "productAttributeCategoryList": selectedAttributeList,
            "parentProductCategory": {
                "identifier": this.state.parentIdentifier
            }
        };
        var access_token = await getAccessToken();
        axios.post(`http://shop.isuncharge.com/isunshop/register/product-category?access_token=`+access_token,
            data)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        linearProgress: false,
                    });
                    this.setState({
                        categoryName: '',
                        parentIdentifier: null,
                        countOfElements: 0,
                        productAttributeCategoryList: [],
                        productCategoryList: []
                    });
                    this.componentDidMount();
                    this.showNotification("tc", "عملیات با موفقیت انجام شد!  ", "success")
                } else {
                    this.setState({
                        linearProgress: false,
                    });
                    this.showNotification("tc", "عملیات انجام نشد!", "danger")
                }
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "عملیات انجام نشد!", "danger")
        });
    };

    handleChangeCheck = () => event => {
        var checked = event.target.checked;
        var id = event.target.id;
        var attributeCategoryList = this.state.attributeCategoryList;

        attributeCategoryList.forEach(function (attributeCategory) {
            if (attributeCategory.productAttributeCategoryInfo.identifier === id) {
                attributeCategory.checked = checked;
            }
        });
        this.setState({attributeCategoryList});
    };

    handleChangeCategoryName = () => event => {
        var categoryName = event.target.value;
        this.setState({categoryName});
    };

    handleChangeParentInfo = (selectedOption) => {
        var parentIdentifier = selectedOption !== null ? selectedOption.value : null;
        this.setState({parentIdentifier, selectedOption});
        console.log(`Option selected:`, selectedOption);
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
                            {console.log(1133234)}
                            <LinearProgress/>
                        </div>
                        : null
                }
                <div dir="rtl">
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>تعریف ویژگی نوع کالا</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <form className={classes.container} noValidate autoComplete="off">
                                        <FormControlLabel
                                            style={{
                                                marginTop: theme.spacing.unit * 2,
                                            }}
                                            control={
                                                <Input
                                                    placeholder="-------------------------------"
                                                    className={classes.inputStyle}
                                                    onChange={this.handleChangeCategoryName()}
                                                    value={this.state.categoryName}
                                                />
                                            }
                                            label={"نام نوع کالا :"}
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
                                                    name="color"
                                                    options={this.state.productCategoryOptions}
                                                    onChange={this.handleChangeParentInfo}
                                                    placeholder="----------------------"
                                                />
                                            }
                                            label={"دسته ی پدر :"}
                                            labelPlacement="start"
                                        />

                                    </form>
                                </GridItem>
                            </GridContainer>
                            <form className={classes.formStyleControl}>
                                <h5>ویژگی های کالا:</h5>
                            </form>
                            <GridContainer>
                                {this.state.attributeCategoryList.map(attributeCategory => (
                                    <GridItem key={attributeCategory.productAttributeCategoryInfo.identifier} xs={12}
                                              sm={6} md={3}>
                                        <div dir="rtl" className={classes.root}>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormLabel component="legend">
                                                    <h7>.........................................</h7>
                                                </FormLabel>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox checked={attributeCategory.checked}
                                                                      id={attributeCategory.productAttributeCategoryInfo.identifier}
                                                                      onChange={this.handleChangeCheck()}
                                                                      value={attributeCategory.productAttributeCategoryInfo.identifier}/>
                                                        }
                                                        label={attributeCategory.productAttributeCategoryInfo.categoryName}
                                                        labelPlacement="start"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </div>
                                    </GridItem>
                                ))}
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button variant="contained" className={classes.customColor} color="secondary"
                                    onClick={this.onButtonClick.bind(this)}>
                                ذخیره کردن
                            </Button>
                            <Snackbar
                                place="tc"
                                color={this.state.alertStyle}
                                icon={AddAlert}
                                message={this.state.text}
                                open={this.state.tc}
                            />

                        </CardFooter>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(definitionProductCategory);