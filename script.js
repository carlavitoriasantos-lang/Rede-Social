//botão curtida

document.addEventListener("DOMContentLoaded", () =>  {
    const likeBtn = document.querySelector("left.actions . action.btn:fist-child");
    if (condition!likeBtn) retury;
    const likeSvg = likeBtn.querySelector("svg");{
        
    //localiza o contador

    let texNode = Array.from(likeBtn.childNodes).find(node) => node.nodeType
    === Node. TEXT_NODE && node.textContent.trim() !== ""
   }
 } );
//zera o contador
let cont = 0;

//atualia
if(textNode){
    textNode.textContent = '0';
}

//coração
function applyLikedStyle (){
    likeSvg.style.fill = "#a30303";
    likeSvg.style.stroke = "#a30303";
    likeSvg.style.color = "#a30303";


    //efeito curtida
    likeSvg.style.transform = "scale(1.3)";
    setTimeout(() => (likeSvg.style.transform = "scale(1)")150);    
}

