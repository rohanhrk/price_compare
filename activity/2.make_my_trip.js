//choose check_in date
function checkinFn(rowSel, colSel, date) {
    let row = document.querySelectorAll(rowSel);
    for(let i=0 ; i<row.length ; i++) {
        let col = row[i].querySelectorAll(colSel);
        for(let j=0 ; j<col.length ; j++) {
            let currDate = col[j].innerText;
            if(currDate == date) {
                return col[j].click();
            }
        }
    }
}

//choose check_out date
function checkoutFn(rowSel, colSel, date) {
    let row = document.querySelectorAll(rowSel);
    for(let i=0 ; i<row.length ; i++) {
        let col = row[i].querySelectorAll(colSel);
        for(let j=0 ; j<col.length ; j++) {
            let currDate = col[j].innerText;
            if(currDate == date) {
                return col[j].click();
            }
        }
    }
}

//room select for multiple people and click apply button
function roomSelectFn(adultCountSel, addButtonSel, applyButtonSel , people) {
    let count = people;
    let apply = document.querySelectorAll(applyButtonSel);
    while(count > 3) {
        let row = document.querySelectorAll(adultCountSel);
        let add = document.querySelectorAll(addButtonSel);
        row[2].click();
        add[0].click();
        count = count-3;
    }
    let row = document.querySelectorAll(adultCountSel);
    row[count-1].click();

    apply[0].click();
}

//top 5 search list
function topSearchListFn(hotelNameSel, ratingSel, addressSel, priceSel, urlSel) {
    let hotelName = document.querySelectorAll(hotelNameSel);
    let rating = document.querySelectorAll(ratingSel);
    let address = document.querySelectorAll(addressSel);
    let price = document.querySelectorAll(priceSel);
    let url = document.querySelectorAll(urlSel);
    let hotelListArr = [];
    for(let i=0 ; i<5; i++) {
        hotelListArr.push({
            hotelName : hotelName[i].innerText,
            //rating -> 4.2/5 (Very Good)\n\n3155 RATINGS
            rating:[rating[i].innerText.split("\n\n")[0], rating[i].innerText.split("\n\n")[1] ],
            address:address[i].innerText,
            price:price[i].innerText,
            link: "https://"+url[i].getAttribute("href").split("//")[1]
        })
    }

    return hotelListArr;
}
module.exports ={
    checkinFn,
    checkoutFn,
    roomSelectFn,
    topSearchListFn,
}