// currently not using, but might have to use when we go to frontend for types


export interface ResponseFuncs
{
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}


// Model
export interface Todo
{
    _id?: number
    item: string
    completed: boolean
}