/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

//>>built
require({cache:{"dojox/gfx/shape":function(){define("dojox/gfx/shape",["./_base","dojo/_base/lang","dojo/_base/declare","dojo/_base/window","dojo/_base/sniff","dojo/_base/connect","dojo/_base/array","dojo/dom-construct","dojo/_base/Color","./matrix"],function(g,_1,_2,_3,_4,_5,_6,_7,_8,_9){var _a=g.shape={};var _b={};var _c={};_a.register=function(_d){var t=_d.declaredClass.split(".").pop();var i=t in _b?++_b[t]:((_b[t]=0));var _e=t+i;_c[_e]=_d;return _e;};_a.byId=function(id){return _c[id];};_a.dispose=function(_f){delete _c[_f.getUID()];};_2("dojox.gfx.shape.Shape",null,{constructor:function(){this.rawNode=null;this.shape=null;this.matrix=null;this.fillStyle=null;this.strokeStyle=null;this.bbox=null;this.parent=null;this.parentMatrix=null;var uid=_a.register(this);this.getUID=function(){return uid;};},getNode:function(){return this.rawNode;},getShape:function(){return this.shape;},getTransform:function(){return this.matrix;},getFill:function(){return this.fillStyle;},getStroke:function(){return this.strokeStyle;},getParent:function(){return this.parent;},getBoundingBox:function(){return this.bbox;},getTransformedBoundingBox:function(){var b=this.getBoundingBox();if(!b){return null;}var m=this._getRealMatrix(),gm=_9;return [gm.multiplyPoint(m,b.x,b.y),gm.multiplyPoint(m,b.x+b.width,b.y),gm.multiplyPoint(m,b.x+b.width,b.y+b.height),gm.multiplyPoint(m,b.x,b.y+b.height)];},getEventSource:function(){return this.rawNode;},setShape:function(_10){this.shape=g.makeParameters(this.shape,_10);this.bbox=null;return this;},setFill:function(_11){if(!_11){this.fillStyle=null;return this;}var f=null;if(typeof (_11)=="object"&&"type" in _11){switch(_11.type){case "linear":f=g.makeParameters(g.defaultLinearGradient,_11);break;case "radial":f=g.makeParameters(g.defaultRadialGradient,_11);break;case "pattern":f=g.makeParameters(g.defaultPattern,_11);break;}}else{f=g.normalizeColor(_11);}this.fillStyle=f;return this;},setStroke:function(_12){if(!_12){this.strokeStyle=null;return this;}if(typeof _12=="string"||_1.isArray(_12)||_12 instanceof _8){_12={color:_12};}var s=this.strokeStyle=g.makeParameters(g.defaultStroke,_12);s.color=g.normalizeColor(s.color);return this;},setTransform:function(_13){this.matrix=_9.clone(_13?_9.normalize(_13):_9.identity);return this._applyTransform();},_applyTransform:function(){return this;},moveToFront:function(){var p=this.getParent();if(p){p._moveChildToFront(this);this._moveToFront();}return this;},moveToBack:function(){var p=this.getParent();if(p){p._moveChildToBack(this);this._moveToBack();}return this;},_moveToFront:function(){},_moveToBack:function(){},applyRightTransform:function(_14){return _14?this.setTransform([this.matrix,_14]):this;},applyLeftTransform:function(_15){return _15?this.setTransform([_15,this.matrix]):this;},applyTransform:function(_16){return _16?this.setTransform([this.matrix,_16]):this;},removeShape:function(_17){if(this.parent){this.parent.remove(this,_17);}return this;},_setParent:function(_18,_19){this.parent=_18;return this._updateParentMatrix(_19);},_updateParentMatrix:function(_1a){this.parentMatrix=_1a?_9.clone(_1a):null;return this._applyTransform();},_getRealMatrix:function(){var m=this.matrix;var p=this.parent;while(p){if(p.matrix){m=_9.multiply(p.matrix,m);}p=p.parent;}return m;}});_a._eventsProcessing={connect:function(_1b,_1c,_1d){return _5.connect(this.getEventSource(),_1b,_a.fixCallback(this,g.fixTarget,_1c,_1d));},disconnect:function(_1e){_5.disconnect(_1e);}};_a.fixCallback=function(_1f,_20,_21,_22){if(!_22){_22=_21;_21=null;}if(_1.isString(_22)){_21=_21||_3.global;if(!_21[_22]){throw (["dojox.gfx.shape.fixCallback: scope[\"",_22,"\"] is null (scope=\"",_21,"\")"].join(""));}return function(e){return _20(e,_1f)?_21[_22].apply(_21,arguments||[]):undefined;};}return !_21?function(e){return _20(e,_1f)?_22.apply(_21,arguments):undefined;}:function(e){return _20(e,_1f)?_22.apply(_21,arguments||[]):undefined;};};_1.extend(_a.Shape,_a._eventsProcessing);_a.Container={_init:function(){this.children=[];},openBatch:function(){},closeBatch:function(){},add:function(_23){var _24=_23.getParent();if(_24){_24.remove(_23,true);}this.children.push(_23);return _23._setParent(this,this._getRealMatrix());},remove:function(_25,_26){for(var i=0;i<this.children.length;++i){if(this.children[i]==_25){if(_26){}else{_25.parent=null;_25.parentMatrix=null;}this.children.splice(i,1);break;}}return this;},clear:function(){var _27;for(var i=0;i<this.children.length;++i){_27=this.children[i];_27.parent=null;_27.parentMatrix=null;}this.children=[];return this;},_moveChildToFront:function(_28){for(var i=0;i<this.children.length;++i){if(this.children[i]==_28){this.children.splice(i,1);this.children.push(_28);break;}}return this;},_moveChildToBack:function(_29){for(var i=0;i<this.children.length;++i){if(this.children[i]==_29){this.children.splice(i,1);this.children.unshift(_29);break;}}return this;}};_2("dojox.gfx.shape.Surface",null,{constructor:function(){this.rawNode=null;this._parent=null;this._nodes=[];this._events=[];},destroy:function(){_6.forEach(this._nodes,_7.destroy);this._nodes=[];_6.forEach(this._events,_5.disconnect);this._events=[];this.rawNode=null;if(_4("ie")){while(this._parent.lastChild){_7.destroy(this._parent.lastChild);}}else{this._parent.innerHTML="";}this._parent=null;},getEventSource:function(){return this.rawNode;},_getRealMatrix:function(){return null;},isLoaded:true,onLoad:function(_2a){},whenLoaded:function(_2b,_2c){var f=_1.hitch(_2b,_2c);if(this.isLoaded){f(this);}else{var h=_5.connect(this,"onLoad",function(_2d){_5.disconnect(h);f(_2d);});}}});_1.extend(_a.Surface,_a._eventsProcessing);_2("dojox.gfx.Point",null,{});_2("dojox.gfx.Rectangle",null,{});_2("dojox.gfx.shape.Rect",_a.Shape,{constructor:function(_2e){this.shape=g.getDefault("Rect");this.rawNode=_2e;},getBoundingBox:function(){return this.shape;}});_2("dojox.gfx.shape.Ellipse",_a.Shape,{constructor:function(_2f){this.shape=g.getDefault("Ellipse");this.rawNode=_2f;},getBoundingBox:function(){if(!this.bbox){var _30=this.shape;this.bbox={x:_30.cx-_30.rx,y:_30.cy-_30.ry,width:2*_30.rx,height:2*_30.ry};}return this.bbox;}});_2("dojox.gfx.shape.Circle",_a.Shape,{constructor:function(_31){this.shape=g.getDefault("Circle");this.rawNode=_31;},getBoundingBox:function(){if(!this.bbox){var _32=this.shape;this.bbox={x:_32.cx-_32.r,y:_32.cy-_32.r,width:2*_32.r,height:2*_32.r};}return this.bbox;}});_2("dojox.gfx.shape.Line",_a.Shape,{constructor:function(_33){this.shape=g.getDefault("Line");this.rawNode=_33;},getBoundingBox:function(){if(!this.bbox){var _34=this.shape;this.bbox={x:Math.min(_34.x1,_34.x2),y:Math.min(_34.y1,_34.y2),width:Math.abs(_34.x2-_34.x1),height:Math.abs(_34.y2-_34.y1)};}return this.bbox;}});_2("dojox.gfx.shape.Polyline",_a.Shape,{constructor:function(_35){this.shape=g.getDefault("Polyline");this.rawNode=_35;},setShape:function(_36,_37){if(_36&&_36 instanceof Array){this.inherited(arguments,[{points:_36}]);if(_37&&this.shape.points.length){this.shape.points.push(this.shape.points[0]);}}else{this.inherited(arguments,[_36]);}return this;},_normalizePoints:function(){var p=this.shape.points,l=p&&p.length;if(l&&typeof p[0]=="number"){var _38=[];for(var i=0;i<l;i+=2){_38.push({x:p[i],y:p[i+1]});}this.shape.points=_38;}},getBoundingBox:function(){if(!this.bbox&&this.shape.points.length){var p=this.shape.points;var l=p.length;var t=p[0];var _39={l:t.x,t:t.y,r:t.x,b:t.y};for(var i=1;i<l;++i){t=p[i];if(_39.l>t.x){_39.l=t.x;}if(_39.r<t.x){_39.r=t.x;}if(_39.t>t.y){_39.t=t.y;}if(_39.b<t.y){_39.b=t.y;}}this.bbox={x:_39.l,y:_39.t,width:_39.r-_39.l,height:_39.b-_39.t};}return this.bbox;}});_2("dojox.gfx.shape.Image",_a.Shape,{constructor:function(_3a){this.shape=g.getDefault("Image");this.rawNode=_3a;},getBoundingBox:function(){return this.shape;},setStroke:function(){return this;},setFill:function(){return this;}});_2("dojox.gfx.shape.Text",_a.Shape,{constructor:function(_3b){this.fontStyle=null;this.shape=g.getDefault("Text");this.rawNode=_3b;},getFont:function(){return this.fontStyle;},setFont:function(_3c){this.fontStyle=typeof _3c=="string"?g.splitFontString(_3c):g.makeParameters(g.defaultFont,_3c);this._setFont();return this;}});_a.Creator={createShape:function(_3d){switch(_3d.type){case g.defaultPath.type:return this.createPath(_3d);case g.defaultRect.type:return this.createRect(_3d);case g.defaultCircle.type:return this.createCircle(_3d);case g.defaultEllipse.type:return this.createEllipse(_3d);case g.defaultLine.type:return this.createLine(_3d);case g.defaultPolyline.type:return this.createPolyline(_3d);case g.defaultImage.type:return this.createImage(_3d);case g.defaultText.type:return this.createText(_3d);case g.defaultTextPath.type:return this.createTextPath(_3d);}return null;},createGroup:function(){return this.createObject(g.Group);},createRect:function(_3e){return this.createObject(g.Rect,_3e);},createEllipse:function(_3f){return this.createObject(g.Ellipse,_3f);},createCircle:function(_40){return this.createObject(g.Circle,_40);},createLine:function(_41){return this.createObject(g.Line,_41);},createPolyline:function(_42){return this.createObject(g.Polyline,_42);},createImage:function(_43){return this.createObject(g.Image,_43);},createText:function(_44){return this.createObject(g.Text,_44);},createPath:function(_45){return this.createObject(g.Path,_45);},createTextPath:function(_46){return this.createObject(g.TextPath,{}).setText(_46);},createObject:function(_47,_48){return null;}};return _a;});},"dojox/gfx/path":function(){define("dojox/gfx/path",["./_base","dojo/_base/lang","dojo/_base/declare","./matrix","./shape"],function(g,_49,_4a,_4b,_4c){var _4d=g.path={};var _4e=_4a("dojox.gfx.path.Path",_4c.Shape,{constructor:function(_4f){this.shape=_49.clone(g.defaultPath);this.segments=[];this.tbbox=null;this.absolute=true;this.last={};this.rawNode=_4f;this.segmented=false;},setAbsoluteMode:function(_50){this._confirmSegmented();this.absolute=typeof _50=="string"?(_50=="absolute"):_50;return this;},getAbsoluteMode:function(){this._confirmSegmented();return this.absolute;},getBoundingBox:function(){this._confirmSegmented();return (this.bbox&&("l" in this.bbox))?{x:this.bbox.l,y:this.bbox.t,width:this.bbox.r-this.bbox.l,height:this.bbox.b-this.bbox.t}:null;},_getRealBBox:function(){this._confirmSegmented();if(this.tbbox){return this.tbbox;}var _51=this.bbox,_4b=this._getRealMatrix();this.bbox=null;for(var i=0,len=this.segments.length;i<len;++i){this._updateWithSegment(this.segments[i],_4b);}var t=this.bbox;this.bbox=_51;this.tbbox=t?[{x:t.l,y:t.t},{x:t.r,y:t.t},{x:t.r,y:t.b},{x:t.l,y:t.b}]:null;return this.tbbox;},getLastPosition:function(){this._confirmSegmented();return "x" in this.last?this.last:null;},_applyTransform:function(){this.tbbox=null;return this.inherited(arguments);},_updateBBox:function(x,y,m){if(m){var t=_4b.multiplyPoint(m,x,y);x=t.x;y=t.y;}if(this.bbox&&("l" in this.bbox)){if(this.bbox.l>x){this.bbox.l=x;}if(this.bbox.r<x){this.bbox.r=x;}if(this.bbox.t>y){this.bbox.t=y;}if(this.bbox.b<y){this.bbox.b=y;}}else{this.bbox={l:x,b:y,r:x,t:y};}},_updateWithSegment:function(_52,_53){var n=_52.args,l=n.length,i;switch(_52.action){case "M":case "L":case "C":case "S":case "Q":case "T":for(i=0;i<l;i+=2){this._updateBBox(n[i],n[i+1],_53);}this.last.x=n[l-2];this.last.y=n[l-1];this.absolute=true;break;case "H":for(i=0;i<l;++i){this._updateBBox(n[i],this.last.y,_53);}this.last.x=n[l-1];this.absolute=true;break;case "V":for(i=0;i<l;++i){this._updateBBox(this.last.x,n[i],_53);}this.last.y=n[l-1];this.absolute=true;break;case "m":var _54=0;if(!("x" in this.last)){this._updateBBox(this.last.x=n[0],this.last.y=n[1],_53);_54=2;}for(i=_54;i<l;i+=2){this._updateBBox(this.last.x+=n[i],this.last.y+=n[i+1],_53);}this.absolute=false;break;case "l":case "t":for(i=0;i<l;i+=2){this._updateBBox(this.last.x+=n[i],this.last.y+=n[i+1],_53);}this.absolute=false;break;case "h":for(i=0;i<l;++i){this._updateBBox(this.last.x+=n[i],this.last.y,_53);}this.absolute=false;break;case "v":for(i=0;i<l;++i){this._updateBBox(this.last.x,this.last.y+=n[i],_53);}this.absolute=false;break;case "c":for(i=0;i<l;i+=6){this._updateBBox(this.last.x+n[i],this.last.y+n[i+1],_53);this._updateBBox(this.last.x+n[i+2],this.last.y+n[i+3],_53);this._updateBBox(this.last.x+=n[i+4],this.last.y+=n[i+5],_53);}this.absolute=false;break;case "s":case "q":for(i=0;i<l;i+=4){this._updateBBox(this.last.x+n[i],this.last.y+n[i+1],_53);this._updateBBox(this.last.x+=n[i+2],this.last.y+=n[i+3],_53);}this.absolute=false;break;case "A":for(i=0;i<l;i+=7){this._updateBBox(n[i+5],n[i+6],_53);}this.last.x=n[l-2];this.last.y=n[l-1];this.absolute=true;break;case "a":for(i=0;i<l;i+=7){this._updateBBox(this.last.x+=n[i+5],this.last.y+=n[i+6],_53);}this.absolute=false;break;}var _55=[_52.action];for(i=0;i<l;++i){_55.push(g.formatNumber(n[i],true));}if(typeof this.shape.path=="string"){this.shape.path+=_55.join("");}else{Array.prototype.push.apply(this.shape.path,_55);}},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(_56,_57){this.tbbox=null;var _58=this._validSegments[_56.toLowerCase()],_59;if(typeof _58=="number"){if(_58){if(_57.length>=_58){_59={action:_56,args:_57.slice(0,_57.length-_57.length%_58)};this.segments.push(_59);this._updateWithSegment(_59);}}else{_59={action:_56,args:[]};this.segments.push(_59);this._updateWithSegment(_59);}}},_collectArgs:function(_5a,_5b){for(var i=0;i<_5b.length;++i){var t=_5b[i];if(typeof t=="boolean"){_5a.push(t?1:0);}else{if(typeof t=="number"){_5a.push(t);}else{if(t instanceof Array){this._collectArgs(_5a,t);}else{if("x" in t&&"y" in t){_5a.push(t.x,t.y);}}}}}},moveTo:function(){this._confirmSegmented();var _5c=[];this._collectArgs(_5c,arguments);this._pushSegment(this.absolute?"M":"m",_5c);return this;},lineTo:function(){this._confirmSegmented();var _5d=[];this._collectArgs(_5d,arguments);this._pushSegment(this.absolute?"L":"l",_5d);return this;},hLineTo:function(){this._confirmSegmented();var _5e=[];this._collectArgs(_5e,arguments);this._pushSegment(this.absolute?"H":"h",_5e);return this;},vLineTo:function(){this._confirmSegmented();var _5f=[];this._collectArgs(_5f,arguments);this._pushSegment(this.absolute?"V":"v",_5f);return this;},curveTo:function(){this._confirmSegmented();var _60=[];this._collectArgs(_60,arguments);this._pushSegment(this.absolute?"C":"c",_60);return this;},smoothCurveTo:function(){this._confirmSegmented();var _61=[];this._collectArgs(_61,arguments);this._pushSegment(this.absolute?"S":"s",_61);return this;},qCurveTo:function(){this._confirmSegmented();var _62=[];this._collectArgs(_62,arguments);this._pushSegment(this.absolute?"Q":"q",_62);return this;},qSmoothCurveTo:function(){this._confirmSegmented();var _63=[];this._collectArgs(_63,arguments);this._pushSegment(this.absolute?"T":"t",_63);return this;},arcTo:function(){this._confirmSegmented();var _64=[];this._collectArgs(_64,arguments);this._pushSegment(this.absolute?"A":"a",_64);return this;},closePath:function(){this._confirmSegmented();this._pushSegment("Z",[]);return this;},_confirmSegmented:function(){if(!this.segmented){var _65=this.shape.path;this.shape.path=[];this._setPath(_65);this.shape.path=this.shape.path.join("");this.segmented=true;}},_setPath:function(_66){var p=_49.isArray(_66)?_66:_66.match(g.pathSvgRegExp);this.segments=[];this.absolute=true;this.bbox={};this.last={};if(!p){return;}var _67="",_68=[],l=p.length;for(var i=0;i<l;++i){var t=p[i],x=parseFloat(t);if(isNaN(x)){if(_67){this._pushSegment(_67,_68);}_68=[];_67=t;}else{_68.push(x);}}this._pushSegment(_67,_68);},setShape:function(_69){this.inherited(arguments,[typeof _69=="string"?{path:_69}:_69]);this.segmented=false;this.segments=[];if(!g.lazyPathSegmentation){this._confirmSegmented();}return this;},_2PI:Math.PI*2});var _6a=_4a("dojox.gfx.path.TextPath",_4e,{constructor:function(_6b){if(!("text" in this)){this.text=_49.clone(g.defaultTextPath);}if(!("fontStyle" in this)){this.fontStyle=_49.clone(g.defaultFont);}},getText:function(){return this.text;},setText:function(_6c){this.text=g.makeParameters(this.text,typeof _6c=="string"?{text:_6c}:_6c);this._setText();return this;},getFont:function(){return this.fontStyle;},setFont:function(_6d){this.fontStyle=typeof _6d=="string"?g.splitFontString(_6d):g.makeParameters(g.defaultFont,_6d);this._setFont();return this;}});return {Path:_4e,TextPath:_6a};});},"*noref":1}});require(["dojo/i18n"],function(_6e){_6e._preloadLocalizations("dojox/gfx/nls/svg",[]);});define("dojox/gfx/svg",["dojo/_base/lang","dojo/_base/window","dojo/dom","dojo/_base/declare","dojo/_base/array","dojo/dom-geometry","dojo/_base/Color","./_base","./shape","./path"],function(_6f,win,dom,_70,arr,_71,_72,g,gs,_73){var svg=g.svg={};svg.useSvgWeb=(typeof window.svgweb!="undefined");var _74=navigator.userAgent.toLowerCase(),_75=_74.search("iphone")>-1||_74.search("ipad")>-1||_74.search("ipod")>-1;function _76(ns,_77){if(win.doc.createElementNS){return win.doc.createElementNS(ns,_77);}else{return win.doc.createElement(_77);}};function _78(_79){if(svg.useSvgWeb){return win.doc.createTextNode(_79,true);}else{return win.doc.createTextNode(_79);}};function _7a(){if(svg.useSvgWeb){return win.doc.createDocumentFragment(true);}else{return win.doc.createDocumentFragment();}};svg.xmlns={xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"};svg.getRef=function(_7b){if(!_7b||_7b=="none"){return null;}if(_7b.match(/^url\(#.+\)$/)){return dom.byId(_7b.slice(5,-1));}if(_7b.match(/^#dojoUnique\d+$/)){return dom.byId(_7b.slice(1));}return null;};svg.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};_70("dojox.gfx.svg.Shape",gs.Shape,{setFill:function(_7c){if(!_7c){this.fillStyle=null;this.rawNode.setAttribute("fill","none");this.rawNode.setAttribute("fill-opacity",0);return this;}var f;var _7d=function(x){this.setAttribute(x,f[x].toFixed(8));};if(typeof (_7c)=="object"&&"type" in _7c){switch(_7c.type){case "linear":f=g.makeParameters(g.defaultLinearGradient,_7c);var _7e=this._setFillObject(f,"linearGradient");arr.forEach(["x1","y1","x2","y2"],_7d,_7e);break;case "radial":f=g.makeParameters(g.defaultRadialGradient,_7c);var _7f=this._setFillObject(f,"radialGradient");arr.forEach(["cx","cy","r"],_7d,_7f);break;case "pattern":f=g.makeParameters(g.defaultPattern,_7c);var _80=this._setFillObject(f,"pattern");arr.forEach(["x","y","width","height"],_7d,_80);break;}this.fillStyle=f;return this;}f=g.normalizeColor(_7c);this.fillStyle=f;this.rawNode.setAttribute("fill",f.toCss());this.rawNode.setAttribute("fill-opacity",f.a);this.rawNode.setAttribute("fill-rule","evenodd");return this;},setStroke:function(_81){var rn=this.rawNode;if(!_81){this.strokeStyle=null;rn.setAttribute("stroke","none");rn.setAttribute("stroke-opacity",0);return this;}if(typeof _81=="string"||_6f.isArray(_81)||_81 instanceof _72){_81={color:_81};}var s=this.strokeStyle=g.makeParameters(g.defaultStroke,_81);s.color=g.normalizeColor(s.color);if(s){rn.setAttribute("stroke",s.color.toCss());rn.setAttribute("stroke-opacity",s.color.a);rn.setAttribute("stroke-width",s.width);rn.setAttribute("stroke-linecap",s.cap);if(typeof s.join=="number"){rn.setAttribute("stroke-linejoin","miter");rn.setAttribute("stroke-miterlimit",s.join);}else{rn.setAttribute("stroke-linejoin",s.join);}var da=s.style.toLowerCase();if(da in svg.dasharray){da=svg.dasharray[da];}if(da instanceof Array){da=_6f._toArray(da);for(var i=0;i<da.length;++i){da[i]*=s.width;}if(s.cap!="butt"){for(var i=0;i<da.length;i+=2){da[i]-=s.width;if(da[i]<1){da[i]=1;}}for(var i=1;i<da.length;i+=2){da[i]+=s.width;}}da=da.join(",");}rn.setAttribute("stroke-dasharray",da);rn.setAttribute("dojoGfxStrokeStyle",s.style);}return this;},_getParentSurface:function(){var _82=this.parent;for(;_82&&!(_82 instanceof g.Surface);_82=_82.parent){}return _82;},_setFillObject:function(f,_83){var _84=svg.xmlns.svg;this.fillStyle=f;var _85=this._getParentSurface(),_86=_85.defNode,_87=this.rawNode.getAttribute("fill"),ref=svg.getRef(_87);if(ref){_87=ref;if(_87.tagName.toLowerCase()!=_83.toLowerCase()){var id=_87.id;_87.parentNode.removeChild(_87);_87=_76(_84,_83);_87.setAttribute("id",id);_86.appendChild(_87);}else{while(_87.childNodes.length){_87.removeChild(_87.lastChild);}}}else{_87=_76(_84,_83);_87.setAttribute("id",g._base._getUniqueId());_86.appendChild(_87);}if(_83=="pattern"){_87.setAttribute("patternUnits","userSpaceOnUse");var img=_76(_84,"image");img.setAttribute("x",0);img.setAttribute("y",0);img.setAttribute("width",f.width.toFixed(8));img.setAttribute("height",f.height.toFixed(8));img.setAttributeNS(svg.xmlns.xlink,"xlink:href",f.src);_87.appendChild(img);}else{_87.setAttribute("gradientUnits","userSpaceOnUse");for(var i=0;i<f.colors.length;++i){var c=f.colors[i],t=_76(_84,"stop"),cc=c.color=g.normalizeColor(c.color);t.setAttribute("offset",c.offset.toFixed(8));t.setAttribute("stop-color",cc.toCss());t.setAttribute("stop-opacity",cc.a);_87.appendChild(t);}}this.rawNode.setAttribute("fill","url(#"+_87.getAttribute("id")+")");this.rawNode.removeAttribute("fill-opacity");this.rawNode.setAttribute("fill-rule","evenodd");return _87;},_applyTransform:function(){var _88=this.matrix;if(_88){var tm=this.matrix;this.rawNode.setAttribute("transform","matrix("+tm.xx.toFixed(8)+","+tm.yx.toFixed(8)+","+tm.xy.toFixed(8)+","+tm.yy.toFixed(8)+","+tm.dx.toFixed(8)+","+tm.dy.toFixed(8)+")");}else{this.rawNode.removeAttribute("transform");}return this;},setRawNode:function(_89){var r=this.rawNode=_89;if(this.shape.type!="image"){r.setAttribute("fill","none");}r.setAttribute("fill-opacity",0);r.setAttribute("stroke","none");r.setAttribute("stroke-opacity",0);r.setAttribute("stroke-width",1);r.setAttribute("stroke-linecap","butt");r.setAttribute("stroke-linejoin","miter");r.setAttribute("stroke-miterlimit",4);r.__gfxObject__=this.getUID();},setShape:function(_8a){this.shape=g.makeParameters(this.shape,_8a);for(var i in this.shape){if(i!="type"){this.rawNode.setAttribute(i,this.shape[i]);}}this.bbox=null;return this;},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);return this;},_moveToBack:function(){this.rawNode.parentNode.insertBefore(this.rawNode,this.rawNode.parentNode.firstChild);return this;}});_70("dojox.gfx.svg.Group",svg.Shape,{constructor:function(){gs.Container._init.call(this);},setRawNode:function(_8b){this.rawNode=_8b;this.rawNode.__gfxObject__=this.getUID();}});svg.Group.nodeType="g";_70("dojox.gfx.svg.Rect",[svg.Shape,gs.Rect],{setShape:function(_8c){this.shape=g.makeParameters(this.shape,_8c);this.bbox=null;for(var i in this.shape){if(i!="type"&&i!="r"){this.rawNode.setAttribute(i,this.shape[i]);}}if(this.shape.r!=null){this.rawNode.setAttribute("ry",this.shape.r);this.rawNode.setAttribute("rx",this.shape.r);}return this;}});svg.Rect.nodeType="rect";_70("dojox.gfx.svg.Ellipse",[svg.Shape,gs.Ellipse],{});svg.Ellipse.nodeType="ellipse";_70("dojox.gfx.svg.Circle",[svg.Shape,gs.Circle],{});svg.Circle.nodeType="circle";_70("dojox.gfx.svg.Line",[svg.Shape,gs.Line],{});svg.Line.nodeType="line";_70("dojox.gfx.svg.Polyline",[svg.Shape,gs.Polyline],{setShape:function(_8d,_8e){if(_8d&&_8d instanceof Array){this.shape=g.makeParameters(this.shape,{points:_8d});if(_8e&&this.shape.points.length){this.shape.points.push(this.shape.points[0]);}}else{this.shape=g.makeParameters(this.shape,_8d);}this.bbox=null;this._normalizePoints();var _8f=[],p=this.shape.points;for(var i=0;i<p.length;++i){_8f.push(p[i].x.toFixed(8),p[i].y.toFixed(8));}this.rawNode.setAttribute("points",_8f.join(" "));return this;}});svg.Polyline.nodeType="polyline";_70("dojox.gfx.svg.Image",[svg.Shape,gs.Image],{setShape:function(_90){this.shape=g.makeParameters(this.shape,_90);this.bbox=null;var _91=this.rawNode;for(var i in this.shape){if(i!="type"&&i!="src"){_91.setAttribute(i,this.shape[i]);}}_91.setAttribute("preserveAspectRatio","none");_91.setAttributeNS(svg.xmlns.xlink,"xlink:href",this.shape.src);_91.__gfxObject__=this.getUID();return this;}});svg.Image.nodeType="image";_70("dojox.gfx.svg.Text",[svg.Shape,gs.Text],{setShape:function(_92){this.shape=g.makeParameters(this.shape,_92);this.bbox=null;var r=this.rawNode,s=this.shape;r.setAttribute("x",s.x);r.setAttribute("y",s.y);r.setAttribute("text-anchor",s.align);r.setAttribute("text-decoration",s.decoration);r.setAttribute("rotate",s.rotated?90:0);r.setAttribute("kerning",s.kerning?"auto":0);r.setAttribute("text-rendering","optimizeLegibility");if(r.firstChild){r.firstChild.nodeValue=s.text;}else{r.appendChild(_78(s.text));}return this;},getTextWidth:function(){var _93=this.rawNode,_94=_93.parentNode,_95=_93.cloneNode(true);_95.style.visibility="hidden";var _96=0,_97=_95.firstChild.nodeValue;_94.appendChild(_95);if(_97!=""){while(!_96){if(_95.getBBox){_96=parseInt(_95.getBBox().width);}else{_96=68;}}}_94.removeChild(_95);return _96;}});svg.Text.nodeType="text";_70("dojox.gfx.svg.Path",[svg.Shape,_73.Path],{_updateWithSegment:function(_98){this.inherited(arguments);if(typeof (this.shape.path)=="string"){this.rawNode.setAttribute("d",this.shape.path);}},setShape:function(_99){this.inherited(arguments);if(this.shape.path){this.rawNode.setAttribute("d",this.shape.path);}else{this.rawNode.removeAttribute("d");}return this;}});svg.Path.nodeType="path";_70("dojox.gfx.svg.TextPath",[svg.Shape,_73.TextPath],{_updateWithSegment:function(_9a){this.inherited(arguments);this._setTextPath();},setShape:function(_9b){this.inherited(arguments);this._setTextPath();return this;},_setTextPath:function(){if(typeof this.shape.path!="string"){return;}var r=this.rawNode;if(!r.firstChild){var tp=_76(svg.xmlns.svg,"textPath"),tx=_78("");tp.appendChild(tx);r.appendChild(tp);}var ref=r.firstChild.getAttributeNS(svg.xmlns.xlink,"href"),_9c=ref&&svg.getRef(ref);if(!_9c){var _9d=this._getParentSurface();if(_9d){var _9e=_9d.defNode;_9c=_76(svg.xmlns.svg,"path");var id=g._base._getUniqueId();_9c.setAttribute("id",id);_9e.appendChild(_9c);r.firstChild.setAttributeNS(svg.xmlns.xlink,"xlink:href","#"+id);}}if(_9c){_9c.setAttribute("d",this.shape.path);}},_setText:function(){var r=this.rawNode;if(!r.firstChild){var tp=_76(svg.xmlns.svg,"textPath"),tx=_78("");tp.appendChild(tx);r.appendChild(tp);}r=r.firstChild;var t=this.text;r.setAttribute("alignment-baseline","middle");switch(t.align){case "middle":r.setAttribute("text-anchor","middle");r.setAttribute("startOffset","50%");break;case "end":r.setAttribute("text-anchor","end");r.setAttribute("startOffset","100%");break;default:r.setAttribute("text-anchor","start");r.setAttribute("startOffset","0%");break;}r.setAttribute("baseline-shift","0.5ex");r.setAttribute("text-decoration",t.decoration);r.setAttribute("rotate",t.rotated?90:0);r.setAttribute("kerning",t.kerning?"auto":0);r.firstChild.data=t.text;}});svg.TextPath.nodeType="text";_70("dojox.gfx.svg.Surface",gs.Surface,{constructor:function(){gs.Container._init.call(this);},destroy:function(){this.defNode=null;this.inherited(arguments);},setDimensions:function(_9f,_a0){if(!this.rawNode){return this;}this.rawNode.setAttribute("width",_9f);this.rawNode.setAttribute("height",_a0);return this;},getDimensions:function(){var t=this.rawNode?{width:g.normalizedLength(this.rawNode.getAttribute("width")),height:g.normalizedLength(this.rawNode.getAttribute("height"))}:null;return t;}});svg.createSurface=function(_a1,_a2,_a3){var s=new svg.Surface();s.rawNode=_76(svg.xmlns.svg,"svg");s.rawNode.setAttribute("overflow","hidden");if(_a2){s.rawNode.setAttribute("width",_a2);}if(_a3){s.rawNode.setAttribute("height",_a3);}var _a4=_76(svg.xmlns.svg,"defs");s.rawNode.appendChild(_a4);s.defNode=_a4;s._parent=dom.byId(_a1);s._parent.appendChild(s.rawNode);return s;};var _a5={_setFont:function(){var f=this.fontStyle;this.rawNode.setAttribute("font-style",f.style);this.rawNode.setAttribute("font-variant",f.variant);this.rawNode.setAttribute("font-weight",f.weight);this.rawNode.setAttribute("font-size",f.size);this.rawNode.setAttribute("font-family",f.family);}};var C=gs.Container,_a6={openBatch:function(){this.fragment=_7a();},closeBatch:function(){if(this.fragment){this.rawNode.appendChild(this.fragment);delete this.fragment;}},add:function(_a7){if(this!=_a7.getParent()){if(this.fragment){this.fragment.appendChild(_a7.rawNode);}else{this.rawNode.appendChild(_a7.rawNode);}C.add.apply(this,arguments);}return this;},remove:function(_a8,_a9){if(this==_a8.getParent()){if(this.rawNode==_a8.rawNode.parentNode){this.rawNode.removeChild(_a8.rawNode);}if(this.fragment&&this.fragment==_a8.rawNode.parentNode){this.fragment.removeChild(_a8.rawNode);}C.remove.apply(this,arguments);}return this;},clear:function(){var r=this.rawNode;while(r.lastChild){r.removeChild(r.lastChild);}var _aa=this.defNode;if(_aa){while(_aa.lastChild){_aa.removeChild(_aa.lastChild);}r.appendChild(_aa);}return C.clear.apply(this,arguments);},_moveChildToFront:C._moveChildToFront,_moveChildToBack:C._moveChildToBack};var _ab={createObject:function(_ac,_ad){if(!this.rawNode){return null;}var _ae=new _ac(),_af=_76(svg.xmlns.svg,_ac.nodeType);_ae.setRawNode(_af);_ae.setShape(_ad);this.add(_ae);return _ae;}};_6f.extend(svg.Text,_a5);_6f.extend(svg.TextPath,_a5);_6f.extend(svg.Group,_a6);_6f.extend(svg.Group,gs.Creator);_6f.extend(svg.Group,_ab);_6f.extend(svg.Surface,_a6);_6f.extend(svg.Surface,gs.Creator);_6f.extend(svg.Surface,_ab);svg.fixTarget=function(_b0,_b1){if(!_b0.gfxTarget){if(_75&&_b0.target.wholeText){_b0.gfxTarget=gs.byId(_b0.target.parentElement.__gfxObject__);}else{_b0.gfxTarget=gs.byId(_b0.target.__gfxObject__);}}return true;};if(svg.useSvgWeb){svg.createSurface=function(_b2,_b3,_b4){var s=new svg.Surface();if(!_b3||!_b4){var pos=_71.position(_b2);_b3=_b3||pos.w;_b4=_b4||pos.h;}_b2=dom.byId(_b2);var id=_b2.id?_b2.id+"_svgweb":g._base._getUniqueId();var _b5=_76(svg.xmlns.svg,"svg");_b5.id=id;_b5.setAttribute("width",_b3);_b5.setAttribute("height",_b4);svgweb.appendChild(_b5,_b2);_b5.addEventListener("SVGLoad",function(){s.rawNode=this;s.isLoaded=true;var _b6=_76(svg.xmlns.svg,"defs");s.rawNode.appendChild(_b6);s.defNode=_b6;if(s.onLoad){s.onLoad(s);}},false);s.isLoaded=false;return s;};svg.Surface.extend({destroy:function(){var _b7=this.rawNode;svgweb.removeChild(_b7,_b7.parentNode);}});var _b8={connect:function(_b9,_ba,_bb){if(_b9.substring(0,2)==="on"){_b9=_b9.substring(2);}if(arguments.length==2){_bb=_ba;}else{_bb=_6f.hitch(_ba,_bb);}this.getEventSource().addEventListener(_b9,_bb,false);return [this,_b9,_bb];},disconnect:function(_bc){this.getEventSource().removeEventListener(_bc[1],_bc[2],false);delete _bc[0];}};_6f.extend(svg.Shape,_b8);_6f.extend(svg.Surface,_b8);}return svg;});