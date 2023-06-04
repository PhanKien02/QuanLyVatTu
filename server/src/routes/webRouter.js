import Express  from "express";
import VatTu from "../controllers/vatTu.controller"

const Router = Express.Router();

const Webrouter = (app) =>{

    Router.get("/",VatTu.getVatTu)
    Router.get("/themVatTu",VatTu.getThemVatTu);
    Router.post("/themVatTu",VatTu.ThemVatTu);
    Router.get("/deleteVatTu/:mVT=?",VatTu.XoaVatTu);
    Router.get("/updateVatTu/:mVT=?",VatTu.getSuaVT);
    Router.post("/updateVatTu/:mVT=?",VatTu.suaVatTu);
    Router.post("/search",VatTu.Search);
    Router.get("/nhapKho/:mVT=?",VatTu.xemNhapKho);
    Router.get("/xuatKho/:mVT=?",VatTu.xemXuatKho);
    Router.get("/exportNhapKho/:mVT=?",VatTu.generatePdfNhapKho);
    Router.get("/exportXuatKho/:mVT=?",VatTu.generatePdfXuatKho);

    return app.use("/",Router);
}
export default Webrouter;