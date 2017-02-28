// ==UserScript==
// @name                oneClickRemoveWeiboFans
// @name:zh-CN          oneClickRemoveWeiboFans 一键删除粉丝
// @namespace           undefined
// @version             0.0.1
// @description         Add a button to remove your shit followers.
// @description:zh-CN   在粉丝页面添加一个[一键删除]按钮
// @author              catscarlet
// @match               http://weibo.com/*/fans*
// @match               http://weibo.com/p/*/myfollow?*relate=fans*
// @require             https://code.jquery.com/jquery-latest.js
// @run-at              document-end
// @grant               unsafeWindow
// @grant               GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    var $ = $ || window.$;

    $(function() {
        console.log('oneClickRemoveWeiboFans loaded');

        var relationlistdiv1 = $('.WB_cardwrap S_bg2');
        var relationlistdiv2 = $('#Pl_Official_RelationFans__88');

        relationlistdiv1.bind('DOMNodeInserted', function(e) {
            console.log('oneClickRemoveWeiboFans .WB_cardwrap S_bg2 detected DOMNodeInserted');
            f();
        });

        relationlistdiv2.bind('DOMNodeInserted', function(e) {
            console.log('oneClickRemoveWeiboFans #Pl_Official_RelationFans__88 detected DOMNodeInserted');
            f();
        });

        setTimeout(f, 1000);

        function f() {
            console.log('oneClickRemoveWeiboFans pending');
            if (!document.getElementsByClassName('follow_list').length) {

                setTimeout(f, 1000);
            } else {
                getFans();
            };
        }

    });

    function detectPage() {
        return 0;
    }

    function getFans() {
        if ($('.follow_box').attr('oneClickRemoveWeiboFansFlag')) {
            //console.log('oneClickRemoveWeiboFans already get fans');
            return;
        } else {
            $('.follow_box').attr('oneClickRemoveWeiboFansFlag', '1');
        }
        console.log('oneClickRemoveWeiboFans get fans');
        var follow_list = $('.follow_list');
        $(follow_list).find('li').each(function() {
            var follow = $(this);

            if (follow.hasClass('follow_item S_line2')) {
                var opt_box = follow.find('.opt_box');
                var info = opt_box.find('a.W_btn_b');
                if ($(info).attr('action-type') == 'follow') {
                    var fanuid = getParameterByName('uid', $(info).attr('action-data'));
                    var fanfnick = getParameterByName('fnick', $(info).attr('action-data'));
                    var str = '<a href="javascript:;" class="W_btn_b removeFanDirectlyBtn" style="background-color: #f56213" action-type="removeFanDirectly" fanuid="' + fanuid + '" fanfnick="' + fanfnick + '">一键移除</a>';
                    opt_box.append(str);
                }
            }
        });

        $('.removeFanDirectlyBtn').on('click', removeFanDirectly);
        console.log('oneClickRemoveWeiboFans button ready');
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

    function removeFanDirectly() {
        //console.log(this);
        var thisBtn = $(this);
        thisBtn.off('click');
        thisBtn.text('正在移除');
        thisBtn.css('background-color', '#32a2d5');

        var uid = $(this).attr('fanuid');
        var fnick = $(this).attr('fanfnick');
        var data = 'uid=' + uid;
        //console.log(data);

        var thisli = $(this).parent().parent().parent();

        $.ajax({
            type: 'POST',
            url: '/aj/f/remove?ajwvr=6&__rnd=' + Math.round(new Date().getTime()),
            data: data,
            dataType: 'json',
            async: true,
            success: function(msg) {
                //console.log(this);
                //console.log(msg);
                var code = msg.code;

                if (code == 100000) {
                    console.log('移除粉丝：' + fnick);
                    thisli.remove();
                } else {
                    thisBtn.css('background-color', '#9e9e9e');
                    thisBtn.text('移除失败');
                    console.log('移除失败，可能是网络错误，或是微博更新了界面。');
                }
            },
            error: function(msg) {
                console.log(msg);
            }
        });
    }

})();
