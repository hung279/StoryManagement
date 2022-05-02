$(document).ready(function () {
    console.log('dataUser', dataUser);

    $('#username-acc').val(dataUser[1].username);
    $('#name-acc').val(dataUser[2].name);
    $('#email-acc').val(dataUser[3].email);
    $('#phone-acc').val('0' + dataUser[4].phone);
    $('.btn-update-acc').attr("data-id", dataUser[0].id);
    $('.btn-changepass-acc').attr("data-id", dataUser[0].id);
});
$('.btn-changepass').click(function () {
    $('.changepass').show();
    $('.myaccount').hide();
});
$('.btn-myaccount').click(function () {
    $('.myaccount').show();
    $('.changepass').hide();
});
