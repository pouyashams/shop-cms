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
import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import Muted from "components/Typography/Muted.jsx";
import axios from "axios";
registerPlugin(FilePondPluginImagePreview);

const theme = createMuiTheme({
    direction: 'rtl',
});

const styles = theme => ({
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
    inputStyle: {
        height: "30px",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        direction: 'rtl'
    },
    customInputStyle: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 415,
        direction: 'rtl'
    },
    mutedText: {
        color: "#777"
    },
});

class StuffManager extends React.Component {
    state = {
        name: '',
        price: '',
        description: '',
        files: [],
        text: '',
        alertStyle: 'info',
        tc: false,
    };
    onButtonClick() {
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
    sendInformation(){
        const data = {
            "stuffName": this.state.name,
            "stuffPrice": this.state.price,
            "stuffDescription": this.state.description,
            "stuffPicture": this.state.files,
        };
        axios.post(``,
            data)
            .then(res => {
                if (res.data.success) {
                    this.showNotification("tc","عملیات با موفقیت انجام شد!", "success")
                    this.setState({
                        name: '',
                        price: '',
                        description: '',
                        files: [],
                    });
                } else {
                    this.showNotification("tc","عملیات انجام نشد! ", "danger")
                }
            }).catch((error)=>{
            this.showNotification("tc","عملیات انجام نشد! ", "danger")
        });
    };
    handleChangeName = () => event => {
        var name = event.target.value;
        this.setState({name});
    };
    handleChangePrice = () => event => {
        var price = event.target.value;
        this.setState({price});
    };
    handleChangeDescription = () => event => {
        var description = event.target.value;
        this.setState({description});
    };

    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>تعریف کالا</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <form className={classes.container} noValidate autoComplete="off">
                                        <TextField
                                            placeholder="نام کالا"
                                            className={classes.inputStyle}
                                            value={this.state.name}
                                            onChange={this.handleChangeName()}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                        />

                                        <TextField
                                            placeholder="قیمت (تومان)"
                                            className={classes.inputStyle}
                                            value={this.state.price}
                                            onChange={this.handleChangePrice()}
                                            variant="outlined"
                                            margin="normal"

                                            required
                                        />
                                    </form>
                                    <form>
                                        <TextField
                                            placeholder="توضیحات"
                                            className={classes.customInputStyle}
                                            multiline
                                            value={this.state.description}
                                            onChange={this.handleChangeDescription()}
                                            variant="outlined"
                                            rows="5"
                                        />
                                    </form>
                                    <form>
                                        <header>
                                            <h7>
                                                <pre>           </pre>
                                            </h7>
                                            <Muted>عکس مورد نظر وارد کنید:</Muted>
                                        </header>
                                        <FilePond
                                            allowMultiple={true}
                                            acceptedFileTypes={'image/png'}
                                            accept={'image/png'}
                                            onupdatefiles={(fileItems) => {
                                                this.setState({
                                                    files: fileItems.map(fileItem => fileItem.file)
                                                });
                                            }}
                                        />
                                    </form>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button variant="contained" className={classes.customColor} color="secondary"
                                    onClick={this.onButtonClick.bind(this)}>
                                ذخیره کردن
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
            ;
    }
}


export default withStyles(styles)(StuffManager);