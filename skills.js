let db = new Localbase('db')

var i,j;

var everyskill=[]
var programming=[" c ","c++","c#","python","java ","javascript",
            "swift","golang","kotlin","php","perl","rust","matlab",
            "fortran","ruby","fortran","groovy"," r "]
var markdown=["html","css","sass","scss","xml","readme.md"]
var technical_skills=[
    "machine learning","artificial intelligent","cloud computing","data science","data analysis",
    "big data"," ml ", " ai ", "statistical analysis","testing","data mining","database design",
    "database management","machine learning","fullstack","backend","frontend","technical writting",
    "android"," ui "," ux ","app","hybrid","native","open source","git","version control","cyber security",
    "competative programming","web development","game development","unity"
]

var frameworks=[
    "react","django","angular","vue","jquery","ajax","laravel","flask","phalcon",
    "three.js","p5.js","tensorflow","meteor","pygame","panda","numpy","panda",
    "scikit-learn","opencv","bootstrap","pillow","express","node","mern","asp.net"
]
var databases=["dbsqlite","mysql","postgresql","mongodb","elasticsearch","cassandra","redis"]
var hosting=["heroku","aws","azure","google cloud","bluehost"]

var skills=[programming,markdown,technical_skills,frameworks,databases,hosting]
var skillname=["Programming languages","Markdown","Technical skills",
                "Frameworks","Databases","Hosting"]

function checkskills(){
    
    
    for(i=0;i<skills.length;i++){
        console.log(typeof(full_text))
        console.log(full_text)
        for(j=0;j<skills[i].length;j++){
            console.log(skills[i][j])
            if(full_text.includes(skills[i][j])){
                console.log('yes')
                hisskills[i].push(skills[i][j])
                everyskill.push(skills[i][j])
            }
        }
    }
    console.log(hisskills)
    console.log(everyskill)
    printtable()
    calculateskill()
}

function printtable(){
    tag=``
    
    for(i=0;i<hisskills.length;i++){
        tag+=`<table id="customers">`
        tag+=`<tr>
       <th> `+ skillname[i]+`</th>
        </tr>`

        for(j=0;j<hisskills[i].length;j++){
            tag+=` <tr> <td>`+ hisskills[i][j] +`</td><tr>`
        }
        tag+=`
        </table>
        `
    }
    console.log(tag)
    document.getElementById("skilltable").innerHTML = tag;
}
function selecttopic(){
    var x=document.getElementById("jobposition")
    db.collection('current_skills').doc('curski').get().then(document => {
        console.log(document.name)
        x.innerHTML = document.name;

      })
}


function calculateskill(){
    var x=document.getElementById("jobposition")
    var y=document.getElementById("skilltable2")
    var z=document.getElementById("addpercentahe")
    var checkarray,score=0;
    var matchskills=[]
    db.collection('current_skills').doc('curski').get().then(document => {
        console.log(document.name)
        checkarray = document.skillarray;
        console.log("checkarray",document.skillarray.length)
        for(i=0;i<checkarray.length;i++){
            if(everyskill.includes(checkarray[i])){
                score+=1;
                matchskills.push([checkarray[i],checkarray[i]])
            }
            else{
                matchskills.push([checkarray[i],"None"])
            }

        }
        
        var percentage=score/(checkarray.length)*100;
        console.log(percentage)
        console.log(matchskills)
        var matchtable=`<table id="customers">
            <tr>
            <th> Required skill </th><th> Your skill </th>
            </tr>
            `
        for(i=0;i<matchskills.length;i++){
            if(matchskills[i][1]=="None"){
                matchtable+=`<tr>
                <td> `+ matchskills[i][0]+` </td>`+
               ` <td style='color:red' > `+ matchskills[i][1]+` </td></tr>`
                
            }
            else{
            matchtable+=`<tr>
            <td> `+ matchskills[i][0]+` </td>`+
           ` <td > `+ matchskills[i][1]+` </td></tr>`
            }
        }
        matchtable+=`</tr></table>`
        y.innerHTML=matchtable
        meterrange=`<div class="progress-circle progress-`+String(parseInt(percentage))+`"><span>`+String(parseInt(percentage))+` matched</span></div>`
        z.innerHTML=meterrange;
        console.log(meterrange)
      })
    // console.log(checkarray)
    // console.log(everyskill)
}

selecttopic();
