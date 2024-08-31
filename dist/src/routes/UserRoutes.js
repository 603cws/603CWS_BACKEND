"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const UserControllers_1 = require("../controllers/UserControllers");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const router = (0, express_1.Router)();
router.post("/", UserControllers_1.createuser);
router.get("/", authMiddleware_1.protect, UserControllers_1.getusers);
router.get("/userdetails", authMiddleware_1.protect, UserControllers_1.getuserdetails);
router.delete("/:id", authMiddleware_1.protect, UserControllers_1.deleteuser);
router.put("/changepassword", UserControllers_1.changepasswordbyuser);
router.put("/updateuser", authMiddleware_1.protect, UserControllers_1.updateuser);
router.get("/details/dashboard", adminMiddleware_1.admin, UserControllers_1.allusersbyadmin);
router.get("/checkauth", UserControllers_1.checkauth);
router.post("/sendcallback", UserControllers_1.sendcallback);
router.post("/contactus", UserControllers_1.contactus);
router.post("/admin/updateuser", adminMiddleware_1.admin, UserControllers_1.updateuserbyadmin);
router.post("/admin/deleteuser", adminMiddleware_1.admin, UserControllers_1.deleteuserbyadmin);
exports.default = router;
