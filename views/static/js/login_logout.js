

$(function () {

    $(".input input").focus(function () {

        $(this).parent(".input").each(function () {
            $("label", this).css({
                "line-height": "18px",
                "font-size": "18px",
                "font-weight": "100",
                "top": "0px"
            })
            $(".spin", this).css({
                "width": "100%"
            })
        });
    }).blur(function () {
        $(".spin").css({
            "width": "0px"
        })
        if ($(this).val() == "") {
            $(this).parent(".input").each(function () {
                $("label", this).css({
                    "line-height": "60px",
                    "font-size": "24px",
                    "font-weight": "300",
                    "top": "10px"
                })
            });

        }
    });

    $(".button").click(function (e) {
        var pX = e.pageX,
            pY = e.pageY,
            oX = parseInt($(this).offset().left),
            oY = parseInt($(this).offset().top);

        $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
        $('.x-' + oX + '.y-' + oY + '').animate({
            "width": "500px",
            "height": "500px",
            "top": "-250px",
            "left": "-250px",

        }, 600);
        $("button", this).addClass('active');
    })

    $(".alt-2").click(function () {
        if (!$(this).hasClass('material-button')) {
            $(".shape").css({
                "width": "100%",
                "height": "100%",
                "transform": "rotate(0deg)"
            })

            setTimeout(function () {
                $(".overbox").css({
                    "overflow": "initial"
                })
            }, 600)

            $(this).animate({
                "width": "140px",
                "height": "140px"
            }, 500, function () {
                $(".box").removeClass("back");

                $(this).removeClass('active')
            });

            $(".overbox .title").fadeOut(300);
            $(".overbox .input").fadeOut(300);
            $(".overbox .button").fadeOut(300);

            $(".alt-2").addClass('material-buton');
        }

    })

    $(".material-button").click(function () {

        if ($(this).hasClass('material-button')) {
            setTimeout(function () {
                $(".overbox").css({
                    "overflow": "hidden"
                })
                $(".box").addClass("back");
            }, 200)
            $(this).addClass('active').animate({
                "width": "700px",
                "height": "700px"
            });

            setTimeout(function () {
                $(".shape").css({
                    "width": "50%",
                    "height": "50%",
                    "transform": "rotate(45deg)"
                })

                $(".overbox .title").fadeIn(300);
                $(".overbox .input").fadeIn(300);
                $(".overbox .button").fadeIn(300);
            }, 700)

            $(this).removeClass('material-button');

        }

        if ($(".alt-2").hasClass('material-buton')) {
            $(".alt-2").removeClass('material-buton');
            $(".alt-2").addClass('material-button');
        }

    });

});

$('.login').click(function () {
    let username = $('.username').val();
    let password = $('.password').val();
    let regexUser = /^[A-Za-z0-9_\.]{6,32}$/;  /*- Chứa các ký tự A đến Z, a đến z, 0-9 dấu .  và dấu gạch dưới Độ dài 6 đến 32 ký tự */
    let regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; /* Tối thiểu sáu ký tự, ít nhất một chữ cái và một số: */
    let check1 = regexUser.test(username);
    let check2 = regexPass.test(password);
    if (check1 && check2) {
        $('.alert').attr("style", "display:none");
        $.ajax({
            type: "POST",
            url: '../login/check',
            dataType: "JSON",
            data: { username, password },
            success: function (res) {
                if (res.res == true) {
                    let user = [{ "id": res.userDB.id }, { "username": res.userDB.user_name }, { "name": res.userDB.name }, { "email": res.userDB.email }, { "phone": res.userDB.phone }]
                    localStorage.setItem('user', JSON.stringify(user));
                    location.replace('/home');
                }
                else {
                    console.log('check', 'mật khẩu sai');
                    $('.alert').attr("style", "display:block");
                    $('.alert').text("Username or Password is wrong");
                }
            }
        });
    } else {
        $('.alert').attr("style", "display:block");
        $('.alert').text("Username or Password is wrong");
    }

})
$('.register').click(function () {
    let user = $('.user-register').val();
    let pass = $('.pass-register').val();
    let repass = $('.repass-register').val();
    let regexUser = /^[A-Za-z0-9_\.]{6,32}$/;  /*- Chứa các ký tự A đến Z, a đến z, 0-9 dấu .  và dấu gạch dưới Độ dài 6 đến 32 ký tự */
    let regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; /* Tối thiểu sáu ký tự, ít nhất một chữ cái và một số: */
    let check1 = regexUser.test(user);
    let check2 = regexPass.test(repass);
    let check3;
    if (pass == repass) {
        check3 = true;
    } else {
        check3 = false;
    }
    if (check1 && check2 && check3) {
        $('.content-modal').html('Checking...');
        console.log('user', user);
        console.log('pass', repass);
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/register',
            data: { user, repass },
            dataType: "JSON",
            success: function (res) {
                if (res.res == true) {
                    $('.content-modal').html(' Successfully created');
                    console.log('check', res.res)
                }
                else {
                    console.log('check', 'tồn tại user');
                    $('.content-modal').html('Username already exists')
                }
            }
        });

    } else {
        $('.content-modal').html('Error')
    }
})
$('.button').click(function () {
    var buttonId = $(this).attr('id');
    $('#modal-container').removeAttr('class').addClass(buttonId);
    $('body').addClass('modal-active');
})

$('#modal-container').click(function () {
    $(this).addClass('out');
    $('body').removeClass('modal-active');
});