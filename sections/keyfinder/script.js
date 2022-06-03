// ********************************calculate*****************************************
function calculate(){
    submitRelation();
    getDF();
    if(control(Gleft,Gright,relation))
        keyfinder(Gleft,Gright,relation);
}
// *******************************get relation***************************************
var relation;
function submitRelation() {
    var  getedrelation = document.getElementById("GetRelation").value;
    relation = getedrelation.split(',').filter(element => element);
    console.log("The reletion: ");
    console.log(relation);
}
// ****************************Add and Remove a FD***********************************
document.getElementById('button_add').onclick = addfd;
document.getElementById('button_remove').onclick = removefd;
var original = document.getElementById('funcDs');
var fd = 0;

function addfd() {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "added" + ++fd; // there can only be one element with an ID
    original.parentNode.appendChild(clone);
    clone.firstElementChild.value = "";
    clone.lastElementChild.value = "";
}
function removefd() {
        const element = document.getElementById("added" + fd);
        element.remove();
        fd--;
}
// ********************************get FDs******************************************
var Gleft=[];
var Gright=[];
function getDF(){
    Gleft=[]; Gright=[]; //if we remove a df

    let  l = document.getElementsByClassName('left_');
    let  r = document.getElementsByClassName("right_");
    
    for(var O=0;O<l.length;O++){
        Gleft[O]=l[O].value.split(',').filter(element => element);
    }
    console.log('All the left hand we have');
    console.log(Gleft);
    
    for(O=0;O<r.length;O++){
        Gright[O]=r[O].value.split(',').filter(element => element);
    }
    console.log('ALL the right hand we have ');
    console.log(Gright);
}
//************************closure calculate functions*******************************
function closure(Gleft,Gright,Co,relation)
{   
    var odds=Array.from(Co);
    let i,j,add,moved=1;
    while(moved)  //while we add an attribute to the set search if it help to add another one else break
    {
        moved=0;
        for(i=0; i < Gleft.length; i++)
        {
            add=0;
            for(j=0; j<Gleft[i].length; j++)
            {
                if(check(Gleft[i][j],odds))
                {
                    add=0;
                    break;
                }
                else
                    add=1;
            }
            if(add)
                for(j=0; j<Gright[i].length; j++)
                {
                    if(check(Gright[i][j],odds))
                    {
                        odds.push(Gright[i][j]);
                        moved=1;
                    }
                }
        }
    }
    if(odds.length!=relation.length)
        return 0;
    return 1;
}
//*************************combinations getter**************************
function getCombinations( Relation ){
    var comb = [];
    var combinationsCount = (1 << Relation.length); //0001 << relation.lenght(0101) = 00010101
    for (var i = 1; i < combinationsCount ; i++ , comb.push(combination) )
        for (var j=0, combination = [];j<Relation.length;j++)
            if ((i & (1 << j)))       //0001 << j(0101) = 00010101
                combination.push(Relation[j]);
    return comb;
}
//************************Key Finder*************************************
function keyfinder(Gleft,Gright,Relation){
    var keys=[];
    var outp=[];
    if((Gleft.length==1 && Gleft[0][0]==null) || (Gright.length==1 && Gright[0][0]==null)){
        keys=Array.from(Relation);
        outp[outp.length]=keys.join('');
    }
    else{
    var candidates=getCombinations(Relation);
    var keys=[];
    var sortedArr = candidates.sort((a, b) => a.length - b.length);
    console.log('sorted combinations:' ); 
    console.log(sortedArr);
     for(let i=0;i<sortedArr.length;i++){
         if(closure(Gleft,Gright,sortedArr[i],relation)){
             keys[0]=Array.from(sortedArr[i]);
             var lengStop=sortedArr[i].length;
             var j=i+1;
             while(sortedArr[j].length == lengStop){
                 if(closure(Gleft,Gright,sortedArr[j],relation)){
                     console.log(j);
                     keys[keys.length]=Array.from(sortedArr[j]);
                 }
                 j++;
             }
             break;
         }
    }
    for(i=0;i<keys.length;i++)
        outp[outp.length]=keys[i].join('');
    }
    console.log("keys:")
    console.log(keys);
    console.log("output:")
    console.log(outp);
    document.getElementById('outp').innerHTML='[' + outp + ']';
}
//*****************************************************
function check(tocheck,set)
{
    let i,n;
    if(set.length==0)
        n=1;
    else
        n=set.length;
    for(i=0; i<set.length; i++)
        if(tocheck === set[i])
            return  0;
    return 1;
}
//*******************************control******************************
function control(Gleft,Gright,relation){
    var res = true;
    var un=0;
    if(!relation.length){
        alert("Add minimum one attribute to the Relation!");
        res = false;
    }
    for(var i=0;i<Gleft.length;i++){
            un=0;
            for(var j=0;j<Gleft[i].length;j++){
                if(check(Gleft[i][j],relation))
                    un++;
            }
            if(un){
                if(un==1){
                    alert("Undeclared attribute in the left hand number "+ (i+1) + "!");
                    res = false;
                }
                else{
                    alert(un + " Undeclared attributes in the left hand number "+ (i+1) + "!");
                    res = false;
                }
            }
    }
    for(var i=0;i<Gright.length;i++){
            un=0;
            for(var j=0;j<Gright[i].length;j++){
                if(check(Gright[i][j],relation))
                    un++;
            }
            if(un){
                if(un==1){
                    alert("Undeclared attribute in the right hand number "+ (i+1) + "!");
                    res = false;
                }
                else{
                    alert(un + " Undeclared attributes in the right hand number "+ (i+1) + "!");
                    res = false;
                }
            }
        }
    return res;
}
function toggleMenu(){
    let bar =document.querySelector('.navigationbar');
    let toggle =document.querySelector('.toggle');
    bar.classList.toggle('active');
    toggle.classList.toggle('active');
}
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
function comming(){
    alert('Comming soon !');
}