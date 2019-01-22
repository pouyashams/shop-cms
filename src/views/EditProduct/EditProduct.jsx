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
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import moment from 'jalali-moment'
import TableWithAction from "../../components/Table/TableWithAction";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Muted from "components/Typography/Muted.jsx";
import NumberFormat from 'react-number-format';
import {Input, LocaleProvider, Upload, Icon, Modal} from 'antd';
import 'antd/dist/antd.css';
import faIR from 'antd/lib/locale-provider/fa_IR';
import axios from "axios";

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

    inputSelectionSup: {
        height: "38px",
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        width: 160,
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
    inputStyleN: {
        height: "38px",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        // marginBottom: theme.spacing.unit * 2,
        width: 150,
        direction: 'rtl'
    },
    customInputStyle: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1,
        width: 650,
        direction: 'rtl'
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


class EditProduct extends React.Component {
    state = {
        lastProductItemAttributeInfo: null,
        productItemAttributeInfoList :[],
        resData: null,
        selectedOption: "",
        productItemInfoList: {
            code: '',
            price: '',
            numberOfProduct: '',
            description: '',
            productItemImageBase64List: [],
            productItemSupplier: {
                identifier: '',
                name: ''
            },
            productAttributeItemList: [],
        },
        previewVisible: false,
        previewImage: '',
        fileList: [],
        files: [],
        Pagination: true,
        PaginationDialog: false,
        open: false,
        buttonList: [],
        // checkBoxList: [
        //     <FormControlLabel
        //         control={
        //             <Select
        //                 style={{
        //                     height: "36px",
        //                     width: 160,
        //                 }}
        //                 isDisabled={false}
        //                 isLoading={false}
        //                 isClearable={true}
        //                 isRtl={true}
        //                 isSearchable={true}
        //                 name="color"
        //                 // options={attribute.item1.productAttributeInfoList}
        //                 // onChange={this.handleChangeSelection}
        //                 placeholder="انتخاب کنید..."
        //             />
        //         }
        //         label={"فروشنده محصول: "}
        //         labelPlacement="start"
        //     />,
        //
        // ],
        treeTable: false,
        search: {
            registerDateFrom: moment().locale('fa').format('YYYY/MM/DD'),
            registerDateTo: moment().locale('fa').format('YYYY/MM/DD')
        },
        searchInfo: [
            {
                name: "code",
                searchType: "textField",
                labelText: "شناسه کالا :",
                placeholder: "------------------------"
            },
            {
                name: "numberOfProduct",
                searchType: "textField",
                labelText: "تعداد کالا :",
                placeholder: "-------------------------"
            },
            {
                name: "name",
                searchType: "textField",
                labelText: "نام کالا :",
                placeholder: "-------------------------"
            },
            {
                name: "registerDateFrom",
                searchType: "numberFormat",
                labelText: "از تاریخ :",
                placeholder: moment().locale('fa').format('YYYY/MM/DD'),
                defaultValue: moment().locale('fa').format('YYYY/MM/DD'),
                format: "####/##/##",

            },
            {
                name: "registerDateTo",
                searchType: "numberFormat",
                labelText: "تا تاریخ :",
                placeholder: moment().locale('fa').format('YYYY/MM/DD'),
                defaultValue: moment().locale('fa').format('YYYY/MM/DD'),
                format: "####/##/##",
            },
        ],
        tableColumns: [{
            Header: 'مشخصات کلی کالا',
            columns: [{
                Header: 'نام کالا',
                accessor: 'name',
                filterable: false,
                resizable: false
            },
                {
                    Header: 'شناسه کالا',
                    accessor: 'code',
                    filterable: false,
                    resizable: false
                },
                {
                    Header: 'تعداد کالا',
                    filterable: false,
                    accessor: 'numberOfProduct',
                    resizable: false
                },
                {
                    Header: 'فروشنده محصول',
                    accessor: 'supplierName',
                    filterable: false,
                    resizable: false
                },
                {
                    accessor: 'code',
                    Cell: ({value}) => (
                        <Button
                            variant="contained"
                            style={{
                                height: "25px",
                                width: 60,
                                boxShadow: " 0 12px 20px -10px rgba(7, 26, 147, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(7, 26, 147, 0.2)",
                                background: "linear-gradient(60deg, #125a62, #125a62)",
                                align: "center"
                            }}
                            color="secondary"
                            onClick={() => {
                                this.handleClickOpen(value)
                            }}>
                            ویرایش
                        </Button>
                    ),
                    resizable: false,
                    width: 95
                }
            ]
        },],
        tableColumnsDialog: [{
            Header: 'ویژگی های کالا',
            columns: [{
                accessor: 'part1',
                width: 500
            },
                {
                    accessor: 'part2',
                    width: 500
                },]
        },],
        dataTable: [],
        dialogData: [],
        suplier: [],
        dataTableDialog: [
            {
                "part1":
                    <GridItem xs={12} sm={12} md={5}>
                        <label>رنگ</label>
                        <Select
                            isDisabled={false}
                            isLoading={false}
                            isClearable={true}
                            isRtl={true}
                            isSearchable={true}
                            name="color"
                            // options={attribute.item1.productAttributeInfoList}
                            // onChange={this.handleChangeSelection}
                            placeholder="انتخاب کنید..."
                        />
                    </GridItem>
                ,
                "part2":
                    <GridItem xs={12} sm={12} md={5}>
                        <label>رنگ</label>
                        <Select
                            isDisabled={false}
                            isLoading={false}
                            isClearable={true}
                            isRtl={true}
                            isSearchable={true}
                            name="color"
                            // options={attribute.item1.productAttributeInfoList}
                            // onChange={this.handleChangeSelection}
                            placeholder="انتخاب کنید..."
                        />
                    </GridItem>
            },
        ],
    }


    showattributeData() {
        var productItemAttributeInfoList = [];
        var lastProductItemAttributeInfo = null;
        var info = {
            item1: null,
            item2: null
        }

        var tool = this.state.resData.productItemInfo.productAttributeItemList.length;
        console.log("salaammm")
        console.log(tool)
        console.log("salaammm")

        this.state.resData.productItemInfo.productAttributeItemList.forEach(function (productAttributeItem, index) {
            console.log("2")
            var selected = {}
            var selectedProductAttribute = productAttributeItem.productAttributeCategory;
            var productAttributeList = selectedProductAttribute.productAttributeList;
            var productAttributeInfoList = [];
            productAttributeList.forEach(function (productAttribute) {
                console.log("3")
                var infoooo = {
                    value: productAttribute.identifier + '#' + selectedProductAttribute.identifier,
                    label: productAttribute.attributeValue
                }
                if(productAttribute.identifier === productAttributeItem.productAttribute.identifier){
                    selected = infoooo;
                }
                productAttributeInfoList.push(infoooo);
            });

            var itemInfo = {
                productAttributeInfoList: productAttributeInfoList,
                categoryName: selectedProductAttribute.categoryName,
                categoryIdentifier: selectedProductAttribute.identifier,
                selectedAttribue : selected
            }

            console.log(itemInfo)

            if (info.item1 === null) {
                info.item1 = itemInfo;
            } else if (info.item2 === null) {
                info.item2 = itemInfo;
            }

            if (info.item1 !== null && info.item2 !== null) {
                productItemAttributeInfoList.push(info);

                info = {
                    item1: null,
                    item2: null
                }
            } else if (tool === index + 1) {
                lastProductItemAttributeInfo = info.item1;
            }
        });
        console.log(lastProductItemAttributeInfo)
        console.log(productItemAttributeInfoList)
        this.setState({lastProductItemAttributeInfo,productItemAttributeInfoList});
    }

    handleChangePrice = input => event => {
        this.state.productItemInfoList.price = event.target.value;
    }

    handleChangeCode = input => event => {
        this.state.productItemInfoList.code = event.target.value;
    }

    handleChangeDescription = input => event => {
        this.state.productItemInfoList.description = event.target.value;
        // console.log(this.state.productItemInfoList)
    }
    handleChangeNumberOfProduct = input => event => {
        this.state.productItemInfoList.numberOfProduct = event.target.value;
    }
    handleChangeSupplier = (selectedOption) => {
        this.state.productItemInfoList.productItemSupplier.identifier = selectedOption.value;
    }

    searchItemProduct() {
        // console.log("sina")
        // console.log(this.state.search)
        var data = {
            "numberOfProduct": "",
            "code": "",
            "name": "",
            "registerDateFrom": "",
            "registerDateTo": "",
        }
        for (var i = 0; i < this.state.search.length; i++) {
            // console.log(1)
            // console.log(this.state.search)
            if (this.state.search[i].name === "numberOfProduct") {
                data.numberOfProduct = this.state.search[i].value;
            } else if (this.state.search[i].name === "code") {
                data.code = this.state.search[i].value;
            } else if (this.state.search[i].name === "name") {
                data.name = this.state.search[i].value;
            } else if (this.state.search[i].name === "registerDateFrom") {
                data.registerDateFrom = this.state.search[i].value;
            } else if (this.state.search[i].name === "registerDateTo") {
                data.registerDateTo = this.state.search[i].value;
            }
        }
        // console.log("peofv")
        // console.log(data)
        // console.log(data)
        // console.log(111)
        axios.post(`http://shop.isuncharge.com/isunshop/fetch/search-product-item`,
            data)
            .then(res => {
                // console.log(res.data)
                const dataTable = []

                this.setState({"dataTable": res.data});
                // this.state.dataTable = dataTable;
                // this.showNotification("tc", "عملیات با موفقیت انجام شد!  ", "success")

            }).catch((error) => {
            // console.log(error)
            // this.showNotification("tc", "عملیات انجام نشد!", "danger")
        });

    };

    handleChangeSelect = (selectedOption) => {
        this.setState({selectedOption});

    }

    handleChangeSearch(search) {
        // console.log(345)
        this.state.search = search

        this.searchItemProduct();
    };

    handleClickOpen = code => {
        // console.log("codeeeeeeee")
        // console.log(code)
        const data = {"code": code}
        axios.post(`http://shop.isuncharge.com/isunshop/fetch/search-product-item-with-details`,
            data)
            .then(res => {
                this.state.resData = res.data[0]
                console.log(res.data[0])
                var suplier = [];
                var fileList = [];
                this.state.productItemInfoList.productItemSupplier.identifier = res.data[0].productItemInfo.productItemSupplier.identifier;
                suplier.push({
                    value: res.data[0].productItemInfo.productItemSupplier.identifier,
                    label: res.data[0].productItemInfo.productItemSupplier.name
                })
                // console.log(res.data[0])
                // console.log(1)
                // console.log(res.data[0].productItemInfo.productItemImageBase64List)
                for (var i = 0; i < res.data[0].productItemInfo.productItemImageBase64List.length; i++) {
                    var imagejson = {
                        // name: "photo_2018-12-26_13-28-26" + i + ".jpg",
                        // type: "image/jpg",
                        uid: "rc-upload-1548016815471" + i,
                        url: "data:image/jpg;base64," + res.data[0].productItemInfo.productItemImageBase64List[i]
                    }
                    // console.log(22)
                    // console.log(imagejson)
                    fileList.push(imagejson)
                }
                // console.log(res.data[0])
                // console.log(suplier)
                this.showattributeData()

                this.setState({open: true, dialogData: res.data[0], suplier: suplier, fileList: fileList});

            }).catch((error) => {
            // this.showNotification("tc", "عملیات انجام نشد!", "danger")
        });
    };

    handleClosePic = () => {
        this.setState({openPic: false});
    };
    handleClose = () => {
        this.setState({open: false});
    };
    handleSave = () => {
        const data = this.state.productItemInfoList;
        axios.post(`http://shop.isuncharge.com/isunshop/update/product-item`,
            data)
            .then(res => {
                if (res.data.success) {
                    // this.showNotification("tc", "عملیات با موفقیت انجام شد!  ", "success")
                } else {
                    // this.showNotification("tc", "عملیات انجام نشد!", "danger")
                }
            }).catch((error) => {
            // this.showNotification("tc", "عملیات انجام نشد!", "danger")
        });
        this.setState({open: false});
    };
    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => this.setState({fileList})

    pushImage() {
        const {productItemInfo} = this.props;
        const productItemImageList = [];
        if (this.state.fileList.length !== 0) {
            this.state.fileList.map(productItemInfo => (
                productItemImageList.push(
                    {
                        url: productItemInfo.thumbUrl,
                        type: productItemInfo.type,
                        name: productItemInfo.name,
                        uid: productItemInfo.uid,
                    }
                ))
            )
        }
        // productItemInfo.productItemImageList = productItemImageList
        // console.log("1")
        // console.log(productItemInfo.productItemImageList)
    };

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        // console.log(this.props.fileList)
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <h4>آپلود عکس</h4>
            </div>
        );
        const {classes} = this.props;
        const text = <h6 className={classes.cardTitleWhite}>نام کالا</h6>;
        const textBtnSave = <h6 className={classes.cardTitleWhite}>ذخیره</h6>;
        const textBtnCancel = <h6 className={classes.cardTitleWhite}>لغو</h6>;
        const {TextArea} = Input;
        return (
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    <Card>
                        <CardHeader plain color={"warning"}>
                            <h4 className={classes.cardTitleWhite}>به روز رسانی کالا</h4>
                        </CardHeader>
                        <CardBody>
                            <SearchProduct
                                style={{
                                    marginTop: theme.spacing.unit * 2,
                                }}
                                searchInfo={this.state.searchInfo}
                                handleChangeSearch={this.handleChangeSearch.bind(this)}
                            />
                            <TableWithAction
                                tableColumns={this.state.tableColumns}
                                dataTable={this.state.dataTable}
                                treeTable={this.state.treeTable}
                                buttonList={this.state.buttonList}
                                Pagination={this.state.Pagination}

                            />
                            <div>
                                {this.state.open === true ?
                                    <LocaleProvider locale={faIR}>
                                    <Modal
                                        width="1200px"
                                        className={classes.Rtl}
                                        visible={this.state.open}
                                        onOk={this.handleSave}
                                        onCancel={this.handleClose}
                                        // closable={false}
                                    >

                                        <card>
                                            <CardBody>
                                                <MuiThemeProvider theme={theme}>
                                                    <div dir="rtl">
                                                        <Card
                                                            style={{
                                                                backgroundColor: "#f6f8f7",
                                                            }}
                                                        >
                                                            <CardHeader color="warning">
                                                                <h4 className={classes.cardTitleWhite}>{text}</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <form>
                                                                    <form>
                                                                        <FormControlLabel
                                                                            style={{
                                                                                marginTop: theme.spacing.unit * 2,
                                                                            }}
                                                                            control={
                                                                                <NumberFormat
                                                                                    // thousandSeparator={true}
                                                                                    customInput={Input}
                                                                                    className={classes.inputStyleN}
                                                                                    // value={productItemInfo.price}
                                                                                    placeholder="---------------------------"
                                                                                    onChange={this.handleChangePrice()}
                                                                                    // format="###,###,###"
                                                                                    defaultValue={this.state.dialogData.productItemInfo.price}
                                                                                    variant="outlined"
                                                                                    margin="normal"
                                                                                    required
                                                                                />
                                                                            }
                                                                            label={"قیمت (تومان): "}
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
                                                                                    defaultValue={this.state.dialogData.productItemInfo.code}
                                                                                />
                                                                            }
                                                                            label={"شناسه ی کالا: "}
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
                                                                                    defaultValue={this.state.dialogData.productItemInfo.numberOfProduct}
                                                                                />
                                                                            }
                                                                            label={"تعداد کالا: "}
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
                                                                                    value={this.state.productItemInfoList.productItemSupplier.identifier}
                                                                                    options={this.state.suplier}
                                                                                    onChange={this.handleChangeSupplier}
                                                                                    placeholder="----------------------"
                                                                                />
                                                                            }
                                                                            label={"فروشنده محصول: "}
                                                                            labelPlacement="start"
                                                                        />

                                                                    </form>
                                                                    <form>
                                                    <TextArea
                                                        rows={11}
                                                        defaultValue={this.state.dialogData.productItemInfo.description}
                                                        onChange={this.handleChangeDescription()}
                                                        className={classes.customInputStyle}
                                                        placeholder="توضیحات"

                                                    />
                                                                    </form>
                                                                </form>
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
                                                                                    <Modal
                                                                                        visible={previewVisible} footer={null}
                                                                                        onCancel={this.handleCancel}>
                                                                                        <img alt="example"
                                                                                             style={{width: '100%'}}
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
                                                            <CardHeader plain color="warning">
                                                                <h4 className={classes.cardTitleWhite}>اصلاح ویژگی های کالا</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Table className={classes.table}>
                                                                    <TableBody>
                                                                        {this.state.productItemAttributeInfoList.map((attribute, index) => (
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
                                                                                            value={attribute.item1.selectedAttribue}
                                                                                            defaultValue={attribute.item1.selectedAttribue}
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
                                                                                            value={attribute.item2.selectedAttribue}
                                                                                            defaultValue={attribute.item2.selectedAttribue}
                                                                                            onChange={this.handleChangeSelection}
                                                                                            placeholder="انتخاب کنید .."
                                                                                        />
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        )}
                                                                        {this.state.lastProductItemAttributeInfo !== null
                                                                            ?
                                                                            <TableRow>
                                                                                <TableCell component="th" scope="row">
                                                                                    {this.state.lastProductItemAttributeInfo.categoryName}
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
                                                                                        options={this.state.lastProductItemAttributeInfo.productAttributeInfoList}
                                                                                        value={this.state.lastProductItemAttributeInfo.selectedAttribue}
                                                                                        defaultValue={this.state.lastProductItemAttributeInfo.selectedAttribue}
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
                                                    </div>
                                                </MuiThemeProvider>
                                            </CardBody>
                                        </card>
                                    </Modal>
                                    </LocaleProvider>
                                    : null
                                }
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </MuiThemeProvider>

        )
    }
}

export default withStyles(styles)(EditProduct);