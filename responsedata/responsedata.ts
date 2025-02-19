export class ResponseData<D>{
    data: D | D[]
    message: string
    statuscode: number
    constructor(data : D | D [], message: string, statuscode: number){
        this.data = data
        this.message = message
        this.statuscode = statuscode
        return this
    }
}