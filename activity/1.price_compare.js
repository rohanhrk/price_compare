const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const make_My_trip_Obj = require("./2.make_my_trip");
const airbnbObj = require("./3.airbnb");
const trivagoObj = require("./4.trivago");
const pathOfFolder = "C:\\Users\\abc\\Desktop\\PAB";

const linksObj = {
    makeMytrip: "https://www.makemytrip.com/hotels",
    airbnb: "https://www.airbnb.co.in",
    trivago: "https://www.trivago.in/"
}

const detObj = {
    location: process.argv[2],//manali
    checkIn: process.argv[3],//22
    checkOut: process.argv[4],//25
    peopleCount: process.argv[5],//6
    roomWants: process.argv[6],//2
}
let cTab;

function createfile(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.openSync(filePath, "w");
    }
}

//create a folder of hotal_price_compare
let folderToMake = path.join(pathOfFolder, "hotel_price_compare");
if (fs.existsSync(folderToMake) == false) {
    fs.mkdirSync(folderToMake);
}

(async function fn() {
    try {
        let browserOpenPromis = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        let browser = await browserOpenPromis;
        let allTabsArr = await browser.pages();
        cTab = allTabsArr[0];

        console.log("Hotel list of make_My_trip =>");
        let hotelList1 = await getListingFromMakeMyTrip(linksObj.makeMytrip, detObj);//code for scrap hotel list
        let fileName1 = linksObj.makeMytrip.split(".")[1];//makemytrip
        let filePath1 = path.join(folderToMake, fileName1 + ".json");
        createfile(filePath1);
        jsonFn(filePath1,hotelList1);

        console.log("hotel list of airbnb =>");
        let hotelList2 = await getListingFromAirbnb(linksObj.airbnb, detObj);//code for scrap hotel list
        let filename2 = linksObj.airbnb.split(".")[1];//airbnb
        let filePath2 = path.join(folderToMake, filename2 + ".json");
        createfile(filePath2);
        jsonFn(filePath2,hotelList2);

        console.log("hotel list of Trivago => ");
        let hotelList3 = await getListingFromTrivago(linksObj.trivago, detObj);//code for scrap hotel list
        let filename3 = linksObj.trivago.split(".")[1];//trivago
        let filePath3 = path.join(folderToMake, filename3 + ".json");
        createfile(filePath3);
        jsonFn(filePath3,hotelList3);
    } catch (err) {
        console.log(err);
    }

})();

async function getListingFromMakeMyTrip(link, detObj) {
    try {
        //go to home page of makeMyTrip
        await cTab.goto(link);
        
        //1. typing location in search box and enter press
        await cTab.waitForSelector("#PROMOTIONS .slick-slider.slick-initialized", { visible: true });
        await cTab.click("div .hsw_inputBox.selectHtlCity");
        await cTab.waitForSelector(".react-autosuggest__input.react-autosuggest__input--open", { visible: true });
        await cTab.click(".react-autosuggest__input.react-autosuggest__input--open");//click on enter city box
        await cTab.type(".react-autosuggest__input.react-autosuggest__input--open", detObj.location, { delay: 300 });//typing location where you want to stay
        await cTab.waitForSelector(".locusLabel.appendBottom5", { visible: true });//wait for suggestion list
        await cTab.click(".locusLabel.appendBottom5");//click first of list
        await cTab.waitFor(1000);
        console.log("location selected");

        //2. select check_in date
        await cTab.click("#checkin");//click on check_in_date
        await cTab.waitForSelector("#checkin", { visible: true });//wait for date table
        await cTab.evaluate(make_My_trip_Obj.checkinFn, "div .DayPicker-Week", "div .DayPicker-Day", detObj.checkIn);
        await cTab.waitFor(1000);
        console.log("clicked on checkin");

        //3. select check_out date
        await cTab.click("#checkout");//click on check_in_date
        await cTab.waitForSelector("#checkout", { visible: true });//wait for date table
        await cTab.evaluate(make_My_trip_Obj.checkoutFn, "div .DayPicker-Week", "div .DayPicker-Day", detObj.checkOut);
        await cTab.waitFor(1000);
        console.log("clicked on checkout");

        //4. fill up count of people stay 
        await cTab.click(".hsw_inputField.guests.font20");//click on room & guests box
        await cTab.waitForSelector("div .roomsGuests", { visible: true });
        await cTab.evaluate(make_My_trip_Obj.roomSelectFn, "ul[data-cy='adultCount'] li", "button[data-cy='addAnotherRoom']", "button[data-cy='submitGuest']", detObj.peopleCount);
        await cTab.waitFor(1000);
        console.log("successfully applied");

        //5. click search button
        await cTab.click("button[data-cy='submit']");
        await cTab.waitFor(1000);
        console.log("search completed");

        //top 5 Searced hotel Name,rating, address, price Collect,url of hotel
        await cTab.waitForSelector(".makeFlex.flexOne.padding20.relative.lftCol", { visible: true });
        await cTab.waitFor(5000);
        await scrollToBottom();
        let HotellistObj = await cTab.evaluate(make_My_trip_Obj.topSearchListFn, "#hlistpg_hotel_name", "div .noShrink.appendLeft20", ".font12.grayText.latoBold.appendBottom5", ".latoBlack.font26.blackText.appendBottom5", "div .listingRowOuter a");
        return HotellistObj;


    } catch (err) {
        console.log(err);
    }

}


async function getListingFromAirbnb(link, detObj) {
    try {
        //go to home page of airbnb
        await cTab.goto(link);
        await cTab.waitForSelector("._1qnlffd6");
        await cTab.click("._1qnlffd6");

        //1. typing location in search box and enter press
        await cTab.click("div ._1xq16jy");
        await cTab.type("div ._1xq16jy", detObj.location, { delay: 200 });
        await cTab.keyboard.press('Enter');
        await cTab.waitFor(1000);
        console.log("location selected");


        //2. select check_in date
        await cTab.click("div ._uh2dzp");
        await cTab.click("div ._uh2dzp");
        await cTab.evaluate(airbnbObj.checkinFn, "table._cvkwaj tr", "._f8btejl", detObj.checkIn);
        await cTab.waitFor(1000);
        console.log("clicked on checkin");

        //3. select check_out date
        await cTab.click("div ._uh2dzp");
        await cTab.click("div ._uh2dzp");
        await cTab.evaluate(airbnbObj.checkoutFn, "table._cvkwaj tr", "._f8btejl", detObj.checkOut);
        await cTab.waitFor(1000);
        console.log("clicked on checkOut");

        //4. fill up count of people stay 
        await cTab.click("div ._uh2dzp");
        await cTab.waitForSelector("._8ovatg");
        await cTab.evaluate(airbnbObj.peopleAdd, "._1573fat [aria-label='increase value']", detObj.peopleCount);
        await cTab.waitFor(1000);
        console.log("successfully applied");

        //5. click search search button
        await cTab.click("._163rr5i");
        await cTab.waitFor(1000);
        console.log("search completed");

        //top 5 Searced hotel Name,rating, address, price Collect
        await cTab.waitForSelector("._1mleygo ._5kaapu", { visible: true });
        await cTab.waitFor(5000);
        await scrollToBottom();
        let HotellistObj = await cTab.evaluate(airbnbObj.topSearchListFn, "._1mleygo ._5kaapu", "._h34mg6 ._1hxyyw3", "._r6zroz ._1tanv1h", "._1c02cnn", "._mm360j");
        return HotellistObj;

    } catch (err) {
        console.log(err);
    }

}

async function getListingFromTrivago(link, detObj) {
    try {
        //go to home page of trivago
        await cTab.goto(link);

        //1. typing location in search box and enter press
        await cTab.click("#querytext");
        await cTab.type("#querytext", detObj.location, { delay: 200 });
        await cTab.keyboard.press('Enter');
        await cTab.waitFor(1000);

        //2. select check_in date
        await cTab.waitForSelector(".two-month-calendar", { visible: true });
        await cTab.evaluate(trivagoObj.checkinFn, ".cal-month tbody tr", ".cal-month tbody td", detObj.checkIn);
        await cTab.waitFor(1000);
        console.log("clicked on checkin");

        //3. select check_Out date
        await cTab.waitForSelector(".two-month-calendar", { visible: true });
        await cTab.evaluate(trivagoObj.checkoutFn, ".cal-month tbody tr", ".cal-month tbody td", detObj.checkOut);
        await cTab.waitFor(1000);
        console.log("clicked on checkout");

        //4. fill up count of people stay 
        await cTab.waitForSelector(".guest-selector__content.clearfix", { visible: true });
        await cTab.evaluate(trivagoObj.peopleAdd, ".circle-btn.circle-btn--plus", "[data-role='applyConfigBtn']", detObj.peopleCount, detObj.roomWants);
        await cTab.waitFor(1000);
        console.log("successfully applied");

        //5. click search button
        await cTab.click(".search-button__label");
        await cTab.waitFor(1000);
        console.log("search completed");

        //top 5 Searced hotel Name,rating, address, price Collect
        await cTab.waitForSelector(".item-link.name__copytext", { visible: true });
        await cTab.waitFor(5000);
        await scrollToBottom();
        let HotellistObj = await cTab.evaluate(trivagoObj.topSearchListFn, ".item-link.name__copytext", ".review", ".details-paragraph.details-paragraph--location.location-details", ".accommodation-list__price--3bf8a");
        return HotellistObj;
    } catch (err) {
        console.log(err);
    }
}

//scroll to bottom
async function scrollToBottom() {
    await cTab.evaluate(goToBottom);
    function goToBottom() {
        let totalHeight = 0
        let distance = 100
        let timer = setInterval(() => {
            let scrollHeight = document.body.scrollHeight
            window.scrollBy(0, distance)
            totalHeight += distance
            if (totalHeight >= scrollHeight) {
                clearInterval(timer)
                resolve()
            }
        }, 200)
    }
}

// store data in json file
function jsonFn(filePath,hotelList) {
    let arr = [];
    let content = fs.readFileSync(filePath, "utf8");

    if (content.length == 0) {
        arr.push(hotelList);

        let contentinfile = JSON.stringify(arr);
        fs.writeFileSync(filePath, contentinfile);
    }
    // update 
    else if (content.length > 0) {
        let contArr = JSON.parse(content);
        contArr.push(hotelList)
        let contentinfile = JSON.stringify(contArr);
        fs.writeFileSync(filePath, contentinfile);
    }
}

