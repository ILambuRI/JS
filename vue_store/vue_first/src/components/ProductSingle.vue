<template>
  <div class="my-route">
    {{ message }}
		  <ul>
			  <li v-for="todo,key in todos">{{todo}} <button @click="deleteTodo(key)">delete</button></li>
			</ul>
			<input type="text" v-model="todo_new" />		
			<button @click="addTodo" >add</button>
  </div>
</template>

<script>
export default {
  name: 'myroute',
  data () {
    return {
    message: 'Hello World!',
	  todos: ['test1','test2'],
	  todo_new: ''
    }
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
}
</script>

