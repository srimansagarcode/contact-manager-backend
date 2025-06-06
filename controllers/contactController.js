const asyncHandler = require('express-async-handler')

//@Desc Get contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, res) => {
    console.log("body data", req.body);
    res.status(200).json({message: "Get all contacts"});
})

//@Desc get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Get ${req.params.id} contact`});
})

//@Desc create contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req, res) => {
    console.log('Create contact req.body', req.boy);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    res.status(201).json({ message: `Create contact`});
})

//@Desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Update contact ${req.params.id}`});
})

//@Desc Delete contact
//@Desc DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Delte contact ${req.params.id}`});
})

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}