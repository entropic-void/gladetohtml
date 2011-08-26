jQuery.webshims.register("forms-ext",function(b,e){(function(){var a=e.validityMessages,f=function(a,c){b.each(c,function(b,c){a[b]?typeof c=="object"&&f(a[b],c):a[b]=c})},c={typeMismatch:{number:"Please enter a number.",date:"Please enter a date.",time:"Please enter a time.",range:"Invalid input.","datetime-local":"Please enter a datetime."},rangeUnderflow:{defaultMessage:"Value must be greater than or equal to {%min}."},rangeOverflow:{defaultMessage:"Value must be less than or equal to {%max}."},
stepMismatch:"Invalid input."},g={typeMismatch:{number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:{defaultMessage:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen."},rangeOverflow:{defaultMessage:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen."},stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}"};
["date","time","datetime-local"].forEach(function(a){c.rangeUnderflow[a]="Value must be at or after {%min}."});["date","time","datetime-local"].forEach(function(a){c.rangeOverflow[a]="Value must be at or before {%max}."});["date","time","datetime-local"].forEach(function(a){g.rangeUnderflow[a]="{%value} ist zu fr\u00fch. {%min} ist die fr\u00fcheste Zeit, die Sie benutzen k\u00f6nnen."});["date","time","datetime-local"].forEach(function(a){g.rangeOverflow[a]="{%value} ist zu sp\u00e4t. {%max} ist die sp\u00e4teste Zeit, die Sie benutzen k\u00f6nnen."});
f(a.en,c);f(a.de,g)})();if(!Modernizr.input.valueAsNumberSet||!Modernizr.input.valueAsDate){e.getStep=function(a,f){var c=b.attr(a,"step");if(c==="any")return c;f=f||n(a);if(!g[f]||!g[f].step)return c;c=l.number.asNumber(c);return(!isNaN(c)&&c>0?c:g[f].step)*g[f].stepScaleFactor};e.addMinMaxNumberToCache=function(a,b,c){a+"AsNumber"in c||(c[a+"AsNumber"]=g[c.type].asNumber(b.attr(a)),isNaN(c[a+"AsNumber"])&&a+"Default"in g[c.type]&&(c[a+"AsNumber"]=g[c.type][a+"Default"]))};var k=parseInt("NaN",10),
g=e.inputTypes,i=function(a){return typeof a=="number"||a&&a==a*1},o=function(a){return Modernizr.input.valueAsNumber&&b('<input type="'+a+'" />').prop("type")===a},n=function(a){return(a.getAttribute("type")||"").toLowerCase()},j=e.addMinMaxNumberToCache,m=function(a,b){a=""+a;b-=a.length;for(var c=0;c<b;c++)a="0"+a;return a};if(!Modernizr.input.valueAsNumber||!Modernizr.input.valueAsDate)e.addValidityRule("stepMismatch",function(a,b,c){if(b==="")return!1;if(!("type"in c))c.type=n(a[0]);if(c.type==
"date")return!1;var q=!1;if(g[c.type]&&g[c.type].step){if(!("step"in c))c.step=e.getStep(a[0],c.type);if(c.step=="any")return!1;if(!("valueAsNumber"in c))c.valueAsNumber=g[c.type].asNumber(b);if(isNaN(c.valueAsNumber))return!1;j("min",a,c);a=c.minAsNumber;isNaN(a)&&(a=g[c.type].stepBase||0);q=Math.abs((c.valueAsNumber-a)%c.step);q=!(q<=1.0E-7||Math.abs(q-c.step)<=1.0E-7)}return q}),[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(a){e.addValidityRule(a.name,
function(b,c,e){var i=!1;if(c==="")return i;if(!("type"in e))e.type=n(b[0]);if(g[e.type]&&g[e.type].asNumber){if(!("valueAsNumber"in e))e.valueAsNumber=g[e.type].asNumber(c);if(isNaN(e.valueAsNumber))return!1;j(a.attr,b,e);if(isNaN(e[a.attr+"AsNumber"]))return i;i=e[a.attr+"AsNumber"]*a.factor<e.valueAsNumber*a.factor-1.0E-7}return i})}),e.reflectProperties(["input"],["max","min","step"]);var r=e.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var a=n(this);return g[a]&&g[a].asNumber?
g[a].asNumber(b.prop(this,"value")):k},set:function(a){var f=n(this);g[f]&&g[f].numberToString?isNaN(a)?b.prop(this,"value",""):(f=g[f].numberToString(a),f!==!1?b.prop(this,"value",f):e.warn("INVALID_STATE_ERR: DOM Exception 11")):r.prop._supset&&r.prop._supset.call(this,arguments)}}}),p=e.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var a=n(this);return g[a]&&g[a].asDate&&!g[a].noAsDate?g[a].asDate(b.prop(this,"value")):p.prop._supget&&p.prop._supget.call(this)},set:function(a){var f=
n(this);if(g[f]&&g[f].dateToString&&!g[f].noAsDate){if(a===null)return b.prop(this,"value",""),"";f=g[f].dateToString(a);if(f!==!1)return b.prop(this,"value",f),f;else e.warn("INVALID_STATE_ERR: DOM Exception 11")}else return p.prop._supset&&p.prop._supset(this,arguments)||null}}}),l={number:{mismatch:function(a){return!i(a)},step:1,stepScaleFactor:1,asNumber:function(a){return i(a)?a*1:k},numberToString:function(a){return i(a)?a:!1}},range:{minDefault:0,maxDefault:100},date:{mismatch:function(a){if(!a||
!a.split||!/\d$/.test(a))return!0;var f=a.split(/\u002D/);if(f.length!==3)return!0;var c=!1;b.each(f,function(a,b){if(!(i(b)||b&&b=="0"+b*1))return c=!0,!1});if(c)return c;if(f[0].length!==4||f[1].length!=2||f[1]>12||f[2].length!=2||f[2]>33)c=!0;return a!==this.dateToString(this.asDate(a,!0))},step:1,stepScaleFactor:864E5,asDate:function(a,b){return!b&&this.mismatch(a)?null:new Date(this.asNumber(a,!0))},asNumber:function(a,b){var c=k;if(b||!this.mismatch(a))a=a.split(/\u002D/),c=Date.UTC(a[0],a[1]-
1,a[2]);return c},numberToString:function(a){return i(a)?this.dateToString(new Date(a*1)):!1},dateToString:function(a){return a&&a.getFullYear?a.getUTCFullYear()+"-"+m(a.getUTCMonth()+1,2)+"-"+m(a.getUTCDate(),2):!1}},time:{mismatch:function(a,f){if(!a||!a.split||!/\d$/.test(a))return!0;a=a.split(/\u003A/);if(a.length<2||a.length>3)return!0;var c=!1,e;a[2]&&(a[2]=a[2].split(/\u002E/),e=parseInt(a[2][1],10),a[2]=a[2][0]);b.each(a,function(a,b){if(!(i(b)||b&&b=="0"+b*1)||b.length!==2)return c=!0,!1});
if(c)return!0;if(a[0]>23||a[0]<0||a[1]>59||a[1]<0)return!0;if(a[2]&&(a[2]>59||a[2]<0))return!0;if(e&&isNaN(e))return!0;e&&(e<100?e*=100:e<10&&(e*=10));return f===!0?[a,e]:!1},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var b=k,a=this.mismatch(a,!0);a!==!0&&(b=Date.UTC("1970",0,1,a[0][0],a[0][1],a[0][2]||0),a[1]&&(b+=a[1]));return b},dateToString:function(a){if(a&&a.getUTCHours){var b=m(a.getUTCHours(),2)+":"+m(a.getUTCMinutes(),
2),c=a.getSeconds();c!="0"&&(b+=":"+m(c,2));c=a.getUTCMilliseconds();c!="0"&&(b+="."+m(c,3));return b}else return!1}},"datetime-local":{mismatch:function(a,b){if(!a||!a.split||(a+"special").split(/\u0054/).length!==2)return!0;a=a.split(/\u0054/);return g.date.mismatch(a[0])||g.time.mismatch(a[1],b)},noAsDate:!0,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var b=k,c=this.mismatch(a,!0);c!==!0&&(a=a.split(/\u0054/)[0].split(/\u002D/),b=Date.UTC(a[0],a[1]-
1,a[2],c[0][0],c[0][1],c[0][2]||0),c[1]&&(b+=c[1]));return b},dateToString:function(a,b){return g.date.dateToString(a)+"T"+g.time.dateToString(a,b)}}};(!Modernizr.input.valueAsNumberSet||!o("number"))&&e.addInputType("number",l.number);(!Modernizr.input.valueAsNumberSet||!o("range"))&&e.addInputType("range",b.extend({},l.number,l.range));(!Modernizr.input.valueAsNumberSet||!o("date"))&&e.addInputType("date",l.date);(!Modernizr.input.valueAsNumberSet||!o("time"))&&e.addInputType("time",b.extend({},
l.date,l.time));(!Modernizr.input.valueAsNumberSet||!o("datetime-local"))&&e.addInputType("datetime-local",b.extend({},l.date,l.time,l["datetime-local"]))}});
jQuery.webshims.ready("forms-ext dom-support",function(b,e,k,g){var i=e.triggerInlineForm,o=Modernizr.inputtypes,n=function(a,b){var d={w:a.width()};if(d.w){var c={mL:parseInt(b.css("marginLeft"),10)||0,w:b.outerWidth()};d.mR=parseInt(a.css("marginRight"),10)||0;d.mR&&a.css("marginRight",0);c.mL<=c.w*-1?(b.css("marginRight",Math.floor(Math.abs(c.w+c.mL)+d.mR)),a.css("paddingRight",(parseInt(a.css("paddingRight"),10)||0)+Math.abs(c.mL)),a.css("width",Math.floor(d.w+c.mL))):(b.css("marginRight",d.mR),
a.css("width",Math.floor(d.w-c.mL-c.w)))}},j=b.webshims.cfg["forms-ext"],m={dateFormat:"yy-mm-dd"},r,p,l=b([]),a,f=function(a,h){b("input",a).add(h.filter("input")).each(function(){var a=b.prop(this,"type");if(f[a]&&!e.data(this,"shadowData"))f[a](b(this))})},c=function(a,h){if(j.lazyDate){var d=b.data(a[0],"setDateLazyTimer");d&&clearTimeout(d);b.data(a[0],"setDateLazyTimer",setTimeout(function(){a.datepicker("setDate",h);b.removeData(a[0],"setDateLazyTimer");a=null},0))}else a.datepicker("setDate",
h)};if(j.lazyDate===void 0)try{j.lazyDate=b.browser.msie&&e.browserVersion<9||b(k).width()<500&&b(k).height()<500}catch(q){}f.common=function(c,h,d){Modernizr.formvalidation&&c.bind("firstinvalid",function(b){clearTimeout(r);a||(r=setTimeout(function(){!a&&!b.isInvalidUIPrevented()&&e.validityAlert.showFor(b.target)},20))});var f=c.attr("id"),f={css:{marginRight:c.css("marginRight"),marginLeft:c.css("marginLeft")},outerWidth:c.outerWidth(),label:f?b('label[for="'+f+'"]',c[0].form):l},g=e.getID(f.label);
h.addClass(c[0].className);e.addShadowDom(c,h,{data:d||{},shadowFocusElement:b("input.input-datetime-local-date, span.ui-slider-handle",h)[0],shadowChilds:b("input, span.ui-slider-handle",h)});c.after(h).hide();c[0].form&&b(c[0].form).bind("reset",function(a){a.originalEvent&&!a.isDefaultPrevented()&&setTimeout(function(){c.prop("value",c.prop("value"))},0)});h.length==1&&!b("*",h)[0]&&(h.attr("aria-labeledby",g),f.label.bind("click",function(){h.focus();return!1}));return f};Modernizr.formvalidation&&
["input","form"].forEach(function(b){var h=e.defineNodeNameProperty(b,"checkValidity",{prop:{value:function(){a=!0;var b=h.prop._supvalue.apply(this,arguments);a=!1;return b}}})});if(!o["datetime-local"]||j.replaceUI){var v={trigger:[0.595,0.395],normal:[0.565,0.425]},w=!b.browser.msie||e.browserVersion>6?0:0.45,x=function(a,h,d,c){var f,i,t=function(){s.dpDiv.unbind("mousedown.webshimsmousedownhandler");i=f=!1},s=h.bind("focusin",function(){t();s.dpDiv.unbind("mousedown.webshimsmousedownhandler").bind("mousedown.webshimsmousedownhandler",
function(){f=!0})}).bind("focusout blur",function(a){f&&(i=!0,a.stopImmediatePropagation())}).datepicker(b.extend({onClose:function(){i&&g.activeElement!==h[0]?(t(),h.trigger("focusout"),h.triggerHandler("blur")):t()}},m,j.datepicker,a.data("datepicker"))).bind("change",d).data("datepicker");s.dpDiv.addClass("input-date-datepicker-control");c&&e.triggerDomUpdate(c[0]);p&&["disabled","min","max","value","step"].forEach(function(b){var d=a.prop(b);d!==""&&(b!="disabled"||!d)&&a.prop(b,d)});return s};
f["datetime-local"]=function(a){if(b.fn.datepicker){var h=b('<span role="group" class="input-datetime-local"><input type="text" class="input-datetime-local-date" /><input type="time" class="input-datetime-local-time" /></span>'),d=this.common(a,h,f["datetime-local"].attrs),c=b("input.input-datetime-local-date",h),e=x(a,c,function(d){var e=c.prop("value")||"",u="";if(j.lazyDate){var g=b.data(c[0],"setDateLazyTimer");g&&(clearTimeout(g),b.removeData(c[0],"setDateLazyTimer"))}if(e){u=b("input.input-datetime-local-time",
h).prop("value")||"00:00";try{e=(e=b.datepicker.parseDate(c.datepicker("option","dateFormat"),e))?b.datepicker.formatDate("yy-mm-dd",e):c.prop("value")}catch(k){e=c.prop("value")}}f["datetime-local"].blockAttr=!0;a.prop("value",!e&&!u?"":e+"T"+u);f["datetime-local"].blockAttr=!1;d.stopImmediatePropagation();i(a[0],"input");i(a[0],"change")},h);b("input.input-datetime-local-time",h).bind("change",function(d){var h=b.prop(this,"value"),e=["",""];if(h){e=a.prop("value").split("T");if(e.length<2||!e[0])e[0]=
b.datepicker.formatDate("yy-mm-dd",new Date);if(e[1]=h)try{c.prop("value",b.datepicker.formatDate(c.datepicker("option","dateFormat"),b.datepicker.parseDate("yy-mm-dd",e[0])))}catch(g){}}e=!e[0]&&!e[1]?"":e.join("T");f["datetime-local"].blockAttr=!0;a.prop("value",e);f["datetime-local"].blockAttr=!1;d.stopImmediatePropagation();i(a[0],"input");i(a[0],"change")});h.attr("aria-labeledby",d.label.attr("id"));d.label.bind("click",function(){c.focus();return!1});if(d.css&&(h.css(d.css),d.outerWidth)){h.outerWidth(d.outerWidth);
var d=h.width(),g=e.trigger[0]?v.trigger:v.normal;c.outerWidth(Math.floor(d*g[0]-w),!0);b("input.input-datetime-local-time",h).outerWidth(Math.floor(d*g[1]-w),!0);e.trigger[0]&&n(c,e.trigger)}}};f["datetime-local"].attrs={disabled:function(a,c,d){b("input.input-datetime-local-date",c).prop("disabled",!!d);b("input.input-datetime-local-time",c).prop("disabled",!!d)},step:function(a,c,d){b("input.input-datetime-local-time",c).attr("step",d)},min:function(a,c,d){if(d){d=d.split?d.split("T"):[];try{d=
b.datepicker.parseDate("yy-mm-dd",d[0])}catch(e){d=!1}}d||(d=null);b("input.input-datetime-local-date",c).datepicker("option","minDate",d)},max:function(a,c,d){if(d){d=d.split?d.split("T"):[];try{d=b.datepicker.parseDate("yy-mm-dd",d[0])}catch(e){d=!1}}d||(d=null);b("input.input-datetime-local-date",c).datepicker("option","maxDate",d)},value:function(a,e,d){var g;if(d){d=d.split?d.split("T"):[];try{g=b.datepicker.parseDate("yy-mm-dd",d[0])}catch(i){g=!1}}g?(f["datetime-local"].blockAttr||c(b("input.input-datetime-local-date",
e),g),b("input.input-datetime-local-time",e).prop("value",d[1]||"00:00")):(b("input.input-datetime-local-date",e).prop("value",d[0]||""),b("input.input-datetime-local-time",e).prop("value",d[1]||""))}};f.date=function(a){if(b.fn.datepicker){var c=b('<input class="input-date" type="text" />'),d=this.common(a,c,f.date.attrs),e=x(a,c,function(d){f.date.blockAttr=!0;var e;if(j.lazyDate){var g=b.data(c[0],"setDateLazyTimer");g&&(clearTimeout(g),b.removeData(c[0],"setDateLazyTimer"))}try{e=(e=b.datepicker.parseDate(c.datepicker("option",
"dateFormat"),c.prop("value")))?b.datepicker.formatDate("yy-mm-dd",e):c.prop("value")}catch(z){e=c.prop("value")}a.prop("value",e);f.date.blockAttr=!1;d.stopImmediatePropagation();i(a[0],"input");i(a[0],"change")});d.css&&(c.css(d.css),d.outerWidth&&c.outerWidth(d.outerWidth),e.trigger[0]&&n(c,e.trigger))}};f.date.attrs={disabled:function(a,c,d){b.prop(c,"disabled",!!d)},min:function(a,c,d){try{d=b.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&b(c).datepicker("option","minDate",d)},max:function(a,
c,d){try{d=b.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&b(c).datepicker("option","maxDate",d)},value:function(a,e,d){if(!f.date.blockAttr){try{var g=b.datepicker.parseDate("yy-mm-dd",d)}catch(i){g=!1}g?c(b(e),g):b.prop(e,"value",d)}}}}if(!o.range||j.replaceUI)f.range=function(a){if(b.fn.slider){var c=b('<span class="input-range"><span class="ui-slider-handle" role="slider" tabindex="0" /></span>'),d=this.common(a,c,f.range.attrs);b("span",c).attr("aria-labeledby",d.label.attr("id"));d.label.bind("click",
function(){b("span",c).focus();return!1});d.css&&(c.css(d.css),d.outerWidth&&c.outerWidth(d.outerWidth));c.slider(b.extend({},j.slider,a.data("slider"),{slide:function(b,c){if(b.originalEvent)f.range.blockAttr=!0,a.prop("value",c.value),f.range.blockAttr=!1,i(a[0],"input"),i(a[0],"change")}}));["disabled","min","max","step","value"].forEach(function(c){var d=a.attr(c),e;c=="value"&&!d&&(e=a.getShadowElement())&&(d=(b(e).slider("option","max")-b(e).slider("option","min"))/2);d!=null&&a.attr(c,d)})}},
f.range.attrs={disabled:function(a,c,d){d=!!d;b(c).slider("option","disabled",d);b("span",c).attr({"aria-disabled":d+"",tabindex:d?"-1":"0"})},min:function(a,c,d){d=d?d*1||0:0;b(c).slider("option","min",d);b("span",c).attr({"aria-valuemin":d})},max:function(a,c,d){d=d||d===0?d*1||100:100;b(c).slider("option","max",d);b("span",c).attr({"aria-valuemax":d})},value:function(a,c,d){d=b(a).prop("valueAsNumber");isNaN(d)||(f.range.blockAttr||b(c).slider("option","value",d),b("span",c).attr({"aria-valuenow":d,
"aria-valuetext":d}))},step:function(a,c,d){d=d&&b.trim(d)?d*1||1:1;b(c).slider("option","step",d)}};if(Modernizr.input.valueAsNumberSet&&Modernizr.input.valueAsDate&&(j.replaceUI||!Modernizr.inputtypes["datetime-local"]||!Modernizr.inputtypes.range))k=function(){e.data(this,"hasShadow")&&b.prop(this,"value",b.prop(this,"value"))},e.onNodeNamesPropertyModify("input","valueAsNumber",k),e.onNodeNamesPropertyModify("input","valueAsDate",k);b.each(["disabled","min","max","value","step"],function(a,b){e.onNodeNamesPropertyModify("input",
b,function(a){var c=e.data(this,"shadowData");if(c&&c.data&&c.data[b]&&c.nativeElement===this)c.data[b](this,c.shadowElement,a)})});if(!j.availabeLangs)j.availabeLangs="af ar ar-DZ az bg bs ca cs da de el en-AU en-GB en-NZ eo es et eu fa fi fo fr fr-CH gl he hr hu hy id is it ja ko kz lt lv ml ms nl no pl pt-BR rm ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");var y=function(a){p=!0;a&&(b.extend(m,a,j.datepicker),b("input.hasDatepicker").filter(".input-date, .input-datetime-local-date").datepicker("option",
m).each(function(){var a=e.data(this,"shadowData")||{};a.nativeElement&&b.each(["disabled","min","max","value","step"],function(c,e){b(a.nativeElement).attr(e,function(a,b){return b})})}))},k=function(){b.datepicker&&(e.ready("webshimLocalization",function(){e.activeLang(b.datepicker.regional,"forms-ext",y,function(){p=!0})}),b(g).unbind("jquery-uiReady.langchange input-widgetsReady.langchange"))};b(g).bind("jquery-uiReady.langchange input-widgetsReady.langchange",k);k();(function(){if(!Modernizr.input.valueAsNumber){var a=
e.modules["forms-ext"].options,c=e.inputTypes,d=function(a,d,f){f=f||{};if(!("type"in f))f.type=b.prop(a,"type");if(!("step"in f))f.step=e.getStep(a,f.type);if(!("valueAsNumber"in f))f.valueAsNumber=c[f.type].asNumber(b.prop(a,"value"));var g=f.step=="any"?c[f.type].step*c[f.type].stepScaleFactor:f.step;e.addMinMaxNumberToCache("min",b(a),f);e.addMinMaxNumberToCache("max",b(a),f);if(isNaN(f.valueAsNumber))f.valueAsNumber=c[f.type].stepBase||0;f.step!=="any"&&(a=Math.round((f.valueAsNumber-(f.minAsnumber||
0))%f.step*1E7)/1E7)&&Math.abs(a)!=f.step&&(f.valueAsNumber-=a);a=f.valueAsNumber+g*d;!isNaN(f.minAsNumber)&&a<f.minAsNumber?a=f.valueAsNumber*d<f.minAsNumber?f.minAsNumber:isNaN(f.maxAsNumber)?Number.MAX_VALUE:f.maxAsNumber:!isNaN(f.maxAsNumber)&&a>f.maxAsNumber&&(a=f.valueAsNumber*d>f.maxAsNumber?f.maxAsNumber:isNaN(f.minAsNumber)?Number.MIN_VALUE:f.minAsNumber);return Math.round(a*1E7)/1E7};e.modules["forms-ext"].getNextStep=d;var f=function(a,e,f){if(!a.disabled&&!a.readOnly&&!b(f).hasClass("step-controls")&&
(b.prop(a,"value",c[e].numberToString(d(a,b(f).hasClass("step-up")?1:-1,{type:e}))),b(a).unbind("blur.stepeventshim"),i(a,"input"),g.activeElement)){if(g.activeElement!==a)try{a.focus()}catch(j){}setTimeout(function(){if(g.activeElement!==a)try{a.focus()}catch(c){}b(a).one("blur.stepeventshim",function(){i(a,"change")})},0)}};if(a.stepArrows){var j={set:function(){var a=e.data(this,"step-controls");if(a)a[this.disabled||this.readonly?"addClass":"removeClass"]("disabled-step-control")}};e.onNodeNamesPropertyModify("input",
"disabled",j);e.onNodeNamesPropertyModify("input","readonly",b.extend({},j))}var k={38:1,40:-1};e.addReady(function(g,j){a.stepArrows&&b("input",g).add(j.filter("input")).each(function(){var g=b.prop(this,"type");if(c[g]&&c[g].asNumber&&a.stepArrows&&!(a.stepArrows!==!0&&!a.stepArrows[g]||b(this).hasClass("has-step-controls"))){var j=this,l=b('<span class="step-controls" unselectable="on"><span class="step-up" /><span class="step-down" /></span>').insertAfter(this).bind("selectstart dragstart",function(){return!1}).bind("mousedown mousepress",
function(a){f(j,g,a.target);return!1}).bind("mousepressstart mousepressend",function(a){b(a.target)[a.type=="mousepressstart"?"addClass":"removeClass"]("mousepress-ui")}),m=b(this).addClass("has-step-controls").attr({readonly:this.readOnly,disabled:this.disabled,autocomplete:"off",role:"spinbutton"}).bind(b.browser.msie?"keydown":"keypress",function(a){if(!this.disabled&&!this.readOnly&&k[a.keyCode])return b.prop(this,"value",c[g].numberToString(d(this,k[a.keyCode],{type:g}))),i(this,"input"),!1});
e.data(this,"step-controls",l);a.calculateWidth&&(n(m,l),l.css("marginTop",(m.outerHeight()-l.outerHeight())/2))}})})}})();e.addReady(function(a,c){b(g).bind("jquery-uiReady.initinputui input-widgetsReady.initinputui",function(){(b.datepicker||b.fn.slider)&&f(a,c);b.datepicker&&b.fn.slider?b(g).unbind(".initinputui"):e.modules["input-widgets"].src||e.warn('jQuery UI Widget factory is already included, but not datepicker or slider. configure src of $.webshims.modules["input-widgets"].src')})})});