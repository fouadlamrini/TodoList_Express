const yup = require('yup');
const TodoModelSchema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Descripton il is required').min(3, 'Description must be at least 3 characters'),
});

module.exports = {TodoModelSchema};