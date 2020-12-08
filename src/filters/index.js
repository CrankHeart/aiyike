import Vue from 'vue'
/**
 * 自动补0
 */
Vue.filter('supplement0', function(value) {
    if(value.toString().split('.')[1]&&value.toString().split('.')[1].length<=1){
        value+='0'
    }
    if(value.toString().split('.').length == 1){
        value+='.00'
    }
    return value
});
/**
 * 转换日期格式至时间戳
 */
Vue.filter('totimestamp', function(value) {
    return Date.parse(new Date(value))
});
/*
 * useage:金钱过滤器
 * {{123456 | moneyformat(',')}}  ------  123,456
 */
Vue.filter('moneyformat', function(value, s) {
	if(value == null || value == undefined) {
		return value
	}
	if (typeof value == 'number') {
		value = value.toString()
	}
	let decimal = ''
	if (value.split('.').length > 1) {
		 decimal= value.split('.')[1]
	}
	let arr = value.split('.')[0].split('')
	let fh = arr[0] == '-' ? arr.shift() : arr[0] == '+' ? arr.shift() : ''
	let l = arr.length
	let m = l % 3
	if (m) {
		l = Math.floor(l / 3)
	} else {
		l = Math.floor(l / 3) - 1
	}
	let point = 0
	for (let i = 1; i <= l; i++) {
		let p = arr.length - (3 * i)
		if (p > 0) {
			arr.splice(arr.length - (3 * i) - point, 0, s || ',')
			point++
		}
	}
	if (decimal.length) {
		return fh + arr.join('') + '.' + decimal
	}
	return fh + arr.join('')
});
/*
 */
Vue.filter('timeStr2Text', function(value, s) {
	s = s || '-'
	if(value == null || value == undefined) {
		return value
	}
	if (String.isString(value)) {
		value = value.split("-").join("/")
	}
	return new Date(value).format("yyyy-MM-dd").split('-').join(s);
});
Vue.filter('timeStamp2Text', function(value, s) {
	s = s || '-'
	if(value == null || value == undefined) {
		return value
	}
	return new Date(+value).format("yyyy-MM-dd").split('-').join(s);
});
/*
 * useage: 
 * {{ | nullformat}}  ------  -
 */
Vue.filter('nullformat', function(value, s) {
	let ret = value
	if (Object.isEmpty(ret)) {
		ret = !!s?s:'-'
	}
	return ret
});

Vue.filter('nullformat0', function(value, s) {
    let ret = value
    if (Object.isEmpty(ret)) {
        ret = !!s?s:'0'
    }
    return ret
});
/*
 * useage:数字转汉字
 * {{1 | n2cformat}}  ------ 一
 */
Vue.filter('n2cformat', function(value) {
    var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"]
    var chnUnitSection = ["","万","亿","万亿","亿亿"]
    var chnUnitChar = ["","十","百","千"]
	//计算将数字转换成中文
    function SectionToChinese(section){
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while(section > 0){
            var v = section % 10;
            if(v === 0){
                if(!zero){
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            }else{
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }
    function NumberToChinese(num){
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;

        if(num === 0){
            return chnNumChar[0];
        }

        while(num > 0){
            var section = num % 10000;
            if(needZero){
                chnStr = chnNumChar[0] + chnStr;
            }
            strIns = SectionToChinese(section);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }

        return chnStr;
    }
    return NumberToChinese(value)
});

/**
 * @argument value
 * @author hardy
 * @desc 项目状态过滤器
 */
Vue.filter('fmtItemStatus', function(value) {
	if(value == 1) {
		return '询价中';
	} else if(value == 2) {
		return '进行中';
	} else if(value == 3) {
		return '已挂起';
	} else if(value == 4) {
		return '进行中';
	} else if(value == 5) {
		return '已结束';
	} else if(value == 6) {
		return '待事业部总监审核';
	} else if(value == 7) {
		return '待副总裁审核';
	} else if(value == 8) {
		return '待总裁审核';
	} else {
		return '未知';
	}
});

/**
 * @desc 日期过滤器
 * @author hardy
 * @argument value
 * @argument type
 */
Vue.filter("fmtTime", function(value, type) {
	if (value == undefined || value == null) {
		return void 0
	}
	let dStr = Number.isNumber(value)?value:value.toString().split('-').join('/')
	let date = new Date(dStr);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	let minute = date.getMinutes();
	let second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
})
/**
 * 时分秒
 */
Vue.filter("fmtHms", function(value, type) {
	if (value == undefined || value == null) {
		return void 0
	}
	let dStr = Number.isNumber(value)?value:value.toString().split('-').join('/')
	let date = new Date(dStr);
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	let minute = date.getMinutes();
	let second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return  h + ':' + minute + ':' + second;
})
/**
 * 过滤时间戳为年月日
 */
Vue.filter("fmtDate", function(value, type) {
	if (value == undefined || value == null) {
		return void 0
	}
	let dStr = Number.isNumber(value)?value:value.toString().split('-').join('/')
	let date = new Date(dStr);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	let minute = date.getMinutes();
	let second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d ;
})
/**
 * @desc 格式化日期为月日
 * @argument value
 * @argument type
 */
Vue.filter("fmtMonthDay", function(value, type) {
	if (value == undefined || value == null) {
		return void 0
	}
	let dStr = Number.isNumber(value)?value:value.toString().split('-').join('/')
    let date = new Date(dStr);
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return m + '/' + d ;
})

/**
 * @desc 格式化日期为年
 * @argument value
 * @argument type
 */
Vue.filter("fmtYear", function(value, type) {
	if (value == undefined || value == null) {
		return void 0
	}
	let dStr = Number.isNumber(value)?value:value.toString().split('-').join('/')
	let date = new Date(dStr);
	let y = date.getFullYear();
	return y;
})


Vue.filter("fmtLogType", function(value) {
    switch (value){
        case 1:return'日常事务';
        case 2:return '学习';
        case 3:return '项目执行';
        case 4:return '项目会议';
        case 5:return '请假';
    }
})
/**
 * 日志审核质量，效率，态度
 */
Vue.filter("fmtQem", function(value) {
    switch (value){
        case 1: return'A';
        case 2: return'B';
        case 3: return'C';
        case 4: return'D';
        case 5: return'E';
        case 6: return'F';

    }
})

Vue.filter("fmtLogStatus", function(value) {
    switch (value){
        case 0:return'未审核';
        case 1:return '点评';
        case 2:return '已审核';
        case 3:return '评论';
        case 4:return '已驳回';
    }
})

Vue.filter("fmtLogCategoryAddChar", function(value) {
   switch (value){
        case 1:return '';
        case 2:return '-无变更需求';
    }
})
/**
 * 未审核返回true
 */
Vue.filter("noAudit", function(value) {
    let flag=false;
   if(value==0){
       flag=true;
   }
   return flag;
})

/**
 * 项目类型
 * @author hardy
 */
Vue.filter("itemType", function(value) {
    switch (value){
        case 1||'1':return'长期项目';
        case 2||'2':return '短期项目';
        case 3||'3':return '维护项目';
        case 4||'4':return '售前项目';
        case 5||'5':return '内部研发项目';
    }
})


Vue.filter("cusCommentType", function(value) {
    switch (value){
        case 1:return'好评';
        case 2:return '差评';
        case 3:return '投诉';
    }
})


/**
 * 项目类型
 * @author hardy
 */
Vue.filter("industryType", function(value) {
    switch (value){
        case 1:return'金融';
        case 2:return '教育';
        case 3:return '医疗';
        case 4:return '化工';
        case 5:return '物流';
        case 6:return '电器';
        case 7:return '互联网';
        case 8:return '事业单位';
        case 9:return '电力能源';
        case 10:return '通信';
        case 11:return '房产';
        case 12:return '广告';
        case 13:return '餐饮';
        case 14:return '零售';
        case 15:return '旅游';
        case 16:return '文化艺术';
        case 17:return '工业';
        case 18:return '其他';
    }
})
Vue.filter("IoApplyStatus", function(value) {
    switch (value){
    	case 0:return'发起外围申请';
        case 1:return'待总监审核';
        case 2:return '待采购审核';
        case 3:return '邀请外围团队';
        case 4:return '外围团队评估';
        case 5:return '待采购选标';
        case 6:return '待副总审核';
        case 7:return '待总经理审核';
        case 8:return '待VP以上审核';
        case 9:return '填写付款计划';
        case 10:return '正常';
        case 11:return '挂起';
        case 12:return '中止';
        case 13:return '结项';
    }
    return ''
})
