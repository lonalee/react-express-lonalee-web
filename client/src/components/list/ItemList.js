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
      items: [
        {
          userid: uuid(),
          content: [],
          heading: "",
          isChecked: false,
          isUpdated: false
        }
      ],
      content: "", // input value를 위한 임시 프로퍼티
      isFetched: false,
      checkedNow: false,
      update: ""
    };
  }

  componentDidMount() {
    console.log("this.props", this.props);
    this.setState({
      isFetched: this.props.items.isFetched,
      items: this.props.items.fetchedData
    });
    console.log("componentDidMount", this.state);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      console.log("nextProps", nextProps.items.fetchedData);
      this.setState({
        isFetched: nextProps.items.isFetched,
        items: [...nextProps.items.fetchedData]
      });
      console.log("componentWillReceiveProps", this.state);
    }
    if (nextProps.items.isAdded) {
      console.log("is_Added", nextProps);
      this.setState({
        items: [nextProps.items.addedData, ...this.state.items]
      });
      nextProps.items.addedData = "";
    }
  }

  // When FETCH button clicked
  fetchAll = () => {
    this.props.fetchItem();
    // fetchItem();
    console.log(this.props);
    console.log("fetchAll", this.state);
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
      this.props.postItem(newItem);
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
  update = e => {
    // console.dir(e.target);
    console.log("value", e.target.value);

    this.setState({ update: e.target.value });
    console.log("update", this.state.update);
    // e.target.value = this.state.update;
  };
  chkBtn(e) {
    console.log("e.target.id", e.target.id);
    this.props.items.fetchedData = this.props.items.fetchedData.map(item => {
      return e.target.id === item.userid
        ? { ...item, isChecked: !item.isChecked }
        : item;
      // if (e.target.id === item.userid) {
      //   return { ...item, isChecked: !item.isChecked };
      // } else if (e.target.id !== item.userid) {
      //   return item;
      // }
    });

    this.setState(state => ({
      checkedNow: !state.checkedNow,
      items: this.props.items.fetchedData
    }));
    console.log("checked", this.state);
  }

  updateItem(e) {
    // console.log("before", this.props.items.fetchedData.isUpdated);
    this.props.items.fetchedData = this.props.items.fetchedData.map(item => {
      return e.target.id === item.userid
        ? { ...item, isUpdated: !item.isUpdated }
        : item;
      // if (e.target.id === item.userid) {
      //   return { ...item, isChecked: !item.isChecked };
      // } else if (e.target.id !== item.userid) {
      //   return item;
      // }
    });
    // console.log("after", this.props.items.fetchedData.isUpdated);
    let letContent = this.props.items.fetchedData.filter(
      item => e.target.id === item.userid
    );
    console.log("type", typeof letContent, letContent);

    this.setState(state => ({
      items: this.props.items.fetchedData,
      update: letContent[0].content
    }));
    console.log("content -> update property", this.state);
  }
  render() {
    const { items } = this.state; // 객체 deStructuring
    console.log("when rendering", items);
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
            if (yes) {
              this.setState({
                items: [{ id: uuid(), name: "***Example***" }]
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
        {this.props.items.isFetched ? (
          <ListGroup>
            <TransitionGroup className="shopping-list">
              {items.map(
                ({ userid, content, heading, isChecked, isUpdated }) =>
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
                        <div
                          className="radio-box"
                          style={{
                            position: "relative"
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              width: "15px",
                              height: "15px",
                              border: "1px solid darkgoldenrod",
                              zIndex: "2"
                            }}
                            onClick={this.chkBtn.bind(this)}
                            id={userid}
                          />
                          <label htmlFor="cb1" />
                          {/* 해당 구문은 논리비교 조건식으로 만들어서 클릭되면 해당 엘리먼트를 렌더링하게 한다,
                          클릭된 요소만   */}
                          {isChecked && (
                            <ion-icon
                              for="cb1"
                              name="md-checkmark"
                              style={{
                                position: "absolute",
                                top: "0",
                                zIndex: "1"
                              }}
                            />
                          )}
                        </div>
                        <ListGroupItemHeading>{heading}</ListGroupItemHeading>
                        <ListGroupItemText>
                          {Object.values(content).length === 1 && content}
                        </ListGroupItemText>
                        {typeof content !== "string" &&
                          Object.values(content).length > 1 &&
                          Object.values(content).map(t => (
                            <ListGroupItemText>{t}</ListGroupItemText>
                          ))}
                        {/* content는 객체화 되어 있어서 직접 map을 실행할 수 없다 */}
                        <button
                          id={userid}
                          onClick={this.updateItem.bind(this)}
                        >
                          UPDATE
                        </button>
                        {/* {console.log("isUpdated", isUpdated)} */}
                        {isUpdated && (
                          <div>
                            <input
                              value={this.state.update}
                              onChange={this.update}
                            />
                          </div>
                        )}
                        {/* {console.log(
                          "Object.values",
                          typeof Object.values(content).join()
                        )}
                        {console.log(content)} */}
                        {/* {!isUpdated && (
                          <input
                            type="text"
                            value={Object.values(content).join()}
                            onChange={this.update}
                          />
                        )} */}
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
  fetchItem: PropTypes.func.isRequired,
  postItem: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  items: state.items
});

export default connect(
  mapStatetoProps,
  { fetchItem, postItem }
)(ItemList);
