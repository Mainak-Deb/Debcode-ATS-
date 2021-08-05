 db = new Localbase('db')


var makearr=[]
var newset=skills.slice()
console.log(newset)
function loadskills(){
    programming_skills=``
    for(i=0;i<newset[0].length;i++){
        programming_skills+=`<section class="selectskill" onclick="addthis(0`+`,`+String(i)+`)"  >`+newset[0][i] +`➕</section>`
    }
    document.getElementById("programming").innerHTML = programming_skills;

    console.log(programming_skills)

    markdown_skills=``
    for(i=0;i<newset[1].length;i++){
        markdown_skills+=`<section class="selectskill" onclick="addthis(1`+`,`+String(i)+`)"  >`+newset[1][i] +`➕</section>`
    }
    document.getElementById("markdown").innerHTML = markdown_skills;



    technicalskills_skills=``
    for(i=0;i<newset[2].length;i++){
        technicalskills_skills+=`<section class="selectskill" onclick="addthis(2`+`,`+String(i)+`)"  >`+newset[2][i] +`➕</section>`
    }
    document.getElementById("technicalskills").innerHTML = technicalskills_skills;



    frameworks_skills=``
    for(i=0;i<newset[3].length;i++){
        frameworks_skills+=`<section class="selectskill" onclick="addthis(3`+`,`+String(i)+`)"  >`+newset[3][i] +`➕</section>`
    }
    document.getElementById("frameworks").innerHTML = frameworks_skills;



    databases_skills=``
    for(i=0;i<newset[4].length;i++){
        databases_skills+=`<section class="selectskill" onclick="addthis(4`+`,`+String(i)+`)"  >`+newset[4][i] +`➕</section>`
    }
    document.getElementById("databases").innerHTML = databases_skills;



    hosting_skills=``
    for(i=0;i<newset[5].length;i++){
        hosting_skills+=`<section class="selectskill" onclick="addthis(5`+`,`+String(i)+`)"  >`+newset[5][i] +`➕</section>`
    }
    document.getElementById("hosting").innerHTML = hosting_skills;


}

function submitskills(){
    newskills=``
    for(i=0;i<makearr.length;i++){
        newskills+=`<section class="theskill" onclick="removethis('`+makearr[i]+`')"  >`+makearr[i] +` ❌</section>`
    }
    document.getElementById("submitsklills").innerHTML = newskills;

}

function addthis(m,n){
    if(!makearr.includes(newset[m][n])){
        makearr.push(newset[m][n]);
    }
    console.log(makearr)
    submitskills();
}

function removethis(s){
    var index = makearr.indexOf(s);
    console.log(index)
    if (index > -1) {
        makearr.splice(index, 1);
    }
    submitskills();
}

function showtoogle(){
    var x = document.getElementById("addcontainer");
    var y = document.getElementById("addremove");

    if (x.style.display == "none") {
        x.style.display = "block";
        y.innerHTML="Hide skillset"
    } else {
        x.style.display = "none";
        y.innerHTML="Add skillset"
    }
}

loadskills();
submitskills();

function addframe(n,s){
    console.log(typeof(parseInt(s)))
    var showskillset = document.getElementById("yourchoose2");
    db.collection('jobnames').doc({ id: parseInt(s) }).get().then(document => {
        console.log(document)
        newskills=``
        var skillnames=document.skillarray;
        for(i=0;i<skillnames.length;i++){
            newskills+=`<section class="theskill"  >`+skillnames[i] +` ❌</section>`
        }
        console.log(newskills)
        showskillset.innerHTML=newskills;
        db.collection('current_skills').doc('curski').update({
            id: parseInt(s),
            name: String(n),
            skillarray:skillnames
          })
      })
    //   window.location.href = '/index.html';
}
function addnewskillset(){
    var jobname = document.getElementById("jobname").value;
    var skillarray=makearr.slice()
    db.collection('jobnames').add({
            id: Date.now(),
            name: String(jobname),
            skillarray:skillarray
          })
    
    radiomakers();
    location.reload();
}
db.collection('current_skills').add({
    id: Date.now(),
    name: "Nothing",
    skillarray:[]
  }, 'curski')


function radiomakers(){
    db.collection('jobnames').get().then(cols => {
        console.log(cols)
        var radios="No skillset maked yet"
        if(cols.length>0){
            radios=``;
            for (let x in cols) {
                console.log(typeof(cols[x].id))
                radios+=` <label class="container">`+
                cols[x].name+
                `<input type="radio" checked="checked" name="radio"  onclick="if(this.checked){addframe('`+
                cols[x].name+`','`+
                cols[x].id+
                `')}"><span class="checkmark"></span>
                </label><hr>`
            }
            
            console.log(radios)
        }
        document.getElementById("radiospace").innerHTML=radios;
    })
      
}



radiomakers()