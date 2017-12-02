# oneClickRemoveWeiboFans 一键删除微博粉丝

基本功能就是，在新浪微博(weibo.com)粉丝列表页，增加了一个 **[一键移除]** 按钮，点一下这个按钮，就立即移除这个粉丝，没有提示框，没有确认，秒杀，一刀切，不含糊。非常适用于对垃圾粉营销粉僵尸粉开刀，免除 **新浪人为设置的多次瞄准和点击才能删除粉丝的麻烦**。

_关注一个粉丝只需点击一下，删除一个粉丝则需要：瞄准按钮，在范围内移动到指定按钮，点击，鼠标移动到确认提示框，再点击。不认人为设置的麻烦是什么。_

仅对未关注的粉丝有效，已互粉的不会出现按钮，以免点错。

## 安装

脚本安装地址：<https://greasyfork.org/zh-CN/scripts/27750-oneclickremoveweibofans>，点击页面上的 **安装此脚本** 即可。

Chrome用户需要安装 **<暴力猴 扩展程序>**：[谷歌商店链接](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)，[GitHub链接](https://github.com/violentmonkey/violentmonkey/releases/latest)。

其他浏览器未经过测试，请尝试 Tampermonkey，Greasemonkey，或同类扩展。

## 反馈

关于使用的反馈，可以发送到 greasyfork对应项目页、GitHub项目页 或 我的博客。有时间的话我会看的，有时间的话。

欢迎对项目进行 Pull Request。

## 兼容性

### 扩展

与暴力猴 v2.5.5 - v2.6.1 兼容。

其他扩展程序未实际测试。

### 其他脚本

与 Yet Another Weibo Filter 完全兼容。

## 已知问题

1. 在粉丝列表页面的其他页面，比如黑名单页面，跳回到粉丝列表页面后，脚本虽然会载入，但是无法正确执行。
2. 已启用此功能的粉丝列表页，其 更多 按钮弹出来的提示框会跑偏。鉴于举报功能其实就是个花瓶，目前没有计划做一键举报。要是想举报的话，慢慢点吧，我可不陪新浪玩。
3. 鉴于黑名单功能也是个花瓶，我加过很多人的黑名单，结果人家照样快活在我的首页上，所以一键移除粉丝不包括黑名单功能。大家还是多使用 Yet Another Weibo Filter 屏蔽吧。

## 安全性

### 信息收集

脚本不会以任何方式收集您的任何个人信息。但您使用脚本过程中产生的网络访问可能会被您的网络提供商以及对应网站所记录。

### 本地存储

脚本不会存储您的任何操作记录。如果您把某个粉丝删掉了，那就删掉了，不会记录是谁被删掉了，什么时候被删掉了。

打开浏览器控制台，可以看到被删掉的粉丝名称，可用于调试和检查。

## 代码

GitHub：<https://github.com/catscarlet/oneClickRemoveWeiboFans>
