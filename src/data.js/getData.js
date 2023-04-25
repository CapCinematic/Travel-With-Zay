const fetchData = (dataSet) => {
  return fetch(`http://localhost:3001/api/v1/${dataSet}`)
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      throw Error(response.statusText)
    }
  }).catch(error => console.log(error))
  };
  
  const fetchAll = (id) => Promise.all([
    fetchData('travelers'),
    fetchData(`travelers/${id}`),
    fetchData('trips'),
    fetchData('destinations'),
    ]);


  

  export {fetchAll, fetchData}