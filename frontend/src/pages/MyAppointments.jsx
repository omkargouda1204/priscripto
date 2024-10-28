import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  // Function to handle image loading errors
  const handleImageError = (event) => {
    event.target.src = 'path/to/default-image.png'; // Replace with your default image path
  };

  // Function placeholders for button actions
  const handlePayOnline = (doctorId) => {
    console.log(`Paying online for appointment with doctor ID: ${doctorId}`);
  };

  const handleCancelAppointment = (doctorId) => {
    console.log(`Cancelling appointment with doctor ID: ${doctorId}`);
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {doctors.length === 0 ? (
          <p className="text-center text-zinc-500 mt-4">No appointments found.</p>
        ) : (
          doctors.slice(0, 3).map((item, index) => (
            <div className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.image}
                  alt={`${item.name}'s profile`}
                  onError={handleImageError}
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.name}</p>
                <p>{item.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.address.line1}</p>
                <p className="text-xs">{item.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">Date & Time:</span> 
                  {item.date ? new Date(item.date).toLocaleString() : "Not available"}
                </p>
              </div>
              <div className="flex flex-col justify-end gap-2">
                <button
                  onClick={() => handlePayOnline(item.id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
                <button
                  onClick={() => handleCancelAppointment(item.id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
