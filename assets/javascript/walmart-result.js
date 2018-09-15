//API call on button click to return clothing based on the conditions of the travel destination
$(".btn").on("click", function (event) {
    event.preventDefault();
    let url = "http://api.walmartlabs.com/v1/items/12417832?format=json&apiKey=ynrzuemzj5bu52nn4g54nyx2";})
    //the 12417832 is the item id for lookup, so that number will need to change per condition change
    