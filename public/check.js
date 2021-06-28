let time=document.getElementById("timepkr");
$("#timepikr").on('change',function(){
    alert("change");
})


function check(){
    if(time.value=="10:00"){
        alert("its 10");
    }
    else{
        alert("Not 10");
    }
}