let MpCircleBar = (function() {
	let cvs, ctx, cvs_width, cvs_height, center_x, center_y, lineWidth, radius, lineCap, imgCache = [],
		options;

	function loadImgRes(fn) {
		for(let i in options) {
			let img = new Image();
			img.onload = function() {
				imgCache[i] = img
				if(imgCache.length == options.length) {
					img = null;
					fn();
				}
			};
			img.src = options[i].child.endimg;
		}
	};

	function drawGroup() {
		let grouplength = options.length;
		let cur_ratio = 0;
		let cur_radian = 0;
		let pre_radian = 0;
		let count = 0;
		let child_ratio = 0;
		let cur_child_radian = 0;
		let start_radian = -(90 * (Math.PI / 180));
		//			
		//计算总值
		for(let i in options) {
			count += options[i].value
		}
		//计算组占比
		for(let i in options) {
			cur_ratio = options[i].value / count;
			cur_radian = (cur_ratio * 360) * (Math.PI / 180);
			ctx.beginPath();
			ctx.arc(center_x, center_y, radius, start_radian, start_radian + cur_radian, false); //这里的圆心坐标要和cirle的保持一致
			ctx.strokeStyle = options[i].color;
			ctx.lineCap = lineCap;
			ctx.lineWidth = lineWidth;
			ctx.stroke();
			ctx.closePath();

			drawChildRadian.call(this, i, options[i]);
			//计算子占比

			start_radian += cur_radian;
		}

		function drawChildRadian(index, group) {
			child_ratio = group.child.value / group.value
			cur_child_radian = cur_radian * child_ratio
			ctx.beginPath();
			ctx.arc(center_x, center_x, radius, start_radian, start_radian + cur_child_radian, false); //这里的圆心坐标要和cirle的保持一致
			ctx.strokeStyle = group.child.color;
			ctx.lineCap = lineCap;
			ctx.lineWidth = lineWidth;
			ctx.stroke();
			ctx.closePath();
			let img_x = center_x - lineWidth * 0.8 + Math.cos(start_radian + cur_child_radian) * radius
			let img_y = center_x - lineWidth * 0.8 + Math.sin(start_radian + cur_child_radian) * radius
			ctx.drawImage(imgCache[index], img_x, img_y)
		}
	};

	return {
		init: function(cvsel, _options) {
			cvs = cvsel;
			ctx = cvs.getContext('2d'); //画布属性 
			cvs_width = cvs.width;
			cvs_height = cvs.height;
			center_x = cvs_width / 2;
			center_y = cvs_height / 2;
			lineWidth = 15; // 圆环边的宽度
			radius = (center_x > center_y ? center_y : center_x) - lineWidth * 1.5; // 圆环半径
			lineCap = 'butt';
			options = _options;
			loadImgRes(function() {
				drawGroup();
			})
		}
	}
})();

exports.MpCircleBar = MpCircleBar;