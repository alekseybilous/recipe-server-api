import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Recipe = {
  __typename?: 'Recipe';
  _id?: Maybe<Scalars['ID']>;
  likes: Scalars['Int'];
  createdDate: Scalars['String'];
  instructions: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  imageUrl: Scalars['String'];
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  joinDate: Scalars['Int'];
  favorites: Array<Recipe>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user?: Maybe<User>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SiginupInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RecipeInput = {
  _id: Scalars['ID'];
};

export type UserRecipesInput = {
  email: Scalars['String'];
};

export type AddRecipeInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  instructions: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
};

export type DeleteUserRecipeInput = {
  _id: Scalars['ID'];
};

export type LikeRecipeInput = {
  _id: Scalars['ID'];
  email: Scalars['String'];
};

export type UnlikeRecipeInput = {
  _id: Scalars['ID'];
  email: Scalars['String'];
};

export type UpdateUserRecipeInput = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  instructions: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  userRecipes: Array<Recipe>;
};

export type QueryRecipeArgs = {
  input: RecipeInput;
};

export type QueryUserRecipesArgs = {
  input: UserRecipesInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<AuthPayload>;
  signup: AuthPayload;
  addRecipe: Recipe;
  deleteUserRecipe?: Maybe<Recipe>;
  likeRecipe: Recipe;
  unlikeRecipe: Recipe;
  updateUserRecipe: Recipe;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationSignupArgs = {
  input: SiginupInput;
};

export type MutationAddRecipeArgs = {
  input: AddRecipeInput;
};

export type MutationDeleteUserRecipeArgs = {
  input: DeleteUserRecipeInput;
};

export type MutationLikeRecipeArgs = {
  input: LikeRecipeInput;
};

export type MutationUnlikeRecipeArgs = {
  input: UnlikeRecipeInput;
};

export type MutationUpdateUserRecipeArgs = {
  input: UpdateUserRecipeInput;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Recipe: ResolverTypeWrapper<Recipe>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  LoginInput: LoginInput;
  SiginupInput: SiginupInput;
  RecipeInput: RecipeInput;
  UserRecipesInput: UserRecipesInput;
  AddRecipeInput: AddRecipeInput;
  DeleteUserRecipeInput: DeleteUserRecipeInput;
  LikeRecipeInput: LikeRecipeInput;
  UnlikeRecipeInput: UnlikeRecipeInput;
  UpdateUserRecipeInput: UpdateUserRecipeInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Recipe: Recipe;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  String: Scalars['String'];
  User: User;
  AuthPayload: AuthPayload;
  LoginInput: LoginInput;
  SiginupInput: SiginupInput;
  RecipeInput: RecipeInput;
  UserRecipesInput: UserRecipesInput;
  AddRecipeInput: AddRecipeInput;
  DeleteUserRecipeInput: DeleteUserRecipeInput;
  LikeRecipeInput: LikeRecipeInput;
  UnlikeRecipeInput: UnlikeRecipeInput;
  UpdateUserRecipeInput: UpdateUserRecipeInput;
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
};

export type RecipeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']
> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  instructions?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  joinDate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  favorites?: Resolver<
    Array<ResolversTypes['Recipe']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']
> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  recipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<QueryRecipeArgs, 'input'>
  >;
  recipes?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType>;
  userRecipes?: Resolver<
    Array<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserRecipesArgs, 'input'>
  >;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  login?: Resolver<
    Maybe<ResolversTypes['AuthPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'input'>
  >;
  signup?: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSignupArgs, 'input'>
  >;
  addRecipe?: Resolver<
    ResolversTypes['Recipe'],
    ParentType,
    ContextType,
    RequireFields<MutationAddRecipeArgs, 'input'>
  >;
  deleteUserRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserRecipeArgs, 'input'>
  >;
  likeRecipe?: Resolver<
    ResolversTypes['Recipe'],
    ParentType,
    ContextType,
    RequireFields<MutationLikeRecipeArgs, 'input'>
  >;
  unlikeRecipe?: Resolver<
    ResolversTypes['Recipe'],
    ParentType,
    ContextType,
    RequireFields<MutationUnlikeRecipeArgs, 'input'>
  >;
  updateUserRecipe?: Resolver<
    ResolversTypes['Recipe'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserRecipeArgs, 'input'>
  >;
};

export type Resolvers<ContextType = any> = {
  Recipe?: RecipeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
