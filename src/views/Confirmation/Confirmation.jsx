import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from '@material-ui/core/Button';
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import moment from 'jalali-moment'
import TableWithAction from "../../components/Table/TableWithAction";
import axios from "axios";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import {Modal, Icon, LocaleProvider} from 'antd';
import faIR from 'antd/lib/locale-provider/fa_IR';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NumberFormat from 'react-number-format';
import {Input} from 'antd';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from 'react-select';
import Muted from "components/Typography/Muted.jsx";
import getAccessToken from "../../routes/ACCESS_TOKEN";

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
        marginRight: theme.spacing.unit,
        width: 650,
        direction: 'rtl'
    },


    inputStyle: {
        height: "38px",
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 12,
        marginBottom: theme.spacing.unit * 2,
        width: 150,
        direction: 'rtl'
    },

    inputStyleN: {
        height: "38px",
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 10,
        marginBottom: theme.spacing.unit * 2,
        width: 150,
        direction: 'rtl'
    },

    inputSelectStyle: {
        width: 140,
        direction: 'rtl',
        padding: "0%"
    },
    formStyle: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        direction: 'rtl',
        paddingLeft: "30%"
    },
    FormControlLabel: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    inputSelection: {
        height: "36px",
        // marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        // marginBottom: theme.spacing.unit * 2,
        width: 160,
    },
    inputSelectionSup: {
        height: "38px",
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        marginLeft: theme.spacing.unit * 14,
        marginBottom: theme.spacing.unit * 2,
        width: 160,
    },
    table: {
        minWidth: 250,
    },
    customButtons: {},
})

class Confirmation extends React.Component {
    constructor() {
        super();
    }

    state = {
        data: null,
        open: false,
        resData: null,
        linearProgress: false,
        check: false,
        visible: false,
        color: 'primary',
        text: '',
        alertStyle: 'info',
        tc: false,
        Pagination: true,
        buttonList: [
            ,

        ],
        treeTable: false,
        numberOfProduct: 3,
        search: [],
        searchInfo: [

            {
                name: "identifier",
                searchType: "textField",
                labelText: "شناسه سفارش:",
                placeholder: "------------------------"
            },
            {
                name: "registerDateFrom",
                searchType: "numberFormat",
                labelText: "ازتاریخ :",
                placeholder: moment().locale('fa').format('YYYY/MM/DD'),
                defaultValue: moment().locale('fa').format('YYYY/MM/DD'),
                format: "####/##/##",

            },
            {
                name: "registerDateTo",
                searchType: "numberFormat",
                labelText: "تا تاریخ :",
                placeholder: moment().locale('fa').format('YYYY/MM/DD'),
                defaultValue: moment().locale('fa').format('YYYY/MM/DD'),
                format: "####/##/##",
            },
            {
                name: "orderStatusIdentifier",
                searchType: "select",
                labelText: "وضعیت پرداخت:",
                placeholder: "---------------------",
                selectOption: []
            },
            {
                name: "customerReferenceNumber",
                searchType: "textField",
                labelText: "شناسه پرداخت:",
                placeholder: "------------------------"
            },
        ],
        tableColumnsInfo: [{
            columns: [
                {
                    Header: 'نام کالا',
                    accessor: 'name',
                    // filterable: true,
                    resizable: false,
                },

                {
                    Header: 'تعداد',
                    // filterable: true,
                    accessor: 'number',
                    resizable: false,
                },
                {
                    Header: 'مجموع مبالغ',
                    // filterable: true,
                    accessor: 'price',
                    resizable: false,
                },
            ]
        }],
        tableColumns: [{
            Header: 'مشخصات خریدار',
            columns: [{
                Header: 'نام خریدار',
                accessor: 'name',
                // filterable: true,
                resizable: false,
            },
                {
                    Header: 'شماره تلفن',
                    // filterable: true,
                    accessor: 'customerNumber',
                    resizable: false,

                },
            ]
        },
            {
                Header: 'مشخصات کلی کالا',
                columns: [
                    {
                        Header: 'وضعیت پرداخت',
                        accessor: 'orderStatus',
                        // filterable: true,
                        resizable: false,
                    },
                    {
                        Header: 'قیمت کل',
                        accessor: 'sumOfAmount',
                        // filterable: true,
                        resizable: false,
                    },
                    {
                        Header: 'شناسه پرداخت',
                        // filterable: true,
                        accessor: 'customerReferenceNumber',
                        resizable: false,
                    },
                    {
                        Header: 'شناسه سفارش',
                        accessor: 'identifier',
                        // filterable: true,
                        resizable: false,

                    },
                    {
                        accessor: 'identifier',
                        Cell: ({value}) => (
                            <Button
                                variant="contained"
                                style={{
                                    height: "25px",
                                    width: 60,
                                    boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
                                    background: "linear-gradient(60deg, #125a62, #125a62)",
                                    align: "center"
                                }}
                                color="secondary"
                                onClick={() => {
                                    this.handleClickOpen(value)
                                }}>
                                بررسی
                            </Button>
                        ),
                        resizable: false,
                        width: 95
                    }

                ]
            }],
        dataTableInfo: [
            // {
            //     "name": "argument",
            //     "price": 1000,
            //     "number": 13
            // },
        ],
        dataTable: [
            // {
            //     "identifier": "OTk5NTk3NjI="
            // },
        ],
    }

    handleCloseDialog = () => {
        this.setState({
            open: false,
        });
    }

    handleClose = async () => {
        console.log(12)
        // this.showModal();
        // if (this.state.check) {
        this.setState({
            linearProgress: true,
        });
        const data = {"identifier": this.state.data.identifier}
        var access_token = await getAccessToken();
        axios.post(`http://shop.isuncharge.com/isunshop/update/cancel-order?access_token=` + access_token,
            data)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        open: false,
                        linearProgress: false,
                    });
                    this.showNotification("tc", "سفارش کنسل شد!", "success")
                }
                else {
                    this.setState({
                        open: false,
                        linearProgress: false,
                    });
                    this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
                }
            }).catch((error) => {
            this.setState({
                open: false,
                linearProgress: false,
            });
            this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
        });
        // }
    };
    handleSave = async () => {
        // this.showModal();

        // if (this.state.check) {
        this.setState({
            linearProgress: true,
        });
        const data = {"identifier": this.state.data.identifier}
        var access_token = await getAccessToken();

        axios.post(`http://shop.isuncharge.com/isunshop/update/accept-order?access_token=` + access_token,
            data).then(res => {
            if (res.data.success) {
                this.setState({
                    open: false,
                    linearProgress: false,
                });
                this.showNotification("tc", "سفارش تایید شد!", "success")
            }
            else {
                this.setState({
                    open: false,
                    linearProgress: false,
                });
                this.showNotification("tc", "سفارش ثبت نشد!", "danger")
            }
        }).catch((error) => {
            this.setState({
                open: false,
                linearProgress: false,
            });
            this.showNotification("tc", "سفارش ثبت نشد!", "danger")
        });
        // }
    };
    handleClickOpen = identifier => async () => {
        this.setState({
            open: true,
            linearProgress: true,
        });
        const data = {"identifier": identifier}
        var access_token = await getAccessToken();
        axios.post(`http://shop.isuncharge.com/isunshop/fetch/search-order?access_token=` + access_token,
            data)
            .then(res => {
                const dataTable = []
                res.data[0].productItemSellInfoList.map(productItem => (
                    dataTable.push(
                        {
                            "name": productItem.name,
                            "price": productItem.sumPrice,
                            "number": productItem.count,
                        }
                    )
                ))

                this.setState({
                    data: res.data[0],
                    linearProgress: false,
                    dataTableInfo: dataTable,
                });
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "!  عملیات انجام نشد", "danger")
        });
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
            check: true,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    acceptOrder = accept => {

    };

    // showProductCategory() {
    //     axios.get(`http://shop.isuncharge.com/isunshop/fetch/define-product-category-info`)
    //         .then(res => {
    //             if (res.data.success) {
    //                 this.setState({
    //                     linearProgress: false,
    //                 });
    //                 const categoryList = [];
    //                 const data = res.data.productCategoryList;
    //                 data.map(data => (
    //                     categoryList.push(
    //                         {value: data.identifier, label: data.productCategoryName})
    //                 ))
    //                 var searchInfo = this.state.searchInfo;
    //                 searchInfo[5].selectOption = categoryList;
    //                 this.setState({
    //                     searchInfo: searchInfo,
    //                 });
    //             } else {
    //                 this.setState({
    //                     linearProgress: false,
    //                 });
    //                 this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
    //             }
    //         }).catch((error) => {
    //         this.setState({
    //             linearProgress: false,
    //         });
    //         this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
    //     });
    // }

    async showStatus() {
        var access_token = await getAccessToken();
        axios.get('http://shop.isuncharge.com/isunshop/fetch/all-order-status?access_token=' + access_token)
            .then(res => {
                console.log(15)
                console.log(res)
                this.setState({
                    linearProgress: false,
                });
                const paymentStatus = [];
                res.data.data.map(data => (
                    paymentStatus.push(
                        {value: data.identifier, label: data.name}
                    )
                ))
                console.log(16)
                console.log(paymentStatus)
                var searchInfo = this.state.searchInfo;
                searchInfo[3].selectOption = paymentStatus;
                this.setState({
                    searchInfo: searchInfo,
                });
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
        });
    }

    componentDidMount() {
        this.setState({
            linearProgress: true,
        });
        // this.showProductCategory()
        this.showStatus()
        var searchInfoFrom = {
            name: 'registerDateFrom',
            value: moment().locale('fa').format('YYYY/MM/DD')

        };
        var searchInfoTo = {
            name: 'registerDateTo',
            value: moment().locale('fa').format('YYYY/MM/DD')

        };
        this.state.search.push(searchInfoFrom);
        this.state.search.push(searchInfoTo);
    }

    cancelOrder = cancel => {

    };

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

    async searchItemProduct() {
        console.log(1)
        var data = {
            "identifier": "",
            "orderStatusIdentifier": "",
            "registerDateFrom": "",
            "registerDateTo": "",
            "customerReferenceNumber": ""
        }
        for (var i = 0; i < this.state.search.length; i++) {
            // console.log(1)
            // console.log(this.state.search)
            if (this.state.search[i].name === "identifier") {
                data.identifier = this.state.search[i].value;
            } else if (this.state.search[i].name === "orderStatusIdentifier") {
                data.orderStatusIdentifier = this.state.search[i].value;
            } else if (this.state.search[i].name === "customerReferenceNumber") {
                data.customerReferenceNumber = this.state.search[i].value;
            } else if (this.state.search[i].name === "registerDateFrom") {
                data.registerDateFrom = this.state.search[i].value;
            } else if (this.state.search[i].name === "registerDateTo") {
                data.registerDateTo = this.state.search[i].value;
            }
        }
        this.setState({
            linearProgress: true,
        });
        console.log(1)
        console.log(data)
        var access_token = await getAccessToken();
        axios.post(`http://shop.isuncharge.com/isunshop/fetch/search-order?access_token=` + access_token,
            data)
            .then(res => {
                const data = res.data;
                const dataTable = []
                data.map(data => (
                    dataTable.push(
                        {
                            "name": '',
                            "customerNumber": data.customerNumber,
                            "orderStatus": data.orderStatus.name,
                            "sumOfAmount": data.sumOfAmount,
                            "customerReferenceNumber": data.customerReferenceNumber,
                            "identifier": data.identifier,
                        }
                    )
                ))
                this.setState({
                    "dataTable": dataTable,
                    linearProgress: false,

                });
            }).catch((error) => {
            linearProgress: false,
                this.setState({
                    linearProgress: false,
                });
            this.showNotification("tc", "جستجو ناموفق بود!", "danger")
        });

    };

    handleChangeSearch = search => {
        this.state.search = search
        this.searchItemProduct();
    }

    render() {
        const textAlert = <div
            style={{
                marginTop: "20px",
                marginBottom: "10px",
                marginRight: "10px",

            }}
        >
            <Icon style={{marginLeft: "178px"}} type="warning" theme="twoTone"/>
            <Icon style={{marginLeft: "-219px"}} type="warning" theme="twoTone"/>

            <h4
                style={{
                    marginTop: "-24px",
                    marginRight: "510px",
                    color: "#9e141c",
                }}
            > قادر به تایید یا لغو نمی باشید </h4>

        </div>;
        const text = <div>
            <Icon style={{}} type="warning" theme="twoTone"/>
            <h4
                style={{
                    marginTop: "-27px",
                    color: "#9e141c",
                    textAlign: "right",
                    height: "12px"
                }}
            >هشدار</h4>
        </div>;
        const {classes} = this.props;
        return (
            <MuiThemeProvider

                theme={theme}>
                <div>
                    {this.state.open === true && this.state.data !== null ?
                        <Dialog
                            maxWidth='lg'
                            open={this.state.open}
                            onClose={this.handleCloseDialog}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogContent>
                                <card>
                                    <CardBody>
                                        <MuiThemeProvider theme={theme}>
                                            <div dir="rtl">
                                                <card
                                                    style={{
                                                        backgroundColor: "#f6f8f7",
                                                    }}
                                                >
                                                    <CardHeader color="primary">
                                                        <h4 className={classes.cardTitleWhite}>{"مشخصات خرید"}</h4>
                                                    </CardHeader>
                                                    <CardBody
                                                        style={{
                                                            boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                                                        }}
                                                    >
                                                        <CardBody
                                                            style={{
                                                                backgroundColor: "#f8faf9",
                                                                boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                                                                marginBottom: theme.spacing.unit * 6,
                                                                marginTop: theme.spacing.unit * 3

                                                            }}
                                                        >
                                                            {/*<div*/}
                                                            {/*style={{*/}
                                                            {/*marginBottom: theme.spacing.unit * 2*/}
                                                            {/*}}*/}
                                                            {/*>*/}
                                                            {/*<Muted>مشخصات خریدار :</Muted>*/}
                                                            {/*</div>*/}
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <form>


                                                                </form>
                                                            </GridItem>
                                                            <div
                                                                style={{
                                                                    marginBottom: theme.spacing.unit * 2
                                                                }}
                                                            >
                                                                <Muted>مشخصات سفارش :</Muted>
                                                            </div>

                                                            <GridItem xs={12} sm={12} md={12}>

                                                                <form>
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                className={classes.inputStyle}
                                                                                // value={this.state.name}
                                                                            />
                                                                        }
                                                                        label={"نام خریدار :"}
                                                                        labelPlacement="start"
                                                                    />
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                className={classes.inputStyle}
                                                                                value={this.state.data.customerNumber}
                                                                            />
                                                                        }
                                                                        label={"شماره تلفن :"}
                                                                        labelPlacement="start"
                                                                    />
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                className={classes.inputStyleN}
                                                                                value={this.state.data.identifier}
                                                                            />
                                                                        }
                                                                        label={"شناسه سفارش :"}
                                                                        labelPlacement="start"
                                                                    />
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                className={classes.inputStyleN}
                                                                                value={this.state.data.orderDeliveryInfo.date}
                                                                            />
                                                                        }
                                                                        label={"تاریخ دریافت:"}
                                                                        labelPlacement="start"
                                                                    />
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                value={this.state.data.orderStatus.name}
                                                                                className={classes.inputStyleN}
                                                                            />
                                                                        }
                                                                        label={"وضعیت سفارش :"}
                                                                        labelPlacement="start"
                                                                    />
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                className={classes.inputStyle}
                                                                                value={this.state.data.customerReferenceNumber}
                                                                            />
                                                                        }
                                                                        label={"شناسه پرداخت :"}
                                                                        labelPlacement="start"
                                                                    />
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                className={classes.inputStyleN}
                                                                                value={this.state.data.orderDeliveryInfo.time}
                                                                            />
                                                                        }
                                                                        label={"زمان دریافت :"}
                                                                        labelPlacement="start"
                                                                    />
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                className={classes.inputStyle}
                                                                                value={this.state.data.registerDate}
                                                                            />
                                                                        }
                                                                        label={"تاریخ ثبت کالا:"}
                                                                        labelPlacement="start"
                                                                    />
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                className={classes.inputStyleN}
                                                                                r={console.log(this.state.data)}
                                                                                value={this.state.data.orderDeliveryInfo.deliveryType.name}
                                                                            />
                                                                        }
                                                                        label={"نوع پست کالا:"}
                                                                        labelPlacement="start"
                                                                    />
                                                                    < FormControlLabel
                                                                        control={
                                                                            <Input
                                                                                style={{
                                                                                    height: "43px",
                                                                                    marginTop: theme.spacing.unit * 2,
                                                                                    marginRight: theme.spacing.unit * 2,
                                                                                    marginLeft: theme.spacing.unit * 20,
                                                                                    marginBottom: theme.spacing.unit * 2,
                                                                                    width: 400,
                                                                                    direction: 'rtl'
                                                                                }}
                                                                                value={this.state.data.customerAddressInfo.address}
                                                                            />
                                                                        }
                                                                        label={"آدرس :"}
                                                                        labelPlacement="start"
                                                                    />

                                                                </form>


                                                            </GridItem>
                                                        </CardBody>
                                                        <CardBody
                                                            style={{
                                                                backgroundColor: "#f8faf9",
                                                                boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                                                                marginBottom: theme.spacing.unit * 6
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    marginBottom: theme.spacing.unit * 2
                                                                }}
                                                            >
                                                                <Muted>مشخصات کالا :</Muted>
                                                            </div>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <TableWithAction
                                                                    tableColumns={this.state.tableColumnsInfo}
                                                                    dataTable={this.state.dataTableInfo}
                                                                    numberOfProduct={this.state.numberOfProduct}
                                                                    treeTable={this.state.treeTable}
                                                                    Pagination={this.state.Pagination}
                                                                />
                                                                <FormControlLabel
                                                                    style={{
                                                                        marginTop: theme.spacing.unit * 2,
                                                                    }}
                                                                    control={
                                                                        <NumberFormat
                                                                            thousandSeparator={true}
                                                                            customInput={Input}
                                                                            className={classes.inputStyleN}
                                                                            value={this.state.data.sumOfAmount}
                                                                            variant="outlined"
                                                                            margin="normal"
                                                                            required
                                                                        />
                                                                    }
                                                                    label={"قیمت کل سفارش (ریال): "}
                                                                    labelPlacement="start"
                                                                />
                                                            </GridItem>
                                                        </CardBody>
                                                    </CardBody>
                                                </card>
                                            </div>
                                        </MuiThemeProvider>
                                    </CardBody>
                                </card>
                            </DialogContent>
                            <DialogActions>
                                {this.state.data.canAcceptOrReject === true ?
                                    <div>
                                        <Button
                                            variant="contained"
                                            style={{
                                                height: "25px",
                                                width: 60,
                                                boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
                                                background: "linear-gradient(60deg, #125a62, #125a62)",
                                                align: "center"
                                            }}
                                            color="secondary"
                                            onClick={() => {
                                                this.handleClose()
                                            }}>
                                            لغو
                                        </Button>
                                        <Button
                                            variant="contained"
                                            style={{
                                                height: "25px",
                                                width: 60,
                                                boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
                                                background: "linear-gradient(60deg, #125a62, #125a62)",
                                                align: "center"
                                            }}
                                            color="secondary"
                                            onClick={() => {
                                                this.handleSave()
                                            }}>
                                            تایید
                                        </Button>
                                    </div> : textAlert
                                }

                            </DialogActions>
                        </Dialog>
                        : null
                    }
                </div>
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
                    <Card
                        style={{
                            boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                        }}
                    >
                        <CardHeader plain color={"primary"}>
                            <h4 className={classes.cardTitleWhite}>بررسی فروش</h4>
                        </CardHeader>
                        <CardBody
                            style={{
                                padding: "1.9375rem 51px",
                            }}
                        >
                            <SearchProduct
                                searchInfo={this.state.searchInfo}
                                search={this.state.search}
                                handleChangeSearch={this.handleChangeSearch.bind(this)}
                            />
                            <TableWithAction
                                tableColumns={this.state.tableColumns}
                                dataTable={this.state.dataTable}
                                numberOfProduct={this.state.numberOfProduct}
                                treeTable={this.state.treeTable}
                                buttonList={this.state.buttonList}
                                Pagination={this.state.Pagination}
                            />
                        </CardBody>
                    </Card>
                </div>
                <Snackbar
                    place="tc"
                    color={this.state.alertStyle}
                    icon={AddAlert}
                    message={this.state.text}
                    open={this.state.tc}
                />
                <LocaleProvider locale={faIR}>
                    <Modal
                        style={{
                            zIndex: '100',
                        }}
                        width="400px"
                        closable={false}
                        title={text}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <h5
                            style={{
                                color: "#000000",
                                textAlign: "right"
                            }}
                        >از انجام این عملیات اطمینان دارید؟</h5>
                    </Modal>
                </LocaleProvider>
            </MuiThemeProvider>

        )
    }
}

export default withStyles(styles)(Confirmation);