setInterval(horario, 1000);

function horario() {
  const date = new Date();
  var hora = date.getHours();
  var minuto = date.getMinutes();

  document.getElementById("horas").innerHTML = hora;
  document.getElementById("minutos").innerHTML = minuto;
  if(minuto<10){
    document.getElementById('minutos').innerHTML = `0${minuto}`
  }

}

function rand(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    var numAleatorio = Math.floor(Math.random() * (max - min) + min)
    document.getElementById('baterry').innerHTML = `${numAleatorio}%<img src="assets/img/battery_3_bar_FILL0_wght400_GRAD0_opsz24.svg" style="rotate: 90deg;">`
}
rand(0,100)