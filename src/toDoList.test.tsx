import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { MemoryRouter } from "react-router-dom";
import { dummyGroceryList } from "./constant"; 

describe("ToDoList Component", () => {

  // Test to check if all items in the dummy grocery list are displayed
  test("renders all items in the dummy grocery list", () => {
    render(
      <MemoryRouter>
        <ToDoList />
      </MemoryRouter>
    );

    // Iterate and check if each item appearsscreen
    dummyGroceryList.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  // Test to check if the number of checked items is correct
  test("updates the number of checked items", () => {
    render(
      <MemoryRouter>
        <ToDoList />
      </MemoryRouter>
    );

    const checkboxes = screen.getAllByRole("checkbox");

    // "Items bought: 0"
    expect(screen.getByText((content) => content.includes("Items bought:") && content.includes("0"))).toBeInTheDocument();

    //checking the first checkbox
    fireEvent.click(checkboxes[0]);

    //"Items bought: 1"
    expect(screen.getByText((content) => content.includes("Items bought:") && content.includes("1"))).toBeInTheDocument();

     //unchecking the first checkbox
     fireEvent.click(checkboxes[0]);

    //"Items bought: 0"
     expect(screen.getByText((content) => content.includes("Items bought:") && content.includes("0"))).toBeInTheDocument();
  });
});
