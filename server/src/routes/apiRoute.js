import Express  from "express";
import User from "../controllers/userController"
import VatTu from "../controllers/vatuController";
const Router = Express.Router();

const ApiRouter = (app)=>{
    Router.post("/new-user",User.newUser)
    Router.post("/login",User.LoginUser)
    Router.get("/users",User.getAllUser)
    Router.get("/vatus",VatTu.getAllVatTu)
    return app.use("/api",Router);
}
module.exports = ApiRouter;