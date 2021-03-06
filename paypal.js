import React, {Component} from 'react';
import {View, WebView, ActivityIndicator} from 'react-native';
import axios from 'axios';

export default class Paypal extends Component {
  state = {
    accessToken: null,
    approvalUrl: null,
    paymentId: null
  };

  componentDidMount() {
    const currency = '100 USD';
    currency.replace(' USD', '');

    const dataDetail = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [
        {
          amount: {
            total: currency,
            currency: 'THB',
            details: {
              subtotal: currency,
              tax: '0',
              shipping: '0',
              handling_fee: '0',
              shipping_discount: '0',
              insurance: '0'
            }
          }
        }
      ],
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com'
      }
    };

    axios
      .post(
        'https://api.sandbox.paypal.com/v1/oauth2/token',
        {grant_type: 'client_credentials'},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic QVNvMXkwRkhsTTdBYWdxZXM0MEtTNG1BazlhXy1vUXM5akFYWUxsZkV3VVpxSXF2Z2NjTEtjd3R4ZWgwdTV5WEZ3Sl9DVTZha3RjWWtycE86RUNZTGVEWHRsM1MzUXdsSlJ5OFlvZG5vZGloV3NJU2tySHIwdlpDNWlyVzlFcEl2YnZyRlZEcmlTTEV6cFgxaHU3WkVjdVZZdk1XNEhrbHc=' // Your authorization value
          }
        }
      )
      .then(response => {
        this.setState({
          accessToken: response.data.access_token
        });

        axios
          .post('https://api.sandbox.paypal.com/v1/payments/payment', dataDetail, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.state.accessToken}`
            }
          })
          .then(response => {
            const {id, links} = response.data;
            const approvalUrl = links.find(data => data.rel === 'approval_url');

            this.setState({
              paymentId: id,
              approvalUrl: approvalUrl.href
            });
          })
          .catch(err => {
            console.log({...err});
          });
      })
      .catch(err => {
        console.log({...err});
      });
  }

  _onNavigationStateChange = webViewState => {
    if (webViewState.url.includes('https://example.com/')) {
      this.setState({
        approvalUrl: null
      });

      const {PayerID, paymentId} = webViewState.url;

      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {payer_id: PayerID},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.state.accessToken}`
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log({...err});
        });
    }
  };

  render() {
    const {approvalUrl} = this.state;
    return (
      <View style={{flex: 1}}>
        {approvalUrl ? (
          <WebView
            style={{height: 400, width: 300}}
            source={{uri: approvalUrl}}
            onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState={false}
            style={{marginTop: 20}}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}
