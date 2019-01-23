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
import TableWithAction from "../../components/Table/TableWithAction";
import Muted from "components/Typography/Muted.jsx";
import ReactDOM from "react-dom";

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
    cardTitleBlack: {
        color: "#000000",
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
    customButtons: {
        height: "25px",
        width: 60,
        boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
        background: "linear-gradient(60deg, #125a62, #125a62)"
    },
})


class Success extends React.Component {

    state = {
        showNotification: true,
        color: 'warning',
        text: '',
        alertStyle: 'info',
        tc: false,
        Pagination: false,
        treeTable: false,
        tableColumns: [{
            Header: 'مشخصات کالا های اضافه شده',
            columns: [{
                Header: 'نام کالا',
                accessor: 'nameOfProduct',
                // filterable: true,
            },
                {
                    Header: 'شناسه کالا',
                    accessor: 'code',
                    // filterable: true,
                },
                {
                    Header: 'تعداد کالا',
                    // filterable: true,
                    accessor: 'numberOfProduct',
                },
                {
                    Header: 'فروشنده محصول',
                    accessor: 'productItemSupplier',
                    // filterable: true,
                },
                {
                    Header: 'قیمت کالا',
                    accessor: 'price',
                    // filterable: true,
                },

            ]
        },],
        dataTable: [
            {
                "nameOfProduct": this.props.name,
                "code": this.props.productItemInfoList[0].code,
                "numberOfProduct": this.props.productItemInfoList[0].numberOfProduct,
                "productItemSupplier": this.props.productItemInfoList[0].productItemSupplier.label,
                "price": this.props.productItemInfoList[0].price,
            },
        ],
    }

    refreshPage() {
        window.location.reload();
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this).scrollIntoView(0);
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardHeader plain color={"warning"}>
                            <h4 className={classes.cardTitleWhite}>نمایش کالا ها</h4>
                        </CardHeader>
                        <CardBody>
                            <TableWithAction
                                tableColumns={this.state.tableColumns}
                                dataTable={this.state.dataTable}
                                treeTable={this.state.treeTable}
                                buttonList={null}
                                Pagination={this.state.Pagination}
                            />
                        </CardBody>
                        <CardFooter>
                            <div>

                                <Button
                                    variant="contained"
                                    style={{
                                        marginRight: theme.spacing.unit * 2,
                                        height: "25px",
                                        width: 100,
                                        boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
                                        background: "linear-gradient(60deg, #125a62, #125a62)"
                                    }}
                                    color="secondary"
                                    onClick={() => {
                                        this.refreshPage()
                                    }}>
                                    شروع مجدد
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </MuiThemeProvider>

        )
    }
}

export default withStyles(styles)(Success);