/**
 * Created by kknauf on 16.06.15.
 */
'use strict';

var React = require('react');

var Footer = React.createClass({

    render: function () {

        var style = {
            position: "absolute",
            bottom: "0px",
            width: "100%",
            fontSize: "60%",
            color: "#757575"
        };

        return (
	    <div style={style}>
                <span style={{textAlign: "center"}}><p>BlitzPay by <a href="http://www.tngtech.com/en/company-and-contact-information.html"> TNG Technology Consulting</a></p></span>
            </div>);
    }
});

module.exports = Footer;
