angular.module('templates-main', ['admin.html', 'categoriesAdmin.html', 'categoryAdmin.html', 'testAdmin.html', 'testsAdmin.html', 'tenant.html', 'tenantInvite.html', 'tenants.html', 'userAdmin.html', 'usersAdmin.html', 'app.html', 'categories.html', 'audio.html', 'audioUpload.html', 'autoComplete.html', 'dialog.html', 'imageUpload.html', 'question.html', 'menu.html', 'menuPanel.html', 'testData.html', 'review.html', 'results.html', 'test.html', 'browserNotSupported.html', 'login.html', 'pageNotFound.html', 'index.html', 'contact.html', 'home.html', 'howItWorks.html', 'portal.html', 'test.html']);

angular.module("admin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin.html",
    "<div class=\"admin-view\">\n" +
    "    <div ui-view></div>\n" +
    "</div>");
}]);

angular.module("categoriesAdmin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("categoriesAdmin.html",
    "<div class=\"categories-admin-view\">\n" +
    "    <div class=\"cf\">\n" +
    "        <h1 class=\"float-left\">Manage categories</h1>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button class=\"important\" ng-click=\"add()\">Add</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"category\" ng-repeat=\"category in categories\">\n" +
    "        <div class=\"float-left\">\n" +
    "            {{category.title}}\n" +
    "        </div>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button>\n" +
    "                <icon class=\"up-icon\"></icon>\n" +
    "            </button>\n" +
    "            <button>\n" +
    "                <icon class=\"down-icon\"></icon>\n" +
    "            </button>\n" +
    "            <button ng-click=\"edit(category)\">Edit</button>\n" +
    "            <button class=\"important\" ng-click=\"viewTests(category)\">View tests</button>\n" +
    "            <button class=\"delete\" ng-click=\"confirmDelete(category)\">Delete</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div dialog mz-if=\"categoryToBeDeleted\" title=\"Delete category\">\n" +
    "        <label class=\"warning\">Warning</label><br/>\n" +
    "        The following category and all the tests attached to it will be deleted<br/><br/>\n" +
    "        <b>{{categoryToBeDeleted.title}}</b><br/><br/>\n" +
    "        <button class=\"delete\" ng-click=\"delete()\">Delete</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("categoryAdmin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("categoryAdmin.html",
    "<div class=\"category-view\">\n" +
    "    <div class=\"cf\">\n" +
    "        <h1 class=\"float-left\">{{title}}</h1>\n" +
    "\n" +
    "        <div class=\"float-right\">\n" +
    "            <button class=\"important\" ng-click=\"submit()\">Save</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"cf\">\n" +
    "        <div class=\"l-1-3 input-label\">Name</div>\n" +
    "        <div class=\"l-2-3\"><input type=\"text\" ng-model=\"category.title\"/></div>\n" +
    "    </div>\n" +
    "    <div class=\"cf\">\n" +
    "        <div class=\"l-1-2 input-label\">Image</div>\n" +
    "        <div class=\"l-1-2\">\n" +
    "            <image-upload ng-model=\"category.media\" on-submit-request=\"uploadRequestFn\"></image-upload>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("testAdmin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("testAdmin.html",
    "<div class=\"test-view\">\n" +
    "    <div class=\"cf\">\n" +
    "        <h1 class=\"float-left\">{{title}}</h1>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button class=\"important\" ng-click=\"submit()\">Save</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"cf\">\n" +
    "        <div class=\"test-question cf\">\n" +
    "            <div class=\"l-row\">\n" +
    "                <div class=\"l-1-4 input-label\">Question</div>\n" +
    "                <div class=\"l-3-4\"><input type=\"text\" ng-model=\"test.question.text\"/></div>\n" +
    "            </div>\n" +
    "            <div class=\"l-row\">\n" +
    "                <div class=\"l-1-4 input-label\">Image</div>\n" +
    "                <div class=\"l-3-4\">\n" +
    "                    <image-upload ng-model=\"test.question.media\" on-submit-request=\"uploadImageQuestionRequestFn\"></image-upload>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"l-row\">\n" +
    "                <div class=\"l-1-4 input-label\">Audio</div>\n" +
    "                <div class=\"l-3-4\">\n" +
    "                    <audio-upload ng-model=\"test.question.audio\"\n" +
    "                                  on-submit-request=\"uploadAudioQuestionRequestFn\"\n" +
    "                                  source-text=\"test.question.text\">\n" +
    "                    </audio-upload>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "        <div>\n" +
    "            <div class=\"test-answer l-1-2 cf\" ng-repeat=\"answer in test.answers\"\n" +
    "                 ng-class=\"{ 'correct-option': $parent.correctOptionIndex === $index }\">\n" +
    "                <div class=\"l-row\">\n" +
    "                    <div class=\"l-1-4 input-label\">Answer {{$index + 1}}</div>\n" +
    "                    <div class=\"l-3-4\"><input type=\"text\" ng-model=\"answer.title\"/></div>\n" +
    "                </div>\n" +
    "                <div class=\"l-row\">\n" +
    "                    <div class=\"l-1-4 input-label\">Explanation</div>\n" +
    "                    <div class=\"l-3-4\">\n" +
    "                        <input type=\"text\" ng-model=\"answer.explanation\"\n" +
    "                               ng-disabled=\"$index == $parent.correctOptionIndex\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"l-row\">\n" +
    "                    <div class=\"l-1-4 input-label\">Image</div>\n" +
    "                    <div class=\"l-3-4\">\n" +
    "                        <image-upload ng-model=\"answer.media\" on-submit-request=\"uploadAnswerRequestFns[$index]\"></image-upload>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"l-row select-correct\">\n" +
    "                    <button ng-click=\"$parent.correctOptionIndex = $index\">Mark as correct answer</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("testsAdmin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("testsAdmin.html",
    "<div class=\"tests-view\">\n" +
    "    <div class=\"cf\">\n" +
    "        <h1 class=\"float-left\">Tests for category {{category.title}}</h1>\n" +
    "\n" +
    "        <div class=\"float-right\">\n" +
    "            <button class=\"important\" ng-click=\"add()\">Add</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!tests.length\" class=\"msg msg-info\">\n" +
    "        There aren't tests on this category yet.\n" +
    "        Click on the 'Add' button to attach a new test to it.\n" +
    "    </div>\n" +
    "    <div class=\"test\" ng-if=\"tests.length\" ng-repeat=\"test in tests\">\n" +
    "        <div class=\"text float-left\">\n" +
    "            <div class=\"l-1-2\" truncate>\n" +
    "                {{test.question.text}}\n" +
    "            </div>\n" +
    "            <div class=\"l-1-2\">\n" +
    "                <div ng-repeat=\"answer in test.answers\" truncate title=\"{{answer.title}}\"\n" +
    "                     ng-class=\"{ correct: answer.isCorrect }\"\n" +
    "                     class=\"answer l-1-{{test.answers.length}} t{{$index}}\">\n" +
    "                    {{answer.title}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button>\n" +
    "                <icon class=\"up-icon\"></icon>\n" +
    "            </button>\n" +
    "            <button>\n" +
    "                <icon class=\"down-icon\"></icon>\n" +
    "            </button>\n" +
    "            <button ng-click=\"edit(test)\">Edit</button>\n" +
    "            <button class=\"delete\" ng-click=\"confirmDelete(test)\">Delete</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div dialog mz-if=\"testToBeDeleted\" title=\"Delete test\">\n" +
    "        <label class=\"warning\">Warning</label><br/>\n" +
    "        The following test will be deleted<br/><br/>\n" +
    "        <b>{{testToBeDeleted.question.text}}</b><br/><br/>\n" +
    "        <button class=\"delete\" ng-click=\"delete()\">Delete</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("tenant.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tenant.html",
    "<div class=\"tenant-view\">\n" +
    "    <div class=\"cf\">\n" +
    "        <h1 class=\"float-left\">{{title}}</h1>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button ng-click=\"submit()\" class=\"important\">Save</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"cf\">\n" +
    "        <div class=\"l-1-3 input-label\">Name</div>\n" +
    "        <div class=\"l-2-3\"><input type=\"text\" ng-model=\"tenant.name\"/></div>\n" +
    "    </div>\n" +
    "    <div class=\"cf\">\n" +
    "        <div class=\"l-1-3 input-label\">Categories</div>\n" +
    "        <div class=\"l-2-3\">\n" +
    "            <div auto-complete\n" +
    "                 ng-model=\"tenant.categories\"\n" +
    "                 endpoint=\"/rest/categories\"\n" +
    "                 display-property=\"title\">\n" +
    "             </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"cf\">\n" +
    "        <div class=\"l-1-3 input-label\">Image</div>\n" +
    "        <div class=\"l-2-3\">\n" +
    "            <image-upload ng-model=\"tenant.media\" on-submit-request=\"uploadRequestFn\"></image-upload>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("tenantInvite.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tenantInvite.html",
    "<h1>Invite users</h1>\n" +
    "<p>Add a comma separated list of users who will have access to your menzit's group.</p>\n" +
    "<p><textarea ng-model=\"users\" ng-change=\"parseUsers(users)\" autofocus></textarea></p>\n" +
    "<p class=\"cf\">\n" +
    "    <button ng-click=\"submit(usersList, isListValid)\" class=\"float-right\" ng-disabled=\"!users\">\n" +
    "        Send invitation\n" +
    "    </button>\n" +
    "</p>\n" +
    "<p>\n" +
    "    <div class=\"msg msg-error\" ng-show=\"showError\">\n" +
    "        The list of emails you attached is not valid. Please review it and try again afterwards.\n" +
    "    </div>\n" +
    "</p>");
}]);

angular.module("tenants.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tenants.html",
    "<div class=\"tenants-view\">\n" +
    "    <div class=\"cf\">\n" +
    "        <h1 class=\"float-left\">Manage tenants</h1>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button class=\"important\" ng-click=\"add()\">Add</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"tenant\" ng-repeat=\"tenant in tenants\">\n" +
    "        <div class=\"float-left\">\n" +
    "            {{tenant.name}}\n" +
    "        </div>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button>\n" +
    "                <icon class=\"up-icon\"></icon>\n" +
    "            </button>\n" +
    "            <button>\n" +
    "                <icon class=\"down-icon\"></icon>\n" +
    "            </button>\n" +
    "            <button ng-click=\"invite(tenant)\" class=\"important\">Invite users</button>\n" +
    "            <button ng-click=\"edit(tenant)\">Edit</button>\n" +
    "            <button class=\"delete\" ng-click=\"confirmDelete(tenant)\">Delete</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div dialog mz-if=\"tenantToBeDeleted\" title=\"Delete tenant\">\n" +
    "        <label class=\"warning\">Warning</label><br/>\n" +
    "        The following tenants will be deleted<br/><br/>\n" +
    "        <b>{{tenantToBeDeleted.title}}</b><br/><br/>\n" +
    "        <button class=\"delete\" ng-click=\"delete()\">Delete</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("userAdmin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("userAdmin.html",
    "<form class=\"user-view cf\" name=\"userForm\">\n" +
    "    <div class=\"l-row\">\n" +
    "        <div  class=\"float-left\">\n" +
    "            <h1>{{title}}</h1>\n" +
    "            <p ng-if=\"description\">{{description}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button class=\"important\" ng-click=\"userForm.$valid && submit()\">Save</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"l-1-2\">\n" +
    "        <div class=\"l-row\">\n" +
    "            <div class=\"l-1-2 input-label\">First name</div>\n" +
    "            <div class=\"l-1-2\"><input type=\"text\" ng-model=\"user.firstName\" required/></div>\n" +
    "        </div>\n" +
    "        <div class=\"l-row\">\n" +
    "            <div class=\"l-1-2 input-label\">Last name</div>\n" +
    "            <div class=\"l-1-2\"><input type=\"text\" ng-model=\"user.lastName\"/></div>\n" +
    "        </div>\n" +
    "        <div class=\"l-row\">\n" +
    "            <div class=\"l-1-2 input-label\">Email</div>\n" +
    "            <div class=\"l-1-2\"><input type=\"text\" ng-model=\"user.email\" required/></div>\n" +
    "        </div>\n" +
    "        <div class=\"l-row\">\n" +
    "            <div class=\"l-1-2 input-label\">Username</div>\n" +
    "            <div class=\"l-1-2\"><input type=\"text\" ng-model=\"user.userName\" required/></div>\n" +
    "        </div>\n" +
    "        <div class=\"l-row\">\n" +
    "            <div class=\"l-1-2 input-label\">Password</div>\n" +
    "            <div class=\"l-1-2\">\n" +
    "                <a href=\"#\"\n" +
    "                   ng-show=\"showForceChangePasswordLink\"\n" +
    "                   ng-click=\"forceChangePassword()\"\n" +
    "                   class=\"input-label text-align-left display-inline-block\">\n" +
    "                    Change\n" +
    "                </a>\n" +
    "                <input type=\"password\" ng-if=\"!showForceChangePasswordLink\" ng-model=\"user.password\" required/>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"l-row\" ng-if=\"hideAdminOptions !== true\">\n" +
    "            <div class=\"l-1-2 input-label\">Role</div>\n" +
    "            <div class=\"l-1-2\">\n" +
    "                <select ng-model=\"user.role\" ng-options=\"role._id as role.name for role in roles\"></select>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"l-row\" ng-if=\"hideAdminOptions !== true\">\n" +
    "            <div class=\"l-1-2 input-label\">Tenant</div>\n" +
    "            <div class=\"l-1-2\">\n" +
    "                <div auto-complete\n" +
    "                     ng-model=\"user.tenantId\"\n" +
    "                     endpoint=\"/rest/tenants\"\n" +
    "                     display-property=\"name\"\n" +
    "                     single-selection=\"true\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"l-1-2\">\n" +
    "        <div class=\"l-row\">\n" +
    "            <div class=\"l-1-2 input-label\">Image</div>\n" +
    "            <div class=\"l-1-2\">\n" +
    "                <image-upload ng-model=\"user.media\" on-submit-request=\"uploadRequestFn\"></image-upload>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("usersAdmin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("usersAdmin.html",
    "<div class=\"users-view\">\n" +
    "    <div class=\"cf\">\n" +
    "        <h1 class=\"float-left\">Manage users</h1>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button class=\"important\" ng-click=\"add()\">Add</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"user\" ng-repeat=\"user in users\">\n" +
    "        <div class=\"float-left v-centered\">\n" +
    "            {{user.userName}}\n" +
    "        </div>\n" +
    "        <div class=\"float-right\">\n" +
    "            <button>\n" +
    "                <icon class=\"up-icon\"></icon>\n" +
    "            </button>\n" +
    "            <button>\n" +
    "                <icon class=\"down-icon\"></icon>\n" +
    "            </button>\n" +
    "            <button ng-click=\"edit(user)\">Edit</button>\n" +
    "            <button class=\"delete\" ng-click=\"confirmDelete(user)\">Delete</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div dialog mz-if=\"userToBeDeleted\" title=\"Delete user\">\n" +
    "        <label class=\"warning\">Warning</label><br/>\n" +
    "        The following user will be deleted<br/><br/>\n" +
    "        <b>{{userToBeDeleted.userName}}</b><br/><br/>\n" +
    "        <button class=\"delete\" ng-click=\"delete()\">Delete</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app.html",
    "<div ng-class=\"getPageStyleClasses()\">\n" +
    "    <div menu></div>\n" +
    "    <div ui-view class=\"main-content\"></div>\n" +
    "</div>");
}]);

angular.module("categories.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("categories.html",
    "<div>\n" +
    "    <h1>Select a category to play with</h1>\n" +
    "    <div class=\"category l-1-3\" ng-repeat=\"category in categories\" truncate\n" +
    "         ng-click=\"launchTest(category)\"\n" +
    "         ng-style=\"getBackgroundImageStyle(category)\">\n" +
    "        <div class=\"title\">{{category.title}}</div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("audio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("audio.html",
    "<div class=\"audio\">\n" +
    "    <button ng-click=\"play()\" class=\"big audio-button\">\n" +
    "        <icon class=\"mic-icon\"></icon>\n" +
    "    </button>\n" +
    "    <audio controls class=\"audio-player\">\n" +
    "        <source type=\"audio/wav\">\n" +
    "    </audio>\n" +
    "</div>");
}]);

angular.module("audioUpload.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("audioUpload.html",
    "<div class=\"audio-upload-view cf\">\n" +
    "    <select ng-model=\"selectedAudioOption\"\n" +
    "            ng-class=\"{'select-audio-by-machine': selectedAudioOption === 0, 'select-audio-by-human': selectedAudioOption === 1}\"\n" +
    "            ng-change=\"onSelectedAudioOptionChange(selectedAudioOption)\"\n" +
    "            ng-options=\"audioOption.value as audioOption.text for audioOption in audioOptions\">\n" +
    "    </select>\n" +
    "    <div class=\"button-group\" ng-if=\"selectedAudioOption === 0 || selectedAudioOption === 1\">\n" +
    "        <button ng-click=\"startRecording()\" ng-show=\"!recording && selectedAudioOption === 1\">Record audio</button>\n" +
    "        <button ng-click=\"stopRecording()\" ng-show=\"recording\">Stop recording</button>\n" +
    "        <div audio=\"media._id\"\n" +
    "             type=\"url\"\n" +
    "             ng-if=\"media._id && !recordedAudio.base64 && !recordedAudio && !recording\"\n" +
    "             before-play=\"reEvaluateExternalAudio()\"></div>\n" +
    "        <div audio=\"recordedAudio.base64\"\n" +
    "             type=\"inline\"\n" +
    "             ng-if=\"recordedAudio.base64 && (selectedAudioOption === 0 || (recordedAudio && !recording))\"\n" +
    "             before-play=\"reEvaluateExternalAudio()\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("autoComplete.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("autoComplete.html",
    "<tags-input\n" +
    "        ng-model=\"tags\"\n" +
    "        display-property=\"{{displayProperty}}\"\n" +
    "        max-tags=\"{{maxTags}}\"\n" +
    "        on-tag-added=\"onTagAdded($tag)\"\n" +
    "        placeholder=\"{{placeholder}}\"\n" +
    "        ng-class=\"{ 'single-selection': singleSelection }\">\n" +
    "    <auto-complete\n" +
    "        source=\"source($query)\"\n" +
    "        min-length=\"1\"\n" +
    "        load-on-down-arrow=\"true\">\n" +
    "    </auto-complete>\n" +
    "</tags-input>");
}]);

angular.module("dialog.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dialog.html",
    "<div class=\"dialog\" ng-if=\"mzIf\">\n" +
    "    <div class=\"overlay\" ng-click=\"hideDialog()\"></div>\n" +
    "    <div class=\"dialog-box\" centered ng-style=\"centerBox()\">\n" +
    "        <div class=\"dialog-box-header\">\n" +
    "            <h2 class=\"dialog-box-title\">{{title}}</h2>\n" +
    "            <button ng-click=\"hideDialog()\"><icon class=\"close-icon\"></icon></button>\n" +
    "        </div>\n" +
    "        <div ng-transclude class=\"dialog-box-content\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("imageUpload.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("imageUpload.html",
    "<div class=\"image-upload-view cf\">\n" +
    "    <input type=\"file\" file-model=\"selectedFile\"/>\n" +
    "    <div class=\"upload-button cf\">\n" +
    "        <div class=\"upload-button-output\" ng-if=\"(media._id || base64) && !toBeDeleted\">\n" +
    "            <button class=\"delete-image\" ng-click=\"remove()\">\n" +
    "                <icon class=\"close-icon\"></icon>\n" +
    "            </button>\n" +
    "            <img ng-src=\"/media/{{media._id}}?rnd={{refreshToken}}\" ng-if=\"media._id && !base64\" />\n" +
    "            <img ng-src=\"{{base64}}\" ng-if=\"base64\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("question.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("question.html",
    "<div class=\"question-view\">\n" +
    "    <div class=\"question\"\n" +
    "         ng-class=\"getQuestionStyleClasses(question.question)\"\n" +
    "         ng-style=\"getBackgroundMediaStyle(question.question.media)\">\n" +
    "        {{question.question.text}}\n" +
    "        <div audio=\"question.question.text\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"answers-container\">\n" +
    "        <div ng-repeat=\"answer in question.answers\"\n" +
    "             class=\"answer l-answer-{{question.answers.length}}\"\n" +
    "             ng-class=\"getAnswerStyleClasses(answer)\"\n" +
    "             ng-style=\"getBackgroundMediaStyle(answer)\"\n" +
    "             ng-click=\"setAnswer(question, $index)\">\n" +
    "            <div class=\"option\"><div class=\"text\">{{answerCodes[$index]}}</div></div>\n" +
    "            <div ng-if=\"answer.validAssert || answer.invalidAssert\" class=\"assert-mark\"\n" +
    "                ng-class=\"{ 'has-explanation': answer.explanation }\">\n" +
    "                <icon ng-class=\"{ 'ok-icon': answer.validAssert,  'fail-icon': answer.invalidAssert }\"></icon>\n" +
    "            </div>\n" +
    "            <div class=\"title\">{{answer.title}}</div>\n" +
    "            <div class=\"explanation\">{{answer.explanation}}</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("menu.html",
    "<div class=\"menu-view\">\n" +
    "    <div class=\"menu-tenant\">\n" +
    "        <a ui-sref=\"app.categories\">\n" +
    "            <img class=\"menu-tenant-logo\" ng-src=\"{{getTenantLogo()}}\" />\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div ng-include=\"'testData.html'\" ng-controller=\"TestDataCtrl\"></div>\n" +
    "    <menu-panel is-active=\"isPanelActive\"></menu-panel>\n" +
    "    <button class=\"menu-login-button\" ng-click=\"showLoginDialog()\" ng-if=\"!session\">Login</button>\n" +
    "    <button ng-click=\"toggleActiveMenuPanel()\" ng-if=\"session\">\n" +
    "        <icon class=\"menu-icon\"></icon>\n" +
    "    </button>\n" +
    "    <login visible=\"isLoginVisible\"></login>\n" +
    "</div>\n" +
    "");
}]);

angular.module("menuPanel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("menuPanel.html",
    "<div>\n" +
    "    <div class=\"overlay menu-panel-overlay\" ng-click=\"hideMenuPanel()\" ng-show=\"isActive\"></div>\n" +
    "    <div class=\"menu-panel\" ng-class=\"{ 'is-active': isActive }\">\n" +
    "        <a ui-sref=\"app.admin.editUser({ userId: session._id, current: 'current' })\" class=\"menu-panel-item menu-current-user cf\"\n" +
    "           ng-class=\"isActiveItem('current')\">\n" +
    "            <img class=\"menu-current-user-icon menu-panel-item-icon\" ng-src=\"/media/{{session.media._id}}\" />\n" +
    "            <h4 class=\"menu-panel-item-title\">{{getUserName(session)}}</h4>\n" +
    "        </a>\n" +
    "        <hr class=\"menu-panel-separator\"/>\n" +
    "        <a ui-sref=\"app.categories\" class=\"menu-panel-item cf\" ng-class=\"isActiveItem('categories')\">\n" +
    "            <icon class=\"play-icon menu-panel-item-icon\"></icon>\n" +
    "            <h4 class=\"menu-panel-item-title\">Play</h4>\n" +
    "        </a>\n" +
    "        <a ui-sref=\"app.review\" class=\"menu-panel-item cf\" ng-class=\"isActiveItem('review')\">\n" +
    "            <icon class=\"review-icon menu-panel-item-icon\"></icon>\n" +
    "            <h4 class=\"menu-panel-item-title\">Review</h4>\n" +
    "        </a>\n" +
    "        <hr class=\"menu-panel-separator\"/>\n" +
    "        <h5 class=\"menu-panel-header\">Admin</h5>\n" +
    "        <a ui-sref=\"app.admin.tenants\" class=\"menu-panel-item cf\" ng-class=\"isActiveItem('adminTenants')\">\n" +
    "            <icon class=\"settings-general-icon menu-panel-item-icon\"></icon>\n" +
    "            <h4 class=\"menu-panel-item-title\">General</h4>\n" +
    "        </a>\n" +
    "        <a ui-sref=\"app.admin.categories\" class=\"menu-panel-item cf\" ng-class=\"isActiveItem('adminTests')\">\n" +
    "            <icon class=\"settings-tests-icon menu-panel-item-icon\"></icon>\n" +
    "            <h4 class=\"menu-panel-item-title\">Tests</h4>\n" +
    "        </a>\n" +
    "        <a ui-sref=\"app.admin.users\" class=\"menu-panel-item cf\" ng-class=\"isActiveItem('adminUsers')\">\n" +
    "            <icon class=\"settings-users-icon menu-panel-item-icon\"></icon>\n" +
    "            <h4 class=\"menu-panel-item-title\">Users</h4>\n" +
    "        </a>\n" +
    "        <hr class=\"menu-panel-separator\"/>\n" +
    "        <a href=\"#\" ng-click=\"logout()\" class=\"menu-panel-item cf\">\n" +
    "            <icon class=\"sign-out-icon menu-panel-item-icon\"></icon>\n" +
    "            <h4 class=\"menu-panel-item-title\">Sign out</h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("testData.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("testData.html",
    "<div class=\"test-data-view\" ng-if=\"testData\">\n" +
    "    <div class=\"metadata question\">\n" +
    "        <div class=\"title\">Question</div>\n" +
    "        <div class=\"value\">\n" +
    "            {{getCurrentQuestion()}} / {{testData.totalQuestions}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"total-progress\">\n" +
    "        <div class=\"runned-progress\" ng-style=\"setProgressWidth()\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"metadata score\">\n" +
    "        <div class=\"title\">Score</div>\n" +
    "        <div class=\"value\">{{score}}</div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("review.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("review.html",
    "<div class=\"review-view\">\n" +
    "    <h1>Questions to review</h1>\n" +
    "    <div ng-if=\"!questions.length\" class=\"msg msg-info\">\n" +
    "        There aren't more questions to review\n" +
    "    </div>\n" +
    "    <div class=\"incorrect-answer\" ng-repeat=\"question in questions\"\n" +
    "        ng-click=\"reviewQuestion(question.question._id)\">\n" +
    "        <div class=\"l-1-6\">\n" +
    "            {{question.question.question.text}}\n" +
    "        </div>\n" +
    "        <div class=\"l-1-6 incorrect-answer-image\" ng-repeat=\"index in [0,1,2,3]\"\n" +
    "            ng-style=\"getBackgroundImageStyle(question.question.answers[index])\">\n" +
    "        </div>\n" +
    "        <div class=\"l-1-6\">\n" +
    "            {{question.totalIncorrectAnswers}} fails\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("results.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("results.html",
    "<div class=\"results-view\">\n" +
    "    <div class=\"current-score\">\n" +
    "        <div class=\"title\">Your score is</div>\n" +
    "        <div class=\"value\">{{score}}</div>\n" +
    "    </div>\n" +
    "    <div class=\"best-results\" ng-show=\"showBestResults\">\n" +
    "        <h2 class=\"title\">Best results on this test</h2>\n" +
    "        <div class=\"scrolling-area\">\n" +
    "            <div class=\"best-result\" ng-repeat=\"bestResult in bestResults\"\n" +
    "                 ng-class=\"{ current: isCurrentBestResult(bestResult) }\">\n" +
    "                <div class=\"position\">{{$index + 1}}</div>\n" +
    "                <div class=\"userName\">{{bestResult.user.userName}}</div>\n" +
    "                <div class=\"score\">{{bestResult.score}}</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"actions\" ng-show=\"showBestResults\">\n" +
    "        <button ng-click=\"repeatTest()\" class=\"important\">Repeat again</button>\n" +
    "        <button ng-click=\"goToHome()\">Go to home</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("test.html",
    "<div class=\"test-view\">\n" +
    "    <div class=\"fade-animation\" ng-show=\"isTestInProgress\" ng-controller=\"QuestionsCtrl\"\n" +
    "         ng-include=\"'question.html'\" ng-animate></div>\n" +
    "    <div class=\"fade-animation\" ng-show=\"isTestFinished\" ng-controller=\"ResultsCtrl\"\n" +
    "         ng-include=\"'results.html'\" ng-animate></div>\n" +
    "</div>");
}]);

angular.module("browserNotSupported.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("browserNotSupported.html",
    "<div class=\"title\">\n" +
    "    <h1>Ooops...your browser is not a menzit's friend :(</h1>\n" +
    "    <p>menzit uses cutting edge technologies to provide the sexiest user experience possible.</p>\n" +
    "    <p>Your browser doesn't support some of those technologies, BUT we can still help you!</p>\n" +
    "    <p>Try using one of the following browsers, you will experience a better (and safer) browsing experience!</p>\n" +
    "</div>\n" +
    "<div class=\"supported-device-type supported-device-type-mobile-tablet\">\n" +
    "    <h2>On Tablet / Mobile</h2>\n" +
    "    <ul>\n" +
    "        <li>Google Chrome</li>\n" +
    "        <li>Safari</li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "<div class=\"supported-device-type supported-device-type-desktop\">\n" +
    "    <h2>On Desktop</h2>\n" +
    "    <ul>\n" +
    "        <li>Google Chrome</li>\n" +
    "        <li>Safari</li>\n" +
    "        <li>Firefox</li>\n" +
    "        <li>Internet Explorer >= 10</li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login.html",
    "<div dialog title=\"Login\" mz-if=\"visible\" class=\"login\">\n" +
    "    <form ng-submit=\"login()\">\n" +
    "        <div class=\"l-row\">\n" +
    "            <input class=\"user\" ng-model=\"credentials.userName\" type=\"text\"\n" +
    "                   placeholder=\"Username\" autofocus/>\n" +
    "        </div>\n" +
    "        <div class=\"l-row\">\n" +
    "            <input class=\"password\" ng-model=\"credentials.password\" type=\"password\"\n" +
    "                   placeholder=\"Password\"/>\n" +
    "        </div>\n" +
    "        <div class=\"l-row\">\n" +
    "            <div class=\"l-1-2 l-fixed\">\n" +
    "                Remember?\n" +
    "            </div>\n" +
    "            <div class=\"l-1-2 l-fixed\">\n" +
    "                <input class=\"login-checkbox\" ng-model=\"credentials.remember\" type=\"checkbox\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"l-row\">\n" +
    "            <button class=\"important\">Login</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("pageNotFound.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pageNotFound.html",
    "<div class=\"title\">\n" +
    "    <h1>Ooops...we didn't found the page you were looking for :(</h1>\n" +
    "    <p>\n" +
    "        Sorry, this page doesn't exist. To continue playing with menzit, go to the\n" +
    "        <a ui-sref=\"portal.home\">home page</a>\n" +
    "    </p>\n" +
    "</div>");
}]);

angular.module("index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("index.html",
    "<html ng-app=\"menzit\" class=\"ua-{{userAgent}}\">\n" +
    "    <head>\n" +
    "        <title ng-bind=\"pageTitle\"></title>\n" +
    "        <meta name=\"viewport\" content=\"width=device-width\" />\n" +
    "        <link rel=\"icon\" type=\"image/png\" href=\"/src/common/favicon.png\">\n" +
    "        <script src=\"/src/loader.js\" type=\"text/javascript\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "        <div ui-view></div>\n" +
    "    </body>\n" +
    "</html>\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("contact.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("contact.html",
    "<div class=\"contact-view\">\n" +
    "    <div class=\"l-row\">\n" +
    "       <div class=\"l-1-2\">\n" +
    "           <h2>Contact by email</h2>\n" +
    "           You can contact us on the following email address:\n" +
    "           <h2><a href=\"mailto:hi@menzit.com\">hi@menzit.com</a></h2>\n" +
    "       </div>\n" +
    "        <div class=\"l-1-2\">\n" +
    "            <h2>Contact form</h2>\n" +
    "            <form name=\"contactForm\">\n" +
    "                <div class=\"l-row\">\n" +
    "                    <input type=\"email\" ng-model=\"contactData.email\" placeholder=\"Your email\" required />\n" +
    "                </div>\n" +
    "                <div class=\"l-row\">\n" +
    "                    <input type=\"text\" ng-model=\"contactData.subject\" placeholder=\"What do you need help with?\" required />\n" +
    "                </div>\n" +
    "                <div class=\"l-row\">\n" +
    "                    <textarea ng-model=\"contactData.text\" placeholder=\"Additional info\" ></textarea>\n" +
    "                </div>\n" +
    "                <div class=\"l-row\">\n" +
    "                    <button ng-click=\"contactForm.$valid && submitContact()\" class=\"contact-submit\">Submit</button>\n" +
    "                </div>\n" +
    "                <div class=\"l-row\">\n" +
    "                    <div class=\"msg msg-success\" ng-show=\"success\">\n" +
    "                        Thanks for contacting us!<br/>\n" +
    "                        We'll come back to you ASAP.\n" +
    "                    </div>\n" +
    "                    <div class=\"msg msg-error\" ng-show=\"error\">\n" +
    "                        Ooops...sorry, something went wrong :(<br/>\n" +
    "                        Plase contact us on <a href=\"mailto:hi@menzit.com\">hi@menzit.com</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home.html",
    "<div class=\"home-view\">\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"main\">\n" +
    "            <div class=\"title\">\n" +
    "                <h1>Learning has never been so easy!</h1>\n" +
    "            </div>\n" +
    "            <div class=\"media\">\n" +
    "                <img src=\"/src/portal/home/main.svg\" />\n" +
    "            </div>\n" +
    "            <div class=\"action\">\n" +
    "                <button ui-sref=\"app.categories\">Play!</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"secondary\">\n" +
    "            <div class=\"secondary-content cf\">\n" +
    "                <div class=\"l-1-2 secondary-column secondary-learn\">\n" +
    "                    <h1>Learn</h1>\n" +
    "                    <img class=\"secondary-column-image\" src=\"/src/portal/home/learn.svg\" />\n" +
    "                    With Menzit you can easily get new concepts of multiple categories.<br/><br/>\n" +
    "                    We will recommend you what to train according to your interests and skills!\n" +
    "                </div>\n" +
    "                <div class=\"l-1-2 secondary-column secondary-play\">\n" +
    "                    <h1>Play!</h1>\n" +
    "                    <img class=\"secondary-column-image\" src=\"/src/portal/home/play.svg\" />\n" +
    "                    Select a topic an play by answering different questions about it.<br/><br/>\n" +
    "                    Then you get a score, so you can compare your skills with your friends!\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("howItWorks.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("howItWorks.html",
    "<div class=\"how-it-works-view\">\n" +
    "    <div class=\"l-row how-it-works-concept\">\n" +
    "        <div class=\"l-1-2\">\n" +
    "            <h2>1. Select a category</h2>\n" +
    "            Choose a topic which motivates you.<br/><br/>\n" +
    "            We have lots of different subjects to allow you to concentrate on your interests.<br/><br/>\n" +
    "            Let's play!\n" +
    "        </div>\n" +
    "        <div class=\"l-1-2\">\n" +
    "            <img class=\"how-it-works-image\" src=\"/src/portal/howItWorks/category.svg\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"l-row how-it-works-concept\">\n" +
    "        <div class=\"l-1-2 how-it-works-concept-text\">\n" +
    "            <h2>2. Play and learn</h2>\n" +
    "            Improve your skills in a funny way.<br/><br/>\n" +
    "            Answer questions related to the topic you selected.<br/><br/>\n" +
    "            Check those questions you struggle with whenever you want!\n" +
    "        </div>\n" +
    "        <div class=\"l-1-2 how-it-works-concept-image\">\n" +
    "            <img class=\"how-it-works-image\" src=\"/src/portal/howItWorks/play.svg\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"l-row how-it-works-concept\">\n" +
    "        <div class=\"l-1-2\">\n" +
    "            <h2>3. Compare with friends and improve</h2>\n" +
    "            At the end of each test you will get a score</br></br>\n" +
    "            Compare it with your friends and improve your skills by reviewing the important questions afterwards.\n" +
    "        </div>\n" +
    "        <div class=\"l-1-2\">\n" +
    "            <img class=\"how-it-works-image\" src=\"/src/portal/howItWorks/improve.svg\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("portal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("portal.html",
    "<div class=\"portal\" ng-class=\"getPageStyleClass()\">\n" +
    "    <div class=\"header\">\n" +
    "        <div class=\"header-logo\">\n" +
    "            <a ui-sref=\"portal.home\">\n" +
    "                <img src=\"/src/portal/logo.svg\" />\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"header-menu\" ng-class=\"{ 'header-menu-mobile-visible': visibleMobileMenu }\">\n" +
    "            <a class=\"header-menu-link\" ui-sref=\"portal.home\" ng-class=\"getActiveClass('portal.home')\">Home</a>\n" +
    "            <a class=\"header-menu-link\" ui-sref=\"app.categories\">Play!</a>\n" +
    "            <a class=\"header-menu-link\" ui-sref=\"portal.howItWorks\" ng-class=\"getActiveClass('portal.howItWorks')\">How it works</a>\n" +
    "            <a class=\"header-menu-link\" ui-sref=\"portal.contact\" ng-class=\"getActiveClass('portal.contact')\">Contact</a>\n" +
    "            <a class=\"header-menu-link\" href=\"#\" ng-click=\"showLoginDialog()\" ng-if=\"!session\">Log in</a>\n" +
    "            <div class=\"header-menu-logged-user\" ng-if=\"session\">\n" +
    "                <div class=\"header-menu-text header-menu-link-current-user\">Hi, {{getUserName(session)}}</div>\n" +
    "                <a class=\"header-menu-link\" href=\"#\" ng-click=\"logout()\">[Logout]</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"header-menu-mobile-toggle\">\n" +
    "            <button class=\"dark-theme\" ng-click=\"visibleMobileMenu = ( visibleMobileMenu !== true )\">\n" +
    "                <icon class=\"menu-icon\"></icon>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <login visible=\"isLoginVisible\"></login>\n" +
    "    <div ui-view></div>\n" +
    "    <div class=\"footer\">Copyright © 2015 menzit. All rights reserved.</div>\n" +
    "</div>");
}]);

angular.module("test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("test.html",
    "<html ng-app=\"menzit\">\n" +
    "<head>\n" +
    "\n" +
    "    <link rel=\"icon\" type=\"image/png\" href=\"/src/common/favicon.png\">\n" +
    "    <script src=\"/src/loader.js\" type=\"text/javascript\"></script>\n" +
    "\n" +
    "    <script type=\"text/javascript\">\n" +
    "\n" +
    "        menzit.controller('test', ['$scope', '$q', 'record', 'graph',\n" +
    "            function ($scope, $q, record, graph) {\n" +
    "\n" +
    "                $scope.graphs = [];\n" +
    "\n" +
    "                var maxY;\n" +
    "\n" +
    "                graph.loadMusic('/audio?q=vegetables').then(function (response) {\n" +
    "                    $scope.graphs.push({\n" +
    "                        size: response.size\n" +
    "                    });\n" +
    "                    maxY = response.maxY;\n" +
    "                });\n" +
    "\n" +
    "                $scope.record = function () {\n" +
    "                    record.record();\n" +
    "                };\n" +
    "\n" +
    "                $scope.addRecorded = function () {\n" +
    "\n" +
    "                    record.get().then(function (recordedUrl) {\n" +
    "\n" +
    "                        graph.loadMusic(recordedUrl, maxY).then(function (response) {\n" +
    "                            $scope.graphs.push({\n" +
    "                                size: response.size\n" +
    "                            });\n" +
    "\n" +
    "                            $scope.isOk = isOk($scope.graphs[0].size, $scope.graphs[1].size);\n" +
    "                        });\n" +
    "                    });\n" +
    "                };\n" +
    "\n" +
    "                function isOk(sourceImageSizeBlocks, fingerprintImageSizeBlocks) {\n" +
    "                    var isOk = true;\n" +
    "                    sourceImageSizeBlocks.forEach(function (sourceImageSizeBlock, $index) {\n" +
    "                        if(!compareBlock(sourceImageSizeBlock, fingerprintImageSizeBlocks[$index])) {\n" +
    "                            isOk = false;\n" +
    "                        }\n" +
    "                    });\n" +
    "                    return isOk;\n" +
    "                }\n" +
    "\n" +
    "                function compareBlock(blockA, blockB) {\n" +
    "                    var imageDiff, blockAThreshold, blockBThreshold;\n" +
    "                    imageDiff = blockA - blockB;\n" +
    "                    imageDiff = (imageDiff < 0) ? -imageDiff : imageDiff;\n" +
    "                    blockAThreshold = imageDiff / blockA < 0.3;\n" +
    "                    blockBThreshold = imageDiff / blockB < 0.3;\n" +
    "                    return blockAThreshold && blockBThreshold;\n" +
    "                }\n" +
    "            }]);\n" +
    "    </script>\n" +
    "</head>\n" +
    "\n" +
    "<body ng-controller=\"test\">\n" +
    "\n" +
    "    <audio-upload></audio-upload>\n" +
    "\n" +
    "    <div style=\"margin:10px;\">\n" +
    "        <a class=\"button\" id=\"record\" ng-click=\"record()\">Record</a>\n" +
    "        <a class=\"button disabled one\" id=\"play\" ng-click=\"addRecorded()\">Add recorded</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"diff\">\n" +
    "        The diff is: {{graphs[0].size}} - {{graphs[1].size}} - {{isOk}}<br/>\n" +
    "    </div>\n" +
    "</body>\n" +
    "\n" +
    "</html>");
}]);
