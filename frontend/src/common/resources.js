var less;
(function () {
    'use strict';

    function getScript(url) {
        document.write('<script type="text/javascript" src="' + url + '"></script>');
    }

    function getStyleSheet(url) {
        var fileExtension = url.split('.').pop(), rel = (fileExtension === 'less') ? '/less' : '';
        document.write('<link type="text/css" href="' + url + '" rel="stylesheet' + rel + '" />');
    }

    var srcPath = '../../src', vendorPath = '../../vendor/';

    //External libraries
    getScript(vendorPath + '/angularJs/angular.min.js');
    getScript(vendorPath + '/angularJs/angular-ui-router.min.js');

    //Common src resources
    getScript(srcPath + '/common/app.js');
    getStyleSheet(srcPath + '/common/main.less');

    //Business logic src resources
    //Home page
    getScript(srcPath + '/app/home/HomeCtrl.js');
    getScript(srcPath + '/app/home/helloWorldDirective.js');
    getScript(srcPath + '/app/home/helloWorldService.js');
    //Categories page
    getScript(srcPath + '/app/categories/CategoriesCtrl.js');
    //Question page
    getScript(srcPath + '/app/question/QuestionCtrl.js');

    //Less vendor library (has to be loaded at the end of the stylesheet chain
    less = {
        env: "development",
        logLevel: 0
    };
    getScript(vendorPath + '/less/less.min.js');
})();