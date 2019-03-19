import React, { Component } from "react";
import StickyFooter from 'react-sticky-footer';

export default class Footer extends Component {
		render (){
			return (
				<StickyFooter
					bottomThreshold={50}
					normalStyles={{
						backgroundColor: "#999999",
						padding: "2rem"
					}}
					stickyStyles={{
						backgroundColor: "rgba(255,255,255,.8)",
						padding: "2rem"
					}}
				>
					// Add any footer markup here
				</StickyFooter>
			);
		}
}