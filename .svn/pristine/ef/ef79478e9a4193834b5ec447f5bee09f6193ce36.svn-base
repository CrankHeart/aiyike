function local(key, data) {
	if(!key || key == "") {
		return "";
	}
	if(!data || data == "") {
		return localStorage.getItem(key)
	}
	if(typeof data == "object") {
		localStorage.setItem(key, JSON.stringify(data));
	} else {
		localStorage.setItem(key, data);
	}
}

function session(key, data) {
	if(!key || key == "") {
		return "";
	}
	if(!data || data == "") {
		return sessionStorage.getItem(key)
	}
	if(typeof data == "object") {
		sessionStorage.setItem(key, JSON.stringify(data));
	} else {
		sessionStorage.setItem(key, data);
	}
}

function removeLocal(key) {
	localStorage.removeItem(key);
}

function removeSession(key) {
	if(!key || key == "") {
		return "";
	}
	sessionStorage.removeItem(key)
}

function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function setCookie(name, value, time) {
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec * 1);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getsec(str) {
	alert(str);
	var str1 = str.substring(1, str.length) * 1;
	var str2 = str.substring(0, 1);
	if(str2 == "s") {
		return str1 * 1000;
	} else if(str2 == "h") {
		return str1 * 60 * 60 * 1000;
	} else if(str2 == "d") {
		return str1 * 24 * 60 * 60 * 1000;
	}
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//setCookie("name", "xxx", "s20");

window.Cache = {
	local,
	session,
	removeLocal,
	removeSession,
	delCookie,
	setCookie,
	getCookie
}