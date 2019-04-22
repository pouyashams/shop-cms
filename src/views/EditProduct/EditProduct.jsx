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
import Snackbar from "components/Snackbar/Snackbar.jsx";
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
import AddAlert from "@material-ui/icons/AddAlert";
import LinearProgress from '@material-ui/core/LinearProgress';
import getAccessToken from "../../routes/ACCESS_TOKEN";


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
        categoryList: [],
        color: 'primary',
        text: '',
        alertStyle: 'info',
        tc: false,
        lastProductItemAttributeInfo: null,
        productItemAttributeInfoList: [],
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
        search: [],
        searchInfo: [
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
                name: "code",
                searchType: "textField",
                labelText: "شناسه کالا:",
                placeholder: "------------------------"
            },
            {
                name: "numberOfProduct",
                searchType: "textField",
                labelText: "تعداد کالا:",
                placeholder: "-------------------------"
            },


            {
                name: "registerDateTo",
                searchType: "numberFormat",
                labelText: "تا تاریخ :",
                placeholder: moment().locale('fa').format('YYYY/MM/DD'),
                defaultValue: moment().locale('fa').format('YYYY/MM/DD'),
                format: "####/##/##",
            },
            {
                name: "category",
                searchType: "select",
                labelText: "دسته کالا :",
                placeholder: "--------------------",
                selectOption: [],
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
        selectedSuplier: {
            label: "------"
        },
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
        this.state.resData.productItemInfo.productAttributeItemList.forEach(function (productAttributeItem, index) {
            var selected = {}
            var selectedProductAttribute = productAttributeItem.productAttributeCategory;
            var productAttributeList = selectedProductAttribute.productAttributeList;
            var productAttributeInfoList = [];
            productAttributeList.forEach(function (productAttribute) {
                var infoooo = {
                    value: productAttribute.identifier + '#' + selectedProductAttribute.identifier,
                    label: productAttribute.attributeValue
                }
                if (productAttribute.identifier === productAttributeItem.productAttribute.identifier) {
                    selected = infoooo;
                }
                productAttributeInfoList.push(infoooo);
            });

            var itemInfo = {
                productAttributeInfoList: productAttributeInfoList,
                categoryName: selectedProductAttribute.categoryName,
                categoryIdentifier: selectedProductAttribute.identifier,
                selectedAttribue: selected
            }

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
        // console.log(lastProductItemAttributeInfo)
        // console.log(productItemAttributeInfoList)
        this.setState({lastProductItemAttributeInfo, productItemAttributeInfoList});
    }

    handleChangePrice = input => event => {
        this.state.productItemInfoList.price = event.target.value.replace(/,/g, '');
    }
    handleChangeTaxation = input => event => {
        this.state.productItemInfoList.taxation = event.target.value.substr(1);
    }
    handleChangeCode = input => event => {
        this.state.productItemInfoList.code = event.target.value;
    }
    handleChangeName = input => event => {
        this.state.productItemInfoList.name = event.target.value;
    }
    handleChangeEngName = input => event => {
        this.state.productItemInfoList.englishName = event.target.value;
    }
    handleChangeDescription = input => event => {
        this.state.productItemInfoList.description = event.target.value;
        // console.log(this.state.productItemInfoList)
    }
    handleChangeNumberOfProduct = input => event => {
        this.state.productItemInfoList.numberOfProduct = event.target.value;
    }
    handleChangeSupplier = (selectedOption) => {
        this.state.selectedSuplier = selectedOption;
        this.state.productItemInfoList.productItemSupplier.identifier = selectedOption.value;
    }

    async searchItemProduct() {
        this.setState({
            linearProgress: true,
        });
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
        var access_token = await getAccessToken();
        axios.post(`http://shop.isuncharge.com/isunshop/fetch/search-product-item?access_token=` + access_token,
            data)
            .then(res => {
                const dataTable = []
                this.setState({
                    linearProgress: false,
                    "dataTable": res.data.data
                });
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "جستجو نا موفق بود!", "danger")
        });
    };
    handleChangeSelect = (selectedOption) => {
        this.setState({selectedOption});
    }
    async handleChangeSearch(search) {

        // console.log(345)
        this.state.search = search

        this.searchItemProduct();
    };
    handleClickOpen = code => async () => {
        console.log(1345432);
        var access_token = await getAccessToken();
        this.setState({
            linearProgress: true,
        });
        const data = {"code": code}
        axios.post(`http://shop.isuncharge.com/isunshop/fetch/search-product-item-with-details?access_token=` + access_token,
            data)
            .then(res => {
                this.state.resData = res.data[0]
                // console.log(res.data[0])
                var suplier = [];
                var selectedSuplier = {};
                var fileList = [];
                this.state.productItemInfoList.productItemSupplier.identifier = res.data[0].productItemInfo.productItemSupplier.identifier;
                suplier.push({
                    value: res.data[0].productItemInfo.productItemSupplier.identifier,
                    label: res.data[0].productItemInfo.productItemSupplier.name
                })
                selectedSuplier = suplier[0];
                for (var i = 0; i < res.data[0].productItemInfo.productItemImageBase64List.length; i++) {
                    var imagejson = {
                        uid: "rc-upload-1548016815471" + i,
                        url: "data:image/jpg;base64," + res.data[0].productItemInfo.productItemImageBase64List[i]
                    }
                    fileList.push(imagejson)

                }
                this.showattributeData()

                this.setState({

                    open: true,
                    dialogData: res.data[0],
                    name: res.data[0].name,
                    suplier: suplier,
                    selectedSuplier: selectedSuplier,
                    fileList: fileList,
                    productItemInfoList: res.data[0].productItemInfo,
                    linearProgress: false,

                });
            }).catch((error) => {
            linearProgress: false,
                this.setState({
                    linearProgress: false,
                });
            this.showNotification("tc", "! عملیات انجام نشد", "danger")
        });
    };

    async useAccessToken() {
        var access_token = await getAccessToken();
        this.setState({
            linearProgress: true,
        });
        axios.get(`http://shop.isuncharge.com/isunshop/fetch/define-product-category-info?access_token=` + access_token)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        linearProgress: false,
                    });
                    const categoryList = [];
                    const data = res.data.productCategoryList;
                    data.map(data => (
                        categoryList.push(
                            {value: data.identifier, label: data.productCategoryName})
                    ))
                    console.log(1)
                    // console.log(categoryList)
                    var searchInfo = this.state.searchInfo;
                    console.log(searchInfo[5].selectOption)
                    searchInfo[5].selectOption = categoryList;
                    this.setState({
                        searchInfo: searchInfo,
                    });
                } else {
                    this.setState({
                        linearProgress: false,
                    });
                    this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
                }
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
        });
        var searchInfoFrom = {
            name: 'registerDateFrom',
            value: moment().locale('fa').format('YYYY/MM/DD')

        };
        var searchInfoTo = {
            name: 'registerDateTo',
            value: moment().locale('fa').format('YYYY/MM/DD')

        };
        this.state.search.push(searchInfoFrom);
        this.state.search.push(searchInfoTo);
    }

    componentDidMount() {
        this.useAccessToken();
    }

    handleChangeSelection = (selectedOption) => {

        var value = selectedOption !== null ? selectedOption.value : null;
        var label = selectedOption !== null ? selectedOption.label : null;
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

            var productItemAttributeInfoList = this.state.productItemAttributeInfoList;
            var lastProductItemAttributeInfo = this.state.lastProductItemAttributeInfo;

            for (var i = 0; i < productItemAttributeInfoList.length; i++) {
                if (productItemAttributeInfoList[i].item1.selectedAttribue.value.split('#')[1] == values[1]) {
                    productItemAttributeInfoList[i].item1.selectedAttribue = selectedOption;
                }
                if (productItemAttributeInfoList[i].item2.selectedAttribue.value.split('#')[1] == values[1]) {
                    productItemAttributeInfoList[i].item2.selectedAttribue = selectedOption;
                }
            }

            if (lastProductItemAttributeInfo != null) {
                if (lastProductItemAttributeInfo.selectedAttribue.value.split('#')[1] == values[1]) {
                    lastProductItemAttributeInfo.selectedAttribue = selectedOption;
                }
            }
            var productAttributeItemList = this.state.productItemInfoList.productAttributeItemList;
            for (var i = 0; i < productAttributeItemList.length; i++) {
                if (productAttributeItemList[i].productAttributeCategory.identifier === info.productAttributeCategory.identifier) {
                    productAttributeItemList[i].productAttribute = info.productAttribute;
                    break;
                }
            }
            this.setState({productItemAttributeInfoList, lastProductItemAttributeInfo, productAttributeItemList})
        }
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

    handleClosePic = () => {
        this.setState({openPic: false});
    };
    handleClose = () => {
        this.setState({open: false});
    };
    handleSave = async () => {
        this.setState({
            linearProgress: true,
        });
        const data = this.state.productItemInfoList;
        var access_token = await getAccessToken();
        axios.post(`http://shop.isuncharge.com/isunshop/update/product-item?access_token=`+ access_token,
            data)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        linearProgress: false,
                    });
                    this.showNotification("tc", "عملیات با موفقیت انجام شد!  ", "success");
                    this.searchItemProduct();
                    this.setState({open: false});
                } else {
                    this.setState({
                        linearProgress: false,
                    });
                    this.showNotification("tc", "عملیات انجام نشد!", "danger")
                }
            }).catch((error) => {
            this.setState({
                linearProgress: false,
            });
            this.showNotification("tc", "عملیات انجام نشد!", "danger")
        });
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
        const {productItemInfoList} = this.state;
        const productItemImageList = [];
        if (this.state.fileList.length !== 0) {
            this.state.fileList.map(file => (
                file.url !== undefined ?
                    productItemImageList.push(file.url.substr(22)) : null
            ))
            for (let i = 0; i < this.state.fileList.length; i++) {
                const base64 = this.state.fileList[i].thumbUrl
                if (base64 !== undefined) {
                    productItemImageList.push(base64.substr(23))
                }
            }
        }
        // console.log(productItemImageList.length)
        // console.log(productItemInfoList.productItemImageBase64List)
        productItemInfoList.productItemImageBase64List = productItemImageList;
        // console.log(13)
        // console.log(productItemInfoList.productItemImageBase64List)
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
        const {classes} = this.props;
        const text = <h6 className={classes.cardTitleWhite}>{this.state.name} : نام کالا</h6>;
        const textBtnSave = <h6 className={classes.cardTitleWhite}>ذخیره</h6>;
        const textBtnCancel = <h6 className={classes.cardTitleWhite}>لغو</h6>;
        const {TextArea} = Input;
        return (
            <MuiThemeProvider theme={theme}>
                {
                    this.state.linearProgress === true ?
                        <div style={{
                            position: 'fixed',
                            zIndex: '100',
                            top: '0px',
                            width: '108%',
                            left: '-33px'
                        }}>
                            <LinearProgress/>
                        </div>
                        : null
                }
                <div dir="rtl">
                    <Card>
                        <CardHeader plain color={"primary"}>
                            <h4 className={classes.cardTitleWhite}>به روز رسانی کالا</h4>
                        </CardHeader>
                        <CardBody
                            style={{
                                padding: "1.9375rem 51px",
                            }}
                        >
                            <SearchProduct
                                style={{
                                    marginTop: theme.spacing.unit * 2,
                                }}
                                search={this.state.search}
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
                                                                <CardHeader color="primary">
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
                                                                                    <Input
                                                                                        placeholder="-------------------------------"
                                                                                        className={classes.inputStyleN}
                                                                                        onChange={this.handleChangeName()}
                                                                                        defaultValue={this.state.dialogData.productItemInfo.name}
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
                                                                                        onChange={this.handleChangeEngName()}
                                                                                        defaultValue={this.state.dialogData.productItemInfo.englishName}
                                                                                    />
                                                                                }
                                                                                label={"نام انگلیسی : "}
                                                                                labelPlacement="start"
                                                                            />
                                                                            <FormControlLabel
                                                                                style={{
                                                                                    marginTop: theme.spacing.unit * 2,
                                                                                }}
                                                                                control={

                                                                                    <NumberFormat
                                                                                        prefix="%"
                                                                                        customInput={Input}
                                                                                        className={classes.inputStyleN}
                                                                                        placeholder="---------------------------"
                                                                                        onChange={this.handleChangeTaxation()}
                                                                                        defaultValue={this.state.dialogData.productItemInfo.taxation}
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
                                                                                    <Select
                                                                                        className={classes.inputSelectionSup}
                                                                                        isDisabled={false}
                                                                                        isLoading={false}
                                                                                        isClearable={true}
                                                                                        isRtl={true}
                                                                                        isSearchable={true}
                                                                                        value={this.state.selectedSuplier}
                                                                                        options={this.state.suplier}
                                                                                        onChange={this.handleChangeSupplier}
                                                                                        placeholder="----------------------"
                                                                                    />
                                                                                }
                                                                                label={"فروشنده محصول: "}
                                                                                labelPlacement="start"
                                                                            />
                                                                            <FormControlLabel
                                                                                style={{
                                                                                    marginTop: theme.spacing.unit * 2,
                                                                                }}
                                                                                control={
                                                                                    <NumberFormat
                                                                                        thousandSeparator={true}
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
                                                                                label={"قیمت (ریال): "}
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
                                                                                    <Muted>عکس مورد نظر وارد
                                                                                        کنید:</Muted>
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
                                                                                            visible={previewVisible}
                                                                                            footer={null}
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
                                                                <CardHeader plain color="primary">
                                                                    <h4 className={classes.cardTitleWhite}>اصلاح ویژگی
                                                                        های کالا</h4>
                                                                </CardHeader>
                                                                <CardBody>
                                                                    <Table className={classes.table}>
                                                                        <TableBody>
                                                                            {this.state.productItemAttributeInfoList.map((attribute, index) => (
                                                                                    <TableRow
                                                                                        key={attribute.item1.identifier}>
                                                                                        <TableCell component="th"
                                                                                                   scope="row">
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
                                                                                        <TableCell component="th"
                                                                                                   scope="row">
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
                                                                                    <TableCell component="th"
                                                                                               scope="row">
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
                    <Snackbar
                        place="tc"
                        color={this.state.alertStyle}
                        icon={AddAlert}
                        message={this.state.text}
                        open={this.state.tc}
                    />
                </div>
            </MuiThemeProvider>

        )
    }
}

export default withStyles(styles)(EditProduct);