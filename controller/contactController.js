
const asyncHandler=require('express-async-handler')
const Contact=require('../models/contactModel')
const contactModel = require('../models/contactModel')

//get all contacts
//@route Get api/contacts
//@access private


const getContacts =asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id})   
    res.json(contacts)
})

//Create  contacts
//@route Post api/contacts
//@access private



const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);

    const { name, email, phn } = req.body;

    // Check if required fields are provided
    if (!name || !email || !phn) {
        res.status(400);
        throw new Error("All fields (name, email, phone) are required");
    }

    try {
        // Create the contact and save it in the database
        const contact = await Contact.create({
            name,
            email,
            phn,
            user_id: req.user.id,
        });

        // Respond with the created contact
        res.status(201).json(contact);
    } catch (error) {
        res.status(500);
        throw new Error("Error creating contact");
    }
});


//get contact
//@route get api/contact/:id
//@access private

const getContact=asyncHandler(async(req,res)=>{
const contact=await Contact.findById({user_id:req.params.id});
if(!contact){
    res.status(404)
    throw new Error("Contact not found")
 
}
    res.status(200).json(contact)
})

//Update contacts
//@route Put api/contacts/:id
//@access private

const updateContact=asyncHandler(async(req,res)=>{
const contact=await Contact.findById(req.params.id);
if(!contact){
    res.status(404)
    throw new Error("Contact not found")
 
}

if(contact.user_id.toString()!==req.user.id){
    res.status(403)
    throw new Error("Unauthorized to update this contact")
 
};

const updatedContact=await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
)
res.status(200).json(updatedContact)
})

//Delete contacts
//@route Delete api/contact/:id
//@access private

const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
if(!contact){
    res.status(404)
    throw new Error("Contact not found")
}

if(contact.user_id.toString()!==req.user.id){
    res.status(403)
    throw new Error("Unauthorized to update this contact")
 
};

const deletedContact=await Contact.findByIdAndDelete(
    req.params.id,
    {new:true}
 
)
    res.status(200).json(deletedContact)
})





module.exports = {getContacts,createContact,getContact,updateContact,deleteContact}