//>>built
define("dgrid/extensions/ColumnHider",["dojo/_base/declare","dojo/has","dojo/on","dojo/query","dojo/dom","put-selector/put","dojo/NodeList-dom","xstyle/css!../css/extensions/ColumnHider.css"],function(_1,_2,_3,_4,_5,_6){var _7,_8;function _9(cb,_a){return cb.id.substr(_a.id.length+18);};return _1("dgrid.extensions.ColumnHider",[],{hiderMenuNode:null,hiderToggleNode:null,hiderMenuOpened:false,_columnStyleRules:null,renderHeader:function(){var _b=this,_c=this.hiderMenuNode,_d=this.hiderToggleNode,id,_e,_f,_10;this.inherited(arguments);if(!_c){_d=this.hiderToggleNode=_6(this.headerScrollNode,"div.dgrid-hider-toggle.dgrid-cell-padding","+");this._listeners.push(_3(_d,"click",function(e){_b._toggleHiderMenu(e);}));_c=this.hiderMenuNode=_6("div#dgrid-hider-menu-"+this.id+".dgrid-hider-menu");_c.style.display="none";_6(this.domNode,_c);this._listeners.push(_3(_c,".dgrid-hider-menu-check:"+(_2("ie")<9?"click":"change"),function(e){_b._toggleColumnState(e);}));this._listeners.push(_3(_c,"mousedown",function(e){e.stopPropagation();}));if(!_8){_8=_3.pausable(document.body,"mousedown",function(e){_7&&_7._toggleHiderMenu(e);});_8.pause();}}else{for(id in this._columnStyleRules){this._columnStyleRules[id].remove();}_c.innerHTML="";}this._columnStyleRules={};for(id in this.columns){_e=this.columns[id];if(_e.unhidable){continue;}_f=_6(_c,"div.dgrid-hider-menu-row");_10=_b.domNode.id+"-hider-menu-check-"+id;_f.innerHTML="<input type=\"checkbox\" id=\""+_10+"\" class=\"dgrid-hider-menu-check hider-menu-check-"+id+"\"><label class=\"dgrid-hider-menu-label hider-menu-label-"+id+"\" for=\""+_10+"\">"+_e.label.replace(/</g,"&lt;")+"</label>";if(_e.hidden){this._columnStyleRules[id]=_b.styleColumn(id,"display: none");}else{_f.firstChild.checked=true;}}},isColumnHidden:function(id){return !!this._columnStyleRules[id];},_toggleHiderMenu:function(){var _11=this.hiderMenuOpened;this.hiderMenuNode.style.display=(_11?"none":"");_8[_11?"pause":"resume"]();_7=_11?null:this;this.hiderMenuOpened=!_11;},_toggleColumnState:function(e){var id=_9(e.target,this);if(this._columnStyleRules[id]){this._columnStyleRules[id].remove();delete this._columnStyleRules[id];}else{this._columnStyleRules[id]=this.styleColumn(id,"display: none;");}_3.emit(this.domNode,"dgrid-columnstatechange",{column:this.columns[id],hidden:!e.target.checked});this.resize();}});});