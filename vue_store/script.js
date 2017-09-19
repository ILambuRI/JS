var app = new Vue({
	el: '#app',
	data: {
	  message: 'Hello World!',
	  todos: ['test1','test2'],
	  todo_new: ''
	},
	methods:{
		addTodo: function(){
			this.todos.push(this.todo_new);
			this.todo_new = '';
		},
		deleteTodo:function(key){
			this.todos.splice(key,1);
		}
	}
})
