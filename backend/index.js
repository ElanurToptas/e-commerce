const port = 4000; // Uygulamanın dinleyeceği port
const express = require("express"); // Sunucuyu başlatır
const app = express(); // Express uygulamasını başlatır
const mongoose = require("mongoose"); // Veritabanına bağlanır
const jwt = require("jsonwebtoken"); // JWT (JSON Web Token) kullanıcı oturum yönetimi için kullanılır.
const multer = require("multer"); // Multer dosya yükleme (file upload) işlemleri için kullanılır.
const path = require("path"); // Node.js’in yerleşik modülü.
// Dosya yollarını güvenli bir şekilde oluşturmak için kullanılır (__dirname ile birlikte).
const cors =  require("cors"); // tarayıcıların farklı domain’ler arası istek atmasına izin verir.
const { error } = require("console");
const { type } = require("os");

app.use(express.json()); // req.body üzerinden gelen JSON verisine ulaşabilmek için şarttır.
app.use(cors());

// Express.js Node.js üzerinde backend geliştirmeyi kolaylaştıran bir framework.

// Login olduğunda backend bir JWT üretir, frontend bu token’ı saklar.

// Her istek geldiğinde token doğrulanarak kullanıcının kimliği anlaşılır.


// Database Connection With MongoDB
mongoose.connect("mongodb+srv://elanurtoptass:Rt1fydARlfRdIbJt@cluster0.0cshlzq.mongodb.net/e-commerce");


// API Creation
app.get("/",(req,res)=>{
    res.send("Express App is Running");
})


// Sunucucuyu başlatma
app.listen(port, (error) => {
    if(!error){
        console.log("Server Running on Port" + port)
    }
    else {
        console.log("Error" + error)
    }
});


// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images', // dosyaların nereye kaydedileceği
    filename: (req,file,cb) =>{ // dosyanın nasıl kaydedileceği
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})
// multer middleware olarak tanımlandı.
// upload.single('product') → gelen form verisindeki product isimli alanı alıp dosya olarak işler.



// Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Dosya yüklenmedi" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// product → yüklenen dosyanın formdaki alan adıdır. Backend bu ismi kullanarak doğru dosyayı alır.


// Schema for Creating Products
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    images:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    }
})

