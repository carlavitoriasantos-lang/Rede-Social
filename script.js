document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o botão de curtida e a tag span com o número do contador
  const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
  const likeCountElement = likeBtn ? likeBtn.querySelector(".like-count") : null;
  const likeSvg = likeBtn ? likeBtn.querySelector("svg") : null;

  if (!likeBtn || !likeCountElement || !likeSvg) return;

  // Lê o valor inicial de curtidas (ex: 1200)
  let likesCount = parseInt(likeCountElement.textContent.trim(), 10) || 0;
  let isLiked = false;

  // Função para formatar o número (ex: 1201 -> 1.2K)
  function formatLikes(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  }

  // Atualiza o texto na tela no carregamento da página
  likeCountElement.textContent = formatLikes(likesCount);

  // Evento ao clicar no botão
  likeBtn.addEventListener("click", () => {
    isLiked = !isLiked; // Alterna entre curtido (true) e não curtido (false)

    if (isLiked) {
      likesCount++;
      likeBtn.classList.add("liked");
    } else {
      likesCount--;
      likeBtn.classList.remove("liked");
    }

    // Atualiza o valor formatado no contador
    likeCountElement.textContent = formatLikes(likesCount);

    // Efeito visual de "Pulsar" o coração
    likeSvg.style.transform = "scale(1.3)";
    setTimeout(() => {
      likeSvg.style.transform = "scale(1)";
    }, 150);
  });
});