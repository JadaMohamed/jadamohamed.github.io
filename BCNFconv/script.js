// ********************************calculate*****************************************
function calculate(){
    submitRelation();
    getDF();
    if(control(Gleft,Gright,relation))
        decompose(Gleft,Gright,relation);
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
var df = 0;

function addfd() {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "added" + ++df; // there can only be one element with an ID
    original.parentNode.appendChild(clone);
    clone.firstElementChild.value = "";
    clone.lastElementChild.value = "";
}
function removefd() {
        const element = document.getElementById("added" + df);
        element.remove();
        df--;
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
function closure(Gleft,Gright,THIS,relation)
{   
    var odds=[];
    odds=Array.from(THIS);
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
//*******************************************
function decompose(Gleft,Gright,Re){
    var Rs=[],ToRemove=[],De=0;
    Rs[0]=Array.from(Re);
    for (let i = 0; i < Gleft.length; i++) {
        if(!closure(Gleft,Gright,Gleft[i],Re)){
            console.log(Gleft[i] + " is NOT A KEY ");
            Rs[Rs.length]=PushHands(Gright[i],Gleft[i]);
            ToRemove=ToRemove.concat(Gright[i]);
            De=1;
        }
    }
    if(De){
        console.log("Remove underneath from original (Re=Rs[0]):");
        console.log(ToRemove);
        Rs[0]=Re.filter( ( el ) => !ToRemove.includes( el ) );
        j=i=0;
        document.getElementById('outp').innerHTML =''; //cus we did += to innerHTML underneath
        while(i!=Rs.length){
            document.getElementById('outp').innerHTML += ' R' + ++j + '(' + Rs[i] + ') ';
            i++;
        }
    }
    else{
        document.getElementById('outp').innerHTML = 'R(' + Re + ') is already in BCNF';
    }
    console.log('Rs:  ');
    console.log(Rs);
}
//*************************************
function PushHands(Gr,Gl){
        var e=[];
        for(let j=0;j<Gl.length;j++) e.push(Gl[j]);
        for(let j=0;j<Gr.length;j++) e.push(Gr[j]);
    return e;
}
//************************************
function check(tocheck,set) //if tocheck exist in set return 0 else 1
{
    let i;
    if(set.length==0)
        n=1;
    else
        n=set.length;
    for(i=0; i<set.length; i++)
        if(tocheck === set[i])
            return  0;
    return 1;
}
//************************************
function control(Gleft,Gright,relation){
    var res = true;
    var un=0;
    if(!relation.length){
        alert("Add minimum one attribute to the Relation!");
        res = false;
    }
    for(let i=0;i<Gleft.length;i++)
    {
        for(let j=0;j<Gleft[i].length;j++)
        {
            if(!check(Gleft[i][j],Gright[i]) || !check(Gright[i][j],Gleft[i])){
                alert("An attribute has to be in one hand side check FD N°" + (i+1) + "!");
                res=false;
                break;
            }
        }
    }
    for(var i=0;i<Gleft.length;i++){
        if(Gleft[i].length==0 || Gright[i].length==0){
            alert("Empty or not completed DF N°"+ (i+1) + "!");
            res = false;
        }
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