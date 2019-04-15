import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';


const theme = createMuiTheme({
    direction: 'rtl',
});


const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

class TableSaleInfo extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider >
                <Card
                    style={{
                        boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                    }}
                >
                    {this.props.dataOfSaleInfo != null ? (
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}> گزارش فروش</h4>
                                    <p className={classes.cardCategoryWhite}>
                                        روز گزارش :{this.props.reportDate}
                                    </p>
                                </CardHeader>

                                <GridItem xs={12} sm={12} md={12}>
                                    <CardBody>
                                        <Card
                                            style={{
                                                backgroundColor: "#eaeceb",
                                                boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",

                                            }}
                                        >
                                            <CardBody>
                                                <Table
                                                    tableHeaderColor="rose"
                                                    tableHead={["نام سرویس", "مبلغ", "اپراتور", "توضیحات", "کد پیگیری"]}
                                                    tableData={this.props.dataOfSaleInfo}
                                                />
                                            </CardBody>
                                        </Card>
                                        <Card
                                            style={{
                                                backgroundColor: "#e9ebea",
                                                boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                                            }}
                                        >
                                            <CardBody>
                                        <Table
                                            tableHeaderColor="rose"
                                            tableHead={["مجموع", "تعداد", "نام سرویس"]}
                                            tableData={this.props.summaryOfAllSaleInfo}
                                        />
                                            </CardBody>
                                        </Card>
                                    </CardBody>
                                </GridItem>
                            </GridItem>
                        </GridContainer>
                    ) : null}
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(TableSaleInfo);
