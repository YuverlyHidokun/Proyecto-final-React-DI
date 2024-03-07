const express = require("express");
const app = express();
const mysql = require("mysql");
const cors=require("cors");

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Hidokun2003.y",
    database:"ropilocura"
});

app.post("/Empleados",(req,res)=>{
    const nombre=req.body.nombre
    const apellido=req.body.apellido
    const email=req.body.email
    const telefono=req.body.telefono
    const direccion=req.body.direccion

    db.query('INSERT INTO Empleados(Nombre, Apellido, Email, Telefono, Direccion) VALUES(?,?,?,?,?)',[nombre,apellido,email,telefono,direccion],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Usuario registrado con exito!");
        }
    }
    );
});

app.get("/Empleados",(req,res)=>{
    db.query('SELECT * FROM Empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const nombre = req.body.Nombre;
    const apellido = req.body.Apellido;
    const email = req.body.Email;
    const telefono = req.body.Telefono;
    const direccion = req.body.Direccion;

    db.query('UPDATE Empleados SET Nombre=?, Apellido=?, Email=?, Telefono=?, Direccion=? WHERE ID_Empleado=?', [nombre, apellido, email, telefono, direccion, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar el empleado");
            } else {
                res.status(200).send("Empleado actualizado correctamente");
            }
        }
    );
});

app.delete("/Empleados/:id", (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM Empleados WHERE ID_Empleado=?', [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar empleado");
      } else {
        res.send("Empleado eliminado con éxito");
      }
    });
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM Clientes WHERE Email = ? AND Contraseña = ?', [email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.send('error');
        }

        if (result.length > 0) {
            res.send('success');
        } else {
            res.send('error');
        }
    });
});

// Agrega un nuevo usuario
app.post("/Usuarios", (req, res) => {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    db.query('INSERT INTO Clientes (Nombre, Apellido, Email, Telefono, Direccion, Contraseña) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, telefono, direccion, contraseña],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al agregar usuario.");
            } else {
                res.status(200).send("Usuario agregado correctamente.");
            }
        }
    );
});

// Obtiene todos los usuarios
app.get("/Usuarios", (req, res) => {
    db.query('SELECT * FROM Clientes', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener usuarios.");
        } else {
            res.status(200).json(result);
        }
    });
});

// Actualiza un usuario por su ID
app.put("/updateUsuario/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, email, telefono, direccion } = req.body;
    db.query('UPDATE Clientes SET Nombre=?, Apellido=?, Email=?, Telefono=?, Direccion=? WHERE ID_Usuario=?',
        [nombre, apellido, email, telefono, direccion, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar usuario.");
            } else {
                res.status(200).send("Usuario actualizado correctamente.");
            }
        }
    );
});

// Elimina un usuario por su ID
app.delete("/Usuarios/:id", (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Clientes WHERE ID_Usuario = ?', id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar usuario.");
        } else {
            res.status(200).send("Usuario eliminado correctamente.");
        }
    });
});

// Agregar un producto
app.post("/productos", (req, res) => {
    const { Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor } = req.body;
    db.query('INSERT INTO Productos (Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al agregar el producto.");
            } else {
                res.status(201).send("Producto agregado correctamente.");
            }
        }
    );
});

// Obtener todos los productos
app.get("/productos", (req, res) => {
    db.query('SELECT * FROM Productos', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener los productos.");
        } else {
            res.status(200).json(result);
        }
    });
});

// Actualizar un producto por su ID
app.put("/productos/:id", (req, res) => {
    const { Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor } = req.body;
    const idProducto = req.params.id;
    db.query('UPDATE Productos SET Nombre=?, Descripcion=?, Precio=?, Cantidad_Disponible=?, Talla=?, Color=?, Proveedor=? WHERE ID_Producto=?',
        [Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor, idProducto],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar el producto.");
            } else {
                res.status(200).send("Producto actualizado correctamente.");
            }
        }
    );
});

// Eliminar un producto por su ID
app.delete("/productos/:id", (req, res) => {
    const idProducto = req.params.id;
    db.query('DELETE FROM Productos WHERE ID_Producto=?', [idProducto], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar el producto.");
        } else {
            res.status(200).send("Producto eliminado correctamente.");
        }
    });
});

// Endpoint para obtener todos los productos
app.get("/productos", (req, res) => {
    db.query('SELECT * FROM Productos', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener los productos.");
        } else {
            res.status(200).send(result);
        }
    });
});

// Endpoint para agregar un nuevo producto
app.post("/productos", (req, res) => {
    const { Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor } = req.body;
    db.query('INSERT INTO Productos (Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al agregar el producto.");
            } else {
                res.status(201).send("Producto agregado correctamente.");
            }
        }
    );
});

// Endpoint para actualizar un producto existente
app.put("/productos/:id", (req, res) => {
    const { id } = req.params;
    const { Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor } = req.body;
    db.query('UPDATE Productos SET Nombre = ?, Descripcion = ?, Precio = ?, Cantidad_Disponible = ?, Talla = ?, Color = ?, Proveedor = ? WHERE ID_Producto = ?',
        [Nombre, Descripcion, Precio, Cantidad_Disponible, Talla, Color, Proveedor, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar el producto.");
            } else {
                res.status(200).send("Producto actualizado correctamente.");
            }
        }
    );
});

// Endpoint para eliminar un producto
app.delete("/productos/:id", (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Productos WHERE ID_Producto = ?', id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar el producto.");
        } else {
            res.status(200).send("Producto eliminado correctamente.");
        }
    });
});

// Ruta para crear una cuenta de usuario
app.post('/usuarios/crear', (req, res) => {
    const { nombre, apellido, email, password } = req.body;
  
    // Verificar si el usuario ya existe
    db.query('SELECT * FROM Clientes WHERE email = ?', [email], (err, result) => {
      if (err) {
        console.error('Error al verificar usuario:', err);
        res.status(500).send('Error al verificar usuario. Por favor, intenta de nuevo más tarde.');
      } else {
        if (result.length > 0) {
          // El usuario ya existe
          res.status(400).send('El correo electrónico ya está registrado. Por favor, intenta con otro.');
        } else {
          // Crear nueva cuenta de usuario
          db.query('INSERT INTO Clientes (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)', [nombre, apellido, email, password], (err, result) => {
            if (err) {
              console.error('Error al crear cuenta:', err);
              res.status(500).send('Error al crear cuenta. Por favor, intenta de nuevo más tarde.');
            } else {
              res.status(200).send('success'); // Cuenta creada exitosamente
            }
          });
        }
      }
    });
  });


app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})
