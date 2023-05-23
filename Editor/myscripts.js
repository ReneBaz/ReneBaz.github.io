let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
c.height = 800;
c.width = 800;

//Za nrdit lepse kote ******************
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.arcTo(50,150, 350,150, 50);
// ctx.arcTo(350,150, 350, 50, 50);
// ctx.lineTo(350,50);
// ctx.stroke();

c.addEventListener("mousedown", Dodaj);
c.addEventListener("dblclick", Odstrani);
c.addEventListener("mousemove", Miska);

//kakšen element, flase pravokotnik, tru krog
let elementZaPostavit = null;
//je kakšen element za postavit
let PosEle = false;
//Ustletimo grid ali ne
let gridOnOff = false;

//Elementi prevokotniki
let elementiP = [];
//Elementi Krogi
let elementiK = [];
//Elementi poti
let elementiPoti = [];
//Elementi pokrog
let elementiPolKrog=[];
//Elementi trikotnik
let elementiTrikotnik=[];
//Elementi Bezie Curve
let elementiBezCurve=[];


//Id elementa za premikanje poti
let IdElementaPoti = null;
let IdelementaPotIndex = null;
//Označen element
let IdOznačenegaElementa=null;

let IdelementaBezCurveIndex = null;
//Globalna pozicija X
let gx = 0;
//Globalna pozicija y
let gy = 0;
//Globalna spremenlivka za zoom
let zoom = 1;

//Width, height in radius za postavitev elementa pravokotnika
let postavitevWidth=0;
let postavitevHeight=0;
let postavitevRadius=0;

// let testnatabela=[1,2,3,4,5,6];

// while(testnatabela.length>1){
//     let zacasnavsota=[];
// for(i=1;i<testnatabela.length;i+=2){
//     zacasnavsota.push(testnatabela[i-1]+testnatabela[i])
// }

// }



//Postavi elemente
function Dodaj() {
    IdOznačenegaElementa=null;
    //Pogleda če je za postavit element
    if (PosEle) {
        PosEle = false;

        if (elementZaPostavit == 0) {

            let k = new Krog(gx, gy,postavitevRadius);
            elementiK.push(k);

        }
        if (elementZaPostavit == 1) {

            let p = new Pravokotnik(gx, gy,postavitevWidth,postavitevHeight);
            elementiP.push(p);
        }
        if (elementZaPostavit == 2) {
            let pot = new Pot(gx, gy);
            elementiPoti.push(pot);
            PosEle = true;
            c.removeEventListener("mousedown", Dodaj);
            c.addEventListener("mousedown", DodajTockePoti);
        }
        if(elementZaPostavit==3){
            let polkrog=new PolKrog(gx,gy,postavitevRadius);
            elementiPolKrog.push(polkrog);
        }
        if(elementZaPostavit==4){
            let trikotnik= new Trikotnik(gx,gy,postavitevWidth,postavitevHeight);
            elementiTrikotnik.push(trikotnik);
        }
        if(elementZaPostavit==5){
            let BzCr= new BezCurve(gx,gy);
            elementiBezCurve.push(BzCr);
            PosEle=true;
            c.removeEventListener("mousedown", Dodaj);
            c.addEventListener("mousedown", DodajTockeBezCurve);
        }

        Nariši();
    }


    //Če ni za postavit element pomeni da smo na njega kliknili za urejat lastnosti ali premikat
    else{

        for (let i=0;i<elementiP.length;i++) {
            elementiP[i].kliknjenoNaElement=false;
            elementiP[i].MaxMinTocke();
            if(elementiP[i].KlikNaElement()&&IdOznačenegaElementa==null){
                elementiP[i].kliknjenoNaElement=true;
                document.getElementById("DetailiElementa").innerHTML = elementiP[i].Detaili();
                IdOznačenegaElementa=i;
                c.addEventListener("mousemove", PremikP);
            }
        }
    
        for(let i=0;i<elementiK.length;i++){
            elementiK[i].kliknjenoNaElement=false;
            if(elementiK[i].KlikNaElement()&&IdOznačenegaElementa==null){
                elementiK[i].kliknjenoNaElement=true;
                document.getElementById("DetailiElementa").innerHTML = elementiK[i].Detaili();
                c.addEventListener("mousemove", PremikK);
                IdOznačenegaElementa=i;
            }
        }

        for(let i=0;i<elementiPolKrog.length;i++){
            elementiPolKrog[i].kliknjenoNaElement=false;
            if(elementiPolKrog[i].KlikNaElement()&&IdOznačenegaElementa==null){
                elementiPolKrog[i].kliknjenoNaElement=true;
                document.getElementById("DetailiElementa").innerHTML = elementiPolKrog[i].Detaili();
                c.addEventListener("mousemove", PremikPolKrog);
                IdOznačenegaElementa=i;
            }
        }

        for(let i=0;i<elementiTrikotnik.length;i++){
            elementiTrikotnik[i].kliknjenoNaElement=false;
            if(elementiTrikotnik[i].KlikNaElement()&&IdOznačenegaElementa==null){
                elementiTrikotnik[i].kliknjenoNaElement=true;
                document.getElementById("DetailiElementa").innerHTML = elementiTrikotnik[i].Detaili();
                c.addEventListener("mousemove", PremikTrikotnik);
                IdOznačenegaElementa=i;
            }
        }

        for(let i=0;i<elementiPoti.length;i++){
            let infoPoti=elementiPoti[i].KlikNa(gx, gy);
            elementiPoti[i].kliknjenoNaElement=false;
            if(infoPoti.razdalja&&IdOznačenegaElementa==null){
                IdelementaPotIndex=infoPoti.index;
                elementiPoti[i].kliknjenoNaElement=true;
                c.addEventListener("mousemove", PremikPot);
                IdOznačenegaElementa=i;
            }
        }

        for(let i=0;i<elementiBezCurve.length;i++){
            let infoBezCurve=elementiBezCurve[i].KlikNa(gx,gy);
            elementiBezCurve[i].kliknjenoNaElement=false;
            //pogleda ali smo kliknili na tocko ali pa na kontrolno tocko
            if(infoBezCurve.razdalja == "Ancor"&&IdOznačenegaElementa==null){
                IdelementaBezCurveIndex=infoBezCurve.index;
                elementiBezCurve[i].kliknjenoNaElement=true;
                c.addEventListener("mousemove", PremikBezCurve);
                IdOznačenegaElementa=i;
            }
            if(infoBezCurve.razdalja == "Control"&&IdOznačenegaElementa==null){
                IdelementaBezCurveIndex=infoBezCurve.index;
                elementiBezCurve[i].kliknjenoNaElement=true;
                c.addEventListener("mousemove", PremikBezCurveControl);
                IdOznačenegaElementa=i;
            }
        }
    
        if(IdOznačenegaElementa==null){
            document.getElementById("DetailiElementa").innerHTML = "";
        }
        Nariši();
    }
}


//odstrani elemente
function Odstrani(e) {


    for (let i = 0; i < elementiP.length; i++) {
        if (elementiP[i].KlikNaElement()) {
            elementiP.splice(i, 1);
            document.getElementById("DetailiElementa").innerHTML = "";
            Nariši();
            break;
        }
    }

    for (let i = 0; i < elementiK.length; i++) {
        if (elementiK[i].KlikNaElement()) {
            elementiK.splice(i, 1);
            document.getElementById("DetailiElementa").innerHTML = "";
            Nariši();
            break;
        }
    }
}




//Premika kliknjen pravokotnik
function PremikP(e) {


    elementiP[IdOznačenegaElementa].Premikanje(gx, gy);

}


//Premika kliknjen krog
function PremikK() {


    elementiK[IdOznačenegaElementa].Premikanje(gx, gy);


}


//Premik kliknjene točke poti
function PremikPot() {
    console.log(IdOznačenegaElementa, IdelementaPotIndex);
    elementiPoti[IdOznačenegaElementa].Premikanje(gx, gy, IdelementaPotIndex);

}

//Premik kliknjenega polkroga
function PremikPolKrog(){
    elementiPolKrog[IdOznačenegaElementa].Premikanje(gx,gy);
}

function PremikTrikotnik(){
    elementiTrikotnik[IdOznačenegaElementa].Premikanje(gx,gy);
}

function PremikBezCurve(){
    elementiBezCurve[IdOznačenegaElementa].Premikanje(gx,gy,IdelementaBezCurveIndex);
}
function PremikBezCurveControl(){
    elementiBezCurve[IdOznačenegaElementa].PremikanjeControl(gx,gy,IdelementaBezCurveIndex);
}


//Funkcija ustavi premikanje po tem ko spustis klik
c.onmouseup = function () {
    c.removeEventListener("mousemove", PremikP);
    c.removeEventListener("mousemove", PremikK);
    c.removeEventListener("mousemove", PremikPot);
    c.removeEventListener("mousemove", PremikBezCurve);
    c.removeEventListener("mousemove", PremikBezCurveControl);
    c.removeEventListener("mousemove", PremikPolKrog);
    c.removeEventListener("mousemove", PremikTrikotnik);
    IdElementaPoti = null;
    IdelementaIndex=null;

}


//Gumb za krog
function SetK(r) {
    PosEle = true;
    elementZaPostavit = 0;
    postavitevRadius=r;
}


//Gumb za pravokotnik
function SetP(w,h) {
    PosEle = true;
    elementZaPostavit = 1;
    postavitevWidth=w;
    postavitevHeight=h;
}
//Gumb za pot
function SetPot(x) {
    PosEle = !PosEle;
    elementZaPostavit = 2;
    document.getElementById(x).style.backgroundColor = 'Red';
    if (PosEle == false) {
        document.getElementById(x).style.backgroundColor = 'lightgray';
        c.removeEventListener("mousedown", DodajTockePoti);
        c.addEventListener("mousedown", Dodaj);
    }

}

function SetBezCurve(x) {
    PosEle = !PosEle;
    elementZaPostavit = 5;
    document.getElementById(x).style.backgroundColor = 'Red';
    if (PosEle == false) {
        document.getElementById(x).style.backgroundColor = 'lightgray';
        c.removeEventListener("mousedown", DodajTockeBezCurve);
        c.addEventListener("mousedown", Dodaj);
    }

}
//Dodajamo točke poti
function DodajTockePoti() {
    elementiPoti[elementiPoti.length - 1].DodajTocke(gx, gy);
    Nariši();
}

function DodajTockeBezCurve() {
    elementiBezCurve[elementiBezCurve.length-1].DodajTocke(gx,gy);
    Nariši();
}

function SetPolKrog(r){
    PosEle=true;
    elementZaPostavit=3;
    postavitevRadius=r;
}
function SetTrikotnik(w,h){
    PosEle = true;
    elementZaPostavit = 4;
    postavitevWidth=w;
    postavitevHeight=h;
}
//Funkcija za zarotirat izbran element
function SpremeniElementP(){
    let width=parseInt(document.getElementById("NumWD").value);
    let height=parseInt(document.getElementById("NumHD").value);
    let deg=parseInt(document.getElementById("NumRD").value);
    elementiP[IdOznačenegaElementa].SpremeniWidth(width);  
    elementiP[IdOznačenegaElementa].SpremeniHeight(height);
    elementiP[IdOznačenegaElementa].Zarotiraj(deg);
    Nariši();
}
//
function SpremeniElementK(){
    let radius=parseInt(document.getElementById("NumRaD").value);
    elementiK[IdOznačenegaElementa].SpremeniRadius(radius);
    Nariši();
}
//Spremeni polkrog
function SpremeniElementPolKrog(){
    let radius=parseInt(document.getElementById("NumRaD").value);
    let deg=parseInt(document.getElementById("NumRD").value);
    elementiPolKrog[IdOznačenegaElementa].SpremeniRadius(radius);
    elementiPolKrog[IdOznačenegaElementa].Zarotiraj(deg);
    Nariši();
}
//Spremeni trikotnik
function SpremeniElementTrikotnik(){
    let width=parseInt(document.getElementById("NumWD").value);
    let height=parseInt(document.getElementById("NumHD").value);
    let deg=parseInt(document.getElementById("NumRD").value);
    elementiTrikotnik[IdOznačenegaElementa].SpremeniWidth(width);  
    elementiTrikotnik[IdOznačenegaElementa].SpremeniHeight(height);
    elementiTrikotnik[IdOznačenegaElementa].Zarotiraj(deg);
    Nariši();
}

//Nariše vse ponovno
function Nariši() {

    ctx.clearRect(0, 0, c.width, c.height);

    if (gridOnOff) {
        for (let i = 0; i < parseInt(c.width); i += 10) {
            ctx.lineWidth = 0.1;
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, parseInt(c.height));
            ctx.moveTo(0, i);
            ctx.lineTo(parseInt(c.width), i);
            ctx.stroke();
            ctx.lineWidth = 1;
        }
    }

    for (const e of elementiK) {
        e.NarisiKrog();
    }

    for (const e of elementiP) {
        e.NarisiPravokotnik();
    }

    for (const e of elementiPoti) {
        e.NarišiPot();
    }

    for (const e of elementiPolKrog) {
        e.NarisiPolKrog();
    }
    for (const e of elementiTrikotnik) {
        e.NarisiTrikotnik();
    }
    for(const e of elementiBezCurve){
        e.NarisiBezCurve();
    }

}


//taprava pozicija miške
function getMousePos(c, e) {

    let rect = c.getBoundingClientRect();

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}


//Ustleti ali pa odstrani grid
function Grid() {

    let checkBox = document.getElementById("Grid");

    if (checkBox.checked == true) {
        gridOnOff = true;
    } else {
        gridOnOff = false;
    }

    Nariši();
}






//Sledi miski da pokaze lokacijo
function Miska(e) {
    let pos = getMousePos(c, e);
    let mx = pos.x;
    let my = pos.y;

    Nariši();

    if (gridOnOff) {
        if (mx % 10 < 5) {
            gx = mx - mx % 10;
            

        } else {
            gx = mx + (10 - mx % 10);
            

        }
        if(my % 10 < 5){
            gy = my - my % 10;
        }else{
            gy = my + (10 - my % 10);
        }
    } else {
        gx = mx;
        gy = my;
    }

    ctx.beginPath();
    ctx.arc(gx, gy, 2, 0, 2 * Math.PI);
    ctx.stroke();

}

//Razdalja med 2 točkama
function Razdalja(x1, y1, x2, y2) {

    let x = Math.abs(x1 - x2);
    let y = Math.abs(y1 - y2);

    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}