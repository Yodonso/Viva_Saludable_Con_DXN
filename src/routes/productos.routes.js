import {Router} from 'express'
import pool from '../database.js'

const router= Router();

/* --------------------- crea nuevo items para guardar ------------------------- */
router.get('/add', ( req , res)=>{
  res.render('productos/add')
});

router.post('/add', async (req, res)=>{
  try {
      const { name, imagen, precio, oferta, stop, descripcion, categoria} = req.body
      const newPersona = {
          name, imagen, precio, oferta, stop, descripcion, categoria
      }
      await pool.query('INSERT INTO productos SET ?', [newPersona]);
      res.redirect('/list');
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

 /* ------------------------ muestra la lista de items ----------------------- */
router.get('/list', async(req, res) =>{
    try{
        const[result]= await pool.query('SELECT * FROM productos');
        res.render('productos/list', {productos: result})
        
    }catch (error) {
        res.status(500).json({message: error.message});
    }
});

/* --------------------- comando para eliminar un items --------------------- */
router.get('/delete/:id', async(req, res)=>{
  try{
    const {id}= req.params
    await pool.query('DELETE FROM productos WHERE id= ?', [id]);
    res.redirect('/list');

  }catch (error){
    res.status(500).json({message: error.message});
  }
});

/* ---------------------------- Trae el registro para editar --------------------------- */

router.get('/edit/:id', async (req, res)=>{
  try {
      const {id} = req.params
      const [productos] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
      const productoEdit = productos[0]
      res.render('productos/edit', { productos: productoEdit })
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

/* ---------------------------- edita los valores --------------------------- */
router.post('/edit/:id', async (req, res)=>{
  try {
      const {id} = req.params;
      const { name, imagen, precio, oferta, stop, descripcion, categoria }  = req.body;
      const editProducto = { name, imagen, precio, oferta, stop, descripcion, categoria };

      await pool.query( 'UPDATE productos SET ? WHERE id = ?', [editProducto, id]);

      res.redirect('/list');
     } 
  catch (error) {
      res.status(500).json({ message: error.message });
     }
});

router.get('/nosotros', ( req , res)=>{
  res.render('productos/nosotros')
});

router.get('/contactenos', ( req , res)=>{
  res.render('productos/contactenos')
});

router.get('/membrecia', ( req , res)=>{
  res.render('productos/membrecia')
});

router.get('/negocio', ( req , res)=>{
  res.render('productos/negocio')
});

router.get('/productos', ( req , res)=>{
  res.render('productos/productos')
});
export default router