import mongoose, { Model, SchemaDefinition, Document } from 'mongoose';

const schema: SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    required: true,
  },
};

export interface Recipe {
  username: string;
  likes: number;
  createdDate: Date;
  instructions: string;
  description: string;
  category: string;
  imageUrl: string;
  name: string;
}

interface RecipeBaseDocument extends Recipe, Document {}

export interface RecipeDocument extends RecipeBaseDocument {}

export interface IRecipeModel extends Model<RecipeDocument> {}

const collectionName: string = 'Recipe';

const RecipeSchema: mongoose.Schema = new mongoose.Schema(schema);

RecipeSchema.index({
  '$**': 'text',
});

export default mongoose.model<RecipeDocument, IRecipeModel>(
  collectionName,
  RecipeSchema
);
