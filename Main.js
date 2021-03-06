// ==UserScript==
// @id             exhen32@live.com
// @name           豆瓣电影助手|douban movie helper
// @description    【重新定义豆瓣脚本，东半球最好的豆瓣电影增强脚本】10秒搞定豆瓣电影资源下载|新增豆列搜索功能|电影黑名单：屏蔽你不想看的烂片|PT资源搜索链接|更多评分|字幕搜索|支持影人作品集批量搜索|增加查看原图链接|增加IMDB top 250标签|一键生成简介|在changhw版本基础上修改，增加pt站搜索，去除垃圾视频站。|感谢R酱、白鸽男孩| 自用脚本，代码粗糙，欢迎捉虫。
// @author         Exhen
// @icon           https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/logo.png
// @connect        *
// @grant          GM_xmlhttpRequest
// @grant          GM_setClipboard
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM_listValues
// @require        http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @require        https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js
// @require        https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/sites.js
// @require        https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/collection.js
// @resource       icon_off https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/off.png
// @resource       icon_on https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/on.png
// @include        https://movie.douban.com/
// @match          https://movie.douban.com/*
// @exclude        https://*/follows_comments*
// @exclude        http*://*collections?show_followings=on
// @version        test
// @run-at         document-start
// @namespace      exhen_js
// @updateURL      https://greasyfork.org/scripts/36866/code/user.js
// ==/UserScript==


/*********** 准备样式 ************/
var myScriptStyle = document.createElement("style");
myScriptStyle.innerHTML = "@charset utf-8;#dale_movie_subject_top_right,#dale_movie_subject_top_right,#dale_movie_subject_top_midle,#dale_movie_subject_middle_right,#dale_movie_subject_bottom_super_banner,#footer,#dale_movie_subject_download_middle,#dale_movie_subject_inner_middle,#movie_home_left_bottom,#dale_movie_home_top_right,#dale_movie_home_side_top,#dale_movie_home_bottom_right,#dale_movie_home_inner_bottom,#dale_movie_home_download_bottom,#dale_movie_home_bottom_right_down,#dale_movie_towhome_explore_right,#dale_movie_chart_top_right,#dale_movie_tags_top_right,#dale_review_best_top_right,.mobile-app-entrance.block5.app-movie,.qrcode-app,.top-nav-doubanapp,.extra,div.gray_ad,p.pl,div.ticket{display:none}.c-aside{margin-bottom:30px}.c-aside-body{*letter-spacing:normal}.c-aside-body a{border-radius:6px;color:#37A;display:inline-block;letter-spacing:normal;margin:0 8px 8px 0;padding:0 8px;text-align:center;width:65px}.c-aside-body a:link,.c-aside-body a:visited{background-color:#f5f5f5;color:#37A}.c-aside-body a:hover,.c-aside-body a:active{background-color:#e8e8e8;color:#37A}.c-aside-body a.disabled{text-decoration:line-through}.c-aside-body a.available{background-color:#5ccccc;color:#006363}.c-aside-body a.available:hover,.c-aside-body a.available:active{background-color:#3cc}.c-aside-body a.sites_r0{text-decoration:line-through}#c_dialog li{margin:10px}#c_dialog{text-align:center}#interest_sectl .rating_imdb{border-bottom:1px solid #eaeaea;padding-bottom:0}#interest_sectl .rating_wrap{padding-top:15px}#interest_sectl .rating_more{border-bottom:1px solid #eaeaea;color:#9b9b9b;margin:0;padding:15px 0;position:relative}#interest_sectl .rating_more a{left:80px;position:absolute}#interest_sectl .rating_more .titleOverviewSprite{background:url(https://coding.net/u/Changhw/p/MyDoubanMovieHelper/git/raw/master/title_overview_sprite.png) no-repeat;display:inline-block;vertical-align:middle}#interest_sectl .rating_more .popularityImageUp{background-position:-14px -478px;height:8px;width:8px}#interest_sectl .rating_more .popularityImageDown{background-position:-34px -478px;height:8px;width:8px}#interest_sectl .rating_more .popularityUpOrFlat{color:#83C40B}#interest_sectl .rating_more .popularityDown{color:#930E02}/*!jQuery UI - v1.12.1 - 2016-09-14 * http://jqueryui.com * Includes:core.css,accordion.css,autocomplete.css,menu.css,button.css,controlgroup.css,checkboxradio.css,datepicker.css,dialog.css,draggable.css,resizable.css,progressbar.css,selectable.css,selectmenu.css,slider.css,sortable.css,spinner.css,tabs.css,tooltip.css,theme.css * To view and modify this theme,visit http://jqueryui.com/themeroller/?bgShadowXPos=&bgOverlayXPos=&bgErrorXPos=&bgHighlightXPos=&bgContentXPos=&bgHeaderXPos=&bgActiveXPos=&bgHoverXPos=&bgDefaultXPos=&bgShadowYPos=&bgOverlayYPos=&bgErrorYPos=&bgHighlightYPos=&bgContentYPos=&bgHeaderYPos=&bgActiveYPos=&bgHoverYPos=&bgDefaultYPos=&bgShadowRepeat=&bgOverlayRepeat=&bgErrorRepeat=&bgHighlightRepeat=&bgContentRepeat=&bgHeaderRepeat=&bgActiveRepeat=&bgHoverRepeat=&bgDefaultRepeat=&iconsHover=url(%22images%2Fui-icons_555555_256x240.png%22)&iconsHighlight=url(%22images%2Fui-icons_777620_256x240.png%22)&iconsHeader=url(%22images%2Fui-icons_444444_256x240.png%22)&iconsError=url(%22images%2Fui-icons_cc0000_256x240.png%22)&iconsDefault=url(%22images%2Fui-icons_777777_256x240.png%22)&iconsContent=url(%22images%2Fui-icons_444444_256x240.png%22)&iconsActive=url(%22images%2Fui-icons_ffffff_256x240.png%22)&bgImgUrlShadow=&bgImgUrlOverlay=&bgImgUrlHover=&bgImgUrlHighlight=&bgImgUrlHeader=&bgImgUrlError=&bgImgUrlDefault=&bgImgUrlContent=&bgImgUrlActive=&opacityFilterShadow=Alpha(Opacity%3D30)&opacityFilterOverlay=Alpha(Opacity%3D30)&opacityShadowPerc=30&opacityOverlayPerc=30&iconColorHover=%23555555&iconColorHighlight=%23777620&iconColorHeader=%23444444&iconColorError=%23cc0000&iconColorDefault=%23777777&iconColorContent=%23444444&iconColorActive=%23ffffff&bgImgOpacityShadow=0&bgImgOpacityOverlay=0&bgImgOpacityError=95&bgImgOpacityHighlight=55&bgImgOpacityContent=75&bgImgOpacityHeader=75&bgImgOpacityActive=65&bgImgOpacityHover=75&bgImgOpacityDefault=75&bgTextureShadow=flat&bgTextureOverlay=flat&bgTextureError=flat&bgTextureHighlight=flat&bgTextureContent=flat&bgTextureHeader=flat&bgTextureActive=flat&bgTextureHover=flat&bgTextureDefault=flat&cornerRadius=3px&fwDefault=normal&ffDefault=Arial%2CHelvetica%2Csans-serif&fsDefault=1em&cornerRadiusShadow=8px&thicknessShadow=5px&offsetLeftShadow=0px&offsetTopShadow=0px&opacityShadow=.3&bgColorShadow=%23666666&opacityOverlay=.3&bgColorOverlay=%23aaaaaa&fcError=%235f3f3f&borderColorError=%23f1a899&bgColorError=%23fddfdf&fcHighlight=%23777620&borderColorHighlight=%23dad55e&bgColorHighlight=%23fffa90&fcContent=%23333333&borderColorContent=%23dddddd&bgColorContent=%23ffffff&fcHeader=%23333333&borderColorHeader=%23dddddd&bgColorHeader=%23e9e9e9&fcActive=%23ffffff&borderColorActive=%23003eff&bgColorActive=%23007fff&fcHover=%232b2b2b&borderColorHover=%23cccccc&bgColorHover=%23ededed&fcDefault=%23454545&borderColorDefault=%23c5c5c5&bgColorDefault=%23f6f6f6 * Copyright jQuery Foundation and other contributors;Licensed MIT */ .ui-helper-hidden{display:none}.ui-helper-hidden-accessible{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.ui-helper-reset{border:0;font-size:100%;line-height:1.3;list-style:none;margin:0;outline:0;padding:0;text-decoration:none}.ui-helper-clearfix:before,.ui-helper-clearfix:after{border-collapse:collapse;content:'';display:table}.ui-helper-clearfix:after{clear:both}.ui-helper-zfix{height:100%;left:0;opacity:0;position:absolute;top:0;width:100%;filter:Alpha(Opacity=0)}.ui-front{z-index:100}.ui-state-disabled{cursor:default !important;pointer-events:none}.ui-icon{background-repeat:no-repeat;display:inline-block;margin-top:-.25em;overflow:hidden;position:relative;text-indent:-99999px;vertical-align:middle}.ui-widget-icon-block{display:block;left:50%;margin-left:-8px}.ui-widget-overlay{height:100%;left:0;position:fixed;top:0;width:100%}.ui-accordion .ui-accordion-header{cursor:pointer;display:block;font-size:100%;margin:2px 0 0 0;padding:.5em .5em .5em .7em;position:relative}.ui-accordion .ui-accordion-content{border-top:0;overflow:auto;padding:1em 2.2em}.ui-autocomplete{cursor:default;left:0;position:absolute;top:0}.ui-menu{display:block;list-style:none;margin:0;outline:0;padding:0}.ui-menu .ui-menu{position:absolute}.ui-menu .ui-menu-item{cursor:pointer;list-style-image:url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);margin:0}.ui-menu .ui-menu-item-wrapper{padding:3px 1em 3px .4em;position:relative}.ui-menu .ui-menu-divider{border-width:1px 0 0 0;font-size:0;height:0;line-height:0;margin:5px 0}.ui-menu .ui-state-focus,.ui-menu .ui-state-active{margin:-1px}.ui-menu-icons{position:relative}.ui-menu-icons .ui-menu-item-wrapper{padding-left:2em}.ui-menu .ui-icon{bottom:0;left:.2em;margin:auto 0;position:absolute;top:0}.ui-menu .ui-menu-icon{left:auto;right:0}.ui-button{cursor:pointer;display:inline-block;line-height:normal;margin-right:.1em;overflow:visible;padding:.4em 1em;position:relative;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ui-button,.ui-button:link,.ui-button:visited,.ui-button:hover,.ui-button:active{text-decoration:none}.ui-button-icon-only{box-sizing:border-box;text-indent:-9999px;white-space:nowrap;width:2em}input.ui-button.ui-button-icon-only{text-indent:0}.ui-button-icon-only .ui-icon{left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%}.ui-button.ui-icon-notext .ui-icon{height:2.1em;padding:0;text-indent:-9999px;white-space:nowrap;width:2.1em}input.ui-button.ui-icon-notext .ui-icon{height:auto;padding:.4em 1em;text-indent:0;white-space:normal;width:auto}input.ui-button::-moz-focus-inner,button.ui-button::-moz-focus-inner{border:0;padding:0}.ui-controlgroup{display:inline-block;vertical-align:middle}.ui-controlgroup>.ui-controlgroup-item{float:left;margin-left:0;margin-right:0}.ui-controlgroup>.ui-controlgroup-item:focus,.ui-controlgroup>.ui-controlgroup-item.ui-visual-focus{z-index:9999}.ui-controlgroup-vertical>.ui-controlgroup-item{display:block;float:none;margin-bottom:0;margin-top:0;text-align:left;width:100%}.ui-controlgroup-vertical .ui-controlgroup-item{box-sizing:border-box}.ui-controlgroup .ui-controlgroup-label{padding:.4em 1em}.ui-controlgroup .ui-controlgroup-label span{font-size:80%}.ui-controlgroup-horizontal .ui-controlgroup-label + .ui-controlgroup-item{border-left:none}.ui-controlgroup-vertical .ui-controlgroup-label + .ui-controlgroup-item{border-top:none}.ui-controlgroup-horizontal .ui-controlgroup-label.ui-widget-content{border-right:none}.ui-controlgroup-vertical .ui-controlgroup-label.ui-widget-content{border-bottom:none}.ui-controlgroup-vertical .ui-spinner-input{width:75%;width:calc(100% - 2.4em)}.ui-controlgroup-vertical .ui-spinner .ui-spinner-up{border-top-style:solid}.ui-checkboxradio-label .ui-icon-background{border:0;border-radius:.12em;box-shadow:inset 1px 1px 1px #ccc}.ui-checkboxradio-radio-label .ui-icon-background{border:0;border-radius:1em;height:16px;overflow:visible;width:16px}.ui-checkboxradio-radio-label.ui-checkboxradio-checked .ui-icon,.ui-checkboxradio-radio-label.ui-checkboxradio-checked:hover .ui-icon{background-image:none;border-style:solid;border-width:4px;height:8px;width:8px}.ui-checkboxradio-disabled{pointer-events:none}.ui-datepicker{display:none;padding:.2em .2em 0;width:17em}.ui-datepicker .ui-datepicker-header{padding:.2em 0;position:relative}.ui-datepicker .ui-datepicker-prev,.ui-datepicker .ui-datepicker-next{height:1.8em;position:absolute;top:2px;width:1.8em}.ui-datepicker .ui-datepicker-prev-hover,.ui-datepicker .ui-datepicker-next-hover{top:1px}.ui-datepicker .ui-datepicker-prev{left:2px}.ui-datepicker .ui-datepicker-next{right:2px}.ui-datepicker .ui-datepicker-prev-hover{left:1px}.ui-datepicker .ui-datepicker-next-hover{right:1px}.ui-datepicker .ui-datepicker-prev span,.ui-datepicker .ui-datepicker-next span{display:block;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%}.ui-datepicker .ui-datepicker-title{line-height:1.8em;margin:0 2.3em;text-align:center}.ui-datepicker .ui-datepicker-title select{font-size:1em;margin:1px 0}.ui-datepicker select.ui-datepicker-month,.ui-datepicker select.ui-datepicker-year{width:45%}.ui-datepicker table{border-collapse:collapse;font-size:.9em;margin:0 0 .4em;width:100%}.ui-datepicker th{border:0;font-weight:bold;padding:.7em .3em;text-align:center}.ui-datepicker td{border:0;padding:1px}.ui-datepicker td span,.ui-datepicker td a{display:block;padding:.2em;text-align:right;text-decoration:none}.ui-datepicker .ui-datepicker-buttonpane{background-image:none;border-bottom:0;border-left:0;border-right:0;margin:.7em 0 0 0;padding:0 .2em}.ui-datepicker .ui-datepicker-buttonpane button{cursor:pointer;float:right;margin:.5em .2em .4em;overflow:visible;padding:.2em .6em .3em .6em;width:auto}.ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current{float:left}.ui-datepicker.ui-datepicker-multi{width:auto}.ui-datepicker-multi .ui-datepicker-group{float:left}.ui-datepicker-multi .ui-datepicker-group table{margin:0 auto .4em;width:95%}.ui-datepicker-multi-2 .ui-datepicker-group{width:50%}.ui-datepicker-multi-3 .ui-datepicker-group{width:33.3%}.ui-datepicker-multi-4 .ui-datepicker-group{width:25%}.ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header,.ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header{border-left-width:0}.ui-datepicker-multi .ui-datepicker-buttonpane{clear:left}.ui-datepicker-row-break{clear:both;font-size:0;width:100%}.ui-datepicker-rtl{direction:rtl}.ui-datepicker-rtl .ui-datepicker-prev{left:auto;right:2px}.ui-datepicker-rtl .ui-datepicker-next{left:2px;right:auto}.ui-datepicker-rtl .ui-datepicker-prev:hover{left:auto;right:1px}.ui-datepicker-rtl .ui-datepicker-next:hover{left:1px;right:auto}.ui-datepicker-rtl .ui-datepicker-buttonpane{clear:right}.ui-datepicker-rtl .ui-datepicker-buttonpane button{float:left}.ui-datepicker-rtl .ui-datepicker-buttonpane button.ui-datepicker-current,.ui-datepicker-rtl .ui-datepicker-group{float:right}.ui-datepicker-rtl .ui-datepicker-group-last .ui-datepicker-header,.ui-datepicker-rtl .ui-datepicker-group-middle .ui-datepicker-header{border-left-width:1px;border-right-width:0}.ui-datepicker .ui-icon{background-repeat:no-repeat;display:block;left:.5em;overflow:hidden;text-indent:-99999px;top:.3em}.ui-dialog{left:0;outline:0;padding:.2em;position:absolute;top:0}.ui-dialog .ui-dialog-titlebar{padding:.4em 1em;position:relative}.ui-dialog .ui-dialog-title{float:left;margin:.1em 0;overflow:hidden;white-space:nowrap;width:90%;text-overflow:ellipsis}.ui-dialog .ui-dialog-titlebar-close{height:20px;margin:-10px 0 0 0;padding:1px;position:absolute;right:.3em;top:50%;width:20px}.ui-dialog .ui-dialog-content{background:none;border:0;overflow:auto;padding:.5em 1em;position:relative}.ui-dialog .ui-dialog-buttonpane{background-image:none;border-width:1px 0 0 0;margin-top:.5em;padding:.3em 1em .5em .4em;text-align:left}.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset{float:right}.ui-dialog .ui-dialog-buttonpane button{cursor:pointer;margin:.5em .4em .5em 0}.ui-dialog .ui-resizable-n{height:2px;top:0}.ui-dialog .ui-resizable-e{right:0;width:2px}.ui-dialog .ui-resizable-s{bottom:0;height:2px}.ui-dialog .ui-resizable-w{left:0;width:2px}.ui-dialog .ui-resizable-se,.ui-dialog .ui-resizable-sw,.ui-dialog .ui-resizable-ne,.ui-dialog .ui-resizable-nw{height:7px;width:7px}.ui-dialog .ui-resizable-se{bottom:0;right:0}.ui-dialog .ui-resizable-sw{bottom:0;left:0}.ui-dialog .ui-resizable-ne{right:0;top:0}.ui-dialog .ui-resizable-nw{left:0;top:0}.ui-draggable .ui-dialog-titlebar{cursor:move}.ui-draggable-handle{-ms-touch-action:none;touch-action:none}.ui-resizable{position:relative}.ui-resizable-handle{display:block;font-size:.1px;position:absolute;-ms-touch-action:none;touch-action:none}.ui-resizable-disabled .ui-resizable-handle,.ui-resizable-autohide .ui-resizable-handle{display:none}.ui-resizable-n{cursor:n-resize;height:7px;left:0;top:-5px;width:100%}.ui-resizable-s{bottom:-5px;cursor:s-resize;height:7px;left:0;width:100%}.ui-resizable-e{cursor:e-resize;height:100%;right:-5px;top:0;width:7px}.ui-resizable-w{cursor:w-resize;height:100%;left:-5px;top:0;width:7px}.ui-resizable-se{bottom:1px;cursor:se-resize;height:12px;right:1px;width:12px}.ui-resizable-sw{bottom:-5px;cursor:sw-resize;height:9px;left:-5px;width:9px}.ui-resizable-nw{cursor:nw-resize;height:9px;left:-5px;top:-5px;width:9px}.ui-resizable-ne{cursor:ne-resize;height:9px;right:-5px;top:-5px;width:9px}.ui-progressbar{height:2em;overflow:hidden;text-align:left}.ui-progressbar .ui-progressbar-value{height:100%;margin:-1px}.ui-progressbar .ui-progressbar-overlay{background:url(data:image/gif;base64,R0lGODlhKAAoAIABAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQABACwAAAAAKAAoAAACkYwNqXrdC52DS06a7MFZI+4FHBCKoDeWKXqymPqGqxvJrXZbMx7Ttc+w9XgU2FB3lOyQRWET2IFGiU9m1frDVpxZZc6bfHwv4c1YXP6k1Vdy292Fb6UkuvFtXpvWSzA+HycXJHUXiGYIiMg2R6W459gnWGfHNdjIqDWVqemH2ekpObkpOlppWUqZiqr6edqqWQAAIfkECQEAAQAsAAAAACgAKAAAApSMgZnGfaqcg1E2uuzDmmHUBR8Qil95hiPKqWn3aqtLsS18y7G1SzNeowWBENtQd+T1JktP05nzPTdJZlR6vUxNWWjV+vUWhWNkWFwxl9VpZRedYcflIOLafaa28XdsH/ynlcc1uPVDZxQIR0K25+cICCmoqCe5mGhZOfeYSUh5yJcJyrkZWWpaR8doJ2o4NYq62lAAACH5BAkBAAEALAAAAAAoACgAAAKVDI4Yy22ZnINRNqosw0Bv7i1gyHUkFj7oSaWlu3ovC8GxNso5fluz3qLVhBVeT/Lz7ZTHyxL5dDalQWPVOsQWtRnuwXaFTj9jVVh8pma9JjZ4zYSj5ZOyma7uuolffh+IR5aW97cHuBUXKGKXlKjn+DiHWMcYJah4N0lYCMlJOXipGRr5qdgoSTrqWSq6WFl2ypoaUAAAIfkECQEAAQAsAAAAACgAKAAAApaEb6HLgd/iO7FNWtcFWe+ufODGjRfoiJ2akShbueb0wtI50zm02pbvwfWEMWBQ1zKGlLIhskiEPm9R6vRXxV4ZzWT2yHOGpWMyorblKlNp8HmHEb/lCXjcW7bmtXP8Xt229OVWR1fod2eWqNfHuMjXCPkIGNileOiImVmCOEmoSfn3yXlJWmoHGhqp6ilYuWYpmTqKUgAAIfkECQEAAQAsAAAAACgAKAAAApiEH6kb58biQ3FNWtMFWW3eNVcojuFGfqnZqSebuS06w5V80/X02pKe8zFwP6EFWOT1lDFk8rGERh1TTNOocQ61Hm4Xm2VexUHpzjymViHrFbiELsefVrn6XKfnt2Q9G/+Xdie499XHd2g4h7ioOGhXGJboGAnXSBnoBwKYyfioubZJ2Hn0RuRZaflZOil56Zp6iioKSXpUAAAh+QQJAQABACwAAAAAKAAoAAACkoQRqRvnxuI7kU1a1UU5bd5tnSeOZXhmn5lWK3qNTWvRdQxP8qvaC+/yaYQzXO7BMvaUEmJRd3TsiMAgswmNYrSgZdYrTX6tSHGZO73ezuAw2uxuQ+BbeZfMxsexY35+/Qe4J1inV0g4x3WHuMhIl2jXOKT2Q+VU5fgoSUI52VfZyfkJGkha6jmY+aaYdirq+lQAACH5BAkBAAEALAAAAAAoACgAAAKWBIKpYe0L3YNKToqswUlvznigd4wiR4KhZrKt9Upqip61i9E3vMvxRdHlbEFiEXfk9YARYxOZZD6VQ2pUunBmtRXo1Lf8hMVVcNl8JafV38aM2/Fu5V16Bn63r6xt97j09+MXSFi4BniGFae3hzbH9+hYBzkpuUh5aZmHuanZOZgIuvbGiNeomCnaxxap2upaCZsq+1kAACH5BAkBAAEALAAAAAAoACgAAAKXjI8By5zf4kOxTVrXNVlv1X0d8IGZGKLnNpYtm8Lr9cqVeuOSvfOW79D9aDHizNhDJidFZhNydEahOaDH6nomtJjp1tutKoNWkvA6JqfRVLHU/QUfau9l2x7G54d1fl995xcIGAdXqMfBNadoYrhH+Mg2KBlpVpbluCiXmMnZ2Sh4GBqJ+ckIOqqJ6LmKSllZmsoq6wpQAAAh+QQJAQABACwAAAAAKAAoAAAClYx/oLvoxuJDkU1a1YUZbJ59nSd2ZXhWqbRa2/gF8Gu2DY3iqs7yrq+xBYEkYvFSM8aSSObE+ZgRl1BHFZNr7pRCavZ5BW2142hY3AN/zWtsmf12p9XxxFl2lpLn1rseztfXZjdIWIf2s5dItwjYKBgo9yg5pHgzJXTEeGlZuenpyPmpGQoKOWkYmSpaSnqKileI2FAAACH5BAkBAAEALAAAAAAoACgAAAKVjB+gu+jG4kORTVrVhRlsnn2dJ3ZleFaptFrb+CXmO9OozeL5VfP99HvAWhpiUdcwkpBH3825AwYdU8xTqlLGhtCosArKMpvfa1mMRae9VvWZfeB2XfPkeLmm18lUcBj+p5dnN8jXZ3YIGEhYuOUn45aoCDkp16hl5IjYJvjWKcnoGQpqyPlpOhr3aElaqrq56Bq7VAAAOw==);height:100%;opacity:.25;filter:alpha(opacity=25)}.ui-progressbar-indeterminate .ui-progressbar-value{background-image:none}.ui-selectable{-ms-touch-action:none;touch-action:none}.ui-selectable-helper{border:1px dotted black;position:absolute;z-index:100}.ui-selectmenu-menu{display:none;left:0;margin:0;padding:0;position:absolute;top:0}.ui-selectmenu-menu .ui-menu{overflow:auto;overflow-x:hidden;padding-bottom:1px}.ui-selectmenu-menu .ui-menu .ui-selectmenu-optgroup{border:0;font-size:1em;font-weight:bold;height:auto;line-height:1.5;margin:.5em 0 0 0;padding:2px .4em}.ui-selectmenu-open{display:block}.ui-selectmenu-text{display:block;margin-right:20px;overflow:hidden;text-overflow:ellipsis}.ui-selectmenu-button.ui-button{text-align:left;white-space:nowrap;width:14em}.ui-selectmenu-icon.ui-icon{float:right;margin-top:0}.ui-slider{position:relative;text-align:left}.ui-slider .ui-slider-handle{cursor:default;height:1.2em;position:absolute;width:1.2em;z-index:2;-ms-touch-action:none;touch-action:none}.ui-slider .ui-slider-range{background-position:0 0;border:0;display:block;font-size:.7em;position:absolute;z-index:1}.ui-slider.ui-state-disabled .ui-slider-handle,.ui-slider.ui-state-disabled .ui-slider-range{filter:inherit}.ui-slider-horizontal{height:.8em}.ui-slider-horizontal .ui-slider-handle{margin-left:-.6em;top:-.3em}.ui-slider-horizontal .ui-slider-range{height:100%;top:0}.ui-slider-horizontal .ui-slider-range-min{left:0}.ui-slider-horizontal .ui-slider-range-max{right:0}.ui-slider-vertical{height:100px;width:.8em}.ui-slider-vertical .ui-slider-handle{left:-.3em;margin-bottom:-.6em;margin-left:0}.ui-slider-vertical .ui-slider-range{left:0;width:100%}.ui-slider-vertical .ui-slider-range-min{bottom:0}.ui-slider-vertical .ui-slider-range-max{top:0}.ui-sortable-handle{-ms-touch-action:none;touch-action:none}.ui-spinner{display:inline-block;overflow:hidden;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{background:none;border:0;color:inherit;margin:.2em 0;margin-left:.4em;margin-right:2em;padding:.222em 0;vertical-align:middle}.ui-spinner-button{cursor:default;display:block;font-size:.5em;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;width:1.6em}.ui-spinner a.ui-spinner-button{border-bottom-style:none;border-right-style:none;border-top-style:none}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-tabs{padding:.2em;position:relative}.ui-tabs .ui-tabs-nav{margin:0;padding:.2em .2em 0}.ui-tabs .ui-tabs-nav li{border-bottom-width:0;float:left;list-style:none;margin:1px .2em 0 0;padding:0;position:relative;top:0;white-space:nowrap}.ui-tabs .ui-tabs-nav .ui-tabs-anchor{float:left;padding:.5em 1em;text-decoration:none}.ui-tabs .ui-tabs-nav li.ui-tabs-active{margin-bottom:-1px;padding-bottom:1px}.ui-tabs .ui-tabs-nav li.ui-tabs-active .ui-tabs-anchor,.ui-tabs .ui-tabs-nav li.ui-state-disabled .ui-tabs-anchor,.ui-tabs .ui-tabs-nav li.ui-tabs-loading .ui-tabs-anchor{cursor:text}.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-active .ui-tabs-anchor{cursor:pointer}.ui-tabs .ui-tabs-panel{background:none;border-width:0;display:block;padding:1em 1.4em}.ui-tooltip{max-width:300px;padding:8px;position:absolute;z-index:9999}body .ui-tooltip{border-width:2px}.ui-widget{font-family:Arial,Helvetica,sans-serif;font-size:1em}.ui-widget .ui-widget{font-size:1em}.ui-widget input,.ui-widget select,.ui-widget textarea,.ui-widget button{font-family:Arial,Helvetica,sans-serif;font-size:1em}.ui-widget.ui-widget-content{border:1px solid #c5c5c5}.ui-widget-content{background:#fff;border:1px solid #ddd;color:#333}.ui-widget-content a{color:#333}.ui-widget-header{background:#e9e9e9;border:1px solid #ddd;color:#333;font-weight:bold}.ui-widget-header a{color:#333}.ui-state-default,.ui-widget-content .ui-state-default,.ui-widget-header .ui-state-default,.ui-button,html .ui-button.ui-state-disabled:hover,html .ui-button.ui-state-disabled:active{background:#f6f6f6;border:1px solid #c5c5c5;color:#454545;font-weight:normal}.ui-state-default a,.ui-state-default a:link,.ui-state-default a:visited,a.ui-button,a:link.ui-button,a:visited.ui-button,.ui-button{color:#454545;text-decoration:none}.ui-state-hover,.ui-widget-content .ui-state-hover,.ui-widget-header .ui-state-hover,.ui-state-focus,.ui-widget-content .ui-state-focus,.ui-widget-header .ui-state-focus,.ui-button:hover,.ui-button:focus{background:#ededed;border:1px solid #ccc;color:#2b2b2b;font-weight:normal}.ui-state-hover a,.ui-state-hover a:hover,.ui-state-hover a:link,.ui-state-hover a:visited,.ui-state-focus a,.ui-state-focus a:hover,.ui-state-focus a:link,.ui-state-focus a:visited,a.ui-button:hover,a.ui-button:focus{color:#2b2b2b;text-decoration:none}.ui-visual-focus{box-shadow:0 0 3px 1px #5e9ed6}.ui-state-active,.ui-widget-content .ui-state-active,.ui-widget-header .ui-state-active,a.ui-button:active,.ui-button:active,.ui-button.ui-state-active:hover{background:#007fff;border:1px solid #003eff;color:#fff;font-weight:normal}.ui-icon-background,.ui-state-active .ui-icon-background{background-color:#fff;border:#003eff}.ui-state-active a,.ui-state-active a:link,.ui-state-active a:visited{color:#fff;text-decoration:none}.ui-state-highlight,.ui-widget-content .ui-state-highlight,.ui-widget-header .ui-state-highlight{background:#fffa90;border:1px solid #dad55e;color:#777620}.ui-state-checked{background:#fffa90;border:1px solid #dad55e}.ui-state-highlight a,.ui-widget-content .ui-state-highlight a,.ui-widget-header .ui-state-highlight a{color:#777620}.ui-state-error,.ui-widget-content .ui-state-error,.ui-widget-header .ui-state-error{background:#fddfdf;border:1px solid #f1a899;color:#5f3f3f}.ui-state-error a,.ui-widget-content .ui-state-error a,.ui-widget-header .ui-state-error a{color:#5f3f3f}.ui-state-error-text,.ui-widget-content .ui-state-error-text,.ui-widget-header .ui-state-error-text{color:#5f3f3f}.ui-priority-primary,.ui-widget-content .ui-priority-primary,.ui-widget-header .ui-priority-primary{font-weight:bold}.ui-priority-secondary,.ui-widget-content .ui-priority-secondary,.ui-widget-header .ui-priority-secondary{font-weight:normal;opacity:.7;filter:Alpha(Opacity=70)}.ui-state-disabled,.ui-widget-content .ui-state-disabled,.ui-widget-header .ui-state-disabled{background-image:none;opacity:.35;filter:Alpha(Opacity=35)}.ui-state-disabled .ui-icon{filter:Alpha(Opacity=35)}.ui-icon{height:16px;width:16px}.ui-icon,.ui-widget-content .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_444444_256x240.png)}.ui-widget-header .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_444444_256x240.png)}.ui-state-hover .ui-icon,.ui-state-focus .ui-icon,.ui-button:hover .ui-icon,.ui-button:focus .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_555555_256x240.png)}.ui-state-active .ui-icon,.ui-button:active .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_ffffff_256x240.png)}.ui-state-highlight .ui-icon,.ui-button .ui-state-highlight.ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_777620_256x240.png)}.ui-state-error .ui-icon,.ui-state-error-text .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_cc0000_256x240.png)}.ui-button .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_777777_256x240.png)}.ui-icon-blank{background-position:16px 16px}.ui-icon-caret-1-n{background-position:0 0}.ui-icon-caret-1-ne{background-position:-16px 0}.ui-icon-caret-1-e{background-position:-32px 0}.ui-icon-caret-1-se{background-position:-48px 0}.ui-icon-caret-1-s{background-position:-65px 0}.ui-icon-caret-1-sw{background-position:-80px 0}.ui-icon-caret-1-w{background-position:-96px 0}.ui-icon-caret-1-nw{background-position:-112px 0}.ui-icon-caret-2-n-s{background-position:-128px 0}.ui-icon-caret-2-e-w{background-position:-144px 0}.ui-icon-triangle-1-n{background-position:0 -16px}.ui-icon-triangle-1-ne{background-position:-16px -16px}.ui-icon-triangle-1-e{background-position:-32px -16px}.ui-icon-triangle-1-se{background-position:-48px -16px}.ui-icon-triangle-1-s{background-position:-65px -16px}.ui-icon-triangle-1-sw{background-position:-80px -16px}.ui-icon-triangle-1-w{background-position:-96px -16px}.ui-icon-triangle-1-nw{background-position:-112px -16px}.ui-icon-triangle-2-n-s{background-position:-128px -16px}.ui-icon-triangle-2-e-w{background-position:-144px -16px}.ui-icon-arrow-1-n{background-position:0 -32px}.ui-icon-arrow-1-ne{background-position:-16px -32px}.ui-icon-arrow-1-e{background-position:-32px -32px}.ui-icon-arrow-1-se{background-position:-48px -32px}.ui-icon-arrow-1-s{background-position:-65px -32px}.ui-icon-arrow-1-sw{background-position:-80px -32px}.ui-icon-arrow-1-w{background-position:-96px -32px}.ui-icon-arrow-1-nw{background-position:-112px -32px}.ui-icon-arrow-2-n-s{background-position:-128px -32px}.ui-icon-arrow-2-ne-sw{background-position:-144px -32px}.ui-icon-arrow-2-e-w{background-position:-160px -32px}.ui-icon-arrow-2-se-nw{background-position:-176px -32px}.ui-icon-arrowstop-1-n{background-position:-192px -32px}.ui-icon-arrowstop-1-e{background-position:-208px -32px}.ui-icon-arrowstop-1-s{background-position:-224px -32px}.ui-icon-arrowstop-1-w{background-position:-240px -32px}.ui-icon-arrowthick-1-n{background-position:1px -48px}.ui-icon-arrowthick-1-ne{background-position:-16px -48px}.ui-icon-arrowthick-1-e{background-position:-32px -48px}.ui-icon-arrowthick-1-se{background-position:-48px -48px}.ui-icon-arrowthick-1-s{background-position:-64px -48px}.ui-icon-arrowthick-1-sw{background-position:-80px -48px}.ui-icon-arrowthick-1-w{background-position:-96px -48px}.ui-icon-arrowthick-1-nw{background-position:-112px -48px}.ui-icon-arrowthick-2-n-s{background-position:-128px -48px}.ui-icon-arrowthick-2-ne-sw{background-position:-144px -48px}.ui-icon-arrowthick-2-e-w{background-position:-160px -48px}.ui-icon-arrowthick-2-se-nw{background-position:-176px -48px}.ui-icon-arrowthickstop-1-n{background-position:-192px -48px}.ui-icon-arrowthickstop-1-e{background-position:-208px -48px}.ui-icon-arrowthickstop-1-s{background-position:-224px -48px}.ui-icon-arrowthickstop-1-w{background-position:-240px -48px}.ui-icon-arrowreturnthick-1-w{background-position:0 -64px}.ui-icon-arrowreturnthick-1-n{background-position:-16px -64px}.ui-icon-arrowreturnthick-1-e{background-position:-32px -64px}.ui-icon-arrowreturnthick-1-s{background-position:-48px -64px}.ui-icon-arrowreturn-1-w{background-position:-64px -64px}.ui-icon-arrowreturn-1-n{background-position:-80px -64px}.ui-icon-arrowreturn-1-e{background-position:-96px -64px}.ui-icon-arrowreturn-1-s{background-position:-112px -64px}.ui-icon-arrowrefresh-1-w{background-position:-128px -64px}.ui-icon-arrowrefresh-1-n{background-position:-144px -64px}.ui-icon-arrowrefresh-1-e{background-position:-160px -64px}.ui-icon-arrowrefresh-1-s{background-position:-176px -64px}.ui-icon-arrow-4{background-position:0 -80px}.ui-icon-arrow-4-diag{background-position:-16px -80px}.ui-icon-extlink{background-position:-32px -80px}.ui-icon-newwin{background-position:-48px -80px}.ui-icon-refresh{background-position:-64px -80px}.ui-icon-shuffle{background-position:-80px -80px}.ui-icon-transfer-e-w{background-position:-96px -80px}.ui-icon-transferthick-e-w{background-position:-112px -80px}.ui-icon-folder-collapsed{background-position:0 -96px}.ui-icon-folder-open{background-position:-16px -96px}.ui-icon-document{background-position:-32px -96px}.ui-icon-document-b{background-position:-48px -96px}.ui-icon-note{background-position:-64px -96px}.ui-icon-mail-closed{background-position:-80px -96px}.ui-icon-mail-open{background-position:-96px -96px}.ui-icon-suitcase{background-position:-112px -96px}.ui-icon-comment{background-position:-128px -96px}.ui-icon-person{background-position:-144px -96px}.ui-icon-print{background-position:-160px -96px}.ui-icon-trash{background-position:-176px -96px}.ui-icon-locked{background-position:-192px -96px}.ui-icon-unlocked{background-position:-208px -96px}.ui-icon-bookmark{background-position:-224px -96px}.ui-icon-tag{background-position:-240px -96px}.ui-icon-home{background-position:0 -112px}.ui-icon-flag{background-position:-16px -112px}.ui-icon-calendar{background-position:-32px -112px}.ui-icon-cart{background-position:-48px -112px}.ui-icon-pencil{background-position:-64px -112px}.ui-icon-clock{background-position:-80px -112px}.ui-icon-disk{background-position:-96px -112px}.ui-icon-calculator{background-position:-112px -112px}.ui-icon-zoomin{background-position:-128px -112px}.ui-icon-zoomout{background-position:-144px -112px}.ui-icon-search{background-position:-160px -112px}.ui-icon-wrench{background-position:-176px -112px}.ui-icon-gear{background-position:-192px -112px}.ui-icon-heart{background-position:-208px -112px}.ui-icon-star{background-position:-224px -112px}.ui-icon-link{background-position:-240px -112px}.ui-icon-cancel{background-position:0 -128px}.ui-icon-plus{background-position:-16px -128px}.ui-icon-plusthick{background-position:-32px -128px}.ui-icon-minus{background-position:-48px -128px}.ui-icon-minusthick{background-position:-64px -128px}.ui-icon-close{background-position:-80px -128px}.ui-icon-closethick{background-position:-96px -128px}.ui-icon-key{background-position:-112px -128px}.ui-icon-lightbulb{background-position:-128px -128px}.ui-icon-scissors{background-position:-144px -128px}.ui-icon-clipboard{background-position:-160px -128px}.ui-icon-copy{background-position:-176px -128px}.ui-icon-contact{background-position:-192px -128px}.ui-icon-image{background-position:-208px -128px}.ui-icon-video{background-position:-224px -128px}.ui-icon-script{background-position:-240px -128px}.ui-icon-alert{background-position:0 -144px}.ui-icon-info{background-position:-16px -144px}.ui-icon-notice{background-position:-32px -144px}.ui-icon-help{background-position:-48px -144px}.ui-icon-check{background-position:-64px -144px}.ui-icon-bullet{background-position:-80px -144px}.ui-icon-radio-on{background-position:-96px -144px}.ui-icon-radio-off{background-position:-112px -144px}.ui-icon-pin-w{background-position:-128px -144px}.ui-icon-pin-s{background-position:-144px -144px}.ui-icon-play{background-position:0 -160px}.ui-icon-pause{background-position:-16px -160px}.ui-icon-seek-next{background-position:-32px -160px}.ui-icon-seek-prev{background-position:-48px -160px}.ui-icon-seek-end{background-position:-64px -160px}.ui-icon-seek-start{background-position:-80px -160px}.ui-icon-seek-first{background-position:-80px -160px}.ui-icon-stop{background-position:-96px -160px}.ui-icon-eject{background-position:-112px -160px}.ui-icon-volume-off{background-position:-128px -160px}.ui-icon-volume-on{background-position:-144px -160px}.ui-icon-power{background-position:0 -176px}.ui-icon-signal-diag{background-position:-16px -176px}.ui-icon-signal{background-position:-32px -176px}.ui-icon-battery-0{background-position:-48px -176px}.ui-icon-battery-1{background-position:-64px -176px}.ui-icon-battery-2{background-position:-80px -176px}.ui-icon-battery-3{background-position:-96px -176px}.ui-icon-circle-plus{background-position:0 -192px}.ui-icon-circle-minus{background-position:-16px -192px}.ui-icon-circle-close{background-position:-32px -192px}.ui-icon-circle-triangle-e{background-position:-48px -192px}.ui-icon-circle-triangle-s{background-position:-64px -192px}.ui-icon-circle-triangle-w{background-position:-80px -192px}.ui-icon-circle-triangle-n{background-position:-96px -192px}.ui-icon-circle-arrow-e{background-position:-112px -192px}.ui-icon-circle-arrow-s{background-position:-128px -192px}.ui-icon-circle-arrow-w{background-position:-144px -192px}.ui-icon-circle-arrow-n{background-position:-160px -192px}.ui-icon-circle-zoomin{background-position:-176px -192px}.ui-icon-circle-zoomout{background-position:-192px -192px}.ui-icon-circle-check{background-position:-208px -192px}.ui-icon-circlesmall-plus{background-position:0 -208px}.ui-icon-circlesmall-minus{background-position:-16px -208px}.ui-icon-circlesmall-close{background-position:-32px -208px}.ui-icon-squaresmall-plus{background-position:-48px -208px}.ui-icon-squaresmall-minus{background-position:-64px -208px}.ui-icon-squaresmall-close{background-position:-80px -208px}.ui-icon-grip-dotted-vertical{background-position:0 -224px}.ui-icon-grip-dotted-horizontal{background-position:-16px -224px}.ui-icon-grip-solid-vertical{background-position:-32px -224px}.ui-icon-grip-solid-horizontal{background-position:-48px -224px}.ui-icon-gripsmall-diagonal-se{background-position:-64px -224px}.ui-icon-grip-diagonal-se{background-position:-80px -224px}.ui-corner-all,.ui-corner-top,.ui-corner-left,.ui-corner-tl{border-top-left-radius:3px}.ui-corner-all,.ui-corner-top,.ui-corner-right,.ui-corner-tr{border-top-right-radius:3px}.ui-corner-all,.ui-corner-bottom,.ui-corner-left,.ui-corner-bl{border-bottom-left-radius:3px}.ui-corner-all,.ui-corner-bottom,.ui-corner-right,.ui-corner-br{border-bottom-right-radius:3px}.ui-widget-overlay{background:#aaa;opacity:.003;filter:Alpha(Opacity=.3)}.ui-widget-shadow{-webkit-box-shadow:0 0 5px #666;box-shadow:0 0 5px #666}";
var doushuoScriptStyle = document.createElement("style2");
doushuoScriptStyle.innerHTML = '#db-usr-profile { width:100%;height: 58px;margin-bottom:2em; position: relative; left: 0; top: 0; zoom:1 } #db-usr-profile .pic { float:left;margin-right:12px; } #db-usr-profile .info { float:left;padding-top:2px; } #db-usr-profile  a.colbutt { position: absolute; left: 640px; top: 35px; letter-spacing:0 } #db-usr-profile  p.att { position: absolute; left: 640px; top: 38px; margin:0; background: url(/f/shire/3611ec626fed94c0db6f13472c8171d5a76daca3/pics/allright-small.gif) no-repeat left center; padding-left: 20px } #db-usr-profile .info ul li { display:inline;margin-right:1em; } #db-usr-profile .info ul li.last { margin:0; } #db-usr-profile h1 { padding:0 0 4px 0; } * html .status-item .video-player .video-overlay{background:none !important;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="/pics/video_overlay_ie6c.png?1")}.group-pics{overflow:hidden;zoom:1}.group-pics img{cursor:pointer}.group-pics .group-pics-more{display:none}.group-pics .group-pic{margin-right:7px}.group-pics .text-more{cursor:pointer;color:#999}.group-pic{position:relative;display:inline-block;*display:inline;zoom:1;vertical-align:top}.group-pic a{display:none}.group-pics-small .group-pic{float:left;clear:both;min-width:32px;min-height:32px;margin:0 0 10px 0;line-height:0;font-size:0}.group-pics-small a{display:block;position:absolute;right:0;bottom:0;width:32px;height:32px;line-height:100em;text-align:center;overflow:hidden}.group-pics-small .group-pic a:link,.group-pics-small .group-pic a:visited,.group-pics-small .group-pic a:hover,.group-pics-small .group-pic a:active{opacity:.8;filter:alpha(opacity=80);background:url(/f/sns/fbe9baba74d3637b0cca89380b58762a60ea6f82/pics/icon_zoom_in.png) no-repeat}.group-pics-small .group-pic a:hover{opacity:1;filter:alpha(opacity=100)}.group-pics-small .group-pics-more{display:block}.group-pics-small .text-more{display:none}.stream-items .status-item .movie-question-block .pic .pic-wrap{max-height:120px;width:120px;overflow:hidden}.stream-items .status-item .movie-question-block .pic .pic-wrap img{width:100%}textarea.reshare-text-input:focus::-webkit-input-placeholder{opacity:0}textarea.reshare-text-input:focus::-moz-input-placeholder{opacity:0}textarea.reshare-text-input:focus::-ms-input-placeholder{opacity:0}textarea.reshare-text-input:focus::placeholder{opacity:0}body{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%}.grid-16-8 .article{width:604px;padding:0}.grid-16-8 .aside{width:250px}#db-isay .bd,#db-isay textarea,#db-isay .highlighter{width:650px}.stream-items .status-current .bd{border-color:#a7bca7}.status-wrapper{padding:20px 0}.status-wrapper .missed_status_label{display:inline-block;margin:0 0 10px 0;color:#9e9e9e}.stream-items .status-wrapper:first-child{padding-top:0}.stream-items .status-wrapper{border-bottom:1px solid #e5e5e5}.status-wrapper:hover .btn-action-reply-delete{visibility:visible}.status-wrapper:not(.status-reshared-wrapper) .status-item .mod .attachments-saying{padding-left:0px}.status-item{overflow:hidden;color:#555}.status-item .mod{margin:0}.status-item .mod p,.status-item .mod blockquote{margin:0;padding:0}.status-item .mod .block-video{margin-top:8px}.status-item .mod .block-video .description{word-wrap:break-word;color:#555}.status-item .mod .block-video .title{font-size:14px}.status-item .mod .video-player{position:relative;left:0;top:0;zoom:1;margin-bottom:2px}.status-item .mod .video-player img{width:128px;height:96px;padding:16.5px 51px;border:0 none;background:#222}.status-item .mod .video-player .video-overlay{position:absolute;top:0;left:0;width:230px;height:129px;background:url(/f/sns/c90ee0db675c8c7571c3d9ffb020bc97cec658e8/pics/video_overlay1b.png) no-repeat 0 0;cursor:pointer}.status-item .mod .video-player .video-overlay:hover{background-position:0 -129px}.status-item .mod .video-player .video-object{display:none}.status-item .mod .block-photo{margin-top:6px;font-size:0;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em}.status-item .mod .block-photo .pic{position:relative;overflow:hidden;font-size:0;white-space:nowrap;display:inline-block;*display:inline;zoom:1;vertical-align:top;width:261px;height:175px;overflow:hidden;border:1px solid #f5f5f5;margin-left:10px}.status-item .mod .block-photo .pic .pic-wrap{position:absolute;top:-20%;bottom:-20%;left:-100%;right:-100%;_top:0;_bottom:0;_left:0;_right:0;_width:300%;_height:140%;_margin:-20% 0 0 -100%;text-align:center;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em}.status-item .mod .block-photo .pic .pic-wrap img{vertical-align:middle}.status-item .mod .block-photo .pic .valign{display:inline-block;*display:inline;*zoom:1;vertical-align:top;vertical-align:middle;width:0;height:100%;overflow:hidden}.status-item .mod .block-photo .pic:first-child{margin:0}.status-item .mod .block-photo .pic img{max-width:261px;max-width:261px;_max-width:expression(function(el,w){if(el.offsetWidth>parseInt(w,10)){el.style.width=parseInt(w,10)+"px";}}(this,"261px"))}.status-item .mod .block-photo .pic:hover img,.status-item .mod .block-photo .pic:active img{opacity:.9;filter:alpha(opacity=90)}.status-item .mod .block-album{padding-top:14px}.status-item .mod .block-album .title{margin-bottom:0}.status-item .mod a.upload-pic-wrapper:hover,.status-item .mod a.upload-pic-wrapper:active{background:transparent}.status-item .mod .album-photos{padding-top:6px;margin-bottom:10px;margin-left:-16px}.status-item .mod .album-photos a{display:block;font-size:0;line-height:0;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em;white-space:nowrap}.status-item .mod .album-photos a:hover,.status-item .mod .album-photos a:active{background-color:transparent}.status-item .mod .album-photos a:hover img,.status-item .mod .album-photos a:active img{opacity:.9;filter:alpha(opacity=90)}.status-item .mod .album-photos img{width:129px;height:129px;margin-left:16px}.status-item .mod .loading:before{position:absolute;content:"\0020";display:block;width:100%;height:100%;background:url(/f/sns/288eb6bbdffd6e18954ec9caea481f25197a3f1f/pics/sns/loading.gif) center center no-repeat;z-index:10}.status-item .mod .group-pics .group-pic{width:261px;height:175px;border:1px solid #f5f5f5;position:relative;overflow:hidden;font-size:0;white-space:nowrap}.status-item .mod .group-pics .group-pic .pic-wrap{position:absolute;top:-20%;bottom:-20%;left:-100%;right:-100%;_top:0;_bottom:0;_left:0;_right:0;_width:300%;_height:140%;_margin:-20% 0 0 -100%;text-align:center;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em}.status-item .mod .group-pics .group-pic .pic-wrap img{vertical-align:middle}.status-item .mod .group-pics .group-pic .valign{display:inline-block;*display:inline;*zoom:1;vertical-align:top;vertical-align:middle;width:0;height:100%;overflow:hidden}.status-item .mod .group-pics .group-pic img{max-width:261px;_max-width:expression(function(el,w){if(el.offsetWidth>parseInt(w,10)){el.style.width=parseInt(w,10)+"px";}}(this,"261px"))}.status-item .mod .group-pics:after{position:absolute;width:0;height:0;background:url(/f/sns/288eb6bbdffd6e18954ec9caea481f25197a3f1f/pics/sns/loading.gif) center center no-repeat}.status-item .mod .group-pics:hover img,.status-item .mod .group-pics:active img{opacity:.9;filter:alpha(opacity=90)}.status-item .mod .group-pics-small .group-pic{font-size:100%;white-space:normal;margin-bottom:15px;width:auto;height:auto;max-height:none;overflow:hidden;border:none}.status-item .mod .group-pics-small .group-pic .pic-wrap{position:static;margin:0;text-align:left}.status-item .mod .group-pics-small .group-pic .valign{display:none}.status-item .mod .group-pics-small .group-pic img{max-width:526px;width:auto !important}.status-item .mod .group-pics-small:hover img,.status-item .mod .group-pics-small:active img{opacity:1;filter:alpha(opacity=100)}.status-item .mod blockquote{overflow:hidden;margin:10px 0 0 0px;color:#555}.status-item .mod blockquote p{display:inline;padding:0 18px 0 0;*zoom:1;font-size:14px;word-wrap:break-word;white-space:pre-wrap}.status-item .mod blockquote p img{vertical-align:bottom}.from-detail.status-reshared-wrapper .status-item .mod blockquote{white-space:normal}.status-item .mod .big:hover{cursor:url(/f/sns/899c1be80650f24c634f3f0d153bc60d0b4eec95/pics/icon/big.png),url(/f/sns/555b9018bc9244a26d489e48267c0cd78d6625a5/pics/icon/big.cur),auto}.status-item .mod .small:hover{cursor:url(/f/sns/4a4db4321640fab2b32f253e71ff064daf8d2c90/pics/icon/small.png),url(/f/sns/68970f423f4c7f63a6870ee4402152a00b2fea6d/pics/icon/small.cur),auto}.status-item .mod .description{margin:0;color:#aaa;overflow:hidden;zoom:1;word-wrap:break-word}.status-item .mod .attachments{position:relative;overflow:hidden;zoom:1;_line-height:0;background:#f8f9f7;padding:16px 0 16px 20px;margin-bottom:10px}.status-item .mod .attachments div,.status-item .mod .attachments h6,.status-item .mod .attachments p{line-height:1.62}.status-item .mod .attachments h6{font-size:15px;margin-bottom:5px}.status-item .mod .attachments .description{padding-left:0;word-wrap:break-word;color:#555}.status-item .mod .attachments .media{float:right;margin-left:100px;margin-right:50px}.status-item .mod .attachments p{overflow:hidden;zoom:1}.status-item .mod .album{float:left;margin-right:20px;height:100px;width:100px;line-height:100px;vertical-align:middle;text-align:center;background:url(/f/sns/2845e06e4eea41dc937dc5fd8cc37fbc77046a4b/pics/albumback_s.gif) 1px 1px no-repeat;padding:5px 8px 8px 5px}.status-item .mod .album img{max-height:100px;max-width:100px;_width:expression((documentElement.clientWidth >100) ? "100px" : "auto" )}.status-item .mod .attachments-saying{padding-left:20px}.status-item .mod .attachments-saying a.upload-pic-wrapper:hover,.status-item .mod .attachments-saying a.upload-pic-wrapper:active{background:transparent}.status-item .mod .attachments-saying .attachment-ft a:hover,.status-item .mod .attachments-saying .attachment-ft a:active{color:#fff;background:#37a}.status-item .mod .attachments-saying:hover img,.status-item .mod .attachments-saying:active img{opacity:.9;filter:alpha(opacity=90)}.status-item .mod .actions:not(.empty){line-height:1;text-align:left;clear:both;margin:20px 0 0;color:#aaa}.no-reply .status-item .mod .actions:not(.empty){margin:0}.status-item .mod .actions:not(.empty) a.btn:not(.lnk-reshare){color:#7094b7}.status-item .mod .actions:not(.empty) a.btn:not(.lnk-reshare):hover{background:#7094b7;color:#fff}.status-item .mod .actions:not(.empty) a.btn.btn-dislike,.status-item .mod .actions:not(.empty) a.btn.btn-unlike,.status-item .mod .actions:not(.empty) a.btn.btn-unreshare{color:#999}.status-item .mod .actions:not(.empty) a.btn-dislike:hover,.status-item .mod .actions:not(.empty) a.btn-unlike:hover,.status-item .mod .actions:not(.empty) a.btn-unreshare:hover{background:#999;color:#fff}.status-item .mod .actions:not(.empty) .reshared-count{color:#aaa}.status-item .mod .created_at{margin-right:1.5em}.status-item .mod .created_at a{color:#999}.status-item .mod .created_at a:hover{background:#999;color:#fff}.status-item .mod .status_source{margin-left:1.5em}.status-item .mod .status_source a{color:#999}.status-item .mod .status_source a:hover{background:#999;color:#fff}.status-item .mod .reshared_by{margin:0;padding:0 0 0 20px;background:url(/f/sns/9730b092b7b6f96b3f380d43df17e4bac57a4afe/pics/icon/new-reshared-icon@2x.png) no-repeat left center;background-size:20px;background-position-x:-2px;color:#37a}.status-item .mod .reshared_by.deleted{color:#555}.status-item .mod .reshared_by.more-reshare{display:inline-block;padding:0;background:transparent}.status-item .mod .others{display:none;margin-top:8px}.status-item .mod .likers{margin-bottom:8px;color:#999}.status-item .mod .likers em{float:left;overflow:hidden;max-width:300px;white-space:nowrap;font-style:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis;_width:expression((documentElement.clientWidth >300) ? "300px" : "auto" )}.status-item .mod .comments{position:relative;left:0;top:0;overflow:hidden;*zoom:1}.status-item .mod .comments .comment-text{width:520px}.status-item .mod .comments .add-more-comments,.status-item .mod .comments .comment-posted .comment-text,.status-item .mod .comments .comment-posted .bn-flat{display:none}.status-item .mod .comments-items{_line-height:0}.status-item .mod .comments-items .mover{background:#f2f2f2}.status-item .mod .comments-items .btn-del{float:right;color:#aaa}.status-item .mod .comments-items .btn-del:hover{color:#bbb;background:none}.status-item .mod .comments-items p,.status-item .mod .comments-items .per-comment{margin:3px 0;padding:0 15px 0 0;color:#666;overflow:hidden;zoom:1;word-wrap:break-word;line-height:1.62}.status-item .mod .comments-items p em,.status-item .mod .comments-items .per-comment em{float:left;width:100%;font-style:normal}.status-item .mod .comment-text{padding:2px 4px;height:16px;font-size:13px;vertical-align:middle;border:1px solid #c9c9c9;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.status-item .mod .comment-text:focus{border:1px solid #a9a9a9}.status-item .mod .bn-flat input{height:20px;line-height:20px;padding:0 5px 2px}.status-item .mod .comment-posted .add-more-comments{display:inline}.status-item .mod .per-comment .comment-report{display:none}.status-item .mod .commodity-block .pic{position:relative;overflow:hidden;font-size:0;white-space:nowrap;max-height:none;width:177px;height:130px;overflow:hidden;margin-right:5px;margin-left:60px}.status-item .mod .commodity-block .pic .pic-wrap{position:absolute;top:-20%;bottom:-20%;left:-100%;right:-100%;_top:0;_bottom:0;_left:0;_right:0;_width:300%;_height:140%;_margin:-20% 0 0 -100%;text-align:center;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em}.status-item .mod .commodity-block .pic .pic-wrap img{vertical-align:middle}.status-item .mod .commodity-block .pic .valign{display:inline-block;*display:inline;*zoom:1;vertical-align:top;vertical-align:middle;width:0;height:100%;overflow:hidden}.status-item .mod .commodity-block .pic img{width:auto;max-width:177px;_width:177px}.status-item .mod .commodity-review-block .pic{position:relative;overflow:hidden;font-size:0;white-space:nowrap;max-height:none;width:107px;height:72px;overflow:hidden;margin-right:5px;margin-left:24px}.status-item .mod .commodity-review-block .pic .pic-wrap{position:absolute;top:-20%;bottom:-20%;left:-100%;right:-100%;_top:0;_bottom:0;_left:0;_right:0;_width:300%;_height:140%;_margin:-20% 0 0 -100%;text-align:center;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em}.status-item .mod .commodity-review-block .pic .pic-wrap img{vertical-align:middle}.status-item .mod .commodity-review-block .pic .valign{display:inline-block;*display:inline;*zoom:1;vertical-align:top;vertical-align:middle;width:0;height:100%;overflow:hidden}.status-item .mod .commodity-review-block .pic img{width:auto;max-width:107px;_width:107px}.status-item .mod .commodity-doulist-block .title{margin-bottom:8px}.status-item .mod .commodity-doulist-block .doulist-photos{margin-bottom:10px;font-size:0;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em;margin-left:-15px}.status-item .mod .commodity-doulist-block .doulist-photos img{width:55px;height:55px;margin-left:15px}.status-item .mod .url-block .pic{position:relative;overflow:hidden;font-size:0;white-space:nowrap;max-height:none;width:122px;height:82px;margin-right:5px;margin-left:24px}.status-item .mod .url-block .pic .pic-wrap{position:absolute;top:-20%;bottom:-20%;left:-100%;right:-100%;_top:0;_bottom:0;_left:0;_right:0;_width:300%;_height:140%;_margin:-20% 0 0 -100%;text-align:center;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em}.status-item .mod .url-block .pic .pic-wrap img{vertical-align:middle}.status-item .mod .url-block .pic .valign{display:inline-block;*display:inline;*zoom:1;vertical-align:top;vertical-align:middle;width:0;height:100%;overflow:hidden}.status-item .mod .url-block .pic img{width:122px;max-width:122px;_width:122px}.status-item .mod .note-block .pic{position:relative;overflow:hidden;font-size:0;white-space:nowrap;max-height:none;width:122px;height:82px;margin-right:5px;margin-left:24px}.status-item .mod .note-block .pic .pic-wrap{position:absolute;top:-20%;bottom:-20%;left:-100%;right:-100%;_top:0;_bottom:0;_left:0;_right:0;_width:300%;_height:140%;_margin:-20% 0 0 -100%;text-align:center;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em}.status-item .mod .note-block .pic .pic-wrap img{vertical-align:middle}.status-item .mod .note-block .pic .valign{display:inline-block;*display:inline;*zoom:1;vertical-align:top;vertical-align:middle;width:0;height:100%;overflow:hidden}.status-item .mod .note-block .pic img{width:122px;_width:122px}.status-item .mod .block-song{display:inline-block;*display:inline;*zoom:1;vertical-align:top;background:#f9f9f9;min-width:228px;max-width:400px;_width:320px;white-space:nowrap}.status-real-wrapper .status-item .mod .block-song{background:#fff;margin:10px 0 0 0}.status-item .mod .block-song .pic{position:relative;display:inline-block;*display:inline;zoom:1;vertical-align:middle;width:64px;max-height:64px;_height:64px;margin-right:8px;*margin-right:7px;overflow:hidden;line-height:0;font-size:0}.status-item .mod .block-song .pic i{position:absolute;top:0;bottom:0;left:0;right:0;_height:100%;background-position:50% 50%;background-repeat:no-repeat;background-image:url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png);background-image:-webkit-image-set(url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png) 1x, url(/f/sns/990331ed0f35e42d1b2dc958fe5ed9f0a834c19e/pics/timeline-player-cover@2x.png) 2x);background-image:-moz-image-set(url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png) 1x, url(/f/sns/990331ed0f35e42d1b2dc958fe5ed9f0a834c19e/pics/timeline-player-cover@2x.png) 2x);background-image:-ms-image-set(url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png) 1x, url(/f/sns/990331ed0f35e42d1b2dc958fe5ed9f0a834c19e/pics/timeline-player-cover@2x.png) 2x);background-image:-o-image-set(url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png) 1x, url(/f/sns/990331ed0f35e42d1b2dc958fe5ed9f0a834c19e/pics/timeline-player-cover@2x.png) 2x);opacity:0.8;filter:Alpha(Opacity=80);_background-image:url(/f/sns/6dd140542bc4d9d0b61d1afba8610403bb3dc6f9/pics/timeline-player-cover-ie.png)}.status-item .mod .block-song .pic:hover i{opacity:1;filter:Alpha(Opacity=100)}.status-item .mod .block-song .pic img{width:64px;vertical-align:middle}.status-item .mod .block-song .info{width:320px;display:inline-block;*display:inline;zoom:1;vertical-align:middle;padding-right:10px;overflow:hidden;zoom:1;word-wrap:break-word;color:#666}.status-item .mod .block-song .info a.channel-name{display:inline-block;*display:inline;zoom:1;height:20px}.status-item .mod .block-song .info a.channel-name p{height:20px;overflow:hidden;display:inline-block;zoom:1;*display:inline;text-overflow:ellipsis;white-space:nowrap}.status-item .mod .block-song .title{margin:5px 0;font-size:14px}.status-item .mod .song blockquote{margin-top:16px}.status-item .mod .block-songlist{color:#666}.status-item .mod .block-songlist .play-length{margin-left:5px;color:#999}.status-item .mod .block-songlist .pic{position:relative;margin:4px 5px 0 60px;width:100px;max-height:100px;_height:100px;overflow:hidden}.status-item .mod .block-songlist .pic img{width:100px}.status-item .mod .block-songlist .pic i{position:absolute;top:0;bottom:0;left:0;right:0;_height:100%;background-position:50% 50%;background-repeat:no-repeat;background-image:url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png);background-image:-webkit-image-set(url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png) 1x, url(/f/sns/990331ed0f35e42d1b2dc958fe5ed9f0a834c19e/pics/timeline-player-cover@2x.png) 2x);background-image:-moz-image-set(url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png) 1x, url(/f/sns/990331ed0f35e42d1b2dc958fe5ed9f0a834c19e/pics/timeline-player-cover@2x.png) 2x);background-image:-ms-image-set(url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png) 1x, url(/f/sns/990331ed0f35e42d1b2dc958fe5ed9f0a834c19e/pics/timeline-player-cover@2x.png) 2x);background-image:-o-image-set(url(/f/sns/29a478366d210acff7a1b1fcecadf46893fd3353/pics/timeline-player-cover.png) 1x, url(/f/sns/990331ed0f35e42d1b2dc958fe5ed9f0a834c19e/pics/timeline-player-cover@2x.png) 2x);opacity:0.8;filter:Alpha(Opacity=80);_background-image:url(/f/sns/6dd140542bc4d9d0b61d1afba8610403bb3dc6f9/pics/timeline-player-cover-ie.png)}.status-item .mod .block-songlist .pic:hover i{opacity:1;filter:Alpha(Opacity=100)}.status-item .mod .icon-feed-book{width:48px;height:48px;background:url(/f/sns/c367985fc8033adc5cb5ff092def5da9a0c423dd/pics/icon/ic_feed_book.png) no-repeat 0 0}.status-item .mod .icon-feed-movie{width:48px;height:48px;background:url(/f/sns/9346fc3b5c5c4e23fd689f83ea89a0e80c318a51/pics/icon/ic_feed_movie.png) no-repeat 0 0}.status-item .mod .icon-feed-music{width:48px;height:48px;background:url(/f/sns/28106dbd8c63e47cdb034e23ab57f1619dc39bfa/pics/icon/ic_feed_music.png) no-repeat 0 0}.status-item .mod .icon-feed-mobile{width:48px;height:48px;background:url() no-repeat 0 0}.status-item .mod .icon-feed-web{width:48px;height:48px;background:url(/f/sns/e909e6a9c8bf9516713f5c2e4e7697b83dbcdd8c/pics/icon/ic_feed_web.png) no-repeat 0 0}.status-item .mod .market-interest-spu-block .pic{position:relative;overflow:hidden;font-size:0;white-space:nowrap;max-height:none;width:120px;height:120px;overflow:hidden;margin-right:5px;margin-left:60px}.status-item .mod .market-interest-spu-block .pic .pic-wrap{position:absolute;top:-20%;bottom:-20%;left:-100%;right:-100%;_top:0;_bottom:0;_left:0;_right:0;_width:300%;_height:140%;_margin:-20% 0 0 -100%;text-align:center;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em}.status-item .mod .market-interest-spu-block .pic .pic-wrap img{vertical-align:middle}.status-item .mod .market-interest-spu-block .pic .valign{display:inline-block;*display:inline;*zoom:1;vertical-align:top;vertical-align:middle;width:0;height:100%;overflow:hidden}.status-item .mod .market-interest-spu-block .pic img{width:auto;max-width:120px;_width:120px}.status-item .mod .market-shop-spu-block{padding:10px 10px 10px 20px}.status-item .mod .market-shop-spu-block .pic{float:left;margin:0;max-height:120px}.status-item .mod .market-shop-spu-block .pic img{width:120px;height:120px}.status-item .mod .market-shop-spu-block .content{display:table-cell;width:350px;padding-left:10px}.status-item .mod .market-shop-spu-block .content .spu-title,.status-item .mod .market-shop-spu-block .content .shop-name{display:block;font-size:14px;color:#535353;line-height:22px}.status-item .mod .market-shop-spu-block .content .shop-name{font-size:13px;font-weight:bold}.status-item .mod .market-shop-spu-block .content .spu-price{display:block;font-size:13px;font-weight:700;line-height:22px}.status-item .mod .market-shop-spu-block .content .spu-price span{color:#CC3344}.status-item .mod .market-shop-spu-block .content .spu-price del{color:#9A9A9A}.status-item .mod .erebor-ad{float:right;position:relative;font-size:11px}.status-item .mod .erebor-ad span,.status-item .mod .erebor-ad ul{color:#aaa;background:#fff}.status-item .mod .erebor-ad span{border-radius:2px;border:1px solid #ccc;padding:5px 7px 4px;cursor:pointer;line-height:1;display:inline-block}.status-item .mod .erebor-ad span:after{content:"";width:7px;height:7px;border:1px solid #bbb;border-top:0;border-right:0;transform:translateY(-2px) rotate(-45deg);display:inline-block;margin-left:5px}.status-item .mod .erebor-ad ul{display:none;position:absolute;z-index:1;right:0;top:25px;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,0.45)}.status-item .mod .erebor-ad li{padding:5px 16px 4px;white-space:nowrap;cursor:pointer}.status-item .mod .erebor-ad.is-active ul{display:initial}.status-item .mod .erebor-block .pic{position:relative;overflow:hidden;font-size:0;white-space:nowrap;max-height:none;width:177px;height:130px;margin-right:5px;margin-left:24px}.status-item .mod .erebor-block .pic .pic-wrap{position:absolute;top:-20%;bottom:-20%;left:-100%;right:-100%;_top:0;_bottom:0;_left:0;_right:0;_width:300%;_height:140%;_margin:-20% 0 0 -100%;text-align:center;letter-spacing:-.31em;*letter-spacing:normal;*word-spacing:-.43em}.status-item .mod .erebor-block .pic .pic-wrap img{vertical-align:middle}.status-item .mod .erebor-block .pic .valign{display:inline-block;*display:inline;*zoom:1;vertical-align:top;vertical-align:middle;width:0;height:100%;overflow:hidden}.status-item .mod .erebor-block .pic .redir-img{width:177px;_width:177px}.status-item[data-object-kind="0"] .mod{margin:0}.status-item .hd{margin-bottom:10px}.status-item .hd .usr-pic{float:left;position:relative;z-index:1;margin-right:20px}.status-item .hd .usr-pic.verify{margin-right:14px}.status-item .hd .usr-pic img{width:48px;height:48px}.status-item .hd .text{overflow:hidden;position:relative;font-size:14px;color:#9d9d9d}.status-item .hd .text .lnk-people{font-weight:bold}.status-item .hd .text .lnk-people:link,.status-item .hd .text .lnk-people:visited{color:#555}.status-item .hd .text .lnk-people:hover{color:#fff}.status-item .hd .text .lnk-subject:link,.status-item .hd .text .lnk-subject:visited{color:#37a}.status-item .hd .text .lnk-subject:hover{color:#fff}.status-item .hd .pubtime{margin-top:7px;position:relative;font-size:13px;color:#060}.status-item .bd{zoom:1;padding-left:10%}.status-item .bd .rating-stars{color:#555;white-space:nowrap}.status-item .bd .rating-stars i{color:#555}.status-item .bd a.btn-fav,.status-item .bd .rec-sec{margin:12px 0 0;text-align:left}.status-item .bd .rec-sec{float:left}.status-item .bd a.btn-fav,.status-item .bd .rec-sec a{display:inline-block;height:22px;padding:0 7px 0 22px;border:1px solid #d5d5d5;color:#333;background:url(/f/sns/08a89615238dcb809bba4a8acf80d166542dbe71/pics/icon/ic_actions.png) no-repeat 7px -36px;line-height:22px;border-radius:2px}.status-item .bd a.btn-fav:hover,.status-item .bd .rec-sec a:hover{border-color:#ababab;background:url(/f/sns/08a89615238dcb809bba4a8acf80d166542dbe71/pics/icon/ic_actions.png) #fff no-repeat 7px -56px;color:#333}.status-item .bd .doulist-add-btn a{display:inline-block;height:22px;border:1px solid #d5d5d5;color:#333;line-height:22px;border-radius:2px;padding:0 7px 0 6px;margin-top:12px;margin-left:10px;background:none}.status-item .bd .doulist-add-btn a i{font-size:0;height:9px;margin-right:3px;background-image:url(/f/sns/bd4994ff360a5a29aaa9090b7fba76658a5588b9/pics/sns/doulist/add_list.png);background-image:-webkit-image-set(url(/f/sns/bd4994ff360a5a29aaa9090b7fba76658a5588b9/pics/sns/doulist/add_list.png) 1x, url(/f/sns/5b3e3256461645ce079881d162274ecad8a387ba/pics/sns/doulist/add_list@2x.png) 2x);background-image:-moz-image-set(url(/f/sns/bd4994ff360a5a29aaa9090b7fba76658a5588b9/pics/sns/doulist/add_list.png) 1x, url(/f/sns/5b3e3256461645ce079881d162274ecad8a387ba/pics/sns/doulist/add_list@2x.png) 2x);background-image:-ms-image-set(url(/f/sns/bd4994ff360a5a29aaa9090b7fba76658a5588b9/pics/sns/doulist/add_list.png) 1x, url(/f/sns/5b3e3256461645ce079881d162274ecad8a387ba/pics/sns/doulist/add_list@2x.png) 2x);background-image:-o-image-set(url(/f/sns/bd4994ff360a5a29aaa9090b7fba76658a5588b9/pics/sns/doulist/add_list.png) 1x, url(/f/sns/5b3e3256461645ce079881d162274ecad8a387ba/pics/sns/doulist/add_list@2x.png) 2x);background:url(/f/sns/bd4994ff360a5a29aaa9090b7fba76658a5588b9/pics/sns/doulist/add_list.png) no-repeat}.status-item .bd .doulist-add-btn a:hover{border-color:#ababab;background-color:#fff;color:#333}.status-item .bd .doulist-add-btn a:hover i{background-position:0 -9px}.status-item .bd a.btn-fav{background-position:7px 5px}.status-item .bd a.btn-fav:hover{background-position:7px -15px}.status-item .bd a.fav-cancel{background-position:7px -76px}.status-item .bd a.fav-cancel:hover{background-position:7px -96px}.status-item .bd a.fav-cancel:before{content:"已"}.status-item .bd .author-tags-container{display:inline-block;*display:inline;*zoom:1;vertical-align:top;padding-top:17px}.status-item .bd .author-tags-container .splitter{display:inline-block;*display:inline;*zoom:1;vertical-align:top;margin:0 15px;margin-top:-3px;width:2px;height:20px;background-color:#b6b6b6}.status-item .bd .author-tags-container .tags{display:inline-block;*display:inline;*zoom:1;vertical-align:top;color:#b6b6b6;width:350px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.status-item .bd .author-tags-container .tags a{margin-left:10px;color:#b6b6b6}.status-item .bd .author-tags-container .tags a:hover{background-color:initial}.status-item .block{overflow:hidden;zoom:1;padding:16px 20px;background:#f9f9f9}.status-real-wrapper .status-item .block{background:#fff}.status-item .block .pic{float:right;*display:inline;max-height:70px;_height:70px;overflow:hidden;margin:4px 23px 0 50px}.status-item .block .pic img{width:75px}.status-item .block .price{margin:7px 0 13px}.status-item .block .content{overflow:hidden;zoom:1;word-wrap:break-word}.status-item .block .title{margin-bottom:4px;font-size:15px}.status-item .block .info{position:relative;margin-top:4px;padding-left:7px;_border-left:2px solid #ddd}.status-item .block .info:before{content:"";position:absolute;height:90%;top:2px;left:0;border-left:2px solid #ddd}.status-item .block .info li{margin-top:2px;zoom:1}.status-item .block .info .label{float:left;*display:inline;margin-right:2px}.status-item .block .info span{display:block;overflow:hidden;zoom:1;line-height:1.4;word-wrap:break-word}.status-item .block .info-compact{border:none;padding:0}.status-item .block-events .pic,.status-item .block-subject .pic{max-height:120px;_height:auto}.status-item .block-subject .rating_num{color:#e09015}.status-item .attachment{padding:0 20px 16px;margin-top:-16px;background:#f9f9f9}.status-item .status-saying{margin:0}.status-item .status-saying blockquote{margin:0}.status-item .status-saying .group-pics{margin-top:5px}.status-item .status-saying .attachments-pic{margin-top:5px;margin-bottom:12px}.status-item .status-saying .attachments-pic img{border:1px solid #f5f5f5}.status-item .status-saying .text-more{line-height:1;margin-top:7px}.combined-statuses{padding:25px 0 25px 11%;border-bottom:1px solid #e7e7e7}#db-isay .drag-tips{display:none;position:absolute;top:0;z-index:2;background:#fff;width:596px;height:78px;line-height:78px;font-size:17px;text-align:center;border:4px dashed #ccc;color:#999}#db-isay.drag textarea,#db-isay.drag label,#db-isay.drag p{visibility:hidden}#db-isay.drag .drag-tips{display:block}#db-isay.drag .drag-tips.over{background:#eee;color:#666}.empty-tip{padding:10px 0;margin-top:-8px;text-align:center;background:#f9f9f9}.hide-ghost .ghost{display:none}.dui-dialog.fav-tag-tip:after{left:20px;border-color:#666 #f9f9f9 #f9f9f9}.reshared_by{display:inline-block;margin:0 0 10px 0;color:#9e9e9e}.reshared_by a{color:#9e9e9e}.reshared_by a:hover{color:#fff}.reshared_by.deleted{color:#555}.reshared_by+.btn-action-reply-delete{visibility:hidden;float:right;color:#9e9e9e}.reshared_by+.btn-action-reply-delete:hover,.reshared_by+.btn-action-reply-delete:visited,.reshared_by+.btn-action-reply-delete:link{background:transparent}.status-reshared-wrapper{position:relative;overflow:hidden}.status-reshared-wrapper .no-border{border:0 !important}.status-reshared-wrapper .with-border{border-bottom:1px solid #e5e5e5;padding-bottom:20px}.status-reshared-wrapper .mod{margin-bottom:0}.status-reshared-wrapper .reshare-action{color:#9d9d9d}.status-reshared-wrapper .hd blockquote{overflow:hidden;color:#555}.status-reshared-wrapper .hd blockquote p{white-space:normal}.status-reshared-wrapper>.status-item .mod .bd{overflow:visible}.status-reshared-wrapper .bd{margin-left:0;border-bottom:0}.status-reshared-wrapper .actions{position:absolute;bottom:0;width:88%;padding-bottom:25px}.status-reshared-wrapper .others{width:90%;position:absolute}.status-real-wrapper{overflow:hidden;background:#f9f9f9;margin:0 0 20px 68px}.status-real-wrapper.say [data-object-kind="1025"] .bd{padding:0 0 1.2em 20px}.status-real-wrapper .usr-pic,.status-real-wrapper .actions,.status-real-wrapper .rec-sec,.status-real-wrapper .doulist-add-btn,.status-real-wrapper .attachment,.status-real-wrapper .pubtime{display:none !important}.status-real-wrapper .mod::after{display:block}.status-real-wrapper .mod .hd{cursor:pointer;padding:10px 20px 5px;margin-bottom:0}.status-real-wrapper .mod .hd .text{color:#9d9d9d;left:0}.status-real-wrapper .mod .hd blockquote{margin:5px 0;color:#555}.status-real-wrapper .mod .hd a.lnk-people{font-weight:normal}.status-real-wrapper .mod .hd a.lnk-people,.status-real-wrapper .mod .hd a.lnk-people:link,.status-real-wrapper .mod .hd a.lnk-people:visited{color:#3478aa}.status-real-wrapper .mod .hd a.lnk-people:hover{color:#fff}.status-real-wrapper .mod .bd{margin-left:0;padding:0 1.5em 1.2em}.status-real-wrapper .mod .bd:empty{padding:0}.status-real-wrapper .mod .bd blockquote{padding:0 20px}.status-real-wrapper .mod .bd .status-saying{padding:0 0 5px 0}.status-real-wrapper .deleted .mod .hd{padding:10px 20px}.status-real-wrapper.say{border:0;cursor:pointer}.status-real-wrapper.say .bd{padding:0 0 5px 0}.st-bottom-line{float:left;margin-bottom:15px}.from-detail .st-bottom-line{margin-bottom:0}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@-moz-keyframes fadeIn{from{opacity:0}to{opacity:1}}@-o-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadeOut{from{opacity:1}68%{opacity:1}to{opacity:0;display:none}}@-moz-keyframes fadeOut{from{opacity:1}68%{opacity:1}to{opacity:0;display:none}}@-o-keyframes fadeOut{from{opacity:1}68%{opacity:1}to{opacity:0;display:none}}@keyframes fadeOut{from{opacity:1}68%{opacity:1}to{opacity:0;display:none}}@-webkit-keyframes fadeInOutAndHide{from{opacity:0}99%{opacity:1}100%{opacity:1}}@-moz-keyframes fadeInOutAndHide{from{opacity:0}99%{opacity:1}100%{opacity:1}}@-o-keyframes fadeInOutAndHide{from{opacity:0}99%{opacity:1}100%{opacity:1}}@keyframes fadeInOutAndHide{from{opacity:0}99%{opacity:1}100%{opacity:1}}.fadein{-webkit-animation:fadeIn 0.5s ease-in;-moz-animation:fadeIn 0.5s ease-in;-ms-animation:fadeIn 0.5s ease-in;-o-animation:fadeIn 0.5s ease-in;animation:fadeIn 0.5s ease-in;-webkit-backface-visibility:hidden}.fadeout{-webkit-animation:fadeOut 1.4s ease-out;-moz-animation:fadeOut 1.4s ease-out;-ms-animation:fadeOut 1.4s ease-out;-o-animation:fadeOut 1.4s ease-out;animation:fadeOut 1.4s ease-out;-webkit-backface-visibility:hidden}.fade-in-out-and-hide{-webkit-animation:fadeInOutAndHide 2s ease-in-out;-moz-animation:fadeInOutAndHide 2s ease-in-out;-ms-animation:fadeInOutAndHide 2s ease-in-out;-o-animation:fadeInOutAndHide 2s ease-in-out;animation:fadeInOutAndHide 2s ease-in-out;-webkit-backface-visibility:hidden}#db-tagsug-list.suggest-overlay{z-index:10001}.dui-dialog.dialog-reshare{color:#9d9d9d}.dui-dialog.dialog-reshare .more-reshare,.dui-dialog.dialog-reshare .pubtime,.dui-dialog.dialog-reshare .usr-pic,.dui-dialog.dialog-reshare .actions,.dui-dialog.dialog-reshare .rec-sec,.dui-dialog.dialog-reshare .doulist-add-btn,.dui-dialog.dialog-reshare .attachment{display:none !important}.dui-dialog.dialog-reshare .hd{cursor:auto;padding:30px 30px 0;background:transparent}.dui-dialog.dialog-reshare .hd h3{line-height:1;padding:0;margin:0}.dui-dialog-content>.dui-dialog.dialog-reshare .hd{color:#047722}.dui-dialog.dialog-reshare .dui-dialog-content>.bd{padding:20px 30px 30px}.dui-dialog.dialog-reshare .dui-dialog-content .bd{border:0}.dui-dialog.dialog-reshare .dui-dialog-content [data-object-kind="1025"] .bd{padding:0 0 1.2em 0}.dui-dialog.dialog-reshare .group-pics img,.dui-dialog.dialog-reshare a{cursor:default}.dui-dialog.dialog-reshare .group-pics img:hover,.dui-dialog.dialog-reshare a:hover{background-color:transparent}.dui-dialog.dialog-reshare a.dui-dialog-close{font-size:15px;font-weight:lighter;top:30px;right:30px;cursor:pointer}.dui-dialog.dialog-reshare a.dui-dialog-close:hover{color:#949494}.dui-dialog.dialog-reshare .text a,.dui-dialog.dialog-reshare .text a:hover,.dui-dialog.dialog-reshare .text a:visited,.dui-dialog.dialog-reshare .text a:link,.dui-dialog.dialog-reshare a.lnk-people,.dui-dialog.dialog-reshare a.lnk-people:hover,.dui-dialog.dialog-reshare a.lnk-people:visited,.dui-dialog.dialog-reshare a.lnk-people:link{color:#9d9d9d !important;background-color:transparent !important}.dui-dialog.dialog-reshare .left-num,.dui-dialog.dialog-reshare strong.success,.dui-dialog.dialog-reshare strong.error,.dui-dialog.dialog-reshare strong.loading{position:absolute;top:160px;right:135px}.dui-dialog.dialog-reshare strong.success{font-size:1.2em;padding-left:2em;color:#9d9d9d;background-image:url("data:image/svg+xml;utf8,<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="checked"><g id="Group"><circle id="Oval" fill="#0CD178" cx="12" cy="12" r="12"></circle><path d="M10.1573581,14.5080756 L7.66556064,11.6031375 C7.23498806,11.1011758 6.5174599,11.0767882 6.0549128,11.5393354 L6.31823047,11.2760177 C5.86647178,11.7277764 5.82685793,12.517067 6.25384706,13.0148511 L9.26516793,16.5254497 C9.30710429,16.5743391 9.35176274,16.6186982 9.39864258,16.6585183 L9.42564036,16.6855161 C9.41798699,16.6778627 9.41048015,16.6701236 9.40311973,16.6623018 C9.41492042,16.672223 9.42686003,16.6818582 9.43893063,16.6912075 C9.80417427,16.9894311 10.3253232,17.0071026 10.7171469,16.7325314 C10.6851669,16.774659 10.6502734,16.8147942 10.6124981,16.8525695 L10.780135,16.6849326 C10.8064385,16.6635376 10.8320361,16.6407157 10.8568307,16.616463 L17.5581237,10.0616372 C17.9769819,9.65193383 17.9891097,8.99237982 17.5776005,8.58087057 L17.643753,8.6470231 C17.2356516,8.23892165 16.5724818,8.2331645 16.1464102,8.64992363 L10.1573581,14.5080756 Z" id="Combined-Shape" fill="#FFFFFF" transform="translate(11.917359, 12.633193) rotate(-4.000000) translate(-11.917359, -12.633193) "></path></g></g></g></svg>");background-repeat:no-repeat;background-position:0 50%;background-size:20px}.dui-dialog.dialog-reshare strong.error{color:#F92D09}.dui-dialog.dialog-reshare .left-num{font-weight:bold}.dui-dialog.dialog-reshare .left-num.negative{color:#F92D09}.dui-dialog.dialog-reshare .ft{z-index:99;position:absolute;top:200px;right:40px;margin:10px 0 10px;padding:0}.dui-dialog.dialog-reshare .ft .bn-flat{margin:0;border:0}.dui-dialog.dialog-reshare .ft .bn-flat input{background:#3aa252;margin:0;width:5em;height:30px;line-height:30px;font-size:15px;text-align:center;vertical-align:middle;color:white}.dui-dialog.dialog-reshare .ft .bn-flat input.loading{width:6.5em;padding-left:2em;color:#fff;background-image:url("data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 80"> <path fill="#fff" d="M10,40c0,0,0-0.4,0-1.1c0-0.3,0-0.8,0-1.3c0-0.3,0-0.5,0-0.8c0-0.3,0.1-0.6,0.1-0.9c0.1-0.6,0.1-1.4,0.2-2.1 c0.2-0.8,0.3-1.6,0.5-2.5c0.2-0.9,0.6-1.8,0.8-2.8c0.3-1,0.8-1.9,1.2-3c0.5-1,1.1-2,1.7-3.1c0.7-1,1.4-2.1,2.2-3.1 c1.6-2.1,3.7-3.9,6-5.6c2.3-1.7,5-3,7.9-4.1c0.7-0.2,1.5-0.4,2.2-0.7c0.7-0.3,1.5-0.3,2.3-0.5c0.8-0.2,1.5-0.3,2.3-0.4l1.2-0.1 l0.6-0.1l0.3,0l0.1,0l0.1,0l0,0c0.1,0-0.1,0,0.1,0c1.5,0,2.9-0.1,4.5,0.2c0.8,0.1,1.6,0.1,2.4,0.3c0.8,0.2,1.5,0.3,2.3,0.5 c3,0.8,5.9,2,8.5,3.6c2.6,1.6,4.9,3.4,6.8,5.4c1,1,1.8,2.1,2.7,3.1c0.8,1.1,1.5,2.1,2.1,3.2c0.6,1.1,1.2,2.1,1.6,3.1 c0.4,1,0.9,2,1.2,3c0.3,1,0.6,1.9,0.8,2.7c0.2,0.9,0.3,1.6,0.5,2.4c0.1,0.4,0.1,0.7,0.2,1c0,0.3,0.1,0.6,0.1,0.9 c0.1,0.6,0.1,1,0.1,1.4C74,39.6,74,40,74,40c0.2,2.2-1.5,4.1-3.7,4.3s-4.1-1.5-4.3-3.7c0-0.1,0-0.2,0-0.3l0-0.4c0,0,0-0.3,0-0.9 c0-0.3,0-0.7,0-1.1c0-0.2,0-0.5,0-0.7c0-0.2-0.1-0.5-0.1-0.8c-0.1-0.6-0.1-1.2-0.2-1.9c-0.1-0.7-0.3-1.4-0.4-2.2 c-0.2-0.8-0.5-1.6-0.7-2.4c-0.3-0.8-0.7-1.7-1.1-2.6c-0.5-0.9-0.9-1.8-1.5-2.7c-0.6-0.9-1.2-1.8-1.9-2.7c-1.4-1.8-3.2-3.4-5.2-4.9 c-2-1.5-4.4-2.7-6.9-3.6c-0.6-0.2-1.3-0.4-1.9-0.6c-0.7-0.2-1.3-0.3-1.9-0.4c-1.2-0.3-2.8-0.4-4.2-0.5l-2,0c-0.7,0-1.4,0.1-2.1,0.1 c-0.7,0.1-1.4,0.1-2,0.3c-0.7,0.1-1.3,0.3-2,0.4c-2.6,0.7-5.2,1.7-7.5,3.1c-2.2,1.4-4.3,2.9-6,4.7c-0.9,0.8-1.6,1.8-2.4,2.7 c-0.7,0.9-1.3,1.9-1.9,2.8c-0.5,1-1,1.9-1.4,2.8c-0.4,0.9-0.8,1.8-1,2.6c-0.3,0.9-0.5,1.6-0.7,2.4c-0.2,0.7-0.3,1.4-0.4,2.1 c-0.1,0.3-0.1,0.6-0.2,0.9c0,0.3-0.1,0.6-0.1,0.8c0,0.5-0.1,0.9-0.1,1.3C10,39.6,10,40,10,40z" > <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="0.6s" repeatCount="indefinite"/></path></svg>");background-repeat:no-repeat;background-position:8px 50%;background-size:18px}.dui-dialog.dialog-reshare .ft .bn-flat input.success{background:#d7d7d7}.dialog-reshare-status-hd{border:1px solid #e7e7e7;height:172px;margin-bottom:10px;position:relative}.dialog-reshare-status-hd textarea{position:relative;z-index:1;background:transparent;overflow:hidden;vertical-align:bottom;width:96%;padding:10px;font-size:13px;font-family:tahoma;border:0;-webkit-transition:all 0.1s;-moz-transition:all 0.1s}.dialog-reshare-status-hd .highlighter{margin:0;position:absolute;z-index:0;top:1px;left:2px;overflow:hidden;background:#fff;white-space:pre-wrap;word-wrap:break-word;color:transparent;width:96%;padding:10px;height:16px;overflow:hidden;vertical-align:bottom;font-family:tahoma;line-height:1.3;border-radius:2px 2px 0 0;-moz-border-radius:2px 2px 0 0}.dialog-reshare-status-hd .reshare-text-input::focus ~ .highlighter{height:auto}.dialog-reshare-status-hd .highlighter code{font-family:tahoma;line-height:1.3;background-color:#d2e1f3;color:#d2e1f3;display:inline;padding:1px;margin:0 -1px -2px;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px}.dialog-reshare-status-hd .error-highlighter{background:transparent}.dialog-reshare-status-hd .error-highlighter code{background-color:#fcc;color:#fcc}.dui-dialog.dialog-reshare .status-real-wrapper,.dui-dialog.dialog-reshare .dialog-reshare-status-bd{margin:0}.status-real-wrapper .block,.dialog-reshare-status-bd .block{background:#fff}.status-real-wrapper .mod .reshared_by.deleted,.dialog-reshare-status-bd .mod .reshared_by.deleted{color:#9d9d9d}.status-real-wrapper .mod .hd,.dialog-reshare-status-bd .mod .hd{padding:10px 20px 5px;margin-bottom:0}.status-real-wrapper .mod .hd.reshared_hd,.dialog-reshare-status-bd .mod .hd.reshared_hd{padding-left:0}.status-real-wrapper .mod .hd blockquote,.dialog-reshare-status-bd .mod .hd blockquote{margin:5px 0}.status-real-wrapper .mod .hd .text,.dialog-reshare-status-bd .mod .hd .text{left:0}.status-real-wrapper .mod .hd a.lnk-people,.dialog-reshare-status-bd .mod .hd a.lnk-people{font-weight:normal;color:#3478aa}.status-real-wrapper .mod .bd blockquote,.dialog-reshare-status-bd .mod .bd blockquote{padding:0 20px}.status-real-wrapper .mod .bd .status-saying,.dialog-reshare-status-bd .mod .bd .status-saying{padding:0 0 5px 0}.dui-dialog.dialog-reshare .dialog-reshare-status-bd{height:200px;overflow:auto;border:0}.dui-dialog.dialog-reshare .dialog-reshare-status-bd .reshared_hd{padding-top:0}.dui-dialog.dialog-reshare .dialog-reshare-status-bd .reshared_hd+.bd{padding:0}.dui-dialog.dialog-reshare .dialog-reshare-status-bd .status-item,.dui-dialog.dialog-reshare .dialog-reshare-status-bd.status-item{cursor:auto;color:#9d9d9d}.dui-dialog.dialog-reshare .dialog-reshare-status-bd .status-item a:link,.dui-dialog.dialog-reshare .dialog-reshare-status-bd .status-item a:visited,.dui-dialog.dialog-reshare .dialog-reshare-status-bd .status-item a.lnk-people:link,.dui-dialog.dialog-reshare .dialog-reshare-status-bd .status-item a.lnk-people:visited,.dui-dialog.dialog-reshare .dialog-reshare-status-bd.status-item a:link,.dui-dialog.dialog-reshare .dialog-reshare-status-bd.status-item a:visited,.dui-dialog.dialog-reshare .dialog-reshare-status-bd.status-item a.lnk-people:link,.dui-dialog.dialog-reshare .dialog-reshare-status-bd.status-item a.lnk-people:visited{color:#9d9d9d}.dui-dialog.dialog-reshare .dialog-reshare-status-bd .mod{margin-bottom:0}.dui-dialog.dialog-reshare .dialog-reshare-status-bd .mod .hd blockquote,.dui-dialog.dialog-reshare .dialog-reshare-status-bd .mod .bd blockquote{color:#9d9d9d;overflow:hidden;max-width:100%;white-space:nowrap;text-overflow:ellipsis}.dui-dialog.dialog-reshare .dialog-reshare-status-bd .mod .hd blockquote p,.dui-dialog.dialog-reshare .dialog-reshare-status-bd .mod .bd blockquote p{white-space:nowrap}.from-detail{padding-top:0}.from-detail .status-item .created_at{color:#060}.from-detail .status-item .layout-None blockquote{clear:both;padding-left:14px;margin-left:0}.from-detail .status-item .lnk-act{color:#4F946E;background:#F2F8F2 url(/f/sns/66fd97246353641283e6fc402c09040a87760951/pics/icon/icon_like_reshare.gif) no-repeat;margin-left:10px;padding:0 8px 0 18px;display:inline-block;vertical-align:middle;height:19px;line-height:19px;overflow:hidden;border:1px solid #b9dcd0;border-radius:3px}.from-detail .status-item .lnk-act::first-child{margin-left:0}.from-detail .status-item .actions:not(.empty){margin-top:30px;text-align:right}.from-detail .status-item .actions:not(.empty) .lnk-del{margin-left:10px;height:19px;line-height:19px}.from-detail .status-item .actions:not(.empty) .lnk-act:hover{color:#4F946E;background-color:#F2F8F2}.from-detail .status-item .actions:not(.empty) .lnk-like{background-position:2px -13px}.from-detail .status-item .actions:not(.empty) .lnk-reshare{background-position:2px -43px}.from-detail .status-item .actions:not(.empty) .lnk-unlike{background-position:2px 2px}.from-detail .status-item .actions:not(.empty) .lnk-unreshare{background-position:2px -28px}.from-detail .status-item .actions:not(.empty) .lnk-unlike,.from-detail .status-item .actions:not(.empty) .lnk-unlike:hover,.from-detail .status-item .actions:not(.empty) .lnk-unreshare,.from-detail .status-item .actions:not(.empty) .lnk-unreshare:hover{color:#aaa;border:1px solid #cccccc;background-color:#f2f2f2}.from-detail .status-real-wrapper .status-item .status-saying{margin-left:0}.from-detail .status-item .mod .video-player .video-object{display:block}.status-reshared-wrapper.from-detail .actions{position:absolute;width:100%;right:0;bottom:-20px;border-bottom:0}.liker-shortlist{margin-left:10px;display:inline-block;vertical-align:middle}.liker-shortlist .list-item{margin-right:5px;float:left}.liker-shortlist .list-item img{width:20px;height:20px}.liker-shortlist .list-item+span{color:#9e9e9e;height:20px;line-height:20px}#comments{margin:0;color:#555}textarea#rv_comment{width:96%}.comment-item .text{margin:0}.comment-item .content{padding-left:5em}.bn-flat input{padding:0 6px 2px} .popup-container{position:fixed;top:0;bottom:0;left:0;right:0;z-index:10;background:rgba(0,0,0,0.3)}.popup-container .popup-wrap{position:absolute;top:0;bottom:0;left:0;right:0;overflow:auto;padding:40px 0;text-align:center}.popup-container .popup-wrap:before{content:"";display:inline-block;width:1px;height:100%;margin-left:-1px;vertical-align:middle}.popup-container .popup-small{display:inline-block;vertical-align:middle;max-width:640px;min-width:420px;padding-top:30px;color:#999;font-size:12px;text-align:center;border:1px solid #ccc;box-shadow:1px 1px 6px rgba(0,0,0,0.2);border-radius:5px;background:#fff;position:relative;z-index:10}.popup-container .popup-small p.popup-info{padding:30px;font-size:14px;line-height:30px}.popup-container .popup-small a{color:#37a}.popup-container .popup-small a:hover{color:#fff}.popup-container .popup-small a.close{height:13px;width:13px;position:absolute;top:20px;right:20px}.popup-container .popup-small a.close:before,.popup-container .popup-small a.close:after{content:"";position:absolute;height:2px;width:100%;top:50%;left:0;margin-top:-1px;background:#ccc}.popup-container .popup-small a.close:before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.popup-container .popup-small a.close:after{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}.popup-container .popup-small .popup-btns{padding:20px;background:#f8f8f8}.popup-container .popup-small .popup-btns .btn{cursor:pointer;border:1px solid #ccc;border-radius:3px;margin-left:30px;padding:9px 35px;outline:none;background-color:#3aa253;border-color:#51873e;font-size:12px;font-weight:normal;color:#fff} .verify-avatar{background-repeat:no-repeat;background-position:right bottom, 0 center;background-size:21px,48px;width:52px;height:56px}.usr-pic .verify-avatar{margin-top:-4px}.simple .verify-avatar{background-size:12px,24px;width:26px;height:28px}.mod-usercard{padding:18px 20px;margin-bottom:30px;overflow:hidden;zoom:1;background:#fff6ed}.mod-usercard .pic{float:right;margin-left:20px}.mod-usercard .pic img{height:48px;width:48px}.mod-usercard .content{overflow:hidden;zoom:1;color:#aaa}.mod-usercard p{margin:0 0 10px 0;word-wrap:break-word}.mod-usercard .ft{color:#aaa}.mod-usercard .lnk-contact-add{display:inline-block;*display:inline;zoom:1;padding:0 22px 0 10px;border:1px solid #d6b79d;border-radius:3px;margin-right:10px;vertical-align:middle}.mod-usercard .lnk-contact-add:link,.mod-usercard .lnk-contact-add:visited,.mod-usercard .lnk-contact-add:hover,.mod-usercard .lnk-contact-add:active{color:#584E46;background:#ffe6ce url(/f/shire/ae0eda49bbe883198606693d0bf38012daeaff86/pics/icon-add.png) 63px 50% no-repeat}.mod-usercard .usercard-followed{padding-left:12px;margin-right:10px;background:url(/f/shire/deb4cac1239eeff89863046cb2d5a257c310ba94/pics/icon-ok.png) 0 50% no-repeat}.mod-usercard .usercard-loc{color:#444}.sns-card{border-radius:3px;border:1px solid #fcefe1;background:#fff6ec}.sns-card *{-moz-box-sizing:border-box;box-sizing:border-box}.sns-card>h2{margin-bottom:12px}.sns-card:first-child{margin-top:0}.sns-card:last-child{margin-bottom:0}.sns-card .mod-usercard{margin-bottom:0}.sns-card .content{padding:4px 0 0 0}.sns-card .verify-avatar{float:left;margin-right:10px;line-height:1;background-repeat:no-repeat;background-position:right bottom, 0 center;background-size:21px,48px;width:52px;height:56px}.sns-card .username{font-size:13px;line-height:1.8}.sns-card .ft{position:relative}.sns-card .ft .lnk-contact-add,.sns-card .ft .usercard-followed,.sns-card .ft .people-page-btn{position:absolute;right:0;bottom:50%}.sns-card .ft .usercard-followed,.sns-card .ft .people-page-btn{color:#9b9b9b;line-height:2;display:inline-block}.sns-card .ft .usercard-followed{padding-left:15px}.sns-card.simple{overflow:hidden;width:198px;margin-top:7px}.sns-card.simple .mod-usercard{padding:8px 10px}.sns-card.simple .content{padding:0;vertical-align:middle}.sns-card.simple .lnk-contact-add{display:none}.sns-card.simple .usercard-followed,.sns-card.simple .people-page-btn,.sns-card.simple .username{line-height:28px}.sns-card.simple .verify-avatar{background-size:12px,24px;width:26px;height:28px}.sns-card.simple .username{font-size:12px;color:#494949} #db-nav-sns .nav-primary{width:1040px}#wrapper{width:1040px}#wrapper .grid-16-8 .article{width:675px}#wrapper .grid-16-8 .aside{width:300px}@media (max-width: 1024px){body{width:1024px}body .grid-16-8 .article{padding-right:25px}#wrapper{width:1000px}[id^=dale_]{max-width:1000px}body #db-nav-sns .nav-primary{width:1000px}body #db-global-nav,body .nav{min-width:1024px}}html body,html td,html th,html input,html .pl{font-size:13px}html .pl2{font-size:14px}html h3{font-size:15px}html h2{font-size:16px}html h1{font-size:26px}.ob,.obu{width:75px}.ob dt .m_sub_img{width:48px}.ob dd{height:58px}.xbar{background-repeat:repeat-x}.photo_wrap{width:200px;margin:10px 12.5px 25px}.photo_wrap img{max-width:100%;max-height:200px}.dui-dialog .bd{font-size:13px}.paginator{font-size:15px}';
document.getElementsByTagName("head")[0].appendChild(myScriptStyle);
document.getElementsByTagName("head")[0].appendChild(doushuoScriptStyle);
var aside_html = '<div class=c-aside > <h2><i class="">四字标题</i>· · · · · · </h2> <div class=c-aside-body  style="padding: 0 12px;"> <ul class=bs > </ul> </div> </div>';
var imdb_html = '<div class="rating_wrap clearbox rating_imdb" rel="v:rating" style="padding-top: 0;"> <div class=rating_logo >IMDB 评分</div> <div class="rating_self clearfix" typeof="v:Rating"> <strong class="ll rating_num" property="v:average">0</strong> <span property="v:best" content=10.0 ></span> <div class="rating_right "> <div class=ll ></div> <div class=rating_sum > <a href=collections  class=rating_people ><span property="v:votes">0</span>人评价</a> </div> </div> </div> </div>';
/*********** 准备样式 结束 ************/



/*********** 工具函数 ************/
function sleep(milliSeconds) {
    var startTime = new Date().getTime(); // get the current time
    while (new Date().getTime() < startTime + milliSeconds);
}

var getDoc, getJSON, parseURL, postDoc;
getDoc = function (url, meta, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': window.navigator.userAgent,
            'Content-type': null
        },
        onload: function (responseDetail) {
            var doc;
            doc = '';
            if (responseDetail.status == 200) {
                doc = (new DOMParser).parseFromString(responseDetail.responseText, 'text/html');
                if (doc == undefined) {
                    doc = document.implementation.createHTMLDocument('');
                    doc.querySelector('html').innerHTML = responseText;
                }
            }
            callback(doc, responseDetail, meta);
        }
    });
};

postDoc = function (url, data, meta, callback) {
    GM_xmlhttpRequest({
        anonymous: true,
        method: 'POST',
        url: url,
        headers: {
            'User-agent': window.navigator.userAgent,
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        onload: function (responseDetail) {
            callback(responseDetail.responseText, responseDetail, meta);
        }
    });
};

getJSON = function (url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json'
        },
        onload: function (response) {
            if (response.status >= 200 && response.status < 400) {
                callback(JSON.parse(response.responseText), url);
            } else {
                callback(false, url);
            }
        }
    });
};

parseURL = function (url) {
    var a;
    a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var i, len, ret, s, seg;
            ret = {};
            seg = a.search.replace(/^\?/, '').split('&');
            len = seg.length;
            i = 0;
            s = void 0;
            while (i < len) {
                if (!seg[i]) {
                    i++;
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
                i++;
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
};
/*********** 工具函数 结束 ************/

console.log(sitesOnline.offlinesite.name)
console.log(collectionList.CClist.short_title)
// GM_setValue('sitesLocal',{"localsite": {"name": "本地资源"}})


var sitesLocal = GM_getValue('sitesLocal', '');
var sitesList = sitesOnline;
$.extend(sitesList, sitesLocal);



if (!document.getElementById("seBwhA") && "页面不存在" !== document.title) {
    var seBwhA = document.createElement("a");
    seBwhA.id = "seBwhA";
    document.getElementsByTagName("html")[0].appendChild(seBwhA);

    var reservedValues = 'bl|flag_bl';


    function Get_Search_Page(site, link_prefix, parser_func) {
        //console.log("Start Searching in Site " + site + " ."+link_prefix );
        GM_xmlhttpRequest({
            method: 'GET',
            url: link_prefix,
            onload: function (res) {
                //console.log(res.finalUrl);
                if (/((login|action|verify|returnto)[.=]|\/login$)/.test(res.finalUrl)) {
                    //console.log("May Not Login in Site " + site + ". With finalUrl: " + res.finalUrl);
                } else if (/refresh: \d+; url=.+login.+/.test(res.responseHeaders)) {

                } else {
                    let responseText = res.responseText;
                    // if (label.name==="AT") {//console.log(label.name);//console.log(res.finalUrl);//console.log(res.responseHeaders);//console.log(res.responseText);}
                    if (typeof responseText === "undefined") {

                    } else if (responseText.length < 800 && /login/.test(responseText)) {

                    } else {
                        //console.log("Get Search Pages Success in Site " + site + ".");
                        var doc = (new DOMParser()).parseFromString(res.responseText, 'text/html');
                        var body = doc.querySelector("body");
                        var page = $(body); // 构造 jQuery 对象
                        try {
                            //console.log('trying', site);
                            parser_func(res, doc, body, page);
                            //console.log("End of Search in Site " + site + ".");
                        } catch (error) {
                            //console.log("An error occurred when parser in Site " + site + ". With Error information: " + error + ". Please opening a issues to report at https://github.com/Rhilip/PT-help/issues/2");
                        }
                    }
                }
            },
            onerror: function (res) {
                //console.log("An error occurred when searching in Site " + site + " .With finalUrl: " + res.finalUrl + ". Your computer may not be able to access this site.");
            }
        });
    }

    var update_site = function (group, site, link_prefix, keyword, enable_search, selector) {
        // check if this site is enabled by user
        var enable_site = GM_getValue(site, 'none');
        if (enable_site == 'none') {
            enable_site = 1;
            GM_setValue(site, enable_site);
        }
        if (!enable_site) return;

        

        if ($('#content div.' + group + '-body ul a.' + site).attr('stat') == 'true') return;


        // add this site to the right column
        var url = parseURL(link_prefix + keyword);
        //console.log('url', url);
        var link = $('<a></a>');
        link.addClass(site);
        link.attr('href', url.source);
        link.attr('data-host', url.host);
        link.attr('target', '_blank').attr('rel', 'nofollow');
        link.html(site);
        if ($('#content div.' + group + '-body ul a.' + site).attr('class') == site) {
            //console.log(site, ' alreay exist')
            if (!enable_search) return;
            //console.log('stat=', $('#content div.' + group + '-body ul a.' + site).attr('stat'));
            if ($('#content div.' + group + '-body ul a.' + site).attr('stat') == 'true') return;
        } else {
            $('#content div.' + group + '-body ul').append(link);
            //console.log('append first time');
        }
        if (enable_search) {
            Get_Search_Page(site, url.source, function (res, doc, body, page) {
                // //console.log("loading info from", url);
                var url_prefix = /pt\.whu\.edu\.cn|whupt\.net|hudbt\.hust\.edu\.cn/.test(res.finalUrl) ? "" : (res.finalUrl.match(/(https?:\/\/[^\/]+?\/).+/) || ['', ''])[1];
                //console.log("Using The normal parser for NexusPHP in Site: " + site);
                var result;
                if (/(没有种子|No Torrents Found|Your search did not match anything|No torrents here|Make sure all names are spelled correctly|用准确的关键字重试)/.test(res.responseText)) {
                    //console.log("No any torrent find in Site " + site + ".");
                    result = false;
                } else {
                    var tr_list = page.find(selector || "table.torrents:last > tbody > tr:gt(0)");
                    //console.log("Get " + tr_list.length + " records in Site " + site + ".");
                    if (tr_list.length) {
                        result = true;
                        //console.log('search result',tr_list.length);
                    } else {
                        result = false;

                    }
                }

                //console.log(result, url);
                if (result) {
                    if ($('#content div.' + group + '-body ul a.' + site).attr('stat') == 'true') return;
                    $('#content div.' + group + '-body ul a.' + site).css("background-color", "#e3f1ed");
                    $('#content div.' + group + '-body ul a.' + site).attr('stat', 'true').attr('href', url.source);
                    //console.log('result true');
                } else {
                    if ($('#content div.' + group + '-body ul a.' + site).attr('stat') == 'true') return;
                    $('#content div.' + group + '-body ul a.' + site).css("background-color", "#f4eac2");
                    $('#content div.' + group + '-body ul a.' + site).attr('stat', 'none');
                    //console.log(site, 'result false');
                }
            });
        }
    }

    var update_group = function (group, group_title) {
        if ($('div.' + group + '-body').length) return;
        var site_pt = $(aside_html);
        site_pt.addClass(group);
        site_pt.find('div.c-aside-body').addClass(group + '-body');
        site_pt.find('h2 i').text(group_title);

        $('#content div.aside').prepend(site_pt);

        update_batch(group);
    }

    var update_batch = function (group) {
        // config pt batch link
        // site_pt_batch = $(aside_html);
        // site_pt_batch.addClass('name-offline');
        // site_pt_batch.find('div.c-aside-body').addClass('site-pt-batch');
        // site_pt_batch.find('h2 i').text('PT批量打开');
        // $('#content div.aside').prepend(site_pt_batch);
        // $('#interest_sectl').after($('div.grid-16-8 div.related-info'));
        // $('#interest_sectl').attr('style', 'float:right');
        // $('div.related-info').attr('style', 'width:480px;float:left');
        var ptlink_all, ptlink_true, ptlink_none;
        ptlink_all = $('<a>批量打开</a>').attr('class', 'ptlink_all');
        ptlink_all.css("background-color", "#f5f5f5");
        ptlink_true = $('<a>有资源</a>').attr('class', 'ptlink_true');
        ptlink_true.css("background-color", "#e3f1ed");
        ptlink_none = $('<a>无资源</a>').attr('class', 'ptlink_none');
        ptlink_none.css("background-color", "#f4eac2");
        ptlink_all.click(function () {
            $('.' + group + '-body a[href]').each(function () {
                window.open($(this).attr('href'))
            });
        });
        ptlink_true.click(function () {
            $('.' + group + '-body a[stat="true"]').each(function () {
                window.open($(this).attr('href'))
            });
        });
        ptlink_none.click(function () {
            $('.' + group + '-body a[stat="none"]').each(function () {
                window.open($(this).attr('href'))
            });
        });
        $('#content div.' + group + '-body ul').prepend('<li style="border-top:1px dashed #DDD;width: 95%;"></li>')
        $('#content div.' + group + '-body ul').prepend(ptlink_none);
        $('#content div.' + group + '-body ul').prepend(ptlink_true);
        $('#content div.' + group + '-body ul').prepend(ptlink_all);

    }



    if (location.href.startsWith('https://movie.douban.com/subject/')) {
        $(document).ready(function () {
            // $('body').wrapInner('<div class="bgcover" style="background-color:#ffffffed">');
            // chage plot summary style
            $('#interest_sectl').after($('div.grid-16-8 div.related-info'));
            $('#interest_sectl').attr('style', 'float:right');
            $('div.related-info').attr('style', 'width:480px;float:left');


            /************** 信息处理 **************/
            { // gen text info
                // due to the slow connection with imdb.com, only show the info button after IMDB info is ready
                var movieinfo = $("<a>movieinfo</a>").css('color', '#37a');
                var infobox = $(aside_html);
                infobox.find('h2 i').text('电影简介');
                infobox.addClass("movieinfo");
                infobox.attr('style', 'float:left;width:470px;margin-top:20px');
                movieinfo.click(function () {
                    //////译名，片名///////
                    var title, title_en, title_sec;
                    title = title_en = $('#content > h1 > span')[0].textContent.split(' ');
                    title = title.shift();
                    title_en = title_en.join(' ').trim();
                    var temp;
                    temp = $('div.article #info').contents().filter(function () {
                        return (this.nodeType === 3) && ($(this).prev().text() == "又名:");
                    }).text();
                    if (temp) {
                        temp = temp.split(' / ');
                        temp = temp.filter(function (x) {
                            var rname = /[\u4E00-\u9FA5]/;
                            if (rname.test(x)) {
                                //alert("含汉字!");
                                return true;
                            } else {
                                //alert("不含汉字!");
                                return false;
                            }
                        });
                        //alert(temp !== "");
                        if (!(temp == "")) {
                            temp = temp.join(' / ').trim();
                            temp = ' / ' + temp;
                        }
                    }
                    if (title_en) {
                        infobox.append('◎译　　名　' + title + temp + '</br>');
                        infobox.append('◎片　　名　' + title_en + '</br>');
                    } else {
                        infobox.append('◎片　　名　' + title + temp + '</br>');
                    }
                    // var movieinfo = $("<span></span>");

                    //////////////◎年　　代/////////////////
                    infobox.append('◎年　　代　' + $('#content > h1 > span.year').text().substr(1, 4) + '</br>');
                    //////////////◎产　　地/////////////////
                    infobox.append('◎产　　地　' + $('div.article #info').contents().filter(function () {
                        return (this.nodeType === 3) && ($(this).prev().text() == "制片国家/地区:");
                    }).text().trim() + '</br>');
                    //////////////◎类　　别/////////////////
                    var temp = $("<div></div>");
                    temp.append($('div.article #info span[property="v:genre"]').clone());
                    // //temp.find("span").
                    temp.find('span').each(function () {
                        $(this).append('<div> / </div>');
                    });
                    temp.find("div:last").remove();
                    // $('div.article #info').append(temp.text());
                    infobox.append('◎类　　别　' + temp.text() + '<br>');
                    //////////////◎语　　言/////////////////
                    infobox.append('◎语　　言　' + $('div.article #info').contents().filter(function () {
                        return (this.nodeType === 3) && ($(this).prev().text() == "语言:");
                    }).text().trim() + '</br>');
                    //////////////◎上映日期/////////////////
                    infobox.append('◎上映日期　' + $('div.article #info [property="v:initialReleaseDate"]').text() + '</br>');
                    //////////////◎IMDb评分/////////////////
                    infobox.append('◎IMDb评分　' + $('div#info a:last').attr('imdb_rating') + '/10 from ' + $('.rating_imdb a.rating_people').text() + '</br>');
                    //////////////◎IMDb链接/////////////////
                    infobox.append('◎IMDb链接　' + $('div#info a[href^=\'http://www.imdb.com/title/tt\']').attr('href') + '</br>');
                    //////////////◎豆瓣评分/////////////////
                    infobox.append('◎豆瓣评分　' + $('.rating_douban strong.ll').text() + '/10 from ' + $('.rating_douban a.rating_people').text() + '</br>');
                    //////////////◎豆瓣链接/////////////////
                    temp = $('#mainpic p.gact a').attr('href');
                    temp = temp.substring(0, temp.length - 5);
                    infobox.append('◎豆瓣链接　' + temp + '</br>');
                    //////////////◎片　　长/////////////////
                    infobox.append('◎片　　长　' + $('div.article #info').contents().filter(function () {
                        return ($(this).prev().attr('property') == "v:runtime") || ($(this).prev().text() == "片长:");
                    }).text().trim() + '</br>');
                    //////////////◎导　　演/////////////////
                    infobox.append('◎导　　演　' + $('div.article #info span.attrs:first').text() + '</br>');
                    //////////////◎主　　演/////////////////
                    infobox.append('◎主　　演　' + $('div.article #info span.actor span.attrs').contents().filter(function () {
                        return $(this).attr("class") !== "more-actor";
                    }).text() + '</br>');
                    //////////////◎简    介/////////////////
                    infobox.append('<p>◎简　　介</p><p>' + $('div.article div.related-info [property="v:summary"]').html() + '</p>');
                    //////////////◎获奖情况/////////////////
                    if ($('ul').hasClass("award")) {
                        var temp = $('<div></div>');
                        $('ul.award').each(function () {
                            temp.append($(this).text() + '</br>');
                        });
                        // $('div.article div.related-info').before(temp);
                        infobox.append('<p>◎获奖情况</p>' + temp.html() + '</br>');
                    }
                    movieinfo.hide();
                    $('div.article div.related-info').before(infobox);
                })

                // get IMDB info
                var imdb, imdb_href, imdb_id;
                imdb = $('div#info a[href^=\'http://www.imdb.com/title/tt\']');
                if (imdb.length) {
                    imdb_href = imdb.attr('href');
                    imdb_id = imdb.text();
                    if (imdb && imdb_id.startsWith('tt')) {
                        imdb_id = imdb_id.slice(2);
                    } else {
                        imdb_id = '';
                    }
                }

                // get  title
                var title_cn, title_sec;
                title_cn = title_sec = $('#content > h1 > span')[0].textContent.split(' ');
                title_cn = title_cn.shift();
                var douban_id = window.location.href.split('/')[4];
            }
            /************** 信息处理 结束 **************/



            /************** 勋章部分 **************/
            {
                $('div.top250').css('display', 'inline-block');
                var flag_list = GM_getValue('douban_top250', 'none');
                if (flag_list == 'none') {
                    flag_list = 1;
                    GM_setValue('douban_top250', 1);
                }
                if (!flag_list) {
                    $('.top250').remove();
                    console.log('doubantop250')
                }
                for (toplist in collectionList) {
                    var flag_list = GM_getValue(toplist, 'none');
                    if (flag_list == 'none') {
                        flag_list = 1;
                        GM_setValue(toplist, 1);
                    }
                    if (flag_list) {
                        var list_num = collectionList[toplist].list[douban_id];
                        console.log('list_num', list_num)
                        if (list_num) {
                            // inject css if needed
                            if (document.getElementsByClassName('top250').length === 0) {
                                var style = document.createElement('style');
                                style.innerHTML = '.top250{background:url(https://s.doubanio.com/f/movie/f8a7b5e23d00edee6b42c6424989ce6683aa2fff/pics/movie/top250_bg.png) no-repeat;width:150px;font:12px Helvetica,Arial,sans-serif;margin:5px 0;color:#744900}.top250 span{display:inline-block;text-align:center;height:18px;line-height:18px}.top250 a,.top250 a:link,.top250 a:hover,.top250 a:active,.top250 a:visited{color:#744900;text-decoration:none;background:none}.top250-no{width:34%}.top250-link{width:66%}';
                                document.head.appendChild(style);
                            }
                            console.log('inject')
                            var after = document.getElementById('dale_movie_subject_top_icon');
                            if (!after)
                                after = document.querySelector('h1');
                            after.insertAdjacentHTML('beforebegin', '<div class="top250" id="' + toplist + '"><span class="top250-no">' + (collectionList[toplist].top ? 'No.' : '#') + list_num + '</span><span class="top250-link"><a href="' + collectionList[toplist].href + '">' + collectionList[toplist].short_title + '</a></span></div> ');
                            $('div.top250').css('display', 'inline-block');
                        }
                    }
                }


                var flag_list = GM_getValue('imdb_top250', 'none');
                if (flag_list == 'none') {
                    flag_list = 1;
                    GM_setValue('imdb_top250', 1);
                }
                if (flag_list) {


                    getDoc('https://m.imdb.com/chart/top', null, function (doc, res, meta) {
                        var list = res.responseText.match(/data-tconst="(tt\d{7})"/g);
                        //console.log(list);
                        var number = list.indexOf('data-tconst="tt' + imdb_id + '"') + 1;
                        if (number < 1 || number > 250) return;

                        if (collection_priority1 !== 'douban_top250' && collection_priority2 !== 'douban_top250') {
                            $('.top250').hide();
                        }
                        // inject css if needed
                        if (document.getElementsByClassName('top250').length === 0) {
                            var style = document.createElement('style');
                            style.innerHTML = '.top250{background:url(https://s.doubanio.com/f/movie/f8a7b5e23d00edee6b42c6424989ce6683aa2fff/pics/movie/top250_bg.png) no-repeat;width:150px;fon`t:12px Helvetica,Arial,sans-serif;margin:5px 0;color:#744900}.top250 span{display:inline-block;text-align:center;height:18px;line-height:18px}.top250 a,.top250 a:link,.top250 a:hover,.top250 a:active,.top250 a:visited{color:#744900;text-decoration:none;background:none}.top250-no{width:34%}.top250-link{width:66%}';
                            document.head.appendChild(style);
                        }
                        var after = document.getElementById('dale_movie_subject_top_icon');
                        if (!after)
                            after = document.querySelector('h1');
                        after.insertAdjacentHTML('beforebegin', '<div class="top250" id="imdb_top250" style="display:inline-block"><span class="top250-no">No.' + number + '</span><span class="top250-link"><a href="http://www.imdb.com/chart/top">IMDb Top 250</a></span></div> ');
                        if ($('.top250').length > 2) {
                            $('.top250').hide();
                            var collection_priority1 = GM_getValue('collection_priority1', 'none');
                            var collection_priority2 = GM_getValue('collection_priority2', 'none');
                            $(`.top250#${collection_priority1}`).show();
                            $(`.top250#${collection_priority2}`).show();
                            console.log('visi2', $('.top250:visible').length);
                            if ($('.top250:visible').length < 2) {
                                var r = 2 - $('.top250:visible').length;
                                var i = $('.top250:hidden').length - $('.top250:visible').length;
                                if (i >= r) {
                                    $('.top250:hidden').slice(0, r).show();
                                } else {
                                    $('.top250:hidden').show();
                                }
                            }
                            var more_icon = $(`<a style="color:#666">>>展开更多${$('.top250').length - 2}个勋章（可以在右上角设置勋章显示）</a>`);
                            more_icon.click(function () {
                                $('.top250').show();
                                $(this).hide();
                            })
                            $('#dale_movie_subject_top_icon').before(more_icon);


                        } else {
                            $('.top250').show();
                        }
                    });
                } else {
                    if ($('.top250').length > 2) {
                        $('.top250').hide();
                        var collection_priority1 = GM_getValue('collection_priority1', 'none');
                        var collection_priority2 = GM_getValue('collection_priority2', 'none');
                        $(`.top250#${collection_priority1}`).show();
                        $(`.top250#${collection_priority2}`).show();
                        console.log('visi2', $('.top250:visible').length);
                        if ($('.top250:visible').length < 2) {
                            var r = 2 - $('.top250:visible').length;
                            var i = $('.top250:hidden').length - $('.top250:visible').length;
                            if (i >= r) {
                                $('.top250:hidden').slice(0, r).show();
                            } else {
                                $('.top250:hidden').show();
                            }
                        }
                        var more_icon = $(`<a style="color:#666">>>展开更多${$('.top250').length - 2}个勋章（可以在右上角设置勋章显示）</a>`);
                        more_icon.click(function () {
                            $('.top250').show();
                            $(this).hide();
                        })
                        $('#dale_movie_subject_top_icon').before(more_icon);

                    } else {
                        $('.top250').show();
                    }
                }
            }
            /************** 勋章部分 结束 **************/



            /************** 胖鸟API **************/
            {
                // var flag_pniao = GM_getValue('pniao');
                // if (flag_pniao) {
                //     var douban_id = window.location.href.split('/')[4];
                //     getJSON('http://www.pniao.com/API/dbApi/dbPlugin/' + douban_id, function (res, url) {
                //         if (res.msg == 'not found movie') {
                //             return;
                //         }
                //         var pniao_div = $('<div class="direct_link" id="subject-doulist"> <h2 style="margin:0"> <i class="">资源直链</i> · · · · · ·<br><span style="color:grey;font-size:9px">感谢<a href="http://www.pniao.com">【胖鸟电影】</a>提供数据支持</span><span class="pl"> </span> </h2> <ul> </ul> </div>');
                //         $('#content div.aside').prepend(pniao_div);
                //         console.log(res);
                //         var pniao_id = res[0].id;
                //         var pniao_title = res[0].title;
                //         console.log(pniao_id);
                //         var downList_JSON = eval(res[0].downList);
                //         for (link in downList_JSON) {
                //             console.log('link', link);
                //             var link_div = $('<li> <a href="' + decodeURIComponent(downList_JSON[link].dUrl) + '" >' + (downList_JSON[link].dTitle ? downList_JSON[link].dTitle : '该资源暂无名称') + '</a> <span>(胖鸟)</span> </li>');
                //             $('div.direct_link ul').append(link_div);
                //         }
                //         var downType = eval('(' + res[0].downType + ')');
                //         console.log(downType);
                //         $('div.direct_link ul').append('<li><span>全部[度盘(' + (downType.bdpan ? downType.bdpan : 0) + ')+磁力(' + (downType.magnet ? downType.magnet : 0) + ')+电驴(' + (downType.ed2k ? downType.ed2k : 0) + ')+字幕(' + (downType.zimu ? downType.zimu : 0) + ')]资源见</span> <a href="http://www.pniao.com/Mov/one/' + pniao_id + '" >' + pniao_title + '</a>  </li>');
                //     })
                // }
            }
            /************** 胖鸟API 结束 **************/



            /************** PreDB **************/
            {
                var flag_PreDB = GM_getValue('PreDB');
                if (flag_PreDB) {
                    let title = title_en = $('#content > h1 > span')[0].textContent.split(' ');
                    title = title.shift();
                    title_en = title_en.join(' ').trim();
                    getDoc('http://predb.me/?search=' + title_en, null, function (doc, res, meta) {

                        var PreDB_div = $('<div class="direct_link" id="subject-doulist"> <h2 style="margin:0"> <i class="">PreDB查询</i> · · · · · ·<br><span class="pl"> </span> </h2> <ul> </ul> </div>');
                        $('#content div.aside').prepend(PreDB_div);


                        if (res.responseText.match(/Nothing found/)) {
                            let link_div = $(`<li> <a href="http://predb.me/?search=${title_en}">没有找到任何资源</a> <span>(点这手动搜索)</span> </li>`);
                            $('div.direct_link ul').append(link_div);
                        } else {
                            for (var i = 0; i < Math.min(parseInt($('span.release-count', doc).text()), 3); i++) {
                                let PDBTitle = $(`div.post:eq(${i})`, doc).find('.p-c-title a').text();
                                let PDBId = $(`div.post:eq(${i})`, doc).attr('id');
                                let PDBDate = $(`div.post:eq(${i})`, doc).find('.p-c-time .t-d').text();
                                let link_div = $(`<li> <a href="http://predb.me/?post=${PDBId}">${PDBTitle}</a> <span>(${PDBDate})</span> </li>`);
                                $('div.direct_link ul').append(link_div);

                               
                            }
                        }


                    })
                }
            }
            /************** PreDB 结束 **************/

            /************** 搜索group主体 **************/
            {
                for (group in sitesList) {
                    var flag_group = GM_getValue(group, "none");
                    if (flag_group == "none") {
                        flag_group = 1;
                        GM_setValue(group, flag_group);
                    }
                    if (!flag_group) continue;
                    //if (group == 'ptsite') update_batch();
                    update_group(group, sitesList[group].name);
                    var flag_group_auto = GM_getValue(group + '_auto', "none");
                    if (flag_group_auto == "none") {
                        flag_group_auto = 1;
                        GM_setValue(group + '_auto', flag_group_auto);
                    }
                    for (site in sitesList[group].sites) {
                        if (imdb.length && sitesList[group].sites[site].imdb) {
                            update_site(group, site, sitesList[group].sites[site].imdb, imdb_id, flag_group_auto, sitesList[group].sites[site].selector);
                        }

                    }
                }
            }
            /************** 搜索group主体 结束 **************/




            /************** 自动搜索 **************/
            {
                if (imdb.length) {
                    // imdb_id has been got from the page, generate all IMDB search links in PT part
                    getDoc(imdb_href, null, function (doc, resp, meta) {
                        var i, item, len, metascore, parse, popularity, ratingCount, ratingValue, rating_douban, rating_douban_ratingValue, rating_imdb, rating_more, reviews, starValue, titleReviewBarItem, title_en;
                        title_en = $(doc).attr('title');
                        title_en = title_en.split(' (')[0];



                        for (group in sitesList) {
                            var flag_group = GM_getValue(group, "none");
                            if (flag_group == "none") {
                                flag_group = 1;
                                GM_setValue(group, flag_group);
                            }
                            if (!flag_group) continue;
                            update_group(group, sitesList[group].name);
                            var flag_group_auto = GM_getValue(group + '_auto', "none");
                            if (flag_group_auto == "none") {
                                flag_group_auto = 1;
                                GM_setValue(group + '_auto', flag_group_auto);
                            }
                            for (site in sitesList[group].sites) {
                                if (sitesList[group].sites[site].title) {
                                    update_site(group, site, sitesList[group].sites[site].title, title_en, flag_group_auto, sitesList[group].sites[site].selector);
                                    update_site(group, site, sitesList[group].sites[site].title, title_cn, flag_group_auto, sitesList[group].sites[site].selector);
                                }
                            }
                        }



                        rating_douban = $('#interest_sectl .rating_wrap').addClass('rating_douban');
                        rating_douban_ratingValue = $('#interest_sectl .rating_douban a.rating_people span[property^=v]').text();
                        rating_douban_ratingValue = (rating_douban_ratingValue + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                        $('#interest_sectl .rating_douban a.rating_people span[property^=v]').text(rating_douban_ratingValue);


                        ratingValue = $('div.ratingValue span:first', doc).text();

                        // add IMDB top 250 tag
                        if (ratingValue >= 8) {

                        }


                        var flag_infogen = GM_getValue('infogen');
                        if (flag_infogen) {
                            movieinfo.attr('imdb_rating', ratingValue);
                            $('div.article #info').append('<span class="pl">生成信息: </span>').append(movieinfo);
                        }

                        // put on more ratings
                        var flag_morerating = GM_getValue('morerating');
                        if (flag_morerating) {

                            $('#interest_sectl').append($(imdb_html));
                            rating_imdb = $('#interest_sectl .rating_imdb');
                            $('#interest_sectl .rating_imdb a.rating_people').attr('href', imdb_href + '/' + 'ratings?ref_=tt_ov_rt');
                            $('#interest_sectl .rating_imdb strong.rating_num').text(ratingValue);
                            starValue = ratingValue / 2;
                            starValue = starValue % 1 > 0.5 ? Math.floor(starValue) + 0.5 : Math.floor(starValue);
                            starValue *= 10;
                            starValue = 'bigstar' + starValue;
                            $('#interest_sectl .rating_imdb div.rating_right div.ll').addClass(starValue);
                            ratingCount = $('div.imdbRating span.small', doc).text();
                            $('#interest_sectl .rating_imdb a.rating_people span[property^=v]').text(ratingCount);
                            rating_imdb.after($('<div></div>').addClass('rating_more'));
                            rating_more = $('#interest_sectl .rating_more');
                            titleReviewBarItem = $('.titleReviewBar div.titleReviewBarItem', doc);
                            metascore = null;
                            popularity = null;
                            reviews = null;
                            parse = function (item) {
                                var Popularity, score, text;
                                text = $(item).text();
                                if (text.indexOf('Metascore') !== -1) {
                                    score = $(item).find('a[href^=criticreviews] span').text();
                                    metascore = $("<div>");
                                    metascore.html('Metascore');
                                    return metascore.append($('<a></a>').attr('href', imdb_href + '/' + 'criticreviews?ref_=tt_ov_rt').text(score));
                                } else if (text.indexOf('Popularity') !== -1) {
                                    popularity = $("<div>");
                                    Popularity = $(item).find('span.subText').html();
                                    return popularity.html('流行度&nbsp;&nbsp;' + Popularity + '<br>');
                                } else if (text.indexOf('Reviews') !== -1) {
                                    return null;
                                }
                            };
                            for (i = 0, len = titleReviewBarItem.length; i < len; i++) {
                                item = titleReviewBarItem[i];
                                parse(item);
                            }
                            if (metascore || popularity || reviews) {
                                if (metascore) {
                                    rating_more.append(metascore);
                                }
                                if (popularity) {
                                    rating_more.append(popularity);
                                }
                                if (reviews) {
                                    rating_more.append(reviews);
                                }
                            } else {
                                // rating_more.remove();
                            }


                        }

                        return null;
                    });
                } else {
                    for (group in sitesList) {
                        var flag_group = GM_getValue(group, "none");
                        if (flag_group == "none") {
                            flag_group = 1;
                            GM_setValue(group, flag_group);
                        }
                        if (!flag_group) continue;
                        update_group(group, sitesList[group].name);
                        var flag_group_auto = GM_getValue(group + '_auto', "none");
                        if (flag_group_auto == "none") {
                            flag_group_auto = 1;
                            GM_setValue(group + '_auto', flag_group_auto);
                        }
                        for (site in sitesList[group].sites) {
                            if (sitesList[group].sites[site].title) {
                                update_site(group, site, sitesList[group].sites[site].title, title_cn, flag_group_auto, sitesList[group].sites[site].selector);
                            }
                        }
                    }

                }
            }
            /************** 自动搜索结束 **************/





            /************** 海报原图 **************/
            {
                var flag_poster = GM_getValue('poster');
                if (flag_poster) {
                    var posterAnchor = $('#mainpic img');
                    if (posterAnchor.attr('src')) {
                        // get the posters page's URL via movie.douban.com's customs
                        let url = window.location.href;
                        var douban_id = url.split('/')[4];
                        var postersUrl = 'https://movie.douban.com/subject/' + douban_id + '/photos?type=R';

                        getDoc(postersUrl, null, function (doc, res, meta) {
                            var aPosterUrl = $('.article > ul > li:nth-child(1) > div.cover > a', doc).attr('href');
                            getDoc(aPosterUrl, null, function (doc2, res, meta) {
                                var hdPosterAnchor = $('span.magnifier > a', doc2);
                                $('#mainpic p.gact').after(hdPosterAnchor);

                                var flag_posterbg = GM_getValue('posterbg');
                                if (flag_posterbg) {
                                    $('body').prepend('<div id="background1" style="background-image: url(' + hdPosterAnchor.attr('href') + ');z-index: -1100;height: 100%;width: 100%;position: fixed;background-position: center;background-repeat: no-repeat;background-attachment: fixed;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;opacity: 0.1;filter:alpha(opacity=10);"></div>');

                                }
                            })
                        })

                    }
                } else {
                    var flag_posterbg = GM_getValue('posterbg');
                    if (flag_posterbg) {

                        var posterAnchor = $('#mainpic img');
                        if (posterAnchor.attr('src')) {
                            // get the posters page's URL via movie.douban.com's customs
                            let url = window.location.href;
                            var douban_id = url.split('/')[4];
                            var postersUrl = 'https://movie.douban.com/subject/' + douban_id + '/photos?type=R';
                            getDoc(postersUrl, null, function (doc, res, meta) {
                                var aPosterUrl = $('.article > ul > li:nth-child(1) > div.cover > a', doc).attr('href');
                                getDoc(aPosterUrl, null, function (doc2, res, meta) {
                                    var poster_link = $('span.magnifier > a', doc2).attr('href');
                                    $('body').prepend('<div id="background1" style="background-image: url(' + poster_link + ');z-index: -1100;height: 100%;width: 100%;position: fixed;background-position: center;background-repeat: no-repeat;background-attachment: fixed;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;opacity: 0.1;filter:alpha(opacity=10);"></div>');

                                    // $('body').wrapInner('<div class="bgcover" style="background-color:#fffffff5">');
                                })
                            })
                        }

                    }
                }
            }
            /************** 海报原图 结束 **************/
        });
    }




    $(document).ready(function () {

        /************** 黑名单 **************/
        {
            var flag_blacklist = GM_getValue('blacklist');
            if (flag_blacklist) {
                if (location.href.startsWith('https://movie.douban.com/explore') | location.href.startsWith('https://movie.douban.com/tag/')) {
                    $(document).ready(function () {
                        // append add_blacklist button on posters
                        $('div.list-wp').on('mouseover', 'a.item', function () {
                            if ($(this).prev().is('.bl_cover')) {
                                $(this).prev().show();
                                $(this).prev().css({
                                    "left": ($(this).offset().left + 85),
                                    "top": ($(this).offset().top)
                                });
                                return;
                            }
                            var douban_id = $(this).attr('href').split('/')[4];
                            var title = $(this).find('img').attr('alt');
                            var posterid = $(this).find('img').attr('src').split('/')[7].replace('.jpg', '');
                            //  //console.log('title=' + title);
                            //  //console.log('posterid=' + posterid);
                            $(this).before('<div class="bl_cover" style="display:block;position:absolute;z-index:99;"><a><div style="background:#52a4d7d6;height:20px;width:30px;text-align:center;color:white">屏蔽</div><a></div>');
                            $(this).prev().attr('title', '屏蔽' + douban_id).css({
                                "left": ($(this).offset().left + 85),
                                "top": ($(this).offset().top)
                            });
                            $(this).prev().click(function () {
                                GM_setValue('bl', GM_getValue('bl', '') + '$' + douban_id);
                                GM_setValue(douban_id, title + '$' + posterid);
                                $(this).hide();
                                blacklist();
                            });
                            $(this).prev().mouseover(function () {
                                $(this).show();
                            });
                            $(this).prev().mouseout(function () {
                                $(this).hide();
                            });
                        });
                        $('div.list-wp').on('mouseout', 'a.item', function () {
                            $(this).prev().hide();
                        });
                        // blacklist filter function
                        var blacklist = function () {
                            // only do this function when Ajax finished, otherwise may cause in endless loop;
                            if (/载入中/.test($('a.more').text())) return;
                            else {
                                var bl_list = GM_getValue('bl', '').split('$');
                                if (!bl_list.length) return;
                                for (var i = 1; i < bl_list.length; i++) {
                                    var reg = '"' + bl_list[i] + '"';
                                    $('a.item').filter(function () {
                                        return RegExp(reg).test($(this).html())
                                    }).hide();
                                }
                                if ($('a.item').length < 30) {
                                    $('.list-wp a.more').text('载入中');
                                    $('.list-wp a.more').wrap('<p class="more"></p>');
                                    $('.list-wp p.more').click();
                                }
                            }
                        }
                        // when something has changed in .list-wp, do blacklist()
                        $('div.article .list-wp').bind('DOMNodeInserted', function () {
                            blacklist();
                        });
                        // when .deatil-pop shows up, append add_blocklist_button to it
                        $('div.detail-pop').bind('DOMNodeInserted', function () {
                            if ($('div.detail-pop .add_blocklist').length) return;
                            var douban_id = $('div.detail-pop .info h3 a').first().attr('href').split('/')[4];
                            var add_blocklist_button = $('<a class="add_blocklist">屏蔽' + douban_id + '</a>');
                            add_blocklist_button.click(
                                function () {
                                    GM_setValue('bl', GM_getValue('bl', '') + '$' + douban_id);
                                    var title = $('div.detail-pop .info h3 a').text();
                                    var posterid = $('a.item').filter(function () {
                                        return RegExp('"' + douban_id + '"').test($(this).html())
                                    }).find('img').first().attr('src').split('/')[7].replace('.jpg', '');
                                    GM_setValue(douban_id, title + '$' + posterid);
                                    // //console.log('title=' + title);
                                    // //console.log('posterid=' + posterid);
                                    blacklist();
                                });
                            $('div.detail-pop .collect-area').append(add_blocklist_button);
                        })
                        blacklist();
                    })
                }
            }

            // add blacklist nav-tag and page
            var flag_blacklist = GM_getValue('blacklist');
            if (flag_blacklist) {
                var bl_nav = $('<a style="color:#27a">黑名单</a>');
                bl_nav.mouseover(function () {
                    $(this).css('color', 'white');
                })
                bl_nav.mouseout(function () {
                    $(this).css('color', '#27a');
                })
                var update_bl = function (i) {
                    var bl_list = GM_getValue('bl', '').split('$');
                    if (!bl_list.length || i >= bl_list.length) {
                        $('.article h2').first().text('电影黑名单 · · · · · ·');
                        return;
                    }
                    $('.article h2').first().text('电影黑名单 · · · · · ·正在列出第' + i + '/' + (bl_list.length - 1) + '项');
                    var current_id = bl_list[i];
                    if (RegExp('/' + current_id + '/').test($('.article .indent').html())) {
                        update_bl(++i);
                        return;
                    }
                    var title, posterid;

                    function append_movie(title, posterid) {
                        var block_html = $('<table width="100%" class=""><tbody><tr class="item"><td width="100" valign="top"><a class="nbg" href="https://movie.douban.com/subject/' + bl_list[i] + '/" title="' + title + '"><img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/' + posterid + '.jpg" width="75" alt="' + title + '" class=""></a></td><td valign="top"><div class="pl2"><a href="https://movie.douban.com/subject/' + bl_list[i] + '/" class="">' + title + '</a></div></td></tr></tbody></table><p class="ul"></p>');
                        var remove_blocklist_button = $('<a class="j remove_blocklist" style="display: inline-block; zoom: 1; margin-right: 5px; border: 1px solid #bbb; padding: 2px 14px 1px; border-radius: 2px; color: #111;">解除屏蔽' + current_id + '</a>');
                        remove_blocklist_button.click(function () {
                            GM_setValue('bl', GM_getValue('bl', '').replace('$' + current_id, ''));
                            $('.article .indent div').first().empty().append('<p class="ul first"></p>');
                            update_bl(1);
                        });
                        var refresh_blocklist_button = $('<a class="j remove_blocklist" style="display: inline-block; zoom: 1; margin-right: 5px; border: 1px solid #bbb; padding: 2px 14px 1px; border-radius: 2px; color: #111;">刷新信息' + current_id + '</a>');
                        refresh_blocklist_button.click(function () {
                            getJSON('http://api.douban.com/v2/movie/' + current_id, function (temp, url) {
                                if (!temp) {
                                    alert('get info error, aborting!');
                                    return;
                                }
                                var current_id = url.split('/')[5];
                                var title = temp.attrs.language == '汉语普通话' ? temp.title : temp.alt_title.split('/')[0] + ' ' + temp.title.split('/')[0];
                                title = title + '‎ (' + temp.attrs.year + ')';
                                var posterid = temp.image.split('/')[7].replace('.webp', '');
                                GM_setValue(current_id, title + '$' + posterid);
                                append_movie(title, posterid);
                                // //console.log('get info from api.douban.com title=' + title + ' and posterid=' + posterid);
                                $('.article .indent div').first().empty().append('<p class="ul first"></p>');
                                update_bl(1);
                            });

                        });
                        block_html.find('div.pl2').append('<p></p>').append(remove_blocklist_button).append(refresh_blocklist_button);
                        $('.article .indent div').first().append(block_html);
                    }

                    var value_temp = GM_getValue(bl_list[i], '');
                    if (value_temp !== '') {
                        var title = value_temp.split('$')[0];
                        var posterid = value_temp.split('$')[1];
                        append_movie(title, posterid);
                        update_bl(++i);
                    } else {
                        getJSON('http://api.douban.com/v2/movie/' + bl_list[i], function (temp, url) {
                            if (!temp) {
                                alert('get info error, aborting!');
                                return;
                            }
                            var current_id = url.split('/')[5];
                            var title = temp.attrs.country == '中国大陆' ? temp.title : temp.alt_title.split('/')[0] + ' ' + temp.title.split('/')[0];
                            title = title + '‎ (' + temp.attrs.year + ')';
                            var posterid = temp.image.split('/')[7].replace('.webp', '');
                            GM_setValue(current_id, title + '$' + posterid);
                            append_movie(title, posterid);
                            // speed control. The ratio limit of douban api is 100/hour.
                            sleep(1600);
                            update_bl(++i);
                        });
                    }
                    //console.log(GM_listValues());


                }
                bl_nav.click(function () {
                    $('div#wrapper').empty();
                    $('div#wrapper').append('<div id="content"><h1>豆瓣电影黑名单</h1><div class="grid-16-8 clearfix"><div class="article"><h2>电影黑名单 · · · · · · </h2><div class="indent"><div class=""><p class="ul first"></p></div></div></div><div class="aside"><div><h2>黑名单说明 · · · · · ·</h2><p>黑名单功能是为了屏蔽掉一些不想在找电影时看到但又不想标记已看的片子，加入黑名单后影片将不会在<a href="https://movie.douban.com/explore" style="color:#27a">选电影</a>和<a href="https://movie.douban.com/tag" style="color:#27a">分类选片</a>页面中出现。</p><p>在选电影界面的detail-pop元素和海报右上角（将鼠标移动到影片海报上就会弹出）增加了“屏蔽该影片”按钮，点击即可一键加入黑名单。</p></div><div><h2>管理功能说明 · · · · · ·</h2><p>清空黑名单：把所有影片移出黑名单。</p><p>清理缓存（慎用！）：重新获取黑名单中影片信息。当发现本页面中的影片信息显示不正确时，可以用这个功能强制刷新。由于douban api有每小时100次的限制，当黑名单列表过长时，此功能会出现问题。</p><p>导出黑名单：由于黑名单只能作用于本地，当多台设备想要同步黑名单时，目前只能利用手动导出导入实现。</p><p>导入黑名单：导入你想屏蔽的影片列表，注意格式。</p></div><div><h2>黑名单管理 · · · · · ·</h2><div class="types"><span><a class="bl_clear" style="color:#27a">清空黑名单</a></br><a class="cache_clear" style="color:#27a">清理缓存（慎用！）</a></br><a class="bl_export" style="color:#27a">导出黑名单</a></br><a class="bl_import" style="color:#27a">导入黑名单</a></span></div></div></div></div></div>');
                    $('div#wrapper .types a.bl_clear').click(function () {
                        GM_setValue('bl', '');
                        $('.article .indent').first().empty();
                    })
                    $('div#wrapper .types a.cache_clear').click(function () {
                        var value_temp = GM_listValues();
                        for (var x = 0; x < value_temp.length; x++) {
                            if (RegExp(reservedValues).test(value_temp[x])) continue;
                            GM_deleteValue(value_temp[x]);
                        }
                        $('.article .indent').first().empty().append('<div><p class="ul first"></p></div>');
                        update_bl(1);
                    })
                    $('div#wrapper .types a.bl_export').click(function () {
                        $('.article h2').first().text('导出黑名单 · · · · · ·');
                        $('.article .indent').first().empty().append('<textarea class="bl_input" style="width:100%;height:350px">');
                        $('.article .indent .bl_input').text(GM_getValue('bl'));
                    })
                    $('div#wrapper .types a.bl_import').click(function () {
                        $('.article h2').first().text('导入黑名单 · · · · · ·');
                        $('.article .indent').first().empty().append('<textarea class="bl_input" placeholder="请注意导入格式为“$”+“豆瓣序号”，例如肖申克的救赎为$1292052，多个序号间无空格空行。" style="width:100%;height:350px"></textarea><button class="bl_input_submit" style="padding:0 12px;">提交</button>');
                        $('.article .indent .bl_input_submit').click(function () {
                            GM_setValue('bl', $('.article .indent .bl_input')[0].value);
                            $('.article .indent').first().empty().append('<div><p class="ul first"></p></div>');
                            $('.article h2').first().text('电影黑名单 · · · · · ·');
                            update_bl(1);
                        });
                    })
                    update_bl(1);
                })
                $('div.nav-items ul').append('<li></li>');
                $('div.nav-items ul li').last().append(bl_nav);
            }
        }
        /************** 黑名单 结束 **************/

        /************** 影人资源 **************/
        {
            var flag_artist = GM_getValue('artist');
            if (flag_artist) {
                var artist_nav = $('<a style="color:#27a">影人资源</a>');
                artist_nav.mouseover(function () {
                    $(this).css('color', 'white');
                })
                artist_nav.mouseout(function () {
                    $(this).css('color', '#27a');
                })

                artist_nav.click(function () {
                    $('div#wrapper').empty();
                    $('div#wrapper').append('<div id="content"><h1>导演资源搜索</h1><div class="grid-16-8 clearfix"><div class="article"><div class="indent"><div class="movie-list"></div></div></div><div class="aside"><div><h2>导演检索 · · · · · ·</h2><div><span><p><form id="form-artist"><input class="artist" id="input-artist" placeholder="诺兰, nm0634240, ..." value="" /input><input type="submit" id="artist-submit" value="search" /input></form></p></span><span style="" class="search_result c-aside-body"></span></div></div><div class="artist_intro"><h2>导演资源说明 · · · · · ·</h2><p>影人资源可以列出某导演的全部执导作品并加以搜索。</p><p>此功能可以弥补一些站点没有“Artist”“Collection”的缺憾。</p></div><div><h2>使用帮助 · · · · · ·</h2><p>输入导演名称，点击搜索。在搜索结果中点击你想搜的导演即可。</p><p>由于【某些原因】，导演作品列表采取IMDB数据库中的信息。若和豆瓣影人信息有出入，请谅解。</p><p>目前仅支持导演作品，如需按演员搜索功能，请email：exhen32@live.com请求开发。</p></div></div></div></div>');
                    $('#form-artist').submit(function () {
                        var artist = document.getElementById("input-artist").value;
                        //console.log(artist);
                        $('span.search_result').empty();
                        $('.c-aside').remove();
                        getDoc('https://cn.bing.com/search?q=site%3Awww.imdb.com%2Fname%2F+' + artist, null, function (doc, res, meta) {
                            var id_list = [];
                            $('#b_results .b_algo a', doc).each(function () {
                                var id = $(this).attr('href').split('/')[4];
                                if (!id) return;
                                if (!id.startsWith('nm')) return;
                                if ($.inArray(id, id_list) >= 0) return;
                                id_list.push(id);
                            })
                            if (id_list.length == 0) {
                                $('span.search_result').append('没有找到相关导演');
                            }
                            $.each(id_list, function (i, id) {
                                //console.log(id);
                                getDoc('https://cn.bing.com/search?q=site%3Amovie.douban.com%2Fcelebrity%2F+' + id, null, function (doc2, res, meta) {
                                    var name = $('#b_results .b_algo a', doc2).first().text().replace(/(\(豆瓣\)|\s-\s豆瓣电影)/, '');
                                    var link = $('<a style="background-color: rgb(245, 245, 245);"></a>');
                                    link.attr('id', id);
                                    link.attr('name', name);
                                    link.html(name);
                                    link.click(function () {
                                        $('span.search_result').empty();
                                        $('div.movie-list').empty().append('<p class="ul first"></p>');
                                        var id = $(this).attr('id');
                                        var name = $(this).attr('name');

                                        getDoc('https://www.imdb.com/name/' + id + '/#director', null, function (doc, res, meta) {
                                            var item_num = parseInt($('#filmo-head-director', doc).text().split('Director (')[1].split(' credits')[0]);
                                            $('div.movie-list').prepend('<h2>' + name + '导演作品 （' + item_num + '） · · · · · · </h2>');
                                            var get_movie_info = function (num) {
                                                if (num >= $('.filmo-category-section div.filmo-row', doc).length) {
                                                    return;
                                                }
                                                if ($($('.filmo-category-section div.filmo-row', doc)[num]).attr('id').startsWith('director-')) {
                                                    var tt = $($('.filmo-category-section div.filmo-row', doc)[num]).attr('id');
                                                    tt = tt.slice(9);
                                                    //console.log(tt);
                                                    var title_en = $($('.filmo-category-section div.filmo-row', doc)[num]).find('b a').text();
                                                    var year = parseInt($($('.filmo-category-section div.filmo-row', doc)[num]).find('.year_column').text());
                                                    //console.log(year);
                                                    getDoc('https://cn.bing.com/search?q=site%3Amovie.douban.com%2Fsubject%2F+%2BIMDb链接%3A+%2B' + tt, null, function (doc3, res, meta) {
                                                        var title_cn = $('#b_results .b_algo a', doc3).first().text().replace(/(\(豆瓣\)|\s-\s豆瓣电影)/, '');
                                                        var douban_link = $('#b_results .b_algo a', doc3).first().attr('href');
                                                        if (douban_link) {
                                                            var douban_id = douban_link.split('/')[4];
                                                            getDoc()
                                                        }

                                                        title_cn = title_cn == '' ? '豆瓣暂无条目' : title_cn.split(' ')[0];
                                                        var movie_item = $('<div class="' + tt + '" year="' + year + '"><h2 style="font-size:13px;">' + title_cn + ' （' + year + '）<span style="    color: grey;font-size: 10px;margin-left: 10px;margin-right: 5px;">' + title_en + '</span>' + '<span style="    color: grey;font-size: 10px;margin-left: 5px;margin-right: 5px;"><a href="https://www.imdb.com/title/' + tt + '"> imdb:' + tt + ' </a></span>\t<span style="    color: grey;font-size: 10px;margin-left: 5px;margin-right: 5px;"><a href="' + douban_link + '">dbid:' + douban_id + '</a></span></h2><div></div></div><div class="tags"><p class="ul"></p></div></br>');
                                                        // if ($('div.movie-list div').length == 0) {
                                                        //     $('div.movie-list').append(movie_item);
                                                        // }
                                                        // else {
                                                        //     var bigger_item = $('div.movie-list div:even').filter(function () {
                                                        //         return (year > $(this).attr('year'));
                                                        //     }).first();
                                                        //     if (bigger_item.length) { bigger_item.next().after(movie_item); }
                                                        //     else {
                                                        //         $('div.movie-list').prepend(movie_item);
                                                        //     }

                                                        // }
                                                        $('div.movie-list').append(movie_item);
                                                        get_movie_info(++num);
                                                    })
                                                } else {
                                                    get_movie_info(++num);
                                                }
                                            }
                                            get_movie_info(0);


                                            // $('.filmo-category-section div.filmo-row', doc).each(function () {

                                            // });

                                            var site_pt = $(aside_html);
                                            site_pt.addClass('ptsite');
                                            site_pt.find('div.c-aside-body').addClass('ptsite' + '-body');
                                            site_pt.find('h2 i').text('选择站点');
                                            $('.artist_intro').before(site_pt);
                                            for (site in sitesList['ptsite'].sites) {
                                                var enable_site = GM_getValue(site, 'none');
                                                if (enable_site == 'none') {
                                                    enable_site = 1;
                                                    GM_setValue(site, enable_site);
                                                }
                                                if (!enable_site) continue;
                                                // add this site to the right column

                                                //console.log('url', url);
                                                var link2 = $('<a style="background-color: rgb(245, 245, 245);"></a>');
                                                link2.addClass(site);
                                                link2.html(site);
                                                link2.click(function () {
                                                    $('.ptsite-body a').css('background-color', '#f5f5f5');

                                                    $('div.movie-list div div').empty();
                                                    var site = $(this).attr('class');
                                                    $(this).css("background-color", '#e3f1ed');
                                                    GM_setValue('site_artist_flag', site);

                                                    $('div.movie-list div').each(function () {
                                                        var tt = $(this).attr('class');
                                                        if (!tt) return;
                                                        if (tt.startsWith('tt')) {
                                                            var url = parseURL(sitesList['ptsite'].sites[site].imdb + tt.slice(2));

                                                            getDoc(url.source, tt, function (doc, res, meta) {


                                                                var result;
                                                                if (/没有种子|No Torrents Found|Your search did not match anything.|No torrents here|用准确的关键字重试/.test(res.responseText)) {
                                                                    //console.log("No any torrent find in Site " + site + ".");
                                                                    result = false;
                                                                }
                                                                var tr_list = $(sitesList['ptsite'].sites[site].selector ? sitesList['ptsite'].sites[site].selector : "table.torrents:last > tbody > tr:gt(0)", doc);
                                                                if (tr_list.length) {
                                                                    result = true;
                                                                    // //console.log('search result',tr_list.length);
                                                                } else {
                                                                    result = false;

                                                                }
                                                                if (result) {
                                                                    $('.' + tt + ' div').append('<a href="' + url.source + '">下载链接：' + tt + '</a>');
                                                                } else {
                                                                    $('.' + tt + ' div').append('暂无资源');
                                                                }
                                                            })
                                                        }
                                                    })
                                                })
                                                $('.ptsite-body ul').append(link2);
                                            }
                                        });
                                    })
                                    $('span.search_result').append(link);
                                })
                            });
                        });
                        return false;
                    })
                })
                $('div.nav-items ul').append('<li></li>');
                $('div.nav-items ul li').last().append(artist_nav);

            }
        }
        /************** 影人资源 结束 **************/



        /************** 豆列搜索 **************/
        {
            var flag_doulist = GM_getValue('doulist');
            if (flag_doulist) {
                var doulist_nav = $('<a style="color:#27a">豆列搜索</a>');
                doulist_nav.mouseover(function () {
                    $(this).css('color', 'white');
                })
                doulist_nav.mouseout(function () {
                    $(this).css('color', '#27a');
                })

                doulist_nav.click(function () {
                    $('div#wrapper').empty();
                    $('div#wrapper').append('<div id="content"> <h1>豆列搜索</h1> <div class="grid-16-8 clearfix"> <div class="article"> <div class="indent"> <div class="movie-list"></div> </div> </div> <div class="aside"> <div> <h2>豆列搜索 · · · · · ·</h2> <div> <span> <p> <form id="form-doulist"> <input class="doulist" id="input-doulist" placeholder="Criterion, 46534919, ..." value="" /input> <input type="submit" id="doulist-submit" value="search" /input> </form> </p> </span> <span style="" class="search_result c-aside-body"></span> </div> </div> <div class="doulist_intro"> <h2>豆列搜索说明 · · · · · ·</h2> <p>输入你想搜的关键词，点击搜索。就这么简单。</p> <p>新加入翻页功能，欢迎测试。</p> </div> </div> </div> </div>');
                    $('#form-doulist').submit(function () {
                        var doulist = document.getElementById("input-doulist").value;
                        //console.log(artist);
                        $('div.movie-list').empty();
                        $('.c-aside').remove();
                        var get_doulist = function (doulist, page) {
                            // if (page >= 101) return;
                            $('div.movie-list a.more').text('加载中');
                            getDoc('https://cn.bing.com/search?q=site%3awww.douban.com%2fdoulist+' + doulist + '&first=' + page, null, function (doc, res, meta) {
                                if ($('#b_results .b_algo a', doc).length == 0) {
                                    $('div.movie-list a.more').remove();
                                    $('div.movie-list').append('没有找到相关豆列');
                                } else {
                                    $('div.movie-list a.more').remove();
                                    $('#b_results .b_algo a', doc).each(function () {
                                        var id = $(this).attr('href').split('/')[4];
                                        if (!id) return;
                                        var title_cn = $(this).text().replace(/(\(豆瓣\)|\s-\s豆瓣电影|\s-\s豆瓣)/, '');
                                        var detail = $(this).parent().next().html();
                                        $('div.movie-list').append('<div class="' + id + '"><h2 style="font-size:13px;"><a href="https://www.douban.com/doulist/' + id + '">' + title_cn + '</a></h2><div></div></div><div class="tags">' + detail + '<p class="ul"></p></div>');
                                    })
                                    $('div.movie-list').append('<a href="javascript:;"style="display: block; height: 34px; line-height: 34px; text-align: center; font-size: 14px; background: #f7f7f7;" class="more">加载更多</a>')
                                    $('div.movie-list a.more').click(function () {
                                        get_doulist(doulist, (page += 10));
                                    });

                                    //get_doulist(doulist, page);
                                }

                            });
                        }
                        get_doulist(doulist, 1);
                        return false;
                    });
                })

                $('div.nav-items ul').append('<li></li>');
                $('div.nav-items ul li').last().append(doulist_nav);

            }
        }
        /************** 豆列搜索 结束 **************/



        /************** 广播搜索 **************/
        {
            var flag_doushuo = GM_getValue('doushuo');
            if (flag_doushuo) {
                var doushuo_nav = $('<a style="color:#27a">用户广播搜索</a>');
                doushuo_nav.mouseover(function () {
                    $(this).css('color', 'white');
                })
                doushuo_nav.mouseout(function () {
                    $(this).css('color', '#27a');
                })

                doushuo_nav.click(function () {
                    $('div#wrapper').empty();
                    $('div#wrapper').append('<div id="content"> <h1>用户广播搜索</h1> <div class="grid-16-8 clearfix"> <div class="article"> <div class="indent"> <div class="movie-list"></div> </div> </div> <div class="aside"> <div> <h2>用户广播搜索 · · · · · ·</h2> <div> <span> <p> <form id="form-doushuo"> 用户id： <br> <input class="doushuo" id="input-userid" placeholder="exhen" value="exhen" /input> <br> 关键词： <br> <input class="doushuo" id="input-keyword" placeholder="关键词如：看过" value="看过" /input> <br> 从 <input style="width: 5%" class="doushuo" id="input-pagelow" placeholder="1" value="1" /input> 到 <input style="width: 5%" class="doushuo" id="input-pagehigh" placeholder="5" value="5" /input> 页 <br> <input type="submit" id="doushuo-submit" value="search" /input> </form> </p> </span> <span style="" class="search_result c-aside-body"></span> </div> </div> <div class="doushuo_intro"> <h2>用户广播搜索说明 · · · · · ·</h2> <p>输入你想搜的用户的id，选择搜索范围，点击搜索。就这么简单。</p> <p>为避免访问太快被douban封ip，建议搜索范围尽可能小。</p> </div> </div> </div> </div>');
                    $('#form-doushuo').submit(function () {
                        var userid = document.getElementById("input-userid").value;
                        var pagelow_raw = document.getElementById("input-pagelow").value;
                        var pagehigh_raw = document.getElementById("input-pagehigh").value;
                        var keyword = document.getElementById("input-keyword").value;
                        pagelow = parseInt(pagelow_raw);
                        pagehigh = parseInt(pagehigh_raw);
                        if (pagelow_raw != pagelow || pagehigh_raw != pagehigh) {
                            alert('输入不合法，请检查！');
                            return;
                        }
                        //console.log(artist);
                        $('div.movie-list').empty();
                        $('.c-aside').remove();
                        var get_doushuo = function (userid, page) {
                            if (page > pagehigh) return;
                            $('div#content h1').empty().append('用户广播搜索    ' + (page == pagehigh ? '' : '正在搜索第' + page + '页'));
                            getDoc('https://www.douban.com/people/' + userid + '/statuses?p=' + page, null, function (doc, res, meta) {
                                if ($('div.status-wrapper', doc).length == 0) {
                                    $('div.movie-list').append('没有找到相关广播');
                                } else {
                                    $('div.status-wrapper', doc).each(function () {
                                        var id = $(this).attr('data-sid');
                                        if (!id) return;
                                        // var title_cn = $(this).text().replace(/(\(豆瓣\)|\s-\s豆瓣电影|\s-\s豆瓣)/, '');
                                        // var detail = $(this).parent().next().html();
                                        if ($(this).text().match(keyword)) {
                                            $('div.movie-list').append('<div class="' + id + '"><h2 style="font-size:13px;"><a href="https://www.douban.com/people/exhen/status/' + id + '">广播' + id + '</a></h2><div></div></div><div class="tags">' + $(this).text() + '<p class="ul"></p></div>');
                                            $('div.movie-list').append();
                                        }
                                    })
                                    page += 1;
                                    if (page > pagelow) {
                                        console.log('sleep 1000');
                                        sleep(1000);
                                    }
                                    get_doushuo(userid, page);
                                }
                                if (page == pagehigh) {
                                    if ($('div.movie-list div').length == 0) {
                                        $('div.movie-list').append('没有找到相关广播<br>');
                                    }
                                    $('div.movie-list').append('已经到了最后一页');
                                }

                            });
                        }
                        get_doushuo(userid, pagelow);
                        return false;
                    });
                })

                $('div.nav-items ul').append('<li></li>');
                $('div.nav-items ul li').last().append(doushuo_nav);

            }
        }
        /************** 广播搜索 结束 **************/




        /************** 功能开关 **************/
        { // add Script Control Panel
            var cp_nav = $('<a class="lnk-remind">功能开关</a>')
            var cp_box = $('<div class="more-items" style="width: 180px;"> <table cellpadding="0" cellspacing="0"> <tbody> <tr> <td> <a>用户广播搜索</a> </td> <td> <div class="doushuo"></div> </td> </tr> <tr> <td> <a>PreDB</a> </td> <td> <div class="PreDB"></div> </td> </tr> <tr> <td> <a>美化背景</a> </td> <td> <div class="posterbg"></div> </td> </tr> <tr> <td> <a>豆列搜索</a> </td> <td> <div class="doulist"></div> </td> </tr> <tr> <td> <a>影人资源</a> </td> <td> <div class="artist"></div> </td> </tr> <tr> <td> <a>电影黑名单</a> </td> <td> <div class="blacklist"></div> </td> </tr> <tr> <td> <a>原图链接</a> </td> <td> <div class="poster"></div> </td> </tr> <tr> <td> <a>生成信息</a> </td> <td> <div class="infogen"></div> </td> </tr> <tr> <td> <a>PT资源</a> </td> <td> <div class="ptsite"></div> </td> </tr> <tr> <td> <a>PT自动搜索</a> </td> <td> <div class="ptsite_auto"></div> </td> </tr> <tr> <td> <a>公网资源</a> </td> <td> <div class="offlinesite"></div> </td> </tr> <tr> <td> <a>公网自动搜索</a> </td> <td> <div class="offlinesite_auto"></div> </td> </tr> <tr> <td> <a>字幕资源</a> </td> <td> <div class="subsite"></div> </td> </tr> <tr> <td> <a>字幕自动搜索</a> </td> <td> <div class="subsite_auto"></div> </td> </tr> <tr> <td> <a>更多评分</a> </td> <td> <div class="morerating"></div> </td> </tr> <tr> <td> <a class="pt_site_switch">资源站点开关</a> </td> </tr> <tr> <td> <a class="toplist">排行榜开关</a> </td> </tr> <tr> <td> <a class="pt_site_clear">清空站点缓存</a> </td> </tr> </tbody> </table> </div>');

            cp_nav.click(function () {
                if ($('div.top-nav-info .cp_nav').hasClass('more-active')) {
                    $('div.top-nav-info .cp_nav').removeClass('more-active');
                } else {
                    $('div.top-nav-info .cp_nav').addClass('more-active');
                }
                // $('div.top-nav-info .cp_box').css('display','block');
            })
            cp_box.find('a').css('color', "#3d3d3d").click(function () {
                $(this).parent().next().find('img').click();
            });
            cp_box.find('td').css('display', "table-cell");
            cp_box.find('td').css('width', "auto");
            cp_box.find('div').each(function () {
                var temp = $('<img>');
                var switch_class = $(this).attr('class');
                temp.addClass(switch_class);
                temp.click(function () {
                    var flag = GM_getValue(switch_class);
                    GM_setValue(switch_class, !flag);
                    $(this).attr('src', flag ? 'https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/off.png' : 'https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/on.png');
                })
                var flag = GM_getValue(switch_class, 'none');
                //console.log(switch_class, flag);
                if (flag == 'none') {
                    GM_setValue(switch_class, 1);
                    flag = 1;
                }
                //console.log("update_switch");

                temp.attr('src', flag ? 'https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/on.png' : 'https://raw.githubusercontent.com/Exhen/douban-movie-helper/master/off.png');
                $(this).append(temp);

            });
            cp_box.find('a.pt_site_switch').click(function () {
                cp_nav.click();
                $('div#wrapper').empty();
                $('div#wrapper').append('<div id="content"><h1>资源站点开关</h1><div class="grid-16-8 clearfix"><div class="article"></div><div class="aside"><div><h2>图例 · · · · · ·</h2><div class="types"><div class="c-aside ptsites"><div class="c-aside-body ptsites-body" style="padding: 0 12px;"><ul><a style="background-color: #e3f1ed;">ON</a><a style="background-color: #f5f5f5;">OFF</a></ul></div></div></div></div></div></div></div>');

                for (group in sitesList) {
                    $('div.article').append('<h2> ' + sitesList[group].name + '· · · · · · </h2><div class="indent"><div class="' + group + '"><ul class="c-aside-body"></ul><p class="ul first"></p></div></div>');
                    for (site in sitesList[group].sites) {
                        var site_switch = $('<a></a>');
                        site_switch.html(site);
                        var site_switch_flag = GM_getValue(site, 'none');
                        if (site_switch_flag == 'none') {
                            site_switch_flag = 1;
                            GM_setValue(site, site_switch_flag);
                        }
                        site_switch.addClass(site);
                        site_switch.css('background-color', site_switch_flag ? '#e3f1ed' : '#f5f5f5');
                        site_switch.click(function () {
                            var site_class = $(this).attr('class');
                            var site_switch_flag = GM_getValue(site_class, 'none');
                            site_switch_flag = !site_switch_flag;
                            GM_setValue(site_class, site_switch_flag);
                            $(this).css('background-color', site_switch_flag ? '#e3f1ed' : '#f5f5f5');

                        })
                        $('div.article div.' + group + ' ul').append(site_switch);
                    }
                }
                $()
            });


            // onmytodolist
            // cp_box.find('a.pt_site_clear').click(function () {
            //     GM_deleteValue('sitesList');
            //     update_sitesList();
            //     alert('本地站点缓存已清空');
            // });


            cp_box.find('a.toplist').click(function () {
                $('div.top-nav-info .cp_nav').removeClass('more-active');
                $('div#wrapper').empty();
                $('div#wrapper').append('<div id="content"><h1>排行榜头衔开关</h1><div class="grid-16-8 clearfix"><div class="article"></div><div class="aside"><div><h2>图例 · · · · · ·</h2><div class="types"><div class="c-aside ptsites"><div class="c-aside-body ptsites-body" style="padding: 0 12px;"><ul><a style="background-color: #e3f1ed;">ON</a><a style="background-color: #f5f5f5;">OFF</a></ul></div></div></div></div></div></div></div>');



                var addListSwitch = function (toplist, href, title) {
                    $('div.article').append('<h2><a href="' + href + '">' + title + '· · · · · · </h2><div class="indent"><div class="list" id="' + toplist + '"><ul class="c-aside-body"></ul><p class="ul first"></p></div></div>');

                    var flag_switch_list = GM_getValue(toplist, 'none');

                    if (flag_switch_list == 'none') {
                        flag_switch_list = 1;
                        GM_setValue(toplist, 1);
                    }
                    var list_switch = $(`<a style="width:auto" id="${toplist}" class="list_switch"></a>`);
                    list_switch.html('显示');

                    list_switch.css('background-color', flag_switch_list ? '#e3f1ed' : '#f5f5f5');

                    // list_switch.css('background-image', flag_switch_list ? 'url(https://img3.doubanio.com/f/movie/f8a7b5e23d00edee6b42c6424989ce6683aa2fff/pics/movie/top250_bg.png) no-repeat;' : '#cbcbcb');
                    list_switch.click(function () {
                        var site_id = $(this).attr('id');
                        var flag_switch_list = GM_getValue(site_id, 'none');
                        flag_switch_list = !flag_switch_list;
                        GM_setValue(site_id, flag_switch_list);
                        // $(this).css('background-color', flag_switch_list ? '#e3f1ed' : '#f5f5f5');
                        cp_box.find('a.toplist').click();
                        // $(this).css('background', flag_switch_list ? 'url(/f/movie/f8a7b5e…/pics/movie/top250_bg.png) no-repeat;' : '#cbcbcb');

                    })
                    $('div.article div.list#' + toplist + ' ul').append(list_switch);
                    if (flag_switch_list) {
                        list_switch.after(`<a id="${toplist}" class="priority" style="background-color:#f5f5f5">优先显示<a>`);
                        $(`a.priority#${toplist}`).click(function () {
                            var collection_priority1 = GM_getValue('collection_priority1', 'none');
                            var collection_priority2 = GM_getValue('collection_priority2', 'none');
                            var collection_priority = $(this).attr('id');
                            if (collection_priority == collection_priority1) {
                                GM_setValue('collection_priority1', 'none');
                            } else {
                                if (collection_priority == collection_priority2) {
                                    GM_setValue('collection_priority2', collection_priority1);
                                    GM_setValue('collection_priority1', 'none');
                                } else {
                                    GM_setValue('collection_priority1', collection_priority2);
                                    GM_setValue('collection_priority2', collection_priority);

                                }
                            }
                            cp_box.find('a.toplist').click();
                        })
                    }


                }

                addListSwitch('douban_top250', 'https://movie.douban.com/top250', '豆瓣电影 Top 250');
                addListSwitch('imdb_top250', 'https://www.imdb.com/chart/top?ref_=nv_mv_250_6', 'IMDB Top 250');
                for (toplist in collectionList) {
                    addListSwitch(toplist, collectionList[toplist].href, collectionList[toplist].title);
                }
                var collection_priority1 = GM_getValue('collection_priority1', 'none');

                if (GM_getValue(collection_priority1) == 0) {
                    $(`a.priority#${collection_priority1}`).remove();
                    collection_priority1 = 'none';
                    GM_setValue('collection_priority1', 'none');
                } else {
                    $(`a.priority#${collection_priority1}`).css('background-color', '#e3f1ed');
                }

                var collection_priority2 = GM_getValue('collection_priority2', 'none');

                if (GM_getValue(collection_priority2) == 0) {
                    $(`a.priority#${collection_priority2}`).remove();
                    GM_setValue('collection_priority2', collection_priority1);
                } else {
                    $(`a.priority#${collection_priority2}`).css('background-color', '#e3f1ed');
                }


            });

            $('div.top-nav-info ').append($('<li class="cp_nav nav-user-account"></li>'));
            $('div.top-nav-info  .cp_nav').append(cp_nav).append(cp_box);
        }
        /************** 功能开关 结束 **************/



        // 删掉2018年度榜单巨大的图片
        $('.movieannual2018').remove()

    })
} else {
    //console.log("page not found");
}