export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)

  if (element) {
    // Prevent default hash behavior
    window.history.pushState({}, "", `#${sectionId}`)

    // Get header height to offset scroll position
    const header = document.querySelector("header")
    const headerHeight = header ? header.getBoundingClientRect().height : 0

    // Calculate the position to scroll to
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20

    // Smooth scroll to the section
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}

