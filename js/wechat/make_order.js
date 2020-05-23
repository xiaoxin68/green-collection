$(".add button").click(function(){
	var need_add = $(this).parent().parent().parent().children(".bag").html()
	$(this).parent().parent().before(need_add)
})
