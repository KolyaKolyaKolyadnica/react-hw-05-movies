export default function ReviewsListItem({ review }) {
  console.log(review);

  return (
    <li>
      <h4>{review.author}</h4>
      <p>{review.content}</p>
    </li>
  );
}
