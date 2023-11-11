// export const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   try {
//     const apiAddress = " http://localhost:3333/flip";
//     const params = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
// 		body: { event.target }
//     };

//     const response = await fetch(apiAddress, params);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {}

//   console.log(123123);
// };
