import {Router} from 'express'
import pool from '../database.js'

const router= Router();

/* --------------------- crea nuevo items para guardar ------------------------- */
router.get('/addCliente', ( req , res)=>{
  res.render('clientes/addCliente')
});

router.post('/add', async (req, res)=>{
  try {
      const { nombre, apellido, telefono, email} = req.body
      const newcliente = {
        nombre, apellido, telefono, email 
      }
      await pool.query('INSERT INTO cliemte SET ?', [newcliente]);
      res.redirect('/list');
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


export default router