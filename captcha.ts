// const api = "http://api.jfbym.com/api/YmServer/customApi";
// const token = "Hac77g8m6oyQkgIwoiGD6fCdv3meNCWhC39qdOjEpDU";

// const type = "88888";

// export default async function captcha(image: string) {
//   try {
//     const response = await fetch(`${api}/captcha`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         token,
//         type,
//         image,
//       }),
//     });

//     const data = await response.json();
//     if (data.code !== 10000) {
//       throw new Error("Captcha failed");
//     }

//     console.log(data.data);

//     const [x, y] = data.data.data.split("|")[0].split(",");

//     return {
//       x: parseInt(x),
//       y: parseInt(y),
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
const api = "http://localhost:5000/captcha";

export default async function captcha(image: string) {
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image,
    }),
  });

  const data = await response.json();
  console.log(data);

  if (data.code !== 0) {
    throw new Error("Captcha failed");
    // console.error("Captcha failed")
  }

  return data.data.position;
}
