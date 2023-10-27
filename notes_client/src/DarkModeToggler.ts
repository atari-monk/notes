// TypeScript class for toggling dark mode
export class DarkModeToggler {
  private darkModeToggle: HTMLButtonElement
  private body: HTMLBodyElement
  private isDarkMode: boolean = true

  constructor() {
    this.darkModeToggle = document.getElementById(
      'darkModeToggle'
    ) as HTMLButtonElement
    this.body = document.body as HTMLBodyElement

    // Set dark mode as default
    this.body.classList.add('dark-mode')

    this.darkModeToggle.addEventListener(
      'click',
      this.toggleDarkMode.bind(this)
    )
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode
    this.body.classList.toggle('dark-mode', this.isDarkMode)
  }
}
