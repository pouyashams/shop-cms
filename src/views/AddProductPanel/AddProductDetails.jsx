import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Muted from "components/Typography/Muted.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CardHeader from "components/Card/CardHeader.jsx";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardFooter from "components/Card/CardFooter.jsx";
import Button from '@material-ui/core/Button';
import {FilePond, File, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import NumberFormat from 'react-number-format';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateSize,FilePondPluginFileValidateType);

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
    inputStyleN: {
        height: "31px",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,

        width: 120,
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
    customButtons: {
        height: "36px",
        width: 100,
        marginRight: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
        // margin: "0px -550px 0px 0px;",
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
})

class AddProductDetails extends React.Component {

    handleChangeSupplier = (selectedOption) => {
        this.setState({selectedOption});
        var productItemSupplierId = selectedOption !== null ? selectedOption.value : null;
        var productItemSupplierLabel = selectedOption !== null ? selectedOption.label : null;

        var productItemSupplier = {
            identifier: productItemSupplierId,
            label:productItemSupplierLabel
        };
        this.props.productItemInfo.productItemSupplier = productItemSupplier;
    }

    handleChangePrice = input => event => {
        this.props.productItemInfo.price = event.target.value;
    }

    handleChangeCode = input => event => {
        this.props.productItemInfo.code = event.target.value;
    }
    handleChangeNumberOfProduct = input => event => {
        this.props.productItemInfo.numberOfProduct = event.target.value;
    }

    handleChangeSelection = (selectedOption) => {
        this.setState({selectedOption});
        var value = selectedOption !== null ? selectedOption.value : null;
        if (value !== null) {
            var values = value.split('#');
            var info = {
                productAttributeCategory: {
                    identifier: values[1]
                },
                productAttribute: {
                    identifier: values[0]
                }
            };
            this.props.productItemInfo.productAttributeItemList.push(info);
        }
    }

    handleChangeDescription = input => event => {
        console.log(this.props.productItemInfo);
        this.props.productItemInfo.description = event.target.value;
    }

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handleImage = (fileItems) => {
        var productItemImageBase64List = [];
        fileItems.productItemImageList.forEach(function (fileItem) {
            const image2base64 = require('image-to-base64');
            image2base64(fileItem) // you can also to use url
                .then(
                    (response) => {
                        console.log("1")
                        console.log(response)
                        productItemImageBase64List.push(response);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )
            //     var base64Img = require('base64-img');
            //     var data12 = base64Img.base64Sync(productItemImage);
            //     productItemImageBase64List.push(data12);

            // var fs = require('fs');
            //
            // var bitmap = fs.readFileSync(productItemImage);
            // convert binary data to base64 encoded string
            // productItemImageBase64List.push(new Buffer(bitmap).toString('base64'));

        });
        this.props.productItemInfo.productItemImageBase64List = productItemImageBase64List;

    }

    render() {
        const {productItemInfo} = this.props;
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardBody>
                            <Card>
                                <CardHeader plain color={this.props.color}>
                                    <h4 className={classes.cardTitleWhite}>تعریف مشخصات کالا</h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <form>
                                                <form className={classes.container} noValidate autoComplete="off">
                                                    <FormControlLabel
                                                        control={
                                                            <NumberFormat
                                                                // thousandSeparator={true}
                                                                customInput={TextField}
                                                                className={classes.inputStyle}                                                                value={productItemInfo.price}
                                                                placeholder="---------------------"
                                                                onChange={this.handleChangePrice()}
                                                                // format="###,###,###"
                                                                defaultValue=''
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                            />
                                                        }
                                                        label={"قیمت (تومان): "}
                                                        labelPlacement="start"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <TextField
                                                                placeholder="---------------------"
                                                                InputProps={{inputProps: {min: 0, max: 1000000}}}
                                                                className={classes.inputStyle}
                                                                onChange={this.handleChangeCode()}
                                                                defaultValue={productItemInfo.code}
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                            />
                                                        }
                                                        label={"شناسه ی کالا: "}
                                                        labelPlacement="start"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <TextField
                                                                placeholder="---------------------"
                                                                className={classes.inputStyle}
                                                                type="number"
                                                                InputProps={{inputProps: {min: 0, max: 1000000}}}
                                                                onChange={this.handleChangeNumberOfProduct()}
                                                                defaultValue={productItemInfo.numberOfProduct}
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                            />
                                                        }
                                                        label={"تعداد کالا: "}
                                                        labelPlacement="start"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Select
                                                                className={classes.inputSelectionSup}
                                                                isDisabled={false}
                                                                isLoading={false}
                                                                isClearable={true}
                                                                isRtl={true}
                                                                isSearchable={true}
                                                                options={this.props.productItemSupplierList}
                                                                onChange={this.handleChangeSupplier}
                                                                placeholder="-------------------------"
                                                            />
                                                        }
                                                        label={"فروشنده محصول: "}
                                                        labelPlacement="start"
                                                    />

                                                </form>
                                                <form className={classes.container} noValidate autoComplete="off">
                                                    <TextField
                                                        placeholder="توضیحات"
                                                        className={classes.customInputStyle}
                                                        onChange={this.handleChangeDescription()}
                                                        defaultValue={productItemInfo.description}
                                                        multiline
                                                        variant="outlined"
                                                        rows="11"
                                                    />
                                                </form>
                                            </form>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <form>
                                                <header>
                                                    <h7>
                                                        <pre>           </pre>
                                                    </h7>
                                                    <Muted>عکس مورد نظر وارد کنید:</Muted>
                                                </header>
                                                <FilePond
                                                    allowMultiple={true}
                                                    maxFileSize='2MB'
                                                    acceptedFileTypes={['image/png', 'image/jpeg']}
                                                    onupdatefiles={(fileItems) => {
                                                        var productItemImageBase64List = [];
                                                        fileItems.forEach(function (fileItem) {
                                                            const reader = new FileReader();
                                                            reader.readAsDataURL(fileItem.file);
                                                            reader.onload = () => {
                                                                productItemImageBase64List.push(reader.result.substr(22));
                                                            }
                                                            console.log("15")
                                                            console.log(productItemImageBase64List);
                                                        });
                                                        this.props.productItemInfo.productItemImageBase64List = productItemImageBase64List;
                                                        productItemInfo.productItemImageList = fileItems.map(fileItem => fileItem.file)
                                                    }}
                                                >
                                                    {productItemInfo.productItemImageList.map(file => (
                                                        <File key={file} src={file} origin="local"/>
                                                    ))}
                                                </FilePond>
                                            </form>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader plain color={this.props.color}>
                                    <h4 className={classes.cardTitleWhite}>تعریف ویژگی های کالا</h4>
                                </CardHeader>
                                <CardBody>
                                    <Table className={classes.table}>
                                        <TableBody>
                                            {this.props.productItemAttributeInfoList.map((attribute, index) => (
                                                    <TableRow key={attribute.item1.identifier}>
                                                        <TableCell component="th" scope="row">
                                                            {attribute.item1.categoryName}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Select
                                                                className={classes.inputSelection}
                                                                isDisabled={false}
                                                                isLoading={false}
                                                                isClearable={true}
                                                                isRtl={true}
                                                                isSearchable={true}
                                                                name="color"
                                                                options={attribute.item1.productAttributeInfoList}
                                                                onChange={this.handleChangeSelection}
                                                                placeholder="انتخاب کنید..."
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {attribute.item2.categoryName}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Select
                                                                className={classes.inputSelection}
                                                                isDisabled={false}
                                                                isLoading={false}
                                                                isClearable={true}
                                                                isRtl={true}
                                                                isSearchable={true}
                                                                name="color"
                                                                options={attribute.item2.productAttributeInfoList}
                                                                onChange={this.handleChangeSelection}
                                                                placeholder="انتخاب کنید .."
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                            {this.props.lastProductItemAttributeInfo !== null
                                                ?
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        {this.props.lastProductItemAttributeInfo.categoryName}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Select
                                                            className={classes.inputSelection}
                                                            isDisabled={false}
                                                            isLoading={false}
                                                            isClearable={true}
                                                            isRtl={true}
                                                            isSearchable={true}
                                                            name="color"
                                                            options={this.props.lastProductItemAttributeInfo.productAttributeInfoList}
                                                            onChange={this.handleChangeSelection}
                                                            placeholder="انتخاب کنید .."
                                                        />
                                                    </TableCell>
                                                    <TableCell/>
                                                    <TableCell/>
                                                </TableRow>
                                                : null
                                            }
                                        </TableBody>
                                    </Table>
                                </CardBody>
                            </Card>


                            {/*<GridContainer >*/}
                            {/*{this.props.productItemAttributeInfoList.map(attribute => (*/}
                            {/*<GridItem xs={12} sm={12} md={4}>*/}
                            {/*<FormGroup row className={classes.FormControlLabel}>*/}
                            {/*<FormControlLabel className={classes.FormControlLabel}*/}
                            {/*control={*/}
                            {/*<Select*/}
                            {/*className={classes.inputSelection}*/}
                            {/*isDisabled={false}*/}
                            {/*isLoading={false}*/}
                            {/*isClearable={true}*/}
                            {/*isRtl={true}*/}
                            {/*isSearchable={true}*/}
                            {/*name="color"*/}
                            {/*options={attribute.productAttributeInfoList}*/}
                            {/*onChange={this.handleChangeSelection}*/}
                            {/*placeholder="انتخاب کنید .."*/}
                            {/*/>*/}
                            {/*}*/}
                            {/*label={attribute.categoryName + ' :'}*/}
                            {/*labelPlacement="start"*/}
                            {/*/>*/}
                            {/*</FormGroup>*/}
                            {/*</GridItem>*/}
                            {/*))}*/}
                            {/*</GridContainer>*/}
                        </CardBody>
                        {/*<CardFooter>*/}
                        {/*<GridContainer>*/}
                        {/*<GridItem xs={12} sm={12} md={12}>*/}
                        {/*<form>*/}
                        {/*<Button variant="contained" className={classes.customButtons}*/}
                        {/*color="secondary"*/}
                        {/*onClick={console.log(1)}>*/}
                        {/*ذخیره*/}
                        {/*</Button>*/}
                        {/*<Button variant="contained" className={classes.customButtons}*/}
                        {/*color="secondary"*/}
                        {/*onClick={console.log(2)}>*/}
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

export default withStyles(styles)(AddProductDetails);