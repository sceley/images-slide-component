(function (window) {
	function Slider (options) {
		this.container = options.container;
		this.images = options.images;
		this.init();
		this.event();
	};
	Slider.prototype = {
		constructor: 'Slider',
		init () {
			this.images.forEach(image => {
				let img = document.createElement('img');
				img.src = image;
				img.style.width = window.innerWidth + 'px';
				this.container.appendChild(img);
			});
			this.container.style.width = this.images.length + '00%';
		},
		event () {
			let target = 0;
			let startX;
			let offsetX;
			let startTime;
			let endTime;
			this.container.addEventListener('touchstart', e => {
				startX = e.touches[0].pageX;
				offsetX = 0;
				startTime = Date.now();
			});
			this.container.addEventListener('touchmove', e => {
				e.preventDefault();
				offsetX = e.targetTouches[0].pageX - startX;
				if(target == 0 && offsetX > 0)
					return;
				if(target == this.images.length - 1 && offsetX < 0)
					return;
				this.container.style.transform = 
				`translate(${-(target * window.innerWidth) + offsetX}px, 0)`;
			});
			this.container.addEventListener('touchend', e => {
				e.preventDefault();
				endTime = Date.now();
				if(target == 0 && offsetX > 0)
					return;
				if(target == this.images.length - 1 && offsetX < 0)
					return;
				//边界就翻页值
				let boundary = window.innerWidth / 6;
				//当手指移动时间超过300ms 的时候，按位移算
				if(endTime - startTime > 300){
					if(offsetX >= boundary){
						this.container.style.transform = 
						`translate(${-(--target) * window.innerWidth}px, 0)`;
					}
					else if(offsetX < 0 && offsetX < -boundary){
						this.container.style.transform = 
						`translate(${-(++target) * window.innerWidth}px, 0)`;
					}
					else{
						this.container.style.transform = 
						`translate(${-(target) * window.innerWidth}px, 0)`;
					}
				}else{
					//优化
					//快速移动也能使得翻页
					if(offsetX > 50){
						this.container.style.transform = 
						`translate(${-(--target) * window.innerWidth}px, 0)`;
					}else if(offsetX < -50){
						this.container.style.transform = 
						`translate(${-(++target) * window.innerWidth}px, 0)`;
					}else{
						this.container.style.transform = 
						`translate(${-(target) * window.innerWidth}px, 0)`;
					}
				}
				
			});
		}
	};
	window.Slider = Slider;
})(window);

let images = [];
for(let i = 1; i <= 8; i++){
	images.push(`./images/${i}.JPG`);
}
let slider1 = new Slider({
	container: document.querySelector('#container'),
	images
});