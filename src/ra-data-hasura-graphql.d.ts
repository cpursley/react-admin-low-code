declare module 'ra-data-hasura-graphql' {
  import * as apollo from 'apollo-client'
  export enum FetchType {
    GET_LIST = 'GET_LIST',
    GET_ONE = 'GET_ONE',
    GET_MANY = 'GET_MANY',
    GET_MANY_REFERENCE = 'GET_MANY_REFERENCE',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    UPDATE_MANY = 'UPDATE_MANY',
    DELETE = 'DELETE',
    DELETE_MANY = 'DELETE_MANY'
  }

  enum GraphqlTypeKind {
    SCALAR= 'SCALAR',
    OBJECT=  'OBJECT',
    INTERFACE = 'INTERFACE',
    UNION ='UNION',
    ENUM = 'ENUM',
    INPUT_OBJECT = 'INPUT_OBJECT',
    LIST ='LIST',
    NON_NULL ='NON_NULL'
  }

  type CheckExistsFunc = (s: string) => boolean

  type FetchActionsPaginated = FetchType.GET_MANY_REFERENCE | FetchType.GET_LIST
  type FetchMutateSingle = FetchType.CREATE | FetchType.UPDATE | FetchType.DELETE
  type FetchMutateBatch = FetchType.UPDATE_MANY | FetchType.DELETE_MANY
  
  type ResourceType = {
    name: string
    kind: GraphqlTypeKind,
    fields: IntrospectionField[]
  }

  export type IntrospectionResource = {
    [key in FetchType]?:  InstrospectionQuery
  } & {
    type: ResourceType;
  };


  type IntrospectionField = {
    name: string,
    type: {
      kind: GraphqlTypeKind,
      ofType: {
        kind: GraphqlTypeKind,
        name: string
      }
    }
  }

  type InstrospectionQuery = {
    name: string,
    args: IntrospectionField[],
    type: GraphqlTypeKind
  }

  type IntrospectionType =  {
    name: string
    kind: GraphqlTypeKind,
  }

  type IntrospectionResult = {
    resources: IntrospectionResource[],
    types: IntrospectionType[],
    fields: IntrospectionField[],
    queries: InstrospectionQuery[],
    schema: object
  }

  type IntrospectionOptions = {
    operationNames: {
      [k in FetchType]: (r: ResourceType) => string 
    }
    exclude?: string[] | CheckExistsFunc
    include?: string[] | CheckExistsFunc
  }


  type BuildQuery = (f: FetchType, r: string, params: object) => {
    query: any,
    variables: object,
    parseResponse: ({ data }: any) => ({ data: any, total?: number })
  }

  type BuildFields = (type: ResourceType) => any[]
  type BuildMetaArgs = (q: InstrospectionQuery, v: object, aorFetchType: FetchType) => any[]
  type BuildArgs = (q: InstrospectionQuery, v: object) => any[]
  type BuildVariables = (r: ResourceType, aorFetchType: FetchType, params: object) => object
  type BuildGqlQuery = (i: IntrospectionResult, buildFields: BuildFields, buildMetaArgs: BuildMetaArgs, buildArgs: BuildArgs, buildApolloArgs: BuildArgs) => () => any

  type ResponseParser = 
    ((i: IntrospectionResult) =>
    (f: FetchActionsPaginated) => ({ data }: any) => ({ data: object[], total: number })) |
    ((i: IntrospectionResult) => (f: FetchType.GET_MANY) => ({ data }: any) => ({ data: object[] })) |
    ((i: IntrospectionResult) => (f: FetchMutateSingle) => ({ data }: any) => ({ data: object })) |
    ((i: IntrospectionResult) => (f: FetchMutateBatch) => ({ data }: any) => ({ data: string[] }))

  export const buildFields: BuildFields
  export const buildMetaArgs: BuildMetaArgs
  export const buildArgs: BuildArgs
  export const buildApolloArgs: BuildArgs
  export const buildVariables: BuildVariables;
  export const buildGqlQuery: BuildGqlQuery;

  export function getResponseParser(i: IntrospectionResult): (f: FetchActionsPaginated) => ({ data }: any) => ({ data: object[], total: number })
  export function getResponseParser(i: IntrospectionResult): (f: FetchType.GET_MANY) => ({ data }: any) => ({ data: object[] })
  export function getResponseParser(i: IntrospectionResult): (f: FetchMutateSingle) => ({ data }: any) => ({ data: object })
  export function getResponseParser(i: IntrospectionResult): (f: FetchMutateBatch) => ({ data }: any) => ({ data: string[] })
  export function buildQueryFactory(buildVariables: BuildVariables, buildGqlQuery: BuildGqlQuery, getResponseParser: ResponseParser): BuildQuery

  type Options<T = any> = {
    client?: apollo.ApolloClient<T>,
    clientOptions?: {uri: string}
    introspection?: IntrospectionOptions
  }

  export default function (options: Options): Promise<(f: FetchType, r: ResourceType, params: object) => ({ data: any})>;  
}