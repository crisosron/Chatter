class CommunicationEntity{
    constructor(name, id){
        this._id = id;
        this._name = name;
    }

    get name(){
        return this._name;
    }

    get id(){
        return this._id;
    }
}

module.exports = CommunicationEntity;