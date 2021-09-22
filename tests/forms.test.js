const dbo=require('../dbo')
const db=dbo.instanceDbo()

const good={
    id: undefined,
        name: '-',
    prep_defs: 0,
    img_id: 0,
}

describe('Tests for the editing forms: validating fields', ()=> {

    test('Check function validate for goods (Undefined)',()=>{
        db.validateGoods(undefined)
        expect(db.lastError).toBe('Goods is undefined!')
    })

    test('Check function validate for goods (Empty name)',()=>{
        db.validateGoods({...good, name: ''})

        expect(db.lastError).toBe('Name is empty or undefined!')
    })

    test('Check function validate for goods (Pref_defs is number)',()=>{
        db.validateGoods({...good, prep_defs: '-'})
        expect(db.lastError).toBe('Prep service should be number!')
    })
    test('Check function validate for goods (img_id is number)',()=>{
        db.validateGoods({...good, img_id: '-'})
        expect(db.lastError).toBe('Image ID should be number!')
    })


})