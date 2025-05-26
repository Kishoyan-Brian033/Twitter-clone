

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// async function getUsers(): Promise<void> {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data: User[] = await response.json();


//     data.forEach(user => {
//       console.log(`Name: ${user.name}, Email: ${user.email}`);
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// getUsers();




async function getData() {
  const url = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(Error);
  }
}

getData()