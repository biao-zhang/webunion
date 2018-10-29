//tips("是否删除？");
function tips(str,callback1){
	$("body").append('<div class="tip_zz"></div>'
			+'<div class="tip_box">'
				+'<div class="tip_tt">'
					+'<span>提示</span>'
					+'<i class="tip_close"></i>'
				+'</div>'
				+'<div class="tip_con">'
					+'<p class="tip_p">'+str+'</p>'
					+'<div class="tip_btnbox">'
						+'<input type="button" value="确定" class="tip_submit">'
						+'<input type="button" value="取消" class="tip_cancel">'
					+'</div>'
				+'</div>'
			+'</div>');
	$(".tip_cancel,.tip_close").click(function(){
		$(".tip_zz").remove();
		$(".tip_box").remove();
	});
	$(".tip_submit").click(function(){
		$(".tip_zz").remove();
		$(".tip_box").remove();
		if(callback1!=null&&callback1!="") callback1();
	});
}