import mongoose, { Document, Schema } from "mongoose";

export interface Icontact extends Document {
  name: string;
  phone: number;
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    length: 10,
  },
});
export default mongoose.model<Icontact>("Contact", ContactSchema);
