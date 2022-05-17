class Pravokotnik{
    
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.diagonala=Math.sqrt(Math.pow(Math.abs(x-x+this.width),2)+Math.pow(Math.abs(y-y+this.height),2));
        this.x1=this.x-this.width/2;
        this.y1=this.y-this.height/2;
        this.x2=this.x+this.width/2;
        this.y2=this.y+this.height/2;
        this.deg=0;
        this.barva="black";
        this.kliknjenoNaElement=false;
        this.MaxMinTocke();
    }

    NarisiPravokotnik(){
        let kot=Math.round(Math.asin((this.height/2)/(this.diagonala/2))*180/Math.PI);

        ctx.beginPath();
        ctx.arc(this.x,this.y, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle=this.barva;
        ctx.beginPath();
        ctx.moveTo(this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x,this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y);
        ctx.lineTo(this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x,this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y);
        ctx.lineTo(this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x,this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y);
        ctx.lineTo(this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x,this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle="black";

        if(this.kliknjenoNaElement){
            this.NarisiOkvir();
        }
       
    }

    NarisiOkvir(){
        this.MaxMinTocke();
        ctx.strokeStyle='rgba(0, 173, 255, 0.6)';
        ctx.beginPath();
        ctx.moveTo(this.maxX,this.maxY);
        ctx.lineTo(this.maxX,this.minY);
        ctx.lineTo(this.minX,this.minY);
        ctx.lineTo(this.minX,this.maxY);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle="black";
    }

    Premikanje(x,y){
        this.x=x;
        this.y=y;
        this.x1=x-this.width/2;
        this.y1=y-this.height/2;
        this.x2=x+this.width/2;
        this.y2=y+this.height/2;
    }

    Zarotiraj(deg){
        this.deg=deg;
    }

    SpremeniWidth(width){
        this.width=width;
        this.diagonala=Math.sqrt(Math.pow(Math.abs(this.x-this.x+this.width),2)+Math.pow(Math.abs(this.y-this.y+this.height),2));
        this.x1=this.x-this.width/2;
        this.y1=this.y-this.height/2;
        this.x2=this.x+this.width/2;
        this.y2=this.y+this.height/2;
    }

    SpremeniHeight(height){
        this.height=height;
        this.diagonala=Math.sqrt(Math.pow(Math.abs(this.x-this.x+this.width),2)+Math.pow(Math.abs(this.y-this.y+this.height),2));
        this.x1=this.x-this.width/2;
        this.y1=this.y-this.height/2;
        this.x2=this.x+this.width/2;
        this.y2=this.y+this.height/2;
        
    }

    SpremeniBarvo(barva){
        this.barva=barva;
    }

    MaxMinTocke(){
        //zelo salb način za ustletit območje za klik
        let kot=Math.round(Math.asin((this.height/2)/(this.diagonala/2))*180/Math.PI);
        this.maxX=this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x;
        this.maxY=this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y;
        this.minX=this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x;
        this.minY=this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y;
        //Max X
        if(this.maxX<this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x){
            this.maxX=this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x;
        }
        if(this.maxX<this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x){
            this.maxX=this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x;
        }
        if(this.maxX<this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x){
            this.maxX=this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x;
        }

        //Max Y
        if(this.maxY<this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y){
            this.maxY=this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y;
        }
        if(this.maxY<this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y){
            this.maxY=this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y;
        }
        if(this.maxY<this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y){
            this.maxY=this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y;
        }

        //Min X
        if(this.minX>this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x){
            this.minX=this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x;
        }
        if(this.minX>this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x){
            this.minX=this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x;
        }
        if(this.minX>this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x){
            this.minX=this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x;
        }

        //Min Y
        if(this.minY>this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y){
            this.minY=this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y;
        }
        if(this.minY>this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y){
            this.minY=this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y;
        }
        if(this.minY>this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y){
            this.minY=this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y;
        }
    }

    KlikNaElement(){
        
        if(gx>this.minX&&gx<this.maxX&&gy>this.minY&&gy<this.maxY&&this.NatančenKlik()){
            return true;
        }
        return false;
    }

    NatančenKlik(){
        let kot=Math.round(Math.asin((this.height/2)/(this.diagonala/2))*180/Math.PI);

        //ustvarimo kordinate za vse 4 točke
        let nizTock=[];

        nizTock.push(this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x);
        nizTock.push(this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y);

        nizTock.push(this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x);
        nizTock.push(this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y);

        nizTock.push(this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x);
        nizTock.push(this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y);

        nizTock.push(this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x);
        nizTock.push(this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y);

        //Zadnje točke se ponovijo da laho dokončamo loop 
        nizTock.push(this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x);
        nizTock.push(this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y);

        //Ustvarimo začetno in končno točko klika
        let p0 = {
			x: gx,
			y: gy
		},
		p1 = {
			x: this.maxX,
			y: gy
		};
        
		let številointersekcij=0;
        //pogledamo in seštejemo vse intersekcije
        for(let i=0;i<nizTock.length-2;i+=2){
            let p2 = {
			    x: nizTock[i],
			    y: nizTock[i+1]
		    },
		    p3 = {
			    x: nizTock[i+2],
			    y: nizTock[i+3]
		    };
            let point=this.segmentIntersect(p0, p1, p2, p3);
            if(point != null){
                številointersekcij+=1;
            }

        }

        if(številointersekcij%2 == 0){
            return false;
        }else{
            return true;
        }

        
        

    }
    //Funkcija pogleda če se 2 premice stikajo
    segmentIntersect(p0, p1, p2, p3) {
        
		let A1 = p1.y - p0.y,
			B1 = p0.x - p1.x,
			C1 = A1 * p0.x + B1 * p0.y,
			A2 = p3.y - p2.y,
			B2 = p2.x - p3.x,
			C2 = A2 * p2.x + B2 * p2.y,
			denominator = A1 * B2 - A2 * B1;

		if(denominator == 0) {
			return null;
		}

		let intersectX = (B2 * C1 - B1 * C2) / denominator,
			intersectY = (A1 * C2 - A2 * C1) / denominator,
			rx0 = (intersectX - p0.x) / (p1.x - p0.x),
			ry0 = (intersectY - p0.y) / (p1.y - p0.y),
			rx1 = (intersectX - p2.x) / (p3.x - p2.x),
			ry1 = (intersectY - p2.y) / (p3.y - p2.y);
		if(((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && 
		   ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
			return 1;
		}
		else {
			return null;
		}
	}

    Detaili(){
        return "<input type='number' id='NumWD' value="+this.width+" onChange='SpremeniElementP()'> Width <br>"+
        "<input type='number' id='NumHD' value="+this.height+" onChange='SpremeniElementP()'> Height <br>"+
        "<input type='number' id='NumRD' value="+this.deg+" onChange='SpremeniElementP()'> Rotacija <br>";
    }

}






class Krog{

    constructor(x,y,radius){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.barva="black";
        this.kliknjenoNaElement=false;
    }

    NarisiKrog() {
        if(this.kliknjenoNaElement){
            this.barva='rgba(0, 173, 255, 0.6)';
        }else{
            this.barva='black';
        }
        ctx.strokeStyle=this.barva;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius/2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle="black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        ctx.stroke();
    }

    Premikanje(x,y){
        this.x=x;
        this.y=y;
    }
    KlikNaElement(){
        if(Razdalja(gx,gy,this.x,this.y)<this.radius/2){
            return true;
        }
        return false;
    }
    SpremeniBarvo(barva){
        this.barva=barva;
    }

    SpremeniRadius(radius){
        this.radius=radius;
    }

    Detaili(){
        return "<input type='number' id='NumRaD' value="+this.radius+" onChange='SpremeniElementK()'> Radius";
    }
}




class PolKrog{
    constructor(x,y,radius){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.barva="black";
        this.deg=0;
        this.kliknjenoNaElement=false;
        this.MaxMinTocke();
    }

    NarisiPolKrog(){
        if(this.kliknjenoNaElement){
            this.barva='rgba(0, 173, 255, 0.6)';
        }else{
            this.barva='black';
        }
        ctx.strokeStyle=this.barva;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius/2,(180-this.deg)*Math.PI/180,(0-this.deg)*Math.PI/180);
        ctx.moveTo(this.radius/2*Math.cos((this.deg)*Math.PI/180)+this.x,this.radius/2*Math.sin(-(this.deg)*Math.PI/180)+this.y);
        ctx.lineTo(this.radius/2*Math.cos((this.deg-180)*Math.PI/180)+this.x,this.radius/2*Math.sin(-(this.deg-180)*Math.PI/180)+this.y);
        ctx.stroke();
        ctx.strokeStyle="black";

        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2*Math.PI);
        ctx.stroke();
        if(this.kliknjenoNaElement){
            this.NarisiOkvir();
        }
        
    }

    SpremeniBarvo(barva){
        this.barva=barva;
    }

    SpremeniRadius(radius){
        this.radius=radius;
    }

    Zarotiraj(deg){
        this.deg=deg;
    }

    Premikanje(x,y){
        this.x=x;
        this.y=y;
    }
    KlikNaElement(){
        if(gx>this.minX&&gx<this.maxX&&gy>this.minY&&gy<this.maxY&&Razdalja(gx,gy,this.x,this.y)<this.radius/2){
            return true;
        }
        return false;
    }

    NarisiOkvir(){
        this.MaxMinTocke();
        ctx.strokeStyle='rgba(0, 173, 255, 0.6)';
        ctx.beginPath();
        ctx.moveTo(this.maxX,this.maxY);
        ctx.lineTo(this.maxX,this.minY);
        ctx.lineTo(this.minX,this.minY);
        ctx.lineTo(this.minX,this.maxY);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle="black";
    }

    MaxMinTocke(){
        let zamaknjenX=this.radius/2*Math.cos((this.deg+90)*Math.PI/180)+this.x;
        let zamaknjenY=this.radius/2*Math.sin(-(this.deg+90)*Math.PI/180)+this.y;
        this.maxX=this.radius/2*Math.cos((this.deg)*Math.PI/180)+this.x;
        this.maxY=this.radius/2*Math.sin(-(this.deg)*Math.PI/180)+this.y;
        this.minX=this.radius/2*Math.cos((this.deg)*Math.PI/180)+this.x;
        this.minY=this.radius/2*Math.sin(-(this.deg)*Math.PI/180)+this.y;

        if(this.maxX<this.radius/2*Math.cos((this.deg-180)*Math.PI/180)+this.x){
            this.maxX=this.radius/2*Math.cos((this.deg-180)*Math.PI/180)+this.x;
        }
        if(this.maxX<this.radius/2*Math.cos((this.deg)*Math.PI/180)+zamaknjenX){
            this.maxX=this.radius/2*Math.cos((this.deg)*Math.PI/180)+zamaknjenX;
        }
        if(this.maxX<this.radius/2*Math.cos((this.deg-180)*Math.PI/180)+zamaknjenX){
            this.maxX=this.radius/2*Math.cos((this.deg-180)*Math.PI/180)+zamaknjenX;
        }


        if(this.maxY<this.radius/2*Math.sin(-(this.deg-180)*Math.PI/180)+this.y){
            this.maxY=this.radius/2*Math.sin(-(this.deg-180)*Math.PI/180)+this.y;
        }
        if(this.maxY<this.radius/2*Math.sin(-(this.deg)*Math.PI/180)+zamaknjenY){
            this.maxY=this.radius/2*Math.sin(-(this.deg)*Math.PI/180)+zamaknjenY;
        }
        if(this.maxY<this.radius/2*Math.sin(-(this.deg-180)*Math.PI/180)+zamaknjenY){
            this.maxY=this.radius/2*Math.sin(-(this.deg-180)*Math.PI/180)+zamaknjenY;
        }


        if(this.minX>this.radius/2*Math.cos((this.deg-180)*Math.PI/180)+this.x){
            this.minX=this.radius/2*Math.cos((this.deg-180)*Math.PI/180)+this.x;
        }
        if(this.minX>this.radius/2*Math.cos((this.deg)*Math.PI/180)+zamaknjenX){
            this.minX=this.radius/2*Math.cos((this.deg)*Math.PI/180)+zamaknjenX;
        }
        if(this.minX>this.radius/2*Math.cos((this.deg-180)*Math.PI/180)+zamaknjenX){
            this.minX=this.radius/2*Math.cos((this.deg-180)*Math.PI/180)+zamaknjenX;
        }


        if(this.minY>this.radius/2*Math.sin(-(this.deg-180)*Math.PI/180)+this.y){
            this.minY=this.radius/2*Math.sin(-(this.deg-180)*Math.PI/180)+this.y;
        }
        if(this.minY>this.radius/2*Math.sin(-(this.deg)*Math.PI/180)+zamaknjenY){
            this.minY=this.radius/2*Math.sin(-(this.deg)*Math.PI/180)+zamaknjenY;
        }
        if(this.minY>this.radius/2*Math.sin(-(this.deg-180)*Math.PI/180)+zamaknjenY){
            this.minY=this.radius/2*Math.sin(-(this.deg-180)*Math.PI/180)+zamaknjenY;
        }
    }

    Detaili(){
        return "<input type='number' id='NumRaD' value="+this.radius+" onChange='SpremeniElementPolKrog()'> Radius <br>"+
        "<input type='number' id='NumRD' value="+this.deg+" onChange='SpremeniElementPolKrog()'> Rotacija <br>";
    }

}

class Trikotnik{

    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.diagonala=Math.sqrt(Math.pow(Math.abs(x-x+this.width),2)+Math.pow(Math.abs(y-y+this.height),2));
        this.x1=this.x-this.width/2;
        this.y1=this.y-this.height/2;
        this.x2=this.x+this.width/2;
        this.y2=this.y+this.height/2;
        this.deg=0;
        this.barva="black";
        this.kliknjenoNaElement=false;
        this.MaxMinTocke();
    }

    SpremeniBarvo(barva){
        this.barva=barva;
    }

    NarisiTrikotnik(){
        let kot=Math.round(Math.asin((this.height/2)/(this.diagonala/2))*180/Math.PI);
        let tockaSredinaX=(this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x+this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x)/2;
        let tockaSredinaY=(this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y+this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y)/2;
        ctx.beginPath();
        ctx.arc(this.x,this.y, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle=this.barva;
        ctx.beginPath();
        ctx.moveTo(this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x,this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y);
        ctx.lineTo(this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x,this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y);
        ctx.lineTo(tockaSredinaX,tockaSredinaY);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle="black";

        if(this.kliknjenoNaElement){
            this.NarisiOkvir();
        }
       
    }

    Premikanje(x,y){
        this.x=x;
        this.y=y;
        this.x1=x-this.width/2;
        this.y1=y-this.height/2;
        this.x2=x+this.width/2;
        this.y2=y+this.height/2;
    }

    Zarotiraj(deg){
        this.deg=deg;
    }

    SpremeniWidth(width){
        this.width=width;
        this.diagonala=Math.sqrt(Math.pow(Math.abs(this.x-this.x+this.width),2)+Math.pow(Math.abs(this.y-this.y+this.height),2));
        this.x1=this.x-this.width/2;
        this.y1=this.y-this.height/2;
        this.x2=this.x+this.width/2;
        this.y2=this.y+this.height/2;
    }

    SpremeniHeight(height){
        this.height=height;
        this.diagonala=Math.sqrt(Math.pow(Math.abs(this.x-this.x+this.width),2)+Math.pow(Math.abs(this.y-this.y+this.height),2));
        this.x1=this.x-this.width/2;
        this.y1=this.y-this.height/2;
        this.x2=this.x+this.width/2;
        this.y2=this.y+this.height/2;
        
    }

    NarisiOkvir(){
        this.MaxMinTocke();
        ctx.strokeStyle='rgba(0, 173, 255, 0.6)';
        ctx.beginPath();
        ctx.moveTo(this.maxX,this.maxY);
        ctx.lineTo(this.maxX,this.minY);
        ctx.lineTo(this.minX,this.minY);
        ctx.lineTo(this.minX,this.maxY);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle="black";
    }

    MaxMinTocke(){
        //zelo salb način za ustletit območje za klik
        let kot=Math.round(Math.asin((this.height/2)/(this.diagonala/2))*180/Math.PI);
        this.maxX=this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x;
        this.maxY=this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y;
        this.minX=this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x;
        this.minY=this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y;
        //Max X
        if(this.maxX<this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x){
            this.maxX=this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x;
        }
        if(this.maxX<this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x){
            this.maxX=this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x;
        }
        if(this.maxX<this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x){
            this.maxX=this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x;
        }

        //Max Y
        if(this.maxY<this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y){
            this.maxY=this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y;
        }
        if(this.maxY<this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y){
            this.maxY=this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y;
        }
        if(this.maxY<this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y){
            this.maxY=this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y;
        }

        //Min X
        if(this.minX>this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x){
            this.minX=this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x;
        }
        if(this.minX>this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x){
            this.minX=this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x;
        }
        if(this.minX>this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x){
            this.minX=this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x;
        }

        //Min Y
        if(this.minY>this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y){
            this.minY=this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y;
        }
        if(this.minY>this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y){
            this.minY=this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y;
        }
        if(this.minY>this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y){
            this.minY=this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y;
        }
    }

    KlikNaElement(){
        
        if(gx>this.minX&&gx<this.maxX&&gy>this.minY&&gy<this.maxY&&this.NatančenKlik()){
            return true;
            
        }
        return false;
    }
    NatančenKlik(){
        let kot=Math.round(Math.asin((this.height/2)/(this.diagonala/2))*180/Math.PI);
        let tockaSredinaX=(this.diagonala/2*Math.cos((this.deg+180+kot)*Math.PI/180)+this.x+this.diagonala/2*Math.cos((this.deg-kot)*Math.PI/180)+this.x)/2;
        let tockaSredinaY=(this.diagonala/2*Math.sin(-(this.deg+180+kot)*Math.PI/180)+this.y+this.diagonala/2*Math.sin(-(this.deg-kot)*Math.PI/180)+this.y)/2;

        //ustvarimo kordinate za vse 4 točke
        let nizTock=[];

        nizTock.push(this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x);
        nizTock.push(this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y);

        nizTock.push(this.diagonala/2*Math.cos((this.deg+180-kot)*Math.PI/180)+this.x);
        nizTock.push(this.diagonala/2*Math.sin(-(this.deg+180-kot)*Math.PI/180)+this.y);

        nizTock.push(tockaSredinaX);
        nizTock.push(tockaSredinaY);
        
        //Zadnje točke se ponovijo da laho dokončamo loop 
        nizTock.push(this.diagonala/2*Math.cos((this.deg+kot)*Math.PI/180)+this.x);
        nizTock.push(this.diagonala/2*Math.sin(-(this.deg+kot)*Math.PI/180)+this.y);

        //Ustvarimo začetno in končno točko klika
        let p0 = {
			x: gx,
			y: gy
		},
		p1 = {
			x: this.maxX,
			y: gy
		};

		let številointersekcij=0;
        //pogledamo in seštejemo vse intersekcije
        for(let i=0;i<nizTock.length-2;i+=2){
            let p2 = {
			    x: nizTock[i],
			    y: nizTock[i+1]
		    },
		    p3 = {
			    x: nizTock[i+2],
			    y: nizTock[i+3]
		    };
            let point=this.segmentIntersect(p0, p1, p2, p3);
            if(point != null){
                številointersekcij+=1;
            }

        }

        if(številointersekcij%2 == 0){
            return false;
        }else{
            return true;
        }

        
        

    }
    //Funkcija pogleda če se 2 premice stikajo
    segmentIntersect(p0, p1, p2, p3) {
        
		let A1 = p1.y - p0.y,
			B1 = p0.x - p1.x,
			C1 = A1 * p0.x + B1 * p0.y,
			A2 = p3.y - p2.y,
			B2 = p2.x - p3.x,
			C2 = A2 * p2.x + B2 * p2.y,
			denominator = A1 * B2 - A2 * B1;

		if(denominator == 0) {
			return null;
		}

		let intersectX = (B2 * C1 - B1 * C2) / denominator,
			intersectY = (A1 * C2 - A2 * C1) / denominator,
			rx0 = (intersectX - p0.x) / (p1.x - p0.x),
			ry0 = (intersectY - p0.y) / (p1.y - p0.y),
			rx1 = (intersectX - p2.x) / (p3.x - p2.x),
			ry1 = (intersectY - p2.y) / (p3.y - p2.y);
		if(((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && 
		   ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
			return 1;
		}
		else {
			return null;
		}
	}

    Detaili(){
        return "<input type='number' id='NumWD' value="+this.width+" onChange='SpremeniElementTrikotnik()'> Width <br>"+
        "<input type='number' id='NumHD' value="+this.height+" onChange='SpremeniElementTrikotnik()'> Height <br>"+
        "<input type='number' id='NumRD' value="+this.deg+" onChange='SpremeniElementTrikotnik()'> Rotacija <br>";
    }

}


class Pot{

    constructor(x,y){
        this.arrX=[x];
        this.arrY=[y];
        this.kliknjenoNaElement=false;
        this.barva='black';
        
    }

    DodajTocke(x,y){
        this.arrX.push(x);
        this.arrY.push(y);
    }

    NarišiPot(){
        if(this.kliknjenoNaElement){
            this.barva='rgba(0, 173, 255, 0.6)';
        }else{
            this.barva='black';
        }
        ctx.strokeStyle=this.barva;


        if(this.arrX.length>1){
            for(let i=0;i<this.arrX.length;i++){
                ctx.beginPath();
                ctx.arc(this.arrX[i], this.arrY[i], 5, 0, 2 * Math.PI);
                ctx.stroke();    
            }
            // ctx.lineWidth = 100;
            ctx.beginPath();
            ctx.moveTo(this.arrX[0],this.arrY[0]);
            for(let i=1;i<this.arrX.length;i++){
                ctx.lineTo(this.arrX[i],this.arrY[i]);
            }
            ctx.stroke();
            // ctx.lineWidth = 1;
        }else{
        ctx.beginPath();
        ctx.arc(this.arrX[0], this.arrY[0], 5, 0, 2 * Math.PI);
        ctx.stroke();
        }
        ctx.strokeStyle="black";
    }

    KlikNa(x1,y1){
        for(let i=0;i<this.arrX.length;i++){
        let x2=this.arrX[i];
        let y2=this.arrY[i];
        let x=Math.abs(x1-x2);
        let y=Math.abs(y1-y2);
        let razdalja=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
            if(razdalja<=5){
                return{
                    razdalja: true,
                    index: i
                };
            }
        }
        return{
            razdalja: false,
            index: 0
        };
    }

    Premikanje(x,y,i){
        this.arrX[i]=x;
        this.arrY[i]=y;
    }

}



class BezCurve{
    constructor(x,y){
        this.arrX=[x];
        this.arrY=[y];
        this.kliknjenoNaElement=false;
        this.barva='black';
        this.arrControlX=[];
        this.arrControlY=[];
        this.steviloControlTock=3

        this.zdruzenaTabelaX=[]
        this.zdruzenaTabelaY=[]

        this.tabelaVmesnihTockX=[];
        this.tabelaVmesnihTockY=[];

        this.t=0.01
    }

    DodajTocke(x,y){
        //Ustvari glavno točko
        this.arrX.push(x);
        this.arrY.push(y);

        //Ustvari kontrolne točke
        if(this.steviloControlTock == 1){
            this.arrControlX.push((0.5 * this.arrX[this.arrX.length-2]) + (0.5 * this.arrX[this.arrX.length-1]))
            this.arrControlY.push((0.5 * this.arrY[this.arrY.length-2]) + (0.5 * this.arrY[this.arrY.length-1]))
        }
        if(this.steviloControlTock == 2){
            this.arrControlX.push((0.67 * this.arrX[this.arrX.length-2]) + (0.33 * this.arrX[this.arrX.length-1]))
            this.arrControlY.push((0.67 * this.arrY[this.arrY.length-2]) + (0.33 * this.arrY[this.arrY.length-1]))

            this.arrControlX.push((0.33 * this.arrX[this.arrX.length-2]) + (0.67 * this.arrX[this.arrX.length-1]))
            this.arrControlY.push((0.33 * this.arrY[this.arrY.length-2]) + (0.67 * this.arrY[this.arrY.length-1]))
            
        }
        if(this.steviloControlTock == 3){
            this.arrControlX.push((0.75 * this.arrX[this.arrX.length-2]) + (0.25 * this.arrX[this.arrX.length-1]))
            this.arrControlY.push((0.75 * this.arrY[this.arrY.length-2]) + (0.25 * this.arrY[this.arrY.length-1]))

            this.arrControlX.push((0.5 * this.arrX[this.arrX.length-2]) + (0.5 * this.arrX[this.arrX.length-1]))
            this.arrControlY.push((0.5 * this.arrY[this.arrY.length-2]) + (0.5 * this.arrY[this.arrY.length-1]))

            this.arrControlX.push((0.25 * this.arrX[this.arrX.length-2]) + (0.75 * this.arrX[this.arrX.length-1]))
            this.arrControlY.push((0.25 * this.arrY[this.arrY.length-2]) + (0.75 * this.arrY[this.arrY.length-1]))
            
        }
    }

    Premikanje(x,y,i){
        this.arrX[i]=x;
        this.arrY[i]=y;
    }
    PremikanjeControl(x,y,i){
        this.arrControlX[i]=x;
        this.arrControlY[i]=y;
    }

    KlikNa(x1,y1){
        for(let i=0;i<this.arrX.length;i++){
        let x2=this.arrX[i];
        let y2=this.arrY[i];
        let x=Math.abs(x1-x2);
        let y=Math.abs(y1-y2);
        let razdalja=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
            if(razdalja<=5){
                return{
                    razdalja: "Ancor",
                    index: i
                };
            }
        }
        for(let i=0;i<this.arrControlX.length;i++){
            let x2=this.arrControlX[i];
            let y2=this.arrControlY[i];
            let x=Math.abs(x1-x2);
            let y=Math.abs(y1-y2);
            let razdalja=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
                if(razdalja<=5){
                    return{
                        razdalja: "Control",
                        index: i
                    };
                }
            }
        return{
            razdalja: false,
            index: 0
        };
    }

    NarisiBezCurve() {
        // if(this.kliknjenoNaElement){
        //     this.barva='rgba(0, 173, 255, 0.6)';
        // }else{
        //     this.barva='black';
        // }
        // ctx.strokeStyle=this.barva;


        this.UstvariZdruzenoTabelo()
        for(let i=0;i<this.zdruzenaTabelaX.length;i++){
            ctx.beginPath();
            ctx.arc(this.zdruzenaTabelaX[i], this.zdruzenaTabelaY[i], 5, 0, 2 * Math.PI);
            ctx.stroke();
        }
        this.UstvariTabeloTočk(this.t)
        

        //Nariše prvo točko
        ctx.beginPath();
        ctx.arc(this.arrX[0], this.arrY[0], 5, 0, 2 * Math.PI);
        ctx.stroke();

                

                //
                if(this.arrX.length > 1){
                    let s=0;
                    let x=0;
                    let y=0;
                    while(s<this.tabelaVmesnihTockX.length){
                        let bezkosX=this.tabelaVmesnihTockX.slice(s,s+this.steviloControlTock+1)
                        let bezkosY=this.tabelaVmesnihTockY.slice(s,s+this.steviloControlTock+1)
                        s+=this.steviloControlTock+1;
                        this.Izračunaj(bezkosX,bezkosY,x,y)
                        x++;
                        y++;
                    }
                
                    
                }
                

        
        
    }
    //Ustvari tabelo za dolocen odsek (zdruzi ancon in control v praviln vrstni red)
    UstvariZdruzenoTabelo(){
        this.zdruzenaTabelaX=[]
        this.zdruzenaTabelaY=[]
        this.zdruzenaTabelaX.push(this.arrX[0])
        this.zdruzenaTabelaY.push(this.arrY[0])
        let ct=0;
        for(let i=1;i<this.arrX.length;i++){
            for(let j=0;j<this.steviloControlTock;j++){
                this.zdruzenaTabelaX.push(this.arrControlX[ct])
                this.zdruzenaTabelaY.push(this.arrControlY[ct])
                ct++;
        }
        this.zdruzenaTabelaX.push(this.arrX[i])
        this.zdruzenaTabelaY.push(this.arrY[i])
    }
        
}

    UstvariTabeloTočk(t){
        this.tabelaVmesnihTockX=[];
        this.tabelaVmesnihTockY=[];
                //Ustvari tabelo vseh točk ki so med control pointi
                for (let i = 1; i < this.zdruzenaTabelaX.length; i++) {
                    let zacasnaTabelaX=[];
                    let zacasnaTabelaY=[];
                    for (let y = 0; y <= 1; y += t) {
                        zacasnaTabelaX.push(((1 - y) * this.zdruzenaTabelaX[i - 1]) + (y * this.zdruzenaTabelaX[i]));
                        zacasnaTabelaY.push(((1 - y) * this.zdruzenaTabelaY[i - 1]) + (y * this.zdruzenaTabelaY[i]));
                    }
                    this.tabelaVmesnihTockX.push(zacasnaTabelaX);
                    this.tabelaVmesnihTockY.push(zacasnaTabelaY);
                }
    }
    Izračunaj(tabelatockX,tabelatockY,x,y){
        while (tabelatockX.length>1) {
                    
            for(let i=1;i<tabelatockX.length;i++){
            
            let zacasnT=this.t;
            let zacasnaTabelaX=[];
            let zacasnaTabelaY=[];
            for (let j = 1; j < tabelatockX[0].length; j++) {
               
                zacasnaTabelaX.push(((1 - zacasnT) * tabelatockX[i-1][j]) + (zacasnT * tabelatockX[i][j]));
                zacasnaTabelaY.push(((1 - zacasnT) * tabelatockY[i-1][j]) + (zacasnT * tabelatockY[i][j]));
               
                zacasnT+=this.t;
                
            }
             
        
            tabelatockX.splice(i-1,1,zacasnaTabelaX);
            tabelatockY.splice(i-1,1,zacasnaTabelaY);
            tabelatockX.splice(i,1);
            tabelatockY.splice(i,1);
            
        }
        
    }
        
        for(let i=0;i<this.arrX.length;i++){
            ctx.beginPath();
            ctx.arc(this.arrX[i], this.arrY[i], 5, 0, 2 * Math.PI);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(this.arrX[x], this.arrY[y]);
        
        for(let i=0;i<tabelatockX[0].length;i++){
            ctx.lineTo(tabelatockX[0][i], tabelatockY[0][i]); 
        }
    
        ctx.lineTo(this.arrX[x+1],this.arrY[y+1])
        ctx.stroke();
    }


}