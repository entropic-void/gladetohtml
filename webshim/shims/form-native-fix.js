jQuery.webshims.register("form-native-fix",function(b,e,f,p,j){if(Modernizr.formvalidation&&!Modernizr.bugfreeformvalidation){var o=b.browser.webkit,p=o&&e.browserVersion<533.18,m=[],k,l,g,h;if(f.addEventListener){var i={timer:j,prevented:!1};f.addEventListener("submit",function(a){!i.prevented&&a.target.checkValidity&&b.attr(a.target,"novalidate")==null&&(g=!0,b(a.target).checkValidity(),g=!1)},!0);j=function(a){if(b.attr(a.target,"formnovalidate")!=null)i.timer&&clearTimeout(i.timer),i.prevented=
!0,i.timer=setTimeout(function(){i.prevented=!1},20)};f.addEventListener("click",j,!0);f.addEventListener("touchstart",j,!0);f.addEventListener("touchend",j,!0)}b(document).bind("firstinvalidsystem",function(a,c){if(l=c.form){k=!1;m=[];var d=b(l).unbind("submit.preventInvalidSubmit").bind("submit.preventInvalidSubmit",function(a){if(b.attr(l,"novalidate")==null)return a.stopImmediatePropagation(),!1}).data("events").submit;d&&d.length>1&&d.unshift(d.pop());g&&(k=c)}}).bind("invalid",function(a){m.indexOf(a.target)==
-1?m.push(a.target):a.stopImmediatePropagation()}).bind("lastinvalid",function(a,c){var d=c.invalidlist[0];d&&(o||!Modernizr.requiredSelect&&b.nodeName(d,"select"))&&document.activeElement&&d!==document.activeElement&&k&&!k.isInvalidUIPrevented()&&e.validityAlert.showFor(d);k=!1;m=[];l&&b(l).unbind("submit.preventInvalidSubmit")});if(p){var q,n;(f=b(document).bind("invalid",function(a){if(a.originalEvent&&!g&&!h&&(b.prop(a.target,"validity")||{}).valid)return a.originalEvent.wrongWebkitInvalid=!0,
a.wrongWebkitInvalid=!0,a.stopImmediatePropagation(),a.preventDefault(),!1;else n=!0;clearTimeout(q);q=setTimeout(function(){a.target.form&&!n&&(n=!1,b(a.target.form).trigger("submit"));n=!1},1)}).data("events").invalid)&&f.length>1&&f.unshift(f.pop());b(document).bind("firstinvalidsystem",function(a,c){h||setTimeout(function(){c.isInvalidUIPrevented()||e.validityAlert.showFor(c.element)},0)})}(function(){o&&(["input","textarea","select"].forEach(function(a){var c=e.defineNodeNameProperty(a,"checkValidity",
{prop:{value:function(){if(!this.willValidate)return!0;var a=(b.prop(this,"validity")||{valid:!0}).valid;h=!0;!a&&c.prop._supvalue&&c.prop._supvalue.call(this)&&b(this).trigger("invalid");h=!1;return a}}})}),e.defineNodeNameProperty("form","checkValidity",{prop:{value:function(){var a=!0;b(this.elements||[]).filter(function(){if(!this.willValidate)return!1;var a=e.data(this,"shadowData");return!a||!a.nativeElement||a.nativeElement===this}).each(function(){b(this).checkValidity()===!1&&(a=!1)});return a}}}))})();
(function(){if(b.browser.opera){var a=function(a){a.preventDefault()};["form","input","textarea","select"].forEach(function(c){var d=e.defineNodeNameProperty(c,"checkValidity",{prop:{value:function(){g||b(this).bind("invalid",a);h=!0;var c=d.prop._supvalue.apply(this,arguments);g||b(this).unbind("invalid",a);h=!1;return c}}})})}})();Modernizr.requiredSelect||e.ready("form-extend",function(){e.addValidityRule("valueMissing",function(a,c,d,e){if(d.nodeName=="select"&&!c&&a.prop("required")){if(!d.type)d.type=
a[0].type;if(c=!c)if(!(c=a[0].selectedIndex<0))a=a[0],c=a.type=="select-one"&&a.size<2?b("> option:first-child",a).prop("selected"):!1;if(c)return!0}return e.valueMissing});e.defineNodeNamesBooleanProperty(["select"],"required",{set:function(a){this.setAttribute("aria-required",a?"true":"false");b.prop(this,"validity")},initAttr:!0})})}});