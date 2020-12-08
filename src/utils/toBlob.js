/**
 * Created by 我未成年 on 2017/11/6.
 */
export default function dataURLtoBlob(dataurl){
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];// 结果：   image/png
    // ;//   "data:image/png;base64"
    // ;// :image/png;,image/png
    // ;//   image/png
    var bstr = atob(arr[1].replace(/\s/g, ''));
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});//值，类型
}
