'use strict';
menzit.value('constants', {
    logoPath: '/src/portal/logo.svg',
    testTypes: {
        quiz: { _id: 'quiz', name: 'Quiz' },
        speech: { _id: 'speech', name: 'Speech' }
    },
    roles: [
        { _id: 0, name: 'Plain user' },
        { _id: 1, name: 'Admin user' },
        { _id: 2, name: 'Super admin user' }
    ]
});
