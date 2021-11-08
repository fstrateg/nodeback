const dbo=require('../dbo')
const db=new dbo()

describe('Tests for dbo', function () {
    test('getgoods should be defined', ()=>{
        expect(db.getgoods).toBeDefined()
    })
    test('sprgoods should be defined', ()=>{
        expect(db.sprgoods).toBeDefined()
    })
})