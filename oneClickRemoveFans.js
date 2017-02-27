// ==UserScript==
// @name         test
// @namespace    undefined
// @version      0.0.1
// @description  test
// @author       catscarlet
// @match        http://weibo.com/*/fans*
// @require      https://code.jquery.com/jquery-latest.js
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    var $ = $ || window.$;

    //console.log($);

    $(function() {
        switch (detectPage()){
            case '':
                console.log('detectPage ?');
            default:
                //console.log(document.getElementsByClassName('follow_list'));

                function f() {
                    if (!document.getElementsByClassName('follow_list').length) {
                        console.log('trying');
                        setTimeout(f, 1000);
                    } else {
                        getThem();
                    };
                }
                setTimeout(f, 1000);

                /*
                var loop = 10;
                do {
                    window.setTimeout(function() {
                        if (!document.getElementsByClassName('follow_list').length) {
                            console.log('fail: ' + loop);
                            loop--;
                        } else {
                            console.log('success: ' + loop);
                            loop = 0;
                            getThem();
                        }
                    }, 1000);
                } while (loop);
                */
        }
    });

    function detectPage() {
        return 0;
    }

    function getThem() {
        var follow_list = $('.follow_list');
        $(follow_list).find('li').each(function() {
            var follow = $(this);

            if (follow.hasClass('follow_item S_line2')) {
                var opt_box = follow.find('.opt_box');
                var info = opt_box.find('a.W_btn_b');

                if ($(info).attr('action-type') == 'follow') {
                    console.log($(info).attr('action-data'));
                    var fanuid = getParameterByName('uid', $(info).attr('action-data'));
                    var fanfnick = getParameterByName('fnick', $(info).attr('action-data'));
                }
                var str = '<a href="javascript:;" class="W_btn_b removeFanDirectlyBtn" action-type="removeFanDirectly" fanuid="' + fanuid + '" >TEST</a>';

                opt_box.append(str);
            }
        });

        $('.removeFanDirectlyBtn').on('click', testClick);
    };

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        var results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function testClick() {
        //console.log(this);
        var uid = $(this).attr('fanuid');
        //var fnick = '';
        var data = 'uid=' + uid;
        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/aj/f/remove?ajwvr=6&__rnd=' + Math.round(new Date().getTime()),
            data: data,
            dataType: 'json',
            async: true,
            success: function(msg) {
                console.log(msg);
            },
            error: function(msg) {
                console.log(msg);
            }
        });
    }

})();
