const express = require("express");
const app = express();
const mysql = require("mysql2")
const cors = require("cors")

//Aquí se le dice a la aplicación que antes
//de utilizar cualquier cosa use cors
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empleados_crud"
});

//METODO PARA GUARDAR DATOS
app.post("/create", (req, res)=>{
    const nombre = req.body.nombre
    const edad = req.body.edad
    const pais = req.body.pais
    const cargo = req.body.cargo
    const anios = req.body.anios

    db.query('INSERT INTO empleado(nombre, edad, pais, cargo, anios) VALUES(?,?,?,?,?)', [nombre, edad, pais, cargo, anios],
    (err, result)=>{
        if (err){
            console.log(err)
        }else{
            res.send("Empleado registrado con éxito!!!")
        }
    }
    );
});

//METODO PARA LISTAR DATOS
app.get("/empleados", (req, res)=>{
    db.query('SELECT * FROM empleado',
    (err, result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    );
});

//METODO PARA ACTUALIZAR DATOS
app.put("/update", (req, res)=>{
    const id = req.body.id
    const nombre = req.body.nombre
    const edad = req.body.edad
    const pais = req.body.pais
    const cargo = req.body.cargo
    const anios = req.body.anios

    db.query('UPDATE empleado SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?', [nombre, edad, pais, cargo, anios, id],
    (err, result)=>{
        if (err){
            console.log(err)
        }else{
            res.send("Empleado actualizado con éxito!!!")
        }
    }
    );
});

//METODO PARA ELIMINAR DATOS
//En la ruta ponemos que se va a pasar un parámetro, en este caso
//de nombre id
app.delete("/delete/:id", (req, res)=>{
    //Solo vamos a recibir el ID
    const id = req.params.id //params especifica que es un parámetro


    db.query('DELETE FROM empleado WHERE id=?', id,
    (err, result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result)  //Se manda el result para que desde el frontend
                              //puedan capturar esa información
        }
    }
    );
});

app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001....Todo correcto!")
})


