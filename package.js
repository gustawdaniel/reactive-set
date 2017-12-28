Package.describe({
    name: 'gustawdaniel:reactive-set',
    version: '0.0.1',
    summary: 'Reactive Set - object allowing store unique values of any type',
    git: 'https://github.com/gustawdaniel/reactive-set.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.export('ReactiveSet');
    api.versionsFrom('1.6.0.1');
    api.use([
        'ecmascript',
        'check',
        'tracker'
    ]);
    api.mainModule('reactive-set.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('gustawdaniel:reactive-set');
    api.mainModule('reactive-set-tests.js');
});
