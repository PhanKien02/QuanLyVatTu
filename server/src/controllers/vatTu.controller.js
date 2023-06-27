import { Op } from "sequelize";
const moment = require('moment') 
const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../helper/options')
import LoaiVatTu from "../models/LoaiVatTu";
import ChungLoaiVatTu from "../models/ChungLoaiVatTu";
import KhuVuc from "../models/KhuVuc";
import VatTu from "../models/VatTu";
import ChiTietPhieuNhapKho from "../models/ChiTietPhieuNhapKho";
import ChiTietPhieuXuatKho from "../models/ChiTietPhieuXuatKho";
import PhieuNhapKho from "../models/PhieuNhapKho";
import PhieuXuatKho from "../models/PhieuXuatKho";
import BaoCaoThongKe from "../models/BaoCaoThongKe"
import NhanhVien from "../models/NhanVien";
import formatDate from "../configs/formatDate";
// lấy toàn bộ vật tư
const getVatTu = async (req,res)=>{
    await VatTu.findAll({include:["LoaiVatTu","KhuVuc"]}).then(vatTus =>{
        return  res.render("index.ejs",{vatTus:vatTus})
    });
}
// get form thêm vật tư
const getThemVatTu = async(req,res)=>{
    const donViTinh = ["Tấn","Khối","Cây","Kg","Viên"]
    const ListChungLoai = await ChungLoaiVatTu.findAll({include :"LoaiVatTu"});
    const ListKhuVuc= await KhuVuc.findAll();
    return res.render("themVatTu.ejs",{ListChungLoai:ListChungLoai,DonViTinh:donViTinh,ListKhuVuc:ListKhuVuc});
}
//thêm vật tư
const ThemVatTu =async (req,res)=>{
        const newVT = req.body;
        await VatTu.create({
        mVT: newVT.maVatTu,
        tenVatTu: newVT.tenVatTu,
        donViTinh: newVT.donViTinh,
        LoaiVatTuId:newVT.loaiVattu,
        soLuong : newVT.soLuong,
        donGia: newVT.dongia,
        khuVucId : newVT.khuvuc
    }).then(()=>{
        return res.redirect("/")
    }).catch((err)=>{
        res.send(err)
}) };
// get vật tư cần sửa
const getSuaVT =async(req,res)=>{
    const VTUpdate=  await VatTu.findByPk(req.params.mVT,{
        include: ["LoaiVatTu","KhuVuc"]
    })
    const donViTinh = ["Tấn","Khối","Cây","Kg","Viên"]
    const ListChungLoai = await ChungLoaiVatTu.findAll({include :"LoaiVatTu"});
    const ListKhuVuc= await KhuVuc.findAll();
    const data ={VTUpdate : VTUpdate,DonViTinh:donViTinh,ListChungLoai:ListChungLoai,ListKhuVuc:ListKhuVuc}
    return res.render('suaVatTu.ejs',{VTUpdate : VTUpdate,DonViTinh:donViTinh,ListChungLoai:ListChungLoai,ListKhuVuc:ListKhuVuc})
}
// chỉnh sửa vật tư
const suaVatTu = async (req,res)=>{
    const updateVT= req.body;
    await VatTu.update({
        tenVatTu: updateVT.tenVatTu,
        donViTinh: updateVT.donViTinh,
        LoaiVatTuId:updateVT.loaiVattu,
        soLuong : updateVT.soLuong,
        donGia: updateVT.dongia,
        khuVucId: updateVT.khuvuc
    },{
        where: {
            mVT : req.params.mVT
        }
    }).then(()=>{
        return res.redirect("/")
    }).catch(err=>{
        return res.format({'text/html' () {
            res.send(`<p>'Sửa Thất bại'</p> <br/> <p> msg :${err.errors[0].message}</p> <a href='./themVatTu'>quay lại</a>`)
        },})
    })
}
// xóa vật tư
const XoaVatTu = async(req,res) =>{
    await VatTu.destroy({
        where:{
            mVT: req.params.mVT
        }
    }).then(()=>{
        return res.redirect("/")
    })
    .catch(err =>{
        res.send(err)
    })
}
// tìm kiếm theo tên vật tư
const Search = async(req,res) =>{
    if(req.body.value != ""){
        await VatTu.findAndCountAll({where:{
            tenVatTu : { [Op.like] : `%${req.body.value}%`}
        },
        include:["LoaiVatTu","KhuVuc"],
    }).then(vatTus =>{
            return  res.render("index.ejs",{vatTus:vatTus.rows})
        }).catch(()=>{return  res.render("index.ejs",{vatTus:[]})});
        
    }
    else{
    res.redirect("/")
    }
}
// xem chi tiết nhập kho
const xemNhapKho = async (req,res)=>{
    const vatTu= await VatTu.findByPk(req.params.mVT,{
        include: ["LoaiVatTu","KhuVuc"]
        
    })
    const nhapKho = await ChiTietPhieuNhapKho.findAll(
{
        include :[
            {
                model: VatTu,
                as : "VatTu",
                where: {
                    mVT : req.params.mVT,
                }
            },{
                model : PhieuNhapKho,
                as : "PhieuNhapKho",
                include: "NguoiNhap"
            }
        ]
    })
    return res.render("xemNhapKho.ejs",{vatTu:vatTu,nhapKhos:nhapKho})
    return res.send({vatTu:vatTu,nhapKhos:nhapKho})
}
//xem chi tiết xuất kho
const xemXuatKho = async (req,res)=>{
    const vatTu= await VatTu.findByPk(req.params.mVT,{
        include: ["LoaiVatTu","KhuVuc"]
    })
    const xuatKho = await ChiTietPhieuXuatKho.findAll({
        include :[
            {
                model: VatTu,
                as : "VatTu",
                where: {
                    mVT : req.params.mVT,
                }
            },{
                model : PhieuXuatKho,
                as : "PhieuXuatKho",
                include: "NguoiXuat"
            }
        ]
    })
    return res.render("xemXuatKho.ejs",{vatTu:vatTu,xuatKhos:xuatKho})
    return res.send({vatTu:vatTu,xuatKhos:xuatKho})
}
const generatePdfNhapKho = async (req,res)=>{
    const vatTuNhapKho= await VatTu.findByPk(req.params.mVT,{
        include: ["LoaiVatTu","KhuVuc"]
        
    })
    const nhapKhos = await ChiTietPhieuNhapKho.findAll({
        include :[
            {
                model: VatTu,
                as : "VatTu",
                where: { mVT : req.params.mVT }
            },{
                model : PhieuNhapKho,
                as : "PhieuNhapKho",
                include: "NguoiNhap"
            }
        ]
    })
    const dataXuatNhap = nhapKhos.map(nhapKho =>{
            return {
                NhanhVien: nhapKho.dataValues.PhieuNhapKho.dataValues.NguoiNhap.dataValues.tenNhanVien,
                soLuong : nhapKho.dataValues.soLuongNhap,
                donViTinh :nhapKho.dataValues.VatTu.donViTinh,
                donGia :nhapKho.dataValues.giaNhap,
                NgayThang:formatDate(nhapKho.dataValues.PhieuNhapKho.NgayNhap)
            }   
    })
    const data = {
        vatTu : vatTuNhapKho.dataValues,
        dataXuatNhap: dataXuatNhap,
        title : "Báo cáo nhập kho",
        title2 : "Lịch sử nhập kho"
    }
    const linkfile= await generatePdf(data);
    return  res.render("downloadFile.ejs",{path:linkfile});
}
const generatePdfXuatKho = async (req,res)=>{
    const vatTu= await VatTu.findByPk(req.params.mVT,{
        include: ["LoaiVatTu","KhuVuc"]
    })
    const xuatKhos = await ChiTietPhieuXuatKho.findAll({
        include :[
            {
                model: VatTu,
                as : "VatTu",
                where: { mVT : req.params.mVT }
            },{
                model : PhieuXuatKho,
                as : "PhieuXuatKho",
                include: "NguoiXuat"
            }
        ]
    })
    const dataXuatNhap = xuatKhos.map(xuatKho =>{
            return {
                NhanhVien: xuatKho.dataValues.PhieuXuatKho.dataValues.NguoiXuat.dataValues.tenNhanVien,
                soLuong : xuatKho.dataValues.soLuongXuat,
                donViTinh :xuatKho.dataValues.VatTu.donViTinh,
                donGia :xuatKho.dataValues.giaNhap,
                NgayThang: formatDate(xuatKho.dataValues.PhieuXuatKho.NgayXuat)
            }   
    })
    const data = {
        vatTu : vatTu.dataValues,
        dataXuatNhap: dataXuatNhap,
        title : "Báo cáo xuất kho",
        title2 : "Lịch sử xuất kho"
    }
    const linkfile= await generatePdf(data);
    return  res.render("downloadFile.ejs",{path:linkfile});
}
// export file pdf
const generatePdf = async (data)=>{
    const html = fs.readFileSync(path.join(__dirname, '../public/views/templateExport.html'), 'utf-8');
    const filename = Date.now() + '.pdf';
    const document = {
        html: html,
        data: {
            vatTu: data.vatTu,
            dataXuatNhap: data.dataXuatNhap,
            title : data.title,
            title2 :data.title2
        },
        path: './src/public/files/'+ filename
    }  
    await pdf.create(document, options)
    .then( async res => {
            console.log("create success",res);
    }).catch(error => {
        console.log("create error:",error);
    });
    const filepath = 'http://localhost:8081/export/' + filename;
    await BaoCaoThongKe.create({
        fileBaoCao: filepath,
        tinhTrang: 0
    })  
    return filepath
}
export default {
    getVatTu,getThemVatTu,ThemVatTu,XoaVatTu,suaVatTu,getSuaVT,Search,xemNhapKho,xemXuatKho,generatePdfNhapKho,generatePdfXuatKho
}