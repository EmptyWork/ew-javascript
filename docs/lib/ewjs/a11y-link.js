const makeA11yLinks = () => {
  const externalLinks = document.querySelectorAll("a[target=_blank]")

  const createSpanElement = (elem = null) => {
    if (!elem) return
    const spanElement = document.createElement("span")
    spanElement.className = "sr-popup"
    spanElement.textContent = "Open a new tab"

    elem.appendChild(spanElement)
  }

  externalLinks.forEach((link) => {
    link.style.position = "relative"
    if (!link.getAttribute("rel"))
      link.setAttribute("rel", "noopener noreferrer")
    createSpanElement(link)
  })
}

{
  makeA11yLinks()
}
