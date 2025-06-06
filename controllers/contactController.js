const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@Desc Get contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

//@Desc get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
})

//@Desc create contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    })

    res.status(201).json(contact);
})

//@Desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updateContactDetails = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updateContactDetails);
})

//@Desc Delete contact
//@Desc DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne();
    res.status(200).json(contact);
})

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}



//DATABASE_NAME: myContacts-backend
//Cluster0
//username: srimansagarcode
//password: v9d0IX7yoguOjBAc
//connection string: mongodb+srv://srimansagarcode:v9d0IX7yoguOjBAc@cluster0.8su6c56.mongodb.net/