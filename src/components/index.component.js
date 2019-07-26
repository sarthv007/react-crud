import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

   constructor(props) {
      super(props);
      this.state = {business: []};
    }
    componentDidMount(){
      axios.get('http://localhost/react/crudreact/api/list.php')
        .then(response => {

          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    render() {
      return (
        <div className="alert alert-success">
          <h3 align="center">Business List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Person</th>
                <th>Business</th>
                <th>GST Number</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.state.business.map(buss=>(<TableRow obj={buss}/>
                ))
              }
            </tbody>
          </table>
        </div>
      );
    }
  }