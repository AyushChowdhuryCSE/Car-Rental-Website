import Booking from "../models/Booking.js"
import Car from '../models/Car.js';

// Function to check availability of car for a given date
export const checkAvailability = async (carId, pickupDate, returnDate) => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const bookings = await Booking.find({
        car: carId,
        status: { $in: ['pending', 'confirmed'] }, // Only check against active bookings
        $or: [
            // Case 1: New booking is completely inside an existing booking
            { pickupDate: { $lte: start }, returnDate: { $gte: end } },
            // Case 2: New booking completely contains an existing booking
            { pickupDate: { $gte: start }, returnDate: { $lte: end } },
            // Case 3: New booking overlaps with the start of an existing booking
            { pickupDate: { $lte: start }, returnDate: { $gt: start } },
            // Case 4: New booking overlaps with the end of an existing booking
            { pickupDate: { $lt: end }, returnDate: { $gte: end } },
        ],
    });
    return bookings.length === 0;  //if the length is greater than 0 than means we have some booking for the car and the car is not available so here we returned false and when we don't have any booking in this date range it will return true that means tha car is available
}

//API to Create Booking
export const createBooking = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {car, pickupDate, returnDate} = req.body;

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)
        if(!isAvailable){
            return res.json({success: false, message: "Car is not available"})
        }

        const carData = await Car.findById(car)

        //Calculate price based on pickupDate and returnDate
        const picked= new Date(pickupDate);
        const returned = new Date(returnDate);
        const timeDifference = returned.getTime() - picked.getTime();
        const noOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1; // +1 to include the pickup day
        const price = carData.pricePerDay * (noOfDays <= 0 ? 1 : noOfDays); // Ensure at least 1 day is charged

        await Booking.create({car, owner:carData.owner, user:_id, pickupDate, returnDate, price})

        res.json({success: true, message: "Booking Created"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }
}


//API to List User Bookings
export const getUserBookings = async (req, res)=>{
    try {
        const {_id} = req.user;
        let bookings = await Booking.find({user: _id}).populate("car").sort({createdAt: -1})

        // Filter out bookings where the associated car has been deleted
        bookings = bookings.filter(booking => booking.car !== null);

        res.json({success: true, bookings })

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


//API to get owner bookings
export const getOwnerBookings = async (req, res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({success: false, message: "Unauthorized"})
        }
        let bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt:-1})

        // Filter out bookings where the associated car has been deleted
        bookings = bookings.filter(booking => booking.car !== null);

        res.json({success: true, bookings})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


// API to change the booking status
export const changeBookingStatus = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized"})
        }

        booking.status = status;
        await booking.save();

        res.json({success: true, message:"Status Updated"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}