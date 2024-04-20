
// import React, { useState, useEffect } from 'react';
// import { CircleLoader } from 'react-spinners';
 
// function App() {
//     const [showDataPage, setShowDataPage] = useState(false);
//     const [pincode, setPincode] = useState('');
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [filteredData, setFilteredData] = useState([]);
 
//     const handlePincodeChange = (event) => {
//         setPincode(event.target.value);
//         setError(null);
//         setFilteredData([]);
//     };
 
//     async function handleLookup() {
//         if (pincode.length !== 6) {
//             setError('Please enter a valid 6-digit pincode');
//             return;
//         } else {
//             setShowDataPage(true);
//             setIsLoading(true);
//             try {
//                 const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//                 if (!response.ok) {
//                     throw new Error('API request failed');
//                 }
//                 const responseData = await response.json();
//                 console.log(responseData);
//                 setData(responseData[0]);
//                 console.log(data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     }
 
//     useEffect(() => {
//         console.log(data);
//     }, [data]);
 
//     const handleLookupClick = () => {
//         handleLookup();
//     };
 
//     return (
//         <div className="App w-full h-screen p-5">
//             {!showDataPage && (
//                 <div className="landing-page p-4">
//                 <h1 className="text-3xl font-bold mb-4">Enter Pincode!</h1>
//                 <div className="input-container flex items-center">
//                   <input
//                     className='border p-2 mr-2'
//                     type="text"
//                     placeholder="Enter 6-digit pincode"
//                     value={pincode}
//                     onChange={handlePincodeChange}
//                   />
//                   <button 
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={handleLookupClick}
//                   >
//                     Lookup
//                   </button>
//                 </div>
//               </div>
              
//             )}
//             {error && <p className="error">{error}</p>}
//             {isLoading && (<div className='w-full h-screen flex items-center justify-center'>
//             <CircleLoader color="#3498db" />
//             </div>)}
//             {showDataPage && !isLoading && (
//   <div className="data-page">
//     <h2 className="text-2xl font-semibold mb-4">Your Data is Here</h2>
    
//     <div className="data-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {data.PostOffice ? (
//         data.PostOffice.map((office, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md p-4">
//             <h3 className="text-lg font-semibold mb-2">Post Office Details</h3>
//             <p><span className="font-semibold">Name:</span> {office.Name}</p>
//             <p><span className="font-semibold">Pincode:</span> {office.Pincode}</p>
//             <p><span className="font-semibold">District:</span> {office.District}</p>
//             <p><span className="font-semibold">State:</span> {office.State}</p>
//             <p><span className="font-semibold">Branch Type:</span> {office.BranchType}</p>
//             <p><span className="font-semibold">Delivery Status:</span> {office.DeliveryStatus}</p>
//           </div>
//         ))
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   </div>
// )}


//         </div>
//     );
// }
 
// export default App;


import { useState, useEffect } from 'react';
import { CircleLoader } from 'react-spinners';

function App() {
    const [showDataPage, setShowDataPage] = useState(false);
    const [pincode, setPincode] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedName, setSelectedName] = useState('');

    const handlePincodeChange = (event) => {
        setPincode(event.target.value);
        setError(null);
        setFilteredData([]);
    };

    async function handleLookup() {
        if (pincode.length !== 6) {
            setError('Please enter a valid 6-digit pincode');
            return;
        } else {
            setShowDataPage(true);
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const responseData = await response.json();
                setData(responseData[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        if (data) {
            setFilteredData(data.PostOffice || []);
        }
    }, [data]);

    const handleFindClick = () => {
        const filtered = data?.PostOffice.filter((office) => office.Name === selectedName);
        setFilteredData(filtered || []);
    };

    const handleLookupClick = () => {
        handleLookup();
    };

    return (
        <div className="App w-full h-screen p-5">
            {!showDataPage && (
                <div className="landing-page p-4">
                    <h1 className="text-3xl font-bold mb-4">Enter Pincode!</h1>
                    <div className="input-container flex items-center">
                        <input
                            className='border p-2 mr-2'
                            type="text"
                            placeholder="Enter 6-digit pincode"
                            value={pincode}
                            onChange={handlePincodeChange}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleLookupClick}
                        >
                            Lookup
                        </button>
                    </div>
                </div>
            )}
            {error && <p className="error">{error}</p>}
            {isLoading && (
                <div className='w-full h-screen flex items-center justify-center'>
                    <CircleLoader color="#3498db" />
                </div>
            )}
            {showDataPage && !isLoading && (
                <div className="data-page">
                    <h2 className="text-2xl font-semibold mb-4">Your Data is Here</h2>
                    <div className="flex mb-4">
                        <select
                            className="border rounded-md mr-2"
                            value={selectedName}
                            onChange={(e) => setSelectedName(e.target.value)}
                        >
                            <option value="">Select Name</option>
                            {data?.PostOffice.map((office, index) => (
                                <option key={index} value={office.Name}>{office.Name}</option>
                            ))}
                        </select>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleFindClick}
                        >
                            Find
                        </button>
                    </div>
                    <div className="data-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((office, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                    <h3 className="text-lg font-semibold mb-2">Post Office Details</h3>
                                    <p><span className="font-semibold">Name:</span> {office.Name}</p>
                                    <p><span className="font-semibold">Pincode:</span> {office.Pincode}</p>
                                    <p><span className="font-semibold">District:</span> {office.District}</p>
                                    <p><span className="font-semibold">State:</span> {office.State}</p>
                                    <p><span className="font-semibold">Branch Type:</span> {office.BranchType}</p>
                                    <p><span className="font-semibold">Delivery Status:</span> {office.DeliveryStatus}</p>
                                </div>
                            ))
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
