import { contact } from "../Models/Contact.js";

// get contact
export const getAllContact = async (req, res) => {
    const userContact = await contact.find();
    if (!userContact)
        return res.json({ message: "No contacts exist", success: false });

    res.json({ message: "All contacts fetched", userContact });
};

// Create new contact
export const newContact = async (req, res) => {
    const { name, email, phone, type } = req.body;
    if (!name || !email || !phone || !type)
        return res.json({ message: "All fields are required", success: false });

    let saveContact = await contact.create({
        name,
        email,
        phone,
        type,
        user: req.user
    });

    res.json({
        message: "Contact saved successfully",
        saveContact,
        success: true,
    });
    
};

// update contact by id
export const updateContactById = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, type } = req.body;

    let updatedContact = await contact.findByIdAndUpdate(
        id,
        {
            name,
            email,
            phone,
            type,
        },
        { new: true },
    );
    if (!updatedContact) return res.json({ message: "No contact exist ", success: false });


    res.json({ message: "Contact updated successfully", updatedContact,success: true });


};

// delete contact by id
export const deleteContactById = async (req, res) => {
    const id = req.params.id;
    

    let deleteContact = await contact.findByIdAndDelete(id);

        

    if (!deleteContact) return res.json({ message: "No contact exist ", success: false });


    res.json({ message: "Contact deleted successfully", success: true });


};

// get contact by id
export const getContactById = async (req, res) => {
    const id = req.params.id;
    const userContact = await contact.findById(id);

    if (!userContact)
        return res.json({ message: "No contact found", success: false });

    res.json({ message: "Contacts are fetched ", userContact, success: true });
};


// get contact by userid
export const getContactByUserId = async (req, res) => {
    const id = req.params.id;
    const userContact = await contact.find({user:id});

    if (!userContact)
        return res.json({ message: "No contact found", success: false });

    res.json({ message: "User specific Contacts are fetched ", userContact, success: true });
};
