import express from "express";

const router = express.Router();

router.get('/api/users/currentUser', (req, res)=>{
    res.send('current_User')
});

export {router as currentUserRouter};