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
        height: "36px",
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 2,
        width: 120,
        direction: 'rtl'
    },
    customButtons: {
        height: "36px",
        width: 100,
        marginRight: theme.spacing.unit * 8,
        marginTop: theme.spacing.unit * 2,
        boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
        background: "linear-gradient(60deg, #125a62, #125a62)"

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
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 1,
        width: 160,
    },
    table: {
        minWidth: 250,
    },
})

class SearchProduct extends React.Component {
    state = {
        search: [],
        searchInfo: {
            name: "",
            value: "",
        },
        textField: '',
        numberTextField: '',
        numberFormat: '',
        select: '',
    }
    handelechangeWithValue = name => event => {
        this.state.searchInfo.name = name;
        this.state.searchInfo.value = event.target.value;
        if (this.state.search.length === 0) {
            this.state.search.push(this.state.searchInfo);
        }
        for (let i = 0; i < this.state.search.length; i++) {
            if (this.state.search[i].name !== this.state.searchInfo.name) {
                console.log(1)
                this.state.search.push(this.state.searchInfo);
            }
        }
    }
    handleChangeParentInfo = name => (selectedOption) => {
        console.log(name);
        console.log(selectedOption);
        this.state.searchInfo.name = name;
        this.state.searchInfo.value = selectedOption;

        if (this.state.search.length === 0) {
            this.state.search.push(this.state.searchInfo);
        }
        for (let i = 0; i < this.state.search.length; i++) {
            if (this.state.search[i].name !== this.state.searchInfo.name) {
                this.state.search.push(this.state.searchInfo);
            }
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <form>

                                {this.props.searchInfo.map(searchInfo => (
                                    searchInfo.searchType === "textField" ?
                                        < FormControlLabel
                                            control={
                                                <TextField
                                                    placeholder={searchInfo.placeholder}
                                                    className={classes.inputStyle}
                                                    p={console.log(searchInfo.name)}
                                                    onChange={this.handelechangeWithValue(searchInfo.name)}
                                                    defaultValue={searchInfo.defaultValue}
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                />
                                            }
                                            label={searchInfo.labelText}
                                            labelPlacement="start"
                                        /> : (
                                            searchInfo.searchType === "numberTextField" ?
                                                <FormControlLabel
                                                    control={
                                                        <TextField
                                                            placeholder={searchInfo.placeholder}
                                                            type="number"
                                                            InputProps={{inputProps: {min: 0, max: 1000000}}}
                                                            className={classes.inputStyle}
                                                            onChange={this.handelechangeWithValue(searchInfo.name)}
                                                            defaultValue={searchInfo.defaultValue}
                                                            variant="outlined"
                                                            margin="normal"
                                                            required
                                                        />
                                                    }
                                                    label={searchInfo.labelText}
                                                    labelPlacement="start"
                                                /> : (
                                                    searchInfo.searchType === "numberFormat" ?
                                                        <FormControlLabel
                                                            control={
                                                                <NumberFormat
                                                                    customInput={TextField}
                                                                    value={searchInfo.defaultValue}
                                                                    className={classes.inputStyle}
                                                                    format={searchInfo.format}
                                                                    placeholder={searchInfo.placeholder}
                                                                    onChange={this.handelechangeWithValue(searchInfo.name)}
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    required
                                                                />

                                                            }
                                                            label={"از تاریخ : "}
                                                            labelPlacement="start"
                                                        /> : (
                                                            searchInfo.searchType === "select" ?
                                                                <FormControlLabel
                                                                    control={
                                                                        <Select
                                                                            className={classes.inputSelectionSup}
                                                                            isDisabled={false}
                                                                            isLoading={false}
                                                                            isClearable={true}
                                                                            isRtl={true}
                                                                            isSearchable={true}
                                                                            value={searchInfo.defaultValue}
                                                                            // options={searchInfo.selectOption}
                                                                            onChange={this.handleChangeParentInfo(searchInfo.name)}
                                                                            placeholder={searchInfo.placeholder}
                                                                        />
                                                                    }
                                                                    label={searchInfo.labelText}
                                                                    labelPlacement="start"
                                                                /> : null
                                                        )
                                                )
                                        )
                                ))}
                                {console.log(this.props.searchInfo)}
                            </form>
                            <Button variant="contained" className={classes.customButtons}
                                    color="secondary"
                                    onClick={this.props.handleChangeSearch(this.state.search)}>
                                جستجو
                            </Button>
                            <br/>
                            <br/>
                        </GridItem>
                    </GridContainer>
                </div>
            </MuiThemeProvider>
        )

    }
}

export default withStyles(styles)(SearchProduct);