
import {createPool} from "mysql2/promise";

const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'Vida_Saludable',
    password: 'Vida_Saludable',
    database: 'Vida_Saludable'
});

export default pool;