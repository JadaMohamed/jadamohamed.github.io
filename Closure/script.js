// ********************************calculate*****************************************
function calculate(){
    submitRelation();
    getDF();
    submitset();
    if(control(Gleft,Gright,theSet,relation)){
        closure(Gleft,Gright,theSet);
    }
}
// *******************************get relation***************************************
var relation;
function submitRelation() {
    var  getedrelation = document.getElementById("GetRelation").value;
    console.log("The reletion: " + getedrelation);
    relation = getedrelation.split(',').filter(element => element);
    console.log(getedrelation);
    console.log(relation);
}
// ****************************Add and Remove a FD***********************************
document.getElementById('button_add').onclick = addfd;
document.getElementById('button_remove').onclick = removefd;
var original = document.getElementById('funcDs');
var i = 0;

function addfd() {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "added" + ++i; // there can only be one element with an ID
    original.parentNode.appendChild(clone);
    clone.firstElementChild.value = "";
    clone.lastElementChild.value = "";
}
function removefd() {
        const element = document.getElementById("added" + i);
        element.remove();
        i--;
}
// ********************************output********************************************
    const val = document.getElementById('GetSet');
    val.addEventListener('input', () => {
        document.getElementById("GetedSet").innerHTML = val.value;
        document.getElementById("calc_res").innerHTML = '{}';
    });
// ********************************get set*******************************************
    var theSet;

    function submitset() {
        var  getedSet = document.getElementById("GetSet").value;
        console.log("The set: " + getedSet);
        theSet = getedSet.split(',').filter(element => element);
        console.log("The set: ");
        console.log(theSet);
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
function closure(Gleft,Gright,theSet)
{
    let i,j,add,moved=1;
    while(moved)  //while we add an attribute to the set search if it help to add another one else break
    {
        moved=0;
        for(i=0; i < Gleft.length; i++)
        {
            add=0;
            for(j=0; j<Gleft[i].length; j++)
            {
                if(check(Gleft[i][j],theSet))
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
                    if(check(Gright[i][j],theSet))
                    {
                        theSet.push(Gright[i][j]);
                        moved=1;
                    }
                }
        }
    }
    console.log("result:");
    console.log(theSet);
    document.getElementById('calc_res').innerHTML= '{'+theSet+'}';
}

function check(tocheck,set)
{
    let i;
    for(i=0; i<set.length; i++)
        if(tocheck === set[i])
            return  0;
    return 1;
}
//*******************************control******************************
function control(Gleft,Gright,theSet,relation){
    var res = true;
    var un=0;
    if(!relation.length){
        alert("Add minimum one attribute to the Relation!");
        res = false;
    }
    if(!theSet.length){
        alert("Add minimum one attribute to the Set!");
        res = false;
    }
    else
        for(var i=0;i<theSet.length;i++){
            if(check(theSet[i],relation))
                un++;
        }
    if(un){
        if(un==1)
            alert("Undeclared attribute in the Set input!");
        else
            alert(un + " Undeclared attributes in the Set input!");
            res = false;
    }
/*if(Gleft.length==1 && Gleft[0].length==0 || Gright.length==1 && Gright[0].length==0){
            alert("Add minimum one Functional dependency !");
            res = false;
    }*/
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
//********************pop-up**********************
function toogle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}