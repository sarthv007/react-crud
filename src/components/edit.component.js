import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      person_name: '',
      business_name: '',
      business_gst_number:'',
      errorsmsg: '',
      msg: 0,
      success:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost/react/crudreact/api/edit.php',{
      params: {
        id: +this.props.match.params.id
      }
    })
          .then(response => {
              this.setState({ 
                person_name: response.data.person_name, 
                business_name: response.data.business_name,
                business_gst_number: response.data.business_gst_number });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      person_name: this.state.person_name,
      business_name: this.state.business_name,
      business_gst_number: this.state.business_gst_number
    };

    axios({
            method: 'POST',
            url: 'http://localhost/react/crudreact/api/update.php?id='+this.props.match.params.id,
            data: obj,
            transformRequest: [
            function(data, headers) {
              const serializedData = []
            for (const k in data) {
                if (data[k]) {
                  serializedData.push(`${k}=${encodeURIComponent(data[k])}`)
                }
              }

              return serializedData.join('&')
            }
          ],
        })
    .then(function (response) {
            console.log(response.data)
            if(response.data.count === 1){
               for(var x in response.data.errors){
                   document.getElementById(x).innerHTML=response.data.errors[x]
               } 
                
            }else{
                this.setState({
                  msg:1,
                  success:response.data.message
                });
                this.props.history.push('/index')
                
            }

            

        }.bind(this))
    
    //this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
          { this.state.msg ? <div id="success" className="alert alert-success">
              {this.state.success}
            </div>:''
            }
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Person Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.person_name}
                      onChange={this.onChangePersonName}
                      />
                      <div className="error" id="person_name"></div>
                </div>
                <div className="form-group">
                    <label>Business Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_name}
                      onChange={this.onChangeBusinessName}
                      />
                      <div className="error" id="business_name"></div>
                </div>
                <div className="form-group">
                    <label>GST Number: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_gst_number}
                      onChange={this.onChangeGstNumber}
                      />
                      <div className="error" id="business_gst_number"></div>
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}