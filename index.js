import { Select } from './select/select'
import './select/style.scss'

const select = new Select('#select', {
  placeholder: 'Choose an element',
  selectedId: '2',
  data: [
    { id: 1, value: 'React' },
    { id: 2, value: 'Vue' },
    { id: 3, value: 'Angular' },
    { id: 4, value: 'Next' },
    { id: 5, value: 'Nest' },
    { id: 6, value: 'Node' },
  ],
})

window.s = select
