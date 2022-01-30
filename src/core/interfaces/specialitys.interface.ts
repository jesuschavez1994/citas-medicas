export class SpecialityModel {
    _id: string;
    name: string;
    description: string;

    constructor(obj?: any){
        this._id = obj && obj._id || null;
        this.name = obj && obj.name || null;
        this.description = obj && obj.description || null;
    }
}
