import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/public/files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + uniqueSuffix+"."+file.mimetype.split("/")[1]);
    },
});
const types = ["png", "jpeg", "jpg"];
// Multer Filter
const multerFilter = (req, file, cb) => {
    const checkType = types.includes(file.mimetype.split("/")[1]);
    if (checkType) {
        cb(null, true);
    } else {
        cb(new Error("Định dạng không phù hợp"), false);
    }
};
const limit = {
    fileSize: 5 * 1024 * 1024,
};
export default { limit, multerFilter, storage };
