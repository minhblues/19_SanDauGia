$(() => {
    $(document).ready(() => {
        $("#Invalid-price").hide();
        $('header').append('<div class="container-fluid"> <div class="row align-items-center justify-content-center"> <div class="col-lg-11"> <nav class="navbar navbar-expand-lg navbar-light"> <a class="navbar-brand" href="index.html"> <img width="50" height="50" src="img/logo.png" alt="logo"> </a> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="menu_icon"><i class="fas fa-bars"></i></span> </button> <div class="collapse navbar-collapse main-menu-item" id="navbarSupportedContent"> <ul class="navbar-nav"> <li class="nav-item"> <a class="nav-link" href="index.html">Trang chủ</a> </li><li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Sản phẩm </a> <div class="dropdown-menu" aria-labelledby="navbarDropdown_1"> <a class="dropdown-item" href="phone.html"> Điện thoại di động </a> <a class="dropdown-item" href="maytinhxachtay.html"> Máy tính xách tay </a> </div></li><li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Sản phẩm của tôi </a> <div class="dropdown-menu" aria-labelledby="navbarDropdown_2"> <a class="dropdown-item" href="PostProduct.html"> Đăng sản phẩm </a> <a class="dropdown-item" href="">Sản phẩm đang đấu giá</a> </div></li><li class="nav-item"> <a class="nav-link" href="mybid.html"> Đấu giá của tôi </a> </li><li class="nav-item"> <a class="nav-link" href="cart.html"> <i class="fa fa-shopping-cart pr-2"></i> Giỏ hàng</a> </li><li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fas fa-user-tie"></i> </a> <div class="dropdown-menu" aria-labelledby="navbarDropdown_2"> <a class="dropdown-item" href="profile.html"> Tài khoản của tôi </a> <a class="dropdown-item" href="wishlist.html">Sản phẩm yêu thích</a> <a class="dropdown-item" href="comment.html">Nhận xét của tôi </a> <a class="dropdown-item" href="login.html">Đăng xuất </a> </div></li></ul> </div><input type="text"><div class="hearer_icon d-flex"> <a id="search_1" href="javascript:void(0)"><i class="ti-search"></i></a> </div></nav> </div></div></div>');
        $('footer').append('<div class="container"> <div class="row justify-content-between"> <div class="col-sm-6 col-lg-2"> <div class="single_footer_part"> <h4>Category</h4> <ul class="list-unstyled"> <li><a href="dienthoaididong.html">Điện thoại di động</a></li><li><a href="maytinhxachtay.html">Máy tính xách tay</a></li></ul> </div></div><div class="col-sm-6 col-lg-2"> <div class="single_footer_part"> <h4>Company</h4> <ul class="list-unstyled"> <li><a href="">About</a></li><li><a href="">News</a></li><li><a href="">FAQ</a></li><li><a href="">Contact</a></li></ul> </div></div><div class="col-sm-6 col-lg-3"> <div class="single_footer_part"> <h4>Address</h4> <ul class="list-unstyled"> <li><a href="#">University of science</a></li><li><a href="#">+10 456 267 1678</a></li><li><span>team19@gmail.com</span></li></ul> </div></div><div class="col-sm-6 col-lg-4"> <div class="single_footer_part"> <h4>Newsletter</h4> <div id="mc_embed_signup"> <form target="_blank" action="#" method="get" class="subscribe_form relative mail_part"> <input type="email" name="email" id="newsletter-form-email" placeholder="Email Address" class="placeholder hide-on-focus" onfocus="this.placeholder=""" onblur="this.placeholder="Email Address""> <button type="submit" name="submit" id="newsletter-submit" class="email_icon newsletter-submit button-contactForm">subscribe</button> <div class="mt-10 info"></div></form> </div><div class="social_icon"> <a href="#"><i class="ti-facebook"></i></a> <a href="#"><i class="ti-twitter-alt"></i></a> <a href="#"><i class="ti-instagram"></i></a> </div></div></div></div></div>')
        $('#search_input').hide()
        $('#search_1').click($('#search_input').show());
        $('#close_search').click($('#search_input').hide())
    });

    $("#Auction").click(() => {

        var price_auction = $("#price_auction"),
            current_price = $("#current-price");
        if (price_auction.val() <= current_price.text())
            $("#Invalid-price").show();
        else {
            $("#Invalid-price").hide();
            $("#history-table").append(
                '<tr>\
                    <th scope="row">4</th>\
                    <td>Bidder</td>\
                    <td>' + price_auction.val() + '</td>\
                </tr>'
            );
            current_price.html(price_auction.val());
            $("#current_bidder").html('Bidder');
            alert('Đấu giá thành công');
        };
    });


    $('.priceformat').each(() => {
        $(this).text().number(true, 0, '.', ',');
    });

    $('#addImage').click(() => {
        $('#addImage').before(
            '<input type="file" name="file_img">')
    });

    $('#Post').click(() => {
        alert('Đăng sản phẩm thành công')
    });


});

var checkName = () => {
    var x = document.getElementById('name').value;
    var y = ""
    if (y.length != x.length) return false;
    for (var i = 0; i <= x.length; i++) {
        if (x[i] != y[i]) {
            return false;
        }
    }
    return true;
}

var checkPass = () => {
    var x = document.getElementById('password').value;
    var y = ""
    if (y.length != x.length) return false;
    for (var i = 0; i <= x.length; i++) {
        if (x[i] != y[i]) {
            return false;
        }
    }
    return true;
}

var checkInf = () => {

    if (checkName() & checkPass()) {
        return true;
    }

    return false;
}