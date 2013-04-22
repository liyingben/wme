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
define(["dijit","dojo","dojox","dojo/require!dojox/gfx/_base,esri/WKIDUnitConversion,esri/geometry/utils"],function(_1,_2,_3){_2.provide("esri.geometry");_2.require("dojox.gfx._base");_2.require("esri.WKIDUnitConversion");_2.require("esri.geometry.utils");esri.Units={CENTIMETERS:"esriCentimeters",DECIMAL_DEGREES:"esriDecimalDegrees",DEGREE_MINUTE_SECONDS:"esriDegreeMinuteSeconds",DECIMETERS:"esriDecimeters",FEET:"esriFeet",INCHES:"esriInches",KILOMETERS:"esriKilometers",METERS:"esriMeters",MILES:"esriMiles",MILLIMETERS:"esriMillimeters",NAUTICAL_MILES:"esriNauticalMiles",POINTS:"esriPoints",UNKNOWN:"esriUnknownUnits",YARDS:"esriYards",ACRES:"esriAcres",ARES:"esriAres",SQUARE_KILOMETERS:"esriSquareKilometers",SQUARE_MILES:"esriSquareMiles",SQUARE_FEET:"esriSquareFeet",SQUARE_METERS:"esriSquareMeters",HECTARES:"esriHectares",SQUARE_YARDS:"esriSquareYards",SQUARE_INCHES:"esriSquareInches",SQUARE_MILLIMETERS:"esriSquareMillimeters",SQUARE_CENTIMETERS:"esriSquareCentimeters",SQUARE_DECIMETERS:"esriSquareDecimeters"};(function(){var _4="PROJCS[\"WGS_1984_Web_Mercator_Auxiliary_Sphere\",GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Mercator_Auxiliary_Sphere\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",${Central_Meridian}],PARAMETER[\"Standard_Parallel_1\",0.0],PARAMETER[\"Auxiliary_Sphere_Type\",0.0],UNIT[\"Meter\",1.0]]";var _5=[-20037508.342788905,20037508.342788905];var _6=[-20037508.342787,20037508.342787];_2.declare("esri.SpatialReference",null,{constructor:function(_7){if(_7){if(_2.isObject(_7)){_2.mixin(this,_7);}else{if(_2.isString(_7)){this.wkt=_7;}else{this.wkid=_7;}}}},wkid:null,wkt:null,_info:{"102113":{wkTemplate:"PROJCS[\"WGS_1984_Web_Mercator\",GEOGCS[\"GCS_WGS_1984_Major_Auxiliary_Sphere\",DATUM[\"D_WGS_1984_Major_Auxiliary_Sphere\",SPHEROID[\"WGS_1984_Major_Auxiliary_Sphere\",6378137.0,0.0]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Mercator\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",${Central_Meridian}],PARAMETER[\"Standard_Parallel_1\",0.0],UNIT[\"Meter\",1.0]]",valid:_5,origin:_6,dx:0.00001},"102100":{wkTemplate:_4,valid:_5,origin:_6,dx:0.00001},"3857":{wkTemplate:_4,valid:_5,origin:_6,dx:0.00001},"4326":{wkTemplate:"GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",${Central_Meridian}],UNIT[\"Degree\",0.0174532925199433]]",altTemplate:"PROJCS[\"WGS_1984_Plate_Carree\",GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Plate_Carree\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",${Central_Meridian}],UNIT[\"Degrees\",111319.491]]",valid:[-180,180],origin:[-180,180],dx:0.00001}},_isWebMercator:function(){return _2.indexOf([102113,102100,3857,3785],this.wkid)!==-1;},_isWrappable:function(){return _2.indexOf([102113,102100,3857,3785,4326],this.wkid)!==-1;},_getInfo:function(){return this.wkid?this._info[this.wkid]:null;},toJson:function(){if(this.wkid!==null){return {wkid:this.wkid};}else{if(this.wkt!==null){return {wkt:this.wkt};}}return null;}});}());_2.mixin(esri.geometry,(function(){var _8=6378137,PI=3.141592653589793,_9=57.29577951308232,_a=0.017453292519943,_b=Math.floor,_c=Math.log,_d=Math.sin,_e=Math.exp,_f=Math.atan;function _10(rad){return rad*_9;};function _11(deg){return deg*_a;};function _12(lng,lat){var _13=_11(lat);return [_11(lng)*_8,_8/2*_c((1+_d(_13))/(1-_d(_13)))];};function _14(x,y,_15){var _16=_10(x/_8);if(_15){return [_16,_10((PI/2)-(2*_f(_e(-1*y/_8))))];}return [_16-(_b((_16+180)/360)*360),_10((PI/2)-(2*_f(_e(-1*y/_8))))];};function _17(_18,_19,sr,_1a){if(_18 instanceof esri.geometry.Point){var pt=_19(_18.x,_18.y,_1a);return new esri.geometry.Point(pt[0],pt[1],new esri.SpatialReference(sr));}else{if(_18 instanceof esri.geometry.Extent){var min=_19(_18.xmin,_18.ymin,_1a),max=_19(_18.xmax,_18.ymax,_1a);return new esri.geometry.Extent(min[0],min[1],max[0],max[1],new esri.SpatialReference(sr));}else{if(_18 instanceof esri.geometry.Polyline||_18 instanceof esri.geometry.Polygon){var _1b=_18 instanceof esri.geometry.Polyline,_1c=_1b?_18.paths:_18.rings,_1d=[],_1e;_2.forEach(_1c,function(_1f){_1d.push(_1e=[]);_2.forEach(_1f,function(iPt){_1e.push(_19(iPt[0],iPt[1],_1a));});});if(_1b){return new esri.geometry.Polyline({paths:_1d,spatialReference:sr});}else{return new esri.geometry.Polygon({rings:_1d,spatialReference:sr});}}else{if(_18 instanceof esri.geometry.Multipoint){var _20=[];_2.forEach(_18.points,function(iPt){_20.push(_19(iPt[0],iPt[1],_1a));});return new esri.geometry.Multipoint({points:_20,spatialReference:sr});}}}}};var _21=39.37,_22=20015077/180,ecd=esri.config.defaults,_23=esri.WKIDUnitConversion;return {geographicToWebMercator:function(_24){return _17(_24,_12,{wkid:102100});},webMercatorToGeographic:function(_25,_26){return _17(_25,_14,{wkid:4326},_26);},getScale:function(map){var _27,_28,_29,wkt;if(arguments.length>1){_27=arguments[0];_28=arguments[1];_29=arguments[2];}else{_27=map.extent;_28=map.width;var sr=map.spatialReference;if(sr){_29=sr.wkid;wkt=sr.wkt;}}var _2a;if(_29){_2a=_23.values[_23[_29]];}else{if(wkt&&(wkt.search(/^PROJCS/i)!==-1)){var _2b=/UNIT\[([^\]]+)\]\]$/i.exec(wkt);if(_2b&&_2b[1]){_2a=parseFloat(_2b[1].split(",")[1]);}}}return esri.geometry._getScale(_27,_28,_2a);},_getScale:function(_2c,_2d,_2e){return (_2c.getWidth()/_2d)*(_2e||_22)*_21*ecd.screenDPI;},getExtentForScale:function(map,_2f){var _30,wkt,sr=map.spatialReference;if(sr){_30=sr.wkid;wkt=sr.wkt;}var _31;if(_30){_31=_23.values[_23[_30]];}else{if(wkt&&(wkt.search(/^PROJCS/i)!==-1)){var _32=/UNIT\[([^\]]+)\]\]$/i.exec(wkt);if(_32&&_32[1]){_31=parseFloat(_32[1].split(",")[1]);}}}return esri.geometry._getExtentForScale(map.extent,map.width,_31,_2f,true);},_getExtentForScale:function(_33,_34,_35,_36,_37){var _38;if(_37){_38=_35;}else{_38=_23.values[_23[_35]];}return _33.expand(((_36*_34)/((_38||_22)*_21*ecd.screenDPI))/_33.getWidth());}};}()),{defaultPoint:{type:"point",x:0,y:0},defaultMultipoint:{type:"multipoint",points:null},defaultExtent:{type:"extent",xmin:0,ymin:0,xmax:0,ymax:0},defaultPolyline:{type:"polyline",paths:null},defaultPolygon:{type:"polygon",rings:null},_rectToExtent:function(_39){return new esri.geometry.Extent(parseFloat(_39.x),parseFloat(_39.y)-parseFloat(_39.height),parseFloat(_39.x)+parseFloat(_39.width),parseFloat(_39.y),_39.spatialReference);},_extentToRect:function(_3a){return new esri.geometry.Rect(_3a.xmin,_3a.ymax,_3a.getWidth(),_3a.getHeight(),_3a.spatialReference);},fromJson:function(_3b){if(_3b.x!==undefined&&_3b.y!==undefined){return new esri.geometry.Point(_3b);}else{if(_3b.paths!==undefined){return new esri.geometry.Polyline(_3b);}else{if(_3b.rings!==undefined){return new esri.geometry.Polygon(_3b);}else{if(_3b.points!==undefined){return new esri.geometry.Multipoint(_3b);}else{if(_3b.xmin!==undefined&&_3b.ymin!==undefined&&_3b.xmax!==undefined&&_3b.ymax!==undefined){return new esri.geometry.Extent(_3b);}}}}}},getJsonType:function(_3c){if(_3c instanceof esri.geometry.Point){return "esriGeometryPoint";}else{if(_3c instanceof esri.geometry.Polyline){return "esriGeometryPolyline";}else{if(_3c instanceof esri.geometry.Polygon){return "esriGeometryPolygon";}else{if(_3c instanceof esri.geometry.Extent){return "esriGeometryEnvelope";}else{if(_3c instanceof esri.geometry.Multipoint){return "esriGeometryMultipoint";}}}}}return null;},getGeometryType:function(_3d){if(_3d==="esriGeometryPoint"){return esri.geometry.Point;}else{if(_3d==="esriGeometryPolyline"){return esri.geometry.Polyline;}else{if(_3d==="esriGeometryPolygon"){return esri.geometry.Polygon;}else{if(_3d==="esriGeometryEnvelope"){return esri.geometry.Extent;}else{if(_3d==="esriGeometryMultipoint"){return esri.geometry.Multipoint;}}}}}return null;},isClockwise:function(arr){var _3e=0,i,il=arr.length,_3f=_2.isArray(arr[0])?function(p1,p2){return p1[0]*p2[1]-p2[0]*p1[1];}:function(p1,p2){return p1.x*p2.y-p2.x*p1.y;};for(i=0;i<il;i++){_3e+=_3f(arr[i],arr[(i+1)%il]);}return (_3e/2)<=0;},toScreenPoint:function(ext,wd,ht,pt,_40){if(_40){return new esri.geometry.Point((pt.x-ext.xmin)*(wd/ext.getWidth()),(ext.ymax-pt.y)*(ht/ext.getHeight()));}else{return new esri.geometry.Point(Math.round((pt.x-ext.xmin)*(wd/ext.getWidth())),Math.round((ext.ymax-pt.y)*(ht/ext.getHeight())));}},toScreenGeometry:function(ext,wd,ht,g){var x=ext.xmin,y=ext.ymax,rwd=wd/ext.getWidth(),rht=ht/ext.getHeight(),_41=_2.forEach,_42=Math.round;if(g instanceof esri.geometry.Point){return new esri.geometry.Point(_42((g.x-x)*rwd),_42((y-g.y)*rht));}else{if(g instanceof esri.geometry.Multipoint){var mp=new esri.geometry.Multipoint(),mpp=mp.points;_41(g.points,function(pt,i){mpp[i]=[_42((pt[0]-x)*rwd),_42((y-pt[1])*rht)];});return mp;}else{if(g instanceof esri.geometry.Extent){return new esri.geometry.Extent(_42((g.xmin-x)*rwd),_42((y-g.ymin)*rht),_42((g.xmax-x)*rwd),_42((y-g.ymax)*rwd));}else{if(g instanceof esri.geometry.Polyline){var _43=new esri.geometry.Polyline(),_44=_43.paths,_45;_41(g.paths,function(_46,i){_45=(_44[i]=[]);_41(_46,function(pt,j){_45[j]=[_42((pt[0]-x)*rwd),_42((y-pt[1])*rht)];});});return _43;}else{if(g instanceof esri.geometry.Polygon){var _47=new esri.geometry.Polygon(),_48=_47.rings,_49;_41(g.rings,function(_4a,i){_49=(_48[i]=[]);_41(_4a,function(pt,j){_49[j]=[_42((pt[0]-x)*rwd),_42((y-pt[1])*rht)];});});return _47;}}}}}},_toScreenPath:(function(){var _4b=(function(){if(_2.isIE<9){return function(x,y,rwd,rht,dx,dy,_4c){var _4d=[],_4e=Math.round,p,pl=_4c.length,_4f,_50,_51,pt,x1,y1,x2,y2;for(p=0;p<pl;p++){_4f=_4c[p];pt=_4f[0];if((_51=_4f.length)>1){pt=_4f[0];x1=_4e(((pt[0]-x)*rwd)+dx);y1=_4e(((y-pt[1])*rht)+dy);x2=_4e(((_4f[1][0]-x)*rwd)+dx);y2=_4e(((y-_4f[1][1])*rht)+dy);_4d.push("M",x1+","+y1,"L",x2+","+y2);for(_50=2;_50<_51;_50++){pt=_4f[_50];x1=_4e(((pt[0]-x)*rwd)+dx);y1=_4e(((y-pt[1])*rht)+dy);_4d.push(x1+","+y1);}}else{x1=_4e(((pt[0]-x)*rwd)+dx);y1=_4e(((y-pt[1])*rht)+dy);_4d.push("M",x1+","+y1);}}return _4d;};}else{return function(x,y,rwd,rht,dx,dy,_52){var _53=[],i,j,il,jl,_54,pt,_55=Math.round;for(i=0,il=_52?_52.length:0;i<il;i++){_54=_52[i];_53.push("M");for(j=0,jl=_54?_54.length:0;j<jl;j++){pt=_54[j];_53.push(_55(((pt[0]-x)*rwd)+dx)+","+_55(((y-pt[1])*rht)+dy));}}return _53;};}}());return function(ext,wd,ht,g,dx,dy){var _56=g instanceof esri.geometry.Polyline;return _4b(ext.xmin,ext.ymax,wd/ext.getWidth(),ht/ext.getHeight(),dx,dy,_56?g.paths:g.rings);};}()),toMapPoint:function(ext,wd,ht,pt){return new esri.geometry.Point(ext.xmin+(pt.x/(wd/ext.getWidth())),ext.ymax-(pt.y/(ht/ext.getHeight())),ext.spatialReference);},toMapGeometry:function(ext,wd,ht,g){var x=ext.xmin,y=ext.ymax,sr=ext.spatialReference,rwd=wd/ext.getWidth(),rht=ht/ext.getHeight(),_57=_2.forEach;if(g instanceof esri.geometry.Point){return new esri.geometry.Point(x+(g.x/rwd),y-(g.y/rht),sr);}else{if(g instanceof esri.geometry.Multipoint){var mp=new esri.geometry.Multipoint(sr),mpp=mp.points;_57(g.points,function(pt,i){mpp[i]=[x+(pt[0]/rwd),y-(pt[1]/rht)];});return mp;}else{if(g instanceof esri.geometry.Extent){return new esri.geometry.Extent(x+(g.xmin/rwd),y-(g.ymin/rht),x+(g.xmax/rwd),y-(g.ymax/rht),sr);}else{if(g instanceof esri.geometry.Polyline){var _58=new esri.geometry.Polyline(sr),_59=_58.paths,_5a;_57(g.paths,function(_5b,i){_5a=(_59[i]=[]);_57(_5b,function(pt,j){_5a[j]=[x+(pt[0]/rwd),y-(pt[1]/rht)];});});return _58;}else{if(g instanceof esri.geometry.Polygon){var _5c=new esri.geometry.Polygon(sr),_5d=_5c.rings,_5e;_57(g.rings,function(_5f,i){_5e=(_5d[i]=[]);_57(_5f,function(pt,j){_5e[j]=[x+(pt[0]/rwd),y-(pt[1]/rht)];});});return _5c;}}}}}},getLength:function(pt1,pt2){var dx=pt2.x-pt1.x,dy=pt2.y-pt1.y;return Math.sqrt(dx*dx+dy*dy);},_getLength:function(pt1,pt2){var dx=pt2[0]-pt1[0],dy=pt2[1]-pt1[1];return Math.sqrt(dx*dx+dy*dy);},getMidpoint:function(pt0,pt1){return esri.geometry.getPointOnLine(pt0,pt1,0.5);},getPointOnLine:function(pt0,pt1,_60){if(pt0 instanceof esri.geometry.Point){return new esri.geometry.Point(pt0.x+_60*(pt1.x-pt0.x),pt0.y+_60*(pt1.y-pt0.y));}else{return [pt0[0]+_60*(pt1[0]-pt0[0]),pt0[1]+_60*(pt1[1]-pt0[1])];}},_equals:function(n1,n2){return Math.abs(n1-n2)<1e-8;},getLineIntersection:function(_61,_62,_63,_64){var pt=esri.geometry._getLineIntersection([_61.x,_61.y],[_62.x,_62.y],[_63.x,_63.y],[_64.x,_64.y]);if(pt){pt=new esri.geometry.Point(pt[0],pt[1]);}return pt;},_getLineIntersection:function(p0,p1,p2,p3){var _65=10000000000,x,y,a0=esri.geometry._equals(p0[0],p1[0])?_65:(p0[1]-p1[1])/(p0[0]-p1[0]),a1=esri.geometry._equals(p2[0],p3[0])?_65:(p2[1]-p3[1])/(p2[0]-p3[0]),b0=p0[1]-a0*p0[0],b1=p2[1]-a1*p2[0];if(esri.geometry._equals(a0,a1)){if(!esri.geometry._equals(b0,b1)){return null;}else{if(esri.geometry._equals(p0[0],p1[0])){if(Math.min(p0[1],p1[1])<Math.max(p2[1],p3[1])||Math.max(p0[1],p1[1])>Math.min(p2[1],p3[1])){y=(p0[1]+p1[1]+p2[1]+p3[1]-Math.min(p0[1],p1[1],p2[1],p3[1])-Math.max(p0[1],p1[1],p2[1],p3[1]))/2;x=(y-b0)/a0;}else{return null;}}else{if(Math.min(p0[0],p1[0])<Math.max(p2[0],p3[0])||Math.max(p0[0],p1[0])>Math.min(p2[0],p3[0])){x=(p0[0]+p1[0]+p2[0]+p3[0]-Math.min(p0[0],p1[0],p2[0],p3[0])-Math.max(p0[0],p1[0],p2[0],p3[0]))/2;y=a0*x+b0;}else{return null;}}return [x,y];}}if(esri.geometry._equals(a0,_65)){x=p0[0];y=a1*x+b1;}else{if(esri.geometry._equals(a1,_65)){x=p2[0];y=a0*x+b0;}else{x=-(b0-b1)/(a0-a1);y=a0*x+b0;}}return [x,y];},_getLineIntersection2:function(_66,_67){var p1=_66[0],p2=_66[1],p3=_67[0],p4=_67[1],x1=p1[0],y1=p1[1],x2=p2[0],y2=p2[1],x3=p3[0],y3=p3[1],x4=p4[0],y4=p4[1],x43=x4-x3,x13=x1-x3,x21=x2-x1,y43=y4-y3,y13=y1-y3,y21=y2-y1,_68=(y43*x21)-(x43*y21),ua,ub,px,py;if(_68===0){return false;}ua=((x43*y13)-(y43*x13))/_68;ub=((x21*y13)-(y21*x13))/_68;if(ua>=0&&ua<=1&&ub>=0&&ub<=1){px=x1+(ua*(x2-x1));py=y1+(ua*(y2-y1));return [px,py];}else{return false;}},_pointLineDistance:function(_69,_6a){var p1=_6a[0],p2=_6a[1],x1=p1[0],y1=p1[1],x2=p2[0],y2=p2[1],x3=_69[0],y3=_69[1],x21=x2-x1,y21=y2-y1,x31=x3-x1,y31=y3-y1,_6b=Math.sqrt,pow=Math.pow,mag=_6b(pow(x21,2)+pow(y21,2)),u=((x31*x21)+(y31*y21))/(mag*mag),x=x1+u*x21,y=y1+u*y21;return _6b(pow(x3-x,2)+pow(y3-y,2));}});_2.declare("esri.geometry.Geometry",null,{spatialReference:null,type:null,setSpatialReference:function(sr){this.spatialReference=sr;return this;},getExtent:function(){return null;}});_2.declare("esri.geometry.Point",esri.geometry.Geometry,{constructor:function(x,y,_6c){_2.mixin(this,esri.geometry.defaultPoint);if(_2.isArray(x)){this.x=x[0];this.y=x[1];this.spatialReference=y;}else{if(_2.isObject(x)){_2.mixin(this,x);if(this.spatialReference){this.spatialReference=new esri.SpatialReference(this.spatialReference);}}else{this.x=x;this.y=y;this.spatialReference=_6c;}}},offset:function(x,y){return new esri.geometry.Point(this.x+x,this.y+y,this.spatialReference);},setX:function(x){this.x=x;return this;},setY:function(y){this.y=y;return this;},update:function(x,y){this.x=x;this.y=y;return this;},normalize:function(){var x=this.x,sr=this.spatialReference;if(sr){var _6d=sr._getInfo();if(_6d){var _6e=_6d.valid[0],_6f=_6d.valid[1],_70=2*_6f,_71;if(x>_6f){_71=Math.ceil(Math.abs(x-_6f)/_70);x-=(_71*_70);}else{if(x<_6e){_71=Math.ceil(Math.abs(x-_6e)/_70);x+=(_71*_70);}}}}return new esri.geometry.Point(x,this.y,sr);},toJson:function(){var _72={x:this.x,y:this.y},sr=this.spatialReference;if(sr){_72.spatialReference=sr.toJson();}return _72;}});_2.declare("esri.geometry.Polyline",esri.geometry.Geometry,{constructor:function(obj){_2.mixin(this,esri.geometry.defaultPolyline);this.paths=[];this._path=0;if(obj){if(obj.paths){_2.mixin(this,obj);}else{this.spatialReference=obj;}this.spatialReference=new esri.SpatialReference(this.spatialReference);}},_extent:null,addPath:function(_73){this._extent=null;this._path=this.paths.length;this.paths[this._path]=[];if(_2.isArray(_73[0])){_2.forEach(_73,this._addPointArr,this);}else{_2.forEach(_73,this._addPoint,this);}return this;},_addPointArr:function(_74){this.paths[this._path].push(_74);},_addPoint:function(_75){this.paths[this._path].push([_75.x,_75.y]);},_insertPoints:function(_76,_77){this._extent=null;this._path=_77;if(!this.paths[this._path]){this.paths[this._path]=[];}_2.forEach(_76,this._addPoint,this);},_validateInputs:function(_78,_79){if((_78!==null&&_78!==undefined)&&(_78<0||_78>=this.paths.length)){return false;}if((_79!==null&&_78!==undefined)&&(_79<0||_79>=this.paths[_78].length)){return false;}return true;},getPoint:function(_7a,_7b){if(this._validateInputs(_7a,_7b)){return new esri.geometry.Point(this.paths[_7a][_7b],this.spatialReference);}},setPoint:function(_7c,_7d,_7e){if(this._validateInputs(_7c,_7d)){this._extent=null;this.paths[_7c][_7d]=[_7e.x,_7e.y];return this;}},insertPoint:function(_7f,_80,_81){if(this._validateInputs(_7f)&&esri._isDefined(_80)&&(_80>=0&&_80<=this.paths[_7f].length)){this._extent=null;this.paths[_7f].splice(_80,0,[_81.x,_81.y]);return this;}},removePath:function(_82){if(this._validateInputs(_82,null)){this._extent=null;var arr=this.paths.splice(_82,1)[0],i,il=arr.length,_83=esri.geometry.Point,sr=this.spatialReference;for(i=0;i<il;i++){arr[i]=new _83(arr[i],sr);}return arr;}},removePoint:function(_84,_85){if(this._validateInputs(_84,_85)){this._extent=null;return new esri.geometry.Point(this.paths[_84].splice(_85,1)[0],this.spatialReference);}},getExtent:function(){var _86;if(this._extent){_86=new esri.geometry.Extent(this._extent);_86._partwise=this._partwise;return _86;}var _87=this.paths,pal=_87.length;if(!pal||!_87[0].length){return;}var _88,_89,x,y,_8a,_8b,pa,pt,ptl,_8c=(_8a=_87[0][0][0]),_8d=(_8b=_87[0][0][1]),min=Math.min,max=Math.max,sr=this.spatialReference,_8e=[],_8f,_90,_91,_92;for(pa=0;pa<pal;pa++){_88=_87[pa];_8f=(_90=_88[0]&&_88[0][0]);_91=(_92=_88[0]&&_88[0][1]);ptl=_88.length;for(pt=0;pt<ptl;pt++){_89=_88[pt];x=_89[0];y=_89[1];_8c=min(_8c,x);_8d=min(_8d,y);_8a=max(_8a,x);_8b=max(_8b,y);_8f=min(_8f,x);_91=min(_91,y);_90=max(_90,x);_92=max(_92,y);}_8e.push(new esri.geometry.Extent({xmin:_8f,ymin:_91,xmax:_90,ymax:_92,spatialReference:(sr?sr.toJson():null)}));}this._extent={xmin:_8c,ymin:_8d,xmax:_8a,ymax:_8b,spatialReference:sr?sr.toJson():null};this._partwise=_8e.length>1?_8e:null;_86=new esri.geometry.Extent(this._extent);_86._partwise=this._partwise;return _86;},toJson:function(){var _93={paths:_2.clone(this.paths)},sr=this.spatialReference;if(sr){_93.spatialReference=sr.toJson();}return _93;}});_2.declare("esri.geometry.Polygon",esri.geometry.Geometry,{constructor:function(obj){_2.mixin(this,esri.geometry.defaultPolygon);this.rings=[];this._ring=0;if(obj){if(obj.rings){_2.mixin(this,obj);}else{this.spatialReference=obj;}this.spatialReference=new esri.SpatialReference(this.spatialReference);}},_extent:null,addRing:function(_94){this._extent=null;this._ring=this.rings.length;this.rings[this._ring]=[];if(_2.isArray(_94[0])){_2.forEach(_94,this._addPointArr,this);}else{_2.forEach(_94,this._addPoint,this);}return this;},_addPointArr:function(_95){this.rings[this._ring].push(_95);},_addPoint:function(_96){this.rings[this._ring].push([_96.x,_96.y]);},_insertPoints:function(_97,_98){this._extent=null;this._ring=_98;if(!this.rings[this._ring]){this.rings[this._ring]=[];}_2.forEach(_97,this._addPoint,this);},_validateInputs:function(_99,_9a){if((_99!==null&&_99!==undefined)&&(_99<0||_99>=this.rings.length)){return false;}if((_9a!==null&&_99!==undefined)&&(_9a<0||_9a>=this.rings[_99].length)){return false;}return true;},getPoint:function(_9b,_9c){if(this._validateInputs(_9b,_9c)){return new esri.geometry.Point(this.rings[_9b][_9c],this.spatialReference);}},setPoint:function(_9d,_9e,_9f){if(this._validateInputs(_9d,_9e)){this._extent=null;this.rings[_9d][_9e]=[_9f.x,_9f.y];return this;}},insertPoint:function(_a0,_a1,_a2){if(this._validateInputs(_a0)&&esri._isDefined(_a1)&&(_a1>=0&&_a1<=this.rings[_a0].length)){this._extent=null;this.rings[_a0].splice(_a1,0,[_a2.x,_a2.y]);return this;}},removeRing:function(_a3){if(this._validateInputs(_a3,null)){this._extent=null;var arr=this.rings.splice(_a3,1)[0],i,il=arr.length,_a4=esri.geometry.Point,sr=this.spatialReference;for(i=0;i<il;i++){arr[i]=new _a4(arr[i],sr);}return arr;}},removePoint:function(_a5,_a6){if(this._validateInputs(_a5,_a6)){this._extent=null;return new esri.geometry.Point(this.rings[_a5].splice(_a6,1)[0],this.spatialReference);}},getExtent:function(){var _a7;if(this._extent){_a7=new esri.geometry.Extent(this._extent);_a7._partwise=this._partwise;return _a7;}var _a8=this.rings,pal=_a8.length;if(!pal||!_a8[0].length){return;}var _a9,_aa,x,y,_ab,_ac,pa,pt,ptl,_ad=(_ab=_a8[0][0][0]),_ae=(_ac=_a8[0][0][1]),min=Math.min,max=Math.max,sr=this.spatialReference,_af=[],_b0,_b1,_b2,_b3;for(pa=0;pa<pal;pa++){_a9=_a8[pa];_b0=(_b1=_a9[0]&&_a9[0][0]);_b2=(_b3=_a9[0]&&_a9[0][1]);ptl=_a9.length;for(pt=0;pt<ptl;pt++){_aa=_a9[pt];x=_aa[0];y=_aa[1];_ad=min(_ad,x);_ae=min(_ae,y);_ab=max(_ab,x);_ac=max(_ac,y);_b0=min(_b0,x);_b2=min(_b2,y);_b1=max(_b1,x);_b3=max(_b3,y);}_af.push(new esri.geometry.Extent({xmin:_b0,ymin:_b2,xmax:_b1,ymax:_b3,spatialReference:(sr?sr.toJson():null)}));}this._extent={xmin:_ad,ymin:_ae,xmax:_ab,ymax:_ac,spatialReference:(sr?sr.toJson():null)};this._partwise=_af.length>1?_af:null;_a7=new esri.geometry.Extent(this._extent);_a7._partwise=this._partwise;return _a7;},contains:function(_b4){var _b5=this.rings,_b6,_b7=false,pi,pj,_b8,j,i,pa,pal=_b5.length;for(pa=0;pa<pal;pa++){_b6=_b5[pa];_b8=_b6.length;j=0;for(i=0;i<_b8;i++){j++;if(j===_b8){j=0;}pi=_b6[i];pj=_b6[j];if((pi[1]<_b4.y&&pj[1]>=_b4.y||pj[1]<_b4.y&&pi[1]>=_b4.y)&&(pi[0]+(_b4.y-pi[1])/(pj[1]-pi[1])*(pj[0]-pi[0])<_b4.x)){_b7=!_b7;}}}return _b7;},toJson:function(){var _b9={rings:_2.clone(this.rings)},sr=this.spatialReference;if(sr){_b9.spatialReference=sr.toJson();}return _b9;}});_2.declare("esri.geometry.Multipoint",esri.geometry.Geometry,{constructor:function(obj){_2.mixin(this,esri.geometry.defaultMultipoint);this.points=[];if(obj){if(obj.points){_2.mixin(this,obj);}else{this.spatialReference=obj;}this.spatialReference=new esri.SpatialReference(this.spatialReference);}},_extent:null,addPoint:function(_ba){this._extent=null;if(_2.isArray(_ba)){this.points.push(_ba);}else{this.points.push([_ba.x,_ba.y]);}return this;},removePoint:function(_bb){if(this._validateInputs(_bb)){this._extent=null;return new esri.geometry.Point(this.points.splice(_bb,1)[0],this.spatialReference);}},getExtent:function(){if(this._extent){return new esri.geometry.Extent(this._extent);}var _bc=this.points,il=_bc.length;if(!il){return;}var _bd=_bc[0],_be,_bf,_c0=(_be=_bd[0]),_c1=(_bf=_bd[1]),min=Math.min,max=Math.max,sr=this.spatialReference,x,y,i;for(i=0;i<il;i++){_bd=_bc[i];x=_bd[0];y=_bd[1];_c0=min(_c0,x);_c1=min(_c1,y);_be=max(_be,x);_bf=max(_bf,y);}this._extent={xmin:_c0,ymin:_c1,xmax:_be,ymax:_bf,spatialReference:sr?sr.toJson():null};return new esri.geometry.Extent(this._extent);},_validateInputs:function(_c2){if(_c2===null||_c2<0||_c2>=this.points.length){return false;}return true;},getPoint:function(_c3){if(this._validateInputs(_c3)){var _c4=this.points[_c3];return new esri.geometry.Point(_c4[0],_c4[1],this.spatialReference);}},setPoint:function(_c5,_c6){if(this._validateInputs(_c5)){this._extent=null;this.points[_c5]=[_c6.x,_c6.y];return this;}},toJson:function(){var _c7={points:_2.clone(this.points)},sr=this.spatialReference;if(sr){_c7.spatialReference=sr.toJson();}return _c7;}});_2.declare("esri.geometry.Extent",esri.geometry.Geometry,{constructor:function(_c8,_c9,_ca,_cb,_cc){_2.mixin(this,esri.geometry.defaultExtent);if(_2.isObject(_c8)){_2.mixin(this,_c8);this.spatialReference=new esri.SpatialReference(this.spatialReference);}else{this.update(_c8,_c9,_ca,_cb,_cc);}},getWidth:function(){return Math.abs(this.xmax-this.xmin);},getHeight:function(){return Math.abs(this.ymax-this.ymin);},getCenter:function(){return new esri.geometry.Point((this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2,this.spatialReference);},centerAt:function(_cd){var _ce=this.getCenter(),dx=_cd.x-_ce.x,dy=_cd.y-_ce.y;return new esri.geometry.Extent(this.xmin+dx,this.ymin+dy,this.xmax+dx,this.ymax+dy,this.spatialReference);},update:function(_cf,_d0,_d1,_d2,_d3){this.xmin=_cf;this.ymin=_d0;this.xmax=_d1;this.ymax=_d2;this.spatialReference=_d3;return this;},offset:function(ox,oy){return new esri.geometry.Extent(this.xmin+ox,this.ymin+oy,this.xmax+ox,this.ymax+oy,this.spatialReference);},expand:function(_d4){var _d5=(1-_d4)/2,_d6=this.getWidth()*_d5,_d7=this.getHeight()*_d5;return new esri.geometry.Extent(this.xmin+_d6,this.ymin+_d7,this.xmax-_d6,this.ymax-_d7,this.spatialReference);},intersects:function(_d8){var _d9=_d8.type;switch(_d9){case "point":return this.contains(_d8);case "multipoint":return this._intersectsMultipoint(_d8);case "extent":return this._intersectsExtent(_d8);case "polygon":return this._intersectsPolygon(_d8);case "polyline":return this._intersectsPolyline(_d8);}},_intersectsMultipoint:function(_da){var len=_da.points.length,i;for(i=0;i<len;i++){if(this.contains(_da.getPoint(i))){return true;}}return false;},_intersectsExtent:function(_db){var _dc,_dd,_de,_df,_e0=false;if(this.xmin<=_db.xmin){_dc=_db.xmin;if(this.xmax<_dc){_e0=true;}else{_de=Math.min(this.xmax,_db.xmax)-_dc;}}else{_dc=this.xmin;if(_db.xmax<_dc){_e0=true;}else{_de=Math.min(this.xmax,_db.xmax)-_dc;}}if(this.ymin<=_db.ymin){_dd=_db.ymin;if(this.ymax<_dd){_e0=true;}else{_df=Math.min(this.ymax,_db.ymax)-_dd;}}else{_dd=this.ymin;if(_db.ymax<_dd){_e0=true;}else{_df=Math.min(this.ymax,_db.ymax)-_dd;}}if(_e0){return null;}return new esri.geometry.Extent(_dc,_dd,_dc+_de,_dd+_df,this.spatialReference);},_intersectsPolygon:function(_e1){var _e2=[this.xmin,this.ymax],_e3=[this.xmax,this.ymax],_e4=[this.xmin,this.ymin],_e5=[this.xmax,this.ymin],_e6=[_e2,_e3,_e4,_e5],_e7=[[_e4,_e2],[_e2,_e3],[_e3,_e5],[_e5,_e4]],i,j,_e8=_e1.rings,_e9=_e8.length,_ea,len,_eb=new esri.geometry.Point(0,0);len=_e6.length;for(i=0;i<len;i++){_eb.update(_e6[i][0],_e6[i][1]);if(_e1.contains(_eb)){return true;}}var pi,pj;for(i=0;i<_e9;i++){_ea=_e8[i];len=_ea.length;if(!len){continue;}pi=_ea[0];_eb.update(pi[0],pi[1]);if(this.contains(_eb)){return true;}for(j=1;j<len;j++){pj=_ea[j];_eb.update(pj[0],pj[1]);if(this.contains(_eb)||this._intersectsLine([pi,pj],_e7)){return true;}pi=pj;}}return false;},_intersectsPolyline:function(_ec){var _ed=[[[this.xmin,this.ymin],[this.xmin,this.ymax]],[[this.xmin,this.ymax],[this.xmax,this.ymax]],[[this.xmax,this.ymax],[this.xmax,this.ymin]],[[this.xmax,this.ymin],[this.xmin,this.ymin]]];var i,j,_ee=_ec.paths,_ef=_ee.length,_f0,len;var pi,pj,_f1=new esri.geometry.Point(0,0);for(i=0;i<_ef;i++){_f0=_ee[i];len=_f0.length;if(!len){continue;}pi=_f0[0];_f1.update(pi[0],pi[1]);if(this.contains(_f1)){return true;}for(j=1;j<len;j++){pj=_f0[j];_f1.update(pj[0],pj[1]);if(this.contains(_f1)||this._intersectsLine([pi,pj],_ed)){return true;}pi=pj;}}return false;},_intersectsLine:function(_f2,_f3){var _f4=esri.geometry._getLineIntersection2,i,len=_f3.length;for(i=0;i<len;i++){if(_f4(_f2,_f3[i])){return true;}}return false;},contains:function(_f5){if(!_f5){return false;}var _f6=_f5.type;switch(_f6){case "point":return _f5.x>=this.xmin&&_f5.x<=this.xmax&&_f5.y>=this.ymin&&_f5.y<=this.ymax;case "extent":return this._containsExtent(_f5);}return false;},_containsExtent:function(_f7){var _f8=_f7.xmin,_f9=_f7.ymin,_fa=_f7.xmax,_fb=_f7.ymax,pt1=new esri.geometry.Point(_f8,_f9),pt2=new esri.geometry.Point(_f8,_fb),pt3=new esri.geometry.Point(_fa,_fb),pt4=new esri.geometry.Point(_fa,_f9);if(this.contains(pt1)&&this.contains(pt2)&&this.contains(pt3)&&this.contains(pt4)){return true;}return false;},union:function(_fc){return new esri.geometry.Extent(Math.min(this.xmin,_fc.xmin),Math.min(this.ymin,_fc.ymin),Math.max(this.xmax,_fc.xmax),Math.max(this.ymax,_fc.ymax),this.spatialReference);},getExtent:function(){var sr=this.spatialReference;return new esri.geometry.Extent(this.xmin,this.ymin,this.xmax,this.ymax,sr&&new esri.SpatialReference(sr.toJson()));},_shiftCM:function(_fd){if(!this._shifted){var EG=esri.geometry,_fe=EG.fromJson(this.toJson()),sr=_fe.spatialReference;_fd=_fd||sr._getInfo();if(_fd){var _ff=this._getCM(_fd);if(_ff){var _100=sr._isWebMercator()?EG.webMercatorToGeographic(_ff):_ff;_fe.xmin-=_ff.x;_fe.xmax-=_ff.x;if(!sr._isWebMercator()){_100.x=this._normalizeX(_100.x,_fd).x;}_fe.spatialReference.wkt=esri.substitute({Central_Meridian:_100.x},sr.wkid===4326?_fd.altTemplate:_fd.wkTemplate);_fe.spatialReference.wkid=null;}}this._shifted=_fe;}return this._shifted;},_getCM:function(info){var _101,_102=info.valid[0],_103=info.valid[1],xmin=this.xmin,xmax=this.xmax;var _104=(xmin>=_102&&xmin<=_103),_105=(xmax>=_102&&xmax<=_103);if(!(_104&&_105)){_101=this.getCenter();}return _101;},_normalize:function(_106,_107,info){var EG=esri.geometry,_108=EG.fromJson(this.toJson()),sr=_108.spatialReference;if(sr){info=info||sr._getInfo();if(info){var _109=_2.map(this._getParts(info),function(part){return part.extent;});if(_109.length>2){if(_106){return this._shiftCM(info);}else{return _108.update(info.valid[0],_108.ymin,info.valid[1],_108.ymax,sr);}}else{if(_109.length===2){if(_106){return this._shiftCM(info);}else{return _107?_109:new EG.Polygon({"rings":_2.map(_109,function(_10a){return [[_10a.xmin,_10a.ymin],[_10a.xmin,_10a.ymax],[_10a.xmax,_10a.ymax],[_10a.xmax,_10a.ymin],[_10a.xmin,_10a.ymin]];}),"spatialReference":sr});}}else{return _109[0]||_108;}}}}return _108;},_getParts:function(info){if(!this._parts){var xmin=this.xmin,xmax=this.xmax,ymin=this.ymin,ymax=this.ymax,sr=this.spatialReference,_10b=this.getWidth(),_10c=xmin,_10d=xmax,_10e=0,_10f=0,nrml,_110=[],_111,_112,_113;info=info||sr._getInfo();_111=info.valid[0];_112=info.valid[1];nrml=this._normalizeX(xmin,info);xmin=nrml.x;_10e=nrml.frameId;nrml=this._normalizeX(xmax,info);xmax=nrml.x;_10f=nrml.frameId;_113=(xmin===xmax&&_10b>0);if(_10b>(2*_112)){var E1=new esri.geometry.Extent(_10c<_10d?xmin:xmax,ymin,_112,ymax,sr),E2=new esri.geometry.Extent(_111,ymin,_10c<_10d?xmax:xmin,ymax,sr),E3=new esri.geometry.Extent(0,ymin,_112,ymax,sr),E4=new esri.geometry.Extent(_111,ymin,0,ymax,sr),k,_114=[],_115=[];if(E1.contains(E3)){_114.push(_10e);}if(E1.contains(E4)){_115.push(_10e);}if(E2.contains(E3)){_114.push(_10f);}if(E2.contains(E4)){_115.push(_10f);}for(k=_10e+1;k<_10f;k++){_114.push(k);_115.push(k);}_110.push({extent:E1,frameIds:[_10e]},{extent:E2,frameIds:[_10f]},{extent:E3,frameIds:_114},{extent:E4,frameIds:_115});}else{if((xmin>xmax)||_113){_110.push({extent:new esri.geometry.Extent(xmin,ymin,_112,ymax,sr),frameIds:[_10e]},{extent:new esri.geometry.Extent(_111,ymin,xmax,ymax,sr),frameIds:[_10f]});}else{_110.push({extent:new esri.geometry.Extent(xmin,ymin,xmax,ymax,sr),frameIds:[_10e]});}}this._parts=_110;}return this._parts;},_normalizeX:function(x,info){var _116=0,_117=info.valid[0],_118=info.valid[1],_119=2*_118,_11a;if(x>_118){_11a=Math.ceil(Math.abs(x-_118)/_119);x-=(_11a*_119);_116=_11a;}else{if(x<_117){_11a=Math.ceil(Math.abs(x-_117)/_119);x+=(_11a*_119);_116=-_11a;}}return {x:x,frameId:_116};},toJson:function(){var json={xmin:this.xmin,ymin:this.ymin,xmax:this.xmax,ymax:this.ymax},sr=this.spatialReference;if(sr){json.spatialReference=sr.toJson();}return json;}});_2.declare("esri.geometry.Rect",esri.geometry.Geometry,{constructor:function(json,y,_11b,_11c,_11d){_2.mixin(this,_3.gfx.defaultRect);if(_2.isObject(json)){_2.mixin(this,json);this.spatialReference=new esri.SpatialReference(this.spatialReference);}else{this.x=json;this.y=y;this.width=_11b;this.height=_11c;this.spatialReference=_11d;}},getCenter:function(){return new esri.geometry.Point(this.x+this.width/2,this.y+this.height/2,this.spatialReference);},offset:function(ox,oy){return new esri.geometry.Rect(this.x+ox,this.y+oy,this.width,this.height,this.spatialReference);},intersects:function(rect){if((rect.x+rect.width)<=this.x){return false;}if((rect.y+rect.height)<=this.y){return false;}if(rect.y>=(this.y+this.height)){return false;}if(rect.x>=(this.x+this.width)){return false;}return true;},getExtent:function(){return esri.geometry._rectToExtent(this);},update:function(x,y,_11e,_11f,_120){this.x=x;this.y=y;this.width=_11e;this.height=_11f;this.spatialReference=_120;return this;}});});