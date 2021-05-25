const  mysql= require('mysql');

const DBConnection = mysql.createConnection({
    host        : "localhost",
    port        : 3306,
    user        : "nodejs",
    password    : "123",
    // database: "reactapp"
})
const pool = DBConnection.connect()//mysql.createPool(DBConnection) 
// ((err)=>{
//     if(err){
//         console.log('Error create pool')
//     }
//     console.log('Pool is created')

// });

module.exports =  (query,values,callback)=>{
    try {
        
        values = values || [];

        DBConnection.query(query, values, (err, row_src) => {
          
            if (err){
                console.log('Error pool query: ',err)
                callback(err)
            }
            if(row_src.length > 0){
                let rows = Object.assign([], row_src);
                callback(err,rows,row_src); 
                return rows
            }
        })
    }catch (e){
        console.log('Error query: ',e.message);
    }
}