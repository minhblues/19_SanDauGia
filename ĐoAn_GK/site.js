$(() => {
    $(document).ready(() => {
        $("#Invalid-price").hide();
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

    $("#loginbutton").click(() => {
        location.href = "index.html";
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