////蛇的构造函数
//function Rect(option){
//	this._init(option);
//}
////蛇的原型对象
//Rect.prototype = {
//	constructor : Rect,
//	_init:function(option){
//		option= option||{};
//		this.x = option.x||0;
//		this.y = option.y||0;
//		this.w = option.w||10;
//		this.h = option.h||10;
//		this.fillColor = option.fillColor||"#999";
//		this.strokeColor = option.strokeColor||"#333";
//		this.headColor = option.headColor||"red";
//		this.footColor = option.footColor||"green";
//		this.lineWidth = option.lineWidth||1;
//	},
//	render:function(ctx){
//		console.log("nihao ");
//		ctx.beginPath();
//		ctx.lineWidth=this.lineWidth;
//		ctx.fillStyle = this.fillColor;
//		ctx.strokeStyle = this.strokeColor;
//		ctx.rect(this.x,this.y,this.w,this.h);
//		ctx.fill();
//		ctx.stroke();
//	}
//}
// 绘制一条蛇 --> 蛇的组成其实是一系列矩形
		function Rect(x,y,w,h,color){
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.color = color;
		}
		Rect.prototype.draw = function(){
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.w, this.h);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.stroke();
		}
// 再来准备Snake的构造函数
		function Snake(){
			// 需要准备一个数组，目的是在于保存所有的组成snake的矩形对象
			this.snakeArrays = [];
			// 初始化snake中snakeArrays
			for(var i=0;i<3;i++){
				var rect = new Rect(i*snakeWH,0,snakeWH,snakeWH,snakeBodyColor);
				// 是使得蛇的头是出现在数组的第一位，第一位上的数据，都不能移除
				this.snakeArrays.splice(0,0,rect);
			}
			// 先找出第一个矩形
			this.head = this.snakeArrays[0];
			this.head.color = snakeHeadColor;
			// 有一个实例属性，用于保存蛇的移动方向
			this.dir = RIGHT;
		}
		// 再来准备Snake的构造函数
		function Snake(){
			// 需要准备一个数组，目的是在于保存所有的组成snake的矩形对象
			this.snakeArrays = [];
			// 初始化snake中snakeArrays
			for(var i=0;i<3;i++){
				var rect = new Rect(i*30,0,snakeWH,snakeWH,snakeBodyColor);
				// 是使得蛇的头是出现在数组的第一位，第一位上的数据，都不能移除
				this.snakeArrays.splice(0,0,rect);
			}
			// 先找出第一个矩形
			this.head = this.snakeArrays[0];
			this.head.color = snakeHeadColor;
			// 有一个实例属性，用于保存蛇的移动方向
			this.dir = RIGHT;
		}
		Snake.prototype.draw = function(){
			for(var i=0;i<this.snakeArrays.length;i++){
				this.snakeArrays[i].draw();
			}
		}
		Snake.prototype.move = function(){
			// 贪吃蛇核心思路：加一个减一个
			// 在蛇头所在的位置上创建一个矩形，并且将这个矩形添加到snake对象的数组中；要将蛇尾最后一个进行移除
			var head = this.head;
			var rect = new Rect(head.x,head.y,snakeWH,snakeWH,snakeBodyColor);
			this.snakeArrays.splice(1,0,rect);
			// 改为有条件的执行
			if(isEat()){
				food = createFood();
			}else{
				this.snakeArrays.pop();
			}
			// 使得蛇头往右移动一个位置 
			// 需要根据给定的this.dir 去确定蛇头的移动方向
			if(this.dir == RIGHT){
				this.head.x += snakeWH;
			}else if(this.dir == LEFT){
				this.head.x -= snakeWH;
			}else if(this.dir == UP){
				this.head.y -= snakeWH;
			}else if(this.dir == DOWM){
				this.head.y += snakeWH;
			}
			// 进行小蛇死亡的判断
			// 蛇头撞到墙  canvas边界
			if(this.head.x<0||this.head.x>canvas.width-snakeWH||this.head.y<0||this.head.y>canvas.height-snakeWH){
				clearInterval(timer);
				alert("游戏结束");
			}
			// 蛇头撞到自身  不包括蛇头
			for(var i=1;i<this.snakeArrays.length;i++){
				var s = this.snakeArrays[i];
				if(this.head.x == s.x&&this.head.y == s.y){
					clearInterval(timer);
					alert("游戏结束");
				}
			}
		}
// 使用一个函数，去实现对于食物的创建
		function createFood(){
			var foodIsOnSnake = true;
			while(foodIsOnSnake){
				foodIsOnSnake = false;
				var x = parseInt(Math.random()*(canvas.width/snakeWH))*snakeWH;
				var y = parseInt(Math.random()*(canvas.height/snakeWH))*snakeWH;
				var rect = new Rect(x,y,snakeWH,snakeWH,foodColor);
				for(var i=0;i<snake.snakeArrays.length;i++){
					var sk = snake.snakeArrays[i];
					if(sk.x == x && sk.y == y){
						foodIsOnSnake = true;
						break;
					}
				}
			}
			return rect;
		}
		// 使用一个函数，去判断食物是否被吞噬了
		function isEat(){
			if(snake.head.x == food.x && snake.head.y == food.y){
				return true;
			}
			return false;
		}