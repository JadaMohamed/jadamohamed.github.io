if (localStorage.getItem('light-mode')===null){
    localStorage.setItem('light-mode', "false");
}

checkStatus()

function checkStatus(){
    var elem= document.getElementById('DL');
    if (localStorage.getItem('light-mode')==="true"){
        document.body.classList.add('light-mode');
        elem.src="images/moon.png";
    }else{
        document.body.classList.remove('light-mode');
        elem.src="images/sun.png" ;
    }
}

function DL(){
    var elem= document.getElementById('DL');
     document.body.classList.toggle('light-mode');
    if(document.body.classList.contains('light-mode')){
        elem.src="images/moon.png";
    }
     else{
         elem.src="images/sun.png" ;
     }
 }


function changeStatus(){                                           
    if (localStorage.getItem('light-mode')==="true"){
        localStorage.setItem('light-mode', "false");
        DL();
    } else{
        localStorage.setItem('light-mode', "true");
        DL();
    }
}
function toggleMenu(){
    let bar =document.querySelector('.navigationbar');
    let toggle =document.querySelector('.toggle');
    bar.classList.toggle('active');
    toggle.classList.toggle('active');
}
function comming(){
    alert('Comming soon !');
}