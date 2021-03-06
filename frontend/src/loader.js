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
getScript(vendorPath + '/pubsub-js/pubsub.js');
getScript(vendorPath + '/jquery/jquery.js');
getScript(vendorPath + '/jquery-powertip-dist/jquery.powertip.js');
getScript(vendorPath + '/jQuery.dotdotdot/jquery.dotdotdot.js');
getScript(vendorPath + '/angular/angular.js');
getScript(vendorPath + '/angular-ui-router/angular-ui-router.js');
getScript(vendorPath + '/angular-sanitize/angular-sanitize.js');
getScript(vendorPath + '/angular-animate/angular-animate.js');
getScript(vendorPath + '/nprogress/nprogress.js');
getScript(vendorPath + '/ng-tags-input/ng-tags-input.min.js');

//Common src resources
getStyleSheet(srcPath + '/loader.less');
getScript(srcPath + '/common/index.js');
getScript(srcPath + '/common/constants.js');
getScript(srcPath + '/common/templates.js');
getScript(srcPath + '/common/http.js');
getScript(srcPath + '/common/session.js');
getScript(srcPath + '/common/pubSub.js');
getScript(srcPath + '/common/loading.js');
getScript(srcPath + '/common/browser.js');
getScript(srcPath + '/common/analytics.js');
getScript(srcPath + '/common/login/login.js');
getScript(srcPath + '/common/pageNotFound/pageNotFoundCtrl.js');
getScript(srcPath + '/common/browserNotSupported/browserNotSupportedCtrl.js');

//Business logic src resources
//PORTAL
getScript(srcPath + '/portal/portal.js');
getScript(srcPath + '/portal/PortalCtrl.js');
//Home
getScript(srcPath + '/portal/home/HomeCtrl.js');
getScript(srcPath + '/portal/howItWorks/HowItWorksCtrl.js');
getScript(srcPath + '/portal/contact/ContactCtrl.js');
//APP
getScript(srcPath + '/app/app.js');
getScript(srcPath + '/app/AppCtrl.js');
getScript(srcPath + '/app/common/question/BaseQuestionCtrl.js');
getScript(srcPath + '/app/common/upload/upload.js');
getScript(srcPath + '/app/common/upload/fileModel.js');
getScript(srcPath + '/app/common/title/title.js');
getScript(srcPath + '/app/common/truncate/truncate.js');
getScript(srcPath + '/app/common/audio/audio.js');
getScript(srcPath + '/app/common/autoComplete/autoComplete.js');
//Menu
getScript(srcPath + '/app/menu/menu.js');
getScript(srcPath + '/app/menu/panel/menuPanel.js');
getScript(srcPath + '/app/menu/testData/testData.js');
//Dialog
getScript(srcPath + '/app/common/dialog/dialog.js');
//Categories page
getScript(srcPath + '/app/categories/CategoriesCtrl.js');
//Review page
getScript(srcPath + '/app/review/ReviewCtrl.js');
getScript(srcPath + '/app/review/question/ReviewQuestionCtrl.js');
//Test page
getScript(srcPath + '/app/test/TestCtrl.js');
getScript(srcPath + '/app/test/questions/QuestionsCtrl.js');
getScript(srcPath + '/app/test/results/ResultsCtrl.js');
//Admin pages
getScript(srcPath + '/app/admin/AdminCtrl.js');
getScript(srcPath + '/app/admin/tenants/tenantsApp.js');
getScript(srcPath + '/app/admin/tenants/TenantsCtrl.js');
getScript(srcPath + '/app/admin/tenants/TenantAddCtrl.js');
getScript(srcPath + '/app/admin/tenants/TenantEditCtrl.js');
getScript(srcPath + '/app/admin/tenants/TenantInviteCtrl.js');
getScript(srcPath + '/app/admin/categories/categoriesApp.js');
getScript(srcPath + '/app/admin/categories/CategoriesAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/CategoryAddAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/CategoryEditAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/testsApp.js');
getScript(srcPath + '/app/admin/categories/tests/TestsAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/TestAddAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/TestEditAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/testAdmin.js');
getScript(srcPath + '/app/admin/users/usersApp.js');
getScript(srcPath + '/app/admin/users/UsersAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserAddAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserEditAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserActivateAdminCtrl.js');
getScript(vendorPath + '/less/less.js');