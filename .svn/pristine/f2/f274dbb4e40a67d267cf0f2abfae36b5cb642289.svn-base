/**
 * Created by 我未成年 on 2017/11/6.
 */

export default function $(selector){
    var className=selector.substring(1);//从索引为1的元素往后取
    var c = selector.substring(0,1);//获取第一个字符

    if(c=="#"){
        return document.getElementById(selector.substring(1,selector.length));//返回相应的元素
    }
    if(document.getElementsByClassName){
        return document.getElementsByClassName(className)
    }else{
        var reg=new RegExp('^|\\s'+className+'$|\\s');
        var elems=document.getElementsByTagName("*");//获取页面中所有元素
        var arr=[];//保存获取到的指定className的元素
        for(var i=0;i<elems.length;i++){
            if(reg.test(elems[i].className)){//如果和模式匹配上
                arr.push(elem[i]);
            }
        }
        return arr;
    }
}