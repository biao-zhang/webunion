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

$(document).on('click','.lma_img',function () {
  var url = $(this).attr("src");
  showImg(url);
});
// 显示图片
function showImg(url){
  var sH = $(window).height();
  var sW = $(window).width();
  $("body").append('<div class="qupy_zz"></div>'+
    '<div class="qupy_ss">'+
    '<i class="dy_close"></i>'+
    '<img src="'+url+'"/>'+
    '</div>');
  var iH,iW,
    yH = $(".qupy_ss img").height(),
    yW = $(".qupy_ss img").width();
  if(yW <= (sW-100)){
    iW = yW;
    iH = yH;
  }else{
    iW = sW-100;
    iH = iW / yW * yH;
  }
  if(iH <= (sH-100)){
    iH = iH;
    iW = iW;
  }else{
    iH = sH-100;
    iW = iH / yH * yW ;
  }
  $(".qupy_ss img").height(iH).width(iW);
  $(".qupy_ss").height(iH).width(iW);
  $(".qupy_ss").css("top",(sH-iH)/2+"px").css("left",(sW-iW)/2+"px");
  $(".dy_close").click(function(){
    $(".qupy_zz").remove();
    $(this).parent(".qupy_ss").remove();
  });
}
