import ref from "";
export const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const apiAddress = " http://localhost:3333/flip";
  const method = "POST";
  try {
    const params = {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: new FormData(event.target),
    };

    const response = await fetch(apiAddress, params);
    const data = await response.json();
    console.log(data);
  } catch (error) {}

  console.log(123123);
};
