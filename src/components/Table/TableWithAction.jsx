import ReactTable from "react-table";
import 'react-table/react-table.css'
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { render } from "react-dom";
import "./index.css";




const theme = createMuiTheme({
    direction: 'rtl',
});
const styles = theme => ({
    root: {
        display: 'flex',
    }, root: {
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
    constructor() {
        super();
        this._tBodyComponent = null;
    }
    handleScroll(event) {
        let headers = document.getElementsByClassName("rt-thead");
        for (let i = 0; i < headers.length; i++) {
            headers[i].scrollLeft = event.target.scrollLeft;
        }
    }
    componentDidMount() {
        this._tBodyComponent = document.getElementsByClassName("rt-tbody")[0];
        this._tBodyComponent.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        this._tBodyComponent.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        const TbodyComponent = props => {
            for (let i = 0; i < props.children[0].length; i++) {
                props.children[0][i] = React.cloneElement(props.children[0][i],{ minWidth: props.style.minWidth })
            }
            return <div className="rt-tbody">{props.children}</div>
        }

        const TrGroupComponent = props => {
            return <div className="rt-tr-group" role="rowgroup" style={{ minWidth: props.minWidth }}>{props.children}</div>
        }
        const {classes} = this.props;
        const columns = this.props.tableColumns;
        const sub_columns = this.props.tableColumnsInfo;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    {this.props.treeTable === true ?
                        <ReactTable
                            noDataText="اطلاعاتی وجود ندارد"
                            style={{
                                // backgroundColor: "#b9c9fe",
                                boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                                textAlign: "center"
                            }}
                            data={this.props.dataTable}
                            resizable={false}
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
                                            style={{
                                                // backgroundColor: "#b9c9fe",
                                                textAlign: "center",
                                                // backgroundColor: "#7a7a7a",

                                            }}
                                            noDataText="اطلاعاتی وجود ندارد"
                                            data={this.props.dataTableInfo}
                                            columns={sub_columns}
                                            showPagination={false}
                                            pageSize={this.props.numberOfProduct}
                                        />
                                    </div>
                                )
                            }}
                            className="-striped -highlight"
                            TbodyComponent={TbodyComponent}
                            TrGroupComponent={TrGroupComponent}
                        />
                        : <ReactTable
                            style={{
                                // backgroundColor: "#b9c9fe",
                                boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                                textAlign: "center"
                            }}
                            noDataText="اطلاعاتی وجود ندارد"
                            // resizable={false}
                            data={this.props.dataTable}
                            ofText='از'
                            pageText='صفحه'
                            rowsText='ردیف'
                            previousText='قبلی'
                            nextText='بعدی'
                            defaultPageSize={5}
                            columns={columns}
                            showPagination={this.props.Pagination}
                            // className="-striped -highlight"
                        />
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(TableWithAction);