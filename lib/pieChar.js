function PieChar(option){
	this._init(option);
}
PieChar.prototype = {
	constructor:PieChar,
	_init:function(option){
		option=option||{};
		this.x = option.x||window.innerWidth/2;
		this.y = option.y||window.innerHeight/2;
		this.innerRadius = option.innerRadius||180;
		this.outerRadius = option.outerRadius||200;
		this.strokeColor = option.storkeColor||"#999";
		this.fillColor = option.fillColor||"#eee";
		this.lineWidth = option.lineWidth||2;
		this.date = option.date;
		this.animationIndex = 0;
	},
	render:function(layer){

		//大图层 
		var self = this;
		this.group = new Konva.Group();
		layer.add(this.group);
		//绘制外圆
		var outerCircle = new Konva.Circle({
			x:this.x,
			y:this.y,
			stroke:this.strokeColor,
			radius:this.outerRadius,
			strokeWidth:this.lineWidth
		});
		this.group.add(outerCircle);
		//绘制内扇形组
		this.wedgeGroup = new Konva.Group();
		this.group.add(this.wedgeGroup);
		//绘制园外文字组
		this.circTest = new Konva.Group({x:-20,y:-10});
		this.group.add(this.circTest);
		//绘制矩形组
		this.rect = new Konva.Group();
		this.group.add(this.rect); 
		//绘制矩形旁的文字组
		this.recText = new Konva.Group();
		this.group.add(this.recText); 
		
		var starAngle = -90;
		this.date.forEach(function(item,index){
			//绘制内扇形
			var temp = item.rate*360;
			var wedge = new Konva.Wedge({
				x:self.x,
				y:self.y,
				angle:temp,
				radius:self.innerRadius,
				fill:item.color,
				rotation:starAngle
			});
			self.wedgeGroup.add(wedge);
			 
			//绘制圆外文字
			var setX = self.x + 
			Math.cos((starAngle + temp/2)*Math.PI/180) * (self.outerRadius + 30);
			var setY = self.y + 
			Math.sin((starAngle + temp/2)*Math.PI/180) * (self.outerRadius + 30);
			var cText = new Konva.Text({
				x:setX,
				y:setY,
				text:item.rate*100 + "%",
				fill:item.color,
				fontSize:20,
				width:50,
				align:"center"
			});
			self.circTest.add(cText);
			starAngle += temp;
			//绘制矩形
			var rRect = new Konva.Rect({
				x:window.innerWidth-300,
				y:self.y+index*50,
				fill:item.color,
				width:80,
				height:40
			});
			self.rect.add(rRect);
			//绘制矩形旁的文字
			var rText = new Konva.Text({
				x:window.innerWidth-180,
				y:self.y+index*50+10,
				text:item.name,
				fill:item.color,
				fontSize:20,
				width:50,
				align:"center"
			});
			self.recText.add(rText);
		});
	},
	update:function(){
		var self = this;
		if(this.animationIndex ==0 ){
			// 1. 当点击发生时，先使得所有的wedge角度都先设定为0
			this.wedgeGroup.getChildren().forEach(function(item,index){
				item.angle(0);
			});
		}
		var wedge = this.wedgeGroup.getChildren()[this.animationIndex];
		wedge.to({
			angle:this.date[this.animationIndex].rate*360,
			duration:3*this.date[this.animationIndex].rate,
			onFinish:function(){
				// 再来继续调用update这个方法
				self.animationIndex ++;
				if(self.animationIndex>=self.date.length){
					self.animationIndex = 0;
					return;
				}
				self.update();
			}
		});
	}
}
