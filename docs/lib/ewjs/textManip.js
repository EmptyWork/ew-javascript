const letterChanger = (id, behavior = false) => {
  let changes = document.querySelector(id)
  
  const changesOriginal = changes.textContent
  const maxLengthInterval = changesOriginal.length * 60
  const changesLimitBeforeChanging = maxLengthInterval / 10
  
  let isHover = false
  let intervalCount = 0
  let interval = 50

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
    let innerText = changes.textContent.split('')
    
    innerText[Math.floor(Math.random() * innerText.length)] = symbol[Math.floor(Math.random() * symbol.length)]

    if(intervalCount == maxLengthInterval) {
      changes.textContent = changesOriginal
      intervalCount = 0
    } else if(intervalCount > changesLimitBeforeChanging && !isHover) {
      changes.textContent = innerText.join('')
    }

    intervalCount++
  }, interval)
}

{letterChanger('.change')}