const express = require('express');
import bodyParser from "body-parser";
import db from "./configs/connectdb"
import configsView from "./configs/configViewEngine"
import Router from "./routes/webRouter"
import User from "./models/User"
import NhanhVien from "./models/NhanVien";
import VatTu from "./models/VatTu"
import LoaiVaTu from "./models/LoaiVatTu"
import HoaDon from "./models/HoaDon"
import BaoCao from "./models/BaoCaoThongKe"
import PhieuNhapKho from "./models/PhieuNhapKho"
import PhieuXuatKho from "./models/PhieuXuatKho";
import ChiTietPhieuNhapKho from "./models/ChiTietPhieuNhapKho"
import ChiTietPhieuXuatKho from "./models/ChiTietPhieuXuatKho"
import QuanHuyen from "./models/QuanHuyen";
require('dotenv').config();
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.text())
configsView(app);
db.authen();
db.creteTable();
Router(app);
let port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}/`);
});