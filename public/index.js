/// <reference path="../_all.d.ts" />
$('document').ready(function () {
    $('.login-button').click(function (e) {
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    window.location.href = '/news';
                    console.log('Good to see you, ' + response.name + '.');
                });
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
        e.preventDefault();
    });
    $('.container-fluid').tubular({ videoId: '9HTEZkTA11Q', start: 3 });
});
