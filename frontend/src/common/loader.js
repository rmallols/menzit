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
getScript(vendorPath + '/pubSub/pubSub.js');
getScript(vendorPath + '/jQuery/jquery-2.1.1.min.js');
getScript(vendorPath + '/jQuery/powerTip/jquery.powertip.min.js');
getScript(vendorPath + '/jQuery/dotdotdot/jquery.dotdotdot.min.js');
getScript(vendorPath + '/angularJs/angular.min.js');
getScript(vendorPath + '/angularJs/angular-ui-router.min.js');
getScript(vendorPath + '/angularJs/angular-animate.min.js');

//Common src resources
getScript(srcPath + '/common/index.js');
getScript(srcPath + '/common/http.js');
getScript(srcPath + '/common/session.js');
getScript(srcPath + '/common/pubSub.js');
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
getScript(srcPath + '/app/common/upload/upload.js');
getScript(srcPath + '/app/common/title/title.js');
getScript(srcPath + '/app/common/truncate/truncate.js');
//Menu
getScript(srcPath + '/app/menu/menu.js');
getScript(srcPath + '/app/menu/testData/testData.js');
//Dialog
getScript(srcPath + '/app/common/dialog/dialog.js');
//Categories page
getScript(srcPath + '/app/categories/CategoriesCtrl.js');
//Test page
getScript(srcPath + '/app/test/TestCtrl.js');
getScript(srcPath + '/app/test/questions/QuestionsCtrl.js');
getScript(srcPath + '/app/test/results/ResultsCtrl.js');
//Admin pages
getScript(srcPath + '/app/admin/AdminCtrl.js');
getScript(srcPath + '/app/admin/tenant/tenantApp.js');
getScript(srcPath + '/app/admin/tenant/TenantCtrl.js');
getScript(srcPath + '/app/admin/categories/categoriesApp.js');
getScript(srcPath + '/app/admin/categories/CategoriesAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/CategoryAddAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/CategoryEditAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/testsApp.js');
getScript(srcPath + '/app/admin/categories/tests/TestsAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/TestAddAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/TestEditAdminCtrl.js');
getScript(srcPath + '/app/admin/users/usersApp.js');
getScript(srcPath + '/app/admin/users/UsersAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserAddAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserEditAdminCtrl.js');
getScript(vendorPath + '/less/less.min.js');