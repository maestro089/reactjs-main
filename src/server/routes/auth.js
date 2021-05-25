const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/dbQuery");
const mysql = require("mysql");

// const dbconnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   // database: "reactapp"
// });

const jwtSecret = "testReactApp";
const users = [
  { id: 1, email: "1@mail.ru", password: "123456", userName: "Igor" },
  { id: 2, email: "2@mail.ru", password: "123456", userName: "Ivan" },
  { id: 3, email: "3@mail.ru", password: "123456", userName: "Misha" },
  { id: 4, email: "4@mail.ru", password: "123456", userName: "Oleg" },
  { id: 5, email: "5@mail.ru", password: "123456", userName: "Petr" },
];

const DecryptPass = async (original, hashed) => {
  return await bcrypt.compare(original, hashed);
};

const retunMessage = (res, message) => {
  res.status(200).json(message);
};

const registerFunction = async (res,email,password)=>{
  let hashedPassword = await bcrypt.hash(password, 12);
          await db(
            "INSERT INTO mydb.usersAccount(email,password) VALUES(?,?)",[email,hashedPassword],
            [email],
            (err, result) => {
              if (err) {
                console.log("Error pool query: ", err);
                callback(err);
              }
              return res.status(200).json('OK')
            }
          );
}

router.post("/login", async (req, res) => {
  let findedUser = [];
  try {
    const { email, password } = req.body;

    await db(
      "SELECT * FROM mydb.usersAccount WHERE email= ?",
      [email],
      (err, result) => {
        if (result.length > 0) {
          let isMatch = DecryptPass(password, result[0].password);

          if (!isMatch) {
            //   если пользователь ввел неправильный пароль - выводим ответ
            res.status(400).json("User not found");
          }

          // создаем токен используя ИД пользователя и секретный ключ для него, говорим токену что жизненный цикл его составляет 1 час
          let token = jwt.sign({ userId: result[0].id }, jwtSecret, {
            expiresIn: "1h",
          });
          res.status(200).json({ token, userInfo: result[0].id });
        }
      }
    );
    if (findedUser.length > 0) {
      const user = await bcrypt.compare(password, findedUser.password);
      console.log(user);
    }
  } catch (e) {
    res.status(400).json("Login hander on server filed");
  }
});

router.post("/register", async (req, res) => {
  let findedUser = [];
  try {
    const { email, password } = req.body;

    // находим пользователя по совпадению емайла и пароля

    if (email && password) {
      let main = await db(
        "SELECT * FROM mydb.usersAccount WHERE email= ?",
        [email],
        (err, result) => {
          if (err) {
            console.log("Error pool query: ", err);
            callback(err);
          }
          if (result.length > 0) {
            findedUser.push(result[0]);
            console.log(result);
            return retunMessage(res, { status: "Already created" });
          }
          registerFunction(res,email,password)
          return retunMessage(res, { status: "Created" });
        }
      );
      
      // return res.status(200).json({status:'Already registered'});
      // let hashedPassword = await bcrypt.hash(password, 12);
      // console.log(hashedPassword);
      // await dbconnection.query(
      //   `INSERT INTO reactapp.users(email,password) VALUES('${email}','${hashedPassword}')`,
      //   (err, result) => {
      //     console.log("insert");

      //   }
      // );

      // // создаем токен используя ИД пользователя и секретный ключ для него, говорим токену что жизненный цикл его составляет 1 час
      // let token = jwt.sign({ userId: findedUser[0].id }, jwtSecret, {
      //   expiresIn: "1h",
      // });

      // res.status(200).json({ token, userInfo: findedUser[0].id });
    }
  } catch (e) {
    return res.status(400).json("Login hander on server filed");
  }
});

module.exports = router;
