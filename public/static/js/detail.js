let temp = 0;
$('.continue-detail').click(function () {
    if (temp % 2 == 0) {
        $('.description-detail-text').css("display", "block");
        temp++;
        $('.continue-detail').html('thu gọn')
    } else {
        $('.description-detail-text').css("display", "-webkit-box");
        $('.continue-detail').html('đọc tiếp')
        temp++;
    }
})