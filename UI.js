function PokaziGradice(){
    document.getElementById("NatancniElementi").innerHTML = "<button onclick='SetP(50,50)' class='gumb2'><img src='Slike/Kvadrat.png'/></button>"+
    "<button onclick='SetP(100,50)' class='gumb2'><img src='Slike/Pravokotnik.png'/></button>"+
    "<button onclick='SetK(50)' class='gumb2'><img src='Slike/Krog.png'/></button>"+
    "<button onclick='SetPolKrog(50)' class='gumb2'><img src='Slike/Polkrog.png'/></button>"+
    "<button onclick='SetTrikotnik(50,100)' class='gumb2'><img src='Slike/Trikotnik.png'/></button>";
}
function PokaziDrevesa(){
    document.getElementById("NatancniElementi").innerHTML = "<button onclick='SetK(50)' class='gumb2'>1m</button>"+
    "<button onclick='SetK(100)' class='gumb2'>2m</button>"+
    "<button onclick='SetK(150)' class='gumb2'>3m</button>"+
    "<button onclick='SetK(200)' class='gumb2'>4m</button>"+
    "<button onclick='SetK(250)' class='gumb2'>5m</button>";
}
function PokaziPot(){
    document.getElementById("NatancniElementi").innerHTML = "<button onclick='SetPot(this.id)' class='gumb2' id='P1'>Pot1</button>"+
    "<button onclick='SetBezCurve(this.id)' class='gumb2' id='P2'>Pot2</button>";
}
function PokaziMeje(){
    document.getElementById("NatancniElementi").innerHTML = "<button onclick='SetPot(this.id)' class='gumb2' id='M1'>Meja1</button>"+
    "<button onclick='SetPot(this.id)' class='gumb2' id='M2'>Meja2</button>";
}
function PokaziGrme(){
    document.getElementById("NatancniElementi").innerHTML = "<button onclick='SetP(50,50)' class='gumb2'><img src='Slike/Kvadrat.png'/></button>"+
    "<button onclick='SetP(100,50)' class='gumb2'><img src='Slike/Pravokotnik.png'/></button>"+
    "<button onclick='SetK(50)' class='gumb2'><img src='Slike/Krog.png'/></button>";
}
function PokaziVodneElemente(){
    document.getElementById("NatancniElementi").innerHTML = "";
}