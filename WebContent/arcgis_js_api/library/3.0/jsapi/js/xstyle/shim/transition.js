//>>built
define("xstyle/shim/transition",["../xstyle","../elemental"],function(_1,_2){var _3=[];function _4(_5){if(_5.propertyName!="className"){return;}var _6=_5.srcElement;var _7=_6._transitions;var _8=_6._previousStyle;var _9=_6.runtimeStyle;var _a=_6.currentStyle;for(var i in _8){var _b=_9[i];if(!_7){_6._transitions=_7={};}var _c=_8[i];var _d=_a[i];_9[i]=_b;if(_c!=_d&&(_c||_b)){var _e=_f(_d);if(_e.units){var _10=_f(_b);var _11=_12(_e,_10);var _13=_f(_c);var _14=_12(_e,_13);if(_14&&_11&&_13.units==_e.units){var _15=_7[i];if(_15){_15.at=1;}var _16=_16||(_17=new Date().getTime());_15=_7[i]={from:(_c||_b),element:_6,to:_d,startTime:_16,duration:_6._transitionDuration*_11/_14,timing:_18[_6._transitionTiming||"ease"],property:i,t:0};if(!_19(_15)){_3.push(_15);}_8[i]=_d;}}}}};var rgb=/^rgba?\(([0-9,]+)\)/i;var hex=/#([0-9a-f]+)/i;var _1a=/([-0-9\.]+)([\w]+)/;function _f(_1b){var _1c=_1b.match(rgb);if(_1c){var _1d=_1c[1].split(",");for(var i=0;i<4;i++){_1d[0]=+(_1d[0]||0);}}else{if(_1c=_1b.match(hex)){_1c=_1c[1];var _1d=[];var _1e=_1c.length==3;_1d[0]=parseInt(_1c[0]+_1c[_1e?0:1],16);_1d[1]=parseInt(_1c[_1e?1:2]+_1c[_1e?1:3],16);_1d[2]=parseInt(_1c[_1e?2:4]+_1c[_1e?2:5],16);_1d.units="rgb";return _1d;}else{if(_1c=_1b.match(_1a)){_1d=[_1c[1]];_1d.units=_1c[2];return _1d;}else{return [];}}}_1d.units="rgb";return _1d;};function _12(_1f,end){var sum=0;for(var i=0;i<_1f.length;i++){sum+=Math.abs((end[i]||0)-(_1f[i]||0));}return sum;};function _20(_21,end,_22){var mid=[];for(var i=0;i<_21.length;i++){mid[i]=end[i]*_22-_21[i]*(_22-1);}if(_21.units=="rgb"){return "#"+mid[0].toString(16)+mid[1].toString(16)+mid[2].toString(16)+mid[3].toString(16);}else{return mid[0]+_21.units;}};var _3=[];var _17=new Date().getTime();var _23=30;setInterval(function(){var _24=_17;_17=new Date().getTime();for(var i=0,l=_3.length;i<l;i++){if(_19(_3[i])){_3.splice(i--,1);l--;}}},_23);function _19(_25){var _26=_25.element;runtimeStyle=_26.runtimeStyle;var t=_25.t=(_17-_25.startTime)/1000/_25.duration;if(t>=1){runtimeStyle[_25.property]="";return true;}runtimeStyle[_25.property]=_20(_f(_25.from),_f(_25.to),_25.timing(_25.t));};var _18={ease:_27(0.25,0.1,0.25,1),linear:_27(0,0,1,1),"ease-in":_27(0.42,0,1,1),"ease-out":_27(0,0,0.58,1),"ease-in-out":_27(0.42,0,0.58,1)};function _27(x0,y0,x1,y1){var p1=((y0+0.01)/(x0+0.01))/3;var p2=1-((1.01-y1)/(1.01-x1))/3;return function(t){return 3*(1-t)*(1-t)*t*p1+3*(1-t)*t*t*p2+t*t*t;};};function _28(t){var v=((x0-Math.sqrt(x0*x0+t*(x1-2*x0)))/(2*x0-x1)*2/3*(1-t)*(1-t)+((x1-x0-Math.sqrt((x1-x0)*(x1-x0)+(t-x0)*((1-x0)-2*(x1-x0))))/(2*(x1-x0)-1+x0)*2/3+1/3)*t*t)/((1-t)*(1-t)+t*t);var v=(x0-x1+Math.sqrt((x1-x0)*(x1-x0)-(1+x0-t)*(x0-2*x1)))/(1+x0-t);return t*t*(1-t)+(1-(1-t)*(1-t))*t;};return {onProperty:function(_29,_2a,_2b){return _2.addRenderer(_29,_2a,_2b,function(_2c){var _2d=_2c.currentStyle;var _2e=_2c._previousStyle={};if(_29=="transition-duration"){_2c._transitionDuration=parseFloat(_2a);}for(var i in _2d){_2e[i]=_2d[i];}_2c.attachEvent("onpropertychange",_4);});}};});