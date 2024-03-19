<template><div class='relative flex flex-col gap-y-2 p-4'>
  <div class="text-2xl">Books Demo <span class='text-xs opacity-50'>[ alerts are not implemented, so add proper data while CRUD ]</span></div>
  <div class="flex gap-x-4 mt-1 items-center">
    <template v-for='(cat,j) in categoriesArray' :key='j'>
      <div @click='toCat(cat)' class="px-6 py-0.5 bg-gray-100 border-b-2 border-transparent hover:border-gray-400 cursor-pointer rounded">{{cat}}</div>
    </template>
    <div @click='catShow=true' class="px-4 text-xl py-0.5 bg-gray-100 border-b-2 border-transparent hover:border-gray-400 cursor-pointer rounded">+</div>
  </div>
  <div class="relative p-4 ring-[1px] ring-gray-200 mt-6">
    <div class="absolute z-10 -top-3 flex gap-x-2 items-center">
      <div class="bg-white shadow-lg px-6 py-1 text-xs">{{category}}</div>
      <div @click='upShow=true' class="bg-white shadow-lg px-3 hover:bg-gray-100 hover:rounded cursor-pointer">+</div>
    </div>    
    <div class='relative flex flex-wrap gap-4'>
      <template v-for='(book,i) in books' :key='i'>
        <Book @updated='bookUpdated' :id='book.id' :title='book.title' :author='book.author' :category="book.category" :image='book.image' />
      </template>    
    </div>
  </div>
  <Teleport to='#books'>
    <Transition>
      <div v-if='catShow' @click.self='forCatShow' class="fixedDiv">    
        <div class="centerIt centerItAnimation bg-white shadow-xl p-8 rounded-md flex flex-col gap-4 p-4">
          <div @click='forCatShowInner' class="absolute right-2 top-1 mt-1 flex justify-center items-center w-7 h-7 hover:bg-gray-200 transition-all duration-300 rounded-full cursor-pointer">&#9874;</div>
          <div class="grid grid-cols-12 mt-2">
            <label class='col-span-5'>ID</label>
            <input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='newCaregoryToAddID'>
          </div>
          <div class="grid grid-cols-12 mt-2">
            <label class='col-span-5'>Cateogry</label>
            <input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='newCaregoryToAdd'>
          </div>
          <div @click='catAdded' class="rounded-md cursor-pointer bg-gray-100 border-b-2 border-transparent hover:border-gray-400 p-2 text-center hover:bg-gray-200">go!</div>
        </div>
      </div>
    </Transition>   
  </Teleport>

  <Teleport to='#books'>
    <Transition>
      <div v-if='upShow' @click.self='forUpShow' class="fixedDiv">    
        <div class="centerIt centerItAnimation bg-white shadow-xl p-8 rounded-md flex flex-col gap-4 p-4">
          <div @click='forUpShowInner' class="absolute right-2 top-1 mt-1 flex justify-center items-center w-7 h-7 hover:bg-gray-200 transition-all duration-300 rounded-full cursor-pointer">&#9874;</div>
          <div class="grid grid-cols-12 mt-2">
            <label class='col-span-5'>ID</label>
            <input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='newID'>
          </div>
          <div class="grid grid-cols-12">
            <label class='col-span-5'>Title</label>
            <input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='newTitle'>
          </div>
          <div class="grid grid-cols-12">
            <label class='col-span-5'>Author</label>
            <input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='newAuthor'>
          </div>
          <div class="grid grid-cols-12">
            <label class='col-span-5'>Image</label>
            <input class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md' type="text" v-model='newImage'>
          </div>
          <div class="grid grid-cols-12">
            <label class='col-span-5'>Category</label>
            <select v-model='newCaregory' class='col-span-7 outline-none ring ring-gray-100 hover:ring-gray-200 focus:ring-gray-300 transition-all duration-300 rounded-md'>
              <template v-for='(cat,m) in categoriesArray' :key='m'>
                <option>{{cat}}</option>
              </template>
            </select>
          </div>
          <div @click='bookAdded' class="rounded-md cursor-pointer bg-gray-100 border-b-2 border-transparent hover:border-gray-400 p-2 text-center hover:bg-gray-200">go!</div>
        </div>
      </div>
    </Transition>   
  </Teleport>
</div></template>

<script setup>
  import Book from '/src/components/Book.vue'
  import axios from 'axios'
  import { ref, onMounted } from 'vue'

  const categories = ref([])
  const books = ref([])
  const category = ref('Category')
  const categoriesArray = ref([])

  const upShow = ref(false)
  const catShow = ref(false)
  const newID = ref('')
  const newImage = ref('')  
  const newTitle = ref('')
  const newAuthor = ref('')
  const newCaregory = ref('')
  const newCaregoryToAdd = ref('')
  const newCaregoryToAddID = ref('')

  const toCat = async (cat) => {
    category.value = cat
    await axios.get('https://sore-pleat-hen.cyclic.app/books', { params:{ category:cat } })
    .then((res) => {
      books.value = res.data
    })
  }

  const bookUpdated = async () => {    
    books.value = []
    await axios.get('https://sore-pleat-hen.cyclic.app/books', { params:{ category:category.value } })
    .then((res) => {
      books.value = res.data
    })
  }

  
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
  const forCatShow = (e) => {
    catShow.value = !catShow.value
    if(e.target.children[0].classList.contains('centerItAnimationOut')) e.target.children[0].classList.add('centerItAnimation') 
    else e.target.children[0].classList.add('centerItAnimationOut') 
  }
  const forCatShowInner = (e) => {
    catShow.value = !catShow.value
    if(e.target.parentElement.classList.contains('centerItAnimationOut')) e.target.parentElement.classList.add('centerItAnimation') 
    else e.target.parentElement.classList.add('centerItAnimationOut') 
  }

  const bookAdded = async () => {
    await axios.post(`https://sore-pleat-hen.cyclic.app/books`, {
      id: newID.value,
      image: newImage.value,  
      title: newTitle.value,
      author: newAuthor.value,
      category: newCaregory.value,    
    })
    .then((res) => {
      books.value = []
      axios.get(`https://sore-pleat-hen.cyclic.app/books`, { params:{ category:category.value } })
      .then((res) => {        
        books.value = res.data
      })
    })
    .finally(() => { 
      upShow.value = !upShow.value 
      newID.value = ''
      newImage.value = ''  
      newTitle.value = ''
      newAuthor.value = ''
      newCaregory.value = ''
    })        
  }

  const catAdded = async () => {
    await axios.post(`https://sore-pleat-hen.cyclic.app/categories`, {
      id: newCaregoryToAddID.value,
      name: newCaregoryToAdd.value
    })
    .then((res) => {
      categories.value = []
      categoriesArray.value = []
        axios({
        baseURL: 'https://sore-pleat-hen.cyclic.app/categories',
        method: 'get',    
      })
      .then((res) => {
        categories.value = res.data
        categories.value.forEach((cat)=>{
          categoriesArray.value.push(cat.name)
        })
      })
      .finally(() => { 
      catShow.value = !catShow.value 
    })        
    })    
  }

  onMounted(()=>{    
    axios({
      baseURL: 'https://sore-pleat-hen.cyclic.app/categories',
      method: 'get',    
    })
    .then((res) => {
      categories.value = res.data
      categories.value.forEach((cat)=>{
        categoriesArray.value.push(cat.name)
      })
    })
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
