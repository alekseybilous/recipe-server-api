import mongoose, {
  HookNextFunction,
  Model,
  Schema,
  SchemaDefinition,
  Document,
} from 'mongoose';
import bcrypt from 'bcrypt';
import { RecipeDocument } from './Recipe';

const schema: SchemaDefinition = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe',
  },
};

export interface User {
  username: string;
  password: string;
  email: string;
  joinDate: Date;
  favorites: Schema.Types.ObjectId | Record<string, unknown>;
}

// Not directly exported because it is not recommanded to
// use this interface direct unless necessarys since the
// type of `company` field is not deterministic
interface UserBaseDocument extends User, Document {}

// Export this for strong typing
export interface UserDocument extends UserBaseDocument {
  favorites: RecipeDocument['_id'];
}

// For model
export interface IUserModel extends Model<UserDocument> {}

const collectionName: string = 'User';

const UserSchema: mongoose.Schema = new mongoose.Schema(schema);

UserSchema.pre<UserDocument>('save', async function (next: HookNextFunction) {
  console.log('start');
  if (!this.isModified('password')) {
    return next();
  }

  await bcrypt.genSalt(10, async (err: Error, salt: string) => {
    if (err) {
      return next(err);
    }

    await bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
      if (err) {
        return next(err);
      }

      console.log('pass', hash);
      this.password = hash;
      next();
    });
  });
});

export default mongoose.model<UserDocument, IUserModel>(
  collectionName,
  UserSchema
);
