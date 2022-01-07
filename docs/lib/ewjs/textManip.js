const letterChanger = (id) => {
  let changes = document.querySelector(id)
  const changesOriginal = changes.textContent;
  let i = 0;
  setInterval(() => {
    let symbol = ['!', '*', '#', '@', '%', '$', '^']
    let innerText = changes.textContent.split('');
    innerText[Math.floor(Math.random() * innerText.length)] = symbol[Math.floor(Math.random() * symbol.length)]
    if(i == 60) {
      changes.textContent = changesOriginal
      i = 0
    } else if(i > 5) {
      changes.textContent = innerText.join('')
    }
    i++
  }, 50)
}

{letterChanger('.change')}