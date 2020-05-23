// 点击取消出现的效果
function cancel(btn) {
    //input变p
    var contentElem = btn.parent().prev().children("input")
    var content = contentElem.val()
    var newContentElem = $("<p></p>").text(content)
    contentElem.after(newContentElem)
    contentElem.remove()
    //按钮变化
    btn.css("display", "none")
    btn.next().slideDown()
    btn.next().next().css("display", "none")
}

// 点击按钮的动态效果
$(".check button.btn-change[disabled!='disabled']").click(function () {
    //p变input
    var contentElem = $(this).parent().prev().children("p")
    var content = contentElem.text()
    contentElem.after("<input type='text' value=" + content + " />")
    contentElem.next().select()
    contentElem.remove()
    //按钮变化
    $(this).css("display", "none")
    $(this).prev().slideDown()
    $(this).next().slideDown()

})
$(".check button.btn-cancel[disabled!='disabled']").click(function () {
    cancel($(this))
})

// 修改后保存
$(".check button.btn-save[disabled!='disabled']").click(function () {
    var content = $(this).attr("content")
    var contentText = $(this).parent().prev().children("input").val()
    var thisBtn = $(this)
    var thisCancelBtn = $(this).prev().prev()
    $.post("/Teacher/ChangeOneInfo",
        {
            content: content,
            contentText: contentText,
        }, function (data, status) {
            cancel(thisCancelBtn)
            thisBtn.prev("[data-toggle='popover']").popover('show')
            window.setTimeout(function () { thisBtn.prev("[data-toggle='popover']").popover('hide') }, 2000)
        })
})