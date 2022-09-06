export const numberOfTodos = (no_of_todos, text) => {
  switch (no_of_todos) {
    case 0:
      return `No Task ${text}`;
    case 1:
      return `1 Task ${text}`;
    default:
      return `${no_of_todos} Tasks ${text}`;
  }
};
