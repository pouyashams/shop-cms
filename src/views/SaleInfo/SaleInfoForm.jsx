import React, {Component} from 'react';
import SaleInfoDetails from './SaleInfoDetails';
import TableSaleInfo from './TableSaleInfo';
import Success from '../AddProductPanel/Success';
import axios from "axios";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import getAccessToken from "../../routes/ACCESS_TOKEN";

const styles = theme => ({
    direction: 'rtl',

    root: {
        width: '10%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    customStyle: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: 200,
        direction: 'rtl'
    }
});

class TableForm extends Component {
    state = {
        linearProgress: false,
        dataOfSaleInfo: [],
        step: 1,
        name: null,
        password: null,
        timer: null,
        color: 'warning',
        text: '',
        alertStyle: 'info',
        tc: false,
        reportDate: null,
        summaryOfAllSaleInfo: [],
    }

    nextStep = async () => {
        if (this.state.name === null || this.state.name === '') {
            this.showNotification("tc", "نام کاربری را وارد کنید!", "danger");
            return;
        }
        if (this.state.selectedProductCategoryId === null || this.state.selectedProductCategoryId === '') {
            this.showNotification("tc", "رمز عبور را وارد کنید!", "danger");
            return;
        }
        this.saleInfo()
        return;
    }

    async  saleInfo() {
        const data = {
            "userName": this.state.name,
            "password": this.state.password,
        }
        var access_token = await getAccessToken();
        axios.post(`http://shop.isuncharge.com/isunshop/report/all-sale-info?access_token=`+ access_token,
            data)
            .then(res => {
                if (res.data.success) {
                    const data = []
                    const saleInfoList = res.data.saleInfoList;


                    var rows = [];
                    for (var i = 0; i < saleInfoList.length; i++) {
                        let info = saleInfoList[i];

                        Object.assign(info, {
                            amount: info.amount + ' ریال'
                        });
                        let row = [];
                        for (var key in info) {
                            row.push(info[key]);
                        }
                        rows.push(row);
                    }

                    var summaryOfAllSaleInfos = res.data.summaryOfAllSaleInfo
                    var summaryOfAllSaleInfo = [];

                    Object.assign(summaryOfAllSaleInfos.summaryOfInternetPackage, {
                        name: 'بسته اینترنت',
                        sumOfAmount: summaryOfAllSaleInfos.summaryOfInternetPackage.sumOfAmount + ' ریال'
                    });

                    Object.assign(summaryOfAllSaleInfos.summaryOfBill, {
                        name: 'پرداخت قبض',
                        sumOfAmount: summaryOfAllSaleInfos.summaryOfBill.sumOfAmount + ' ریال'
                    });

                    Object.assign(summaryOfAllSaleInfos.summaryOfTopUp, {
                        name: 'خرید شارژ',
                        sumOfAmount: summaryOfAllSaleInfos.summaryOfTopUp.sumOfAmount + ' ریال'

                    });

                    Object.assign(summaryOfAllSaleInfos.summeryOfAllSale, {
                        name: 'جمع کل',
                        sumOfAmount: summaryOfAllSaleInfos.summeryOfAllSale.sumOfAmount + ' ریال'

                    });

                    summaryOfAllSaleInfo.push(summaryOfAllSaleInfos.summaryOfInternetPackage);
                    summaryOfAllSaleInfo.push(summaryOfAllSaleInfos.summaryOfBill);
                    summaryOfAllSaleInfo.push(summaryOfAllSaleInfos.summaryOfTopUp);
                    summaryOfAllSaleInfo.push(summaryOfAllSaleInfos.summeryOfAllSale);


                    var summeryRows = [];
                    for (var i = 0; i < summaryOfAllSaleInfo.length; i++) {
                        let info = summaryOfAllSaleInfo[i];
                        let summeryRow = [];
                        for (var key in info) {
                            summeryRow.push(info[key]);
                        }
                        summeryRows.push(summeryRow);
                    }

                    this.setState({
                        summaryOfAllSaleInfo: summeryRows,
                        reportDate: res.data.reportDate,
                        dataOfSaleInfo: rows,
                        step: this.state.step + 1,
                        data: res.data,
                        linearProgress: false,
                    })
                    let timer = setInterval(this.saleInfoTimer.bind(this), 60000 * 2);
                    this.state.timer = timer;
                } else {
                    this.setState({
                        linearProgress: false,
                    });
                    this.showNotification("tc", "نام کاربری یا رمز عبور اشتباه است! ", "danger")
                    return;
                }
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "نام کاربری یا رمز عبور اشتباه است! ", "danger")
            return;
        });

    }

    async saleInfoTimer() {
        this.setState({
            linearProgress: true,
        });
        const data = {
            "userName": this.state.name,
            "password": this.state.password,
        }
        this.setState({
            linearProgress: true,
        });
        var access_token = await getAccessToken();
        axios.post(`http://shop.isuncharge.com/isunshop/report/all-sale-info?access_token=`+ access_token,
            data)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    const data = []
                    const saleInfoList = res.data.saleInfoList;


                    var rows = [];
                    for (var i = 0; i < saleInfoList.length; i++) {
                        let info = saleInfoList[i];
                        Object.assign(info, {
                            amount: info.amount + ' ریال'
                        });
                        let row = [];
                        for (var key in info) {
                            row.push(info[key]);
                        }
                        rows.push(row);
                    }

                    const summaryOfAllSaleInfos = res.data.summaryOfAllSaleInfo
                    var summaryOfAllSaleInfo = [];

                    Object.assign(summaryOfAllSaleInfos.summaryOfInternetPackage, {
                        name: 'بسته اینترنت',
                        sumOfAmount: summaryOfAllSaleInfos.summaryOfInternetPackage.sumOfAmount + ' ریال'
                    });

                    Object.assign(summaryOfAllSaleInfos.summaryOfBill, {
                        name: 'پرداخت قبض',
                        sumOfAmount: summaryOfAllSaleInfos.summaryOfBill.sumOfAmount + ' ریال'
                    });

                    Object.assign(summaryOfAllSaleInfos.summaryOfTopUp, {
                        name: 'خرید شارژ',
                        sumOfAmount: summaryOfAllSaleInfos.summaryOfTopUp.sumOfAmount + ' ریال'

                    });

                    Object.assign(summaryOfAllSaleInfos.summeryOfAllSale, {
                        name: 'جمع کل',
                        sumOfAmount: summaryOfAllSaleInfos.summeryOfAllSale.sumOfAmount + ' ریال'

                    });

                    summaryOfAllSaleInfo.push(summaryOfAllSaleInfos.summaryOfInternetPackage);
                    summaryOfAllSaleInfo.push(summaryOfAllSaleInfos.summaryOfBill);
                    summaryOfAllSaleInfo.push(summaryOfAllSaleInfos.summaryOfTopUp);
                    summaryOfAllSaleInfo.push(summaryOfAllSaleInfos.summeryOfAllSale);


                    var summeryRows = [];
                    for (var i = 0; i < summaryOfAllSaleInfo.length; i++) {
                        let info = summaryOfAllSaleInfo[i];
                        let summeryRow = [];
                        for (var key in info) {
                            summeryRow.push(info[key]);
                        }
                        summeryRows.push(summeryRow);
                    }

                    console.log(summeryRows);


                    this.setState({
                        summaryOfAllSaleInfo: summeryRows,
                        reportDate: res.data.reportDate,
                        dataOfSaleInfo: rows,
                        data: res.data,
                        linearProgress: false,

                    })
                } else {
                    this.setState({
                        linearProgress: false,
                    });
                    this.showNotification("tc", "مشکلی پیش آمده است! ", "danger")
                    return;
                }
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "مشکلی پیش آمده است! ", "danger")
            return;
        });
    }

    componentWillUnmount() {
        this.state.timer = 0;
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

    handleChange = input => event => {
        this.setState({[input]: event.target.value})
    }
    handelechangeWithValue = (name, value) => {
        this.setState({[name]: value})
    }

    render() {
        const {step} = this.state;
        switch (step) {
            case 1:
                return <div dir="rtl">
                    <SaleInfoDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handelechangeWithValue={this.handelechangeWithValue}
                    />
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
                    <Snackbar
                        place="tc"
                        color={this.state.alertStyle}
                        icon={AddAlert}
                        message={this.state.text}
                        open={this.state.tc}
                    />
                </div>
            case 2:
                return <div dir="rtl">
                    <TableSaleInfo
                        dataOfSaleInfo={this.state.dataOfSaleInfo}
                        summaryOfAllSaleInfo={this.state.summaryOfAllSaleInfo}
                        reportDate={this.state.reportDate}
                    />
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
                    <Snackbar
                        place="tc"
                        color={this.state.alertStyle}
                        icon={AddAlert}
                        message={this.state.text}
                        open={this.state.tc}
                    />
                </div>
            default:
                return <SaleInfoDetails/>
        }
    }
}

export default withStyles(styles)(TableForm);