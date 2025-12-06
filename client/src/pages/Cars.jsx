import React, { useCallback, useEffect, useState } from 'react'
import Title from '../components/Title'
import {assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import {useAppContext} from '../../context'
import {toast} from 'react-hot-toast'



const Cars = () => {

  //Getting search params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  // const returnLocation = searchParams.get('returnLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars, axios} = useAppContext()


  const [input, setInput] = useState('')

  const isSearchData = pickupLocation && pickupDate && returnDate

  const [baseCars, setBaseCars] = useState(cars)
  const [filteredCars, setFilteredCars] = useState(cars)

  const applyFilter = useCallback(()=>{
    if(input === ''){
      setFilteredCars(baseCars)
      return null
    }

    const filterd = baseCars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase()) 
      || car.model.toLowerCase().includes(input.toLowerCase()) 
      || car.category.toLowerCase().includes(input.toLowerCase()) 
      //  || car.fuel_type.toLowerCase().includes(input.toLowerCase()) 
      || car.transmission.toLowerCase().includes(input.toLowerCase()) 
    })
    setFilteredCars(filterd)
  }, [baseCars, input])

  const searchCarAvailability = useCallback(async()=>{
    const params = new URLSearchParams({
      location: pickupLocation,
      pickupDate,
      returnDate,
    });
    const {data} = await axios.get(`/api/user/cars?${params.toString()}`)
    if(data.success){
      setBaseCars(data.cars)
      setFilteredCars(data.cars)
      if(data.cars.length === 0){
        toast('No Cars Available')
      }
    }
  }, [axios, pickupLocation, pickupDate, returnDate])

  useEffect(()=>{
    if (isSearchData) {
      searchCarAvailability()
    }
  }, [isSearchData, searchCarAvailability]);

  useEffect(() => {
    // This effect handles both initial render and text filtering.
    if (!isSearchData) {
      setBaseCars(cars);
    }
    applyFilter();
  }, [input, baseCars, applyFilter, cars, isSearchData]);



  return (
    <div>

      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subTitle='Browse our selection of premium vehicles for your next adventure'/>

        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>

          <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>

          <input onChange={(e)=> setInput(e.target.value)} value={input} type='text' placeholder='Search by make, model or features' className='w-full h-full outline-none text-gray-500'/>

          <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>

        </div>
      </div>


      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index)=>(
            <div key={index}>
              <CarCard car={car}/>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Cars