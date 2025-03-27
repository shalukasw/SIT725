const clickMe = () => {
    alert("Hello Mate! Hope you have a G'day")
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#clickMeButton').click(()=>{
        clickMe();
    })
  });
