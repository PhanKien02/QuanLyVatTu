import { Op } from "sequelize";
import LoaiVatTu from "../models/LoaiVatTu";
import ChungLoaiVatTu from "../models/ChungLoaiVatTu";
import KhuVuc from "../models/KhuVuc";
import VatTu from "../models/VatTu";
import ChiTietPhieuNhapKho from "../models/ChiTietPhieuNhapKho";
import ChiTietPhieuXuatKho from "../models/ChiTietPhieuXuatKho";
import PhieuNhapKho from "../models/PhieuNhapKho";
import PhieuXuatKho from "../models/PhieuXuatKho";
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
        return res.format({'text/html' () {
            res.send(`<p>'Thêm Thất bại'</p> <br/> <p>${err.errors[0].message}</p> <a href='./themVatTu'>quay lại</a>`)
        },})
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
    console.log(req.params);
    const updateVT= req.body;
    console.log(updateVT);
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
// tìm kiếm theo tên vật tư
const Search = async(req,res) =>{
    if(req.body.value != ""){
        await VatTu.findAndCountAll({where:{
            tenVatTu : { [Op.like] : `%${req.body.value}%`}
        },
        include:["LoaiVatTu","KhuVuc"],
    }).then(vatTus =>{
        console.log(vatTus);
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
    const nhapKho = await ChiTietPhieuNhapKho.findAll({
        include :[
            {
                model: VatTu,
                as : "VatTu"
            },{
                model : PhieuNhapKho,
                as : "PhieuNhapKho",
                include: "NguoiNhap"
            }
        ]
    },{
        where: {
            mVT : req.params.mVT,
        }
    })
    return res.render("xemNhapKho.ejs",{vatTu:vatTu,nhapKhos:nhapKho})
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
                as : "VatTu"
            },{
                model : PhieuXuatKho,
                as : "PhieuXuatKho",
                include: "NguoiXuat"
            }
        ]
    },{where:{
        mVT : req.params.mVT
    }
})
    return res.render("xemXuatKho.ejs",{vatTu:vatTu,xuatKhos:xuatKho})
}
// export file pdf
const generatePdf = async (data)=>{
    const html = fs.readFileSync(path.join(__dirname, '../public/views/templateExport.html'), 'utf-8');
    const filename = Date.now + '_doc' + '.pdf';
    const document = {
        html: html,
        data: {
            vatTus: data
        },
        path: './src/public/files' + filename
    }    
    pdf.create(document, options)
    .then(res => {
        console.log(res);
    }).catch(error => {
        console.log(error);
    });
    const filepath = 'http://localhost:3000/export/' + filename;

    res.file('download', {
        path: filepath
    });
}
export default {
    getVatTu,getThemVatTu,ThemVatTu,XoaVatTu,suaVatTu,getSuaVT,Search,xemNhapKho,xemXuatKho
}