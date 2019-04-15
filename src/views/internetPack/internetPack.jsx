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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from "components/Snackbar/Snackbar.jsx";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Muted from "components/Typography/Muted.jsx";
import NumberFormat from 'react-number-format';
import {Input, LocaleProvider, Upload, Icon, Modal} from 'antd';
import 'antd/dist/antd.css';
import faIR from 'antd/lib/locale-provider/fa_IR';
import axios from "axios";
import AddAlert from "@material-ui/icons/AddAlert";
import LinearProgress from '@material-ui/core/LinearProgress';

const theme = createMuiTheme({
    direction: 'rtl',
});
const styles = theme => ({
    root: {
        display: 'flex',
    },
    Rtl: {
        textAlign: 'right',
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
        boxShadow: "0 12px 20px -10px rgba(0, 231, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 184, 255, 0.2)",
        background: "linear-gradient(60deg, #1dd8eb, #125a62)"
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

    inputSelectionSup: {
        height: "38px",
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        width: 160,
    },
    inputStyle: {
        height: "40px",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 2,
        width: 120,
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
    inputStyleN: {
        height: "38px",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        // marginBottom: theme.spacing.unit * 2,
        width: 150,
        direction: 'rtl'
    },
    customInputStyle: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        width: 650,
        direction: 'rtl'
    },
    table: {
        minWidth: 250,
    },
    customButtons: {
        height: "25px",
        width: 60,
        boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
        background: "linear-gradient(60deg, #125a62, #125a62)"
    },
})


class EditProduct extends React.Component {
    state = {
        categoryList: [],
        color: 'warning',
        text: '',
        alertStyle: 'info',
        tc: false,
        lastProductItemAttributeInfo: null,
        productItemAttributeInfoList: [],
        resData: null,
        selectedOption: "",
        productItemInfoList: {
            code: '',
            price: '',
            numberOfProduct: '',
            description: '',
            productItemImageBase64List: [],
            productItemSupplier: {
                identifier: '',
                name: ''
            },
            productAttributeItemList: [],
        },
        previewVisible: false,
        previewImage: '',
        fileList: [],
        files: [],
        Pagination: true,
        PaginationDialog: false,
        open: false,
        buttonList: [],
        treeTable: false,
        search: [],
        searchInfo: [
            {
                name: "identifier",
                searchType: "textField",
                labelText: "شناسه سفارش : ",
                placeholder: "------------------------"
            },

            {
                name: "registerDateFrom",
                searchType: "numberFormat",
                labelText: "ازتاریخ:",
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
                name: "operatorCode",
                searchType: "select",
                labelText: "اپراتور:",
                placeholder: "--------------------",
                selectOption: []
            },
            {
                name: "orderStatusCode ",
                searchType: "textField",
                labelText: "کد وضعیت سفارش: ",
                placeholder: "------------------------"
            },
            {
                name: "requesterTraceCode",
                searchType: "textField",
                labelText: "کد درخواست کننده : ",
                placeholder: "------------------------"
            },
            {
                name: "customerReferenceNumber",
                searchType: "textField",
                labelText: "شماره پیگیری: ",
                placeholder: "------------------------"
            },
            {
                name: "paymentGatewayProviderCode",
                searchType: "select",
                labelText: " درگاه پرداخت:",
                placeholder: "--------------------",
                selectOption: []
            },
            {
                name: "mobileNumber",
                searchType: "textField",
                labelText: "شماره موبایل مشتری :",
                placeholder: "-------------------------"
            },
            {
                name: "subscriberNumber",
                searchType: "textField",
                labelText: " شماره ذینفع : ",
                placeholder: "------------------------"
            },
            {
                name: "packageCode",
                searchType: "textField",
                labelText: "کد بسته :",
                placeholder: "-------------------------"
            },

        ],
        tableColumns: [{
            Header: 'مشخصات بسته',
            columns: [
                {
                    Header: 'کد بسته',
                    accessor: 'packageCode',
                    filterable: false,
                    resizable: false
                },
                {
                    Header: 'شناسه سفارش',
                    accessor: 'identifier',
                    filterable: false,
                    resizable: false
                },
                {
                    Header: 'شماره پیگیری ',
                    accessor: 'customerReferenceNumber',
                    filterable: false,
                    resizable: false
                },

                {
                    Header: ' درگاه پرداخت',
                    accessor: 'paymentGatewayProviderCode',
                    filterable: false,
                    resizable: false
                },
                {
                    Header: 'اپراتور',
                    accessor: 'operatorCode',
                    filterable: false,
                    resizable: false
                },
                {
                    Header: ' شماره ذینفع',
                    accessor: 'subscriberNumber',
                    filterable: false,
                    resizable: false
                },
                {
                    Header: 'کد وضعیت سفارش',
                    accessor: 'orderStatusCode ',
                    filterable: false,
                    resizable: false
                },
                {
                    Header: 'شماره موبایل مشتری',
                    accessor: 'mobileNumber',
                    filterable: false,
                    resizable: false
                },
                {
                    Header: 'کد درخواست کننده  ',
                    accessor: 'requesterTraceCode',
                    filterable: false,
                    resizable: true,
                    width: "200px"
                },


                {
                    Header: 'درگاه پرداخت',
                    accessor: 'paymentPort',
                    filterable: false,
                    resizable: false
                },
                {
                    Header: 'تاریخ',
                    filterable: false,
                    accessor: 'date',
                    resizable: false
                },
            ]
        },],
        dataTable: [],
    }

    searchItemProduct() {
        this.setState({
            linearProgress: true,
        });
        var data = {
            "packageCode": "",
            "subscriberNumber": "",
            "paymentGatewayProviderCode": "",
            "operatorCode": "",
            "requesterTraceCode": "",
            "customerReferenceNumber": "",
            "identifier ": "",
            "registerDateFrom": "",
            "registerDateTo": "",
            "orderStatusCode": "",
            "mobileNumber": "",

        }
        for (var i = 0; i < this.state.search.length; i++) {
            if (this.state.search[i].name === "operatorCode") {
                data.operatorCode = this.state.search[i].value;
            } else if (this.state.search[i].name === "registerDateFrom") {
                data.registerDateFrom = this.state.search[i].value;
            } else if (this.state.search[i].name === "registerDateTo") {
                data.registerDateTo = this.state.search[i].value;
            } else if (this.state.search[i].name === "identifier ") {
                data.identifier = this.state.search[i].value;
            } else if (this.state.search[i].name === "customerReferenceNumber") {
                data.customerReferenceNumber = this.state.search[i].value;
            } else if (this.state.search[i].name === "requesterTraceCode") {
                data.requesterTraceCode = this.state.search[i].value;
            } else if (this.state.search[i].name === "orderStatusCode ") {
                data.orderStatusCode = this.state.search[i].value;
            } else if (this.state.search[i].name === "paymentGatewayProviderCode") {
                data.paymentGatewayProviderCode = this.state.search[i].value;
            } else if (this.state.search[i].name === "mobileNumber") {
                data.mobileNumber = this.state.search[i].value;
            } else if (this.state.search[i].name === "subscriberNumber") {
                data.subscriberNumber = this.state.search[i].value;
            } else if (this.state.search[i].name === "packageCode") {
                data.packageCode = this.state.search[i].value;
            }
        }
        axios.post(``,
            data)
            .then(res => {
                const dataTable = []
                this.setState({
                    linearProgress: false,
                    "dataTable": res.data
                });
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "جستجو نا موفق بود!", "danger")
        });

    };

    handleChangeSelect = (selectedOption) => {
        this.setState({selectedOption});

    }

    handleChangeSearch(search) {
        this.state.search = search
        this.searchItemProduct();
    };

    componentDidMount() {
        this.setState({
            linearProgress: true,
        });
        axios.get(``)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        linearProgress: false,
                    });
                    const categoryList = [];
                    const data = res.data.productCategoryList;
                    data.map(data => (
                        categoryList.push(
                            {value: data.identifier, label: data.productCategoryName})
                    ))
                    console.log(1)
                    // console.log(categoryList)
                    var searchInfo = this.state.searchInfo;
                    console.log(searchInfo[5].selectOption)
                    searchInfo[5].selectOption = categoryList;
                    this.setState({
                        searchInfo: searchInfo,
                    });
                } else {
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
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>گزارش بسته اینترنت</h4>
                        </CardHeader>
                        <CardBody
                            style={{
                                padding: "1.9375rem 51px",
                            }}
                        >
                            <SearchProduct
                                style={{
                                    marginTop: theme.spacing.unit * 2,
                                }}
                                search={this.state.search}
                                searchInfo={this.state.searchInfo}
                                handleChangeSearch={this.handleChangeSearch.bind(this)}
                            />
                            <TableWithAction
                                tableColumns={this.state.tableColumns}
                                dataTable={this.state.dataTable}
                                treeTable={this.state.treeTable}
                                buttonList={this.state.buttonList}
                                Pagination={this.state.Pagination}
                            />
                        </CardBody>
                    </Card>
                    <Snackbar
                        place="tc"
                        color={this.state.alertStyle}
                        icon={AddAlert}
                        message={this.state.text}
                        open={this.state.tc}
                    />
                </div>
            </MuiThemeProvider>

        )
    }
}

export default withStyles(styles)(EditProduct);