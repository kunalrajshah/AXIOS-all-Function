// AXIOS Global for Header
axios.defaults.headers.common['X-AUTH-TOKEN']='some global Token';  // When*2 we click on get,post,delete... then it call everytime.

// GET REQUEST
function getTodos() {
  // axios({                                                    // Axios also return Promise.
  //   method:'Get',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   params:{                                                 // params use for set limit how much data we want.
  //     _limit:5
  //   }
  // })

  // axios.get('https://jsonplaceholder.typicode.com/todos', {      // Easy way to do axios opearation with limited data.
  //   params:{_limit:5}
  // })
  // .then((result)=>{
  //   showOutput(result);
  // })
  // .catch(()=>{
  //   console.error('Error');
  // })

  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=6')    // One more way to do axios opearation with limited data.
    .then((result)=>{
      showOutput(result);
    })
    .catch(()=>{
      console.error('Error');
    })
}


// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    UserId:1,
    title:'New ToDo',
    completed:false
  })
  .then((result)=>{
    showOutput(result)
  })
  .catch((err)=>{
    console.log('Error');
  })
}

// PUT/PATCH REQUEST (work one at a time)
function updateTodo() {
  //   For put -> (it replace whole existing object in url) and In url we have to give 'posts/id' (ex-> todos/1)
 axios.put('https://jsonplaceholder.typicode.com/todos/1',{
  title:'updated ToDo',
  completed:true
 })
 .then((result)=>{
  showOutput(result)
})
.catch((err)=>{
  console.log('Error');
})

  //   For patch -> (it append or update details in existing objcet in url) and In url we have to give 'posts/id' (ex-> todos/1)
axios.patch('https://jsonplaceholder.typicode.com/todos/2',{
  title:'Update Todo',
  completed:true
 })
 .then((result)=>{
  showOutput(result)
})
.catch((err)=>{
  console.log('Error');
})

}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/2')
  .then((result)=>{
    showOutput(result)
  })
  .catch((err)=>{
    console.log('Error');
  })
}

// SIMULTANEOUS DATA      (mean by using Axios, we can send multiple HTTP requests concurrently )
function getData() {
  // axios.all([
  //   axios.get('https://jsonplaceholder.typicode.com/todos'),
  //   axios.get('https://jsonplaceholder.typicode.com/posts'),
  // ])
  // .then((result)=>{                  
  //   console.log(result[0]);           // for todos
  //   console.log(result[1]);           // for posts
  //   showOutput(result[1]);
  // })
  axios.all([                                                      // it take request as an array.
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
  ])
  .then(axios.spread((response1, response2)=>{                                // By using axios.spread(()=>{})
    // console.log(response1);           // for todos
    // console.log(response2);           // for posts
    showOutput(response2);
  }))
}

// CUSTOM HEADERS
function customHeaders() {
  const configue={
    headers:{                                             // use headers always as a name
      'Content-Type':'application/Json',
      Authorization:'SomeToken'
    }
  };
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title:'New ToDo',
    completed:false
  },configue)         //Put as a third parameter
  .then((result)=>{
    showOutput(result)
  })
  .catch((err)=>{
    console.log('Error');
  })
}

// ERROR HANDLING
function errorHandling() {
 axios.get('https://jsonplaceholder.typicode.com/todoss')  //tod0ass
 .then((res)=>{
  showOutput(res);
 })
 .catch((err)=>{
  if(err.response)
  {
    //it Mean server responded with a status other than 200 range
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  }
  else if(err.request)
  {
    // It mean Request was made but no response
    console.log(err.request);
  }
  else{
    console.error(err.message);             // Used to console error message.
  }
 })
}


// INTERCEPTING REQUESTS & RESPONSES
// In your code, axios.interceptors.request.use is used to register a request interceptor. This interceptor takes two callback functions as arguments. The first callback function is executed before the request is sent, and the second callback function is executed if an error occurs during the request.
axios.interceptors.request.use((config)=>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config;
},(error)=>{
  return Promise.reject(`Request Error:${error}`)
})

// AXIOS INSTANCES
const axiosInstance=axios.create({
  // Other Custom Settings
  baseURL:'https://jsonplaceholder.typicode.com'
});
// axiosInstance.get('/comments').then((res)=>showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null,2)}</pre>  
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('error').addEventListener('click', errorHandling);
