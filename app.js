// CORE PACKAGE/MODULE
const fs = require("fs");

// OUR OWN PACKAGE/MODULE

// THIRD PARTY PACKAGE/MODULE
const express = require("express");
const morgan = require("morgan");
const app = express();

// middleware dari express
// memodifikasi incoming request/request body ke api kita
app.use(express.json());
app.use(morgan("dev"));

// OUR OWN MUDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const port = process.env.port || 3000;

// baca data dari file json
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`
  )
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requsetTime: req.requestTime,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // generate id untuk data baru dari request api kita
  const newId = tours[tours.length - 1].id + 1;
  const newData = Object.assign(
    { id: newId },
    req.body
  );

  tours.push(newData);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 = CREATED
      res.status(201).json({
        status: "success",
        data: {
          tour: newData,
        },
      });
    }
  );
};

const editTour = (req, res) => {
  const id = req.params.id * 1;
  // findIndex = -1 (kalau data nya gk ada)
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  );

  if (tourIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    });
  }

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  };

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `tour with this id ${id} edited`,
        data: {
          tour: tours[tourIndex],
        },
      });
    }
  );
};

const removeTour = (req, res) => {
  // konversi string jadi number
  const id = req.params.id * 1;

  // cari index dari data yg sesuai id di req.params
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  );

  // validasi kalau data yg sesuai req.params.id nya gak ada
  if (tourIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }

  // proses mengahpus data sesuai index array nya => req.params.id
  tours.splice(tourIndex, 1);

  // proses update di file json nya
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "berhasil delete data",
        data: null,
      });
    }
  );
};

// FUNCTION USER

// baca data dari file json
const users = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/users.json`
  )
);

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    requsetTime: req.requestTime,
    data: {
      users,
    },
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el._id === id);

  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

const createUser = (req, res) => {
  // generate id untuk data baru dari request api kita
  const newId = users[users.length - 1].id + 1;
  const newData = Object.assign(
    { id: newId },
    req.body
  );

  users.push(newData);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      // 201 = CREATED
      res.status(201).json({
        status: "success",
        data: {
          user: newData,
        },
      });
    }
  );
};

const editUser = (req, res) => {
  const id = req.params.id;
  // findIndex = -1 (kalau data nya gk ada)
  const userIndex = users.findIndex(
    (el) => el._id === id
  );

  if (userIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
  };

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `User with this id ${id} edited`,
        data: {
          tour: users[userIndex],
        },
      });
    }
  );
};

const removeUser = (req, res) => {
  // konversi string jadi number
  const id = req.params.id;

  // cari index dari data yg sesuai id di req.params
  const userIndex = users.findIndex(
    (el) => el._id === id
  );

  // validasi kalau data yg sesuai req.params.id nya gak ada
  if (userIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }

  // proses mengahpus data sesuai index array nya => req.params.id
  users.splice(userIndex, 1);

  // proses update di file json nya
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "berhasil delete data",
        data: null,
      });
    }
  );
};

// Routing
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', editTour);
// app.delete('/api/v1/tours/:id', removeTour);

const tourRouter = express.Router();
const userRouter = express.Router();

// Routes for Tours
tourRouter
  .route("/")
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route("/:id")
  .get(getTourById)
  .patch(editTour)
  .delete(removeTour);

// Routes for user
userRouter
  .route("/")
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route("/:id")
  .get(getUserById)
  .patch(editUser)
  .delete(removeUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
