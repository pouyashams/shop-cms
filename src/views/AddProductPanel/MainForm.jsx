import React, {Component} from 'react';
import ProductDetails from './ProductDetails';
import AddProductDetailsPanel from './AddProductDetailsPanel';
import Success from './/Success';
import axios from "axios";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import {withStyles} from '@material-ui/core/styles';
import ReactDOM from "react-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import getAccessToken from "../../routes/ACCESS_TOKEN";

const styles = theme => ({
    root: {
        width: '10%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    customStyle: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: 200,
        direction: 'rtl'
    }
});

class MainForm extends Component {
    state = {
        linearProgress: false,
        index: 1,
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'data:image/png;base64,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',
        }],
        i: 0,
        labelWidth: 0,
        productCategoryList: [],
        colors: ['rose', 'warning'],
        productCategoryOptions: [],
        productItemSupplierList: [],
        selectedProductCategoryId: '',
        productItemSupplierId: null,
        lastProductItemAttributeInfo: null,
        productItemAttributeInfoList: null,
        step: 1,
        name: null,
        productCategoryName: null,
        price: '',
        code: '',
        numberOfProduct: '',
        description: '',
        productCategory: {
            identifier: '',

        },
        productItemInfoList: [
            {
                taxation: '',
                name: '',
                index: 1,
                englishName: '',
                code: '',
                price: '',
                numberOfProduct: '',
                description: '',
                productItemImageBase64List: [],
                productItemImageList: [],
                productItemSupplier: {
                    identifier: '',
                    label: ''
                },
                productAttributeItemList: [],
                color: 'warning'
            }
        ],
        color: 'warning',
        text: '',
        alertStyle: 'info',
        tc: false,
    }

    getIndex = (index) => {
        var productItemInfoList = this.state.productItemInfoList;
        console.log(13122331)
        console.log(productItemInfoList)
        console.log(productItemInfoList.length)
        for (var i = 0; i < productItemInfoList.length; i++) {
            if (productItemInfoList[i].index === index) {
                productItemInfoList.splice(i, 1);
                break;
            }
        }
        this.setState({
            productItemInfoList
        })
    }

    nextStep = async () => {
        const {step} = this.state
        if (step === 1) {
            if (this.state.name === null || this.state.name === '') {
                this.showNotification("tc", "نام کالا را وارد کنید!", "danger");
                return;
            }
            if (this.state.selectedProductCategoryId === null || this.state.selectedProductCategoryId === '') {
                this.showNotification("tc", "دسته کالا را انتخاب کنید!", "danger");
                return;
            }

            var selectedProductCategory = null;
            var selectedProductCategoryId = this.state.selectedProductCategoryId;
            this.state.productCategoryList.forEach(function (productCategory) {
                if (productCategory.identifier === selectedProductCategoryId) {
                    selectedProductCategory = productCategory;
                }
            });

            var progressedProductCategory = this.progressProductCategory(selectedProductCategory);
            console.log(progressedProductCategory);
            var selectedProductAttributeList = [];
            progressedProductCategory.forEach((key, value, map) => selectedProductAttributeList.push(key));
            var productItemAttributeInfoList = [];
            var lastProductItemAttributeInfo = null;

            var info = {
                item1: null,
                item2: null
            }
            console.log(selectedProductAttributeList.length);
            selectedProductAttributeList.forEach(function (selectedProductAttribute, index) {
                var productAttributeList = selectedProductAttribute.productAttributeList;
                var productAttributeInfoList = [];
                productAttributeList.forEach(function (productAttribute) {
                    var info = {
                        value: productAttribute.identifier + '#' + selectedProductAttribute.identifier,
                        label: productAttribute.attributeValue
                    }
                    productAttributeInfoList.push(info);
                });

                var itemInfo = {
                    productAttributeInfoList: productAttributeInfoList,
                    categoryName: selectedProductAttribute.categoryName,
                    categoryIdentifier: selectedProductAttribute.identifier
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
                } else if (selectedProductAttributeList.length === index + 1) {
                    lastProductItemAttributeInfo = info.item1;
                }
            });
            this.setState({
                productItemAttributeInfoList: productItemAttributeInfoList,
                lastProductItemAttributeInfo: lastProductItemAttributeInfo,
                step: step + 1
            })
            this.setState({
                step: step + 1
            })
            return;
        }
        if (step === 2) {
            var productItemInfoList = this.state.productItemInfoList;
            for (var i = 0; i < productItemInfoList.length; i++) {
                if (this.state.productItemInfoList[i].name === null || this.state.productItemInfoList[i].name === '') {
                    this.showNotification("tc", "نام کالا را وارد کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].englishName === null || this.state.productItemInfoList[i].englishName === '') {
                    this.showNotification("tc", "نام کالا (انگلیسی) را وارد کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].code === null || this.state.productItemInfoList[i].code === '') {
                    this.showNotification("tc", "شناسه ی کالا را وارد کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].productItemSupplier.identifier === null || this.state.productItemInfoList[i].productItemSupplier.identifier === '') {
                    this.showNotification("tc", "فروشنده کالا را انتخاب کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].price === null || this.state.productItemInfoList[i].price === '') {
                    this.showNotification("tc", "قیمت کالا را وارد کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].taxation === null || this.state.productItemInfoList[i].taxation === '') {
                    this.showNotification("tc", "مالیات  را وارد کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].numberOfProduct === null || this.state.productItemInfoList[i].numberOfProduct === '') {
                    console.log(11)
                    console.log(this.state.productItemInfoList[i].numberOfProduct)
                    this.showNotification("tc", "تعداد کالا را وارد کنید!", "danger");
                    return;
                }

                if (this.state.productItemInfoList[i].description === null || this.state.productItemInfoList[i].description === '') {
                    this.showNotification("tc", "توضیحات کالا را وارد کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].productItemImageBase64List.length === 0) {
                    this.showNotification("tc", "حداقل یک عکس وارد کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].productAttributeItemList.length === 0) {
                    this.showNotification("tc", "حداقل یک ویژگی انتخاب کنید!", "danger");
                    return;
                }
            }
            this.setState({
                linearProgress: true,
            });
            var productCategory = this.state.productCategory;
            productCategory.identifier = this.state.selectedProductCategoryId;
            const data = {
                name: this.state.name,
                productCategory: productCategory,
                productItemInfoList: productItemInfoList,
            }
            var access_token = await getAccessToken();
            axios.post(`http://shop.isuncharge.com/isunshop/register/product?access_token=` + access_token, data)
                .then(res => {
                    if (res.data.success) {
                        this.setState({
                            linearProgress: false,
                            step: step + 1
                        })
                        this.showNotification("tc", "کالا با موفقیت ثبت شد!", "success");
                    } else {
                        linearProgress: false,
                            this.showNotification("tc", "خطایی در پردازش اطلاعات رخ داده است!", "danger")
                    }
                }).catch((error) => {
                linearProgress: false,

                    this.showNotification("tc", "خطایی در پردازش اطلاعات رخ داده است!", "danger")
            });
        }
    }

    progressProductCategory(selectedProductCategory) {
        var productAttributeCategoryList = selectedProductCategory.productAttributeCategoryList;
        var productAttributeMap = new Map();
        productAttributeCategoryList.forEach(function (productAttributeCategory) {
            var info = {
                "identifier": productAttributeCategory.identifier,
                "categoryName": productAttributeCategory.categoryName,
                "productAttributeList": productAttributeCategory.productAttributeList,
            };

            productAttributeMap.set(productAttributeCategory.identifier, info);
        });
        if (selectedProductCategory.parentProductCategory != null) {
            var parentInofs = this.progressProductCategory(selectedProductCategory.parentProductCategory);
            parentInofs.forEach((key, value, map) => productAttributeMap.set(value, key));
        }
        return productAttributeMap;
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

    async useAccessToken() {
        this.setState({
            linearProgress: true,
        });
        var access_token = await getAccessToken();

        axios.get(`http://shop.isuncharge.com/isunshop/fetch/define-product-info?access_token=` + access_token)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        linearProgress: false,
                    });
                    const data = res.data;
                    var productCategoryList = [];
                    var productCategorys = data.productCategoryList;
                    productCategorys.forEach(function (productCategory) {
                        var info = {value: productCategory.identifier, label: productCategory.productCategoryName};
                        productCategoryList.push(info);
                    });
                    var productItemSupplierList = [];
                    var productItemSupplier = data.productItemSupplierList;
                    productItemSupplier.forEach(function (supplier) {
                        var infos = {value: supplier.identifier, label: supplier.name};
                        productItemSupplierList.push(infos);
                    });
                    console.log(productItemSupplierList);
                    this.setState({
                        productCategoryList: productCategorys,
                        productCategoryOptions: productCategoryList,
                        productItemSupplierList: productItemSupplierList,
                    });
                    console.log(12)
                    console.log(this.state.productItemSupplierList)
                    console.log(11)
                }
                else {
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
    }

    componentDidMount() {
        this.useAccessToken();
    };

    prevStep = () => {
        const {step} = this.state
        this.setState({
            step: step - 1
        })
    }
    add = () => {
        var productItemInfoList = this.state.productItemInfoList;
        var index = this.state.index + 1;
        var i = this.state.i;
        i = i % 2;
        var emptyProduct = {
            index: index,
            code: '',
            price: '',
            numberOfProduct: '',
            description: '',
            productItemImageBase64List: [],
            productAttributeItemList: [],
            productItemSupplier: {
                identifier: ''
            },
            color: this.state.colors[i]
        };
        productItemInfoList.push(emptyProduct)
        i = i + 1;
        this.setState({productItemInfoList, i, index})
    }
    handleChange = input => event => {
        this.setState({[input]: event.target.value})
    }
    handelechangeWithValue = (name, value) => {
        this.setState({[name]: value})
    }

    render() {
        const {step} = this.state;
        switch (step) {
            case 1:
                return <div dir="rtl">
                    <ProductDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handelechangeWithValue={this.handelechangeWithValue}
                        productCategoryOptions={this.state.productCategoryOptions}
                        labelWidth={this.state.labelWidth}
                        name={this.state.name}
                        linearProgress={this.state.linearProgress}
                    />
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
                    <Snackbar
                        place="tc"
                        color={this.state.alertStyle}
                        icon={AddAlert}
                        message={this.state.text}
                        open={this.state.tc}
                    />
                </div>
            case 2:
                return <div dir="rtl">
                    <AddProductDetailsPanel
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        add={this.add}
                        handleChange={this.handleChange}
                        productItemInfoList={this.state.productItemInfoList}
                        productItemAttributeInfoList={this.state.productItemAttributeInfoList}
                        productItemSupplierList={this.state.productItemSupplierList}
                        lastProductItemAttributeInfo={this.state.lastProductItemAttributeInfo}
                        handelechangeWithValue={this.handelechangeWithValue}
                        color={this.state.color}
                        getIndex={this.getIndex}
                    />
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
                    <Snackbar
                        place="tc"
                        color={this.state.alertStyle}
                        icon={AddAlert}
                        message={this.state.text}
                        open={this.state.tc}
                    />
                </div>
            case 3:
                return <div dir="rtl">
                    <Success
                        name={this.state.name}
                        productItemInfoList={this.state.productItemInfoList}
                        p={console.log(this.state.productItemSupplierList)}
                    />
                    <Snackbar
                        place="tc"
                        color={this.state.alertStyle}
                        icon={AddAlert}
                        message={this.state.text}
                        open={this.state.tc}
                    />
                </div>
            default:
                return <Success/>
        }
    }
}

export default withStyles(styles)(MainForm);