const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.render('homepage');
});

app.post('/upload', upload.single('profileImage'), (req, res) => {
  console.log(req.file);
  return res.render('homepage');
});

// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
//   })

//   const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
//   app.post('/cool-profile', cpUpload, function (req, res, next) {
// The .array('photos', 12) middleware indicates that the request is expected to contain a field named 'photos' that contains files. It allows up to 12 files to be uploaded simultaneously.
//   })
const cpUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 },
]);
app.post('/cool-profile', cpUpload, function (req, res, next) {
  //  we can upload one file in avatar input field and multiple file in gallery input field
  //   In this specific example:
  // The 'avatar' field is configured with maxCount: 1, meaning it allows a maximum of 1 file to be uploaded.
  // The 'gallery' field is configured with maxCount: 8, meaning it allows a maximum of 8 files to be uploaded.
});

// app.post('/profile', function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       console.log('MulterError:', err.message);
//       res.status(400).send('File upload error: ' + err.message);
//     } else if (err) {
//       console.error('Unknown error during file upload:', err);
//       res.status(500).send('An unknown error occurred when uploading.');
//     }
//     console.log(req.file);
//     return res.render('homepage');
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
