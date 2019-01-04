import React, {Component} from 'react';
import ProductDetails from './ProductDetails';
import AddProductDetailsPanel from './AddProductDetailsPanel';
import Success from './/Success';
import axios from "axios";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import {withStyles} from '@material-ui/core/styles';

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
                code: '',
                price: '',
                numberOfProduct: '',
                description: '',
                productItemImageList: [],
                productItemImageBase64List: [],
                productItemSupplier: {
                    identifier: '',
                    label: ''
                },
                productAttributeItemList: [],
            }
        ],
        color: 'warning',
        text: '',
        alertStyle: 'info',
        tc: false,
    }

    convertImageToBase64(file) {

    }

    sendInformationOfProduct() {

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
                if (this.state.productItemInfoList[i].price === null || this.state.productItemInfoList[i].price === '') {
                    this.showNotification("tc", "قیمت کالا را وارد کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].code === null || this.state.productItemInfoList[i].code === '') {
                    this.showNotification("tc", "شناسه ی کالا را وارد کنید!", "danger");
                    return;
                }

                if (this.state.productItemInfoList[i].numberOfProduct === null || this.state.productItemInfoList[i].numberOfProduct === '') {
                    console.log(11)
                    console.log(this.state.productItemInfoList[i].numberOfProduct)
                    this.showNotification("tc", "تعداد کالا را وارد کنید!", "danger");
                    return;
                }
                if (this.state.productItemInfoList[i].productItemSupplier.identifier === null || this.state.productItemInfoList[i].productItemSupplier.identifier === '') {
                    this.showNotification("tc", "فروشنده کالا را انتخاب کنید!", "danger");
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
                var productCategory = this.state.productCategory;
                productCategory.identifier = this.state.selectedProductCategoryId;


                const data = {
                    name: this.state.name,
                    productCategory: productCategory,
                    productItemInfoList: productItemInfoList,
                }
                console.log(data);
                axios.post(`http://shop.isuncharge.com/isunshop/register/product`, data)
                    .then(res => {
                        if (res.data.success) {
                            this.setState({
                                step: step + 1
                            })
                        } else {
                            this.showNotification("tc", "خطایی در پردازش اطلاعات رخ داده است!", "danger")
                        }
                    }).catch((error) => {
                    console.log(error)
                    this.showNotification("tc", "خطایی در پردازش اطلاعات رخ داده است!", "danger")
                });
            }
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


    componentDidMount() {
        axios.get(`http://shop.isuncharge.com/isunshop/fetch/define-product-info`)
            .then(res => {
                if (res.data.success) {
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
                }
                else {
                    this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
                }
            }).catch((error) => {
            this.showNotification("tc", "ارتباط با سرور برقرار نشد!", "danger")
        });
    };

    prevStep = () => {
        const {step} = this.state
        this.setState({
            step: step - 1
        })
    }
    add = () => {
        var i = this.state.i;
        i = i % 2;
        var emptyProduct = {
            code: '',
            price: '',
            numberOfProduct: '',
            description: '',
            productItemImageList: [],
            productAttributeItemList: [],
            productItemSupplier: {
                identifier: ''
            },
            color: this.state.colors[i]
        };
        var productItemInfoList = this.state.productItemInfoList;
        productItemInfoList.push(emptyProduct)
        i = i + 1;
        this.setState({productItemInfoList, i})
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
            case 3:
                return <div dir="rtl">
                    <ProductDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handelechangeWithValue={this.handelechangeWithValue}
                        productCategoryOptions={this.state.productCategoryOptions}
                        labelWidth={this.state.labelWidth}
                        name={this.state.name}
                    />
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
                        sendInformationOfProduct={this.sendInformationOfProduct.bind(this)}
                        color={this.state.color}
                    />
                    <Snackbar
                        place="tc"
                        color={this.state.alertStyle}
                        icon={AddAlert}
                        message={this.state.text}
                        open={this.state.tc}
                    />
                </div>
            case 1:
                return <Success
                    name={this.state.name}
                    productItemInfoList={this.state.productItemInfoList}
                    p={console.log(this.state.productItemSupplierList)}
                />

            default:
                return <Success/>
        }
    }
}

export default withStyles(styles)(MainForm);