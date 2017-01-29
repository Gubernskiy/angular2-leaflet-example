(function(global) {
    var map = {
        'app':'/src/app',

        // angular bundles
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

        'rxjs':                       'npm:rxjs',
        'leaflet':                    'npm:leaflet/dist',
        'ng2-bootstrap/ng2-bootstrap': 'npm:ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js',
        'ng2-dnd': 'npm:ng2-dnd/bundles/index.umd.js'
    };

    var packages = {
        'app':                     { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { main: 'RX.js', defaultExtension: 'js' },
        'leaflet':                    { main: 'leaflet.js', defaultExtension: 'js' }
    };

    var config = {
        paths: {
            'npm:': '/node_modules/'
        },
        map: map,
        packages: packages
    };

    System.config(config);

})(this);
