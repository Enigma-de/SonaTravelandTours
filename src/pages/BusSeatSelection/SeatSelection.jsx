// /home/ubuntu/app/niki_s_application/src/pages/BusSeatSelection/index.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/common/BookingStepComponents/ProgressBar';
import BusDetail from '../../components/common/BookingStepComponents/BusDetail';
import Card from './ComponentSeatSelection/CardSeatSelection';

const SeatSelection = () => {
  const location = useLocation();
  const { busId } = useParams();
  const navigate = useNavigate();
  const busData = location.state?.bus || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);
  const [seatConfig, setSeatConfig] = useState({});
  const steps = ['Seat Details', 'Passenger Details', 'Payment'];
  const currentStep = 1;
  const seatPrice = 2000; // Price per seat in Rs.

  // Generate dynamic booked seats based on bus ID
  const generateBookedSeats = (busId) => {
    // Create a predictable but different pattern for each bus
    const seed = busId ? parseInt(busId.toString().replace(/\D/g, '')) || 1 : 1;
    const bookedSeats = [];
    
    // Generate booked seats based on bus ID
    const totalSeats = 32; // Total seats in the bus
    const bookedCount = Math.floor((seed % 8) + 3); // Between 3-10 booked seats
    
    const allSeatIds = [
      'S4', 'B2', 'B4', 'B6', 'B8', 'B10', 'B12', 'B14', 'B16', 'B18',
      'S3', 'B1', 'B3', 'B5', 'B7', 'B9', 'B11', 'B13', 'B15', 'B17',
      'S2', 'A19', 'S1', 'A2', 'A4', 'A6', 'A8', 'A10', 'A12', 'A14', 'A16',
      'A1', 'A3', 'A5', 'A7', 'A9', 'A11', 'A13', 'A15'
    ];
    
    // Select seats to book based on bus ID
    for (let i = 0; i < bookedCount; i++) {
      const index = (seed * (i + 1)) % allSeatIds.length;
      if (!bookedSeats.includes(allSeatIds[index])) {
        bookedSeats.push(allSeatIds[index]);
      }
    }
    
    return bookedSeats;
  };
  // Generate seat configuration based on bus data
  useEffect(() => {
    console.log('Bus data received:', busData);
    console.log('Bus ID from params:', busId);
    
    const bookedSeats = generateBookedSeats(busId);
    console.log('Generated booked seats for bus', busId, ':', bookedSeats);    // Professional seat layout with improved spacing and alignment
    const config = {
      // Row 1 - Upper deck front row (better spacing: 50px between seats)
      row1: [
        { id: 'S4', type: bookedSeats.includes('S4') ? 'booked' : 'available', position: { x: 50, y: 50 } },
        { id: 'B2', type: bookedSeats.includes('B2') ? 'booked' : 'available', position: { x: 150, y: 50 } },
        { id: 'B4', type: bookedSeats.includes('B4') ? 'booked' : 'available', position: { x: 200, y: 50 } },
        { id: 'B6', type: bookedSeats.includes('B6') ? 'booked' : 'available', position: { x: 280, y: 50 } },
        { id: 'B8', type: bookedSeats.includes('B8') ? 'booked' : 'available', position: { x: 330, y: 50 } },
        { id: 'B10', type: bookedSeats.includes('B10') ? 'booked' : 'available', position: { x: 410, y: 50 } },
        { id: 'B12', type: bookedSeats.includes('B12') ? 'booked' : 'available', position: { x: 460, y: 50 } },
        { id: 'B14', type: bookedSeats.includes('B14') ? 'booked' : 'available', position: { x: 540, y: 50 } },
        { id: 'B16', type: bookedSeats.includes('B16') ? 'booked' : 'available', position: { x: 590, y: 50 } },
        { id: 'B18', type: bookedSeats.includes('B18') ? 'booked' : 'available', position: { x: 670, y: 50 } },
      ],
      // Row 2 - Upper deck back row (consistent spacing)
      row2: [
        { id: 'S3', type: bookedSeats.includes('S3') ? 'booked' : 'available', position: { x: 50, y: 100 } },
        { id: 'B1', type: bookedSeats.includes('B1') ? 'booked' : 'available', position: { x: 150, y: 100 } },
        { id: 'B3', type: bookedSeats.includes('B3') ? 'booked' : 'available', position: { x: 200, y: 100 } },
        { id: 'B5', type: bookedSeats.includes('B5') ? 'booked' : 'available', position: { x: 280, y: 100 } },
        { id: 'B7', type: bookedSeats.includes('B7') ? 'booked' : 'available', position: { x: 330, y: 100 } },
        { id: 'B9', type: bookedSeats.includes('B9') ? 'booked' : 'available', position: { x: 410, y: 100 } },
        { id: 'B11', type: bookedSeats.includes('B11') ? 'booked' : 'available', position: { x: 460, y: 100 } },
        { id: 'B13', type: bookedSeats.includes('B13') ? 'booked' : 'available', position: { x: 540, y: 100 } },
        { id: 'B15', type: bookedSeats.includes('B15') ? 'booked' : 'available', position: { x: 590, y: 100 } },
        { id: 'B17', type: bookedSeats.includes('B17') ? 'booked' : 'available', position: { x: 670, y: 100 } },
      ],
      // Row 3 - Middle section (aisle space)
      row3: [
        { id: 'S2', type: bookedSeats.includes('S2') ? 'booked' : 'available', position: { x: 50, y: 170 } },
        { id: 'A19', type: bookedSeats.includes('A19') ? 'booked' : 'available', position: { x: 670, y: 170 } },
      ],
      // Row 4 - Lower deck front row (consistent with upper deck)
      row4: [
        { id: 'S1', type: bookedSeats.includes('S1') ? 'booked' : 'available', position: { x: 50, y: 240 } },
        { id: 'A2', type: bookedSeats.includes('A2') ? 'booked' : 'available', position: { x: 200, y: 240 } },
        { id: 'A4', type: bookedSeats.includes('A4') ? 'booked' : 'available', position: { x: 280, y: 240 } },
        { id: 'A6', type: bookedSeats.includes('A6') ? 'booked' : 'available', position: { x: 330, y: 240 } },
        { id: 'A8', type: bookedSeats.includes('A8') ? 'booked' : 'available', position: { x: 410, y: 240 } },
        { id: 'A10', type: bookedSeats.includes('A10') ? 'booked' : 'available', position: { x: 460, y: 240 } },
        { id: 'A12', type: bookedSeats.includes('A12') ? 'booked' : 'available', position: { x: 540, y: 240 } },
        { id: 'A14', type: bookedSeats.includes('A14') ? 'booked' : 'available', position: { x: 590, y: 240 } },
        { id: 'A16', type: bookedSeats.includes('A16') ? 'booked' : 'available', position: { x: 670, y: 240 } },
      ],
      // Row 5 - Lower deck back row (consistent spacing)
      row5: [
        { id: 'A1', type: bookedSeats.includes('A1') ? 'booked' : 'available', position: { x: 200, y: 290 } },
        { id: 'A3', type: bookedSeats.includes('A3') ? 'booked' : 'available', position: { x: 280, y: 290 } },
        { id: 'A5', type: bookedSeats.includes('A5') ? 'booked' : 'available', position: { x: 330, y: 290 } },
        { id: 'A7', type: bookedSeats.includes('A7') ? 'booked' : 'available', position: { x: 410, y: 290 } },
        { id: 'A9', type: bookedSeats.includes('A9') ? 'booked' : 'available', position: { x: 460, y: 290 } },
        { id: 'A11', type: bookedSeats.includes('A11') ? 'booked' : 'available', position: { x: 540, y: 290 } },
        { id: 'A13', type: bookedSeats.includes('A13') ? 'booked' : 'available', position: { x: 590, y: 290 } },
        { id: 'A15', type: bookedSeats.includes('A15') ? 'booked' : 'available', position: { x: 670, y: 290 } },
      ],
    };
    
    setSeatConfig(config);
    
    // Calculate available seats count to match the bus listing format
    const totalSeats = 32; // Total seats in the bus layout
    const bookedSeatsCount = bookedSeats.length;
    const availableCount = totalSeats - bookedSeatsCount;
    
    setAvailableSeatsCount(availableCount);
    
    console.log('Total seats:', totalSeats, 'Booked:', bookedSeatsCount, 'Available:', availableCount);
    console.log('Bus data available seats from listing:', busData.availableSeats);
  }, [busId, busData]);
  // Calculate available seats and update price when selectedSeats change
  useEffect(() => {
    if (Object.keys(seatConfig).length > 0) {
      // Update total price based on selected seats
      setTotalPrice(selectedSeats.length * seatPrice);
    }
  }, [selectedSeats, seatConfig]);
  useEffect(() => {
    console.log('Bus data is missing or incomplete:', busData);
  }, [busData]);

  const handleSeatClick = (seatId, seatType) => {
    if (seatType === 'booked') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatIcon = (seatType, isSelected) => {
    if (seatType === 'booked') return '/images/img_mdicarseat_red_300_01.svg';
    if (isSelected) return '/images/img_mdicarseat_blue_gray_500.svg';
    return '/images/img_mdicarseat_gray_400.svg';
  };  const handleProceedToPassengerDetails = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat to continue.');
      return;
    }
    
    // For now, we'll simulate the booking process
    const bookingResult = await bookSeats(selectedSeats);
    
    if (bookingResult && bookingResult.success) {
      toast.success(`Seats ${selectedSeats.join(', ')} selected successfully!`);
      // Navigate to passenger details page with booking data
      navigate('/passenger-detail', {
        state: {
          bus: busData,
          selectedSeats,
          totalPrice,
          bookingId: bookingResult.bookingId
        }
      });
    } else {
      toast.error('Failed to process seat selection. Please try again.');
    }
  };  const bookSeats = async (selectedSeats) => {
    try {
      // Simulate API call with dummy data
      console.log('Booking seats:', selectedSeats, 'for bus:', busId);
      
      // Simulate a successful response
      const mockResponse = {
        success: true,
        bookedSeats: selectedSeats,
        busId: busId,
        totalPrice: selectedSeats.length * seatPrice,
        bookingId: `BK${Date.now()}`
      };
      
      console.log('Booking successful:', mockResponse);
      return mockResponse;
    } catch (error) {
      console.error('Error booking seats:', error);
      return { success: false, error: error.message };
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
        <main className="max-w-7xl mt-11 mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Bus Details Component */}
        <BusDetail 
          busName={busData.name || 'Bus Name'}
          busType={busData.type || 'Tourist A/c, Delux'}
          date="06/06/2024"
          time={busData.departureTimeFormatted || '16:00'}
          boardingPlace={busData.departureLocation || 'Kathmandu'}
          droppingPlace={busData.arrivalLocation || 'Birgunj'}
          duration={busData.duration || '9h'}
        />

        {/* Stepper */}
        <div className="mb-8 flex justify-center">
         <ProgressBar steps={steps} currentStep={currentStep} />
        </div>        {/* Seat Selection Card */}
        <Card className="mb-6 min-h-[500px] w-full relative shadow-lg border border-gray-200 rounded-xl bg-white overflow-hidden">
          {/* Legend */}
          <div className="flex items-center justify-between mb-6 px-6 pt-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
                <span className="text-sm font-semibold text-gray-700">Booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
                <span className="text-sm font-semibold text-gray-700">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full shadow-sm"></div>
                <span className="text-sm font-semibold text-gray-700">Available</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <img 
                src="/images/img_mdicarseat.svg" 
                alt="Seat icon" 
                className="w-5 h-5"
              />
              <span className="text-lg font-bold text-green-600">
                {availableSeatsCount} Seats left
              </span>
            </div>
          </div>          {/* Seat Map */}
          <div className="relative  px-8 pb-8 min-h-[380px] bg-gradient-to-b from-gray-50 to-white rounded-lg">
            {/* Bus outline for visual context */}
            <div className="absolute inset-x-8 top-4 bottom-4 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/30"></div>
            
            {/* Driver section indicator - moved to top left */}
            <div className="absolute top-8 left-12 bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Driver
            </div>
            <div></div>
            {/* Render all seats */}
            {Object.keys(seatConfig).length > 0 && Object.values(seatConfig).flat().map((seat) => {
              const isSelected = selectedSeats.includes(seat.id);
              const currentType = isSelected ? 'selected' : seat.type;
              
              return (
                <div
                  key={seat.id}
                  className={`absolute transition-all duration-200 ml-20 ease-in-out cursor-pointer group ${
                    currentType === 'booked' 
                      ? 'cursor-not-allowed opacity-80' 
                      : 'hover:scale-110 hover:z-10 hover:shadow-lg'
                  }`}
                  style={{
                    left: `${seat.position.x}px`,
                    top: `${seat.position.y}px`,
                  }}
                  onClick={() => handleSeatClick(seat.id, seat.type)}
                  title={`Seat ${seat.id} - ${currentType.charAt(0).toUpperCase() + currentType.slice(1)}`}
                >                  <div className="relative flex flex-col items-center">
                    {/* Seat container with improved styling */}
                    <div className={`
                      relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm
                      ${currentType === 'booked' 
                        ? 'opacity-70' 
                        : currentType === 'selected'
                        ? 'ring-2 ring-blue-400 ring-offset-1 shadow-blue-200 shadow-md scale-105'
                        : 'hover:shadow-md'
                      }
                    `}>
                      <img
                        src={getSeatIcon(seat.type, isSelected)}
                        alt={`Seat ${seat.id}`}
                        className="w-8 h-8"
                      />
                      
                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Seat label */}
                    <span className={`
                      mt-1 text-[10px] font-semibold transition-all duration-200
                      ${currentType === 'selected' ? 'text-blue-700' : 'text-gray-600'}
                    `}>
                      {seat.id}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>        {/* Selected Seats and Proceed Card */}
        <Card className="h-auto w-full shadow-lg border border-gray-200 rounded-xl bg-white">
          <div className="flex items-center justify-between h-full px-6 py-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Selected Seat(s)
              </h3>
              <div className="flex items-center space-x-4">
                <p className="text-xl font-bold text-green-600">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
                </p>
                {selectedSeats.length > 0 && (
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600 mb-1">Total Amount</p>
                <span className="text-2xl font-bold text-gray-800">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
              
              <Button
                onClick={handleProceedToPassengerDetails}
                className={`
                  px-8 py-3 text-base font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2
                  ${selectedSeats.length === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }
                `}
                disabled={selectedSeats.length === 0}
              >
                <span>Go to passenger details</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeatSelection;