import { Contact } from "../Models/Contact.js";

// GET /api/contact  — only the logged-in user's contacts
export const getAllContact = async (req, res) => {
    const userContact = await Contact.find({ user: req.user._id });
    if (userContact.length === 0) {
        return res.status(404).json({ message: "No contacts exist", success: false });
    }
    return res.json({ message: "All contacts fetched", userContact, success: true });
};

// POST /api/contact/new
export const newContact = async (req, res) => {
    const { name, email, phone, type } = req.body;
    if (!name || !email || !phone || !type) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    const saveContact = await Contact.create({
        name,
        email,
        phone,
        type,
        user: req.user._id,                 // store id, not the whole doc
    });

    return res.status(201).json({
        message: "Contact saved successfully",
        saveContact,
        success: true,
    });
};

// PUT /api/contact/:id  — only owner can update
export const updateContactById = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, type } = req.body;

    const existing = await Contact.findById(id);
    if (!existing) {
        return res.status(404).json({ message: "No contact exists", success: false });
    }
    if (!existing.user.equals(req.user._id)) {
        return res.status(403).json({ message: "Forbidden", success: false });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        { name, email, phone, type },
        { new: true }
    );

    return res.json({
        message: "Contact updated successfully",
        updatedContact,
        success: true,
    });
};

// DELETE /api/contact/:id  — only owner can delete
export const deleteContactById = async (req, res) => {
    const { id } = req.params;

    const existing = await Contact.findById(id);
    if (!existing) {
        return res.status(404).json({ message: "No contact exists", success: false });
    }
    if (!existing.user.equals(req.user._id)) {
        return res.status(403).json({ message: "Forbidden", success: false });
    }

    await Contact.findByIdAndDelete(id);
    return res.json({ message: "Contact deleted successfully", success: true });
};

// GET /api/contact/:id  — only owner can read
export const getContactById = async (req, res) => {
    const userContact = await Contact.findById(req.params.id);
    if (!userContact) {
        return res.status(404).json({ message: "No contact found", success: false });
    }
    if (!userContact.user.equals(req.user._id)) {
        return res.status(403).json({ message: "Forbidden", success: false });
    }
    return res.json({ message: "Contact fetched", userContact, success: true });
};

// GET /api/contact/userid/:id  — only the same user
export const getContactByUserId = async (req, res) => {
    if (req.params.id !== String(req.user._id)) {
        return res.status(403).json({ message: "Forbidden", success: false });
    }

    const userContact = await Contact.find({ user: req.params.id });
    if (userContact.length === 0) {
        return res.status(404).json({ message: "No contact found", success: false });
    }
    return res.json({
        message: "User specific contacts fetched",
        userContact,
        success: true,
    });
};
