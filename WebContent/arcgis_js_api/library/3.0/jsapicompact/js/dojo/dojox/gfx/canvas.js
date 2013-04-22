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
require({cache:{"dojox/gfx/arc":function(){define("dojox/gfx/arc",["./_base","dojo/_base/lang","./matrix"],function(g,_1,m){var _2=2*Math.PI,_3=Math.PI/4,_4=Math.PI/8,_5=_3+_4,_6=_7(_4);function _7(_8){var _9=Math.cos(_8),_a=Math.sin(_8),p2={x:_9+(4/3)*(1-_9),y:_a-(4/3)*_9*(1-_9)/_a};return {s:{x:_9,y:-_a},c1:{x:p2.x,y:-p2.y},c2:p2,e:{x:_9,y:_a}};};var _b=g.arc={unitArcAsBezier:_7,curvePI4:_6,arcAsBezier:function(_c,rx,ry,_d,_e,_f,x,y){_e=Boolean(_e);_f=Boolean(_f);var _10=m._degToRad(_d),rx2=rx*rx,ry2=ry*ry,pa=m.multiplyPoint(m.rotate(-_10),{x:(_c.x-x)/2,y:(_c.y-y)/2}),_11=pa.x*pa.x,_12=pa.y*pa.y,c1=Math.sqrt((rx2*ry2-rx2*_12-ry2*_11)/(rx2*_12+ry2*_11));if(isNaN(c1)){c1=0;}var ca={x:c1*rx*pa.y/ry,y:-c1*ry*pa.x/rx};if(_e==_f){ca={x:-ca.x,y:-ca.y};}var c=m.multiplyPoint([m.translate((_c.x+x)/2,(_c.y+y)/2),m.rotate(_10)],ca);var _13=m.normalize([m.translate(c.x,c.y),m.rotate(_10),m.scale(rx,ry)]);var _14=m.invert(_13),sp=m.multiplyPoint(_14,_c),ep=m.multiplyPoint(_14,x,y),_15=Math.atan2(sp.y,sp.x),_16=Math.atan2(ep.y,ep.x),_17=_15-_16;if(_f){_17=-_17;}if(_17<0){_17+=_2;}else{if(_17>_2){_17-=_2;}}var _18=_4,_19=_6,_1a=_f?_18:-_18,_1b=[];for(var _1c=_17;_1c>0;_1c-=_3){if(_1c<_5){_18=_1c/2;_19=_7(_18);_1a=_f?_18:-_18;_1c=0;}var c2,e,M=m.normalize([_13,m.rotate(_15+_1a)]);if(_f){c1=m.multiplyPoint(M,_19.c1);c2=m.multiplyPoint(M,_19.c2);e=m.multiplyPoint(M,_19.e);}else{c1=m.multiplyPoint(M,_19.c2);c2=m.multiplyPoint(M,_19.c1);e=m.multiplyPoint(M,_19.s);}_1b.push([c1.x,c1.y,c2.x,c2.y,e.x,e.y]);_15+=2*_1a;}return _1b;}};return _b;});},"dojox/gfx/shape":function(){define(["./_base","dojo/_base/lang","dojo/_base/declare","dojo/_base/window","dojo/_base/sniff","dojo/_base/connect","dojo/_base/array","dojo/dom-construct","dojo/_base/Color","./matrix"],function(g,_1d,_1e,win,has,_1f,arr,_20,_21,_22){var _23=g.shape={};var _24={};var _25={};_23.register=function(_26){var t=_26.declaredClass.split(".").pop();var i=t in _24?++_24[t]:((_24[t]=0));var uid=t+i;_25[uid]=_26;return uid;};_23.byId=function(id){return _25[id];};_23.dispose=function(_27){delete _25[_27.getUID()];};_1e("dojox.gfx.shape.Shape",null,{constructor:function(){this.rawNode=null;this.shape=null;this.matrix=null;this.fillStyle=null;this.strokeStyle=null;this.bbox=null;this.parent=null;this.parentMatrix=null;var uid=_23.register(this);this.getUID=function(){return uid;};},getNode:function(){return this.rawNode;},getShape:function(){return this.shape;},getTransform:function(){return this.matrix;},getFill:function(){return this.fillStyle;},getStroke:function(){return this.strokeStyle;},getParent:function(){return this.parent;},getBoundingBox:function(){return this.bbox;},getTransformedBoundingBox:function(){var b=this.getBoundingBox();if(!b){return null;}var m=this._getRealMatrix(),gm=_22;return [gm.multiplyPoint(m,b.x,b.y),gm.multiplyPoint(m,b.x+b.width,b.y),gm.multiplyPoint(m,b.x+b.width,b.y+b.height),gm.multiplyPoint(m,b.x,b.y+b.height)];},getEventSource:function(){return this.rawNode;},setShape:function(_28){this.shape=g.makeParameters(this.shape,_28);this.bbox=null;return this;},setFill:function(_29){if(!_29){this.fillStyle=null;return this;}var f=null;if(typeof (_29)=="object"&&"type" in _29){switch(_29.type){case "linear":f=g.makeParameters(g.defaultLinearGradient,_29);break;case "radial":f=g.makeParameters(g.defaultRadialGradient,_29);break;case "pattern":f=g.makeParameters(g.defaultPattern,_29);break;}}else{f=g.normalizeColor(_29);}this.fillStyle=f;return this;},setStroke:function(_2a){if(!_2a){this.strokeStyle=null;return this;}if(typeof _2a=="string"||_1d.isArray(_2a)||_2a instanceof _21){_2a={color:_2a};}var s=this.strokeStyle=g.makeParameters(g.defaultStroke,_2a);s.color=g.normalizeColor(s.color);return this;},setTransform:function(_2b){this.matrix=_22.clone(_2b?_22.normalize(_2b):_22.identity);return this._applyTransform();},_applyTransform:function(){return this;},moveToFront:function(){var p=this.getParent();if(p){p._moveChildToFront(this);this._moveToFront();}return this;},moveToBack:function(){var p=this.getParent();if(p){p._moveChildToBack(this);this._moveToBack();}return this;},_moveToFront:function(){},_moveToBack:function(){},applyRightTransform:function(_2c){return _2c?this.setTransform([this.matrix,_2c]):this;},applyLeftTransform:function(_2d){return _2d?this.setTransform([_2d,this.matrix]):this;},applyTransform:function(_2e){return _2e?this.setTransform([this.matrix,_2e]):this;},removeShape:function(_2f){if(this.parent){this.parent.remove(this,_2f);}return this;},_setParent:function(_30,_31){this.parent=_30;return this._updateParentMatrix(_31);},_updateParentMatrix:function(_32){this.parentMatrix=_32?_22.clone(_32):null;return this._applyTransform();},_getRealMatrix:function(){var m=this.matrix;var p=this.parent;while(p){if(p.matrix){m=_22.multiply(p.matrix,m);}p=p.parent;}return m;}});_23._eventsProcessing={connect:function(_33,_34,_35){return _1f.connect(this.getEventSource(),_33,_23.fixCallback(this,g.fixTarget,_34,_35));},disconnect:function(_36){_1f.disconnect(_36);}};_23.fixCallback=function(_37,_38,_39,_3a){if(!_3a){_3a=_39;_39=null;}if(_1d.isString(_3a)){_39=_39||win.global;if(!_39[_3a]){throw (["dojox.gfx.shape.fixCallback: scope[\"",_3a,"\"] is null (scope=\"",_39,"\")"].join(""));}return function(e){return _38(e,_37)?_39[_3a].apply(_39,arguments||[]):undefined;};}return !_39?function(e){return _38(e,_37)?_3a.apply(_39,arguments):undefined;}:function(e){return _38(e,_37)?_3a.apply(_39,arguments||[]):undefined;};};_1d.extend(_23.Shape,_23._eventsProcessing);_23.Container={_init:function(){this.children=[];},openBatch:function(){},closeBatch:function(){},add:function(_3b){var _3c=_3b.getParent();if(_3c){_3c.remove(_3b,true);}this.children.push(_3b);return _3b._setParent(this,this._getRealMatrix());},remove:function(_3d,_3e){for(var i=0;i<this.children.length;++i){if(this.children[i]==_3d){if(_3e){}else{_3d.parent=null;_3d.parentMatrix=null;}this.children.splice(i,1);break;}}return this;},clear:function(){var _3f;for(var i=0;i<this.children.length;++i){_3f=this.children[i];_3f.parent=null;_3f.parentMatrix=null;}this.children=[];return this;},_moveChildToFront:function(_40){for(var i=0;i<this.children.length;++i){if(this.children[i]==_40){this.children.splice(i,1);this.children.push(_40);break;}}return this;},_moveChildToBack:function(_41){for(var i=0;i<this.children.length;++i){if(this.children[i]==_41){this.children.splice(i,1);this.children.unshift(_41);break;}}return this;}};_1e("dojox.gfx.shape.Surface",null,{constructor:function(){this.rawNode=null;this._parent=null;this._nodes=[];this._events=[];},destroy:function(){arr.forEach(this._nodes,_20.destroy);this._nodes=[];arr.forEach(this._events,_1f.disconnect);this._events=[];this.rawNode=null;if(has("ie")){while(this._parent.lastChild){_20.destroy(this._parent.lastChild);}}else{this._parent.innerHTML="";}this._parent=null;},getEventSource:function(){return this.rawNode;},_getRealMatrix:function(){return null;},isLoaded:true,onLoad:function(_42){},whenLoaded:function(_43,_44){var f=_1d.hitch(_43,_44);if(this.isLoaded){f(this);}else{var h=_1f.connect(this,"onLoad",function(_45){_1f.disconnect(h);f(_45);});}}});_1d.extend(_23.Surface,_23._eventsProcessing);_1e("dojox.gfx.Point",null,{});_1e("dojox.gfx.Rectangle",null,{});_1e("dojox.gfx.shape.Rect",_23.Shape,{constructor:function(_46){this.shape=g.getDefault("Rect");this.rawNode=_46;},getBoundingBox:function(){return this.shape;}});_1e("dojox.gfx.shape.Ellipse",_23.Shape,{constructor:function(_47){this.shape=g.getDefault("Ellipse");this.rawNode=_47;},getBoundingBox:function(){if(!this.bbox){var _48=this.shape;this.bbox={x:_48.cx-_48.rx,y:_48.cy-_48.ry,width:2*_48.rx,height:2*_48.ry};}return this.bbox;}});_1e("dojox.gfx.shape.Circle",_23.Shape,{constructor:function(_49){this.shape=g.getDefault("Circle");this.rawNode=_49;},getBoundingBox:function(){if(!this.bbox){var _4a=this.shape;this.bbox={x:_4a.cx-_4a.r,y:_4a.cy-_4a.r,width:2*_4a.r,height:2*_4a.r};}return this.bbox;}});_1e("dojox.gfx.shape.Line",_23.Shape,{constructor:function(_4b){this.shape=g.getDefault("Line");this.rawNode=_4b;},getBoundingBox:function(){if(!this.bbox){var _4c=this.shape;this.bbox={x:Math.min(_4c.x1,_4c.x2),y:Math.min(_4c.y1,_4c.y2),width:Math.abs(_4c.x2-_4c.x1),height:Math.abs(_4c.y2-_4c.y1)};}return this.bbox;}});_1e("dojox.gfx.shape.Polyline",_23.Shape,{constructor:function(_4d){this.shape=g.getDefault("Polyline");this.rawNode=_4d;},setShape:function(_4e,_4f){if(_4e&&_4e instanceof Array){this.inherited(arguments,[{points:_4e}]);if(_4f&&this.shape.points.length){this.shape.points.push(this.shape.points[0]);}}else{this.inherited(arguments,[_4e]);}return this;},_normalizePoints:function(){var p=this.shape.points,l=p&&p.length;if(l&&typeof p[0]=="number"){var _50=[];for(var i=0;i<l;i+=2){_50.push({x:p[i],y:p[i+1]});}this.shape.points=_50;}},getBoundingBox:function(){if(!this.bbox&&this.shape.points.length){var p=this.shape.points;var l=p.length;var t=p[0];var _51={l:t.x,t:t.y,r:t.x,b:t.y};for(var i=1;i<l;++i){t=p[i];if(_51.l>t.x){_51.l=t.x;}if(_51.r<t.x){_51.r=t.x;}if(_51.t>t.y){_51.t=t.y;}if(_51.b<t.y){_51.b=t.y;}}this.bbox={x:_51.l,y:_51.t,width:_51.r-_51.l,height:_51.b-_51.t};}return this.bbox;}});_1e("dojox.gfx.shape.Image",_23.Shape,{constructor:function(_52){this.shape=g.getDefault("Image");this.rawNode=_52;},getBoundingBox:function(){return this.shape;},setStroke:function(){return this;},setFill:function(){return this;}});_1e("dojox.gfx.shape.Text",_23.Shape,{constructor:function(_53){this.fontStyle=null;this.shape=g.getDefault("Text");this.rawNode=_53;},getFont:function(){return this.fontStyle;},setFont:function(_54){this.fontStyle=typeof _54=="string"?g.splitFontString(_54):g.makeParameters(g.defaultFont,_54);this._setFont();return this;}});_23.Creator={createShape:function(_55){switch(_55.type){case g.defaultPath.type:return this.createPath(_55);case g.defaultRect.type:return this.createRect(_55);case g.defaultCircle.type:return this.createCircle(_55);case g.defaultEllipse.type:return this.createEllipse(_55);case g.defaultLine.type:return this.createLine(_55);case g.defaultPolyline.type:return this.createPolyline(_55);case g.defaultImage.type:return this.createImage(_55);case g.defaultText.type:return this.createText(_55);case g.defaultTextPath.type:return this.createTextPath(_55);}return null;},createGroup:function(){return this.createObject(g.Group);},createRect:function(_56){return this.createObject(g.Rect,_56);},createEllipse:function(_57){return this.createObject(g.Ellipse,_57);},createCircle:function(_58){return this.createObject(g.Circle,_58);},createLine:function(_59){return this.createObject(g.Line,_59);},createPolyline:function(_5a){return this.createObject(g.Polyline,_5a);},createImage:function(_5b){return this.createObject(g.Image,_5b);},createText:function(_5c){return this.createObject(g.Text,_5c);},createPath:function(_5d){return this.createObject(g.Path,_5d);},createTextPath:function(_5e){return this.createObject(g.TextPath,{}).setText(_5e);},createObject:function(_5f,_60){return null;}};return _23;});},"dojox/gfx/path":function(){define("dojox/gfx/path",["./_base","dojo/_base/lang","dojo/_base/declare","./matrix","./shape"],function(g,_61,_62,_63,_64){var _65=g.path={};var _66=_62("dojox.gfx.path.Path",_64.Shape,{constructor:function(_67){this.shape=_61.clone(g.defaultPath);this.segments=[];this.tbbox=null;this.absolute=true;this.last={};this.rawNode=_67;this.segmented=false;},setAbsoluteMode:function(_68){this._confirmSegmented();this.absolute=typeof _68=="string"?(_68=="absolute"):_68;return this;},getAbsoluteMode:function(){this._confirmSegmented();return this.absolute;},getBoundingBox:function(){this._confirmSegmented();return (this.bbox&&("l" in this.bbox))?{x:this.bbox.l,y:this.bbox.t,width:this.bbox.r-this.bbox.l,height:this.bbox.b-this.bbox.t}:null;},_getRealBBox:function(){this._confirmSegmented();if(this.tbbox){return this.tbbox;}var _69=this.bbox,_63=this._getRealMatrix();this.bbox=null;for(var i=0,len=this.segments.length;i<len;++i){this._updateWithSegment(this.segments[i],_63);}var t=this.bbox;this.bbox=_69;this.tbbox=t?[{x:t.l,y:t.t},{x:t.r,y:t.t},{x:t.r,y:t.b},{x:t.l,y:t.b}]:null;return this.tbbox;},getLastPosition:function(){this._confirmSegmented();return "x" in this.last?this.last:null;},_applyTransform:function(){this.tbbox=null;return this.inherited(arguments);},_updateBBox:function(x,y,m){if(m){var t=_63.multiplyPoint(m,x,y);x=t.x;y=t.y;}if(this.bbox&&("l" in this.bbox)){if(this.bbox.l>x){this.bbox.l=x;}if(this.bbox.r<x){this.bbox.r=x;}if(this.bbox.t>y){this.bbox.t=y;}if(this.bbox.b<y){this.bbox.b=y;}}else{this.bbox={l:x,b:y,r:x,t:y};}},_updateWithSegment:function(_6a,_6b){var n=_6a.args,l=n.length,i;switch(_6a.action){case "M":case "L":case "C":case "S":case "Q":case "T":for(i=0;i<l;i+=2){this._updateBBox(n[i],n[i+1],_6b);}this.last.x=n[l-2];this.last.y=n[l-1];this.absolute=true;break;case "H":for(i=0;i<l;++i){this._updateBBox(n[i],this.last.y,_6b);}this.last.x=n[l-1];this.absolute=true;break;case "V":for(i=0;i<l;++i){this._updateBBox(this.last.x,n[i],_6b);}this.last.y=n[l-1];this.absolute=true;break;case "m":var _6c=0;if(!("x" in this.last)){this._updateBBox(this.last.x=n[0],this.last.y=n[1],_6b);_6c=2;}for(i=_6c;i<l;i+=2){this._updateBBox(this.last.x+=n[i],this.last.y+=n[i+1],_6b);}this.absolute=false;break;case "l":case "t":for(i=0;i<l;i+=2){this._updateBBox(this.last.x+=n[i],this.last.y+=n[i+1],_6b);}this.absolute=false;break;case "h":for(i=0;i<l;++i){this._updateBBox(this.last.x+=n[i],this.last.y,_6b);}this.absolute=false;break;case "v":for(i=0;i<l;++i){this._updateBBox(this.last.x,this.last.y+=n[i],_6b);}this.absolute=false;break;case "c":for(i=0;i<l;i+=6){this._updateBBox(this.last.x+n[i],this.last.y+n[i+1],_6b);this._updateBBox(this.last.x+n[i+2],this.last.y+n[i+3],_6b);this._updateBBox(this.last.x+=n[i+4],this.last.y+=n[i+5],_6b);}this.absolute=false;break;case "s":case "q":for(i=0;i<l;i+=4){this._updateBBox(this.last.x+n[i],this.last.y+n[i+1],_6b);this._updateBBox(this.last.x+=n[i+2],this.last.y+=n[i+3],_6b);}this.absolute=false;break;case "A":for(i=0;i<l;i+=7){this._updateBBox(n[i+5],n[i+6],_6b);}this.last.x=n[l-2];this.last.y=n[l-1];this.absolute=true;break;case "a":for(i=0;i<l;i+=7){this._updateBBox(this.last.x+=n[i+5],this.last.y+=n[i+6],_6b);}this.absolute=false;break;}var _6d=[_6a.action];for(i=0;i<l;++i){_6d.push(g.formatNumber(n[i],true));}if(typeof this.shape.path=="string"){this.shape.path+=_6d.join("");}else{Array.prototype.push.apply(this.shape.path,_6d);}},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(_6e,_6f){this.tbbox=null;var _70=this._validSegments[_6e.toLowerCase()],_71;if(typeof _70=="number"){if(_70){if(_6f.length>=_70){_71={action:_6e,args:_6f.slice(0,_6f.length-_6f.length%_70)};this.segments.push(_71);this._updateWithSegment(_71);}}else{_71={action:_6e,args:[]};this.segments.push(_71);this._updateWithSegment(_71);}}},_collectArgs:function(_72,_73){for(var i=0;i<_73.length;++i){var t=_73[i];if(typeof t=="boolean"){_72.push(t?1:0);}else{if(typeof t=="number"){_72.push(t);}else{if(t instanceof Array){this._collectArgs(_72,t);}else{if("x" in t&&"y" in t){_72.push(t.x,t.y);}}}}}},moveTo:function(){this._confirmSegmented();var _74=[];this._collectArgs(_74,arguments);this._pushSegment(this.absolute?"M":"m",_74);return this;},lineTo:function(){this._confirmSegmented();var _75=[];this._collectArgs(_75,arguments);this._pushSegment(this.absolute?"L":"l",_75);return this;},hLineTo:function(){this._confirmSegmented();var _76=[];this._collectArgs(_76,arguments);this._pushSegment(this.absolute?"H":"h",_76);return this;},vLineTo:function(){this._confirmSegmented();var _77=[];this._collectArgs(_77,arguments);this._pushSegment(this.absolute?"V":"v",_77);return this;},curveTo:function(){this._confirmSegmented();var _78=[];this._collectArgs(_78,arguments);this._pushSegment(this.absolute?"C":"c",_78);return this;},smoothCurveTo:function(){this._confirmSegmented();var _79=[];this._collectArgs(_79,arguments);this._pushSegment(this.absolute?"S":"s",_79);return this;},qCurveTo:function(){this._confirmSegmented();var _7a=[];this._collectArgs(_7a,arguments);this._pushSegment(this.absolute?"Q":"q",_7a);return this;},qSmoothCurveTo:function(){this._confirmSegmented();var _7b=[];this._collectArgs(_7b,arguments);this._pushSegment(this.absolute?"T":"t",_7b);return this;},arcTo:function(){this._confirmSegmented();var _7c=[];this._collectArgs(_7c,arguments);this._pushSegment(this.absolute?"A":"a",_7c);return this;},closePath:function(){this._confirmSegmented();this._pushSegment("Z",[]);return this;},_confirmSegmented:function(){if(!this.segmented){var _7d=this.shape.path;this.shape.path=[];this._setPath(_7d);this.shape.path=this.shape.path.join("");this.segmented=true;}},_setPath:function(_7e){var p=_61.isArray(_7e)?_7e:_7e.match(g.pathSvgRegExp);this.segments=[];this.absolute=true;this.bbox={};this.last={};if(!p){return;}var _7f="",_80=[],l=p.length;for(var i=0;i<l;++i){var t=p[i],x=parseFloat(t);if(isNaN(x)){if(_7f){this._pushSegment(_7f,_80);}_80=[];_7f=t;}else{_80.push(x);}}this._pushSegment(_7f,_80);},setShape:function(_81){this.inherited(arguments,[typeof _81=="string"?{path:_81}:_81]);this.segmented=false;this.segments=[];if(!g.lazyPathSegmentation){this._confirmSegmented();}return this;},_2PI:Math.PI*2});var _82=_62("dojox.gfx.path.TextPath",_66,{constructor:function(_83){if(!("text" in this)){this.text=_61.clone(g.defaultTextPath);}if(!("fontStyle" in this)){this.fontStyle=_61.clone(g.defaultFont);}},getText:function(){return this.text;},setText:function(_84){this.text=g.makeParameters(this.text,typeof _84=="string"?{text:_84}:_84);this._setText();return this;},getFont:function(){return this.fontStyle;},setFont:function(_85){this.fontStyle=typeof _85=="string"?g.splitFontString(_85):g.makeParameters(g.defaultFont,_85);this._setFont();return this;}});return {Path:_66,TextPath:_82};});},"dojox/gfx/decompose":function(){define("dojox/gfx/decompose",["./_base","dojo/_base/lang","./matrix"],function(g,_86,m){function eq(a,b){return Math.abs(a-b)<=0.000001*(Math.abs(a)+Math.abs(b));};function _87(r1,m1,r2,m2){if(!isFinite(r1)){return r2;}else{if(!isFinite(r2)){return r1;}}m1=Math.abs(m1);m2=Math.abs(m2);return (m1*r1+m2*r2)/(m1+m2);};function _88(_89){var M=new m.Matrix2D(_89);return _86.mixin(M,{dx:0,dy:0,xy:M.yx,yx:M.xy});};function _8a(_8b){return (_8b.xx*_8b.yy<0||_8b.xy*_8b.yx>0)?-1:1;};function _8c(_8d){var M=m.normalize(_8d),b=-M.xx-M.yy,c=M.xx*M.yy-M.xy*M.yx,d=Math.sqrt(b*b-4*c),l1=-(b+(b<0?-d:d))/2,l2=c/l1,vx1=M.xy/(l1-M.xx),vy1=1,vx2=M.xy/(l2-M.xx),vy2=1;if(eq(l1,l2)){vx1=1,vy1=0,vx2=0,vy2=1;}if(!isFinite(vx1)){vx1=1,vy1=(l1-M.xx)/M.xy;if(!isFinite(vy1)){vx1=(l1-M.yy)/M.yx,vy1=1;if(!isFinite(vx1)){vx1=1,vy1=M.yx/(l1-M.yy);}}}if(!isFinite(vx2)){vx2=1,vy2=(l2-M.xx)/M.xy;if(!isFinite(vy2)){vx2=(l2-M.yy)/M.yx,vy2=1;if(!isFinite(vx2)){vx2=1,vy2=M.yx/(l2-M.yy);}}}var d1=Math.sqrt(vx1*vx1+vy1*vy1),d2=Math.sqrt(vx2*vx2+vy2*vy2);if(!isFinite(vx1/=d1)){vx1=0;}if(!isFinite(vy1/=d1)){vy1=0;}if(!isFinite(vx2/=d2)){vx2=0;}if(!isFinite(vy2/=d2)){vy2=0;}return {value1:l1,value2:l2,vector1:{x:vx1,y:vy1},vector2:{x:vx2,y:vy2}};};function _8e(M,_8f){var _90=_8a(M),a=_8f.angle1=(Math.atan2(M.yx,M.yy)+Math.atan2(-_90*M.xy,_90*M.xx))/2,cos=Math.cos(a),sin=Math.sin(a);_8f.sx=_87(M.xx/cos,cos,-M.xy/sin,sin);_8f.sy=_87(M.yy/cos,cos,M.yx/sin,sin);return _8f;};function _91(M,_92){var _93=_8a(M),a=_92.angle2=(Math.atan2(_93*M.yx,_93*M.xx)+Math.atan2(-M.xy,M.yy))/2,cos=Math.cos(a),sin=Math.sin(a);_92.sx=_87(M.xx/cos,cos,M.yx/sin,sin);_92.sy=_87(M.yy/cos,cos,-M.xy/sin,sin);return _92;};return g.decompose=function(_94){var M=m.normalize(_94),_95={dx:M.dx,dy:M.dy,sx:1,sy:1,angle1:0,angle2:0};if(eq(M.xy,0)&&eq(M.yx,0)){return _86.mixin(_95,{sx:M.xx,sy:M.yy});}if(eq(M.xx*M.yx,-M.xy*M.yy)){return _8e(M,_95);}if(eq(M.xx*M.xy,-M.yx*M.yy)){return _91(M,_95);}var MT=_88(M),u=_8c([M,MT]),v=_8c([MT,M]),U=new m.Matrix2D({xx:u.vector1.x,xy:u.vector2.x,yx:u.vector1.y,yy:u.vector2.y}),VT=new m.Matrix2D({xx:v.vector1.x,xy:v.vector1.y,yx:v.vector2.x,yy:v.vector2.y}),S=new m.Matrix2D([m.invert(U),M,m.invert(VT)]);_8e(VT,_95);S.xx*=_95.sx;S.yy*=_95.sy;_91(U,_95);S.xx*=_95.sx;S.yy*=_95.sy;return _86.mixin(_95,{sx:S.xx,sy:S.yy});};});},"*noref":1}});require(["dojo/i18n"],function(_96){_96._preloadLocalizations("dojox/gfx/nls/canvas",[]);});define("dojox/gfx/canvas",["./_base","dojo/_base/lang","dojo/_base/array","dojo/_base/declare","dojo/_base/window","dojo/dom-geometry","dojo/dom","./_base","./shape","./path","./arc","./matrix","./decompose"],function(g,_97,arr,_98,win,_99,dom,_9a,gs,_9b,ga,m,_9c){var _9d=g.canvas={};var _9e=null,mp=m.multiplyPoint,pi=Math.PI,_9f=2*pi,_a0=pi/2,_a1=_97.extend;_98("dojox.gfx.canvas.Shape",gs.Shape,{_render:function(ctx){ctx.save();this._renderTransform(ctx);this._renderShape(ctx);this._renderFill(ctx,true);this._renderStroke(ctx,true);ctx.restore();},_renderTransform:function(ctx){if("canvasTransform" in this){var t=this.canvasTransform;ctx.translate(t.dx,t.dy);ctx.rotate(t.angle2);ctx.scale(t.sx,t.sy);ctx.rotate(t.angle1);}},_renderShape:function(ctx){},_renderFill:function(ctx,_a2){if("canvasFill" in this){var fs=this.fillStyle;if("canvasFillImage" in this){var w=fs.width,h=fs.height,iw=this.canvasFillImage.width,ih=this.canvasFillImage.height,sx=w==iw?1:w/iw,sy=h==ih?1:h/ih,s=Math.min(sx,sy),dx=(w-s*iw)/2,dy=(h-s*ih)/2;_9e.width=w;_9e.height=h;var _a3=_9e.getContext("2d");_a3.clearRect(0,0,w,h);_a3.drawImage(this.canvasFillImage,0,0,iw,ih,dx,dy,s*iw,s*ih);this.canvasFill=ctx.createPattern(_9e,"repeat");delete this.canvasFillImage;}ctx.fillStyle=this.canvasFill;if(_a2){if(fs.type==="pattern"&&(fs.x!==0||fs.y!==0)){ctx.translate(fs.x,fs.y);}ctx.fill();}}else{ctx.fillStyle="rgba(0,0,0,0.0)";}},_renderStroke:function(ctx,_a4){var s=this.strokeStyle;if(s){ctx.strokeStyle=s.color.toString();ctx.lineWidth=s.width;ctx.lineCap=s.cap;if(typeof s.join=="number"){ctx.lineJoin="miter";ctx.miterLimit=s.join;}else{ctx.lineJoin=s.join;}if(_a4){ctx.stroke();}}else{if(!_a4){ctx.strokeStyle="rgba(0,0,0,0.0)";}}},getEventSource:function(){return null;},connect:function(){},disconnect:function(){}});var _a5=function(_a6,_a7,_a8){var old=_a6.prototype[_a7];_a6.prototype[_a7]=_a8?function(){this.surface.makeDirty();old.apply(this,arguments);_a8.call(this);return this;}:function(){this.surface.makeDirty();return old.apply(this,arguments);};};_a5(_9d.Shape,"setTransform",function(){if(this.matrix){this.canvasTransform=g.decompose(this.matrix);}else{delete this.canvasTransform;}});_a5(_9d.Shape,"setFill",function(){var fs=this.fillStyle,f;if(fs){if(typeof (fs)=="object"&&"type" in fs){var ctx=this.surface.rawNode.getContext("2d");switch(fs.type){case "linear":case "radial":f=fs.type=="linear"?ctx.createLinearGradient(fs.x1,fs.y1,fs.x2,fs.y2):ctx.createRadialGradient(fs.cx,fs.cy,0,fs.cx,fs.cy,fs.r);arr.forEach(fs.colors,function(_a9){f.addColorStop(_a9.offset,g.normalizeColor(_a9.color).toString());});break;case "pattern":if(!_9e){_9e=document.createElement("canvas");}var img=new Image();this.surface.downloadImage(img,fs.src);this.canvasFillImage=img;}}else{f=fs.toString();}this.canvasFill=f;}else{delete this.canvasFill;}});_a5(_9d.Shape,"setStroke");_a5(_9d.Shape,"setShape");_98("dojox.gfx.canvas.Group",_9d.Shape,{constructor:function(){gs.Container._init.call(this);},_render:function(ctx){ctx.save();this._renderTransform(ctx);for(var i=0;i<this.children.length;++i){this.children[i]._render(ctx);}ctx.restore();}});_98("dojox.gfx.canvas.Rect",[_9d.Shape,gs.Rect],{_renderShape:function(ctx){var s=this.shape,r=Math.min(s.r,s.height/2,s.width/2),xl=s.x,xr=xl+s.width,yt=s.y,yb=yt+s.height,xl2=xl+r,xr2=xr-r,yt2=yt+r,yb2=yb-r;ctx.beginPath();ctx.moveTo(xl2,yt);if(r){ctx.arc(xr2,yt2,r,-_a0,0,false);ctx.arc(xr2,yb2,r,0,_a0,false);ctx.arc(xl2,yb2,r,_a0,pi,false);ctx.arc(xl2,yt2,r,pi,pi+_a0,false);}else{ctx.lineTo(xr2,yt);ctx.lineTo(xr,yb2);ctx.lineTo(xl2,yb);ctx.lineTo(xl,yt2);}ctx.closePath();}});var _aa=[];(function(){var u=ga.curvePI4;_aa.push(u.s,u.c1,u.c2,u.e);for(var a=45;a<360;a+=45){var r=m.rotateg(a);_aa.push(mp(r,u.c1),mp(r,u.c2),mp(r,u.e));}})();_98("dojox.gfx.canvas.Ellipse",[_9d.Shape,gs.Ellipse],{setShape:function(){this.inherited(arguments);var s=this.shape,t,c1,c2,r=[],M=m.normalize([m.translate(s.cx,s.cy),m.scale(s.rx,s.ry)]);t=mp(M,_aa[0]);r.push([t.x,t.y]);for(var i=1;i<_aa.length;i+=3){c1=mp(M,_aa[i]);c2=mp(M,_aa[i+1]);t=mp(M,_aa[i+2]);r.push([c1.x,c1.y,c2.x,c2.y,t.x,t.y]);}this.canvasEllipse=r;return this;},_renderShape:function(ctx){var r=this.canvasEllipse;ctx.beginPath();ctx.moveTo.apply(ctx,r[0]);for(var i=1;i<r.length;++i){ctx.bezierCurveTo.apply(ctx,r[i]);}ctx.closePath();}});_98("dojox.gfx.canvas.Circle",[_9d.Shape,gs.Circle],{_renderShape:function(ctx){var s=this.shape;ctx.beginPath();ctx.arc(s.cx,s.cy,s.r,0,_9f,1);}});_98("dojox.gfx.canvas.Line",[_9d.Shape,gs.Line],{_renderShape:function(ctx){var s=this.shape;ctx.beginPath();ctx.moveTo(s.x1,s.y1);ctx.lineTo(s.x2,s.y2);}});_98("dojox.gfx.canvas.Polyline",[_9d.Shape,gs.Polyline],{setShape:function(){this.inherited(arguments);var p=this.shape.points,f=p[0],r,c,i;this.bbox=null;this._normalizePoints();if(p.length){if(typeof f=="number"){r=p;}else{r=[];for(i=0;i<p.length;++i){c=p[i];r.push(c.x,c.y);}}}else{r=[];}this.canvasPolyline=r;return this;},_renderShape:function(ctx){var p=this.canvasPolyline;if(p.length){ctx.beginPath();ctx.moveTo(p[0],p[1]);for(var i=2;i<p.length;i+=2){ctx.lineTo(p[i],p[i+1]);}}}});_98("dojox.gfx.canvas.Image",[_9d.Shape,gs.Image],{setShape:function(){this.inherited(arguments);var img=new Image();this.surface.downloadImage(img,this.shape.src);this.canvasImage=img;return this;},_renderShape:function(ctx){var s=this.shape;ctx.drawImage(this.canvasImage,s.x,s.y,s.width,s.height);}});_98("dojox.gfx.canvas.Text",[_9d.Shape,gs.Text],{_setFont:function(){if(this.fontStyle){this.canvasFont=g.makeFontString(this.fontStyle);}else{delete this.canvasFont;}},getTextWidth:function(){var s=this.shape,w=0,ctx;if(s.text&&s.text.length>0){ctx=this.surface.rawNode.getContext("2d");ctx.save();this._renderTransform(ctx);this._renderFill(ctx,false);this._renderStroke(ctx,false);if(this.canvasFont){ctx.font=this.canvasFont;}w=ctx.measureText(s.text).width;ctx.restore();}return w;},_render:function(ctx){ctx.save();this._renderTransform(ctx);this._renderFill(ctx,false);this._renderStroke(ctx,false);this._renderShape(ctx);ctx.restore();},_renderShape:function(ctx){var ta,s=this.shape;if(!s.text||s.text.length==0){return;}ta=s.align==="middle"?"center":s.align;ctx.textAlign=ta;if(this.canvasFont){ctx.font=this.canvasFont;}if(this.canvasFill){ctx.fillText(s.text,s.x,s.y);}if(this.strokeStyle){ctx.beginPath();ctx.strokeText(s.text,s.x,s.y);ctx.closePath();}}});_a5(_9d.Text,"setFont");if(win.global.CanvasRenderingContext2D){var _ab=win.doc.createElement("canvas").getContext("2d");if(_ab&&typeof _ab.fillText!="function"){_9d.Text.extend({getTextWidth:function(){return 0;},_renderShape:function(){}});}}var _ac={M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"};_98("dojox.gfx.canvas.Path",[_9d.Shape,_9b.Path],{constructor:function(){this.lastControl={};},setShape:function(){this.canvasPath=[];return this.inherited(arguments);},_updateWithSegment:function(_ad){var _ae=_97.clone(this.last);this[_ac[_ad.action]](this.canvasPath,_ad.action,_ad.args);this.last=_ae;this.inherited(arguments);},_renderShape:function(ctx){var r=this.canvasPath;ctx.beginPath();for(var i=0;i<r.length;i+=2){ctx[r[i]].apply(ctx,r[i+1]);}},_moveToA:function(_af,_b0,_b1){_af.push("moveTo",[_b1[0],_b1[1]]);for(var i=2;i<_b1.length;i+=2){_af.push("lineTo",[_b1[i],_b1[i+1]]);}this.last.x=_b1[_b1.length-2];this.last.y=_b1[_b1.length-1];this.lastControl={};},_moveToR:function(_b2,_b3,_b4){if("x" in this.last){_b2.push("moveTo",[this.last.x+=_b4[0],this.last.y+=_b4[1]]);}else{_b2.push("moveTo",[this.last.x=_b4[0],this.last.y=_b4[1]]);}for(var i=2;i<_b4.length;i+=2){_b2.push("lineTo",[this.last.x+=_b4[i],this.last.y+=_b4[i+1]]);}this.lastControl={};},_lineToA:function(_b5,_b6,_b7){for(var i=0;i<_b7.length;i+=2){_b5.push("lineTo",[_b7[i],_b7[i+1]]);}this.last.x=_b7[_b7.length-2];this.last.y=_b7[_b7.length-1];this.lastControl={};},_lineToR:function(_b8,_b9,_ba){for(var i=0;i<_ba.length;i+=2){_b8.push("lineTo",[this.last.x+=_ba[i],this.last.y+=_ba[i+1]]);}this.lastControl={};},_hLineToA:function(_bb,_bc,_bd){for(var i=0;i<_bd.length;++i){_bb.push("lineTo",[_bd[i],this.last.y]);}this.last.x=_bd[_bd.length-1];this.lastControl={};},_hLineToR:function(_be,_bf,_c0){for(var i=0;i<_c0.length;++i){_be.push("lineTo",[this.last.x+=_c0[i],this.last.y]);}this.lastControl={};},_vLineToA:function(_c1,_c2,_c3){for(var i=0;i<_c3.length;++i){_c1.push("lineTo",[this.last.x,_c3[i]]);}this.last.y=_c3[_c3.length-1];this.lastControl={};},_vLineToR:function(_c4,_c5,_c6){for(var i=0;i<_c6.length;++i){_c4.push("lineTo",[this.last.x,this.last.y+=_c6[i]]);}this.lastControl={};},_curveToA:function(_c7,_c8,_c9){for(var i=0;i<_c9.length;i+=6){_c7.push("bezierCurveTo",_c9.slice(i,i+6));}this.last.x=_c9[_c9.length-2];this.last.y=_c9[_c9.length-1];this.lastControl.x=_c9[_c9.length-4];this.lastControl.y=_c9[_c9.length-3];this.lastControl.type="C";},_curveToR:function(_ca,_cb,_cc){for(var i=0;i<_cc.length;i+=6){_ca.push("bezierCurveTo",[this.last.x+_cc[i],this.last.y+_cc[i+1],this.lastControl.x=this.last.x+_cc[i+2],this.lastControl.y=this.last.y+_cc[i+3],this.last.x+_cc[i+4],this.last.y+_cc[i+5]]);this.last.x+=_cc[i+4];this.last.y+=_cc[i+5];}this.lastControl.type="C";},_smoothCurveToA:function(_cd,_ce,_cf){for(var i=0;i<_cf.length;i+=4){var _d0=this.lastControl.type=="C";_cd.push("bezierCurveTo",[_d0?2*this.last.x-this.lastControl.x:this.last.x,_d0?2*this.last.y-this.lastControl.y:this.last.y,_cf[i],_cf[i+1],_cf[i+2],_cf[i+3]]);this.lastControl.x=_cf[i];this.lastControl.y=_cf[i+1];this.lastControl.type="C";}this.last.x=_cf[_cf.length-2];this.last.y=_cf[_cf.length-1];},_smoothCurveToR:function(_d1,_d2,_d3){for(var i=0;i<_d3.length;i+=4){var _d4=this.lastControl.type=="C";_d1.push("bezierCurveTo",[_d4?2*this.last.x-this.lastControl.x:this.last.x,_d4?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+_d3[i],this.last.y+_d3[i+1],this.last.x+_d3[i+2],this.last.y+_d3[i+3]]);this.lastControl.x=this.last.x+_d3[i];this.lastControl.y=this.last.y+_d3[i+1];this.lastControl.type="C";this.last.x+=_d3[i+2];this.last.y+=_d3[i+3];}},_qCurveToA:function(_d5,_d6,_d7){for(var i=0;i<_d7.length;i+=4){_d5.push("quadraticCurveTo",_d7.slice(i,i+4));}this.last.x=_d7[_d7.length-2];this.last.y=_d7[_d7.length-1];this.lastControl.x=_d7[_d7.length-4];this.lastControl.y=_d7[_d7.length-3];this.lastControl.type="Q";},_qCurveToR:function(_d8,_d9,_da){for(var i=0;i<_da.length;i+=4){_d8.push("quadraticCurveTo",[this.lastControl.x=this.last.x+_da[i],this.lastControl.y=this.last.y+_da[i+1],this.last.x+_da[i+2],this.last.y+_da[i+3]]);this.last.x+=_da[i+2];this.last.y+=_da[i+3];}this.lastControl.type="Q";},_qSmoothCurveToA:function(_db,_dc,_dd){for(var i=0;i<_dd.length;i+=2){var _de=this.lastControl.type=="Q";_db.push("quadraticCurveTo",[this.lastControl.x=_de?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=_de?2*this.last.y-this.lastControl.y:this.last.y,_dd[i],_dd[i+1]]);this.lastControl.type="Q";}this.last.x=_dd[_dd.length-2];this.last.y=_dd[_dd.length-1];},_qSmoothCurveToR:function(_df,_e0,_e1){for(var i=0;i<_e1.length;i+=2){var _e2=this.lastControl.type=="Q";_df.push("quadraticCurveTo",[this.lastControl.x=_e2?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=_e2?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+_e1[i],this.last.y+_e1[i+1]]);this.lastControl.type="Q";this.last.x+=_e1[i];this.last.y+=_e1[i+1];}},_arcTo:function(_e3,_e4,_e5){var _e6=_e4=="a";for(var i=0;i<_e5.length;i+=7){var x1=_e5[i+5],y1=_e5[i+6];if(_e6){x1+=this.last.x;y1+=this.last.y;}var _e7=ga.arcAsBezier(this.last,_e5[i],_e5[i+1],_e5[i+2],_e5[i+3]?1:0,_e5[i+4]?1:0,x1,y1);arr.forEach(_e7,function(p){_e3.push("bezierCurveTo",p);});this.last.x=x1;this.last.y=y1;}this.lastControl={};},_closePath:function(_e8,_e9,_ea){_e8.push("closePath",[]);this.lastControl={};}});arr.forEach(["moveTo","lineTo","hLineTo","vLineTo","curveTo","smoothCurveTo","qCurveTo","qSmoothCurveTo","arcTo","closePath"],function(_eb){_a5(_9d.Path,_eb);});_98("dojox.gfx.canvas.TextPath",[_9d.Shape,_9b.TextPath],{_renderShape:function(ctx){var s=this.shape;},_setText:function(){},_setFont:function(){}});_98("dojox.gfx.canvas.Surface",gs.Surface,{constructor:function(){gs.Container._init.call(this);this.pendingImageCount=0;this.makeDirty();},setDimensions:function(_ec,_ed){this.width=g.normalizedLength(_ec);this.height=g.normalizedLength(_ed);if(!this.rawNode){return this;}var _ee=false;if(this.rawNode.width!=this.width){this.rawNode.width=this.width;_ee=true;}if(this.rawNode.height!=this.height){this.rawNode.height=this.height;_ee=true;}if(_ee){this.makeDirty();}return this;},getDimensions:function(){return this.rawNode?{width:this.rawNode.width,height:this.rawNode.height}:null;},_render:function(){if(this.pendingImageCount){return;}var ctx=this.rawNode.getContext("2d");ctx.save();ctx.clearRect(0,0,this.rawNode.width,this.rawNode.height);for(var i=0;i<this.children.length;++i){this.children[i]._render(ctx);}ctx.restore();if("pendingRender" in this){clearTimeout(this.pendingRender);delete this.pendingRender;}},makeDirty:function(){if(!this.pendingImagesCount&&!("pendingRender" in this)){this.pendingRender=setTimeout(_97.hitch(this,this._render),0);}},downloadImage:function(img,url){var _ef=_97.hitch(this,this.onImageLoad);if(!this.pendingImageCount++&&"pendingRender" in this){clearTimeout(this.pendingRender);delete this.pendingRender;}img.onload=_ef;img.onerror=_ef;img.onabort=_ef;img.src=url;},onImageLoad:function(){if(!--this.pendingImageCount){this._render();}},getEventSource:function(){return null;},connect:function(){},disconnect:function(){}});_9d.createSurface=function(_f0,_f1,_f2){if(!_f1&&!_f2){var pos=_99.position(_f0);_f1=_f1||pos.w;_f2=_f2||pos.h;}if(typeof _f1=="number"){_f1=_f1+"px";}if(typeof _f2=="number"){_f2=_f2+"px";}var s=new _9d.Surface(),p=dom.byId(_f0),c=p.ownerDocument.createElement("canvas");c.width=g.normalizedLength(_f1);c.height=g.normalizedLength(_f2);p.appendChild(c);s.rawNode=c;s._parent=p;s.surface=s;return s;};var C=gs.Container,_f3={add:function(_f4){this.surface.makeDirty();return C.add.apply(this,arguments);},remove:function(_f5,_f6){this.surface.makeDirty();return C.remove.apply(this,arguments);},clear:function(){this.surface.makeDirty();return C.clear.apply(this,arguments);},_moveChildToFront:function(_f7){this.surface.makeDirty();return C._moveChildToFront.apply(this,arguments);},_moveChildToBack:function(_f8){this.surface.makeDirty();return C._moveChildToBack.apply(this,arguments);}};var _f9={createObject:function(_fa,_fb){var _fc=new _fa();_fc.surface=this.surface;_fc.setShape(_fb);this.add(_fc);return _fc;}};_a1(_9d.Group,_f3);_a1(_9d.Group,gs.Creator);_a1(_9d.Group,_f9);_a1(_9d.Surface,_f3);_a1(_9d.Surface,gs.Creator);_a1(_9d.Surface,_f9);_9d.fixTarget=function(_fd,_fe){return true;};return _9d;});