import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {
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

  onSubmit(e){

    e.preventDefault();
    const apiurl='http://localhost/react/crudreact/api/crud.php';
      
     axios({
            method: 'POST',
            url: apiurl,
            data: this.state,
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
            //console.log(response.data.business_gst_number)
            if(response.data.error === 1){
               for(var x in response.data){
                  document.getElementById(x).innerHTML=response.data[x]
               } 
                
            }else{
                this.setState({
                  msg:1,
                  success:response.data.message,
                  person_name: '',
                  business_name: '',
                  business_gst_number:''
                })  
            }

            

        }.bind(this))
        .catch(function (response) {
            //handle error
            //console.log(response)
        });
    
    
  }
 
  render() {

    return (
        <div style={{ marginTop: 10 }}>
            
            { this.state.msg ? <div id="success" className="alert alert-success">
              {this.state.success}
            </div>:''
            }

            <h3>Add New Business</h3>
            
            <form onSubmit={this.onSubmit} method="post" id="frm_create">
                <div className="form-group">
                    <label>Person Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.person_name}
                      onChange={this.onChangePersonName}
                      required />
                      <div className="error" id="person_name"></div>
                </div>
                <div className="form-group">
                    <label>Business Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_name}
                      onChange={this.onChangeBusinessName}
                      required/>
                      <div className="error" id="business_name"></div>
                </div>
                <div className="form-group">
                    <label>GST Number: </label>
                    <input type="number" 
                      className="form-control"
                      value={this.state.business_gst_number}
                      onChange={this.onChangeGstNumber}
                      required/>
                      <div className="error" id="business_gst_number"></div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Register Business" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}
export default Create