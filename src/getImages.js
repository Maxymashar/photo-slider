// // The API base URL
// const BASE_URL = 'https://api.pexels.com/v1/search';
// // The API KEY
// const API_KEY = '563492ad6f91700001000001b7702f4246d94a279d5fa6bed1b7182e';

//   const [imageSrc, setImageSrc] = useState(null);

//   useEffect(() => {
//     axios
//       .get(BASE_URL, {
//         params: { query: '' },
//         headers: { Authorization: API_KEY },
//       })
//       .then((res) => {
//         const imageSrc = res.data.photos[0].src.large;
//         setImageSrc(imageSrc);
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   });