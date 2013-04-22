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
define(["dijit","dojo","dojox","dojo/require!esri/layers/tiled,esri/layers/agscommon,esri/WKIDUnitConversion,dojox/xml/parser"],function(_1,_2,_3){_2.provide("esri.layers.wmts");_2.require("esri.layers.tiled");_2.require("esri.layers.agscommon");_2.require("esri.WKIDUnitConversion");_2.require("dojox.xml.parser");_2.declare("esri.layers.WMTSLayer",[esri.layers.TiledMapServiceLayer],{copyright:null,extent:null,tileUrl:null,layerInfo:null,spatialReference:null,tileInfo:null,constructor:function(_4,_5){this.version="1.0.0";this.tileUr=this._url=_4;this.serviceMode="RESTful";this._parseCapabilities=_2.hitch(this,this._parseCapabilities);this._getCapabilitiesError=_2.hitch(this,this._getCapabilitiesError);if(!_5){_5={};}if(_5.serviceMode){if(_5.serviceMode==="KVP"||_5.serviceMode==="RESTful"){this.serviceMode=_5.serviceMode;}else{console.error("WMTS mode could only be 'KVP' or 'RESTful'");return;}}if(_5.layerInfo){this.layerInfo=_5.layerInfo;this._identifier=_5.layerInfo.identifier;this._tileMatrixSetId=_5.layerInfo.tileMatrixSet;this.format="image/"+_5.layerInfo.format;this._style=_5.layerInfo.style;this.title=_5.layerInfo.title;}if(_5.resourceInfo){this.version=_5.resourceInfo.version;if(_5.resourceInfo.getTileUrl){this._url=this.tileUrl=_5.resourceInfo.getTileUrl;}this.copyright=_5.resourceInfo.copyright;this.layerInfos=_5.resourceInfo.layerInfos;this._parseResourceInfo();this.loaded=true;this.onLoad(this);}else{this._getCapabilities();}this._formatDictionary={"image/png":".png","image/png8":".png","image/png24":".png","image/png32":".png","image/jpg":".jpg","image/jpeg":".jpg","image/gif":".gif","image/bmp":".bmp","image/tiff":".tif"};},setActiveLayer:function(_6){this.layerInfo=_6;this._identifier=_6.identifier;this._tileMatrixSetId=_6.tileMatrixSet;if(_6.format){this.format="image/"+_6.format;}this._style=_6.style;this.title=_6.title;this._parseResourceInfo();this.refresh(true);},getTileUrl:function(_7,_8,_9){var _a;if(this.serviceMode==="KVP"){_a=this._url+"SERVICE=WMTS&VERSION="+this.version+"&REQUEST=GetTile"+"&LAYER="+this._identifier+"&STYLE="+this._style+"&FORMAT="+this.format+"&TILEMATRIXSET="+this._tileMatrixSetId+"&TILEMATRIX="+_7+"&TILEROW="+_8+"&TILECOL="+_9;}else{if(this.serviceMode==="RESTful"){var _b;if(this._formatDictionary[this.format]){_b=this._formatDictionary[this.format];}_a=this._url+this._identifier+"/"+this._style+"/"+this._tileMatrixSetId+"/"+_7+"/"+_8+"/"+_9+_b;}}return _a;},_parseResourceInfo:function(){var _c=this.layerInfos;if(this.serviceMode==="KVP"){this._url+=(this._url.substring(this._url.length-1,this._url.length)=="?")?"":"?";}for(var i=0;i<_c.length;i++){if((!this._identifier||_c[i].identifier===this._identifier)&&(!this.title||_c[i].title===this.title)&&(!this._tileMatrixSetId||_c[i].tileMatrixSet===this._tileMatrixSetId)&&(!this.format||"image/"+_c[i].format===this.format)&&(!this._style||_c[i].style===this._style)){_2.mixin(this,{"description":_c[i].description,tileInfo:_c[i].tileInfo,spatialReference:_c[i].tileInfo.spatialReference,fullExtent:_c[i].fullExtent,initialExtent:_c[i].initialExtent,_identifier:_c[i].identifier,_tileMatrixSetId:_c[i].tileMatrixSet,format:"image/"+_c[i].format,_style:_c[i].style});break;}}},_getCapabilities:function(){var _d;if(this.serviceMode==="KVP"){_d=this._url+"?request=GetCapabilities&service=WMTS&version="+this.version;}else{if(this.serviceMode==="RESTful"){_d=this._url+"/"+this.version+"/WMTSCapabilities.xml";}}esri.request({url:_d,handleAs:"text",load:this._parseCapabilities,error:this._getCapabilitiesError});},_parseCapabilities:function(_e){_e=_e.replace(/ows:/gi,"");var _f=_3.xml.parser.parse(_e);var _10=_2.query("OperationsMetadata",_f)[0];var _11=_2.query("[name='GetTile']",_10)[0];var _12=this.tileUrl;if(this._getAttributeValue("Get","xlink:href",_11)){_12=this._getAttributeValue("Get","xlink:href",_11);}if(_12.indexOf("/1.0.0/")===-1&&this.serviceMode==="RESTful"){_12+="/1.0.0/";}if(this.serviceMode==="KVP"){_12+=(_12.substring(_12.length-1,_12.length)=="?")?"":"?";}this._url=_12;var _13=_2.query("Contents",_f)[0];var _14,_15,_16,_17,lod,_18=[];if(!this._identifier){this._identifier=this._getTagValues("Capabilities>Contents>Layer>Identifier",_f)[0];}this.copyright=this._getTagValues("Capabilities>ServiceIdentification>AccessConstraints",_f)[0];var _19=this._getTagWithChildTagValue("Layer","Identifier",this._identifier,_13);this.description=this._getTagValues("Abstract",_19)[0];this.title=this._getTagValues("Title",_19)[0];if(!this._style){var _1a=_2.query("[isDefault='true']",_19)[0];if(_1a){this._style=this._getTagValues("Identifier",_1a)[0];}this._style=this._getTagValues("Identifier",_2.query("Style",_19)[0])[0];}var _1b=this._getTagValues("Format",_19);if(!this.format){this.format=_1b[0];}if(_2.indexOf(_1b,this.format)===-1){console.error("The format "+this.format+" is not supported by the service");}var _1c=this._getTagValues("TileMatrixSet",_19);if(!this._tileMatrixSetId){if(_2.indexOf(_1c,"GoogleMapsCompatible")!==-1){this._tileMatrixSetId="GoogleMapsCompatible";}else{this._tileMatrixSetId=_1c[0];}}var _1d=this._getTagWithChildTagValue("TileMatrixSetLink","TileMatrixSet",this._tileMatrixSetId,_19);var _1e=this._getTagValues("TileMatrix",_1d);var _1f=this._getTagWithChildTagValue("TileMatrixSet","Identifier",this._tileMatrixSetId,_13);var crs=this._getTagValues("SupportedCRS",_1f)[0];_17=crs.split(":").pop();if(_17==900913){_17=3857;}this.spatialReference=new esri.SpatialReference({"wkid":_17});var _20=_2.query("TileMatrix",_1f)[0];_14=parseInt(this._getTagValues("TileWidth",_20)[0],10);_15=parseInt(this._getTagValues("TileHeight",_20)[0],10);var _21=this._getTagValues("TopLeftCorner",_20)[0].split(" ");var top=_21[0],_22=_21[1];if(top.split("E").length>1){var _23=top.split("E");top=_23[0]*Math.pow(10,_23[1]);}if(_22.split("E").length>1){var _24=_22.split("E");_22=_24[0]*Math.pow(10,_24[1]);}_16={"x":parseInt(top,10),"y":parseInt(_22,10)};if(_17==3857||_17==102113||_17==102100){_16={"x":-20037508.342787,"y":20037508.342787};}else{if(_17==4326){_16={"x":-180,"y":90};}}var _25=this._getTagValues("MatrixWidth",_20)[0];var _26=this._getTagValues("MatrixHeight",_20)[0];if(_1e.length===0){var _27=_2.query("TileMatrix",_1f);for(var j=0;j<_27.length;j++){lod=this._getLodFromTileMatrix(_27[j],_17);_18.push(lod);}}else{for(var i=0;i<_1e.length;i++){var _28=this._getTagWithChildTagValue("TileMatrix","Identifier",_1e[i],_1f);lod=this._getLodFromTileMatrix(_28,_17);_18.push(lod);}}var _29=_16.x;var _2a=_16.y;var _2b=_25>_26?_25:_26;var _2c=_25>_26?_26:_25;var _2d=_29+_2b*_15*_18[0].resolution;var _2e=_2a-_2c*_14*_18[0].resolution;var _2f=new esri.geometry.Extent(_29,_2e,_2d,_2a);this.fullExtent=this.initialExtent=_2f;this.tileInfo=new esri.layers.TileInfo({"dpi":90.71428571428571});_2.mixin(this.tileInfo,{"spatialReference":this.spatialReference},{"format":this.format},{"height":_14},{"width":_15},{"origin":_16},{"lods":_18});this.loaded=true;this.onLoad(this);},_getCapabilitiesError:function(err){console.error("Failed to get capabilities xml");},_getLodFromTileMatrix:function(_30,_31){var id=this._getTagValues("Identifier",_30)[0];var _32=this._getTagValues("ScaleDenominator",_30)[0];if(_32.split("E").length>1){var _33=_32.split("E");_32=_33[0]*Math.pow(10,_33[1]);}else{_32=parseFloat(_32);}var _34;if(esri._isDefined(esri.WKIDUnitConversion[_31])){_34=esri.WKIDUnitConversion.values[esri.WKIDUnitConversion[_31]];}else{_34=111194.6519066546;}var _35=_32*7/25000/_34;var lod={"level":id,"scale":_32,"resolution":_35};return lod;},_getTag:function(_36,xml){var _37=_2.query(_36,xml);if(_37&&_37.length>0){return _37[0];}else{return null;}},_getTagValues:function(_38,xml){var _39=[];var _3a=_38.split(">");var tag,_3b;tag=_2.query(_3a[0],xml)[0];if(_3a.length>1){for(var i=1;i<_3a.length-1;i++){tag=_2.query(_3a[i],tag)[0];}_3b=_2.query(_3a[_3a.length-1],tag);}else{_3b=_2.query(_3a[0],xml);}if(_3b&&_3b.length>0){_2.forEach(_3b,function(_3c){if(_2.isIE){_39.push(_3c.childNodes[0].nodeValue);}else{_39.push(_3c.textContent);}});}return _39;},_getAttributeValue:function(_3d,_3e,xml,_3f){var _40=_2.query(_3d,xml);if(_40&&_40.length>0){return _40[0].getAttribute(_3e);}else{return _3f;}},_getTagWithChildTagValue:function(_41,_42,_43,xml){var _44=xml.childNodes;var _45;for(var j=0;j<_44.length;j++){if(_44[j].nodeName===_41){if(_2.isIE){if(esri._isDefined(_2.query(_42,_44[j])[0])){_45=_2.query(_42,_44[j])[0].childNodes[0].nodeValue;}}else{if(esri._isDefined(_2.query(_42,_44[j])[0])){_45=_2.query(_42,_44[j])[0].textContent;}}if(_45===_43){return _44[j];}}}}});_2.declare("esri.layers.WMTSLayerInfo",null,{identifier:null,tileMatrixSet:null,format:null,style:null,tileInfo:null,title:null,fullExtent:null,initialExtent:null,description:null,constructor:function(_46){if(_46){this.title=_46.title;this.tileMatrixSet=_46.tileMatrixSet;this.format=_46.format;this.style=_46.style;this.tileInfo=_46.tileInfo;this.fullExtent=_46.fullExtent;this.initialExtent=_46.initialExtent;this.identifier=_46.identifier;this.description=_46.description;}}});});