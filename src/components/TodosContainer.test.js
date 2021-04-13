import axios from 'axios';
import TodosContainer from './TodosContainer';
import { render, screen, waitForElement } from '@testing-library/react'

jest.mock('axios');

test("render todos in li's", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      results: [
        {
          1: {
            title: 'ali',
            done: true,
          },
        },
        {
          2: {
            title: 'abu',
            done: false,
          },
        },
      ],
    },
  });

  const { getAllByLabelText, getByLabelText } = render(<TodosContainer />);

  expect(getByLabelText('ali')).toBeInTheDocument();

  expect(screen.getByLabelText('abu')).toBeInTheDocument();

  //check what's rendered in the li
  const liValues = await waitForElement(() =>
    getAllByLabelText("li").map(li => li.taskLabel),
  );

  expect(liValues).toEqual(["ali", "abu"]);
});

test('should fetch todos', () => {
  const todos = [{ title: 'ali', done: true }, { title: 'abu', done: false }];
  const resp = { data: todos };
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return TodosContainer.getTodos().then(data => expect(data).toEqual(todos));
});


describe('getTodos', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        hits: [
          {
            id: '1',
            title: 'a',
            done: true,
          },
          {
            id: '2',
            title: 'b',
            done: false,
          },
        ],
      },
    };
 
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    
    await expect(getTodos()).resolves.toEqual(data);

    expect(axios.get).toHaveBeenCalledWith(
      `/api/v1/todos`,
    );
  });
 
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
 
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(getTodos()).rejects.toThrow(errorMessage);
  });
});
