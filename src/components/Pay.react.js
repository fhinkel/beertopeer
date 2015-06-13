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

var currencyItems = [
    { payload: '1', text: 'EUR' },
    { payload: '2', text: 'USD' }
];

var Pay = React.createClass({
    getInitialState: function() {
        return {selectedCurrency: currencyItems[0].text};
    },

    onChange: function(event) {
        this.setState({selectedCurrency: event.target.textContent});
    },

    onClickPayButton: function() {
        RippleService.pay(this.refs.amountField.getValue(), this.state.selectedCurrency);
    },

    render: function() {
        return (
            <div>
                <h1>Contribute to event {this.props.eventname}</h1>
                <p>This event has been created by {this.props.creator}. The total requested amount is
                    {this.props.totalamount} {this.props.currency} of which
                    {this.props.openamount} {this.props.currency} are still open</p>
                <table>
                    <tr>
                        <td><TextField ref="amountField" defaultValue="0,00"/></td>
                        <td><DropDownMenu ref="currencyChoice" menuItems={currencyItems} onChange={this.onChange}/></td>
                    </tr>
                </table>
                <RaisedButton label="Pay!" primary={true} onClick={this.onClickPayButton}/>
            </div>
        );
    }
});

module.exports = Pay;
