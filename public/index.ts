/// <reference path="../_all.d.ts" />

$(() => {
    $('.login-button').click(function(e){
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    window.location = '/news';
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
        e.preventDefault();
    });

});