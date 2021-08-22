import { Model, Document, Schema, model } from "mongoose";

interface UserData {
  email: string;
  password: string;
}

interface UserDoc extends Document {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(data: UserData): UserDoc;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (data: UserData) => {
  return new User(data);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
