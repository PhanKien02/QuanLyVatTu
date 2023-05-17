import LoaiVatTu from "../models/LoaiVatTu";
import ChungLoaiVatTu from "../models/ChungLoaiVatTu";
import KhuVuc from "../models/KhuVuc";
import VatTu from "../models/VatTu";

const getVatTu = async (req,res)=>{
    await VatTu.findAll({include:["LoaiVatTu","KhuVuc"]}).then(vatTus =>{
        return  res.render("index.ejs",{vatTus:vatTus})
    });
}
const getThemVatTu = async(req,res)=>{
    const donViTinh = ["Tấn","Khối","Cây","Kg","Viên"]
    const ListChungLoai = await ChungLoaiVatTu.findAll({include :"LoaiVatTu"});
    const ListKhuVuc= await KhuVuc.findAll();
    return res.render("themVatTu.ejs",{ListChungLoai:ListChungLoai,DonViTinh:donViTinh,ListKhuVuc:ListKhuVuc});
}
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
        return res.format({'text/html' () {
            res.send(`<p>'Thêm Thất bại'</p> <br/> <p>${err.errors[0].message}</p> <a href='./themVatTu'>quay lại</a>`)
        },})
}) };
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
const suaVatTu = async (req,res)=>{
    const updateVT= req.body;
    console.log(updateVT);
    await VatTu.update({
        mVT: updateVT.maVatTu,
        tenVatTu: updateVT.tenVatTu,
        donViTinh: updateVT.donViTinh,
        LoaiVatTuId:updateVT.loaiVattu,
        soLuong : updateVT.soLuong,
        donGia: updateVT.dongia
    },{
        where: {
            mVT : updateVT.maVatTu
        }
    }).then((vattu)=>{
        return res.redirect("/")
    }).catch(err=>{
        return res.format({'text/html' () {
            res.send(`<p>'Sửa Thất bại'</p> <br/> <p> msg :${err.errors[0].message}</p> <a href='./themVatTu'>quay lại</a>`)
        },})
    })
}
const XoaVatTu = async(req,res) =>{
    console.log(req.params);
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
export default {
    getVatTu,getThemVatTu,ThemVatTu,XoaVatTu,suaVatTu,getSuaVT
}