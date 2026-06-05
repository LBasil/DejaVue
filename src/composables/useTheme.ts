import { ref, watch } from 'vue'

const stored = localStorage.getItem('theme')
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches

const dark = ref(stored === 'dark' || (!stored && prefersDark))

watch(
  dark,
  (val) => {
    document.documentElement.classList.toggle('dark', val)
    localStorage.setItem('theme', val ? 'dark' : 'light')
  },
  { immediate: true },
)

export function useTheme() {
  return {
    dark,
    toggle: () => (dark.value = !dark.value),
  }
}
