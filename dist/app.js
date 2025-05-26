"use strict";
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://jsonplaceholder.typicode.com/users";
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = yield response.json();
            console.log(json);
        }
        catch (error) {
            console.error(Error);
        }
    });
}
getData();
