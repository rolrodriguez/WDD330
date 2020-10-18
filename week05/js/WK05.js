Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app = new Vue({
  el: '#app',
  data: {
    userList: [
      {id: 0, text: 'Vegetables'},
      {id: 1, text: 'Cheese'},
      {id: 2, text: 'Others'}

    ]
  }
}
);