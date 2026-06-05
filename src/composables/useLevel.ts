import { ref } from 'vue'

const advanced = ref(localStorage.getItem('level') === 'advanced')

export function useLevel() {
  return {
    advanced,
    toggle: () => {
      advanced.value = !advanced.value
      localStorage.setItem('level', advanced.value ? 'advanced' : 'beginner')
    },
  }
}
