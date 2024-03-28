const commonimagepath = (imgName) => {
    console.log("============",imgName)                          // for Reactjs
    return require(`../../assets/images/${imgName}`)
}

export default commonimagepath

// const commonImagePath = (imgName) => {                                  // for vite with React
//     return import.meta.env.BASE_URL + `src/assets/images/${imgName}`;
//   };
  
//   export default commonImagePath;
  