// componentDidMount() {
// fetch("/api/items")
//   .then(res => res.json())
// promise instance responded 그래서 한번 더 then.
//   .then(item => {
//     this.setState({ items: [...item] });
//     console.log(item.length + " items have fetched");
//   });

// 객체 deStructuring
// const { items } = this.state; === const items = this.state.items

// es6에서 프로퍼티 key와 프로퍼티 value가 같을 경우 생략 가능
// for example,
// exam = (name) => {
//   return {
//     name  // name: name
//   }
// }
