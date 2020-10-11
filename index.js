$(document).ready(function(){
    $("#submit").click(function(){
        var subtotal = getCost();
        $("#subtotal").val(`$${subtotal}`);
        var taxes = parseFloat((subtotal * 0.11).toPrecision(4));
        $("#taxes").val(`$${taxes}`);
        var total = (subtotal + taxes).toPrecision(5);
        $("#total").val(`$${total}`);
        //hide keyboard on mobile
        $("#average_kwh").blur();
        toggleOutput();
    });//end click 
    
    $("form").on("keydown", function(evt){
        if(evt.originalEvent["keyCode"] == 13){
            $("#submit").click();
        }
    });//end keydown

    $("#average_kwh").focus(function(){
        $("form > div:gt(0)").hide();
    });

    toggleOutput();
});

function toggleOutput(){    
    var input = $("#average_kwh");
    if(input.val() == ""){
        $("form > div:gt(0)").hide();
    }else{
        $("form > div:gt(0)").show();
    }
}

function getCost(){
    var averageKwh = parseFloat($("#average_kwh").val());
    const pricePerKwh = 0.128943662;
    var totalKwhThisMonth = (averageKwh * getDaysThisMonth());
    var totalCost = pricePerKwh * totalKwhThisMonth;
    return parseFloat(totalCost.toPrecision(5));
}

function getDaysThisMonth(){
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var tempMonth = currentMonth;
    var days = currentDate.getDate();;
    var tempDate = new Date();
    while(currentMonth == tempMonth){
        tempDate.setDate( tempDate.getDate() + 1 );
        tempMonth = tempDate.getMonth();
        if(tempMonth == currentMonth){
            days++;
        }
    }
    return days;
};