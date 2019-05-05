import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import {Input} from 'antd';
import 'antd/dist/antd.css';
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
        direction: 'rtl',
    },

    inputStyleNUmber: {
        height: "31px",
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,

        width: 120,
        direction: 'rtl'
    },
    inputStyle: {
        height: "38px",
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 20,
        marginBottom: theme.spacing.unit * 2,
        width: 150,
        direction: 'rtl'
    },
    customButtons: {
        height: "36px",
        width: 100,
        marginRight: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 2,
        background: "rgb(92,184,92)",
        color: "#fff",
        "&:hover": {
            background: "rgb(70, 142, 70)",
        },

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
    dateSelection: {
        height: "36px",
        width: 100,
    },
    inputSelectionSup: {
        height: "38px",
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 14,
        marginBottom: theme.spacing.unit * 2,
        width: 150,
    },
    table: {
        minWidth: 250,
    },
})

class SearchProduct extends React.Component {
    state = {
        search: [],
        textField: '',
        numberTextField: '',
        numberFormat: '',
        select: '',
    }
    handler = search => event => {
        // console.log(this.state.search)
        this.props.handleChangeSearch(this.state.search);
    }

    handelechangeWithValue = name => event => {
        // this.state.searchInfo.name = name;
        // this.state.searchInfo.value = event.target.value;
        var searchInfo = {
            name: name,
            value: event.target.value
        };
        // console.log(this.state.search.length)
        // console.log(55)
        var found = false;
        for (var i = 0; i < this.state.search.length; i++) {
            if (this.state.search[i].name === searchInfo.name) {
                this.state.search[i].value = searchInfo.value;
                found = true;
                break;
            }
        }

        if (!found) {
            this.state.search.push(searchInfo);
            console.log(this.state.search)
        }
    }
    handleChangeParentInfo = name => (selectedOption) => {
        console.log(selectedOption)
        if (selectedOption !== null) {
            var searchInfo = {
                name: name,
                value: selectedOption.value

            };

            var found = false;
            for (var i = 0; i < this.state.search.length; i++) {
                if (this.state.search[i].name === searchInfo.name) {
                    this.state.search[i].value = searchInfo.value;
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.state.search.push(searchInfo);
                console.log(12321)
                console.log(this.state.search)
            }
        } else {
            for (var i = 0; i < this.state.search.length; i++) {
                if (this.state.search[i].name === name) {
                    this.state.search.splice(i, 1);
                    break;
                }
            }
        }
        // this.state.searchInfo.name = name;
        // this.state.searchInfo.value = selectedOption;
    }

    componentDidMount() {
        if (this.props.search !== null) {
            this.state.search = this.props.search;
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <GridContainer>
                        <card
                        >
                            <CardBody
                                style={{
                                    backgroundColor: "rgb(242, 244, 249)",
                                    boxShadow: "rgba(22, 22, 23, 0.12) 0px 12px 20px -10px, rgba(12, 12, 12, 0.21) 0px 4px 20px 0px, rgba(0, 0, 0, 0) 0px 7px 8px -5px",
                                    marginBottom: theme.spacing.unit * 6
                                }}
                            >
                                <GridItem xs={12} sm={12} md={12}>
                                    <form>
                                        {this.props.searchInfo.map(searchInfo => (
                                            searchInfo.searchType === "textField" ?
                                                <FormControl
                                                    component="fieldset">
                                                    < FormControlLabel

                                                        control={
                                                            <div
                                                                style={{
                                                                    marginRight: theme.spacing.unit * -5,
                                                                }}
                                                            >
                                                                <FormLabel
                                                                    style={{
                                                                        marginRight: theme.spacing.unit * 2,
                                                                    }}
                                                                    component="legend">{searchInfo.labelText}</FormLabel>
                                                                <Input
                                                                    placeholder={searchInfo.placeholder}
                                                                    className={classes.inputStyle}
                                                                    onChange={this.handelechangeWithValue(searchInfo.name)}
                                                                    defaultValue={searchInfo.defaultValue}
                                                                />
                                                            </div>
                                                        }
                                                    />
                                                </FormControl>
                                                : (
                                                    searchInfo.searchType === "numberTextField" ?
                                                        <FormControl component="fieldset">
                                                            <FormControlLabel
                                                                style={{
                                                                    marginTop: theme.spacing.unit * 2,
                                                                }}
                                                                control={<div
                                                                    style={{
                                                                        marginRight: theme.spacing.unit * -5,
                                                                    }}
                                                                >
                                                                    <FormLabel
                                                                        style={{
                                                                            marginRight: theme.spacing.unit * 2,
                                                                        }}
                                                                        component="legend">{searchInfo.labelText}</FormLabel>
                                                                    <Input
                                                                        placeholder={searchInfo.placeholder}
                                                                        className={classes.inputStyle}
                                                                        onChange={this.handelechangeWithValue(searchInfo.name)}
                                                                        defaultValue={searchInfo.defaultValue}
                                                                        type="number"
                                                                    />
                                                                </div>

                                                                }
                                                            />
                                                        </FormControl>
                                                        : (
                                                            searchInfo.searchType === "numberFormat" ?
                                                                <FormControl component="fieldset">
                                                                    <FormControlLabel
                                                                        control={
                                                                            <div
                                                                                style={{
                                                                                    marginRight: theme.spacing.unit * -5,
                                                                                }}
                                                                            >
                                                                                <FormLabel
                                                                                    style={{
                                                                                        marginRight: theme.spacing.unit * 2,
                                                                                    }}
                                                                                    component="legend">{searchInfo.labelText}</FormLabel>
                                                                                <NumberFormat
                                                                                    customInput={Input}
                                                                                    value={searchInfo.defaultValue}
                                                                                    className={classes.inputStyle}
                                                                                    format={searchInfo.format}
                                                                                    placeholder={searchInfo.placeholder}
                                                                                    onChange={this.handelechangeWithValue(searchInfo.name)}
                                                                                    variant="outlined"
                                                                                    margin="normal"
                                                                                    required
                                                                                />
                                                                            </div>
                                                                        }
                                                                    />
                                                                </FormControl>
                                                                : (
                                                                    searchInfo.searchType === "select" ?
                                                                        <FormControl component="fieldset">
                                                                            <FormControlLabel

                                                                                control={
                                                                                    <div
                                                                                        style={{
                                                                                            marginRight: theme.spacing.unit * -5,
                                                                                        }}
                                                                                    >
                                                                                        <FormLabel
                                                                                            style={{
                                                                                                marginRight: theme.spacing.unit * 2,
                                                                                                marginBottom: "24px",
                                                                                            }}
                                                                                            component="legend">{searchInfo.labelText}</FormLabel>
                                                                                        <Select
                                                                                            className={classes.inputSelectionSup}
                                                                                            isDisabled={false}
                                                                                            isLoading={false}
                                                                                            isClearable={true}
                                                                                            isRtl={true}
                                                                                            isSearchable={true}
                                                                                            options={searchInfo.selectOption}
                                                                                            onChange={this.handleChangeParentInfo(searchInfo.name)}
                                                                                            placeholder={searchInfo.placeholder}
                                                                                        />
                                                                                    </div>

                                                                                }
                                                                            />
                                                                        </FormControl> : null
                                                                )
                                                        )
                                                )
                                        ))}
                                        {/*{console.log(this.state.search)}*/}

                                    </form>
                                </GridItem>
                                <Button variant="contained" className={classes.customButtons} color="secondary"
                                        onClick={this.handler(this.state.search)}>
                                    جستجو
                                </Button>
                            </CardBody>
                        </card>


                    </GridContainer>
                </div>
            </MuiThemeProvider>
        )

    }
}

export default withStyles(styles)(SearchProduct);