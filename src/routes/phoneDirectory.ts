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

export default router;
