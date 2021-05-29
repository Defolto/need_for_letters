// подгон главного экрана по высоте монитора
export function setHeightMenu() {
    const heightHeader = document.querySelector('header').offsetHeight;
    const heightBody = document.documentElement.clientHeight;
    document.querySelector('.mainBlock').style.height = heightBody - 3 - heightHeader + 'px';
}

window.addEventListener('resize', function(event){
	setHeightMenu();
});

// отключение пролистывания экрана при нажатие на пробел 
var SPACE_KEYCODE=32;
document.onkeydown=function(e){
	var keycode=e.keyCode||e.charCode,
		body=document.body;

	if(keycode!=SPACE_KEYCODE)
		return;
	
	e.preventDefault();
}
