import Express  from "express";
import multerMiddleware from "../middleware/uploadfile"
import User from "../controllers/userController"
import VatTu from "../controllers/vatuController";
import ChungLoai from "../controllers/chungLoaiVatTuController";
import KhuVuc from "../controllers/khuVucController";
import LoaiVatTu from "../controllers/loaiVatTuController";
import NhanhVien from "../controllers/nhanVienController";
import DiaChi from "../controllers/diaChiController"
const multer = require('multer')
const upload = multer(
    { fileFilter: multerMiddleware.multerFilter,
        storage : multerMiddleware.storage,
        limits:multerMiddleware.limit,
        preservePath: true
    })
const Router = Express.Router();
const ApiRouter = (app)=>{
    Router.post("/new-user",User.newUser);
    Router.post("/login",User.LoginUser);
    Router.get("/users",User.getAllUser);
    Router.get("/nhanviens",NhanhVien.getALlNhanVien);
    Router.post("/nhanvien",NhanhVien.addNhanVien);
    Router.get("/nhanvien",NhanhVien.getNhanVienById);
    Router.post("/avatar",upload.single('avatar'),NhanhVien.uploadAvatar);
    Router.get("/vattus",VatTu.getAllVatTu);
    Router.post("/createvattu",VatTu.createVatTu);
    Router.put("/updatevattu",VatTu.updateVattu);
    Router.delete("/deletevattu/:mVT",VatTu.deleteVattu);
    Router.get("/Searchvattu",VatTu.SearchVatTu);
    Router.get("/chungLoais",ChungLoai.getALlLoaiVatTu);
    Router.get("/loais",LoaiVatTu.getAllLoaiVatTu);
    Router.get("/khuvucs",KhuVuc.getAllKhuVuc);
    Router.get("/diaChi",DiaChi.getTinhThanh)

    return app.use("/api",Router);
}
module.exports = ApiRouter;