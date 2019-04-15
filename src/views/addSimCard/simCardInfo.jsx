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
import {Input, Form, Radio, Table, Divider, Checkbox, LocaleProvider} from 'antd';
import faIR from 'antd/lib/locale-provider/fa_IR';
import NumberFormat from 'react-number-format';
import TableWithAction from "../../components/Table/TableWithAction";
import axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import getAccessToken from "../../routes/ACCESS_TOKEN";

const columns = [{
    title: 'اولین شماره',
    dataIndex: 'firstNumber',
    key: 'firstNumber',
}, {
    title: 'اخرین شماره',
    dataIndex: 'lastNumber',
    key: 'lastNumber',
},
    {
        title: 'شماره ویژه',
        dataIndex: 'spcNumber',
        key: 'spcNumber',
    },
    {
        title: 'قیمت',
        dataIndex: 'price',
        key: 'price',
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, record) => (
    //         <span>
    //   <a href="javascript:;">Invite {record.name}</a>
    //   <Divider type="vertical" />
    //   <a href="javascript:;">Delete</a>
    // </span>
    //     ),
    // }
];


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
    addSim: {
        background: "#ff9933",
        color: "#fff",
        "&:hover": {
            background: "#e28c13",
        },
        marginRight: "-18px",
    },
    endSim: {
        background: "rgb(92,184,92)",
        color: "#fff",
        "&:hover": {
            background: "rgb(70, 142, 70)",
        },
        // marginLeft: "-18px",
        marginRight: "85px"
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
    blackText: {
        marginBottom: "10px",
        color: "#000000",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    cardTitleBlack: {
        color: "#000000",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "400",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        fontSize: "15px"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "400",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        fontSize: "17px"
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
        height: "35px",
        width: 300,
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

    state = {
        spcNumber: "",
        checked: false,
        color: 'warning',
        text: '',
        alertStyle: 'info',
        tc: false,
        linearProgress: false,
        treeTable: false,
        Pagination: false,
        firstNumber: '',
        lastNumber: '',
        price: '',
        numbers: [],
        operator: '',
        dataTable: [],
        tableColumns: [{},],

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

    onChange = (e) => {
        this.setState({
            operator: e.target.value,
        });
    }

    onChangeCheckbox = (e) => {
        if (this.state.checked === false) {
            this.setState({
                checked: true,
            })
        } else {
            this.setState({
                checked: false,
            })
        }

    }

     sendData = (e) => {
        this.setState({
            linearProgress: true,
        })
        let dataTable = this.state.dataTable;
        for (let i = 0; i < dataTable.length; i++) {
            if (dataTable[i].spcNumber !== "") {
                this.state.numbers.push(
                    {
                        "number": dataTable[i].spcNumber,
                        "price": dataTable[i].price,
                    }
                )
            }
            else {
                let num = this.state.dataTable[i].firstNumber;
                let count = this.state.dataTable[i].lastNumber.substr(1) - this.state.dataTable[i].firstNumber.substr(1);
                for (let j = 0; j < count; j++) {
                    this.state.numbers.push(
                        {
                            "number": '0' + num++,
                            "price": this.state.dataTable[i].price,
                        }
                    )
                    if (j === count - 1) {
                        this.state.numbers.push(
                            {
                                "number": this.state.dataTable[i].lastNumber,
                                "price": this.state.dataTable[i].price,
                            }
                        )
                    }

                }
            }
        }

        console.log(this.state.numbers)
        // axios.post(`http://shop.isuncharge.com/isunshop/register/product`,)
        //     .then(res => {
        //         if (res.data.success) {
        //             this.setState({
        //                 linearProgress: false,
        //             })
        //             this.showNotification("tc", "سیمکارت با موفقیت ثبت شد!", "success");
        //         } else {
        //             this.setState({
        //                 linearProgress: false,
        //             })
        //             this.showNotification("tc", "خطایی در پردازش اطلاعات رخ داده است!", "danger")
        //         }
        //     }).catch((error) => {
        //     console.log(1)
        //     console.log(error)
        //     this.setState({
        //         linearProgress: false,
        //     })
        //     this.showNotification("tc", "خطایی در پردازش اطلاعات رخ داده است!", "danger")
        // });
    }

    addSimNew = (e) => {
        // todo : validation info
        var dataTable = this.state.dataTable;
        if (this.state.checked === false) {
            if (this.state.firstNumber === '') {
                this.showNotification("tc", "شروع شماره را وارد نمایید!", "danger");
            } else if (this.state.lastNumber === '') {
                this.showNotification("tc", "پایان شماره را وارد نمایید!", "danger");
            } else if (this.state.price === '') {
                this.showNotification("tc", "قیمت را وارد نمایید!", "danger");
            } else {
                dataTable.push(
                    {
                        firstNumber: this.state.firstNumber,
                        lastNumber: this.state.lastNumber,
                        key: this.state.dataTable.length,
                        price: this.state.price,
                    }
                )
                console.log(dataTable)
                this.setState(
                    {
                        dataTable: dataTable,
                        firstNumber: "",
                        lastNumber: "",
                        price: "",
                    });
            }
        } else {
            if (this.state.spcNumber === '') {
                this.showNotification("tc", "شماره ویژه را وارد نمایید!", "danger");
            } else if (this.state.price === '') {
                this.showNotification("tc", "قیمت را وارد نمایید!", "danger");
            }else {
                dataTable.push(
                    {
                        key: this.state.dataTable.length,
                        price: this.state.price,
                        spcNumber: this.state.spcNumber,
                    }
                )
                console.log(dataTable)
                this.setState(
                    {
                        dataTable: dataTable,
                        spcNumber: "",
                        price: "",
                    });
            }
        }
    }
    handleChangeSpcNumber = input => event => {
        this.state.spcNumber = event.target.value;
    }

    handleChangeFirstNumber = input => event => {
        this.state.firstNumber = event.target.value;
    }
    handleChangeLastNumber = input => event => {
        this.state.lastNumber = event.target.value;
    }
    handleChangePrice = input => event => {
        this.state.price = event.target.value.replace(/,/g, '');
        console.log(this.state.price)
    }
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const RadioGroup = Radio.Group;
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>مشخصات سیم کارت</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <card>
                                        <CardBody
                                            style={{
                                                marginRight: "350px",
                                                marginLeft: "350px",
                                                textAlign: "center",
                                                marginTop: theme.spacing.unit * 3,
                                                marginBottom: theme.spacing.unit * 3,
                                                backgroundColor: "#d4e6ec",
                                                boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                                            }}
                                        >
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Card
                                                >
                                                    <CardHeader plain color="primary">
                                                        {/*className={classes.cardTitleWhite}>*/}
                                                        <Checkbox onChange={this.onChangeCheckbox}><span
                                                            className={classes.cardTitleWhite}>شماره ویژه</span></Checkbox>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <div>
                                                            <form
                                                                style={{
                                                                    marginTop: theme.spacing.unit * 3,
                                                                    marginBottom: theme.spacing.unit * 6,
                                                                    marginRight: theme.spacing.unit * 8,
                                                                }}
                                                            >

                                                                <RadioGroup size={"small"} onChange={this.onChange}
                                                                            value={this.state.operator}>
                                                                    <Radio
                                                                        style={{
                                                                            marginRight: theme.spacing.unit * -8,
                                                                        }}
                                                                        value={"iranCell"}><span
                                                                        className={classes.cardTitleBlack}>ایرانسل</span></Radio>
                                                                    <Radio
                                                                        style={{
                                                                            marginRight: theme.spacing.unit * 4,
                                                                        }}
                                                                        value={"rhighTel"}><span
                                                                        className={classes.cardTitleBlack}>رایتل</span></Radio>
                                                                    <Radio
                                                                        style={{
                                                                            marginRight: theme.spacing.unit * 4,
                                                                        }}
                                                                        value={"hamrahAval"}><span
                                                                        className={classes.cardTitleBlack}>همراه اول</span></Radio>
                                                                </RadioGroup>
                                                            </form>
                                                            {this.state.checked === false ?
                                                                <GridItem xs={12} sm={12} md={12}>
                                                                    <Form layout={"vertical"}>
                                                                        <Form.Item>
                                                                            <div textAlign="center"
                                                                                 className={classes.blackText}> شروع
                                                                                شماره
                                                                            </div>
                                                                            <NumberFormat
                                                                                // thousandSeparator={true}
                                                                                customInput={Input}
                                                                                className={classes.inputStyle}
                                                                                placeholder="---------------------------------------------------------"
                                                                                onChange={this.handleChangeFirstNumber()}
                                                                                defaultValue={this.state.firstNumber}
                                                                                value={this.state.firstNumber}
                                                                                variant="outlined"
                                                                                margin="normal"
                                                                                required
                                                                            />
                                                                        </Form.Item>
                                                                    </Form>
                                                                    <Form layout={"vertical"}>
                                                                        <Form.Item>
                                                                            <div className={classes.blackText}> پایان
                                                                                شماره
                                                                            </div>
                                                                            <NumberFormat
                                                                                // thousandSeparator={true}
                                                                                customInput={Input}
                                                                                className={classes.inputStyle}
                                                                                placeholder="---------------------------------------------------------"
                                                                                onChange={this.handleChangeLastNumber()}
                                                                                defaultValue={this.state.lastNumber}
                                                                                value={this.state.lastNumber}
                                                                                variant="outlined"
                                                                                margin="normal"
                                                                                required
                                                                            />
                                                                        </Form.Item>
                                                                    </Form>
                                                                    <Form layout={"vertical"}>
                                                                        <Form.Item>
                                                                            <div className={classes.blackText}> قیمت
                                                                                (ریال)
                                                                            </div>
                                                                            <NumberFormat
                                                                                thousandSeparator={true}
                                                                                customInput={Input}
                                                                                className={classes.inputStyle}
                                                                                placeholder="---------------------------------------------------------"
                                                                                onChange={this.handleChangePrice()}
                                                                                defaultValue={this.state.price}
                                                                                value={this.state.price}
                                                                                variant="outlined"
                                                                                margin="normal"
                                                                                required
                                                                            />
                                                                        </Form.Item>
                                                                    </Form>
                                                                </GridItem>
                                                                :
                                                                <GridItem xs={12} sm={12} md={12}>
                                                                    <Form layout={"vertical"}>
                                                                        <Form.Item>
                                                                            <div textAlign="center"
                                                                                 className={classes.blackText}>
                                                                                شماره ویژه
                                                                            </div>
                                                                            <NumberFormat
                                                                                // thousandSeparator={true}
                                                                                customInput={Input}
                                                                                className={classes.inputStyle}
                                                                                placeholder="---------------------------------------------------------"
                                                                                onChange={this.handleChangeSpcNumber()}
                                                                                defaultValue={this.state.spcNumber}
                                                                                value={this.state.spcNumber}
                                                                                variant="outlined"
                                                                                margin="normal"
                                                                                required
                                                                            />
                                                                        </Form.Item>
                                                                    </Form>
                                                                    <Form layout={"vertical"}>
                                                                        <Form.Item>
                                                                            <div className={classes.blackText}> قیمت
                                                                                (ریال)
                                                                            </div>
                                                                            <NumberFormat
                                                                                thousandSeparator={true}
                                                                                customInput={Input}
                                                                                className={classes.inputStyle}
                                                                                placeholder="---------------------------------------------------------"
                                                                                onChange={this.handleChangePrice()}
                                                                                defaultValue={this.state.price}
                                                                                value={this.state.price}
                                                                                variant="outlined"
                                                                                margin="normal"
                                                                                required
                                                                            />
                                                                        </Form.Item>
                                                                    </Form>
                                                                </GridItem>
                                                            }
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <CardFooter>
                                                                    <Button
                                                                        className={classes.addSim}
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        onClick={this.addSimNew}>
                                                                        افزودن سیمکارت
                                                                    </Button>
                                                                    <Button
                                                                        className={classes.endSim}
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        onClick={this.sendData}>
                                                                        ثبت شماره
                                                                    </Button>
                                                                </CardFooter>
                                                            </GridItem>
                                                        </div>
                                                    </CardBody>


                                                </Card>
                                            </GridItem>

                                        </CardBody>
                                        <Card style={{
                                            // marginRight: theme.spacing.unit * -8,
                                            // marginLeft: theme.spacing.unit * -8
                                        }}>
                                            {this.state.dataTable.length !== 0 ?
                                                <LocaleProvider locale={faIR}>
                                                    <Table
                                                        columns={columns}
                                                        dataSource={this.state.dataTable}
                                                        scroll="x : true"
                                                        pagination={false}
                                                    />
                                                </LocaleProvider>
                                                : null
                                            }

                                        </Card>

                                    </card>
                                </GridItem>
                            </GridContainer>
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
                        </CardBody>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(SaleInfoDetails);
