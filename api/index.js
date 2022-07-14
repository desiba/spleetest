const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 3009;
const moment = require('moment')

function getObjectKey(obj, value) {
    return Object.keys(obj).find((key) => obj[key] === value);
}

const roomRateData = {
    regular: {
        week: 7,
        weekend: 10
    },
    deluxe: {
        week: 8.5,
        weekend: 12
    },
    palatial: {
        week: 11,
        weekend: 16
    } 
}

const reservationData = {
    12000: {
        room_type: 'deluxe',
        customer_id: 12323,
        amount_paid: 230000,
        status: 'paid',
        checking_time: '2020-12-12 12:00',
        checkout_time: '2021-01-01 11:00'
    },

    12001: {
        room_type: 'deluxe',
        customer_id: 12323,
        amount_paid: 230000,
        status: 'paid',
        checking_time: '2020-12-12 12:00',
        checkout_time: '2021-01-01 11:00'
    },
    12002: {
        room_type: 'deluxe',
        customer_id: 12323,
        amount_paid: 230000,
        status: 'paid',
        checking_time: '2020-12-12 12:00',
        checkout_time: '2021-01-01 11:00'
    },
    12003: {
        room_type: 'regular',
        customer_id: 12323,
        amount_paid: 200000,
        status: 'paid',
        checking_time: '2020-12-25 12:00',
        checkout_time: '2021-01-04 11:00'
    }
}


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/api/v1/hotel/:reserv_no', async (req, res) => {

    try{

    const { reserv_no } = req.params;

    const data = Object.keys(reservationData).find((key) => key == reserv_no);

    const bookData = reservationData[data];

    if(bookData == null){
        throw new Error("reservation number does not exist")
    }

    const { checking_time, checkout_time, room_type, amount_paid } = bookData;

    const checkIn = moment(checking_time);
    const checkOut = moment(checkout_time); 
    const duration = moment.duration(checkOut.diff(checkIn));
    const hours = duration.asHours();
    const days = duration.asDays();

    const extraHours = hours % 24;

    const endDate = new Date(checkout_time);

    let weekType = null;

    if(!(endDate.getDay() % 6)){
        weekType = 'weekend'
    }else{
        weekType = 'week'
    }

    let daysPaid = Math.floor(hours/24);

    let roomRatePercentage = 0;

    const roomTypeData = Object.keys(roomRateData).find((key) => key == room_type);

    const { week, weekend } = roomRateData[roomTypeData]

    if(weekType == 'week'){
        roomRatePercentage = week;
    }

    if(weekType == 'weekend'){
        roomRatePercentage = weekend;
    }

    let overdueFees = extraHours * roomRatePercentage

    let result = {
        code: "00", 
        message: "Spleet Interview Test",
        data: {
            overdue_fees_percentage: overdueFees
        }
    }
    return res.json(result);
    }catch(e){
        res.status(500).send({message: e.message})
    }
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});