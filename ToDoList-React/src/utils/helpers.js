// Yardımcı fonksiyonlar

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR');
};

export const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'pending':
      return todos.filter((todo) => !todo.completed);
    default:
      return todos;
  }
};
