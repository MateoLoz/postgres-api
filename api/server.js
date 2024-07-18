import pg from 'pg';

const { Pool } = pg;



 const express = require('express')
 const mysql = require('mysql');
 const cors = require('cors');
 const dotenv = require('dotenv');
 dotenv.config();
 const bodyparser = require('body-parser');
 const port = 3005;
 const app = express();



 const pool = new Pool({

    connectionString: process.env.POSTGRES_URL,
  
  })






 
 app.use(cors());
 app.use(express.json());
  app.use(bodyparser.urlencoded({extended: true}));


   
  pool.connect((err)=>{
    if(err) console.log(err);
    console.log('server funcioanndo');
})


app.get('/', (re,res)=>{
       const sql = "SELECT * FROM `usuarios`";
        pool.query(sql, (err,data)=>{
           if(err) return res.json(err);
           console.log(data);
           return res.json(data);
       })
       console.log('buscando..');
   })

app.post('/create',(req,res)=>{
  
  
   const sql = " INSERT INTO `usuarios` ( `nombre`, `apellido`,  `email`, `membresia`, `stado`, `vencimiento`, `horas`,`entrada`, `salida`) VALUES (?);"
   const values = [
     req.body.nombre,
     req.body.apellido,
     req.body.email,
     req.body.membresia,
     req.body.stado,
    req.body.vencimiento,
     req.body.horas,
    req.body.entrada,
           req.body.salida,
   ];
   console.log(values)
   pool.query(sql, [values], (err,data)=>{
       if(err) return res.json(err);
       console.log(data);
       return res.json("Creando..");
   })
   console.log('creando..');
        })

     app.put('/update', (req,res)=>{
   const sql = "UPDATE `usuarios` SET `nombre` = ?, `apellido` = ?, `email` = ?, `stado` = ?, `vencimiento` = ? , `horas` = ? WHERE `usuarios`.`id` = ?;";
   const id = req.body.id;
   const values = [
       req.body.nombre,
    req.body.apellido,
    req.body.email,
    req.body.stado,
    req.body.vencimiento,
   req.body.horas,
   ]
  
    console.log(values)



   pool.query(sql,[...values,id ],(err,data)=>{
       if(err) return res.json(err);
       console.log(data);
       return res.json('Datos modificados!');
   })
   console.log('actualizando..');
})

app.get('/ass',(re,res)=>{
   return res.json("From backend");
})

app.delete('/', (req,res)=>{
const sql = "DELETE FROM `usuarios` WHERE `usuarios`.`id` = ?"

pool.query(sql,[req.body.id],(err,data)=>{
   if(err) return res.json(err);
   return res.json("eliminando..");
})
console.log('eliminando..');
  })


app.put('/serch',(req,res)=>{

 const sql = "SELECT * FROM `usuarios` WHERE nombre OR apellido = ?;"
  const values = [
   req.body.serch,
  ]
  console.log(values);
  pool.query(sql,[...values],(err,data)=>{
   if(err) return res.json(err);
   return res.json(data);
  })
    })

app.get('/Pago',(req,res)=>{

   const sql = "SELECT * FROM usuarios WHERE usuarios.stado = 'Pago';"

   pool.query(sql,(err,data)=>{
       if(err) return res.json(err);
      return res.json(data);
   })
   })

   app.get('/Inpago',(req,res)=>{

       const sql = "SELECT * FROM usuarios WHERE usuarios.stado = 'Inpago';"
  
       pool.query(sql,(err,data)=>{
           if(err) return res.json(err);
           return res.json(data);

       })
       })

       app.get('/bono-mensual-medium',(req,res)=>{

           const sql = "SELECT * FROM usuarios WHERE usuarios.membresia = 'bono mensual medium';"
      
           pool.query(sql,(err,data)=>{
               if(err) return res.json(err);
               return res.json(data);
              
           })
           })

           app.get('/bono-mensual-basico',(req,res)=>{

               const sql = "SELECT * FROM usuarios WHERE usuarios.membresia = 'bono mensual basico';"
          
               pool.query(sql,(err,data)=>{
                   if(err) return res.json(err);
                   return res.json(data);
                  
               })
               })

               app.get('/bono-bicho-feo',(req,res)=>{

                   const sql = "SELECT * FROM usuarios WHERE usuarios.membresia = 'bono bicho feo';"
              
                   pool.query(sql,(err,data)=>{
                       if(err) return res.json(err);
                       return res.json(data);
                      
                   })
                   })

                   app.get('/taller-intensivo',(req,res)=>{

                       const sql = "SELECT * FROM usuarios WHERE usuarios.membresia = 'taller intensivo';"
                  
                       pool.query(sql,(err,data)=>{
                           if(err) return res.json(err);
                           return res.json(data);
                          
                       })
                       })

                       app.get('/bono-semanal',(req,res)=>{

                           const sql = "SELECT * FROM usuarios WHERE usuarios.membresia = 'bono semanal';"
                      
                           pool.query(sql,(err,data)=>{
                               if(err) return res.json(err);
                              return res.json(data);
                              
                           })
                           })
  
                           app.get('/bono-diario',(req,res)=>{

                               const sql = "SELECT * FROM usuarios WHERE usuarios.membresia = 'bono diario';"
                          
                               pool.query(sql,(err,data)=>{
                                   if(err) return res.json(err);
                                  return res.json(data);
                                  
                              })
                               })





   
                            

 app.listen(port,()=> console.log('server is running! '));



