import Alert from '@/components/Alert'
import { Vue, vuetify } from './vuetify'

const component = new Vue({
  vuetify,
  render: (h) => h(Alert),
})

export default (ctx, inject) => {

  const Instance = component.$mount()
  document.body.appendChild(component.$el)

  inject('alert', Instance.$children[0])
}
