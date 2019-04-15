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
import NumberFormat from 'react-number-format';
import {Input, Upload, Icon, Modal, LocaleProvider} from 'antd';
import 'antd/dist/antd.css';
import faIR from 'antd/lib/locale-provider/fa_IR';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

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
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        width: 650,
        direction: 'rtl'
    },
    inputStyleN: {
        height: "38px",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        // marginBottom: theme.spacing.unit * 2,
        width: 150,
        direction: 'rtl'
    },
    inputStyle: {
        height: "38px",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 2,
        width: 150,
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
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }

    pushImage() {

        const {productItemInfo} = this.props;
        const productItemImageList = [];
        if (this.state.fileList.length !== 0) {
            for (let i = 0; i < this.state.fileList.length; i++) {
                const base64 = this.state.fileList[i].thumbUrl
                if (base64 !== undefined) {
                    productItemImageList.push(base64.substr(23))
                }
            }

        }
        productItemInfo.productItemImageBase64List = productItemImageList
        console.log(productItemInfo.productItemImageBase64List)
    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => this.setState({fileList})


    handleChangeSupplier = (selectedOption) => {
        this.setState({selectedOption});
        var productItemSupplierId = selectedOption !== null ? selectedOption.value : null;
        var productItemSupplierLabel = selectedOption !== null ? selectedOption.label : null;

        var productItemSupplier = {
            identifier: productItemSupplierId,
            label: productItemSupplierLabel
        };
        this.props.productItemInfo.productItemSupplier = productItemSupplier;
    }
    handleChangeTaxation= input => event => {
        this.props.productItemInfo.taxation = event.target.value.substr(1);
    }
    handleChangePrice = input => event => {
        this.props.productItemInfo.price = event.target.value.replace(/,/g, '');
    }
    handleChangeengNameEng = input => event => {
        this.props.productItemInfo.englishName = event.target.value;
    }
    handleChangeengName = input => event => {
        this.props.productItemInfo.name = event.target.value;
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
    deleteRow = () => {
        console.log(1111111)
        console.log(this.props.productItemInfo.index)
        this.props.getIndex(this.props.productItemInfo.index);
        // this.setState({
        //     previewImage: file.url || file.thumbUrl,
        //     previewVisible: true,
        // });
    }


    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        // console.log(this.props.fileList)
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <h4>آپلود عکس</h4>
            </div>
        );
        const {productItemInfo} = this.props;
        const {classes} = this.props;
        const {TextArea} = Input;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardBody>
                            <Card
                                style={{
                                    backgroundColor: "#f6f8f7",
                                }}
                            >
                                <CardHeader plain color={this.props.productItemInfo.color}>
                                    <h4 className={classes.cardTitleWhite}>تعریف مشخصات کالا</h4>
                                    {this.props.productItemInfo.index !== 1 ?
                                        <div onClick={this.deleteRow}
                                             style={{
                                                 float: 'left',
                                                 marginTop: theme.spacing.unit * -4,
                                             }}
                                        >
                                            <IconButton aria-label="Delete">
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                        </div>
                                        : null}
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <form>
                                                <form>

                                                    <form>
                                                        <FormControlLabel
                                                            style={{
                                                                marginTop: theme.spacing.unit * 2,
                                                            }}
                                                            control={
                                                                <Input
                                                                    className={classes.inputStyleN}
                                                                    placeholder="-------------------------"
                                                                    onChange={this.handleChangeengName()}
                                                                    defaultValue={productItemInfo.name}
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    required
                                                                />
                                                            }
                                                            label={"نام کالا: "}
                                                            labelPlacement="start"
                                                        />
                                                        <FormControlLabel
                                                            style={{
                                                                marginTop: theme.spacing.unit * 2,
                                                            }}
                                                            control={
                                                                <Input
                                                                    className={classes.inputStyleN}
                                                                    placeholder="(انگلیسی)"
                                                                    onChange={this.handleChangeengNameEng()}
                                                                    defaultValue={productItemInfo.englishName}
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    required
                                                                />
                                                            }
                                                            label={"نام کالا : "}
                                                            labelPlacement="start"
                                                        />
                                                        <FormControlLabel
                                                            style={{
                                                                marginTop: theme.spacing.unit * 2,
                                                            }}
                                                            control={
                                                                <Input
                                                                    placeholder="-------------------------------"
                                                                    className={classes.inputStyleN}
                                                                    onChange={this.handleChangeCode()}
                                                                    defaultValue={productItemInfo.code}
                                                                />
                                                            }
                                                            label={"شناسه کالا: "}
                                                            labelPlacement="start"
                                                        />
                                                        <FormControlLabel
                                                            style={{
                                                                marginTop: theme.spacing.unit * 2,
                                                            }}
                                                            control={
                                                                <Select
                                                                    className={classes.inputSelectionSup}
                                                                    isDisabled={false}
                                                                    isLoading={false}
                                                                    isClearable={true}
                                                                    isRtl={true}
                                                                    isSearchable={true}
                                                                    options={this.props.productItemSupplierList}
                                                                    value={this.props.productItemInfo.productItemSupplier}
                                                                    defaultValue={this.props.productItemInfo.productItemSupplier}
                                                                    onChange={this.handleChangeSupplier}
                                                                    placeholder="----------------------"
                                                                />
                                                            }
                                                            label={"فروشنده محصول: "}
                                                            labelPlacement="start"
                                                        />

                                                    </form>

                                                    <form
                                                        style={{
                                                            marginRight: theme.spacing.unit * 1,
                                                        }}
                                                    >
                                                        <FormControlLabel
                                                            style={{
                                                                marginTop: theme.spacing.unit * 2,
                                                            }}
                                                            control={
                                                                <NumberFormat
                                                                    thousandSeparator={true}
                                                                    customInput={Input}
                                                                    className={classes.inputStyleN}
                                                                    value={productItemInfo.price}
                                                                    placeholder="(ریال)"
                                                                    onChange={this.handleChangePrice()}
                                                                    // format="###,###,###"
                                                                    defaultValue=''
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    required
                                                                />
                                                            }
                                                            label={"قیمت : "}
                                                            labelPlacement="start"
                                                        />
                                                        <FormControlLabel
                                                            style={{
                                                                marginTop: theme.spacing.unit * 2,
                                                            }}
                                                            control={
                                                                <NumberFormat
                                                                    prefix="%"
                                                                    // thousandSeparator={true}
                                                                    customInput={Input}
                                                                    className={classes.inputStyleN}
                                                                    value={productItemInfo.taxation}
                                                                    placeholder="---------------------------"
                                                                    onChange={this.handleChangeTaxation()}
                                                                    // format="###,###,###"
                                                                    defaultValue=''
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    required
                                                                />
                                                            }
                                                            label={"مالیات : "}
                                                            labelPlacement="start"
                                                        />
                                                        <FormControlLabel
                                                            style={{
                                                                marginTop: theme.spacing.unit * 2,
                                                            }}
                                                            control={
                                                                <Input
                                                                    placeholder="-------------------------------"
                                                                    type="number"
                                                                    className={classes.inputStyleN}
                                                                    onChange={this.handleChangeNumberOfProduct()}
                                                                    defaultValue={productItemInfo.numberOfProduct}
                                                                />
                                                            }
                                                            label={"تعداد کالا : "}
                                                            labelPlacement="start"
                                                        />
                                                    </form>


                                                </form>
                                                <form>
                                                    <TextArea
                                                        rows={11}
                                                        defaultValue={productItemInfo.description}
                                                        onChange={this.handleChangeDescription()}
                                                        className={classes.customInputStyle}
                                                        placeholder="توضیحات"

                                                    />


                                                </form>
                                            </form>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <form>
                                                <header
                                                    style={{
                                                        marginTop: theme.spacing.unit * 2,
                                                        marginBottom: theme.spacing.unit * 2,
                                                    }}
                                                >
                                                    <Muted>عکس مورد نظر وارد کنید:</Muted>
                                                </header>
                                                <LocaleProvider locale={faIR}>
                                                    <div className="clearfix">
                                                        <Upload
                                                            accept={".jpg"}
                                                            action="//jsonplaceholder.typicode.com/posts/"
                                                            listType="picture-card"
                                                            fileList={fileList}
                                                            onPreview={this.handlePreview}
                                                            onChange={this.handleChange}
                                                        >
                                                            {fileList.length >= 10 ? null : uploadButton}
                                                        </Upload>
                                                        <Modal visible={previewVisible} footer={null}
                                                               onCancel={this.handleCancel}>
                                                            <img alt="example" style={{width: '100%'}}
                                                                 src={previewImage}/>
                                                        </Modal>
                                                    </div>
                                                </LocaleProvider>

                                                {this.pushImage()}
                                            </form>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                            <Card
                                style={{
                                    backgroundColor: "#f6f8f7",
                                }}
                            >
                                <CardHeader plain color={this.props.productItemInfo.color}>
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
                        </CardBody>
                    </Card>
                </div>
            </MuiThemeProvider>

        )
    }
}

export default withStyles(styles)(AddProductDetails);