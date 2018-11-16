const isEmpty = (
  value // 빈 객체가 아님을 확인한다
) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);
// 인자로 받은 객체(errors)가 undefined 이거나 null 이거나 혹은 다음 두 가지에 해당 하는지
// name의 value가 2 <name< 30을 만족하지 않는다면 위의 비교식의 결과는
// false || false || (false) || (false)
// errors 객체는 errors.name 프로퍼티 및 프로퍼티 값을 갖고 있기 때문에 위의 결과가 도출된다.
// 그래서 함수의 실행 결과 또한 false
module.exports = isEmpty;
