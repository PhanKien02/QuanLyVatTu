import Express  from "express";
import VatTu from "../controllers/vatTu.controller"
const Router = Express.Router();

const Webrouter = async(app) =>{

    Router.get("/",VatTu.getVatTu)

    Router.get("/themVatTu",VatTu.getThemVatTu)
    Router.post("/themVatTu",VatTu.ThemVatTu)
    Router.get("/deleteVatTu/:mVT=?",VatTu.XoaVatTu)
    Router.get("/updateVatTu/:mVT=?",VatTu.getSuaVT)
    Router.post("/updateVatTu",VatTu.suaVatTu)
    return app.use("/",Router);
}
export default Webrouter;