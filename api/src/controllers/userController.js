const HttpStatus = require("../constants/httpStatuses.js");

const {ObjectId} = require('bson');

class UserController{

    constructor(repo){
        this.userRepository = repo;
    }

    getAllUsers = async(req,res) => {
        const users = await this.userRepository.findAll();
        res.status(HttpStatus.OK).json(users);
    }

    getUserById = async(req,res) => {
        try{
            const user = await this.userRepository.findOneById(ObjectId(req.params.userid));
            res.status(HttpStatus.OK).json(user);
        }catch(e){
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    createUser = async(req,res) => {
        try{
            const user = await this.userRepository.insertOne(req.body);
            res.status(HttpStatus.OK_CREATED).json(user);
        }catch(e){
            res.status(HttpStatus.CONFLICT).send();
        }
    }

    deleteUser = async(req,res) => {
        try{
            await this.userRepository.deleteOne(ObjectId(req.params.userid));
            res.status(HttpStatus.OK).send();
        }catch(e){
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    updateUser = async(req,res) => {
        try{
            await this.userRepository.updateOne(ObjectId(req.params.userid), req.body);
            res.status(HttpStatus.OK).send();
        }catch(e){
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

}

module.exports = UserController;