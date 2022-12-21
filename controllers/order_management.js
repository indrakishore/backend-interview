const order = require("../model/order");
const service = require("../model/service");

const addOrders = (req, res) => {
	try{
		let reqBody = req.body;
		console.log("Request Recieved:", reqBody)
		if( 'totalFee' in reqBody && 'serviceName' in reqBody){
			let currentDate = new Date()
			let threeHoursBackTime = new Date( new Date().setUTCHours( currentDate.getUTCHours() -3 ))
			console.log(" currentDate: ", currentDate, "threeHoursBackTime", threeHoursBackTime)
			let queryObj = {
				'dateTime': {$gt: threeHoursBackTime}
			}
			order.find(queryObj).then( orderList => {
				console.log("order list: ", orderList)
				if( orderList && orderList.length > 0){
					console.log("order exist in three hours interval.")
					return res.status(400).json({status: 0, message: " cannot place order, order exist in three hours interval."})
				} else {
					let serviceObj = {
						'serviceName': reqBody['serviceName']
					}
					service.findOne(serviceObj).then( serviceDetails => {
						if( serviceDetails ){
							let orderObj = new order({
								'dateTime': new Date(),
								'totalFee': reqBody['totalFee'],
								'services': {$push: {"id": serviceDetails['_id']}}
							})
							orderObj.save().then( doc => {
								console.log("order Successsfully saved!!!")
								return res.status(200).json({status: 0, message: "order added successsfully."})
							}).catch( err => {
								console.log(" Error in saving order details:", err)
							return res.status(400).json({status: 0, message: " Error in saving order details"})
							})
						} else {
							console.log(" service not exist.")
							return res.status(400).json({status: 0, message: "Requested service not exist."})
						}
					}).catch( err => {
						console.log(" Error in fetching service details: ", err)
						return res.status(400).json({status: 0, message: " Error in fetching service details."})
					})
				}
			}).catch( err => {
				console.log(" Error in fetching order details: ", err)
				return res.status(400).json({status: 0, message: " Error in fetching order details."})
			})
		} else {
			console.log(" Required parameters are missing.")
			return res.status(400).json({status: 0, message: " Required parameters are missing."})
		}
	} catch( err ){
		console.log("Error in adding order: ", err)
		return res.status(400).json({status: 0, message: "Error in adding order."})
	}
}

module.exports = {
	addOrders
}