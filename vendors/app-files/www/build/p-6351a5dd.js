import{l as t,k as n,m as e,j as r}from"./p-dd8c7f8a.js";import{s as a}from"./p-1f120eb8.js";function o(t){if(null===t||!0===t||!1===t)return NaN;var n=Number(t);return isNaN(n)?n:n<0?Math.ceil(n):Math.floor(n)}function i(t,n){if(n.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+n.length+" present")}function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function c(t){i(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"===u(t)&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function s(t,n){i(2,arguments);var e=c(t).getTime(),r=o(n);return new Date(e+r)}var d={};function f(){return d}function l(t){var n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),t.getTime()-n.getTime()}function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function m(t){return i(1,arguments),t instanceof Date||"object"===h(t)&&"[object Date]"===Object.prototype.toString.call(t)}function v(t){if(i(1,arguments),!m(t)&&"number"!=typeof t)return!1;var n=c(t);return!isNaN(Number(n))}function w(t,n){i(2,arguments);var e=o(n);return s(t,-e)}var b=864e5;function g(t){i(1,arguments);var n=1,e=c(t),r=e.getUTCDay(),a=(r<n?7:0)+r-n;return e.setUTCDate(e.getUTCDate()-a),e.setUTCHours(0,0,0,0),e}function y(t){i(1,arguments);var n=c(t),e=n.getUTCFullYear(),r=new Date(0);r.setUTCFullYear(e+1,0,4),r.setUTCHours(0,0,0,0);var a=g(r),o=new Date(0);o.setUTCFullYear(e,0,4),o.setUTCHours(0,0,0,0);var u=g(o);return n.getTime()>=a.getTime()?e+1:n.getTime()>=u.getTime()?e:e-1}function p(t){i(1,arguments);var n=y(t),e=new Date(0);e.setUTCFullYear(n,0,4),e.setUTCHours(0,0,0,0);var r=g(e);return r}var M=6048e5;function x(t,n){var e,r,a,u,s,d,l,h;i(1,arguments);var m=f(),v=o(null!==(e=null!==(r=null!==(a=null!==(u=null==n?void 0:n.weekStartsOn)&&void 0!==u?u:null==n||null===(s=n.locale)||void 0===s||null===(d=s.options)||void 0===d?void 0:d.weekStartsOn)&&void 0!==a?a:m.weekStartsOn)&&void 0!==r?r:null===(l=m.locale)||void 0===l||null===(h=l.options)||void 0===h?void 0:h.weekStartsOn)&&void 0!==e?e:0);if(!(v>=0&&v<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var w=c(t),b=w.getUTCDay(),g=(b<v?7:0)+b-v;return w.setUTCDate(w.getUTCDate()-g),w.setUTCHours(0,0,0,0),w}function S(t,n){var e,r,a,u,s,d,l,h;i(1,arguments);var m=c(t),v=m.getUTCFullYear(),w=f(),b=o(null!==(e=null!==(r=null!==(a=null!==(u=null==n?void 0:n.firstWeekContainsDate)&&void 0!==u?u:null==n||null===(s=n.locale)||void 0===s||null===(d=s.options)||void 0===d?void 0:d.firstWeekContainsDate)&&void 0!==a?a:w.firstWeekContainsDate)&&void 0!==r?r:null===(l=w.locale)||void 0===l||null===(h=l.options)||void 0===h?void 0:h.firstWeekContainsDate)&&void 0!==e?e:1);if(!(b>=1&&b<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var g=new Date(0);g.setUTCFullYear(v+1,0,b),g.setUTCHours(0,0,0,0);var y=x(g,n),p=new Date(0);p.setUTCFullYear(v,0,b),p.setUTCHours(0,0,0,0);var M=x(p,n);return m.getTime()>=y.getTime()?v+1:m.getTime()>=M.getTime()?v:v-1}function P(t,n){var e,r,a,u,c,s,d,l;i(1,arguments);var h=f(),m=o(null!==(e=null!==(r=null!==(a=null!==(u=null==n?void 0:n.firstWeekContainsDate)&&void 0!==u?u:null==n||null===(c=n.locale)||void 0===c||null===(s=c.options)||void 0===s?void 0:s.firstWeekContainsDate)&&void 0!==a?a:h.firstWeekContainsDate)&&void 0!==r?r:null===(d=h.locale)||void 0===d||null===(l=d.options)||void 0===l?void 0:l.firstWeekContainsDate)&&void 0!==e?e:1),v=S(t,n),w=new Date(0);w.setUTCFullYear(v,0,m),w.setUTCHours(0,0,0,0);var b=x(w,n);return b}var D=6048e5;function k(t,n){for(var e=t<0?"-":"",r=Math.abs(t).toString();r.length<n;)r="0"+r;return e+r}var E={G:function(t,n,e){var r=t.getUTCFullYear()>0?1:0;switch(n){case"G":case"GG":case"GGG":return e.era(r,{width:"abbreviated"});case"GGGGG":return e.era(r,{width:"narrow"});default:return e.era(r,{width:"wide"})}},y:function(t,n,e){if("yo"===n){var r=t.getUTCFullYear();return e.ordinalNumber(r>0?r:1-r,{unit:"year"})}return function(t,n){var e=t.getUTCFullYear(),r=e>0?e:1-e;return k("yy"===n?r%100:r,n.length)}(t,n)},Y:function(t,n,e,r){var a=S(t,r),o=a>0?a:1-a;return"YY"===n?k(o%100,2):"Yo"===n?e.ordinalNumber(o,{unit:"year"}):k(o,n.length)},R:function(t,n){return k(y(t),n.length)},u:function(t,n){return k(t.getUTCFullYear(),n.length)},Q:function(t,n,e){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(n){case"Q":return String(r);case"QQ":return k(r,2);case"Qo":return e.ordinalNumber(r,{unit:"quarter"});case"QQQ":return e.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return e.quarter(r,{width:"narrow",context:"formatting"});default:return e.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,n,e){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(n){case"q":return String(r);case"qq":return k(r,2);case"qo":return e.ordinalNumber(r,{unit:"quarter"});case"qqq":return e.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return e.quarter(r,{width:"narrow",context:"standalone"});default:return e.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,n,e){var r=t.getUTCMonth();switch(n){case"M":case"MM":return function(t,n){var e=t.getUTCMonth();return"M"===n?String(e+1):k(e+1,2)}(t,n);case"Mo":return e.ordinalNumber(r+1,{unit:"month"});case"MMM":return e.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return e.month(r,{width:"narrow",context:"formatting"});default:return e.month(r,{width:"wide",context:"formatting"})}},L:function(t,n,e){var r=t.getUTCMonth();switch(n){case"L":return String(r+1);case"LL":return k(r+1,2);case"Lo":return e.ordinalNumber(r+1,{unit:"month"});case"LLL":return e.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return e.month(r,{width:"narrow",context:"standalone"});default:return e.month(r,{width:"wide",context:"standalone"})}},w:function(t,n,e,r){var a=function(t,n){i(1,arguments);var e=c(t),r=x(e,n).getTime()-P(e,n).getTime();return Math.round(r/D)+1}(t,r);return"wo"===n?e.ordinalNumber(a,{unit:"week"}):k(a,n.length)},I:function(t,n,e){var r=function(t){i(1,arguments);var n=c(t),e=g(n).getTime()-p(n).getTime();return Math.round(e/M)+1}(t);return"Io"===n?e.ordinalNumber(r,{unit:"week"}):k(r,n.length)},d:function(t,n,e){return"do"===n?e.ordinalNumber(t.getUTCDate(),{unit:"date"}):function(t,n){return k(t.getUTCDate(),n.length)}(t,n)},D:function(t,n,e){var r=function(t){i(1,arguments);var n=c(t),e=n.getTime();n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0);var r=n.getTime();return Math.floor((e-r)/b)+1}(t);return"Do"===n?e.ordinalNumber(r,{unit:"dayOfYear"}):k(r,n.length)},E:function(t,n,e){var r=t.getUTCDay();switch(n){case"E":case"EE":case"EEE":return e.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return e.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return e.day(r,{width:"short",context:"formatting"});default:return e.day(r,{width:"wide",context:"formatting"})}},e:function(t,n,e,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(n){case"e":return String(o);case"ee":return k(o,2);case"eo":return e.ordinalNumber(o,{unit:"day"});case"eee":return e.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return e.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return e.day(a,{width:"short",context:"formatting"});default:return e.day(a,{width:"wide",context:"formatting"})}},c:function(t,n,e,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(n){case"c":return String(o);case"cc":return k(o,n.length);case"co":return e.ordinalNumber(o,{unit:"day"});case"ccc":return e.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return e.day(a,{width:"narrow",context:"standalone"});case"cccccc":return e.day(a,{width:"short",context:"standalone"});default:return e.day(a,{width:"wide",context:"standalone"})}},i:function(t,n,e){var r=t.getUTCDay(),a=0===r?7:r;switch(n){case"i":return String(a);case"ii":return k(a,n.length);case"io":return e.ordinalNumber(a,{unit:"day"});case"iii":return e.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return e.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return e.day(r,{width:"short",context:"formatting"});default:return e.day(r,{width:"wide",context:"formatting"})}},a:function(t,n,e){var r=t.getUTCHours()/12>=1?"pm":"am";switch(n){case"a":case"aa":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return e.dayPeriod(r,{width:"narrow",context:"formatting"});default:return e.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,n,e){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",n){case"b":case"bb":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return e.dayPeriod(r,{width:"narrow",context:"formatting"});default:return e.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,n,e){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",n){case"B":case"BB":case"BBB":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return e.dayPeriod(r,{width:"narrow",context:"formatting"});default:return e.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,n,e){if("ho"===n){var r=t.getUTCHours()%12;return 0===r&&(r=12),e.ordinalNumber(r,{unit:"hour"})}return function(t,n){return k(t.getUTCHours()%12||12,n.length)}(t,n)},H:function(t,n,e){return"Ho"===n?e.ordinalNumber(t.getUTCHours(),{unit:"hour"}):function(t,n){return k(t.getUTCHours(),n.length)}(t,n)},K:function(t,n,e){var r=t.getUTCHours()%12;return"Ko"===n?e.ordinalNumber(r,{unit:"hour"}):k(r,n.length)},k:function(t,n,e){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===n?e.ordinalNumber(r,{unit:"hour"}):k(r,n.length)},m:function(t,n,e){return"mo"===n?e.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):function(t,n){return k(t.getUTCMinutes(),n.length)}(t,n)},s:function(t,n,e){return"so"===n?e.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):function(t,n){return k(t.getUTCSeconds(),n.length)}(t,n)},S:function(t,n){return function(t,n){var e=n.length,r=t.getUTCMilliseconds();return k(Math.floor(r*Math.pow(10,e-3)),n.length)}(t,n)},X:function(t,n,e,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(n){case"X":return Y(a);case"XXXX":case"XX":return j(a);default:return j(a,":")}},x:function(t,n,e,r){var a=(r._originalDate||t).getTimezoneOffset();switch(n){case"x":return Y(a);case"xxxx":case"xx":return j(a);default:return j(a,":")}},O:function(t,n,e,r){var a=(r._originalDate||t).getTimezoneOffset();switch(n){case"O":case"OO":case"OOO":return"GMT"+W(a,":");default:return"GMT"+j(a,":")}},z:function(t,n,e,r){var a=(r._originalDate||t).getTimezoneOffset();switch(n){case"z":case"zz":case"zzz":return"GMT"+W(a,":");default:return"GMT"+j(a,":")}},t:function(t,n,e,r){return k(Math.floor((r._originalDate||t).getTime()/1e3),n.length)},T:function(t,n,e,r){return k((r._originalDate||t).getTime(),n.length)}};function W(t,n){var e=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),o=r%60;if(0===o)return e+String(a);var i=n||"";return e+String(a)+i+k(o,2)}function Y(t,n){return t%60==0?(t>0?"-":"+")+k(Math.abs(t)/60,2):j(t,n)}function j(t,n){var e=n||"",r=t>0?"-":"+",a=Math.abs(t);return r+k(Math.floor(a/60),2)+e+k(a%60,2)}var q=function(t,n){switch(t){case"P":return n.date({width:"short"});case"PP":return n.date({width:"medium"});case"PPP":return n.date({width:"long"});default:return n.date({width:"full"})}},T=function(t,n){switch(t){case"p":return n.time({width:"short"});case"pp":return n.time({width:"medium"});case"ppp":return n.time({width:"long"});default:return n.time({width:"full"})}},O={p:T,P:function(t,n){var e,r=t.match(/(P+)(p+)?/)||[],a=r[1],o=r[2];if(!o)return q(t,n);switch(a){case"P":e=n.dateTime({width:"short"});break;case"PP":e=n.dateTime({width:"medium"});break;case"PPP":e=n.dateTime({width:"long"});break;default:e=n.dateTime({width:"full"})}return e.replace("{{date}}",q(a,n)).replace("{{time}}",T(o,n))}},Q=["D","DD"],G=["YY","YYYY"];function N(t){return-1!==Q.indexOf(t)}function A(t){return-1!==G.indexOf(t)}function L(t,n,e){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(n,"`) for formatting years to the input `").concat(e,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(n,"`) for formatting years to the input `").concat(e,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(n,"`) for formatting days of the month to the input `").concat(e,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(n,"`) for formatting days of the month to the input `").concat(e,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var X={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function z(t){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=n.width?String(n.width):t.defaultWidth,r=t.formats[e]||t.formats[t.defaultWidth];return r}}var B={date:z({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:z({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:z({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},R={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function C(t){return function(n,e){var r;if("formatting"===(null!=e&&e.context?String(e.context):"standalone")&&t.formattingValues){var a=t.defaultFormattingWidth||t.defaultWidth,o=null!=e&&e.width?String(e.width):a;r=t.formattingValues[o]||t.formattingValues[a]}else{var i=t.defaultWidth,u=null!=e&&e.width?String(e.width):t.defaultWidth;r=t.values[u]||t.values[i]}return r[t.argumentCallback?t.argumentCallback(n):n]}}function F(t){return function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=n.match(a);if(!o)return null;var i,u=o[0],c=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],s=Array.isArray(c)?I(c,(function(t){return t.test(u)})):J(c,(function(t){return t.test(u)}));i=t.valueCallback?t.valueCallback(s):s,i=e.valueCallback?e.valueCallback(i):i;var d=n.slice(u.length);return{value:i,rest:d}}}function J(t,n){for(var e in t)if(t.hasOwnProperty(e)&&n(t[e]))return e}function I(t,n){for(var e=0;e<t.length;e++)if(n(t[e]))return e}var H,U={code:"en-US",formatDistance:function(t,n,e){var r,a=X[t];return r="string"==typeof a?a:1===n?a.one:a.other.replace("{{count}}",n.toString()),null!=e&&e.addSuffix?e.comparison&&e.comparison>0?"in "+r:r+" ago":r},formatLong:B,formatRelative:function(t){return R[t]},localize:{ordinalNumber:function(t){var n=Number(t),e=n%100;if(e>20||e<10)switch(e%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:C({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:C({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:C({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:C({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:C({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(H={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.match(H.matchPattern);if(!e)return null;var r=e[0],a=t.match(H.parsePattern);if(!a)return null;var o=H.valueCallback?H.valueCallback(a[0]):a[0];o=n.valueCallback?n.valueCallback(o):o;var i=t.slice(r.length);return{value:o,rest:i}}),era:F({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:F({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:F({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:F({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:F({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}},K=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,$=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Z=/^'([^]*?)'?$/,_=/''/g,V=/[a-zA-Z]/;function tt(t){var n=t.match(Z);return n?n[1].replace(_,"'"):t}async function nt(n){const e=await t.create({cssClass:"my-custom-class",header:"Alert",subHeader:"Subtitle",message:n,buttons:["OK"]});await e.present()}async function et(t){const e=("action_sheets"in a.data?a.data.action_sheets:[]).filter((function(n){return"acf/action-sheet"===n.blockName&&n.attrs.data.name===t.data.action_sheet})).map((function(t){return t}));if(e.length>0){const t=e[0].attrs.data;let r=[];t.action_buttons.map((t=>{r.push({text:t.text,role:t.role,data:{data:a.database},handler:()=>{"custom"===t.action&&document.querySelector("app-root").emitActionEvent(t.function,a)}})})),r.push({text:t.cancel_button_title,role:"cancel"});const o=await n.create({header:t.header,subHeader:t.subheader,cssClass:"my-custom-class",buttons:r});await o.present()}}async function rt(t){const n=a.data.modals.filter((function(n){return"acf/modal"===n.blockName&&n.attrs.data.modal_name===t.data.modal_item})).map((function(t){return t}));(await e.create({component:"acf-modal",componentProps:{data:n[0],api:t.api}})).present()}function at(){e.dismiss(null,"cancel")}async function ot(t){const n=a.data.popovers.filter((function(n){return"acf/popover"===n.blockName&&n.attrs.data.name===t.data.popover})).map((function(t){return t}));(await r.create({component:"acf-popover",componentProps:{data:n[0]},event:t.ev})).present()}function it(t,n="?"){return n+ut(t)}function ut(t,n=""){let e,r=[];for(e in t)if(t.hasOwnProperty(e)){var a=n?n+"["+e+"]":e,o=t[e];r.push(null!==o&&"object"==typeof o?ut(o,a):a+"="+encodeURIComponent(o))}return r.join("&")}function ct(t,n){var e;let r=n;switch(t.formatting){case"none":break;case"date":try{r=function(t,n,e){var r,a,u,s,d,h,m,b,g,y,p,M,x,S,P,D,k,W;i(2,arguments);var Y=String(n),j=f(),q=null!==(r=null!==(a=null==e?void 0:e.locale)&&void 0!==a?a:j.locale)&&void 0!==r?r:U,T=o(null!==(u=null!==(s=null!==(d=null!==(h=null==e?void 0:e.firstWeekContainsDate)&&void 0!==h?h:null==e||null===(m=e.locale)||void 0===m||null===(b=m.options)||void 0===b?void 0:b.firstWeekContainsDate)&&void 0!==d?d:j.firstWeekContainsDate)&&void 0!==s?s:null===(g=j.locale)||void 0===g||null===(y=g.options)||void 0===y?void 0:y.firstWeekContainsDate)&&void 0!==u?u:1);if(!(T>=1&&T<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var Q=o(null!==(p=null!==(M=null!==(x=null!==(S=null==e?void 0:e.weekStartsOn)&&void 0!==S?S:null==e||null===(P=e.locale)||void 0===P||null===(D=P.options)||void 0===D?void 0:D.weekStartsOn)&&void 0!==x?x:j.weekStartsOn)&&void 0!==M?M:null===(k=j.locale)||void 0===k||null===(W=k.options)||void 0===W?void 0:W.weekStartsOn)&&void 0!==p?p:0);if(!(Q>=0&&Q<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!q.localize)throw new RangeError("locale must contain localize property");if(!q.formatLong)throw new RangeError("locale must contain formatLong property");var G=c(t);if(!v(G))throw new RangeError("Invalid time value");var X=l(G),z=w(G,X),B={firstWeekContainsDate:T,weekStartsOn:Q,locale:q,_originalDate:G};return Y.match($).map((function(t){var n=t[0];return"p"===n||"P"===n?(0,O[n])(t,q.formatLong):t})).join("").match(K).map((function(r){if("''"===r)return"'";var a=r[0];if("'"===a)return tt(r);var o=E[a];if(o)return null!=e&&e.useAdditionalWeekYearTokens||!A(r)||L(r,n,String(t)),null!=e&&e.useAdditionalDayOfYearTokens||!N(r)||L(r,n,String(t)),o(z,r,q.localize,B);if(a.match(V))throw new RangeError("Format string contains an unescaped latin alphabet character `"+a+"`");return r})).join("")}(new Date(parseInt(n)),null!==(e=t.date_format)&&void 0!==e?e:"MMM do y p")}catch(t){console.log("date format",t)}break;case"styles":let u=(a=n,(new DOMParser).parseFromString(a,"text/html"));Array.from(u.body.querySelectorAll("*")).forEach((t=>{t.removeAttribute("style")})),r=u.body.innerHTML;break;case"uppercase":r=n.toUpperCase();break;case"lowercase":r=n.toLowerCase()}var a;return r}export{et as a,ot as b,nt as c,at as d,ct as f,it as o,rt as p}