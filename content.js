const allowDefaultAction = function(e){
  // prevent custom event handlers on the page swallowing the event
  e.stopImmediatePropagation();	  e.stopImmediatePropagation();
  return true;	  return true;
};	};
 const allowDefaultCtrlAction = function(e){
  if (e.type !== "keydown") return false;
   const CTRL_KEY_CODE = 17;
  if (parseInt(e.keyCode) !== CTRL_KEY_CODE) return false;
   return allowDefaultAction(e);
};
 const allowDefaultRightClickAction = function(e){
  if (e.type !== "mousedown") return false;
   const RIGHT_CLICK = 2;
  if (e.button !== RIGHT_CLICK) return false;
   return allowDefaultAction(e);
};
 chrome.storage.sync.get(window.defaultValues, function({exclude, include}) {	chrome.storage.sync.get(window.defaultValues, function({exclude, include}) {
  const excludes = new RegExp(exclude.split('\n').join('|'));	  const excludes = new RegExp(exclude.split('\n').join('|'));
  const includes = new RegExp(include.split('\n').join('|'));	  const includes = new RegExp(include.split('\n').join('|'));
  const location = window.location.href;	  const location = window.location.href;
   if (includes.test(location) && !excludes.test(location)) {	  if (includes.test(location) && !excludes.test(location)) {
    document.addEventListener('copy', allowCopyAndPaste, true);	    document.addEventListener('cut', allowDefaultAction, true);
    document.addEventListener('paste', allowCopyAndPaste, true);	    document.addEventListener('copy', allowDefaultAction, true);
    document.addEventListener('paste', allowDefaultAction, true);
    document.addEventListener('keydown', allowDefaultCtrlAction, true);
    document.addEventListener('mousedown', allowDefaultRightClickAction, true);
    document.addEventListener('contextmenu', allowDefaultAction, true);
    document.addEventListener('selectstart', allowDefaultAction, true);
  }	  }
});	});

10  test/iframe.html
@@ -1,8 +1,10 @@
<script src="script.js"></script>	<script src="script.js"></script>
<p>(This is a form inside of an iframe.)</p>	<p onselectstart="return false;" >(This is a form inside of an iframe.)</p>
<form>	<form onselectstart="return false;" >
  <label for="unpastable">Go ahead, try to copy or paste</label>	  <label>Go ahead, try to copy or paste:</label>
  <input id="attribute" type="text" oncopy="return false;" onpaste="return false;" />	  <input id="attribute" type="text" oncopy="return false;" onpaste="return false;" oncut="return false;"
         onkeydown="return alertOnCtrl(event);"
         onmousedown="return alertOnRightClick(event);" oncontextmenu="return false;"/>
  <input id="property" type="text" />	  <input id="property" type="text" />
  <input id="listener" type="text" />	  <input id="listener" type="text" />
</form>	</form>