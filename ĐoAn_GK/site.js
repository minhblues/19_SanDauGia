$(document).ready(() => { $("#Invalid-price").hide() });

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
})