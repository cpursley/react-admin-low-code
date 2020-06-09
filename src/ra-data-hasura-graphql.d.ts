declare module "ra-data-hasura-graphql";
//{
  // export enum FetchType {
  //   GET_LIST = 'GET_LIST',
  //   GET_ONE = 'GET_ONE',
  //   GET_MANY = 'GET_MANY',
  //   GET_MANY_REFERENCE = 'GET_MANY_REFERENCE',
  //   CREATE = 'CREATE',
  //   UPDATE = 'UPDATE',
  //   UPDATE_MANY = 'UPDATE_MANY',
  //   DELETE = 'DELETE',
  //   DELETE_MANY = 'DELETE_MANY'
  // }
  // type FetchActionsWithRecordResponse = FetchType.GET_ONE | FetchType.CREATE| FetchType.UPDATE
  // type FetchActionsWithArrayOfIdentifiedRecordsResponse = FetchType.GET_LIST | FetchType.GET_MANY | FetchType.GET_MANY_REFERENCE
  // type FetchActionsWithArrayOfRecordsResponse = FetchActionsWithArrayOfIdentifiedRecordsResponse | FetchType.UPDATE_MANY | FetchType.DELETE_MANY
  // type FetchActionsWithTotalResponse = FetchType.GET_LIST | FetchType.GET_MANY_REFERENCE
  
  // type Resource = {
  //   name: string,
  //   type: string
  // }

  // type IntrospectionResource = {
  //   type: {
  //     name: string
  //   }
  // }

  // enum GraphqlTypeKind {
  //   SCALAR= 'SCALAR',
  //   OBJECT=  'OBJECT',
  //   INTERFACE = 'INTERFACE',
  //   UNION ='UNION',
  //   ENUM = 'ENUM',
  //   INPUT_OBJECT = 'INPUT_OBJECT',
  //   LIST ='LIST',
  //   NON_NULL ='NON_NULL'
  // }

  // type IntrospectionField = {
  //   name: string,
  //   type: {
  //     kind: GraphqlTypeKind,
  //     ofType: {
  //       kind: GraphqlTypeKind,
  //       name: string
  //     }
  //   }
  // }

  // type InstrospectionQuery = {
  //   name: string,
  //   args: IntrospectionField[],
  //   type: GraphqlTypeKind
  // }

  // type IntrospectionType =  {
  //   name: string
  //   kind: GraphqlTypeKind,
  // }

  // type IntrospectionResult = {
  //   resources: IntrospectionResource[],
  //   types: IntrospectionType[],
  //   fields: IntrospectionField[],
  //   queries: InstrospectionQuery[]
  // }

  // type Introspection = {
  //   operationNames: {
  //     [k in FetchType]: (r: Resource) => string 
  //   }
  // }

  // type Options = {
  //   client?: any,
  //   clientOptions?: any
  //   introspection?: Introspection
  // }

  // function buildVariables(r: Resource, aorFetchType: FetchType, ): object;
  // export const fetchActionsWithRecordResponse: FetchActionsWithRecordResponse[]
  // export const fetchActionsWithArrayOfIdentifiedRecordsResponse: FetchActionsWithArrayOfIdentifiedRecordsResponse[]
  // export const fetchActionsWithArrayOfRecordsResponse: FetchActionsWithArrayOfRecordsResponse[]
  // export const fetchActionsWithTotalResponse: FetchActionsWithTotalResponse[]
  // export default function (options: Options);
//};