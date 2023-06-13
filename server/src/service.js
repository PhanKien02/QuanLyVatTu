const express = require('express');
var morgan = require('morgan')
import cors from 'cors';
import bodyParser from "body-parser";
import db from "./configs/connectdb"
import configsView from "./configs/configViewEngine"
import Router from "./routes/webRouter"
import apiRouter from "./routes/apiRoute"
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
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.text())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
configsView(app);
db.authen();
db.creteTable();
apiRouter(app)
Router(app);
let port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}/`);
});