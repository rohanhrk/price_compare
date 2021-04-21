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

//room select for multiple people
function peopleAdd(addultAddSel, peopleCount) {
    let addultAdd = document.querySelectorAll(addultAddSel)[0];
    let count = peopleCount;
    while(count>0) {
        addultAdd.click();
        count--;
    }
}

//top 5 search list
function topSearchListFn(hotelNameSel, ratingSel, addressSel, priceSel, bodySel) {
    let hotelName = document.querySelectorAll(hotelNameSel);
    let rating = document.querySelectorAll(ratingSel);
    let address = document.querySelectorAll(addressSel);
    let price = document.querySelectorAll(priceSel);
    let body = document.querySelectorAll(bodySel);
    let hotelListArr = [];
    for(let i=0 ; i<5; i++) {
        hotelListArr.push({
            hotelName : hotelName[i].innerText,
            //rating -> 4.2/5 (Very Good)\n\n3155 RATINGS
            rating:rating[i].innerText,
            address:address[i].innerText.split("\n\n")[0],
            price:price[i].innerText.split("\n")[0],
            link:"https://www.airbnb.co.in"+body[i].getAttribute("href")
        })
    }

    return hotelListArr;
}

module.exports = {
    checkinFn,
    checkoutFn,
    peopleAdd,
    topSearchListFn,
    
}