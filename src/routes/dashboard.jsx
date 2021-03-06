import Dashboard from "@material-ui/icons/Dashboard";
import { Menu, Icon, Button } from 'antd';
// import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
import ProductCategoryAttribute from "../views/ProductCategory/ProductCategoryAttribute";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import SaleInfoForm from "../views/SaleInfo/SaleInfoForm"
// import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";
import definitionProductCategory from "../views/DefinitionProductCategory/definitionProductCategory.jsx";
// import StuffManager from "../views/StuffManager/StuffManager";
import MainForm from "../views/AddProductPanel/MainForm";
import Confirmation from "../views/Confirmation/Confirmation";
import EditProduct from "../views/EditProduct/EditProduct";
import hardwareInfo from "../views/hardwareInfo/hardwareInfo";
// import LoginPage from "../views/LoginPage/LoginPage"
import simCardInfo from "../views/addSimCard/simCardInfo"
import chargeDetails from "../views/chargeDetails/chargeDetails"
import internetPack from "../views/internetPack/internetPack"
import billDetails from "../views/billDetails/billDetails"
import paymentPort from "../views/paymentPort/paymentPort"

const dashboardRoutes = [

    // {
    //     path: "/dashboard",
    //     sidebarName: "Dashboard",
    //     // navbarName: "Material Dashboard",
    //     icon: Dashboard,
    //     component: DashboardPage
    // },
    {
        path: "/ProductCategoryAttribute",
        sidebarName: "ویژگی نوع کالا",
        navbarName: "ویژگی نوع کالا",
        icon: LibraryBooks,
        component: ProductCategoryAttribute
    },

    {
        path: "/definitionProductCategory",
        sidebarName: "تعریف نوع کالا",
        navbarName: "تعریف نوع کالا",
        icon: LibraryBooks,
        component: definitionProductCategory
    },

    {
        path: "/addProduct",
        sidebarName: "اضافه کردن کالا",
        navbarName: "اضافه کردن کالا",
        icon: Dashboard,
        component: MainForm
    },
    // {
    //     path: "/simCardInfo",
    //     sidebarName: "اضافه کردن سیمکارت",
    //     navbarName: "اضافه کردن سیمکارت",
    //     icon: Dashboard,
    //     component: simCardInfo
    // },
    {
        path: "/editProduct",
        sidebarName: "به روز رسانی کالا",
        // navbarName: "به روز رسانی کالا  ",
        icon: Dashboard,
        component: EditProduct
    },
    {
        path: "/Confirmation",
        sidebarName: "بررسی فروش",
        navbarName: "بررسی فروش",
        icon: Dashboard,
        component: Confirmation
    },

    // { path: "/login-page", name: "LoginPage", component: LoginPage },
    // {
    //     path: "/login-page",
    //     sidebarName: "گزارش فرون پرداخت",
    //     navbarName: "گزارش فران پرداخت",
    //     icon: Dashboard,
    //     component: LoginPage
    // },

    {
        path: "/chargeDetails",
        sidebarName: "گزارش شارژ",
        navbarName: "گزارش شارژ",
        icon: "content_paste",
        component: chargeDetails
    },
    {
        path: "/billDetails",
        sidebarName: "گزارش قبض",
        navbarName: "گزارش قبض",
        icon: "content_paste",
        component: billDetails
    },
    {
        path: "/internetPack",
        sidebarName: "گزارش بسته اینترنت",
        navbarName: "گزارش بسته اینترنت",
        icon: "content_paste",
        component: internetPack
    },
    // {
    //     path: "/SaleInfoForm",
    //     sidebarName: "گزارش فروش آیسان پرداخت",
    //     navbarName: "گزارش فروش آیسان پرداخت",
    //     icon: "content_paste",
    //     component: SaleInfoForm
    // },
    // {
    //     path: "/paymentPort",
    //     sidebarName: "درگاه پرداخت",
    //     navbarName: "درگاه پرداخت",
    //     icon: BubbleChart,
    //     component: paymentPort
    // },
    {
        path: "/hardwareInfo",
        sidebarName: "وضعیت سخت افزار",
        navbarName: "وضعیت سخت افزار",
        icon: BubbleChart ,
        component: hardwareInfo
    },

    // {
    //     path: "/StuffManager",
    //     sidebarName: "مدیریت محصولات",
    //     navbarName: "مدیریت محصولات",
    //     icon: "content_paste",
    //     component: StuffManager
    // },
    // {
    //     path: "/user",
    //     sidebarName: "User Profile",
    //     navbarName: "Profile",
    //     icon: Dashboard,
    //     component: UserProfile
    // },

    // {
    //     path: "/typography",
    //     sidebarName: "Typography",
    //     navbarName: "Typography",
    //     icon: LibraryBooks,
    //     component: Typography
    // },
    // {
    //     path: "/icons",
    //     sidebarName: "Icons",
    //     navbarName: "Icons",
    //     icon: BubbleChart,
    //     component: Icons
    // },
    // {
    //     path: "/maps",
    //     sidebarName: "Maps",
    //     navbarName: "Map",
    //     icon: LocationOn,
    //     component: Maps
    // },
    // {
    //     path: "/notifications",
    //     sidebarName: "Notifications",
    //     navbarName: "Notifications",
    //     icon: Notifications,
    //     component: NotificationsPage
    // },
    {redirect: true, path: "/", to: "/ProductCategoryAttribute", navbarName: "Redirect"}
];

export default dashboardRoutes;
