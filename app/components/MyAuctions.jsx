import React, {Component} from 'react';
import Listing from './Listing.jsx';

export default class MyAuctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsForSale: []
    };
  }

  componentDidMount() { // Retrieve user data form, show items seller items on dashboard page
    var context = this;
    $.ajax({
      method: 'GET',
      url: 'api/user_data',
      success: function(user) {
        console.log('MyAuctions username:', user.user.firstName + ' ' + user.user.lastName);
        $.ajax({
          method: 'POST',
          url: 'api/selleritems',
          headers: {'Content-Type': 'application/json'},
          data: JSON.stringify(user),
          success: function(auctionItems) {
            context.setState({'itemsForSale': auctionItems});
            console.log('itemsForSale:', auctionItems);
            context.render();
          },
          error: function(err) {
            console.log(err);
          }
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="col-sm-12 bid-container">
        {this.state.itemsForSale.map((saleItem, index) => {
          return (
            <Listing
              old={true} key={index} parity={index % 2} status={'forsale'}
              auctionEnded={new Date() >= saleItem.auctionEndDateByHighestBid}
              item={saleItem}
              auth={this.props.auth} // NOT WORKING!!!
            />
          );
        }) }
        </div>
      </div>
    );
  }
}