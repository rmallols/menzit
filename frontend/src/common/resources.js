'use strict';

var less;

function getScript(url) {
    document.write('<script type="text/javascript" src="' + url + '"></script>');
}

function getStyleSheet(url) {
    var fileExtension = url.split('.').pop(), rel = (fileExtension === 'less') ? '/less' : '';
    document.write('<link type="text/css" href="' + url + '" rel="stylesheet' + rel + '" />');
}

var srcPath = '/src', vendorPath = '/vendor/';

//External libraries
getScript(vendorPath + '/jQuery/jquery-2.1.1.min.js');
getScript(vendorPath + '/angularJs/angular.min.js');
getScript(vendorPath + '/angularJs/angular-ui-router.min.js');

//Common src resources
getScript(srcPath + '/common/index.js');
getScript(srcPath + '/common/http.js');
getScript(srcPath + '/common/session.js');
getStyleSheet(srcPath + '/common/loader.less');

//Business logic src resources
//PORTAL
getScript(srcPath + '/portal/portal.js');
getScript(srcPath + '/portal/PortalCtrl.js');
//Home
getScript(srcPath + '/portal/home/HomeCtrl.js');
//APP
getScript(srcPath + '/app/app.js');
getScript(srcPath + '/app/AppCtrl.js');
//Menu
getScript(srcPath + '/app/menu/menu.js');
//Dialog
getScript(srcPath + '/app/dialog/dialog.js');
//Categories page
getScript(srcPath + '/app/categories/CategoriesCtrl.js');
//Question page
getScript(srcPath + '/app/question/QuestionCtrl.js');
//Admin pages
getScript(srcPath + '/app/admin/adminApp.js');
getScript(srcPath + '/app/admin/AdminCtrl.js');
getScript(srcPath + '/app/admin/tenant/TenantCtrl.js');
getScript(srcPath + '/app/admin/categories/CategoriesAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/CategoryAddAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/CategoryEditAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UsersAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserAddAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserEditAdminCtrl.js');
getScript(vendorPath + '/less/less.min.js');