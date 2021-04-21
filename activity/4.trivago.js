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
function peopleAdd(addultNroomAddSel,applySel, peopleCount, roomWants) {
    let addultAdd = document.querySelectorAll(addultNroomAddSel)[0];
    let roomAdd = document.querySelectorAll(addultNroomAddSel)[2];
    let count = peopleCount-2;
    let room = roomWants-2;
    while(count>0) {
        addultAdd.click();
        count--;
    }

    while(room>0) {
        roomAdd.click();
        room--;
    }

    document.querySelector(applySel).click();
}

//top 5 search list
function topSearchListFn(hotelNameSel, ratingSel, addressSel, priceSel) {
    let hotelName = document.querySelectorAll(hotelNameSel);
    let rating = document.querySelectorAll(ratingSel);
    let address = document.querySelectorAll(addressSel);
    let price = document.querySelectorAll(priceSel);
    let hotelListArr = [];
    for(let i=0 ; i<5; i++) {
        hotelListArr.push({
            hotelName : hotelName[i].innerText,
            rating: rating[i].innerText,
            address:address[i].innerText,
            price:price[i].innerText
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