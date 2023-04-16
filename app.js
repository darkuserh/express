const { error } = require('console')
const express=require('express')
const fs=require('fs')
let app=express()
let movies=JSON.parse(fs.readFileSync('./data/movies.json'))
app.use(express.json())
const getAllMovies=(req,res)=>{
    res.status(200).json({
    status:'sucess',
    count:movies.lenght,
    data:{
        movies:movies
    }
    })
}
// // app.get('/',(req,res)=>{
//      // res.status(200).send('<h4>Hello from express server</h4>')
// //     res.status(200).json({message:'hello world',status:200})
// // })
// // app.post('/',()=>{
const getMovie=(req,res)=>{
    console.log(req.params)
    const id=+req.params.id*1;
   let movie= movies.find(el=>el.id===id)
   if(!movie){
    res.status(404).json({
        status:'fail',
            message:'This is movie'+id+'is not defined'       

    })
   }
    res.status(200).json({
        status:'sucess',
        data:{
            movies:movies
        }
    })
}
// // })

// // app.get('/api/v1/movies',(req,res)=>{
// // res.status(200).json({
// // status:'sucess',
// // count:movies.lenght,
// // data:{
// //     movies:movies
// // }
// // })
// // })


const createMovie=(req,res)=>{

    console.log(req.body)
    const newId=movies[movies.lenght-1].id+1
    const newMovies=Object.assign({id:newId},req.body)
    movies.push(newMovies)
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:'sucess',
            count:movies.lenght,
            data:{
                movies:movies
            }
            })
    })
}


const UpdateMovie=(req,res)=>{
 
    const id=req.params.id*1
    const moviesToUpdate=movies.find(el=>el.id===id)
    if(!moviesToUpdate){
  return    res.status(404).json({
        status:'fail',
        message:'No movies object with ID'+id+'is defined err'
      })
    }
    const index=movies.indexOf(moviesToUpdate) 
    Object.assign(moviesToUpdate,req.body)
    movies[index]=moviesToUpdate
    
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status:'sucess',
            data:{
                movies:moviesToUpdate
            }
            })
    })
}

    const deleteMovie=(req,res)=>{
        const id = req.params.id * 1;
        const movieToDelete = movies.find(el => el.id === id);
        if(!movieToDelete){
            return  res.status(404).json({
                  status:'fail',
                  message:'No movies object with ID'+id+'is defined'
                })
              }
              const index = movies.indexOf(movieToDelete);

              movies.splice(index, 1);
    
    
              fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
                res.status(204).json({
                    status: "success",
                    data: {
                        movies: null
                    }
                })
            })
        }
        

// app.get('/api/v1/movies',getAllMovies)
// app.get('/api/v1/movies/:id',getMovie)
// app.post('/api/v1/movies',createMovie)
// app.patch('/api/v1/movies/:id',UpdateMovie)
// app.delete('/app/v1/movies/:id',deleteMovie)
app.route('/api/v1/movies')
.post(createMovie)
.get(getAllMovies)
app.route('/app/v1/movies/:id')
.get(getMovie)
.delete(deleteMovie)
.patch(UpdateMovie)

const port=3000;
app.listen(port,()=>{
    console.log('A server has started.......')
})
