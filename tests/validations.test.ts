// import { generateAssertion } from '../src/validations_v2';
// import { assert } from 'chai';

// describe('Validate array-like operations', () => {
//   it('should validate array-like operations as expected', () => {
//     const res1 = generateAssertion('minItems', 'tags', 0, true);
//     assert(res1 === 'assert( tags.forall(_.length >= 0), "`tags` must have minimum 0 item(s)" )')
//     const res11 = generateAssertion('minItems', 'tags', 2, false);
//     assert(res11 === 'assert( tags.length >= 2, "`tags` must have minimum 2 item(s)" )')
//     const res2 = generateAssertion('minItems', 'tags', 1, true);
//     assert(res2 === 'assert( tags.forall(_.nonEmpty), "`tags` must have minimum 1 item(s)" )')
//     const res21 = generateAssertion('minItems', 'tags', 4, false);
//     assert(res21 === 'assert( tags.length >= 4, "`tags` must have minimum 4 item(s)" )')

//     const res3 = generateAssertion('maxItems', 'tags', 0, true);
//     assert(res3 === 'assert( tags.forall(_.isEmpty), "`tags` must have maximum 0 item(s)" )')
//     const res31 = generateAssertion('maxItems', 'tags', 2, false);
//     assert(res31 === 'assert( tags.length <= 2, "`tags` must have maximum 2 item(s)" )')

//     const res4 = generateAssertion('uniqueItems', 'tags', null, true);
//     assert(res4 === 'assert( tags.forall(_.length > _.distinct.length), "`tags` contains duplicate items" )')
//     const res41 = generateAssertion('uniqueItems', 'tags', null, false);
//     assert(res41 === 'assert( tags.length > tags.distinct.length, "`tags` contains duplicate items" )')

//     const res5 = generateAssertion('multipleOf', 'age', 3, true);
//     assert(res5 === 'assert( age.forall(_ % 3 === 0), "`age` must be multiple of (divisible by) 3" )')
//     const res51 = generateAssertion('multipleOf', 'age', 5, false);
//     assert(res51 === 'assert( age % 5 === 0, "`age` must be multiple of (divisible by) 5" )')
//   });
// });

// describe('Validate number like operations', () => {
//   it('should validate number-like operations as expected', () => {
//     const res6 = generateAssertion('maximum', 'age', 18, true);
//     assert(res6 === 'assert( age.forall(_ <= 18), "`age` must be less than or equal to 18" )')
//     const res61 = generateAssertion('maximum', 'age', 18, false);
//     assert(res61 === 'assert( age <= 18, "`age` must be less than or equal to 18" )')
//     const res7 = generateAssertion('minimum', 'age', 18, true);
//     assert(res7 === 'assert( age.forall(_ >= 18), "`age` must be greater than or equal to 18" )')
//     const res71 = generateAssertion('minimum', 'age', 18, false);
//     assert(res71 === 'assert( age >= 18, "`age` must be greater than or equal to 18" )')

//     const res8 = generateAssertion('exclusiveMaximum', 'age', 18, true);
//     assert(res8 === 'assert( age.forall(_ < 18), "`age` must be less than 18" )')
//     const res81 = generateAssertion('exclusiveMaximum', 'age', 18, false);
//     assert(res81 === 'assert( age < 18, "`age` must be less than 18" )')

//     const res9 = generateAssertion('exclusiveMinimum', 'age', 18, true);
//     assert(res9 === 'assert( age.forall(_ > 18), "`age` must be greater than 18" )')
//     const res91 = generateAssertion('exclusiveMinimum', 'age', 18, false);
//     assert(res91 === 'assert( age > 18, "`age` must be greater than 18" )')

//   });
// });

// describe('Validate string-like operations', () => {
//   it('should validate number-like operations as expected', () => {
//     const res10 = generateAssertion('maxLength', 'name', 200, true);
//     assert(res10 === 'assert( name.forall(_.length <= 200), "`name` does not meet maximum length of 200" )')
//     const res101 = generateAssertion('maxLength', 'name', 200, false);
//     assert(res101 === 'assert( name.length <= 200, "`name` does not meet maximum length of 200" )')

//     const res11 = generateAssertion('minLength', 'name', 10, true);
//     assert(res11 === 'assert( name.forall(_.length >= 10), "`name` does not meet minimum length of 10" )')
//     const res111 = generateAssertion('minLength', 'name', 10, false);
//     assert(res111 === 'assert( name.length >= 10, "`name` does not meet minimum length of 10" )')

//     const res12 = generateAssertion('pattern', 'name', '/[a-zA-Z0-9]/', true);
//     assert(res12 === 'assert( name.forall(_.matches("/[a-zA-Z0-9]/")), "`name` does not match the pattern" )')
//     const res121 = generateAssertion('pattern', 'name', '/[a-zA-Z0-9]/', false);
//     assert(res121 === 'assert( name.matches("/[a-zA-Z0-9]/"), "`name` does not match the pattern" )')
//   });
// });
