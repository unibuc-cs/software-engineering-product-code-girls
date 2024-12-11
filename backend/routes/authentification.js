import express from "express"
import Database from 'better-sqlite3'
import { resolve } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();
const dbPath = resolve('database/database.db');

const db = new Database(dbPath)


router.post('/', async (req,res) => {
    const q = " INSERT INTO users (`name`,`password`) VALUES (?,?)"
    try{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            db.prepare(q).run(req.body.name, hashedPassword);
            res.status(201).send("The account was successfully created!");
    }catch(error){
        console.error("There occured an error in the process of creating the account:", error.message);
        return res.status(500).send("There occured an error in the process of creating the account!");
    }
});

router.post('/login', async (req,res) => {
    const {name, password} = req.body;
    const q = "SELECT * FROM users WHERE users.name=?";
    const user = db.prepare(q).get(name);
    if(user == null){
        return res.status(400).json({ success: false, message: "Cannot find user!" });
    }else{
        try{
            if(await bcrypt.compare(password, user.password)){
                return res.status(200).json({ success: true, message: "Login successful" });
            }else{
                return res.status(403).json({ success: false, message: "Incorrect password!" });
            }
        }catch{
            return res.status(500).json({ success: false, message: "An error occurred!" });
        }
    }
});

export default router;