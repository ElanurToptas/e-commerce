const port = 4000; // Uygulamanın dinleyeceği port
const express = require("express"); // Sunucuyu başlatır
const app = express(); // Express uygulamasını başlatır
const mongoose = require("mongoose"); // Veritabanına bağlanır
const jwt = require("jsonwebtoken"); // JWT (JSON Web Token) kullanıcı oturum yönetimi için kullanılır.
const multer = require("multer"); // Multer dosya yükleme (file upload) işlemleri için kullanılır.
const path = require("path"); // Node.js’in yerleşik modülü.
// Dosya yollarını güvenli bir şekilde oluşturmak için kullanılır (__dirname ile birlikte).
const cors = require("cors"); // tarayıcıların farklı domain’ler arası istek atmasına izin verir.
const { error } = require("console");
const { type } = require("os");

app.use(express.json()); // req.body üzerinden gelen JSON verisine ulaşabilmek için şarttır.
app.use(cors());

// Express.js Node.js üzerinde backend geliştirmeyi kolaylaştıran bir framework.

// Login olduğunda backend bir JWT üretir, frontend bu token’ı saklar.

// Her istek geldiğinde token doğrulanarak kullanıcının kimliği anlaşılır.

// Database Connection With MongoDB
mongoose.connect(
  "mongodb+srv://elanurtoptass:Rt1fydARlfRdIbJt@cluster0.0cshlzq.mongodb.net/e-commerce"
);

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Sunucucuyu başlatma
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port" + port);
  } else {
    console.log("Error" + error);
  }
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images", // dosyaların nereye kaydedileceği
  filename: (req, file, cb) => {
    // dosyanın nasıl kaydedileceği
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
// multer middleware olarak tanımlandı.
// upload.single('product') → gelen form verisindeki product isimli alanı alıp dosya olarak işler.

// Creating Upload Endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Dosya yüklenmedi" });
  }
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// product → yüklenen dosyanın formdaki alan adıdır. Backend bu ismi kullanarak doğru dosyayı alır.

// Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  const last = await Product.findOne().sort({ id: -1 }).lean();
  const nextId = last ? last.id + 1 : 1;

  const product = new Product({
    id: nextId,
    name: req.body.name,
    images: req.body.images,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API for deleting products
app.post("/removeproduct", async (req, res) => {
  try {
    const { id } = req.body;

    const deletedProduct = await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.json({ success: false, message: "Ürün bulunamadı." });
    }
    
    res.json({
      success: true,
      name: deletedProduct.name,
    });
  } catch (err) {
    console.error("Silme hatası (backend):", err);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
});


// Creating API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all products fetched");
  res.json(products);
});

// Login-Signup

//Schema creating for User model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating Endpoint for Registering the User
app.post("/signup", async (req, res) => {
  // findOne ile eşleşen ilk mail adresi bulunuyor.
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email adress",
    });
  }

  let cart = {}; // Yeni kullanıcı için boş sepet
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
      name: user.name,
    },
  };

  // token ile kullanıcının daha önce giriş yapıp yapmadığını kontrol ediyoruz.
  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

// Creating Endpoint for User Login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user._id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
        user: {
          name: user.name,
        },
      });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

//Creating Endpoint For Newcollection data

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("newcollection Fetched");
  res.json(newcollection);
});

//Creating Endpoint For Popular data

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularinwomen = products.slice(0, 4);
  console.log("Popular in women Fetched");
  res.json(popularinwomen);
});

// creating middleware to fetch user

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using valid token" });
    }
  }
};

// Creating Endpoint for Adding Products in cartData
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

// Creating Endpoint to Remove Product from cartData
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] = 0;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

// Creating Endpoint to Get cartData

app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});


// Schema creating for Adres model

const Adres = mongoose.model("Adres", {
  name: {
    type:String
  },
  surname:{
    type:String
  },
  number:{
    type:String
  },
   city:{
    type:String
  },
   adress:{
    type:String
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

app.post("/adresscart", async (req, res) => {
  try {
    const { name, surname, number, city, adress } = req.body;

    const newAdres = new Adres({
      name,
      surname,
      number,
      city,
      adress,
    });

    await newAdres.save();

    res.status(201).json({
      success: true,
      message: "Adres bilgileri başarıyla kaydedildi.",
      adresId: newAdres._id,
    });

  } catch (err) {
    console.error("adresscart hatası:", err);
    res.status(500).json({
      success: false,
      error: "Sunucu hatası: " + err.message,
    });
  }
});

app.get("/adress", async (req, res) => {
  let adress = await Adres.find({});
  res.json(adress);
});

app.post("/removeaddress", async (req, res) => {
  try {
    const { id } = req.body; 
    const deletedAddress = await Adres.findOneAndDelete(id);
    if (!deletedAddress) {
      return res.json({ success: false, message: "Adres bulunamadı." });
    }
    
    res.json({
      success: true,
      name:deletedAddress.name,
    });
  } catch (err) {
    console.error("Silme hatası (backend):", err);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
});


