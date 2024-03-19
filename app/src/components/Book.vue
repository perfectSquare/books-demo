<template><div class='relative p-4 shadow-xl rounded inline-flex flex-col items-center gap-y-2 bg-white text-sm'>
	<img :src="image" class='w-40 h-52'>
	<div class="text-red-400">{{title}}</div>
	<div class="text-blue-400">{{author}}</div>
	<div class="flex gap-x-4 text-lg">
		<div @click='editCkick' class="text-black cursor-pointer transform hover:scale-110">&#10001;</div>
		<div @click='goneSure=true' class="text-black cursor-pointer transform hover:scale-110">&#10008;</div>
	</div>
	<Teleport to='#books'>
		<Transition>
			<div v-if='upShow' @click.self='forUpShow' class="fixedDiv">		
				<div class="centerIt centerItAnimation bg-white shadow-xl p-8 rounded-md flex flex-col gap-4 p-4">
					<div @click='forUpShowInner' class="absolute right-2 top-1 flex justify-center items-center w-6 h-6 hover:bg-gray-200 transition-all duration-300 rounded-full cursor-pointer">&#9874;</div>
					<div class="grid grid-cols-12">
						<label class='col-span-5'>Title</label>
						<input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='newTitle'>
					</div>
					<div class="grid grid-cols-12">
						<label class='col-span-5'>Author</label>
						<input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='newAuthor'>
					</div>
					<div class="grid grid-cols-12">
						<label class='col-span-5'>Category</label>
						<select v-model='newCaregory' class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md'>
			              <template v-for='(cat,m) in categoriesArray' :key='m'>
			                <option>{{cat}}</option>
			              </template>
			            </select>
					</div>
					<div @click='updateGo' class="rounded-md cursor-pointer bg-gray-100 border-b-2 border-transparent hover:border-gray-400 p-2 text-center hover:bg-gray-200">go!</div>
				</div>
			</div>
		</Transition>		
	</Teleport>

	<Teleport to='#books'>
		<Transition>
			<div v-if='goneSure' @click.self='forGoneShow' class="fixedDiv">		
				<div class="centerIt centerItAnimation bg-white shadow-xl p-8 rounded-md flex flex-col gap-4 p-4">
					<div @click='forGoneShowInner' class="absolute right-2 top-1 flex justify-center items-center w-6 h-6 hover:bg-gray-200 transition-all duration-300 rounded-full cursor-pointer">&#9874;</div>
					<div class="grid grid-cols-12">
						<label class='col-span-5'>Are youe Sure ?</label>
						<div class='col-span-7 flex gap-x-6 justify-center'>
							<div @click='gone' class="text-black cursor-pointer transform hover:scale-110 text-xl">&#10004;</div>
							<div @click='goneCancel' class="text-black cursor-pointer transform hover:scale-110 text-xl">&#10008;</div>
							<!-- <div @click='updateGo' class="rounded-md cursor-pointer bg-gray-100 border-b-2 border-transparent hover:border-gray-400 p-2 text-center hover:bg-gray-200">go!</div> -->
						</div>
					</div>					
				</div>
			</div>
		</Transition>		
	</Teleport>
</div></template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
	import axios from 'axios'
	const props = defineProps({
		id: String,
		title: String,
		author: String,
		category: String,
		image: String
	})
	const emit = defineEmits(['updated'])
	const upShow = ref(false)
	const goneSure = ref(false)
	const newTitle = ref('')
	const newAuthor = ref('')
	const newCaregory = ref('')
	const idToSend = computed(()=> props.id )
	const imageToSend = computed(()=> props.image )
	const categoriesArray = ref([])

	const forUpShow = (e) => {
		upShow.value = !upShow.value
		if(e.target.children[0].classList.contains('centerItAnimationOut')) e.target.children[0].classList.add('centerItAnimation')	
		else e.target.children[0].classList.add('centerItAnimationOut')	
	}
	const forUpShowInner = (e) => {
		upShow.value = !upShow.value
		if(e.target.parentElement.classList.contains('centerItAnimationOut')) e.target.parentElement.classList.add('centerItAnimation')	
		else e.target.parentElement.classList.add('centerItAnimationOut')	
	}
	const forGoneShow = (e) => {
		goneSure.value = !goneSure.value
		if(e.target.children[0].classList.contains('centerItAnimationOut')) e.target.children[0].classList.add('centerItAnimation')	
		else e.target.children[0].classList.add('centerItAnimationOut')	
	}
	const forGoneShowInner = (e) => {
		goneSure.value = !goneSure.value
		if(e.target.parentElement.classList.contains('centerItAnimationOut')) e.target.parentElement.classList.add('centerItAnimation')	
		else e.target.parentElement.classList.add('centerItAnimationOut')	
	}
	const updateGo = async () => {
		await axios.put(`https://sore-pleat-hen.cyclic.app/books/${idToSend.value}`, {
			title: newTitle.value,
			author: newAuthor.value,
			category: newCaregory.value,
			image: imageToSend.value
		})
		.then((res) => {
			emit('updated')
		})
		.finally(() => { 
			upShow.value = !upShow.value 
		})			
	}		

	const gone = async () => {
		await axios.delete(`https://sore-pleat-hen.cyclic.app/books/${idToSend.value}`)
		.then(() => {
			emit('updated')		    
		})
	}

	const goneCancel = (e) => {
		goneSure.value = !goneSure.value
		if(e.target.parentElement.parentElement.parentElement.parentElement.children[0].classList.contains('centerItAnimationOut')) e.target.parentElement.parentElement.parentElement.parentElement.children[0].classList.add('centerItAnimation')	
		else e.target.parentElement.parentElement.parentElement.parentElement.children[0].classList.add('centerItAnimationOut')	
	}

	const editCkick = async () => {
		upShow.value = true
		categoriesArray.value = []
		await axios({
	      baseURL: 'https://sore-pleat-hen.cyclic.app/categories',
	      method: 'get',    
	    })
	    .then((res) => {
	      res.data.forEach((cat)=>{
	        categoriesArray.value.push(cat.name)
	      })
	    })
	}

	onMounted(()=>{    
	    
	  })

</script>

<style scoped>
	.v-enter-from{ opacity:0;  }
	.v-enter-active{ transition:all 0.5s linear;  }
	.v-leave-from{ opacity:1;  }
	.v-leave-active{ transition:all 0.5s linear;  }
	.fixedDiv{
		position: fixed;
		top: 0%;
		background-color: rgb(242, 242, 242, 0.5);
		width: 100%;
		height: 100%;
		z-index: 10;
	}
	.centerIt{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);				
	}
	.codeCenter{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);				
		width: 90%;
		height: 90%;
	}	
	.centerItAnimation{ animation: centerItAnimationFrames 0.5s linear forwards;  }
	@keyframes centerItAnimationFrames{
		0%{ top:0% }
		100%{ top:50% }
	}
	.centerItAnimationOut{ animation: centerItAnimationOutFrames 0.5s linear forwards;  }
	@keyframes centerItAnimationOutFrames{
		0%{ top:50% }
		100%{ top:0% }
	}
</style>