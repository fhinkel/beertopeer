/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var DropDownMenu = mui.DropDownMenu;
var RippleService = require('../services/RippleService');



// HARDCODED VALUES TO BE REPLACED (START)
var eventPin = 1234; // to be passed as property
var currency = 'EUR'; // to be read from backend
var totalAmount = 23.45; // to be read from backend
var openAmount = 17.23; // to be read from backend
var eventCreator = 'Dieter'; // to be read from backend
var eventName = 'Pizza'; // to be read from backend
var targetRippleAccountId = 'rE6pwrUq1RYoAgYPWv4SDwzh4DGrpdaqJW'; // (Dieter) to be read from backend
// HARDCODED VALUES TO BE REPLACED (END)



var Pay = React.createClass({

    onClickPayButton: function() {
        var amountAsFloat = parseFloat(this.refs.amountField.getValue().replace(',','.'));
        RippleService.pay(amountAsFloat, currency, targetRippleAccountId);
    },

    render: function() {
        return (
            <div>
                <h1>Contribute to event {this.props.eventname}</h1>
                <p>This event has been created by {eventCreator}. The total requested amount is {totalAmount} {currency} of which {openAmount} {currency} are still open</p>
                <table>
                    <tr>
                        <td><TextField ref="amountField" defaultValue="0,00"/></td>
                        <td>{currency}</td>
                    </tr>
                </table>
                <RaisedButton label="Pay!" primary={true} onClick={this.onClickPayButton}/>
            </div>
        );
    }
});

module.exports = Pay;
