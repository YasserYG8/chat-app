// Assuming you receive a MongoDB date like: "2023-07-15T12:00:00.000Z"
const formatMongoDate = (mongoDate) => {
  const date = new Date(mongoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
export default formatMongoDate;