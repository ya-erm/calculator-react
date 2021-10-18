(this["webpackJsonpcalculator-react"]=this["webpackJsonpcalculator-react"]||[]).push([[0],{27:function(t,e,n){},37:function(t,e,n){"use strict";n.r(e);var r,i=n(0),c=n.n(i),a=n(16),o=n.n(a),s=(n(27),n(3)),l=["title","titleId"];function u(){return u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u.apply(this,arguments)}function f(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}function p(t,e){var n=t.title,c=t.titleId,a=f(t,l);return i.createElement("svg",u({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:24,height:24,viewBox:"0 0 24 24",ref:e,"aria-labelledby":c},a),n?i.createElement("title",{id:c},n):null,r||(r=i.createElement("path",{d:"M22,3H7C6.31,3 5.77,3.35 5.41,3.88L0,12L5.41,20.11C5.77,20.64 6.31,21 7,21H22C23.1,21 24,20.1 24,19V5C24,3.9 23.1,3 22,3M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12"})))}var h,d=i.forwardRef(p),b=(n.p,n(4)),v=n(9),w=new(function(){function t(){Object(b.a)(this,t),this.events=void 0,this.events={}}return Object(v.a)(t,[{key:"subscribe",value:function(t,e){var n=this;return this.events[t]||(this.events[t]=[]),this.events[t].push(e),function(){return n.unsubscribe(t,e)}}},{key:"unsubscribe",value:function(t,e){var n;this.events[t]=null===(n=this.events[t])||void 0===n?void 0:n.filter((function(t){return t!==e}))}},{key:"emit",value:function(t,e){var n=this.events[t];null===n||void 0===n||n.forEach((function(t){return t.call(null,e)}))}}]),t}()),j=n(2),O=n(8),x=n(17),y=n(1),m=["text","type"],g=function(t){var e=t.text,n=t.icon,r=t.type,i=void 0===r?"number":r,c=t.columns,a=void 0===c?1:c,o=t.onPress,s=void 0===o?function(){}:o,l=E(),u="number"===i?l.numberButton:l.actionButton,f=Math.min(window.innerWidth,window.innerHeight)/4,p=Math.min(85,f);return Object(y.jsx)("button",{className:Object(x.a)(l.button,u),style:{height:p,width:a*p+2*(a-1)*5,borderRadius:p},onPointerDown:s,children:n||e})},k=function(t){var e=t.text,n=t.type,r=void 0===n?"action":n,i=Object(O.a)(t,m);return Object(y.jsx)(g,Object(j.a)({text:e,type:r},i))},E=Object(s.a)({button:{border:"none",display:"flex",alignItems:"center",justifyContent:"center",verticalAlign:"middle",textAlign:"center",cursor:"pointer",fontSize:30,userSelect:"none",margin:5,"&:hover":{opacity:.95},"&:active":{opacity:.6},"& svg":{width:"35px",height:"35px"}},numberButton:{color:"black",backgroundColor:"#D6E2FC"},actionButton:{backgroundColor:"#285FF5",color:"white",fill:"white"},icon:{width:"100%",height:"100%"}}),B=n(20),P=n(15),C=n(19),L=n(21),I=n(22),S=function(){function t(e,n){var r=this;Object(b.a)(this,t),this.type=void 0,this.value=void 0,this.canBeAfter=function(t){if(null==t)return r.canBeFirst();switch(r.type){case"leftBracket":case"number":switch(t.type){case"rightBracket":case"number":return!1;default:return!0}case"multiply":case"divide":case"mod":case"pow":case"rightBracket":switch(t.type){case"rightBracket":case"number":return!0;default:return!1}case"plus":case"minus":switch(t.type){case"leftBracket":case"rightBracket":case"number":return!0;default:return!1}}},this.canBeFirst=function(){switch(r.type){case"plus":case"minus":case"leftBracket":case"number":return!0;case"multiply":case"divide":case"mod":case"pow":case"rightBracket":return!1}},this.canBeLast=function(){switch(r.type){case"rightBracket":case"number":return!0;default:return!1}},this.canBeUnary=function(){switch(r.type){case"minus":case"plus":return!0;default:return!1}},this.isNumber=function(){return"number"===r.type},this.leftPriority=function(){switch(r.type){case"plus":case"minus":return 2;case"multiply":case"divide":case"mod":return 4;case"pow":return 5;default:return 0}},this.rightPriority=function(){switch(r.type){case"plus":case"minus":return 1;case"multiply":case"divide":case"mod":return 3;case"pow":return 6;default:return 0}},this.type=e,this.value=n}return Object(v.a)(t,null,[{key:"parse",value:function(t){switch(t){case"+":return new this("plus",t);case"-":return new this("minus",t);case"*":return new this("multiply",t);case"/":return new this("divide",t);case"%":return new this("mod",t);case"^":return new this("pow",t);case"(":return new this("leftBracket",t);case")":return new this("rightBracket",t);default:if(isNaN(parseFloat(t)))throw new Error("Can't parse \"".concat(t,'" as number token'));return new this("number",t)}}}]),t}(),H=function(t){Object(C.a)(n,t);var e=Object(L.a)(n);function n(t,r){var i;return Object(b.a)(this,n),(i=e.call(this)).message=void 0,i.position=void 0,i.message=t,i.position=r,i}return n}(Object(I.a)(Error)),M=function(t,e,n){switch(t.type){case"plus":return e+n;case"minus":return e-n;case"multiply":return e*n;case"divide":return e/n;case"mod":return e%n;case"pow":return Math.pow(e,n);case"leftBracket":case"rightBracket":case"number":throw Error("".concat(t.type," is not operationToken"))}},V=function(t){var e,n,r,i;try{var c=[],a=function(t){for(var e,n=[],r=null,i=[],c=0,a=!1,o=function(e,n){if(r){if(!e.canBeAfter(r))throw new H("Token ".concat(e," can't be after ").concat(r.type),n)}else if(!e.canBeFirst())throw new H("Token ".concat(e," can't be first"),n);if(n===t.length-1&&!e.canBeLast())throw new H("Token ".concat(e," can't be last"),n)},s=function(t){var e,c=i.join("");"minus"===(null===(e=r)||void 0===e?void 0:e.type)&&a&&(c="-".concat(c),n.pop(),r=null,a=!1);var s=S.parse(c);if(!s)throw new H('Failed to initialize number token from "'.concat(c,'"'),t);o(s,t),n.push(s),r=s,i=[]},l=0;l<t.length;l++){var u=t[l];if(" "!==u)if(u.match(/\d/)||"."===u)i.push(u);else{i.length>0&&s(l);var f=S.parse(u);if(!f)throw new H('Unsupported symbol "'.concat(u,'"'),l);switch(f.type){case"minus":switch(null===(e=r)||void 0===e?void 0:e.type){case"leftBracket":case"pow":case null:case void 0:a=!0;break;default:a=!1}break;case"leftBracket":c+=1;break;case"rightBracket":c-=1}if(c<0)throw new H("Closed brackets more than opened",l);o(f,l),n.push(f),r=f}}if(i.length>0&&s(t.length-1),c>0)throw new H("Opened brackets more than closed",t.length-1);return n}(t),o=null,s=function(){if(null!==o){var t=new S("number",o.toString());c=[t].concat(Object(P.a)(c)),o=null}for(;;){if(0===a.length)return;var e=a.shift();if(!e)return;if("number"===e.type)return void(o=parseFloat(e.value));c=[e].concat(Object(P.a)(c))}};for(s();;){var l,u,f,p,h=c[0],d=a[0],b=(null!==(l=null===(u=h)||void 0===u?void 0:u.leftPriority())&&void 0!==l?l:0)-(null!==(f=null===d||void 0===d?void 0:d.rightPriority())&&void 0!==f?f:0);if(h&&b>0){var v=c.shift(),w=c.shift();if(!v||!w)return;if("number"!==w.type)throw new Error("Left operand ".concat(w.type," is not number"));var j=parseFloat(w.value),O=M(v,j,null!==(e=o)&&void 0!==e?e:0);o=O,b=(null!==(n=null===(r=h=c[0])||void 0===r?void 0:r.leftPriority())&&void 0!==n?n:0)-(null!==(i=null===d||void 0===d?void 0:d.rightPriority())&&void 0!==i?i:0)}if(d&&"number"!==(null===d||void 0===d?void 0:d.type)&&b<0&&s(),"leftBracket"===(null===(p=h)||void 0===p?void 0:p.type)&&"rightBracket"===(null===d||void 0===d?void 0:d.type)&&(c.shift(),a.shift()),0===c.length&&0===a.length)break}return o}catch(x){return console.log(x),"Error"}},N=["+","-","/","*"],F=function(){var t=c.a.useState({input:"0",expression:"0"}),e=Object(B.a)(t,2),n=e[0],r=e[1],a=n.input,o=n.expression,s=function(t){var e=o.includes("=")?"0":a,n=o.includes("=")?"0":o;if("0"===e){if("."!==t)return void r((function(e){return{input:t,expression:"0"===n?t:e.expression+t}}));var i=n.trimEnd();i.length>0&&N.includes(String(i[i.length-1]))&&r((function(t){return Object(j.a)(Object(j.a)({},t),{},{expression:t.expression+"0"})}))}e.includes(".")&&"."===t||r((function(e){return{input:e.input+t,expression:e.expression+t}}))},l=function(){var t,e=o.split("=").map((function(t){return t.trimEnd()})),n=null!==(t=e[e.length-1])&&void 0!==t?t:"0";return r((function(t){return Object(j.a)(Object(j.a)({},t),{},{expression:n})})),n},u=function(t){"0"<=t&&t<="9"||"("===t||")"===t?s(t):"."===t||","===t?s("."):["+","-","*","/"].includes(t)?function(t){var e=o.includes("=")?l():o;if(N.includes(t)){var n=e.trimEnd(),i=n[n.length-1];if(i===t)return;N.includes(i)&&(e=n.substring(0,n.length-1).trimEnd())}"0"!==e||"-"!==t?(""===e&&(e="0"),r({input:"0",expression:e+" ".concat(t," ")})):r({input:"-",expression:"-"})}(t):"Enter"===t||"="===t?function(){if(!o.includes("=")){var t=o.trimEnd();t.length>0&&N.includes(t[t.length-1])&&r((function(t){return Object(j.a)(Object(j.a)({},t),{},{expression:t.expression+"0"})}));var e=V(o);r((function(t){return Object(j.a)(Object(j.a)({},t),{},{input:"".concat(e),expression:t.expression+" = ".concat(e)})}))}}():"Backspace"===t?(o.includes("=")&&l(),r({input:a.length>1?a.substring(0,a.length-1):"0",expression:o.length>1?o.trimEnd().substring(0,o.trimEnd().length-1).trimEnd():"0"})):"Clear"===t&&r({input:"0",expression:"0"})};Object(i.useEffect)((function(){return w.subscribe("key",(function(t){return u(t)}))}));var f=R();return Object(y.jsxs)("div",{className:f.container,children:[Object(y.jsx)("div",{className:f.inputMain,children:n.input}),Object(y.jsx)("div",{className:f.separator}),Object(y.jsx)("div",{className:f.history,children:n.expression})]})},R=Object(s.a)({container:{flexGrow:1,flexShrink:1,marginRight:20},inputMain:{fontSize:30,textAlign:"right",whiteSpace:"pre-wrap",overflowWrap:"anywhere"},history:{textAlign:"right",fontSize:20,whiteSpace:"pre-wrap",overflowWrap:"anywhere"},separator:{height:1,backgroundColor:"#CCCCCC",margin:"5px 0"}}),X=["title","titleId"];function A(){return A=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},A.apply(this,arguments)}function Z(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}function D(t,e){var n=t.title,r=t.titleId,c=Z(t,X);return i.createElement("svg",A({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:24,height:24,viewBox:"0 0 24 24",ref:e,"aria-labelledby":r},c),n?i.createElement("title",{id:r},n):null,h||(h=i.createElement("path",{d:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"})))}var z,T=i.forwardRef(D),W=(n.p,["title","titleId"]);function J(){return J=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},J.apply(this,arguments)}function U(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}function G(t,e){var n=t.title,r=t.titleId,c=U(t,W);return i.createElement("svg",J({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:24,height:24,viewBox:"0 0 24 24",ref:e,"aria-labelledby":r},c),n?i.createElement("title",{id:r},n):null,z||(z=i.createElement("path",{d:"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19C6,20.1 6.9,21 8,21H16C17.1,21 18,20.1 18,19V7H6V19Z"})))}var q,K=i.forwardRef(G),Q=(n.p,["title","titleId"]);function Y(){return Y=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Y.apply(this,arguments)}function $(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}function _(t,e){var n=t.title,r=t.titleId,c=$(t,Q);return i.createElement("svg",Y({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:24,height:24,viewBox:"0 0 24 24",ref:e,"aria-labelledby":r},c),n?i.createElement("title",{id:r},n):null,q||(q=i.createElement("path",{d:"M19,13H5V11H19V13M12,5C13.1,5 14,5.9 14,7C14,8.1 13.1,9 12,9C10.9,9 10,8.1 10,7C10,5.9 10.9,5 12,5M12,15C13.1,15 14,15.9 14,17C14,18.1 13.1,19 12,19C10.9,19 10,18.1 10,17C10,15.9 10.9,15 12,15Z"})))}var tt,et=i.forwardRef(_),nt=(n.p,["title","titleId"]);function rt(){return rt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},rt.apply(this,arguments)}function it(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}function ct(t,e){var n=t.title,r=t.titleId,c=it(t,nt);return i.createElement("svg",rt({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:24,height:24,viewBox:"0 0 24 24",ref:e,"aria-labelledby":r},c),n?i.createElement("title",{id:r},n):null,tt||(tt=i.createElement("path",{d:"M19,10H5V8H19V10M19,16H5V14H19V16Z"})))}var at,ot=i.forwardRef(ct),st=(n.p,["title","titleId"]);function lt(){return lt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},lt.apply(this,arguments)}function ut(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}function ft(t,e){var n=t.title,r=t.titleId,c=ut(t,st);return i.createElement("svg",lt({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:24,height:24,viewBox:"0 0 24 24",ref:e,"aria-labelledby":r},c),n?i.createElement("title",{id:r},n):null,at||(at=i.createElement("path",{d:"M19,13H5V11H19V13Z"})))}var pt,ht=i.forwardRef(ft),dt=(n.p,["title","titleId"]);function bt(){return bt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},bt.apply(this,arguments)}function vt(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}function wt(t,e){var n=t.title,r=t.titleId,c=vt(t,dt);return i.createElement("svg",bt({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:24,height:24,viewBox:"0 0 24 24",ref:e,"aria-labelledby":r},c),n?i.createElement("title",{id:r},n):null,pt||(pt=i.createElement("path",{d:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"})))}var jt=i.forwardRef(wt),Ot=(n.p,["text","type"]),xt=["text","type"],yt=function(t){var e=t.children,n=gt();return Object(y.jsx)("div",{className:n.row,children:e})},mt=function(){var t=function(t){w.emit("key",t)},e=function(e){var n=e.text,r=e.type,i=void 0===r?"number":r,c=Object(O.a)(e,Ot);return Object(y.jsx)(g,Object(j.a)({text:n,type:i,onPress:function(){return t(n)}},c))},n=function(e){var n=e.text,r=e.type,i=void 0===r?"action":r,c=Object(O.a)(e,xt);return Object(y.jsx)(g,Object(j.a)({text:n,type:i,onPress:function(){return t(n)}},c))},r=gt();return Object(y.jsxs)("div",{className:r.container,children:[Object(y.jsxs)(yt,{children:[Object(y.jsx)(k,{text:"Clear",icon:Object(y.jsx)(K,{}),onPress:function(){return t("Clear")}}),Object(y.jsx)(e,{text:"(",type:"action"}),Object(y.jsx)(e,{text:")",type:"action"}),Object(y.jsx)(n,{text:"/",icon:Object(y.jsx)(et,{})})]}),Object(y.jsxs)(yt,{children:[Object(y.jsx)(e,{text:"7"}),Object(y.jsx)(e,{text:"8"}),Object(y.jsx)(e,{text:"9"}),Object(y.jsx)(n,{text:"*",icon:Object(y.jsx)(T,{})})]}),Object(y.jsxs)(yt,{children:[Object(y.jsx)(e,{text:"4"}),Object(y.jsx)(e,{text:"5"}),Object(y.jsx)(e,{text:"6"}),Object(y.jsx)(n,{text:"-",icon:Object(y.jsx)(ht,{})})]}),Object(y.jsxs)(yt,{children:[Object(y.jsx)(e,{text:"1"}),Object(y.jsx)(e,{text:"2"}),Object(y.jsx)(e,{text:"3"}),Object(y.jsx)(n,{text:"+",icon:Object(y.jsx)(jt,{})})]}),Object(y.jsxs)(yt,{children:[Object(y.jsx)(e,{text:"0",columns:2}),Object(y.jsx)(e,{text:"."}),Object(y.jsx)(k,{text:"=",onPress:function(){return t("Enter")},icon:Object(y.jsx)(ot,{})})]})]})},gt=Object(s.a)({container:{marginBottom:20},row:{display:"flex",flexDirection:"row",justifyContent:"center"}}),kt=function(){var t=Et(),e=Math.min(window.innerWidth,window.innerHeight);return Object(i.useEffect)((function(){document.addEventListener("touchmove",(function(t){return t.preventDefault()}),{passive:!1}),window.addEventListener("keydown",(function(t){return w.emit("key",t.key)}))}),[]),Object(y.jsx)("div",{className:t.container,children:Object(y.jsxs)("div",{style:{width:Math.min(380,e)},children:[Object(y.jsxs)("div",{className:t.calculatorInput,children:[Object(y.jsx)(F,{}),Object(y.jsx)("div",{className:t.backspace,children:Object(y.jsx)(k,{text:"Backspace",icon:Object(y.jsx)(d,{})})})]}),Object(y.jsx)(mt,{})]})})},Et=Object(s.a)({container:{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},calculatorInput:{display:"flex",alignItems:"center",marginBottom:20},backspace:{flexShrink:0}});var Bt=function(){return Object(y.jsx)(kt,{})};o.a.render(Object(y.jsx)(c.a.StrictMode,{children:Object(y.jsx)(Bt,{})}),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.a4679673.chunk.js.map