define(['app', 'angularAMD'], function (app, angularAMD) {
    var comp_name = "mainComponent";

    // console.log('component called');

    app.component(comp_name, {
        bindings: {
            compBind: '@'
        },
        controller: function() {
            this.title = 'Component Title';
        },
        template: '<h3>{{ $ctrl.title }} {{ $ctrl.compBind }}</h3>'  
    });

    return this;
});
