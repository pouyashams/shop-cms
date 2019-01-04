import ReactTable from "react-table";
import 'react-table/react-table.css'
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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
    customButtons: {
        height: "25px",
        width: 60,
        // marginRight: theme.spacing.unit * 4,
        // marginBottom: theme.spacing.unit * 4,
        // margin: "0px -550px 0px 0px;",
        boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
        background: "linear-gradient(60deg, #125a62, #125a62)"

    },
})

class TableWithAction extends React.Component {
    render() {
        const {classes} = this.props;
        const columns = this.props.tableColumns;
        const sub_columns = this.props.tableColumnsInfo;
        console.log(this.props.buttonList)
        this.props.buttonList !== null ?
            this.props.buttonList.map(buttonList => (
                columns.push({
                    Cell: ({value}) => (buttonList)
                })
            )) : null
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    {this.props.treeTable === true ?
                        <ReactTable
                            data={this.props.dataTable}
                            ofText='از'
                            pageText='صفحه'
                            rowsText='ردیف'
                            previousText='قبلی'
                            nextText='بعدی'
                            defaultPageSize={5}
                            columns={columns}
                            showPagination={this.props.Pagination}
                            SubComponent={(row) => {
                                return (
                                    <div>
                                        <ReactTable
                                            data={this.props.dataTableInfo}
                                            columns={sub_columns}
                                            showPagination={false}
                                            pageSize={this.props.numberOfProduct}
                                        />
                                    </div>
                                )
                            }}
                        /> : <ReactTable
                            resizable={false}
                            data={this.props.dataTable}
                            ofText='از'
                            pageText='صفحه'
                            rowsText='ردیف'
                            previousText='قبلی'
                            nextText='بعدی'
                            defaultPageSize={5}
                            columns={columns}
                            showPagination={this.props.Pagination}
                        />
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(TableWithAction);