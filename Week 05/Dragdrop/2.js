let dragable = document.getElementById('dragable');

let baseX = 0, baseY = 0;

dragable.addEventListener('mousedown', function(){
  let startX = event.clientX, startY = event.clientY;

  let up = event => {
    baseX = baseX + event.clientX - startX;
    baseY = baseY + event.clientY - startY;
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
  }
  let move = event => {
    let range = getNearest(event.clientX, event.clientY);
    range.insertNode(dragable);
    //dragable.style.transform = `translate(${baseX + event.clientX - startX}px, ${baseY + event.clientY - startY}px)`;
  }
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
})

let ranges = [];

let container = document.getElementById('container');
for(let i = 0; i < container.childNodes[0].textContent.length; i++){
  let range = document.createRange();
  range.setStart(container.childNodes[0], i);
  range.setEnd(container.childNodes[0], i);

  //console.log(range.getBoundingClientRect());
  ranges.push(range);
}

function getNearest(x, y){
  let min = Infinity;
  let nearest = null;

  for(let range of ranges){
    let rect = range.getBoundingClientRect();
    let distance = (rect.x - x) ** 2 + (rect.y - y) ** 2;
    if(distance < min){
      nearest = range;
      min = distance;
    }
  }
  return nearest;
}

document.addEventListener('selectstart', e => e.preventDefault());