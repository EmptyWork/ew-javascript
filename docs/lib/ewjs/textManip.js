const letterChanger = (id, behavior = false, debug = false) => {
  let changes = document.querySelectorAll(id)
  let isHover = false
  let interval = 50
  
  if(debug) {
    console.group('Function Letter Changer is initialized')
    console.log(`Found ${changes.length} element(s) with \`${id}\`:`)
  }
  
  changes.forEach(elem => {
    const elemOriginal = elem.textContent
    const maxLengthInterval = elemOriginal.length * 60
    const elemLimitBeforeChanging = maxLengthInterval / 10
    let intervalCount = 0
    
  
    if(debug) {
      console.group(elem)
      console.log("Target element:", elem)
      console.log(`T.textContent: "${elemOriginal}"`)
      console.groupEnd()
    }
  
    if(!behavior) {
      elem.addEventListener('mouseover', () => {
        elem.textContent = elemOriginal
        isHover = true
      })
      
      elem.addEventListener('focusin', () => {
        elem.textContent = elemOriginal
        isHover = true
      })
    
      elem.addEventListener('mouseout', () => {
        isHover = false
      })
    
      elem.addEventListener('focusout', () => {
        isHover = false
      })
    }
  
    setInterval(() => {
      
      let symbol = ['!', '*', '#', '@', '%', '$', '^']
      let innerText = elem.textContent.split('')
      innerText[Math.floor(Math.random() * innerText.length)] = symbol[Math.floor(Math.random() * symbol.length)]
  
      if(intervalCount == maxLengthInterval) {
        elem.textContent = elemOriginal
        intervalCount = 0
      } else if(intervalCount > elemLimitBeforeChanging && !isHover) {
        elem.textContent = innerText.join('')
      }
  
      intervalCount++
    }, interval)
  })

  if(debug) console.groupEnd()
}

{letterChanger('.change')}