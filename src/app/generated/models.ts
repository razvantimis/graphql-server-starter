import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** Date */
  Date: any,
};

export type CreatUser = {
  email?: Maybe<Scalars['String']>,
  fullName?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  role?: Maybe<UserRole>,
};


export type Mutation = {
   __typename?: 'Mutation',
  creatUser?: Maybe<User>,
};


export type MutationCreatUserArgs = {
  resource?: Maybe<CreatUser>
};

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  UserInstanceByToken?: Maybe<User>,
};


export type QueryHelloArgs = {
  name?: Maybe<Scalars['String']>
};

export type User = {
   __typename?: 'User',
  createdAt: Scalars['Date'],
  email: Scalars['String'],
  firebaseUid: Scalars['String'],
  fullName: Scalars['String'],
  id: Scalars['Int'],
  isEnabled?: Maybe<Scalars['Boolean']>,
  role: UserRole,
};

export enum UserRole {
  Admin = 'Admin'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  UserRole: UserRole,
  Mutation: ResolverTypeWrapper<{}>,
  CreatUser: CreatUser,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  User: User,
  Date: Scalars['Date'],
  Int: Scalars['Int'],
  Boolean: Scalars['Boolean'],
  UserRole: UserRole,
  Mutation: {},
  CreatUser: CreatUser,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  creatUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationCreatUserArgs>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType, QueryHelloArgs>,
  UserInstanceByToken?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firebaseUid?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  isEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
