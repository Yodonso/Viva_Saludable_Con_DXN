import {Router} from 'express'
import pool from '../database.js'
import multer from 'multer'
import path from 'path'

const router= Router();
/* ----------------------- crea la rura para guardar la imagen ---------------------- */
const storage = multer.diskStorage({
  destination: 'src/public/uploads/',
  filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({storage});

/* --------------------- crea nuevo items para guardar ------------------------- */
router.get('/add', ( req , res)=>{
  res.render('productos/add')
});

router.post('/add', upload.single('file'), async (req, res)=>{
  try {
    const { name, precio, oferta, stop, descripcion, categoria, imagen } = req.body
    let newPersona = {}
    if(req.file){
        const file = req.file
        const imagen_original = file.originalname
        const imagen = file.filename
        newPersona = { name, precio, oferta, stop, descripcion, categoria, imagen }
    }else{
        newPersona = { name, precio, oferta, stop, descripcion, categoria }
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
router.post('/edit/:id', upload.single('file'), async (req, res)=>{
  try {
    const {id} = req.params
    const {name, precio, oferta, stop, descripcion, categoria, imagen}  = req.body
    let editProducto = {}
      if(req.file){
          const file = req.file
          const imagen_original = file.originalname
          const imagen = file.filename
          editProducto = { name, precio, oferta, stop, descripcion, categoria, imagen}
      }else{
          editProducto = {name, precio, oferta, stop, descripcion, categoria}
      }

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


router.get('/producto', async(req, res) =>{
  try{
      const[result]= await pool.query('SELECT * FROM productos');
      res.render('productos/producto', {productos: result})
      
  }catch (error) {
      res.status(500).json({message: error.message});
  }
});
export default router