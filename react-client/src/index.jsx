import React from 'react';
import ReactDOM from 'react-dom';
import SocialShare from './components/SocialShare.jsx';
import Specs from './components/Specs.jsx';
import Shipping from './components/Shipping.jsx';
import '../dist/styles.css'
// import Gallery from './components/Gallery.jsx';

import styled from 'styled-components';
import axios from 'axios'


const H2 = styled.h2`
  font-family: gordita,Helvetica,Arial,Verdana,sans-serif;
  font-size: 10px;
  font-weight: 550;
  line-height: inherit;
  color: #042b28;
  margin-bottom: 20px;
  max-width: none!important;
  margin: 0 0 16px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  display: block;
`

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      socialShareIcon: ['https://png.icons8.com/color/2x/facebook.png',
                        'https://png.icons8.com/color/2x/twitter-squared.png',
                        'https://png.icons8.com/color/2x/secured-letter.png',
                        'https://png.icons8.com/windows/2x/copy-link.png'
                      ],
      socialShareLink: [ 'https://twitter.com/intent/tweet?url=http%3A%2F%2Fdro.ps%2Fb%2FAe94eO7AQm5O%2Ft&text=Get%20%2410%20off%20your%20first%20purchase%20on%20Massdrop.%20Sign%20up%20and%20check%20out%20the%20%22Massdrop%20CTRL%20High-Profile%20Mechanical%20Ke...%22%3A&original_referer=https%3A%2F%2Ftwitter.com%2Fshare%3Furl%3Dhttp%253A%252F%252Fdro.ps%252Fb%252FAe94eO7AQm5O%252Ft%26text%3DGet%2520%252410%2520off%2520your%2520first%2520purchase%2520on%2520Massdrop.%2520Sign%2520up%2520and%2520check%2520out%2520the%2520%2522Massdrop%2520CTRL%2520High-Profile%2520Mechanical%2520Ke...%2522%253A',
                         'https://www.facebook.com/v2.9/dialog/share?app_id=142386762546138&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2F__Bz3h5RzMx.js%3Fversion%3D42%23cb%3Dfb2994efa4d47%26domain%3Dwww.massdrop.com%26origin%3Dhttps%253A%252F%252Fwww.massdrop.com%252Ff3f88d7eeee8d64%26relation%3Dopener&display=popup&e2e=%7B%7D&fallback_redirect_uri=https%3A%2F%2Fwww.massdrop.com%2Fbuy%2Fmassdrop-ctrl-high-profile-mechanical-keyboard&href=https%3A%2F%2Fwww.massdrop.com%2Fbuy%2Fmassdrop-ctrl-high-profile-mechanical-keyboard%3Freferer%3DBKMU4J%26utm_source%3Dfbshare%26s%3Dfb&locale=en_US&mobile_iframe=false&next=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2F__Bz3h5RzMx.js%3Fversion%3D42%23cb%3Df208862e79761e4%26domain%3Dwww.massdrop.com%26origin%3Dhttps%253A%252F%252Fwww.massdrop.com%252Ff3f88d7eeee8d64%26relation%3Dopener%26frame%3Df1c9c7f3733784%26result%3D%2522xxRESULTTOKENxx%2522&sdk=joey&version=v2.9' 

      ],
      description:[],
      shippingDate:'Nov 27, 2018 PT',
      specs:[],
      prod_name: 'flashlight' || window.location.pathname.slice(5),
      included: [],
      boxContent: [],
      descriptionHeader: [],
      imageHeader: [],
      images: [],
      details: [],
      html: ''
    }
    this.getProductData = this.getProductData.bind(this);
    this.getOverviewData = this.getOverviewData.bind(this);
    this.convertToDangerously = this.convertToDangerously.bind(this);
    this.findAndReplaceImage = this.findAndReplaceImage.bind(this);
  }


  componentDidMount() {
    var name = window.location.pathname.slice(5);
    if(name.length != 0) {
      this.setState({
          prod_name: name
        },
        () => this.getProductData(this.state.prod_name)
      );

    } else this.getProductData(this.state.prod_name);

  }

  getProductData(prod_name) {
    axios.get(`/buy/${prod_name}/overview`)
      .then(({data}) => {
          this.setState({
            specs: data[0].specs,
            included: data[0].included,
            boxContent: data[0].boxContent,
            descriptionHeader: data[0].descriptionHeader,
            description: data[0].description,
            imageHeader: data[0].imageHeader,
            images: data[0].images,
            shippingDate: data[0].shippingDate,
            details: data[0].details,
            prod_name: data[0].prod_name,
            html: data[0].html
          })
      })
      // .then((result) => {
      //   this.findAndReplaceImage();
      // })
      .then(() => {
        return null;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  findAndReplaceImage() {
    var htmlCopy = this.state.html;
    var i = 0;
    var index = 0 ;
    // while(index <= htmlCopy.length) {
      index = htmlCopy.indexOf("src", index);
      index += 4;
      String.prototype.splice = function(idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      htmlCopy = htmlCopy.splice(index, 0, this.state.images[i]);
      i++;
    // }
    this.setState({
      html: htmlCopy
    })

  }

  getOverviewData(prod_name) {
    axios.get(`/buy/${prod_name}/html`)
      .then(({data}) => {
        // console.log(response.data[0].html);
        this.setState({
          html: data[0].html
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  convertToDangerously(prod_name) {
    return {__html: this.state.html};
  }

  render () {
    return (
      <div>
          <div className="referral__share_button"><a href="https://www.w3schools.com/html/">SHARE: GIVE $10, GET $10</a>
            <section>
              <SocialShare onLoad={() => {this.getProductData(this.state.prod_name)}} icons={this.state.socialShareIcon}/>
            </section>
          </div>
        <div dangerouslySetInnerHTML={this.convertToDangerously()}/>
        <section>
          <H2>Specs</H2>
          <Specs specification={this.state.specs}></Specs>
        </section>
        <section>
          <H2>Included</H2>
          <Specs specification={this.state.included}></Specs>
        </section>
        <section>
          <H2>Shipping</H2>
          <Shipping estimatedDate={this.state.estimatedDate}></Shipping>
        </section>
      </div>
    )
  }
}
window.App = App
// ReactDOM.render(<App />, document.getElementById('app'));