;(function (w) {
    //正则表达式
    w.Config = {}
    w.Config.pattern = {
        'url': /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
        'scriptPram': /\"?<script\s+src=\"(.+\?(.+))\">\s+<\/script>\"?/,
        'fileImg': /\.(jpg|jpeg|png|gif|bmp)$/i,
        'fileWord': /\.(doc|docx|docm)$/i,
        'fileExcel': /\.(xls|xlsx)$/i,
        'fileZip': /\.(zip|rar|gzip|arg)$/i,
        'fileMusic': /\.(mp3|wav)$/i,
        'fileVideo': /\.(mp4|ogg|mov)$/i,
        'allFile': /\.(jpg|jpeg|png|gif|bmp|doc|docx|docm|xls|xlsx|zip|rar|gzip|arg|mp3|wav|mp4|ogg|mov)/i,
        integer: /^[-\+]?\d+$/,
        //姓名  maxlength="50"
        userName: /^[0-9a-zA-Z\_\u4E00-\u9FA5]+$/,
        //年龄 maxlength = 3
        age: /^\d{1,3}$/,
        //身高
        height: /^\d{3}$/,
        //电话（手机或座机）maxlength="20" 比较粗放
        phone: /\d{3,4}[-\d+]\d{1,}/,
        //登录手机号码校验
        loginPhone: /^1[3|4|5|7|8]\d{9}$/,
        //图片验证码
        verifyCode: /[a-zA-Z0-9]{4}/,
        //注册校验
        phoneRegister: /^1[3|4|5|7|8]\d{9}$/,
        emailRegister: /^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        passwordRegister: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
        messageVerifyCodeRegister: /\d{6}/,
        enterpriseNameRegister: /.{2,}/,
        //邮箱
        email: /^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        //微信
        weChat: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
        //地址
        address: /^.{0,500}$/,
        //备注
        remark: /^.|\n{0,60}$/,
        //电话
        mobile: /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,
        english: /^[A-Za-z]+$/,
        chinese: /^[\u0391-\uFFE5]+$/,
        QQ: /^[1-9]\d{4,11}$/,
        password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,19}$/,
        double: /^(?!0(\\d|\\.0+$|$))\\d+(\\.\\d{1,2})?$/
    };
	
	w.Config.Login = 'LOGIN_KEY',
	w.Config.QuitCode = 4029,
	w.Config.StaticUrl = 'http://139.196.176.51:81/upload/'

	w.Config.CreateStep = {
		NAME: 'CREATESTEP_ACTION_TYPE',
		ACTION_TYPE : {
			CREATE_PROJECT_INTO: 1,
			TODO_INTO: 2
		}
	}
})(window);