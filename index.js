import { 

  saveTask, 
  getTasks,
  onGetTasks,
  deleteTasks,
  getTask,
  updateTask,

  
  } from "./firebase.js";

const tasksConrainer = document.getElementById('tasks-container');
const taskForm = document.getElementById('task-form');

let editStatus = false;
let id = '';

  //  con este llamado a window estamos atentos al dom 
window.addEventListener('DOMContentLoaded', async () => {
      // aqui hacemos llamado a la funcion getTasks donde se obtiene los datos de firebase, 
      // se utiliza el metodo .data() para transformar los archivos firebase a archivos JavaScript
    onGetTasks((querySnapshot) =>{
      tasksConrainer.innerHTML = "";

        querySnapshot.forEach(doc => {
          
          const task = doc.data()
          tasksConrainer.innerHTML +=`
              <div class="card card-body mt-2 border-primary">
                  <h3 class="h5">${task.title}</h3>
                  <p >${task.description}</p>
                  <div>
                  <button class='btn btn-primary btn-delete' data-id="${doc.id}"> delete</button>
                  <button class='btn btn-danger btn-update' data-id="${doc.id}"> update</button>
                  </div>
              </div>
          `
    });

      const btnDelete =  tasksConrainer.querySelectorAll('.btn-delete');
       btnDelete.forEach(btn =>{
        btn.addEventListener('click', ({target: {dataset}}) =>{
          deleteTasks(dataset.id);

        });       
      })

      const btnUpdate = tasksConrainer.querySelectorAll('.btn-update');
      btnUpdate.forEach(btn =>{
          btn.addEventListener('click', async ({target: {dataset}})=>{
            const doc = await getTask(dataset.id)
            const task = doc.data();

            taskForm['task-title'].value = task.title; 
            taskForm['task-description'].value = task.description;

            editStatus = true;
            id = dataset.id;

            taskForm['btn-task-form'].innerText = 'Update';
            
        });
      
      })

  });

});



taskForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const title = document.getElementById('task-title');
  const description = document.getElementById('task-description');

    if(!editStatus){
      saveTask(title.value , description.value);
    }else{
      updateTask(id, {
        title: title.value , 
        description: description.value
      });
    }

  taskForm.reset();
  editStatus = false;
  taskForm['btn-task-form'].innerText = 'Save';
})