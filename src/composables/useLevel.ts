import { ref } from 'vue'

export type Level = 'beginner' | 'intermediate' | 'experienced'

const stored = localStorage.getItem('level') as Level | null
const validLevels: Level[] = ['beginner', 'intermediate', 'experienced']
const level = ref<Level>(stored && validLevels.includes(stored) ? stored : 'beginner')

export function useLevel() {
  return {
    level,
    setLevel: (l: Level) => {
      level.value = l
      localStorage.setItem('level', l)
    },
  }
}
