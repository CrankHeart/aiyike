let lastTime = 0;
let vendors = ['webkit', 'moz', 'ms' ,'o'];
for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}
let raf = {
    requestAnimationFrame:function () {
        if (!window.requestAnimationFrame){
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            }
        }
    },
    cancelAnimationFrame:function () {
        if (!window.cancelAnimationFrame){
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            }
        }
    }
}
raf.requestAnimationFrame()
raf.cancelAnimationFrame()
export default {}
