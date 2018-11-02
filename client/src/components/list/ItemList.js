import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  ListGroupItemHeading,
  ListGroupItemText,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

import { postItem } from "../../action/itemActions";
import { fetchItem } from "../../action/itemActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ userid: uuid(), content: [], heading: "" }],
      content: "",
      isFetched: false
    };
  }

  // component 로드 직후 DB에서 데이터를 수신해서 표시
  // componentDidMount() {
  //   // fetch("/api/items")
  //   //   .then(res => res.json()) // promise instance responded 그래서 한번 더 then.
  //   //   .then(item => {
  //   //     this.setState({ items: [...item] });
  //   //     console.log(item.length + " items have fetched");
  //   //   });
  //   console.log(this.state);
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      console.log("nextProps", nextProps);
      this.setState({
        isFetched: nextProps.items.isFetched,
        items: nextProps.items.fetchedData
      });
      console.log("this.state", this.state);
    }
  }

  // When FETCH button clicked
  fetchAll = () => {
    this.props.fetchItem();
    // fetchItem();
    console.log(this.props);
    console.log(this.state);
  };

  // addItem for AJAX request
  addItem = () => {
    const heading = prompt("Enter Heading");
    if (heading) {
      const newItem = {
        id: uuid(),
        heading,
        content: this.state.content
      };
      newItem.content = newItem.content.split("\n");
      console.log(newItem);
      this.setState({
        items: [newItem, ...this.state.items]
      });
      console.log(this.state.items);
      postItem(newItem);
    }
    this.setState({ content: "" });
  };
  // delItem for AJAX request
  delItem = content => {
    // console.log(name);
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/api/items/${content}`);
    xhr.send();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.log("Error!");
        }
      }
    };
  };
  // delete All
  delAll = () => {
    console.log("Del All");
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/items/all");
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.log("Error!");
        }
      }
    };
  };

  // *** TODO *** updateItem Method

  onChange = e => {
    this.setState({ content: e.target.value }); // 일시적으로 입력되는 값을 저장
  };
  render() {
    const { items } = this.state;

    console.log(items);
    // 밑에서 items.map 수행 === this.state.items.map
    return (
      <Container className="list-Container">
        <FormGroup>
          <Form className="form-text-area">
            <Label>Any comments?</Label>
            <textarea
              // tabIndex="0"
              className="text-area"
              value={this.state.content}
              onChange={this.onChange}
            />
            <input type="date" />
          </Form>
        </FormGroup>
        <Button
          color="dark"
          style={{ marginBottom: "2rem", marginRight: "10px" }}
          onClick={this.addItem}
        >
          Add Item
        </Button>
        {/* ********DELETE ALL 미완성*********** */}
        <Button
          color="danger"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const yes = prompt("Are you sure you want to Delete All?");
            // alert 창으로 표시되어서 입력값을 name 변수에 할당
            if (yes) {
              this.setState({
                items: [{ id: uuid(), name: "***Example***" }]
                // 각 객체들을 items 배열에 spread하고 맨 뒤에 새로운 객체를 추가한다
                // name 프로퍼티와 파라미터로 받은 name이 동일하기 때문에 name으로 축약 표현 가능
              });
              this.delAll();
            }
          }}
        >
          Delete All
        </Button>
        {/* FETCH from myDB */}
        <Button
          color="success"
          style={{
            marginBottom: "2rem",
            float: "right"
          }}
          onClick={this.fetchAll}
        >
          FETCH from myDB
        </Button>
        {/* {this.state.items.length === 0 && "FETCH or Add Item"} */}
        {this.state.isFetched ? (
          <ListGroup>
            <TransitionGroup className="shopping-list">
              {items.map(
                ({ userid, content, heading }) =>
                  userid !== "undefined" && (
                    <CSSTransition key={userid} timeout={500} classNames="fade">
                      <ListGroupItem key={userid}>
                        {/* ListGroup => ul ListGroupItem => li */}
                        <Button
                          key={userid}
                          className="remove-btn rounded-circle"
                          color="danger"
                          size="sm"
                          onClick={() => {
                            // this.state.items.forEach(item =>
                            //   console.log(
                            //     "item.id =",
                            //     item.userid,
                            //     "id =",
                            //     userid
                            //   )
                            // );
                            this.setState(state => ({
                              items: state.items.filter(
                                item => item.userid !== userid
                              )
                            }));
                            // map 과정에서 모든 요소들의 key 프로퍼티에 items의 id가 할당되었다
                            // filter iteration에서 state.items의 id와 클릭된 아이템의 id를 비교해서 조건식을 만족하지 못하면 filter한다. iteration 밖에서는 참조할 수 없다
                            this.delItem(userid);
                          }}
                        >
                          &times;
                        </Button>
                        <ListGroupItemHeading>{heading}</ListGroupItemHeading>
                        <ListGroupItemText>
                          {Object.values(content).length === 1 && content}
                        </ListGroupItemText>

                        {/*  (console.log("TEST", Object.values(content).length),
                         typeof content) */}
                        {typeof content !== "string" &&
                          Object.values(content).length > 1 &&
                          Object.values(content).map(t => (
                            <ListGroupItemText>{t}</ListGroupItemText>
                          ))}
                        {/* content는 객체화 되어 있어서 직접 map을 실행할 수 없다 */}
                      </ListGroupItem>
                    </CSSTransition>
                  )
              )}
            </TransitionGroup>
          </ListGroup>
        ) : (
          <p
            style={{
              fontSize: "2.5rem",
              textAlign: "center",
              marginTop: "60px"
            }}
          >
            You may want to Fetch Data from database.
          </p>
        )}
        {/* <div>
          {this.state.items.map(item => (
            <textarea value={this.state.content} onChange={this.onChange} />
          ))}
        </div> */}
      </Container>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.object.isRequired,
  fetchItem: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  items: state.items
});

export default connect(
  mapStatetoProps,
  { fetchItem }
)(ItemList);