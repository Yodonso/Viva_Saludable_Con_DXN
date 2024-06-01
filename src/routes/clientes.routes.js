import {Router} from 'express'
import pool from '../database.js'

const route= Router();

/* --------------------- crea nuevo items para guardar ------------------------- */
route.get('/addCliente', ( req , res)=>{
  res.render('clientes/addCliente')
});

route.post('/addCliente', async (req, res)=>{
  try {
      const { nombre, apellido, telefono, email } = req.body
      const newcliente = {
          nombre, apellido, telefono, email
      }
      await pool.query('INSERT INTO clientes SET ?', [newcliente]);
      res.redirect('/listCliente');
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

/* ------------------------ muestra la lista de items ----------------------- */
route.get('/listCliente', async(req, res) =>{
  try{
      const[result]= await pool.query('SELECT * FROM clientes');
      res.render('clientes/listCliente', {clientes: result})
      
  }catch (error) {
      res.status(500).json({message: error.message});
  }
});

/* --------------------- comando para eliminar un items --------------------- */
route.get('/deleteCliente/:id', async(req, res)=>{
try{
  const {id}= req.params
  await pool.query('DELETE FROM clientes WHERE id= ?', [id]);
  res.redirect('/listCliente');

}catch (error){
  res.status(500).json({message: error.message});
}
});

/* ---------------------------- Trae el registro para editar --------------------------- */

route.get('/editCliente/:id', async (req, res)=>{
try {
    const {id} = req.params
    const [clientes] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    const clienteEdit = clientes[0]
    res.render('clientes/editCliente', { clientes: clienteEdit })
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

/* ---------------------------- edita los valores --------------------------- */
route.post('/editCliente/:id', async (req, res)=>{
try {
    const {id} = req.params;
    const { nombre, apellido, telefono, email }  = req.body;
    const editCliente = { nombre, apellido, telefono, email };

    await pool.query( 'UPDATE clientes SET ? WHERE id = ?', [editCliente, id]);

    res.redirect('/listCliente');
   } 
catch (error) {
    res.status(500).json({ message: error.message });
   }
});

export default route