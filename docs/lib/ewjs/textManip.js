const letterChanger = (id, behavior = false) => {
  let changes = document.querySelector(id)
  const changesOriginal = changes.textContent;
  let isHover = false;
  let i = 0;

  if(!behavior) {
    changes.addEventListener('mouseover', () => {
      changes.textContent = changesOriginal
      isHover = true
    })
    
    changes.addEventListener('focusin', () => {
      changes.textContent = changesOriginal
      isHover = true
    })
  
    changes.addEventListener('mouseout', () => {
      isHover = false
    })
  
    changes.addEventListener('focusout', () => {
      isHover = false
    })
  }

  setInterval(() => {
    let symbol = ['!', '*', '#', '@', '%', '$', '^']
    let innerText = changes.textContent.split('');
    innerText[Math.floor(Math.random() * innerText.length)] = symbol[Math.floor(Math.random() * symbol.length)]

    if(i == 60) {
      changes.textContent = changesOriginal
      i = 0
    } else if(i > 5 && !isHover) {
      changes.textContent = innerText.join('')
    }

    i++
  }, 50)
}

{letterChanger('.change')}