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
    inputSelectionSup: {
        height: "38px",
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        width: 160,
    },
    table: {
        minWidth: 250,
    },
    customButtons: {},
})

class Confirmation extends React.Component {
    state = {
        Pagination: true,
        buttonList: [
            ,

        ],
        treeTable: true,
        numberOfProduct: 3,
        search: null,
        searchInfo: [

            {
                name: "code",
                searchType: "textField",
                labelText: "شناسه کالا :",
                placeholder: "---------------------"
            },

            {
                name: "paymentStatus",
                searchType: "select",
                labelText: "وضعیت پرداخت :",
                placeholder: "-----------------------"
            },

            {
                name: "accessStatus",
                searchType: "select",
                labelText: "وضعیت تایید :",
                placeholder: "-----------------------"
            },

            {
                name: "fromDate",
                searchType: "numberFormat",
                labelText: "از تاریخ :",
                placeholder: moment().locale('fa').format('YYYY/MM/DD'),
                defaultValue: moment().locale('fa').format('YYYY/MM/DD'),
                format: "####/##/##",

            },
            {
                name: "toDate",
                searchType: "numberFormat",
                labelText: "تا تاریخ :",
                placeholder: moment().locale('fa').format('YYYY/MM/DD'),
                defaultValue: moment().locale('fa').format('YYYY/MM/DD'),
                format: "####/##/##",
            },
        ],
        tableColumns: [{
            Header: 'مشخصات خریدار',
            columns: [{
                Header: 'نام',
                accessor: 'firstName',
                // filterable: true,
                resizable: false,
            },
                {
                    Header: 'نام خانوادگی',
                    accessor: 'lastName',
                    // filterable: true,
                    resizable: false,

                },
                {
                    Header: 'شماره',
                    // filterable: true,
                    accessor: 'number',
                    resizable: false,

                },
                {
                    Header: 'ادرس',
                    accessor: 'address',
                    width: 320,
                    // filterable: true,
                    resizable: false,

                },
            ]
        },
            {
                Header: 'مشخصات کلی کالا',
                columns: [{
                    Header: 'تعداد کل کالا',
                    accessor: 'numberOfAllProduct',
                    // filterable: true,
                    resizable: false,

                },
                    // {
                    //     Header: 'وضعیت پرداخت',
                    //     accessor: 'paymentStatus',
                    //     filterable: true,
                    //                        resizable: false,
                    // },
                    {
                        Header: 'وضعیت درخواست',
                        accessor: 'requestStatus',
                        // filterable: true,
                        resizable: false,
                    },
                    {
                        Header: 'قیمت کل',
                        accessor: 'priceOfAll',
                        // filterable: true,
                        resizable: false,
                    },
                    {
                        Header: 'شناسه پرداخت',
                        // filterable: true,
                        accessor: 'paymentNumber',
                        resizable: false,

                    },

                    {
                        Cell: ({value}) => (
                            <Button
                                variant="contained"
                                style={{
                                    height: "25px",
                                    width: 60,
                                    boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
                                    background: "linear-gradient(60deg, #125a62, #125a62)"
                                }}
                                color="secondary"
                                onClick={() => {
                                    console.log(1)
                                }}>
                                تایید
                            </Button>
                        ),
                        resizable: false,
                        width: 95
                    },
                    {
                        Cell: ({value}) => (
                            <Button variant="contained"
                                    style={{
                                        height: "25px",
                                        width: 60,
                                        boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
                                        background: "linear-gradient(60deg, #125a62, #125a62)"
                                    }}
                                    color="secondary"
                                    onClick={() => {
                                        console.log(1)
                                    }}>
                                لغو
                            </Button>
                        ),
                        resizable: false,
                        width: 95
                    }

                ]
            }],
        tableColumnsInfo: [{
            Header: 'مشخصلات کالا های خریداری شده',
            columns: [
                {
                    Header: 'نام کالای خریداری شده',
                    // accessor: 'nameOfProduct'
                    accessor: 'firstName'

                },
                {
                    Header: 'تعداد کالا',
                    accessor: 'numberOfProduct'
                },
                {
                    Header: 'قیمت',
                    accessor: 'price'
                },
            ]
        }],

        dataTable: [
            {
                "firstName": "پویا",
                "lastName": "شمس",
                "address": "خیابان قزوین/خیابان بنکدار/ کوچه علیزاده/پلاک 5/ طبقه 2",
            },
            {
                "firstName": "quarter",
                "lastName": "driving",
            },
            {
                "firstName": "division",
                "lastName": "society",
            },
            {
                "firstName": "lamp",
                "lastName": "point",
            },
            {
                "firstName": "argument",
                "lastName": "insurance",
            },
            {
                "firstName": "lamp",
                "lastName": "point",
                "age": 2
            },
            {
                "firstName": "argument",
                "lastName": "insurance",
                "age": 13
            },
        ],

        dataTableInfo: [
            {
                "firstName": "judge",
                "lastName": "babies",
                "age": 16
            },
            {
                "firstName": "quarter",
                "lastName": "driving",
                "age": 17
            },
            {
                "firstName": "division",
                "lastName": "society",
                "age": 3
            },
            {
                "firstName": "lamp",
                "lastName": "point",
                "age": 2
            },
            {
                "firstName": "argument",
                "lastName": "insurance",
                "age": 13
            },
            {
                "firstName": "argument",
                "lastName": "insurance",
                "age": 13
            },
            {
                "firstName": "argument",
                "lastName": "insurance",
                "age": 13
            },
        ],
    }

    handleChangeSearch = search => {
        this.state.search = search
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardHeader plain color={"warning"}>
                            <h4 className={classes.cardTitleWhite}>بررسی فروش</h4>
                        </CardHeader>
                        <CardBody>
                            <SearchProduct
                                searchInfo={this.state.searchInfo}
                                handleChangeSearch={this.handleChangeSearch.bind(this)}
                            />
                            <TableWithAction
                                tableColumns={this.state.tableColumns}
                                tableColumnsInfo={this.state.tableColumnsInfo}
                                dataTable={this.state.dataTable}
                                dataTableInfo={this.state.dataTableInfo}
                                numberOfProduct={this.state.numberOfProduct}
                                treeTable={this.state.treeTable}
                                buttonList={this.state.buttonList}
                                Pagination={this.state.Pagination}
                            />
                        </CardBody>
                        {/*<CardFooter>*/}
                        {/*<GridContainer>*/}
                        {/*<GridItem xs={12} sm={12} md={12}>*/}
                        {/*<form>*/}
                        {/*<Button variant="contained" className={classes.customButtons}*/}
                        {/*color="secondary"*/}
                        {/*onClick={1}>*/}
                        {/*ذخیره*/}
                        {/*</Button>*/}
                        {/*<Button variant="contained" className={classes.customButtons}*/}
                        {/*color="secondary"*/}
                        {/*onClick={2}>*/}
                        {/*شروع مجدد*/}
                        {/*</Button>*/}
                        {/*</form>*/}
                        {/*</GridItem>*/}
                        {/*</GridContainer>*/}
                        {/*</CardFooter>*/}
                    </Card>
                </div>
            </MuiThemeProvider>

        )
    }
}

export default withStyles(styles)(Confirmation);