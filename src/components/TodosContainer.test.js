// import getTodos from './TodosContainer.js';
// import axios from 'axios';

import { render, waitForElement } from "@testing-library/react";
import "jest-dom/extend-expect";
import axios from "axios";
import TodosContainer from "./TodosContainer";

test("render todos", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      results: [
        {
          1: {
            title: "ali",
            done: true,
          }
        },
        {
          2: {
            title: "abu",
            done: false,
          }
        }
      ]
    }
  });

  const { getAllByTestId } = render(<TodosContainer />);

  //check what's rendered in the li
  const liValues = await waitForElement(() =>
    getAllByTestId("li").map(li => li.textContent)
  );
  expect(liValues).toEqual(["ali", "abu"]);
});

// jest.mock('axios');

// describe('getTodos', () => {
//   it('fetches successfully data from an API', async () => {
//     const data = {
//       data: {
//         hits: [
//           {
//             id: '1',
//             title: 'a',
//             done: true,
//           },
//           {
//             id: '2',
//             title: 'b',
//             done: false,
//           },
//         ],
//       },
//     };
 
//     axios.get.mockImplementationOnce(() => Promise.resolve(data));
    
//     await expect(getTodos()).resolves.toEqual(data);

//     expect(axios.get).toHaveBeenCalledWith(
//       `/api/v1/todos`,
//     );
//   });
 
//   it('fetches erroneously data from an API', async () => {
//     const errorMessage = 'Network Error';
 
//     axios.get.mockImplementationOnce(() =>
//       Promise.reject(new Error(errorMessage)),
//     );

//     await expect(getTodos()).rejects.toThrow(errorMessage);
//   });
// });
