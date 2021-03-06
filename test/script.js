function alertOnCtrl(e) {
    const CTRL_KEY_CODE = 17;
    if (parseInt(e.keyCode) === CTRL_KEY_CODE) {
        // popping up an alert box is enough to stop default event handling in chrome!
        alert("ctrl shortcuts are blocked");
    }
    return true;
}
function alertOnRightClick(e) {
    const RIGHT_CLICK = 2;
    if (e.button === RIGHT_CLICK) {
        alert("right click menu is blocked");
    }
    return true;
}
window.onload = function(){	window.onload = function(){
    var preventCopyAndPaste = function(e){ e.preventDefault(); }	  const preventEvent = function(e){ e.preventDefault(); };
    document.getElementById('property').onpaste = preventCopyAndPaste;
    document.getElementById('property').oncopy = preventCopyAndPaste;	  document.getElementById('property').onpaste = preventEvent;
    document.getElementById('listener').addEventListener('copy', preventCopyAndPaste, false);	  document.getElementById('property').oncopy = preventEvent;
    document.getElementById('listener').addEventListener('paste', preventCopyAndPaste, false);	  document.getElementById('property').oncut = preventEvent;
};	  document.getElementById('property').onkeydown = alertOnCtrl;
    document.getElementById('property').onmousedown = alertOnRightClick;
    document.getElementById('property').oncontextmenu = preventEvent;
    document.getElementById('listener').addEventListener('copy', preventEvent, false);
    document.getElementById('listener').addEventListener('paste', preventEvent, false);
    document.getElementById('listener').addEventListener('cut', preventEvent, false);
    document.getElementById('listener').addEventListener('keydown', alertOnCtrl, false);
    document.getElementById('listener').addEventListener('mousedown', alertOnRightClick, false);
    document.getElementById('listener').addEventListener('contextmenu', preventEvent, false);
};