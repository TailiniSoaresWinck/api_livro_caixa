const express = require("express");
const userController = require("../controllers/userController");
const movimentController = require("../controllers/movimentController");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).send("<h1>CASHBOOK API</h1>");
});

router.get("/user", async (req, res, next) => {
    user = await userController.get();
    res.status(200).send(user);
});

router.post("/user/login", async (req, res, next) => {
    user = await userController.login(req.body);
    res.status(200).send(user);
});

router.get("/moviments", async (req, res) => {
    auth = userController.verifyJWT(req.headers["x-access-token"]);
    if (auth.idUser) {
      if (req.headers.iduser == auth.idUser) {
        resp = await movimentController.get();
        resp = Object.assign({}, resp, auth);
      } else {
        resp = { status: "null", auth };
      }
    } else {
      resp = { status: "null", auth };
    }
    res.status(200).send(resp);
  });
 
router.get("/moviments/cashbalance", async (req, res) => {
   auth = userController.verifyJWT(req.headers["x-access-token"]);
    if (auth.idUser) {
      if (req.headers.iduser == auth.idUser) {
        resp = await movimentController.cashBalance();
        resp = Object.assign({}, resp, auth);
      } else {
        resp = { status: "null", auth };
      }
    } else {
      resp = { status: "null", auth };
    }
    res.status(200).send(resp);
});

router.get("/moviments/io", async (req, res) => {
  auth = userController.verifyJWT(req.headers["x-access-token"]);
  if (auth.idUser) {
    if (req.headers.iduser == auth.idUser) {
      resp = await movimentController.movimentsIo();
      resp = Object.assign({}, resp, auth);
    } else {
      resp = { status: "null", auth };
    }
  } else {
    resp = { status: "null", auth };
  }
  res.status(200).send(resp);
});

router.get("/moviments/io/:year/:month", async (req, res) => {
  auth = userController.verifyJWT(req.headers["x-access-token"]);
  if (auth.idUser) {
    if (req.headers.iduser == auth.idUser) {
      const year = req.params.year;
      const month = req.params.month;
      resp = await movimentController.yearMonth(year, month);
      resp = Object.assign({}, resp, auth);
    } else {
      resp = { status: "null", auth };
    }
  } else {
    resp = { status: "null", auth };
  }
  res.status(200).send(resp);
})

router.get("/moviments/io/:yearI/:monthI/:monthII/:yearII", async (req, res) => {
  auth = userController.verifyJWT(req.headers["x-access-token"]);
  if (auth.idUser) {
    if (req.headers.iduser == auth.idUser) {
      const yearI = req.params.yearI;
      const monthI = req.params.monthI;
      const yearII = req.params.yearII;
      const monthII = req.params.monthII;
      resp = await movimentController.filter(yearI, monthI, yearII, monthII);
      resp = Object.assign({}, resp, auth);
    } else {
      resp = { status: "null", auth };
    }
  } else {
    resp = { status: "null", auth };
  }
  res.status(200).send(resp);
});

router.get("/moviments/:year/:month", async (req, res) => {
    auth = userController.verifyJWT(req.headers["x-access-token"]);
    if (auth.idUser) {
      if (req.headers.iduser == auth.idUser) {
        const year = req.params.year;
        const month = req.params.month;
        resp = await movimentController.movimentsList(year, month);
        resp = Object.assign({}, resp, auth);
      } else {
        resp = { status: "null", auth };
      }
    } else {
      resp = { status: "null", auth };
    }
    res.status(200).send(resp);
});

module.exports = router;
