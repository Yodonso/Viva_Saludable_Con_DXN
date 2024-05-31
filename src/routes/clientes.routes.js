import {Router} from 'express'
import pool from '../database.js'

const router= Router();

/* --------------------- crea nuevo items para guardar ------------------------- */
router.get('/addCliente', ( req , res)=>{
  res.render('clientes/addCliente')
});

router.post('/addCliente', async (req, res)=>{
  try {
      const { nombre, apellido, telefono, email} = req.body
      const newcliente = {
        nombre, apellido, telefono, email 
      }
      await pool.query('INSERT INTO cliemtes SET ?', [newcliente]);
      res.redirect('/list');
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

/* ------------------------ muestra la lista de items ----------------------- */
router.get('/listCliente', async(req, res) =>{
  try{
      const[result]= await pool.query('SELECT * FROM cliemtes');
      res.render('productos/listCliente', {productos: result})
      
  }catch (error) {
      res.status(500).json({message: error.message});
  }
});

/* --------------------- comando para eliminar un items --------------------- */
router.get('/delete/:id', async(req, res)=>{
try{
  const {id}= req.params
  await pool.query('DELETE FROM cliemtes WHERE id= ?', [id]);
  res.redirect('/listCliente');

}catch (error){
  res.status(500).json({message: error.message});
}
});

/* ---------------------------- Trae el registro para editar --------------------------- */

router.get('/editCliente/:id', async (req, res)=>{
try {
    const {id} = req.params
    const [productos] = await pool.query('SELECT * FROM cliemtes WHERE id = ?', [id]);
    const productoEdit = productos[0]
    res.render('productos/editCliente', { productos: productoEdit })
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

/* ---------------------------- edita los valores --------------------------- */
router.post('/editCliente/:id', async (req, res)=>{
try {
    const {id} = req.params;
    const { nombre, apellido, telefono, email }  = req.body;
    const editProducto = { nombre, apellido, telefono, email };

    await pool.query( 'UPDATE cliemtes SET ? WHERE id = ?', [editProducto, id]);

    res.redirect('/listCliente');
   } 
catch (error) {
    res.status(500).json({ message: error.message });
   }
});

export default router