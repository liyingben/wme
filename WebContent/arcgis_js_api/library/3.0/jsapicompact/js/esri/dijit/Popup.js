/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define(["dijit","dojo","dojox","dojo/require!esri/InfoWindowBase,esri/PopupBase,esri/utils,dijit/_Widget,dijit/_Templated,dojo/number,dojo/date/locale,dojox/charting/Chart2D,dojox/charting/themes/PlotKit/base,dojox/charting/action2d/Tooltip,dojo/i18n"],function(_1,_2,_3){_2.provide("esri.dijit.Popup");_2.require("esri.InfoWindowBase");_2.require("esri.PopupBase");_2.require("esri.utils");_2.require("dijit._Widget");_2.require("dijit._Templated");_2.require("dojo.number");_2.require("dojo.date.locale");_2.require("dojox.charting.Chart2D");_2.require("dojox.charting.themes.PlotKit.base");_2.require("dojox.charting.action2d.Tooltip");_2.require("dojo.i18n");(function(){var dc=_3.charting,pk=dc.themes.PlotKit;pk.popup=pk.base.clone();pk.popup.chart.fill=pk.popup.plotarea.fill="#e7eef6";pk.popup.colors=["#284B70","#702828","#5F7143","#F6BC0C","#382C6C","#50224F","#1D7554","#4C4C4C","#0271AE","#706E41","#446A73","#0C3E69","#757575","#B7B7B7","#A3A3A3"];pk.popup.series.stroke.width=1;pk.popup.marker.stroke.width=1;}());_2.declare("esri.dijit.Popup",[esri.InfoWindowBase,esri.PopupBase],{offsetX:3,offsetY:3,zoomFactor:4,marginLeft:25,marginTop:25,highlight:true,constructor:function(_4,_5){this.initialize();_2.mixin(this,_4);this.domNode=_2.byId(_5);var _6=this._nls=_2.mixin({},esri.bundle.widgets.popup);var _7=this.domNode;_2.addClass(_7,"esriPopup");var _8="<div class='esriPopupWrapper' style='position: absolute;'>"+"<div class='sizer'>"+"<div class='titlePane'>"+"<div class='spinner hidden' title='"+_6.NLS_searching+"...'></div>"+"<div class='title'></div>"+"<div class='titleButton prev hidden' title='"+_6.NLS_prevFeature+"'></div>"+"<div class='titleButton next hidden' title='"+_6.NLS_nextFeature+"'></div>"+"<div class='titleButton maximize' title='"+_6.NLS_maximize+"'></div>"+"<div class='titleButton close' title='"+_6.NLS_close+"'></div>"+"</div>"+"</div>"+"<div class='sizer content'>"+"<div class='contentPane'>"+"</div>"+"</div>"+"<div class='sizer'>"+"<div class='actionsPane'>"+"<div class='actionList hidden'>"+"<a class='action zoomTo' href='javascript:void(0);'>"+_6.NLS_zoomTo+"</a>"+"</div>"+"</div>"+"</div>"+"<div class='pointer hidden'></div>"+"</div>"+"<div class='outerPointer hidden'></div>";_2.attr(_7,"innerHTML",_8);this._sizers=_2.query(".sizer",_7);var _9=_2.query(".titlePane",_7)[0];_2.setSelectable(_9,false);this._title=_2.query(".title",_9)[0];this._prevFeatureButton=_2.query(".prev",_9)[0];this._nextFeatureButton=_2.query(".next",_9)[0];this._maxButton=_2.query(".maximize",_9)[0];this._spinner=_2.query(".spinner",_9)[0];this._contentPane=_2.query(".contentPane",_7)[0];this._positioner=_2.query(".esriPopupWrapper",_7)[0];this._pointer=_2.query(".pointer",_7)[0];this._outerPointer=_2.query(".outerPointer",_7)[0];this._actionList=_2.query(".actionsPane .actionList",_7)[0];this._eventConnections=[_2.connect(_2.query(".close",_9)[0],"onclick",this,this.hide),_2.connect(this._prevFeatureButton,"onclick",this,this.selectPrevious),_2.connect(this._nextFeatureButton,"onclick",this,this.selectNext),_2.connect(this._maxButton,"onclick",this,this._toggleSize),_2.connect(_2.query(".zoomTo",this._actionList)[0],"onclick",this,this._zoomToFeature)];if(esri.isTouchEnabled){var _a=esri.setScrollable(this._contentPane);this._eventConnections.push(_a[0],_a[1]);}this._setVisibility(false);this.isShowing=false;},setMap:function(_b){this.inherited(arguments);_2.place(this.domNode,_b.root);if(this.highlight){this.enableHighlight(_b);}this._maxHeight=_2.style(this._contentPane,"maxHeight");},unsetMap:function(){this.disableHighlight(this.map);this.inherited(arguments);},setTitle:function(_c){if(!esri._isDefined(_c)||_c===""){_c="&nbsp;";}this.destroyDijits(this._title);this.place(_c,this._title);if(this.isShowing){this.startupDijits(this._title);this.reposition();}},setContent:function(_d){if(!esri._isDefined(_d)||_d===""){_d="&nbsp;";}this.destroyDijits(this._contentPane);this.place(_d,this._contentPane);if(this.isShowing){this.startupDijits(this._contentPane);this.reposition();}},show:function(_e,_f){if(!_e){this._setVisibility(true);this.isShowing=true;return;}var map=this.map,_10;if(_e.spatialReference){this._location=_e;_10=map.toScreen(_e);}else{this._location=map.toMap(_e);_10=_e;}var _11=map._getFrameWidth();if(_11!==-1){_10.x=_10.x%_11;if(_10.x<0){_10.x+=_11;}if(map.width>_11){var _12=(map.width-_11)/2;while(_10.x<_12){_10.x+=_11;}}}if(this._maximized){this.restore();}else{this._setPosition(_10);}if(_f&&_f.closestFirst){this.showClosestFirst(this._location);}if(!this.isShowing){this._setVisibility(true);this.isShowing=true;this.onShow();}},hide:function(){if(this.isShowing){this._setVisibility(false);this.isShowing=false;this.onHide();}},resize:function(_13,_14){this._sizers.style({width:_13+"px"});_2.style(this._contentPane,"maxHeight",_14+"px");this._maxHeight=_14;if(this.isShowing){this.reposition();}},reposition:function(){if(this.map&&this._location&&!this._maximized&&this.isShowing){this._setPosition(this.map.toScreen(this._location));}},onShow:function(){this._followMap();this.startupDijits(this._title);this.startupDijits(this._contentPane);this.reposition();this.showHighlight();},onHide:function(){this._unfollowMap();this.hideHighlight();},maximize:function(){var map=this.map;if(!map||this._maximized){return;}this._maximized=true;var max=this._maxButton;_2.removeClass(max,"maximize");_2.addClass(max,"restore");_2.attr(max,"title",this._nls.NLS_restore);var _15=this.marginLeft,_16=this.marginTop,_17=map.width-(2*_15),_18=map.height-(2*_16),_19=this.domNode;_2.style(_19,{left:_15+"px",right:null,top:_16+"px",bottom:null});_2.style(this._positioner,{left:null,right:null,top:null,bottom:null});this._savedWidth=_2.style(this._sizers[0],"width");this._savedHeight=_2.style(this._contentPane,"maxHeight");this._sizers.style({width:_17+"px"});_2.style(this._contentPane,{maxHeight:(_18-65)+"px",height:(_18-65)+"px"});this._showPointer("");this._unfollowMap();_2.addClass(this.domNode,"esriPopupMaximized");this.onMaximize();},restore:function(){var map=this.map;if(!map||!this._maximized){return;}this._maximized=false;var max=this._maxButton;_2.removeClass(max,"restore");_2.addClass(max,"maximize");_2.attr(max,"title",this._nls.NLS_maximize);_2.style(this._contentPane,"height",null);this.resize(this._savedWidth,this._savedHeight);this._savedWidth=this._savedHeight=null;this.show(this._location);this._followMap();_2.removeClass(this.domNode,"esriPopupMaximized");this.onRestore();},destroy:function(){if(this.map){this.unsetMap();}this.cleanup();if(this.isShowing){this.hide();}this.destroyDijits(this._title);this.destroyDijits(this._content);_2.forEach(this._eventConnections,_2.disconnect);_2.destroy(this.domNode);this._sizers=this._contentPane=this._actionList=this._positioner=this._pointer=this._outerPointer=this._title=this._prevFeatureButton=this._nextFeatureButton=this._spinner=this._eventConnections=this._pagerScope=this._targetLocation=this._nls=this._maxButton=null;},selectNext:function(){this.select(this.selectedIndex+1);},selectPrevious:function(){this.select(this.selectedIndex-1);},setFeatures:function(){this.inherited(arguments);this._updateUI();},onSetFeatures:function(){},onClearFeatures:function(){this.setTitle("&nbsp;");this.setContent("&nbsp;");this._setPagerCallbacks(this);this._updateUI();this.hideHighlight();},onSelectionChange:function(){var ptr=this.selectedIndex;this._updateUI();if(ptr>=0){this.setContent(this.features[ptr].getContent());this.updateHighlight(this.map,this.features[ptr]);if(this.isShowing){this.showHighlight();}}},onDfdComplete:function(){this.inherited(arguments);this._updateUI();},onMaximize:function(){},onRestore:function(){},_setVisibility:function(_1a){_2.style(this.domNode,"visibility",_1a?"visible":"hidden");},_followMap:function(){this._unfollowMap();var map=this.map;this._handles=[_2.connect(map,"onPanStart",this,this._onPanStart),_2.connect(map,"onPan",this,this._onPan),_2.connect(map,"onZoomStart",this,this._onZoomStart),_2.connect(map,"onExtentChange",this,this._onExtentChange)];},_unfollowMap:function(){var _1b=this._handles;if(_1b){_2.forEach(_1b,_2.disconnect,_2);this._handles=null;}},_onPanStart:function(){var _1c=this.domNode.style;this._panOrigin={left:_1c.left,top:_1c.top,right:_1c.right,bottom:_1c.bottom};},_onPan:function(_1d,_1e){var _1f=this._panOrigin,dx=_1e.x,dy=_1e.y,_20=_1f.left,top=_1f.top,_21=_1f.right,_22=_1f.bottom;if(_20){_20=(parseFloat(_20)+dx)+"px";}if(top){top=(parseFloat(top)+dy)+"px";}if(_21){_21=(parseFloat(_21)-dx)+"px";}if(_22){_22=(parseFloat(_22)-dy)+"px";}_2.style(this.domNode,{left:_20,top:top,right:_21,bottom:_22});},_onZoomStart:function(){this._setVisibility(false);},_onExtentChange:function(_23,_24,_25){if(_25){this._setVisibility(true);this.show(this._targetLocation||this._location);}this._targetLocation=null;},_toggleSize:function(){if(this._maximized){this.restore();}else{this.maximize();}},_setPosition:function(_26){var _27=_26.x,_28=_26.y,_29=this.offsetX||0,_2a=this.offsetY||0,_2b=0,_2c=0,_2d=_2.position(this.map.container,true),_2e=_2d.w,_2f=_2d.h,_30="Left",_31="bottom",_32=_2.contentBox(this._positioner),_33=_32.w/2,_34=_32.h/2,_35=_2.style(this._sizers[0],"height")+this._maxHeight+_2.style(this._sizers[2],"height"),_36=_35/2,_37=0,_38=0,_39=_2e,_3a=_2f,_3b=_27,_3c=_28;var _3d=_2.getObject("dojo.window.getBox");if(_3d){_3d=_3d();_37=Math.max(_3d.l,_2d.x);_39=Math.min(_3d.l+_3d.w,_2d.x+_2d.w);_38=Math.max(_3d.t,_2d.y);_3a=Math.min(_3d.t+_3d.h,_2d.y+_2d.h);_3b+=_2d.x;_3c+=_2d.y;}if(((_3c-_38)>_36)&&((_3a-_3c)>=_36)){if((_39-_3b)>=_32.w){_31="";_30="Left";}else{if((_3b-_37)>=_32.w){_31="";_30="Right";}}}if(_30&&_31){if(((_3b-_37)>_33)&&((_39-_3b)>=_33)){if((_3c-_38)>=_35){_30="";_31="bottom";}else{if((_3a-_3c)>=_35){_30="";_31="top";}}}}if(_30&&_31){if(_3b<=_39/2){_30="Left";}else{if(_3b<=_39){_30="Right";}}if(_3c<=_3a/2){_31="top";}else{if(_3c<=_3a){_31="bottom";}}}var _3e=_31+_30;switch(_3e){case "top":case "bottom":_2c=14;break;case "Left":case "Right":_2b=13;break;case "topLeft":case "topRight":case "bottomLeft":case "bottomRight":_2c=45;break;}_2.style(this.domNode,{left:_27+"px",top:_28+"px",right:null,bottom:null});var _3f={left:null,right:null,top:null,bottom:null};if(_30){_3f[_30.toLowerCase()]=(_2b+_29)+"px";}else{_3f.left=(-_33)+"px";}if(_31){_3f[_31]=(_2c+_2a)+"px";}else{_3f.top=(-_34)+"px";}_2.style(this._positioner,_3f);this._showPointer(_3e);},_showPointer:function(_40){_2.removeClass(this._pointer,["top","bottom","right","left","topLeft","topRight","bottomRight","bottomLeft","hidden"]);_2.removeClass(this._outerPointer,["right","left","hidden"]);if(_40==="Right"||_40==="Left"){_40=_40.toLowerCase();_2.addClass(this._outerPointer,_40);}else{_2.addClass(this._pointer,_40);}},_setPagerCallbacks:function(_41,_42,_43){if(_41===this&&(!this._pagerScope||this._pagerScope===this)){return;}if(_41===this._pagerScope){return;}this._pagerScope=_41;if(_41===this){_42=this.selectPrevious;_43=this.selectNext;}var _44=this._eventConnections;_2.disconnect(_44[1]);_2.disconnect(_44[2]);if(_42){_44[1]=_2.connect(this._prevFeatureButton,"onclick",_41,_42);}if(_43){_44[2]=_2.connect(this._nextFeatureButton,"onclick",_41,_43);}},_zoomToFeature:function(){var _45=this.features,ptr=this.selectedIndex,map=this.map;if(_45){var _46=_45[ptr].geometry,_47,_48,_49=0,_4a;if(_46){switch(_46.type){case "point":_47=_46;break;case "multipoint":_47=_46.getPoint(0);_48=_46.getExtent();break;case "polyline":_47=_46.getPoint(0,0);_48=_46.getExtent();if(map._getFrameWidth()!==-1){_2.forEach(_46.paths,function(_4b){var _4c={"paths":[_4b,map.spatialReference]},_4d=new esri.geometry.Polyline(_4c),_4e=_4d.getExtent(),_4f=Math.abs(_4e.ymax-_4e.ymin),_50=Math.abs(_4e.xmax-_4e.xmin),_51=(_50>_4f)?_50:_4f;if(_51>_49){_49=_51;_4a=_4e;}});_4a.spatialReference=_48.spatialReference;_48=_4a;}break;case "polygon":_47=_46.getPoint(0,0);_48=_46.getExtent();if(map._getFrameWidth()!==-1){_2.forEach(_46.rings,function(_52){var _53={"rings":[_52,map.spatialReference]},_54=new esri.geometry.Polygon(_53),_55=_54.getExtent(),_56=Math.abs(_55.ymax-_55.ymin),_57=Math.abs(_55.xmax-_55.xmin),_58=(_57>_56)?_57:_56;if(_58>_49){_49=_58;_4a=_55;}});_4a.spatialReference=_48.spatialReference;_48=_4a;}break;}}if(!_47){_47=this._location;}if(!_48||!_48.intersects(this._location)){this._location=_47;}if(_48){map.setExtent(_48,true);}else{var _59=map.getNumLevels(),_5a=map.getLevel(),_5b=_59-1,_5c=this.zoomFactor||1;if(_59>0){if(_5a===_5b){return;}var _5d=_5a+_5c;if(_5d>_5b){_5d=_5b;}map._scrollZoomHandler({value:(_5d-_5a),mapPoint:_47},true);}else{map._scrollZoomHandler({value:(1/Math.pow(2,_5c))*2,mapPoint:_47},true);}}}},_updateUI:function(){var _5e="&nbsp;",ptr=this.selectedIndex,_5f=this.features,_60=this.deferreds,_61=this._prevFeatureButton,_62=this._nextFeatureButton,_63=this._spinner,_64=this._actionList,nls=this._nls;if(_5f&&_5f.length>1){if(nls.NLS_pagingInfo){_5e=esri.substitute({index:(ptr+1),total:_5f.length},nls.NLS_pagingInfo);}if(ptr===0){_2.addClass(_61,"hidden");}else{_2.removeClass(_61,"hidden");}if(ptr===_5f.length-1){_2.addClass(_62,"hidden");}else{_2.removeClass(_62,"hidden");}}else{_2.addClass(_61,"hidden");_2.addClass(_62,"hidden");}this.setTitle(_5e);if(_60&&_60.length){if(_5f){_2.removeClass(_63,"hidden");}else{this.setContent("<div style='text-align: center;'>"+nls.NLS_searching+"...</div>");}}else{_2.addClass(_63,"hidden");if(!_5f||!_5f.length){this.setContent("<div style='text-align: center;'>"+nls.NLS_noInfo+".</div>");}}if(_5f&&_5f.length){_2.removeClass(_64,"hidden");}else{_2.addClass(_64,"hidden");}}});_2.declare("esri.dijit.PopupTemplate",[esri.PopupInfoTemplate],{chartTheme:"dojox.charting.themes.PlotKit.popup",constructor:function(_65,_66){_2.mixin(this,_66);this.initialize(_65);this._nls=_2.mixin({},esri.bundle.widgets.popup);},getTitle:function(_67){return this.info?this.getComponents(_67).title:"";},getContent:function(_68){return this.info?new esri.dijit._PopupRenderer({template:this,graphic:_68,chartTheme:this.chartTheme,_nls:this._nls},_2.create("div")).domNode:"";}});_2.declare("esri.dijit._PopupRenderer",[_1._Widget,_1._Templated],{templateString:"<div class='esriViewPopup'>"+"<div class='mainSection'>"+"<div class='header' dojoAttachPoint='_title'></div>"+"<div class='hzLine'></div>"+"<div dojoAttachPoint='_description'></div>"+"<div class='break'></div>"+"</div>"+"<div class='attachmentsSection hidden'>"+"<div>${_nls.NLS_attach}:</div>"+"<ul dojoAttachPoint='_attachmentsList'>"+"</ul>"+"<div class='break'></div>"+"</div>"+"<div class='mediaSection hidden'>"+"<div class='header' dojoAttachPoint='_mediaTitle'></div>"+"<div class='hzLine'></div>"+"<div class='caption' dojoAttachPoint='_mediaCaption'></div>"+"<div class='gallery' dojoAttachPoint='_gallery'>"+"<div class='mediaHandle prev' dojoAttachPoint='_prevMedia' dojoAttachEvent='onclick: _goToPrevMedia'></div>"+"<div class='mediaHandle next' dojoAttachPoint='_nextMedia' dojoAttachEvent='onclick: _goToNextMedia'></div>"+"<ul class='summary'>"+"<li class='image mediaCount hidden' dojoAttachPoint='_imageCount'>0</li>"+"<li class='image mediaIcon hidden'></li>"+"<li class='chart mediaCount hidden' dojoAttachPoint='_chartCount'>0</li>"+"<li class='chart mediaIcon hidden'></li>"+"</ul>"+"<div class='frame' dojoAttachPoint='_mediaFrame'></div>"+"</div>"+"</div>"+"<div class='editSummarySection hidden' dojoAttachPoint='_editSummarySection'>"+"<div class='break'></div>"+"<div class='break hidden' dojoAttachPoint='_mediaBreak'></div>"+"<div class='editSummary' dojoAttachPoint='_editSummary'></div>"+"</div>"+"</div>",startup:function(){this.inherited(arguments);var _69=this.template,_6a=this.graphic,_6b=_69.getComponents(_6a),_6c=_6b.title,_6d=_6b.description,_6e=_6b.fields,_6f=_6b.mediaInfos,_70=this.domNode,nls=this._nls;this._prevMedia.title=nls.NLS_prevMedia;this._nextMedia.title=nls.NLS_nextMedia;_2.attr(this._title,"innerHTML",_6c);if(!_6c){_2.addClass(this._title,"hidden");}if(!_6d&&_6e){_6d="";_2.forEach(_6e,function(row){_6d+=("<tr valign='top'>");_6d+=("<td class='attrName'>"+row[0]+"</td>");_6d+=("<td class='attrValue'>"+row[1].replace(/^\s*(https?:\/\/[^\s]+)\s*$/i,"<a target='_blank' href='$1' title='$1'>"+nls.NLS_moreInfo+"</a>")+"</td>");_6d+=("</tr>");});if(_6d){_6d="<table class='attrTable' cellpadding='0px' cellspacing='0px'>"+_6d+"</table>";}}_2.attr(this._description,"innerHTML",_6d);if(!_6d){_2.addClass(this._description,"hidden");}_2.query("a",this._description).forEach(function(_71){_2.attr(_71,"target","_blank");});if(_6c&&_6d){_2.query(".mainSection .hzLine",_70).removeClass("hidden");}else{if(_6c||_6d){_2.query(".mainSection .hzLine",_70).addClass("hidden");}else{_2.query(".mainSection",_70).addClass("hidden");}}var dfd=(this._dfd=_69.getAttachments(_6a));if(dfd){dfd.addBoth(_2.hitch(this,this._attListHandler,dfd));_2.attr(this._attachmentsList,"innerHTML","<li>"+nls.NLS_searching+"...</li>");_2.query(".attachmentsSection",_70).removeClass("hidden");}if(_6f&&_6f.length){_2.query(".mediaSection",_70).removeClass("hidden");_2.setSelectable(this._mediaFrame,false);this._mediaInfos=_6f;this._mediaPtr=0;this._updateUI();this._displayMedia();}if(_6b.editSummary){_2.attr(this._editSummary,"innerHTML",_6b.editSummary);if(_6f&&_6f.length){_2.removeClass(this._mediaBreak,"hidden");}_2.removeClass(this._editSummarySection,"hidden");}},destroy:function(){if(this._dfd){this._dfd.cancel();}this._destroyFrame();this.template=this.graphic=this._nls=this._mediaInfos=this._mediaPtr=this._dfd=null;this.inherited(arguments);},_goToPrevMedia:function(){var ptr=this._mediaPtr-1;if(ptr<0){return;}this._mediaPtr--;this._updateUI();this._displayMedia();},_goToNextMedia:function(){var ptr=this._mediaPtr+1;if(ptr===this._mediaInfos.length){return;}this._mediaPtr++;this._updateUI();this._displayMedia();},_updateUI:function(){var _72=this._mediaInfos,_73=_72.length,_74=this.domNode,_75=this._prevMedia,_76=this._nextMedia;if(_73>1){var _77=0,_78=0;_2.forEach(_72,function(_79){if(_79.type==="image"){_77++;}else{if(_79.type.indexOf("chart")!==-1){_78++;}}});if(_77){_2.attr(this._imageCount,"innerHTML",_77);_2.query(".summary .image",_74).removeClass("hidden");}if(_78){_2.attr(this._chartCount,"innerHTML",_78);_2.query(".summary .chart",_74).removeClass("hidden");}}else{_2.query(".summary",_74).addClass("hidden");_2.addClass(_75,"hidden");_2.addClass(_76,"hidden");}var ptr=this._mediaPtr;if(ptr===0){_2.addClass(_75,"hidden");}else{_2.removeClass(_75,"hidden");}if(ptr===_73-1){_2.addClass(_76,"hidden");}else{_2.removeClass(_76,"hidden");}this._destroyFrame();},_displayMedia:function(){var _7a=this._mediaInfos[this._mediaPtr],_7b=_7a.title,_7c=_7a.caption,_7d=_2.query(".mediaSection .hzLine",this.domNode)[0];_2.attr(this._mediaTitle,"innerHTML",_7b);_2[_7b?"removeClass":"addClass"](this._mediaTitle,"hidden");_2.attr(this._mediaCaption,"innerHTML",_7c);_2[_7c?"removeClass":"addClass"](this._mediaCaption,"hidden");_2[(_7b&&_7c)?"removeClass":"addClass"](_7d,"hidden");if(_7a.type==="image"){this._showImage(_7a.value);}else{this._showChart(_7a.type,_7a.value);}},_showImage:function(_7e){_2.addClass(this._mediaFrame,"image");var _7f=_2.style(this._gallery,"height"),_80="<img src='"+_7e.sourceURL+"' onload='esri.dijit._PopupRenderer.prototype._imageLoaded(this,"+_7f+");' />";if(_7e.linkURL){_80="<a target='_blank' href='"+_7e.linkURL+"'>"+_80+"</a>";}_2.attr(this._mediaFrame,"innerHTML",_80);},_showChart:function(_81,_82){_2.removeClass(this._mediaFrame,"image");var _83=this._chart=new _3.charting.Chart2D(_2.create("div",{"class":"chart"},this._mediaFrame),{margins:{l:4,t:4,r:4,b:4}});var _84=_82.theme||this.chartTheme||"PlotKit.popup";_83.setTheme(_2.getObject(_84)||_2.getObject("dojox.charting.themes."+_84));switch(_81){case "piechart":_83.addPlot("default",{type:"Pie",labels:false});_83.addSeries("Series A",_82.fields);break;case "linechart":_83.addPlot("default",{type:"Markers"});_83.addAxis("x",{min:0,majorTicks:false,minorTicks:false,majorLabels:false,minorLabels:false});_83.addAxis("y",{includeZero:true,vertical:true,fixUpper:"minor"});_2.forEach(_82.fields,function(_85,idx){_85.x=idx+1;});_83.addSeries("Series A",_82.fields);break;case "columnchart":_83.addPlot("default",{type:"Columns",gap:3});_83.addAxis("y",{includeZero:true,vertical:true,fixUpper:"minor"});_83.addSeries("Series A",_82.fields);break;case "barchart":_83.addPlot("default",{type:"Bars",gap:3});_83.addAxis("x",{includeZero:true,fixUpper:"minor",minorLabels:false});_83.addAxis("y",{vertical:true,majorTicks:false,minorTicks:false,majorLabels:false,minorLabels:false});_83.addSeries("Series A",_82.fields);break;}this._action=new _3.charting.action2d.Tooltip(_83);_83.render();},_destroyFrame:function(){if(this._chart){this._chart.destroy();this._chart=null;}if(this._action){this._action.destroy();this._action=null;}_2.attr(this._mediaFrame,"innerHTML","");},_imageLoaded:function(img,_86){var _87=img.height;if(_87<_86){var _88=Math.round((_86-_87)/2);_2.style(img,"marginTop",_88+"px");}},_attListHandler:function(dfd,_89){if(dfd===this._dfd){this._dfd=null;var _8a="";if(!(_89 instanceof Error)&&_89&&_89.length){_2.forEach(_89,function(_8b){_8a+=("<li>");_8a+=("<a href='"+_8b.url+"' target='_blank'>"+(_8b.name||"[No name]")+"</a>");_8a+=("</li>");});}_2.attr(this._attachmentsList,"innerHTML",_8a||"<li>"+this._nls.NLS_noAttach+"</li>");}}});});