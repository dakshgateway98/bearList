import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import axios from "axios";
import ReadMoreAndLess from "react-read-more-less";
import ReactPaginate from "react-paginate";
import BearCardList from "./BearCardList";
import { CircularProgress } from '@material-ui/core';
class ListBear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfBears: [],
      bearErr:"",
      Images: [],
      imageLoading: true,
      loading: true,
      error: "",
      offset: 0,
      data: [],
      perPage: 20,
      currentPage: 0,
      search: "",
    };
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };
  receivedData = () => {
    axios
      .get(
        `https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json`
      )
      .then(async (res) => {
        var json = res.data;
        const data = json.filter((item)=>{
          return item.name.indexOf(this.state.search) > -1
      })
        const listOfBears = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
       

        await this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          listOfBears,
        });
        
        this.setState({
          loading: false,
        });

        
      })
      
      .catch((err) => {
        this.setState({
          bearErr:err
        })
        console.error(err);
      });
      
      this.state.listOfBears.sort((a, b) =>
      a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0
    );
  };

  componentDidMount() {
    this.receivedData();
    // axios
    //   .get(
    //     `https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json`
    //   )
    //   .then(async (res) => {
    //     const listOfBears = res.data;
    //     console.log(listOfBears.slice());
    //     await this.setState({ listOfBears });
    //     this.setState({
    //       loading: false,
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    axios
      .get(
        `https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json`
      )
      .then(async (res) => {
        const Images = res.data;
        console.log(Images);
        await this.setState({ Images });
        this.setState({
          imageLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          error:err
        })
        console.error(err);
      });
  }

  //   handleSilce = (body) => {
  //       const final = ""
  // body.map((line, index) => return final )
  //   }

  render() {
    const {
      listOfBears,
      loading,
      error,
      imageLoading,
      Images,
      search,
      bearErr
    } = this.state;
    if (loading || imageLoading) {
      return(<CircularProgress style={{ textAlign:'center'}} />);
    } else if (error !== "" || bearErr !== "") {
      return <div>{error}</div>;
    } else {
      return (
        <div className="content">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h5 className="mr-2 mt-1" style={{ display:'flex' }}>Enter Brand Name :</h5>
              <input
                onChange={async (e) => {
                 await this.setState({
                    search: e.target.value,
                  });
                  this.receivedData();
                }}
                type="text"
                style={{
                  width: "47%",
                  display: "flex",
                  justifyContent: "center",
                }}
                value={search}
              />
            </div>
            <div className="d-flex row " style={{ justifyContent: "center" }}>
              <BearCardList ListOfImage={Images} ListOfBear={listOfBears} />
            </div>
            <ReactPaginate
              previousLabel={"PREV"}
              nextLabel={"NEXT"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      );
    }
  }
}
export default ListBear;
