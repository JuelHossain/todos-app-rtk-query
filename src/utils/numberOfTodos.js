export const numberOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return "No Task Found";
    case 1:
      return "1 Task Found";
    default:
      return `${no_of_todos} Tasks Found`;
  }
};
