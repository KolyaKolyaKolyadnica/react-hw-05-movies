export default function ReviewsListItem({ review }) {
  return (
    <li>
      <h4>{review.author}</h4>
      <p>{review.content}</p>
    </li>
  );
}
