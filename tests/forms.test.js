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
        expect(()=>{db.validateGoods(undefined)}).toThrowError('Goods is undefined!')
    })

    test('Check function validate for goods (Empty name)',()=>{
        expect(()=>{db.validateGoods({...good, name: ''})}).toThrowError('Name is empty or undefined!')
    })

    test('Check function validate for goods (Pref_defs is number)',()=>{
        expect(()=>{db.validateGoods({...good, prep_defs: '-'})}).toThrowError('Prep service should be number!')
    })
    test('Check function validate for goods (img_id is number)',()=>{
        expect(()=>{db.validateGoods({...good, img_id: '-'})}).toThrowError('Image ID should be number!')
    })
})