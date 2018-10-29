$(function() {
	$(".webm_sp").click(function(){
		$(".web_zz").show();
		$(".web_box").show();
	});
	$(".web_close,.web_cancel").click(function(){
		$(".web_zz").hide();
		$(".web_box").hide();
	});
	$(".lma_a").click(function(){
		$(".adcode_zz").show();
		$(".adcode_box").show();
	});
	$(".adcode_close").click(function(){
		$(".adcode_zz").hide();
		$(".adcode_box").hide();
	});
});