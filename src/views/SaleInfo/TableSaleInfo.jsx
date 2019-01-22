import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from "axios";
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
                <Card plain>
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
                                                backgroundColor: "#f6f8f7",
                                            }}
                                        >
                                            <CardBody>
                                                <Table
                                                    tableHeaderColor="primary"
                                                    tableHead={["نام سرویس", "مبلغ", "اپراتور", "توضیحات", "کد پیگیری"]}
                                                    tableData={this.props.dataOfSaleInfo}
                                                />
                                            </CardBody>
                                        </Card>
                                        <Card
                                            style={{
                                                backgroundColor: "#f6f8f7",
                                                
                                            }}
                                        >
                                            <CardBody>
                                        <Table
                                            tableHeaderColor="primary"
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
