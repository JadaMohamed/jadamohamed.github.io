function toggleMenu(){
    let bar =document.querySelector('.navigationbar');
    let toggle =document.querySelector('.toggle');
    bar.classList.toggle('active');
    toggle.classList.toggle('active');
}
document.getElementById('result').disabled = true;
function calculate(){
    var b = parseInt(document.getElementById('bases').value),
    op = parseInt(document.getElementById('operation').value),
    n1 = parseInt(document.getElementById('input1').value,b),
    n2 = parseInt(document.getElementById('input2').value,b),
    R;
    switch (op){
        case 1: R = n1 + n2;
            break;
        case 2: R = n1 - n2;
            break;
        case 3: R = n1 * n2;
            break;
        case 4: R = n1 / n2;
            break;
    }
    R=R.toString(b);
    document.getElementById('result').value = R;
}
function swap(){
    var tmp=document.getElementById("input1").value;
    document.getElementById("input1").value= document.getElementById("input2").value;
    document.getElementById("input2").value=tmp;
}
function rest(){
    document.getElementById('input1').value="";
    document.getElementById('input2').value="";
    document.getElementById('result').value="";

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
if (localStorage.getItem('light-mode')===null){
    localStorage.setItem('light-mode', "false");
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
function comming(){
    alert('Comming soon !');
}
function copy() {
    var copyText = document.getElementById("result");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + copyText.value;
}
function outCopy() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}