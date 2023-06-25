import React from 'react';

const Csv = () => {
    const fetchUserList = () => {
        // Fetch user list from the server
        fetch('http://localhost:3000/users/download')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch user list for download!');
            }
            return response.blob();
          })
          .then((blob) => {
            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);
    
            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'userList.csv';
            document.body.appendChild(link);
            link.click();
    
            // Clean up the temporary objects
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
          })
          .catch((error) => {
            console.error(error);
          });
      };

  return (
    <div className="btn text-left">
    <button className='btn btn-success text-left'onClick={fetchUserList} >Download as csv</button>
  </div>
  );
}

export default Csv;
