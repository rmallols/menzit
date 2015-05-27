'use strict';

var less;

function getScript(url) {
    document.write('<script type="text/javascript" src="' + url + '"></script>');
}

function getStyleSheet(url) {
    var fileExtension = url.split('.').pop(), rel = (fileExtension === 'less') ? '/less' : '';
    document.write('<link type="text/css" href="' + url + '" rel="stylesheet' + rel + '" />');
}

var srcPath = '/src', distPath = '/dist/';

//Vendor resources
getStyleSheet(distPath + '/css.css');
getScript(distPath + '/vendor.min.js');

//Common src resources
getScript(srcPath + '/common/index.js');
getScript(srcPath + '/common/constants.js');
getScript(srcPath + '/common/templates.js');
getScript(srcPath + '/common/button.js');
getScript(srcPath + '/common/http.js');
getScript(srcPath + '/common/session.js');
getScript(srcPath + '/common/pubSub.js');
getScript(srcPath + '/common/loading.js');
getScript(srcPath + '/common/browser.js');
getScript(srcPath + '/common/onTouch.js');
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
getScript(srcPath + '/app/common/question/BaseTestCtrl.js');
getScript(srcPath + '/app/common/question/BaseQuestionCtrl.js');
getScript(srcPath + '/app/common/question/BaseQuizQuestionCtrl.js');
getScript(srcPath + '/app/common/question/BaseSpeechQuestionCtrl.js');
getScript(srcPath + '/app/common/review/BaseReviewQuestionCtrl.js');
getScript(srcPath + '/app/common/image/upload.js');
getScript(srcPath + '/app/common/image/fileModel.js');
getScript(srcPath + '/app/common/title/title.js');
getScript(srcPath + '/app/common/truncate/truncate.js');
getScript(srcPath + '/app/common/audio/player/audio.js');
getScript(srcPath + '/app/common/audio/uploader/graph.js');
getScript(srcPath + '/app/common/audio/uploader/jquery.voice.js');
getScript(srcPath + '/app/common/audio/uploader/record.js');
getScript(srcPath + '/app/common/audio/uploader/recorder.js');
getScript(srcPath + '/app/common/audio/uploader/recorderWorker.js');
getScript(srcPath + '/app/common/audio/uploader/upload.js');
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
getScript(srcPath + '/app/review/quiz/ReviewQuestionQuizCtrl.js');
getScript(srcPath + '/app/review/speech/ReviewQuestionSpeechCtrl.js');
//Test page
getScript(srcPath + '/app/test/quiz/TestQuizCtrl.js');
getScript(srcPath + '/app/test/quiz/QuestionsQuizCtrl.js');
getScript(srcPath + '/app/test/speech/TestSpeechCtrl.js');
getScript(srcPath + '/app/test/speech/QuestionsSpeechCtrl.js');
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
getScript(srcPath + '/app/admin/categories/tests/testAdmin.js');
getScript(srcPath + '/app/admin/categories/tests/quiz/QuizTestAddAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/quiz/QuizTestEditAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/speech/SpeechTestAddAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/speech/SpeechTestEditAdminCtrl.js');
getScript(srcPath + '/app/admin/categories/tests/question/questionAdmin.js');
getScript(srcPath + '/app/admin/users/usersApp.js');
getScript(srcPath + '/app/admin/users/UsersAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserAddAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserEditAdminCtrl.js');
getScript(srcPath + '/app/admin/users/UserActivateAdminCtrl.js');