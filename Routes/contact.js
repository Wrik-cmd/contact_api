import express from "express";
import {
    deleteContactById,
    getAllContact,
    getContactById,
    getContactByUserId,
    newContact,
    updateContactById,
} from "../Controllers/contact.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newContact);
router.get("/", isAuthenticated, getAllContact);
router.get("/userid/:id", isAuthenticated, getContactByUserId); // before /:id
router.get("/:id", isAuthenticated, getContactById);
router.put("/:id", isAuthenticated, updateContactById);
router.delete("/:id", isAuthenticated, deleteContactById);

export default router;
