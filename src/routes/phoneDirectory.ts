import { Router, Request, Response } from "express";
import Contact, { Icontact } from "../models/contacts";
import { apiResponse } from "../interface/apiResponse";

const router = Router();

// Get all the contacts
router.get("/", async (req: Request, res: Response) => {
  try {
    const contacts: Icontact[] = await Contact.find();
    const resObj: apiResponse = {
      status: true,
      message: "Fetched Contacts",
      data: contacts,
    };
    return res.status(200).json(resObj);
  } catch (error) {
    const errObj: apiResponse = {
      status: false,
      message: "Server Error",
      data: [],
    };
    return res.status(500).json(errObj);
  }
});

//post new contact
router.post("/", async (req: Request, res: Response) => {
  try {
    const newContact: Icontact = new Contact({
      name: req.body.name,
      phone: req.body.phone,
    });
    const contact: Icontact = await newContact.save();
    const resObj: apiResponse = {
      status: true,
      message: "Created a new contact",
      data: contact,
    };
    return res.status(201).json(resObj);
  } catch (error) {
    const errObj: apiResponse = {
      status: false,
      message: "Server Error",
      data: [],
    };
    return res.status(500).json(errObj);
  }
});

//get single contact by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const contact: Icontact | null = await Contact.findById(req.params.id);
    if (!contact) {
      const errorObj = {
        status: false,
        message: "Contact not found",
        data: "",
      };
      return res.status(404).send(errorObj);
    }
    const resObj: apiResponse = {
      status: true,
      message: "Contact found",
      data: contact,
    };
    return res.status(200).send(resObj);
  } catch (error) {
    const errObj: apiResponse = {
      status: false,
      message: "Server Error",
      data: [],
    };
    return res.status(500).json(errObj);
  }
});
//for updating the contact
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const contact: Icontact | null = await Contact.findById(req.params.id);
    if (!contact) {
      const errorObj = {
        status: false,
        message: "Contact not found",
        data: "",
      };
      return res.status(404).send(errorObj);
    }

    contact.name = req.body.name || contact.name;
    contact.phone = req.body.phone || contact.phone;
    await contact.save();
    const resObj: apiResponse = {
      status: true,
      message: "Contact  updated",
      data: contact,
    };
    return res.status(200).send(resObj);
  } catch (error) {
    const errObj: apiResponse = {
      status: false,
      message: "Server Error",
      data: [],
    };
    return res.status(500).json(errObj);
  }
});
//delete contact
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const contact: Icontact | null = await Contact.findById(req.params.id);
    if (!contact) {
      const errorObj = {
        status: false,
        message: "Contact not found",
        data: "",
      };
      return res.status(404).send(errorObj);
    }
    await contact.deleteOne();

    const resObj: apiResponse = {
      status: true,
      message: "Contact deleted",
      data: "",
    };
    return res.status(200).send(resObj);
  } catch (error) {
    const errObj: apiResponse = {
      status: false,
      message: "Server Error",
      data: [],
    };
    return res.status(500).json(errObj);
  }
});

export default router;
